import { prisma } from "../../../../config/prisma";

/* LISTAR */
export const listarPisosService = async () => {
  return await prisma.piso.findMany({
    include: {
      pabellon: {
        include: {
          sede: true
        }
      },
      ambientes: true
    }
  });
};

/* OBTENER UNO */
export const obtenerPisoService = async (id: number) => {
  return await prisma.piso.findUnique({
    where: { id },
    include: {
      pabellon: true,
      ambientes: true
    }
  });
};

/* CREAR */
export const crearPisoService = async (data: any) => {
  return await prisma.piso.create({
    data: {
      nombre: data.nombre,

      pabellon: {
        connect: {
          id: Number(data.pabellonId)
        }
      }
    }
  });
};

/* ACTUALIZAR */
export const actualizarPisoService = async (id: number, data: any) => {
  return await prisma.piso.update({
    where: { id },
    data: {
      nombre: data.nombre,

      pabellon: {
        connect: {
          id: Number(data.pabellonId)
        }
      }
    }
  });
};

/* ELIMINAR */
export const eliminarPisoService = async (id: number) => {
  return await prisma.piso.delete({
    where: { id }
  });
};