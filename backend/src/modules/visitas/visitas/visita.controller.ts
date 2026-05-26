import { Request, Response } from "express";
import { verificarQRService } from "./visita.service";
import QRCode from "qrcode";
import { enviarCorreoQR } from "../../../utils/mailer";
import { prisma } from "../../../config/prisma";import {
  listarVisitasService,
  obtenerVisitaService,
  crearVisitaService,
  actualizarVisitaService,
  eliminarVisitaService,
   registrarIngresoVisitanteService,
  registrarSalidaVisitanteService,
  registrarVisitantesExternosService
} from "./visita.service";
export const getVisitas = async (req: Request, res: Response) => {
  try {
    const visitas = await listarVisitasService();
    res.json(visitas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al listar visitas" });
  }
};

export const getVisitaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const visita = await obtenerVisitaService(Number(id));

    res.json(visita);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener visita" });
  }
};
export const verificarQRController = async (req: Request, res: Response) => {
  try {
    const { qrData } = req.body;

    if (!qrData) {
      return res.status(400).json({
        message: "QR vacío",
      });
    }

    const visitante = await verificarQRService(qrData);

    if (!visitante) {
      return res.status(404).json({
        message: "QR no válido",
      });
    }

    return res.json({
      message: "Acceso autorizado",
      visitante,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error en el servidor",
    });
  }
};
export const createVisita = async (
  req: Request,
  res: Response
) => {

  try {

    const visita =
      await crearVisitaService(req.body);

    return res.json(visita);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Error al crear visita"
    });

  }

};
export const updateVisita = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const visita = await actualizarVisitaService(
      Number(id),
      req.body
    );

    res.json(visita);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar visita" });
  }
};
export const registrarVisitantesExternos = async (
  req: Request,
  res: Response
) => {

  try {

    const { codigo } = req.params;

    const visitantes =
      await registrarVisitantesExternosService(
        String(codigo),
        req.body.visitantes
      );

    return res.json({
      message: "Visitantes registrados",
      visitantes,
    });

  } catch (error: any) {

    console.log(error);

    return res.status(500).json({
      message: error.message,
    });

  }

};
export const deleteVisita = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await eliminarVisitaService(Number(id));

    res.json({ message: "Visita eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar visita" });
  }
};
export const dashboardVisitas = async (
  req: Request,
  res: Response
) => {

  try {

    /* ========================= */
    /* TOTALES */
    /* ========================= */

    const totalVisitas =
      await prisma.visita.count();

    const pendientes =
      await prisma.visita.count({
        where: {
          estado: "PENDIENTE",
        },
      });

    const aprobados =
      await prisma.visita.count({
        where: {
          estado: "AUTORIZADO",
        },
      });

    /* ========================= */
    /* VISITAS POR SEDE */
    /* ========================= */

    const visitasPorSede =
      await prisma.visita.groupBy({
        by: ["sedeId"],
        _count: {
          sedeId: true,
        },
      });

    const sedes =
      await prisma.sede.findMany();

    const sedeData =
      visitasPorSede.map((item: any) => {

        const sede = sedes.find(
          (s: any) => s.id === item.sedeId
        );

        return {
          name: sede?.nombre || "SIN SEDE",
          value: item._count.sedeId,
        };

      });

    /* ========================= */
    /* MOTIVOS */
    /* ========================= */

    const motivos =
  await prisma.visita.groupBy({
    by: ["motivo"],

    _count: {
      motivo: true,
    },

    orderBy: {
      _count: {
        motivo: "desc",
      },
    },

    take: 10,
  });
    const motivosData =
      motivos.map((item: any) => ({
        motivo: item.motivo,
        cantidad: item._count.motivo,
      }));

    /* ========================= */
    /* RESPONSE */
    /* ========================= */

    return res.json({

      totalVisitas,

      pendientes,

      aprobados,

      estadoData: [
        {
          name: "APROBADO",
          value: aprobados,
        },
        {
          name: "PENDIENTE",
          value: pendientes,
        },
      ],

      sedeData,

      motivosData,

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Error dashboard",
    });

  }

};
export const registrarIngresoVisitante = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const visitante = await registrarIngresoVisitanteService(Number(id));

    return res.json(visitante);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al registrar ingreso" });
  }
};
export const registrarSalidaVisitante = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const visitante = await registrarSalidaVisitanteService(Number(id));

    return res.json(visitante);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al registrar salida" });
  }
};