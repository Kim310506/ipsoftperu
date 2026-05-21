import { prisma } from "../../../../config/prisma";



export const listarAmbientesService = async () => {

  return await prisma.ambiente.findMany({

    include: {

      piso: {

       include: {

        pabellon: {

          include: {

            sede: {

              include: {

                zonal: true

              }

            }

          }

        }

      }
      }

    }

  });

};



export const obtenerAmbienteService = async (

  id: number

) => {

  return await prisma.ambiente.findUnique({

    where: {

      id

    },

    include: {

      piso: true

    }

  });

};



export const crearAmbienteService = async (

  data: any

) => {

  return await prisma.ambiente.create({

    data: {

      nombre: data.nombre,

      pisoId: data.pisoId

    }

  });

};



export const actualizarAmbienteService = async (

  id: number,

  data: any

) => {

  return await prisma.ambiente.update({

    where: {

      id

    },

    data: {

      nombre: data.nombre,

      pisoId: data.pisoId

    }

  });

};



export const eliminarAmbienteService = async (

  id: number

) => {

  return await prisma.ambiente.delete({

    where: {

      id

    }

  });

};