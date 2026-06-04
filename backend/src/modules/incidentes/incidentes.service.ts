import PDFDocument from "pdfkit";
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
          `/uploads/ocurrencias/evidencias_iniciales/${file.filename}`,

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
        url: `/uploads/ocurrencias/soluciones/${file.filename}`,
        historialId: solucion.id
      }))
    });
  }

  // 3. cambiar estado de ocurrencia
  await prisma.ocurrencia.update({
    where: { id: ocurrenciaId },
    data: {
      estado: "SOLUCIONADO"
    }
  });

  return solucion;
};

export const dashboardOcurrenciasService = async () => {
  const totalOcurrencias = await prisma.ocurrencia.count();

  const pendientes = await prisma.ocurrencia.count({
    where: { estado: "PENDIENTE" },
  });

  const reportados = await prisma.ocurrencia.count({
    where: { estado: "REPORTADO" },
  });

  const solucionados = await prisma.ocurrencia.count({
    where: { estado: "SOLUCION_ENVIADA" },
  });

  const cerrados = await prisma.ocurrencia.count({
    where: { estado: "CERRADO" },
  });

  const rechazados = await prisma.ocurrencia.count({
    where: { estado: "RECHAZADO" },
  });

  // =========================
  // TRAER OCURRENCIAS CON RELACIONES
  // =========================
  const ocurrencias = await prisma.ocurrencia.findMany({
    include: {
      sede: true,
    },
  });

  // =========================
  // MOTIVO
  // =========================
  const motivoMap = new Map<string, number>();

  ocurrencias.forEach((o) => {
    const key = o.motivo || "Sin motivo";
    motivoMap.set(key, (motivoMap.get(key) || 0) + 1);
  });

  const motivoData = Array.from(motivoMap, ([name, value]) => ({
    name,
    value,
  }));

  // =========================
  // SEDE
  // =========================
  const sedeMap = new Map<string, number>();

  ocurrencias.forEach((o) => {
    const key = o.sede?.nombre || "Sin sede";
    sedeMap.set(key, (sedeMap.get(key) || 0) + 1);
  });

  const sedeData = Array.from(sedeMap, ([name, value]) => ({
    name,
    value,
  }));

  // =========================
  // VÍNCULO
  // =========================
  const vinculoMap = new Map<string, number>();

  ocurrencias.forEach((o) => {
    const key = o.vinculo || "Sin vínculo";
    vinculoMap.set(key, (vinculoMap.get(key) || 0) + 1);
  });

  const vinculoData = Array.from(vinculoMap, ([name, value]) => ({
    name,
    value,
  }));

  // =========================
  // PERSONAS TOP
  // =========================
  const personasMap = new Map<string, number>();

  ocurrencias.forEach((o) => {
    const key = o.personaInvolucrada || "Sin nombre";
    personasMap.set(key, (personasMap.get(key) || 0) + 1);
  });

  const personasData = Array.from(personasMap, ([name, value]) => ({
    name,
    value,
  }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // =========================
  // RETURN FINAL
  // =========================
  return {
    totalOcurrencias,

    pendientes,
    reportados,
    solucionados,
    cerrados,
    rechazados,

    motivoData,
    sedeData,
    vinculoData,
    personasData,
  };
};
export const cerrarOcurrenciaService = async (
  ocurrenciaId: number,
  usuarioId: number
) => {

  return await prisma.ocurrencia.update({
    where: {
      id: ocurrenciaId
    },
    data: {
      estado: "CERRADO"
    }
  });

};

export const rechazarSolucionService = async (
  ocurrenciaId: number,
  usuarioId: number,
  motivo: string
) => {

  await prisma.historialOcurrencia.create({
    data: {
      tipo: "RECHAZO",
      mensaje: motivo,
      usuarioId,
      ocurrenciaId
    }
  });

  return await prisma.ocurrencia.update({
    where: {
      id: ocurrenciaId
    },
    data: {
      estado: "RECHAZADO"
    }
  });

};
export const generarPdfIncidente =
async (id: number) => {

  const incidente =
    await prisma.ocurrencia.findUnique({

      where: {
        id
      },

      include: {

        sede: true,

        ambiente: true,

        evidencias: true,

        historial: {

          include: {

            usuario: true,

            evidencias: true

          },

          orderBy: {
            createdAt: "asc"
          }

        }

      }

    });

  if (!incidente) {
    throw new Error(
      "Incidente no encontrado"
    );
  }

  return incidente;
};