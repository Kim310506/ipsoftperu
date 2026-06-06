import { prisma } from "../../config/prisma";

export const crearRiesgoService = async (
  data: any,
  file: any
) => {
    console.log("DATA:");
  console.log(data);

  console.log("FILE:");
  console.log(file);

  const codigo = `RIE-${Date.now()}`;

  const riesgo =
    await prisma.registroRiesgo.create({

      data: {

        codigo,

        sedeId:
          Number(data.sedeId),

        pabellonId:
          Number(data.pabellonId),

        pisoId:
          Number(data.pisoId),

        ambienteId:
          Number(data.ambienteId),

        categoria:
          data.categoria,

        riesgo:
          data.riesgo,

        probabilidad:
          Number(data.probabilidad),

        impacto:
          Number(data.impacto),

        nivel:
          Number(data.nivel),

        descripcion:
          data.descripcion,

        foto:
          file
            ? `/uploads/riesgos/${file.filename}`
            : null

      }

    });

  return riesgo;
};
export const listarRiesgosService = async () => {
  return await prisma.registroRiesgo.findMany({
    include: {
      sede: true,
      pabellon: true,
      piso: true,
      ambiente: true,
      responsable: true,
      tratamientos: true,
      seguimientos: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
export const listarResponsablesService =
  async () => {

    return await prisma.responsableRiesgo.findMany({

      orderBy: {
        createdAt: "desc",
      },

      include: {
        riesgos: true,
      },

    });

};

export const crearResponsableService =
  async (data: any) => {

    return await prisma.responsableRiesgo.create({

      data: {

        nombre:
          data.nombre,

        apellidoPaterno:
          data.apellidoPaterno,

        apellidoMaterno:
          data.apellidoMaterno,

        correo:
          data.correo,

        area:
          data.area,

        categoria:
          data.categoria,

      },

    });

};

export const reporteRiesgosService = async (
  filtros: any
) => {

  const where: any = {};

  if (filtros.estado) {
    where.estado = filtros.estado;
  }

  if (filtros.sedeId) {
    where.sedeId = Number(
      filtros.sedeId
    );
  }

  if (filtros.pabellonId) {
    where.pabellonId = Number(
      filtros.pabellonId
    );
  }

  if (filtros.pisoId) {
    where.pisoId = Number(
      filtros.pisoId
    );
  }

  if (
    filtros.desde &&
    filtros.hasta
  ) {

    where.createdAt = {

      gte: new Date(
        filtros.desde
      ),

      lte: new Date(
        `${filtros.hasta}T23:59:59.999Z`
      ),

    };

  }

  return await prisma.registroRiesgo.findMany({

    where,

    include: {
      sede: true,
      pabellon: true,
      piso: true,
      ambiente: true,
      responsable: true,
      tratamientos: true,
      seguimientos: true,
    },

    orderBy: {
      createdAt: "desc",
    },

  });

};
export const obtenerDashboardRiesgos =
async () => {

  const riesgos =
    await prisma.registroRiesgo.findMany();

  const total = riesgos.length;

  const altos =
    riesgos.filter(
      r => r.nivel >= 6
    ).length;

  const medios =
    riesgos.filter(
      r => r.nivel >= 3 &&
           r.nivel <= 4
    ).length;

  const bajos =
    riesgos.filter(
      r => r.nivel <= 2
    ).length;

  const categorias: Record<
    string,
    number
  > = {};

  riesgos.forEach((r) => {

    categorias[r.categoria] =
      (categorias[r.categoria] || 0)
      + 1;

  });

  const porCategoria =
    Object.entries(categorias)
    .map(
      ([categoria, cantidad]) => ({
        categoria,
        cantidad,
      })
    );

  const estados: Record<
    string,
    number
  > = {};

  riesgos.forEach((r) => {

    estados[r.estado] =
      (estados[r.estado] || 0)
      + 1;

  });

  const matriz: Record<
    string,
    number
  > = {};

  riesgos.forEach((r) => {

    const key =
      `${r.probabilidad}-${r.impacto}`;

    matriz[key] =
      (matriz[key] || 0)
      + 1;

  });

  const matrizArray =
    Object.entries(matriz)
    .map(([key, cantidad]) => {

      const [
        probabilidad,
        impacto,
      ] = key.split("-");

      return {
        probabilidad:
          Number(probabilidad),
        impacto:
          Number(impacto),
        cantidad,
      };
    });

  return {
    total,
    altos,
    medios,
    bajos,
    porCategoria,
    estados,
    matriz: matrizArray,
  };
};
export const planificarRiesgoService =
async (
  id: number,
  data: any,
  file: any
) => {

  await prisma.tratamientoRiesgo.create({

    data: {

      registroRiesgoId: id,

      tipoTratamiento:
        data.tipoTratamiento,

      planAccion:
        data.planAccion,

      presupuesto:
        file
          ? `/uploads/presupuestos/${file.filename}`
          : null,

    },

  });

  return await prisma.registroRiesgo.update({

    where: {
      id
    },

    data: {

      responsableId:
        Number(data.responsableId),

      estado:
        "EN PROCESO",

    },

  });

};
export const ejecutarRiesgoService =
async (
  id: number,
  data: any,
  file: any
) => {

  await prisma.seguimientoRiesgo.create({

    data: {

      registroRiesgoId: id,

      comentario:
        data.comentario,

      evidencia:
        file
          ? `/uploads/evidencias/${file.filename}`
          : null,

    },

  });

  return await prisma.registroRiesgo.update({

    where: {
      id
    },

    data: {
      estado: "ATENDIDO"
    },

  });

};
export const completarRiesgoService =
async (id: number) => {

  return await prisma.registroRiesgo.update({

    where: {
      id
    },

    data: {
      estado: "COMPLETADO"
    },

  });

};
