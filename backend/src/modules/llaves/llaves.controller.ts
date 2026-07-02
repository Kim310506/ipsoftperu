import { Request, Response } from "express";
import {
  listarLlavesService,
  crearLlaveService,
  registrarMovimientoService,
  listarLlaverosService,
  reporteLlaverosService,
  detalleReporteLlaveroService,
  listarContratasService
} from "./llaves.service";


export const listarContratasController = async (req: Request, res: Response) => {
  try {

    const data = await listarContratasService();

    return res.json(data);

  } catch (error: any) {

    return res.status(500).json({
      message: "Error al listar contratas",
      error: error.message
    });

  }
};
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
console.log("FILES:", files);
    const payload: any = {
      llaveroId: Number(req.body.llaveroId),
      contrataId: Number(req.body.contrataId),
      tipoContrata: req.body.tipoContrata,
      tipoMovimiento: req.body.tipoMovimiento,
      detalle: req.body.detalle,

      responsableEntregaId:
        req.body.responsableEntregaId
          ? Number(req.body.responsableEntregaId)
          : undefined,
      tipoResponsableEntrega: req.body.tipoResponsableEntrega,
      responsableDevolucionId:
        req.body.responsableDevolucionId
          ? Number(req.body.responsableDevolucionId)
          : undefined,
      tipoResponsableDevolucion: req.body.tipoResponsableDevolucion,
      responsableTransferenciaId:
        req.body.responsableTransferenciaId
          ? Number(req.body.responsableTransferenciaId)
          : undefined,
      tipoResponsableTransferencia: req.body.tipoResponsableTransferencia,
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
console.log("PAYLOAD:", payload);
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

    console.log("FECHAS:", {
      fechaInicio,
      fechaFin
    });

    const data =
      await reporteLlaverosService(
        fechaInicio as string,
        fechaFin as string
      );

    console.log("DATA:", data);

    return res.json(data);

  } catch (error: any) {

    console.log("ERROR REPORTE:");
    console.log(error);

    return res.status(500).json({
      message: error.message
    });

  }
};
export const detalleReporteLlaveroController =
async (
req: Request,
res: Response
) => {

try {

const data =
await detalleReporteLlaveroService(
Number(req.params.id)
);

res.json(data);

}
catch(error:any){

res.status(500).json({
message:error.message
});

}

};