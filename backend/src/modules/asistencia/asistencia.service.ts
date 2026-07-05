import { prisma } from "../../config/prisma";

/* =======================
   BIOMETRÍA
======================= */

export const crearBiometria = async (data: any) => {
  return prisma.biometriaFacial.create({
    data: {
      fotoPerfil: data.fotoPerfil,
      descriptor: data.descriptor,

      user: {
        connect: {
          id: data.userId,
        },
      },
    },
  });
};
export const obtenerBiometria = async (userId: number) => {
  return prisma.biometriaFacial.findUnique({
    where: { userId },
  });
};

export const actualizarBiometria = async (userId: number, data: any) => {
  return prisma.biometriaFacial.update({
    where: { userId },
    data,
  });
};

/* =======================
   ASISTENCIA
======================= */

export const registrarAsistencia = async (data: any) => {
  return prisma.asistencia.create({
    data,
  });
};

export const obtenerAsistenciasPorUsuario = async (userId: number) => {
  return prisma.asistencia.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const obtenerTodasAsistencias = async () => {
  return prisma.asistencia.findMany({
    include: {
      user: true,
      sede: true,
    },
    orderBy: { createdAt: "desc" },
  });
};
/* =======================
   ASISTENCIA BIOMÉTRICA (PRO)
======================= */

function distanciaEuclidiana(a: number[], b: number[]) {
  return Math.sqrt(
    a.reduce((acc, val, i) => acc + Math.pow(val - (b[i] ?? 0), 2), 0)
  );
}

function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371e3;

  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;

  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* =======================
   ASISTENCIA BIOMÉTRICA
======================= */

export const marcarAsistenciaPorBiometria = async ({
  descriptor,
  latitud,
  longitud,
}: any) => {
  try {
    const usuarios = await prisma.user.findMany({
      include: {
        biometria: true,
      },
    });

    let mejorUsuario: any = null;
    let menorDistanciaRostro = 0.5;

    // 🔎 1. BUSCAR USUARIO POR ROSTRO
    for (const u of usuarios) {
      const biometria = u.biometria;

      if (!biometria?.descriptor) continue;

      const stored = biometria.descriptor as number[];

      const dist = distanciaEuclidiana(descriptor, stored);

      if (dist < menorDistanciaRostro) {
        menorDistanciaRostro = dist;
        mejorUsuario = u;
      }
    }

    if (!mejorUsuario) {
      return {
        ok: false,
        message: "Usuario no reconocido",
      };
    }

    if (!mejorUsuario.sedeId) {
      return {
        ok: false,
        message: "Usuario no tiene sede asignada",
      };
    }

    const sede = await prisma.sede.findUnique({
      where: { id: mejorUsuario.sedeId },
    });

    if (!sede) {
      return {
        ok: false,
        message: "Sede no encontrada",
      };
    }

    // 📍 2. CALCULAR DISTANCIA REAL
    const distancia = haversine(
      Number(latitud),
      Number(longitud),
      Number(sede.latitud),
      Number(sede.longitud)
    );

    // 🚫 3. VALIDACIÓN CLAVE (50 METROS)
    if (distancia > 50) {
      return {
        ok: false,
        message: `Estás muy lejos de la sede (${distancia.toFixed(
          2
        )} m). Máximo permitido: 50m`,
      };
    }

    // 📅 4. VER SI YA REGISTRÓ HOY
    const hoyInicio = new Date();
    hoyInicio.setHours(0, 0, 0, 0);

    const hoyFin = new Date();
    hoyFin.setHours(23, 59, 59, 999);

    const asistenciaHoy = await prisma.asistencia.findFirst({
      where: {
        userId: mejorUsuario.id,
        fecha: {
          gte: hoyInicio,
          lte: hoyFin,
        },
      },
      orderBy: {
        fecha: "desc",
      },
    });

    // 🔁 5. ENTRADA / SALIDA
    let tipoAsistencia: "ENTRADA" | "SALIDA" = "ENTRADA";

    if (asistenciaHoy && asistenciaHoy.tipo === "ENTRADA") {
      tipoAsistencia = "SALIDA";
    }

    // 💾 6. REGISTRAR
    const asistencia = await prisma.asistencia.create({
      data: {
        userId: mejorUsuario.id,
        sedeId: sede.id,
        tipo: tipoAsistencia,
        latitud,
        longitud,
        distancia,
      },
    });

    return {
      ok: true,
      message: `Asistencia registrada (${tipoAsistencia})`,
      user: mejorUsuario.nombre,
      tipo: tipoAsistencia,
      distancia,
      data: asistencia,
    };
  } catch (error) {
    console.error("❌ ERROR ASISTENCIA:", error);

    return {
      ok: false,
      message: "Error interno al registrar asistencia",
    };
  }
};
export const obtenerDashboardAsistencia = async () => {
  try {
    const ahora = new Date();

    const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);

    const inicioDia = new Date();
    inicioDia.setHours(0, 0, 0, 0);

    const finDia = new Date();
    finDia.setHours(23, 59, 59, 999);

    // 🔥 ASISTENCIAS GLOBAL
    const asistencias = await prisma.asistencia.findMany({
      include: {
        user: true,
        sede: true,
      },
      orderBy: {
        fecha: "desc",
      },
    });

    const ultima = asistencias[0];

    // 📊 MES
    const asistenciasMes = await prisma.asistencia.count({
      where: {
        fecha: {
          gte: inicioMes,
        },
      },
    });

    // 📊 HOY
    const entradasHoy = await prisma.asistencia.count({
      where: {
        tipo: "ENTRADA",
        fecha: {
          gte: inicioDia,
          lte: finDia,
        },
      },
    });

    const salidasHoy = await prisma.asistencia.count({
      where: {
        tipo: "SALIDA",
        fecha: {
          gte: inicioDia,
          lte: finDia,
        },
      },
    });

    // 👥 usuarios activos hoy
    const usuariosActivos = await prisma.asistencia.groupBy({
      by: ["userId"],
      where: {
        fecha: {
          gte: inicioDia,
        },
      },
    });

    // 🏢 sede más activa
    const sedes = await prisma.asistencia.groupBy({
      by: ["sedeId"],
      _count: {
        sedeId: true,
      },
      orderBy: {
        _count: {
          sedeId: "desc",
        },
      },
      take: 1,
    });

    let sedeMasActiva = "Sin datos";
if (sedes?.length) {
  const sedeId = sedes[0]?.sedeId;

  if (sedeId != null) {
    const sede = await prisma.sede.findUnique({
      where: { id: sedeId },
    });

    sedeMasActiva = sede?.nombre ?? "Sin datos";
  }
}

    return {
      ok: true,
      data: {
        ultimaAsistencia: ultima
          ? new Date(ultima.fecha).toLocaleTimeString()
          : "--:--",

        asistenciasMes,
        entradasHoy,
        salidasHoy,

        usuariosActivos: usuariosActivos.length,

        sedeMasActiva,

        estadoGeneral: "OPERATIVO",
      },
    };

  } catch (error) {
    console.error("ERROR DASHBOARD GLOBAL:", error);

    return {
      ok: false,
      message: "Error al obtener dashboard global",
    };
  }
};