import { Request, Response } from "express";

import {

  listarSismosService,
  obtenerSismoService,
  crearSismoService,
  dashboardSismosService,
  obtenerSedesAutorizablesService,
  autorizarSedeService,
  cambiarEstadoAutorizacionService,
  listarAutorizacionesService,
  monitoreoOsegService

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

  console.log(
    "PARAM ID =>",
    req.params.id
  );

  try {

    const id = Number(
      req.params.id
    );

    if (isNaN(id)) {

      return res.status(400).json({
        message: "ID inválido",
        recibido: req.params.id
      });

    }

    const data =
      await obtenerSismoService(id);

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error al obtener sismo"
    });

  }

};

export const crearSismo = async (
  req: any,
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
export const obtenerSedesAutorizables =
async (
  req: Request,
  res: Response
) => {

  try {

    const data =
      await obtenerSedesAutorizablesService();

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error"
    });

  }

};
export const autorizarSede =
async (
  req: any,
  res: Response
) => {

  try {

    const sedeId =
      Number(req.body.sedeId);

    if (!sedeId) {

      return res.status(400).json({
        message: "Sede inválida"
      });

    }

    if (!req.file) {

      return res.status(400).json({
        message: "Debe adjuntar un plano"
      });

    }

    const archivo =
      `/uploads/sismos/${req.file.filename}`;

    const data =
      await autorizarSedeService(
        sedeId,
        archivo
      );

    return res.json({
      message: "Sede autorizada",
      data
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Error al autorizar sede"
    });

  }

};
export const cambiarEstadoAutorizacion =
async (
  req: Request,
  res: Response
) => {

  try {

    const sedeId =
      Number(req.params.id);

    const { estado } =
      req.body;

    const data =
      await cambiarEstadoAutorizacionService(
        sedeId,
        estado
      );

    res.json({
      message:
        "Estado actualizado",
      data
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Error al cambiar estado"
    });

  }

};
export const listarAutorizaciones =
async (
  req: Request,
  res: Response
) => {

  try {

    const data =
      await listarAutorizacionesService();

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Error al listar autorizaciones"
    });

  }

};
export const monitoreoOseg =
async (
  req: Request,
  res: Response
) => {

  try {

    const data =
      await monitoreoOsegService();

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error monitoreo"
    });

  }

};