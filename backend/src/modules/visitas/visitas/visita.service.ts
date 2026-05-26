import { randomUUID } from "crypto";
import { prisma } from "../../../config/prisma";
import {
  enviarCorreoQR,
  enviarCorreoRegistroExterno
} from "../../../utils/mailer";
import QRCode from "qrcode";
const ahoraPeruString = () => {
  return new Date().toLocaleString("sv-SE", {
    timeZone: "America/Lima",
  });
};
// LISTAR
export const listarVisitasService = async () => {
  const visitas = await prisma.visita.findMany({
    include: {
      sede: { include: { zonal: true } },
      ambiente: { include: { piso: { include: { pabellon: true } } } },
      visitantes: true,
      autorizadoPor: true
    }
  });

  return visitas.map(v => ({
    ...v,

    fechaInicio: v.fechaInicio
      ? v.fechaInicio.toISOString().split("T")[0]
      : null,

    fechaFin: v.fechaFin
      ? v.fechaFin.toISOString().split("T")[0]
      : null,

    createdAt: v.createdAt
      ? v.createdAt // es string
      : null,
  }));
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
        fechaInicio: new Date(data.fechaInicio),
        fechaFin: new Date(data.fechaFin),
        horaEntrada: data.horaEntrada,
        horaSalida: data.horaSalida,
        autorizadoPorId: null,
        sedeId: data.sedeId,
        ambienteId: data.ambienteId,
        createdAt: ahoraPeruString()
      }
    });

    // =====================================
    // EXTERNO
    // =====================================

    if (data.tipo === "EXTERNO") {

      await tx.contactoExterno.create({
        data: {
          nombre: data.encargado.nombres,
          email: data.encargado.email,
          empresa: data.encargado.empresa,
          visitaId: visita.id,
        }
      });

      // LINK
const link =
  `${process.env.FRONT_URL}/registro-externo/${visita.codigo}`;

// ENVÍO CORREO
if (data.encargado?.email) {

  enviarCorreoRegistroExterno(
    data.encargado.email,
    data.encargado.nombres,
    link
  ).catch(err =>
    console.log(err.message)
  );

}
      return {
        visita,
        visitantes: []
      };
    }

    // =====================================
    // INTERNO
    // =====================================

    let visitantesCreados: any[] = [];

    if (
      data.tipo === "INTERNO" &&
      data.visitantes?.length
    ) {

      visitantesCreados = await Promise.all(

        data.visitantes.map(async (v: any, index: number) => {

          const qrData =
            `VISITA-${visita.id}|DNI-${v.dni}|UUID-${randomUUID()}`;

          const visitante =
            await tx.visitante.create({
              data: {

                dni: v.dni,

                nombres: v.nombres,

                apellidoPaterno:
                  v.apellidoPaterno,

                apellidoMaterno:
                  v.apellidoMaterno,

                email: v.email,

                empresa: v.empresa,

                visitaId: visita.id,

                qrData,

                estadoQr: "ACTIVO",
              }
            });

          const qrImage =
            await QRCode.toDataURL(qrData);

          if (v.email) {

            enviarCorreoQR(
              v.email,
              v.nombres,
              qrImage
            ).catch(err =>
              console.log(err.message)
            );
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
export const registrarVisitantesExternosService = async (
  codigo: string,
  visitantes: any[]
) => {

  const visita = await prisma.visita.findUnique({
    where: {
      codigo,
    },
  });

  if (!visita) {
    throw new Error("Visita no encontrada");
  }

  const visitantesCreados = await Promise.all(

    visitantes.map(async (v: any) => {

      const qrData =
        `VISITA-${visita.id}|DNI-${v.dni}|UUID-${randomUUID()}`;

      const visitante =
        await prisma.visitante.create({
          data: {

            dni: v.dni,

            nombres: v.nombres,

            apellidoPaterno:
              v.apellidoPaterno,

            apellidoMaterno:
              v.apellidoMaterno,

            email: v.email,

            empresa: v.empresa,

            visitaId: visita.id,

            qrData,

            estadoQr: "ACTIVO",
          }
        });

      // QR VISUAL
      const qrImage =
        await QRCode.toDataURL(qrData);

      // ENVIAR CORREO
      if (v.email) {

        enviarCorreoQR(
          v.email,
          v.nombres,
          qrImage
        ).catch(err =>
          console.log(err.message)
        );
      }

      return visitante;
    })
  );

  return visitantesCreados;
};
// ACTUALIZAR
export const actualizarVisitaService = async (id: number, data: any) => {

  const updateData: any = {
    codigo: data.codigo,
    tipo: data.tipo,
    motivo: data.motivo,
    horaEntrada: data.horaEntrada,
    horaSalida: data.horaSalida,
    sedeId: data.sedeId,
    ambienteId: data.ambienteId,
    estado: data.estado,
    autorizadoPorId: data.autorizadoPorId,
  };

  if (data.fechaInicio) {
    updateData.fechaInicio = new Date(data.fechaInicio);
  }

  if (data.fechaFin) {
    updateData.fechaFin = new Date(data.fechaFin);
  }

  return await prisma.visita.update({
    where: { id },
    data: updateData
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
export const registrarIngresoVisitanteService = async (id: number) => {
  return prisma.visitante.update({
    where: { id },
    data: {
      horaIngreso: new Date().toLocaleString("sv-SE", {
  timeZone: "America/Lima"
}),
    },
  });
};

export const registrarSalidaVisitanteService = async (id: number) => {
  return prisma.visitante.update({
    where: { id },
    data: {
      horaSalida: new Date().toLocaleString("sv-SE", {
  timeZone: "America/Lima"
}),
    },
  });
};
