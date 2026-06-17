import { Request, Response } from "express";
import {
  listarLlavesService,
  crearLlaveService,
  registrarMovimientoService,
  listarLlaverosService,
  reporteLlaverosService
} from "./llaves.service";

// LISTAR LLAVES
export const listarLlavesController = async (req: Request, res: Response) => {
  try {
    const data = await listarLlavesService();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const listarLlaverosController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await listarLlaverosService();
    res.json(data);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};
// CREAR LLAVE
export const crearLlave = async (req: Request, res: Response) => {
  try {
    const data = await crearLlaveService(req.body);
    return res.status(201).json(data);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// CREAR PRÉSTAMO
export const registrarMovimientoController = async (
  req: Request,
  res: Response
) => {
  try {

    const files = (req as any).files;

    const payload: any = {
      llaveroId: Number(req.body.llaveroId),
      contrataId: Number(req.body.contrataId),

      tipoMovimiento: req.body.tipoMovimiento,
      detalle: req.body.detalle,

      responsableEntregaId:
        req.body.responsableEntregaId
          ? Number(req.body.responsableEntregaId)
          : undefined,

      responsableDevolucionId:
        req.body.responsableDevolucionId
          ? Number(req.body.responsableDevolucionId)
          : undefined,

      responsableTransferenciaId:
        req.body.responsableTransferenciaId
          ? Number(req.body.responsableTransferenciaId)
          : undefined,
    };

    if (req.body.contrataDestinoId) {
      payload.contrataDestinoId =
        Number(req.body.contrataDestinoId);
    }

    if (files?.fotoEntrega?.[0]) {
      payload.fotoEntrega =
        files.fotoEntrega[0].filename;
    }

    if (files?.fotoDevolucion?.[0]) {
      payload.fotoDevolucion =
        files.fotoDevolucion[0].filename;
    }

    const resultado =
      await registrarMovimientoService(payload);

    return res.status(200).json({
      ok: true,
      data: resultado
    });

  } catch (error: any) {

    return res.status(400).json({
      ok: false,
      message: error.message
    });

  }
};
export const reporteLlaverosController = async (
  req: Request,
  res: Response
) => {
  try {
    const { fechaInicio, fechaFin } = req.query;

    const data = await reporteLlaverosService(
      fechaInicio as string,
      fechaFin as string
    );

    res.json(data);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
};