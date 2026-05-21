import { prisma } from "../../../../config/prisma";

// LISTAR
export const listarZonalesService = async () => {
  return await prisma.zonal.findMany({
    include: {
      sedes: {
        include: {
          pabellones: {
            include: {
              pisos: {
                include: {
                  ambientes: true
                }
              }
            }
          }
        }
      },

      unidades: {

        include: {

          unidadNegocio: true

        }

      }

    }
  });
};

// OBTENER POR ID
export const obtenerZonalService = async (id: number) => {
  return await prisma.zonal.findUnique({
    where: { id },
    include: {
      sedes: {
        include: {
          pabellones: {
            include: {
              pisos: {
                include: {
                  ambientes: true
                }
              }
            }
          }
        }
      },

      unidades: {

        include: {

          unidadNegocio: true

        }

      }

    }
  });
};

// CREAR
export const crearZonalService = async (data: any) => {
  return await prisma.zonal.create({
    data: {
      id: data.id,
      nombre: data.nombre
    }
  });
};

// ACTUALIZAR
export const actualizarZonalService = async (
  id: number,
  data: any
) => {
  return await prisma.zonal.update({
    where: { id },
    data: {
      nombre: data.nombre
    }
  });
};

// ELIMINAR
export const eliminarZonalService = async (id: number) => {
  return await prisma.zonal.delete({
    where: { id }
  });
};