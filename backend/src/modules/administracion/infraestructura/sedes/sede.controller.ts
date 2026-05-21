import { Request, Response } from "express";

import {

  listarSedesService,
  obtenerSedeService,
  crearSedeService,
  actualizarSedeService,
  eliminarSedeService

} from "./sede.service";



export const listarSedes = async (
  req: Request,
  res: Response
) => {

  const sedes = await listarSedesService();

  res.json(sedes);

};



export const obtenerSede = async (
  req: Request,
  res: Response
) => {

  const sede = await obtenerSedeService(
    Number(req.params.id)
  );

  res.json(sede);

};



export const crearSede = async (
  req: Request,
  res: Response
) => {

  const sede = await crearSedeService(
    req.body
  );

  res.json(sede);

};



export const actualizarSede = async (
  req: Request,
  res: Response
) => {

  const sede = await actualizarSedeService(
    Number(req.params.id),
    req.body
  );

  res.json(sede);

};



export const eliminarSede = async (
  req: Request,
  res: Response
) => {

  await eliminarSedeService(
    Number(req.params.id)
  );

  res.json({

    message: "Sede eliminada"

  });

};