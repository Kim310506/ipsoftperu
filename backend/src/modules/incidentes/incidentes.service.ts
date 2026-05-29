
import { prisma } from "../../config/prisma";

export const listarOcurrenciasService =
async () => {

  return await prisma.ocurrencia.findMany({

    include: {

      sede: true,

      ambiente: true,

      usuario: {

        select: {

          id: true,
          nombre: true,
          correo: true,

        }

      }

    },

    orderBy: {

      createdAt: "desc"

    }

  });

};

export const obtenerOcurrenciaService =
async (id: number) => {

  return await prisma.ocurrencia.findUnique({

    where: {

      id

    },

    include: {

      sede: true,

      ambiente: true,

      usuario: true,

      evidencias: true,

      historial: {

        include: {

          usuario: true,

          evidencias: true,

        }

      }

    }

  });

};

export const crearOcurrenciaService =
async (
  data: any,
  files: Express.Multer.File[]
) => {

  const codigo =
    `OC-${Date.now()}`;

  const ocurrencia =
    await prisma.ocurrencia.create({

      data: {

        codigo,

        categoria:
          data.categoria,

        tipo:
          data.tipo,

        subcategoria:
          data.subcategoria,

        motivo:
          data.motivo,

        vinculo:
          data.vinculo,

        detalle:
          data.detalle,

        personaInvolucrada:
          data.personaInvolucrada,

        estado: "PENDIENTE",

        prioridad:
          data.prioridad || "MEDIA",

        usuarioId:
          Number(data.usuarioId),

        sedeId:
          Number(data.sedeId),

        ambienteId:
          Number(data.ambienteId),

      }

    });

  // GUARDAR IMÁGENES
  if (
    files &&
    files.length > 0
  ) {

    await prisma.evidenciaOcurrencia.createMany({

      data: files.map((file) => ({

        url:
          `/uploads/ocurrencias/${file.filename}`,

        ocurrenciaId:
          ocurrencia.id

      }))

    });

  }

  return ocurrencia;

};
export const actualizarEstadoOcurrenciaService =
async (
  id: number,
  data: any
) => {

  return await prisma.ocurrencia.update({

    where: {

      id

    },

    data: {

      estado:
        data.estado

    }

  });

};

export const eliminarOcurrenciaService =
async (id: number) => {

  return await prisma.ocurrencia.delete({

    where: {

      id

    }

  });

};
// incidencias.service.ts

export const resumenOcurrenciasService =
async () => {

  const safety =
    await prisma.ocurrencia.count({
      where: {
        categoria: "SAFETY"
      }
    });

  const security =
    await prisma.ocurrencia.count({
      where: {
        categoria: "SECURITY"
      }
    });

  const total =
    await prisma.ocurrencia.count();

  return {
    safety,
    security,
    total
  };

};
export const crearReporteService =
async (
  ocurrenciaId: number,
  usuarioId: number,
  mensaje: string
) => {

  const reporte =
    await prisma.historialOcurrencia.create({

      data: {

        tipo: "REPORTE",

        mensaje,

        usuarioId,

        ocurrenciaId

      }

    });

  await prisma.ocurrencia.update({

    where: {

      id: ocurrenciaId

    },

    data: {

      estado: "REPORTADO"

    }

  });

  return reporte;

};
export const crearSolucionService = async (
  ocurrenciaId: number,
  usuarioId: number,
  mensaje: string,
  files: Express.Multer.File[]
) => {

  // 1. crear historial SOLUCIÓN
  const solucion = await prisma.historialOcurrencia.create({
    data: {
      tipo: "SOLUCION",
      mensaje,
      usuarioId,
      ocurrenciaId
    }
  });

  // 2. guardar evidencias (IMÁGENES)
  if (files && files.length > 0) {
    await prisma.evidenciaHistorial.createMany({
      data: files.map((file) => ({
        url: `/uploads/soluciones/${file.filename}`,
        historialId: solucion.id
      }))
    });
  }

  // 3. cambiar estado de ocurrencia
  await prisma.ocurrencia.update({
    where: { id: ocurrenciaId },
    data: {
      estado: "SOLUCION_ENVIADA"
    }
  });

  return solucion;
};