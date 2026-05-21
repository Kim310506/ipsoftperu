import { Request, Response } from "express";

import {
  listarUnidadesService,
  obtenerUnidadService,
  crearUnidadService,
  actualizarUnidadService,
  eliminarUnidadService
} from "./unidad.service";

export const listarUnidades = async (
  req: Request,
  res: Response
) => {

  const unidades = await listarUnidadesService();

  res.json(unidades);

};

export const obtenerUnidad = async (
  req: Request,
  res: Response
) => {

  const unidad = await obtenerUnidadService(
    Number(req.params.id)
  );

  res.json(unidad);

};

export const crearUnidad = async (
  req: Request,
  res: Response
) => {

  const unidad = await crearUnidadService(
    req.body
  );

  res.json(unidad);

};

export const actualizarUnidad = async (
  req: Request,
  res: Response
) => {

  const unidad = await actualizarUnidadService(
    Number(req.params.id),
    req.body
  );

  res.json(unidad);

};

export const eliminarUnidad = async (
  req: Request,
  res: Response
) => {

  await eliminarUnidadService(
    Number(req.params.id)
  );

  res.json({
    message: "Unidad eliminada"
  });

};