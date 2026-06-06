import { Request, Response } from "express";
import {
  crearRiesgoService,
  listarRiesgosService,
  crearResponsableService,
  listarResponsablesService,
  reporteRiesgosService,
  obtenerDashboardRiesgos,
  planificarRiesgoService,
  ejecutarRiesgoService,
  completarRiesgoService
} from "./riesgos.service";

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
export const listarRiesgos = async (
  req: Request,
  res: Response
) => {
  try {
    const riesgos =
      await listarRiesgosService();

    res.json(riesgos);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error al listar riesgos",
    });
  }
};

export const listarResponsables =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const responsables =
        await listarResponsablesService();

      res.json(responsables);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Error al listar responsables",
      });

    }

};

export const crearResponsable =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const responsable =
        await crearResponsableService(
          req.body
        );

      res.json(responsable);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Error al registrar responsable",
      });

    }

};

export const reporteRiesgos = async (
  req: Request,
  res: Response
) => {

  try {

    const riesgos =
      await reporteRiesgosService(
        req.query
      );

    res.json(riesgos);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Error al generar reporte",
    });

  }

};

export const dashboardRiesgos =
async (
  req: Request,
  res: Response
) => {

  try {

    const data =
      await obtenerDashboardRiesgos();

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Error al obtener dashboard",
    });

  }

};
export const planificarRiesgo =
async (
  req: Request,
  res: Response
) => {
  try {

    const riesgo =
      await planificarRiesgoService(

        Number(req.params.id),

        req.body,

        req.file

      );

    res.json(riesgo);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Error al planificar"
    });

  }

};
export const ejecutarRiesgo =
async (
  req: Request,
  res: Response
) => {

  try {

    const riesgo =
      await ejecutarRiesgoService(

        Number(req.params.id),

        req.body,

        req.file

      );

    res.json(riesgo);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Error al ejecutar"
    });

  }

};
export const completarRiesgo =
async (
  req: Request,
  res: Response
) => {

  try {

    const riesgo =
      await completarRiesgoService(
        Number(req.params.id)
      );

    res.json(riesgo);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Error al completar"
    });

  }

};
