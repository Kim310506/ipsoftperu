// src/modules/administracion/infraestructura/pabellones/pabellon.controller.ts

import { Request, Response } from "express";

import {

  listarPabellonesService,

  obtenerPabellonService,

  crearPabellonService,

  actualizarPabellonService,

  eliminarPabellonService

} from "./pabellon.service";

export const getPabellones = async (

  req: Request,

  res: Response

) => {

  try {

    const pabellones =
      await listarPabellonesService();

    res.json(pabellones);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Error al listar pabellones"
    });

  }

};

export const getPabellonById = async (

  req: Request,

  res: Response

) => {

  try {

    const { id } = req.params;

    const pabellon =
      await obtenerPabellonService(
        Number(id)
      );

    res.json(pabellon);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Error al obtener pabellón"
    });

  }

};

export const createPabellon = async (

  req: Request,

  res: Response

) => {

  try {

    const pabellon =
      await crearPabellonService(
        req.body
      );

    res.json(pabellon);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Error al crear pabellón"
    });

  }

};

export const updatePabellon = async (

  req: Request,

  res: Response

) => {

  try {

    const { id } = req.params;

    const pabellon =
      await actualizarPabellonService(
        Number(id),
        req.body
      );

    res.json(pabellon);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Error al actualizar pabellón"
    });

  }

};

export const deletePabellon = async (

  req: Request,

  res: Response

) => {

  try {

    const { id } = req.params;

    await eliminarPabellonService(
      Number(id)
    );

    res.json({
      message:
        "Pabellón eliminado"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Error al eliminar pabellón"
    });

  }

};