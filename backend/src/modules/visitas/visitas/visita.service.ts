import { randomUUID } from "crypto";
import { prisma } from "../../../config/prisma";
import { enviarCorreoQR } from "../../../utils/mailer";
import QRCode from "qrcode";
// LISTAR
export const listarVisitasService = async () => {
  return await prisma.visita.findMany({
    include: {
      sede: {
        include: {
          zonal: true
        }
      },
      ambiente: {
        include: {
          piso: {
            include: {
              pabellon: true
            }
          }
        }
      },
      visitantes: true,
      autorizadoPor: true
    }
  });
};
export const verificarQRService = async (qrData: string) => {
  const visitante = await prisma.visitante.findFirst({
    where: { qrData },
    include: {
      visita: true,
    },
  });

  return visitante;
};
// OBTENER POR ID
export const obtenerVisitaService = async (id: number) => {
  return await prisma.visita.findUnique({
    where: { id },
    include: {
      sede: true,
      ambiente: true,
      visitantes: true
    }
  });
};

// CREAR
export const crearVisitaService = async (data: any) => {
  return await prisma.$transaction(async (tx) => {

    const codigo = `VIS-${Date.now()}`;

    const visita = await tx.visita.create({
      data: {
        codigo,
        tipo: data.tipo,
        motivo: data.motivo,
        estado: "PENDIENTE",
        fecha: data.fecha,
        horaEntrada: data.horaEntrada,
        horaSalida: data.horaSalida,
        autorizadoPorId: null,
        sedeId: data.sedeId,
        ambienteId: data.ambienteId
      }
    });

    let visitantesCreados: any[] = [];

    if (data.visitantes?.length) {
      visitantesCreados = await Promise.all(
        data.visitantes.map(async (v: any) => {

          // 🔥 SOLO TEXTO (ESTO ES LO IMPORTANTE)
          const qrData = `VISITA-${visita.id}|DNI-${v.dni}|UUID-${randomUUID()}`;

          const visitante = await tx.visitante.create({
            data: {
              dni: v.dni,
              nombres: v.nombres,
              apellidoPaterno: v.apellidoPaterno,
              apellidoMaterno: v.apellidoMaterno,
              email: v.email,
              empresa: v.empresa,
              visitaId: visita.id,
              qrData, // 👈 SOLO ESTO
              estadoQr: "ACTIVO"
            }
          });

          // 🔥 GENERAR QR SOLO PARA ENVÍO (NO BD)
          const qrImage = await QRCode.toDataURL(qrData);

          if (v.email) {
            enviarCorreoQR(v.email, v.nombres, qrImage)
              .catch(err => console.log("Error correo:", err.message));
          }

          return visitante;
        })
      );
    }

    return {
      visita,
      visitantes: visitantesCreados
    };
  });
};
// ACTUALIZAR
export const actualizarVisitaService = async (id: number, data: any) => {
  return await prisma.visita.update({
    where: { id },
    data: {
      codigo: data.codigo,
      tipo: data.tipo,
      motivo: data.motivo,
      fecha: data.fecha,
      horaEntrada: data.horaEntrada,
      horaSalida: data.horaSalida,
      sedeId: data.sedeId,
      ambienteId: data.ambienteId,
      estado: data.estado,
      autorizadoPorId: data.autorizadoPorId
    }
  });
};
export const autorizarVisitaService = async (id: number, userId: number) => {
  return await prisma.visita.update({
    where: { id },
    data: {
      estado: "AUTORIZADO",
      autorizadoPorId: userId
    }
  });
};
export const desautorizarVisitaService = async (id: number) => {
  return await prisma.visita.update({
    where: { id },
    data: {
      estado: "PENDIENTE",
      autorizadoPorId: null
    }
  });
};
// ELIMINAR
export const eliminarVisitaService = async (id: number) => {
  return await prisma.visita.delete({
    where: { id }
  });
};