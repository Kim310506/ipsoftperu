import { prisma } from "../../../../config/prisma";



export const listarSedesService = async () => {

  return await prisma.sede.findMany({

    include: {

      zonal: true,

      pabellones: true,

      usuarios: true

    }

  });

};



export const obtenerSedeService = async (
  id: number
) => {

  return await prisma.sede.findUnique({

    where: {

      id

    },

    include: {

      zonal: true,

      pabellones: true,

      usuarios: true

    }

  });

};



export const crearSedeService = async (
  data: any
) => {

  return await prisma.sede.create({

    data: {

      nombre: data.nombre,

      zonal: {

        connect: {

          id: Number(data.zonalId)

        }

      },
      latitud: data.latitud ? parseFloat(data.latitud) : null,
      longitud: data.longitud ? parseFloat(data.longitud) : null,

    }

  });

};



export const actualizarSedeService = async (
  id: number,
  data: any
) => {

  return await prisma.sede.update({

    where: {

      id

    },

    data: {

      nombre: data.nombre,

      zonal: {

        connect: {

          id: Number(data.zonalId)

        }

      }

    }

  });

};



export const eliminarSedeService = async (
  id: number
) => {

  return await prisma.sede.delete({

    where: {

      id

    }

  });

};