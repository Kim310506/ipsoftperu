import { Request, Response } from "express";

import {
  listarVisitasService,
  obtenerVisitaService,
  crearVisitaService,
  actualizarVisitaService,
  eliminarVisitaService
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

export const createVisita = async (req: Request, res: Response) => {
  try {
    const visita = await crearVisitaService(req.body);
    res.json(visita);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear visita" });
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