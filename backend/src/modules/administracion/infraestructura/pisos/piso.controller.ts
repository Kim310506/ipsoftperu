import { Request, Response } from "express";

import {
  listarPisosService,
  obtenerPisoService,
  crearPisoService,
  actualizarPisoService,
  eliminarPisoService
} from "./piso.service";

export const listarPisos = async (req: Request, res: Response) => {
  const pisos = await listarPisosService();
  res.json(pisos);
};

export const obtenerPiso = async (req: Request, res: Response) => {
  const piso = await obtenerPisoService(Number(req.params.id));
  res.json(piso);
};

export const crearPiso = async (req: Request, res: Response) => {
  const piso = await crearPisoService(req.body);
  res.json(piso);
};

export const actualizarPiso = async (req: Request, res: Response) => {
  const piso = await actualizarPisoService(Number(req.params.id), req.body);
  res.json(piso);
};

export const eliminarPiso = async (req: Request, res: Response) => {
  await eliminarPisoService(Number(req.params.id));
  res.json({ message: "Piso eliminado" });
};