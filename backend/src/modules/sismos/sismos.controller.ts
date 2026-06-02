import { Request, Response } from "express";

import {

  listarSismosService,
  obtenerSismoService,
  crearSismoService,
  dashboardSismosService

} from "./sismos.service";

export const listarSismos =
async (
  req: Request,
  res: Response
) => {

  try {

    const data =
      await listarSismosService();

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Error al listar sismos"
    });

  }

};

export const obtenerSismo =
async (
  req: Request,
  res: Response
) => {

  try {

    const id =
      Number(req.params.id);

    const data =
      await obtenerSismoService(id);

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Error al obtener sismo"
    });

  }

};

export const crearSismo = async (
  req: Request,
  res: Response
) => {
  try {

    const sismo =
      await crearSismoService(
        req.body,
        req.files
      );

    res.json({
      message: "Sismo registrado",
      sismo
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error al registrar sismo"
    });

  }
};
export const dashboardSismos =
async (
  req: Request,
  res: Response
) => {

  try {

    const data =
      await dashboardSismosService();

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error dashboard"
    });

  }

};