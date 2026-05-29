import { Request, Response } from "express";

import {

  listarAmbientesService,

  obtenerAmbienteService,

  crearAmbienteService,

  actualizarAmbienteService,

  eliminarAmbienteService,
    listarAmbientesPorSedeService

} from "./ambiente.service";



export const getAmbientes = async (

  req: Request,

  res: Response

) => {

  try {

    const ambientes = await listarAmbientesService();

    res.json(ambientes);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error al listar ambientes"
    });

  }

};



export const getAmbienteById = async (

  req: Request,

  res: Response

) => {

  try {

    const { id } = req.params;

    const ambiente = await obtenerAmbienteService(
      Number(id)
    );

    res.json(ambiente);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error al obtener ambiente"
    });

  }

};



export const createAmbiente = async (

  req: Request,

  res: Response

) => {

  try {

    const ambiente = await crearAmbienteService(
      req.body
    );

    res.json(ambiente);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error al crear ambiente"
    });

  }

};



export const updateAmbiente = async (

  req: Request,

  res: Response

) => {

  try {

    const { id } = req.params;

    const ambiente = await actualizarAmbienteService(
      Number(id),
      req.body
    );

    res.json(ambiente);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error al actualizar ambiente"
    });

  }

};



export const deleteAmbiente = async (

  req: Request,

  res: Response

) => {

  try {

    const { id } = req.params;

    await eliminarAmbienteService(
      Number(id)
    );

    res.json({
      message: "Ambiente eliminado"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error al eliminar ambiente"
    });

  }

};

export const listarAmbientesPorSedeController =
async (
  req: Request,
  res: Response
) => {

  try {

    const sedeId =
      Number(req.params.sedeId);

    const data =
      await listarAmbientesPorSedeService(
        sedeId
      );

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Error al listar ambientes por sede"

    });

  }

};