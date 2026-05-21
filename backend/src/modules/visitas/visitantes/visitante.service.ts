import { prisma } from "../../../config/prisma";

// LISTAR
export const listarVisitantesService = async () => {
  return await prisma.visitante.findMany({
    include: {
      visita: {
        include: {
          sede: true,
          ambiente: true
        }
      }
    }
  });
};

// OBTENER POR ID
export const obtenerVisitanteService = async (id: number) => {
  return await prisma.visitante.findUnique({
    where: { id },
    include: {
      visita: true
    }
  });
};

// CREAR
export const crearVisitanteService = async (data: any) => {
  return await prisma.visitante.create({
    data: {
      dni: data.dni,
      nombres: data.nombres,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      email: data.email,
      telefono: data.telefono,
      empresa: data.empresa,
      qrData: data.qrData,
      qrImage: data.qrImage,
      estadoQr: data.estadoQr,
      visitaId: data.visitaId
    }
  });
};

// ACTUALIZAR
export const actualizarVisitanteService = async (id: number, data: any) => {
  return await prisma.visitante.update({
    where: { id },
    data: {
      dni: data.dni,
      nombres: data.nombres,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      email: data.email,
      telefono: data.telefono,
      empresa: data.empresa,
      qrData: data.qrData,
      qrImage: data.qrImage,
      estadoQr: data.estadoQr,
      visitaId: data.visitaId
    }
  });
};

// ELIMINAR
export const eliminarVisitanteService = async (id: number) => {
  return await prisma.visitante.delete({
    where: { id }
  });
};