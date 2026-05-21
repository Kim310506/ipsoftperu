// src/modules/administracion/infraestructura/pabellones/pabellon.service.ts

import { prisma } from "../../../../config/prisma";

export const listarPabellonesService = async () => {

  return await prisma.pabellon.findMany({

    include: {

      sede: {

        include: {

          zonal: true

        }

      },

      pisos: true

    }

  });

};

export const obtenerPabellonService = async (

  id: number

) => {

  return await prisma.pabellon.findUnique({

    where: {

      id

    },

    include: {

      sede: true,

      pisos: true

    }

  });

};

export const crearPabellonService = async (

  data: any

) => {

  return await prisma.pabellon.create({

    data: {

      nombre: data.nombre,

      sedeId: data.sedeId

    }

  });

};

export const actualizarPabellonService = async (

  id: number,

  data: any

) => {

  return await prisma.pabellon.update({

    where: {

      id

    },

    data: {

      nombre: data.nombre,

      sedeId: data.sedeId

    }

  });

};

export const eliminarPabellonService = async (

  id: number

) => {

  return await prisma.pabellon.delete({

    where: {

      id

    }

  });

};