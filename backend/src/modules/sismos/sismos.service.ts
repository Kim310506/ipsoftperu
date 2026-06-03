import { prisma } from "../../config/prisma";

export const listarSismosService = async () => {
  return await prisma.reporteSismo.findMany({
    include: {
      responsable: true,
      sede: true,
      evidencias: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const obtenerSismoService = async (
  id: number
) => {

  return await prisma.reporteSismo.findUnique({
    where: {
      id
    },
    include: {
      responsable: true,
      sede: true,
      evidencias: true
    }
  });

};

export const crearSismoService = async (
  data: any,
  files: any
) => {

  const codigo = `SIS-${Date.now()}`;

  const sismo =
    await prisma.reporteSismo.create({

      data: {

        codigo,

        fechaIncidente:
          new Date(data.fechaIncidente),

        horaIncidente:
          data.horaIncidente,

        fechaReporte:
          new Date(data.fechaReporte),

        horaReporte:
          data.horaReporte,

        responsableId:
          Number(data.responsableId),

        sedeId:
          Number(data.sedeId),

        operacion:
          data.operacion === "true",

        corteEnergia:
          data.corteEnergia === "true",

        evacuaron:
          data.evacuaron === "true",

        tiempoEvacuacion:
          data.tiempoEvacuacion || null,

        danios:
          data.danios === "true",

        descripcionDanios:
          data.descripcionDanios || null,

        victimas:
          data.victimas === "true",

        cantidadVictimas:
          data.cantidadVictimas
            ? Number(data.cantidadVictimas)
            : null,

        continuidad:
          data.continuidad === "true",

        descripcionContinuidad:
          data.descripcionContinuidad || null,

      }

    });

  const evidencias = [];

  if (files?.fotoEvacuacion?.[0]) {

    evidencias.push({

      url:
        `/uploads/sismos/${files.fotoEvacuacion[0].filename}`,

      reporteSismoId:
        sismo.id

    });

  }

  if (files?.fotoDanios?.[0]) {

    evidencias.push({

      url:
        `/uploads/sismos/${files.fotoDanios[0].filename}`,

      reporteSismoId:
        sismo.id

    });

  }

  if (files?.fotoVictimas?.[0]) {

    evidencias.push({

      url:
        `/uploads/sismos/${files.fotoVictimas[0].filename}`,

      reporteSismoId:
        sismo.id

    });

  }

  if (evidencias.length > 0) {

    await prisma.evidenciaSismo.createMany({
      data: evidencias
    });

  }

  return sismo;

};
export const dashboardSismosService =
async () => {

  const totalSedes =
    await prisma.sede.count();

  const reportes =
    await prisma.reporteSismo.findMany();
const ultimosReportes =
  await prisma.reporteSismo.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc"
    },
    include: {
      sede: true,
      responsable: true
    }
  });
  return {

    totalSedes,

    contactadas:
      reportes.length,

    operativas:
      reportes.filter(
        x => x.operacion
      ).length,

    evacuadas:
      reportes.filter(
        x => x.evacuaron
      ).length,

    danios:
      reportes.filter(
        x => x.danios
      ).length,

    victimas:
      reportes.filter(
        x => x.victimas
      ).length,

    sinEnergia:
      reportes.filter(
        x => x.corteEnergia
      ).length,

    fotos:
      await prisma.evidenciaSismo.count(),
    ultimosReportes
  };

};
export const obtenerSedesAutorizablesService =
async () => {

  const sedes = await prisma.sede.findMany({
    include: {
      usuarios: true
    }
  });

  return sedes
    .map((sede) => {

      const pvig = sede.usuarios.filter(
        (usuario) =>
          usuario.rol &&
          usuario.rol.includes("PERSONAL DE VIGILANCIA")
      );

      return {
        id: sede.id,
        nombre: sede.nombre,
        totalPVIG: pvig.length
      };
    })
    .filter(
      (sede) => sede.totalPVIG > 0
    );
};
export const autorizarSedeService =
async (
  sedeId: number,
  archivo: string
) => {

  return await prisma.autorizacionSismo.upsert({

    where: {
      sedeId
    },

    update: {
      plano: archivo,
      estado: "ACTIVO"
    },

    create: {
      sedeId,
      plano: archivo,
      estado: "ACTIVO"
    }

  });

};
export const listarAutorizacionesService =
async () => {

  return await prisma.autorizacionSismo.findMany({

    include: {
      sede: true
    },

    orderBy: {
      createdAt: "desc"
    }

  });

};
export const cambiarEstadoAutorizacionService =
async (
  sedeId: number,
  estado: string
) => {

  return await prisma.autorizacionSismo.update({

    where: {
      sedeId
    },

    data: {
      estado
    }

  });

};
export const monitoreoOsegService = async () => {

  const autorizadas =
    await prisma.autorizacionSismo.findMany({

      where: {
        estado: "ACTIVO"
      },

      include: {
        sede: true
      }

    });

  const reportes =
    await prisma.reporteSismo.findMany({

      include: {
        sede: true,
        responsable: true
      },

      orderBy: {
        createdAt: "desc"
      }

    });

  return autorizadas.map((aut) => {

    const reporte = reportes.find(
      (r) => r.sedeId === aut.sedeId
    );

    return {

      sedeId: aut.sedeId,

      sede: aut.sede.nombre,

      estado:
        reporte
          ? "REPORTADO"
          : "PENDIENTE",

      contacto:
        reporte?.responsable?.rol ||
        "-",

      detalle:
        reporte
          ? "Sin novedad"
          : "-",

      hora:
        reporte?.horaReporte ||
        "-"

    };

  });

};