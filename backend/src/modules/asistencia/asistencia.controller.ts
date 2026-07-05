import { Request, Response } from "express";
import {
  crearBiometria,
  obtenerBiometria,
  actualizarBiometria,
  registrarAsistencia,
  obtenerAsistenciasPorUsuario,
  obtenerTodasAsistencias,
  marcarAsistenciaPorBiometria,
  obtenerDashboardAsistencia
} from "./asistencia.service";

/* =======================
   BIOMETRÍA
======================= */

export const registrarBiometria = async (req: Request, res: Response) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const userId = Number(req.body.userId);
    const descriptor = JSON.parse(req.body.descriptor || "{}");

    const fotoPerfil = req.file
    ? `uploads/asistencia/biometria/${req.file.filename}`
    : null;
    if (!userId) {
      return res.status(400).json({ message: "userId inválido" });
    }

    const existe = await obtenerBiometria(userId);

    if (existe) {
      const actualizado = await actualizarBiometria(userId, {
        fotoPerfil,
        descriptor,
      });

      return res.json({
        ok: true,
        message: "Biometría actualizada",
        data: actualizado,
      });
    }

    const creado = await crearBiometria({
      userId,
      fotoPerfil,
      descriptor,
    });

    return res.json({
      ok: true,
      message: "Biometría registrada",
      data: creado,
    });

  } catch (error) {
    console.log("❌ ERROR BIOMETRÍA:", error);

    return res.status(500).json({
      ok: false,
      message: "Error interno",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getBiometria = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const data = await obtenerBiometria(Number(userId));

    res.json({
      ok: true,
      data,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al obtener biometría",
    });
  }
};

/* =======================
   ASISTENCIA
======================= */

export const createAsistencia = async (req: Request, res: Response) => {
  try {
    const data = await registrarAsistencia(req.body);

    res.json({
      ok: true,
      message: "Asistencia registrada",
      data,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al registrar asistencia",
      error,
    });
  }
};

export const getAsistenciasByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const data = await obtenerAsistenciasPorUsuario(Number(userId));

    res.json({
      ok: true,
      data,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al obtener asistencias",
    });
  }
};

export const getAllAsistencias = async (req: Request, res: Response) => {
  try {
    const data = await obtenerTodasAsistencias();

    res.json({
      ok: true,
      data,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error al obtener asistencias",
    });
  }
};

export const marcarAsistencia = async (req: Request, res: Response) => {
  try {
    const { descriptor, latitud, longitud } = req.body;

    // VALIDACIÓN BÁSICA
    if (!descriptor || !latitud || !longitud) {
      return res.status(400).json({
        ok: false,
        message: "Faltan datos: descriptor, latitud o longitud",
      });
    }

    const result = await marcarAsistenciaPorBiometria({
      descriptor,
      latitud,
      longitud,
    });

    return res.json(result);

  } catch (error) {
    console.error("❌ ERROR MARCAR ASISTENCIA:", error);

    return res.status(500).json({
      ok: false,
      message: "Error al marcar asistencia",
    });
  }
};
export const dashboardAsistencia = async (req: Request, res: Response) => {
  try {
    const result = await obtenerDashboardAsistencia();

    return res.json(result);

  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error en dashboard global",
    });
  }
};