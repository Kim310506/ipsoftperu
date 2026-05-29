// src/modules/incidentes/controllers/incidentes.controller.ts

import { Request, Response } from "express";

import {

  listarOcurrenciasService,
  obtenerOcurrenciaService,
  crearOcurrenciaService,
  actualizarEstadoOcurrenciaService,
  eliminarOcurrenciaService,
  resumenOcurrenciasService,
  crearReporteService,
  crearSolucionService

} from "./incidentes.service";


// LISTAR
export const listarOcurrencias =
async (
  req: Request,
  res: Response
) => {

  try {

    const data =
      await listarOcurrenciasService();

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Error al listar ocurrencias"

    });

  }

};


// OBTENER
export const obtenerOcurrencia =
async (
  req: Request,
  res: Response
) => {

  try {

    const id =
      Number(req.params.id);

    const data =
      await obtenerOcurrenciaService(id);

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Error al obtener ocurrencia"

    });

  }

};


// CREAR
export const crearOcurrencia =
async (
  req: Request,
  res: Response
) => {

  try {

    const ocurrencia =
      await crearOcurrenciaService(
        req.body,
        req.files as Express.Multer.File[]
      );

    res.json({

      message:
        "Ocurrencia registrada",

      ocurrencia

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Error al registrar ocurrencia"

    });

  }

};
// ACTUALIZAR ESTADO
export const actualizarEstadoOcurrencia =
async (
  req: Request,
  res: Response
) => {

  try {

    const id =
      Number(req.params.id);

    const data =
      req.body;

    const ocurrencia =
      await actualizarEstadoOcurrenciaService(
        id,
        data
      );

    res.json({

      message:
        "Estado actualizado",

      ocurrencia

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Error al actualizar estado"

    });

  }

};


// ELIMINAR
export const eliminarOcurrencia =
async (
  req: Request,
  res: Response
) => {

  try {

    const id =
      Number(req.params.id);

    await eliminarOcurrenciaService(id);

    res.json({

      message:
        "Ocurrencia eliminada"

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Error al eliminar"

    });

  }

};
export const resumenOcurrencias =
async (
  req: Request,
  res: Response
) => {

  try {

    const data =
      await resumenOcurrenciasService();

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message:
        "Error resumen"
    });

  }

};

export const crearReporte =
async (
  req: Request,
  res: Response
) => {

  try {

    const ocurrenciaId =
      Number(req.params.id);

    const { mensaje } =
      req.body;

    const usuarioId = 1;

    const reporte =
      await crearReporteService(

        ocurrenciaId,
        usuarioId,
        mensaje

      );

    res.json({

      message:
        "Reporte registrado",

      reporte

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Error al registrar reporte"

    });

  }

};
export const crearSolucion =
async (req: Request, res: Response) => {

  try {

    const ocurrenciaId = Number(req.params.id);

    const { mensaje, usuarioId } = req.body;

    const files = req.files as Express.Multer.File[];

    const solucion = await crearSolucionService(
      ocurrenciaId,
      Number(usuarioId),
      mensaje,
      files
    );

    res.json({
      message: "Solución registrada",
      solucion
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error al registrar solución"
    });

  }
};