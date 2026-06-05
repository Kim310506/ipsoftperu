import { Request, Response } from "express";
import { crearRiesgoService } from "./riesgos.service";

export const crearRiesgo = async (
  req: Request,
  res: Response
) => {
  try {

    console.log(req.body);
    console.log((req as any).file);

    const riesgo =
      await crearRiesgoService(
        req.body,
        (req as any).file
      );

    res.json(riesgo);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error al crear riesgo"
    });
  }
};