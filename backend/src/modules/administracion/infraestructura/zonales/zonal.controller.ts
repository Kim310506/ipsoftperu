import { Request, Response } from "express";
import {
  listarZonalesService,
  obtenerZonalService,
  crearZonalService,
  actualizarZonalService,
  eliminarZonalService
} from "./zonal.service";

// LISTAR
export const listarZonales = async (req: Request, res: Response) => {
  const data = await listarZonalesService();
  res.json(data);
};

// OBTENER
export const obtenerZonal = async (req: Request, res: Response) => {
  const data = await obtenerZonalService(Number(req.params.id));
  res.json(data);
};

// CREAR
export const crearZonal = async (req: Request, res: Response) => {
  const data = await crearZonalService(req.body);
  res.json(data);
};

// ACTUALIZAR
export const actualizarZonal = async (req: Request, res: Response) => {
  const data = await actualizarZonalService(Number(req.params.id), req.body);
  res.json(data);
};

// ELIMINAR
export const eliminarZonal = async (req: Request, res: Response) => {
  const data = await eliminarZonalService(Number(req.params.id));
  res.json(data);
};