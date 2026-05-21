import { Request, Response } from "express";

import {
  listarVisitantesService,
  obtenerVisitanteService,
  crearVisitanteService,
  actualizarVisitanteService,
  eliminarVisitanteService
} from "./visitante.service";

export const getVisitantes = async (req: Request, res: Response) => {
  try {
    const visitantes = await listarVisitantesService();
    res.json(visitantes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al listar visitantes" });
  }
};

export const getVisitanteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const visitante = await obtenerVisitanteService(Number(id));

    res.json(visitante);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener visitante" });
  }
};

export const createVisitante = async (req: Request, res: Response) => {
  try {
    const visitante = await crearVisitanteService(req.body);
    res.json(visitante);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear visitante" });
  }
};

export const updateVisitante = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const visitante = await actualizarVisitanteService(
      Number(id),
      req.body
    );

    res.json(visitante);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar visitante" });
  }
};

export const deleteVisitante = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await eliminarVisitanteService(Number(id));

    res.json({ message: "Visitante eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar visitante" });
  }
};