import { prisma } from "../../../../config/prisma";

export const listarUnidadesService = async () => {

  return await prisma.unidadNegocio.findMany({

    include: {

      zonales: {

        include: {

          zonal: {

            include: {

              sedes: true

            }

          }

        }

      }

    }

  });

};

export const obtenerUnidadService = async (
  id: number
) => {

  return await prisma.unidadNegocio.findUnique({

    where: {
      id
    },

    include: {

      zonales: {

        include: {

          zonal: {

            include: {

              sedes: true

            }

          }

        }

      }

    }

  });

};

export const crearUnidadService = async (
  data: any
) => {

  /* ========================= */
  /* BUSCAR SI LA ZONAL YA */
  /* ESTA ASIGNADA */
  /* ========================= */

  const zonalExistente =
    await prisma.unidadNegocioZonal.findFirst({

      where: {
        zonalId: data.zonalId
      }

    });

  /* ========================= */
  /* SI EXISTE */
  /* ELIMINAR RELACION */
  /* ========================= */

  if (zonalExistente) {

    const unidadAnteriorId =
      zonalExistente.unidadNegocioId;

    /* ELIMINAR RELACION */

    await prisma.unidadNegocioZonal.delete({

      where: {
        id: zonalExistente.id
      }

    });

    /* ========================= */
    /* VERIFICAR SI QUEDO VACIA */
    /* ========================= */

    const restantes =
      await prisma.unidadNegocioZonal.count({

        where: {

          unidadNegocioId:
            unidadAnteriorId

        }

      });

    /* ========================= */
    /* SI NO TIENE ZONALES */
    /* ELIMINAR UUNN */
    /* ========================= */

    if (restantes === 0) {

      await prisma.unidadNegocio.delete({

        where: {
          id: unidadAnteriorId
        }

      });

    }

  }

  /* ========================= */
  /* CREAR NUEVA UUNN */
  /* ========================= */

  return await prisma.unidadNegocio.create({

    data: {

      nombre: data.nombre,

      estado: "ACTIVO",

      zonales: {

        create: [

          {

            zonal: {

              connect: {

                id: data.zonalId

              }

            }

          }

        ]

      }

    },

    include: {

      zonales: {

        include: {

          zonal: true

        }

      }

    }

  });

};
export const actualizarUnidadService = async (
  id: number,
  data: any
) => {

  /* ========================= */
  /* VALIDAR ZONALES */
  /* ========================= */

  for (const zonalId of data.zonales) {

    const existe =
      await prisma.unidadNegocioZonal.findFirst({

        where: {

          zonalId,

          NOT: {

            unidadNegocioId: id

          }

        }

      });

    if (existe) {

      throw new Error(
        "Una de las zonales ya pertenece a otra Unidad de Negocio"
      );

    }

  }

  /* ========================= */
  /* ELIMINAR RELACIONES */
  /* ========================= */

  await prisma.unidadNegocioZonal.deleteMany({

    where: {

      unidadNegocioId: id

    }

  });

  /* ========================= */
  /* ACTUALIZAR */
  /* ========================= */

  return await prisma.unidadNegocio.update({

    where: {
      id
    },

    data: {

      nombre: data.nombre,

      estado: data.estado,

      zonales: {

        create: data.zonales.map(
          (zonalId: number) => ({

            zonal: {

              connect: {

                id: zonalId

              }

            }

          })
        )

      }

    }

  });

};

export const eliminarUnidadService = async (
  id: number
) => {

  await prisma.unidadNegocioZonal.deleteMany({

    where: {

      unidadNegocioId: id

    }

  });

  return await prisma.unidadNegocio.delete({

    where: {
      id
    }

  });

};