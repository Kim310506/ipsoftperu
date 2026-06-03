// src/modules/incidentes/routes/incidentes.routes.ts
import { upload } from "../../config/multer";
import {
  Router,
} from "express";

import {

  listarOcurrencias,
  obtenerOcurrencia,
  crearOcurrencia,
  actualizarEstadoOcurrencia,
  eliminarOcurrencia,
  resumenOcurrencias,
  crearReporte,
  crearSolucion,
  dashboardOcurrencias

} from "./incidentes.controller";

const router =
  Router();


// LISTAR
router.get(
  "/",
  listarOcurrencias
);
router.get("/dashboard", dashboardOcurrencias);
// OBTENER
router.get(
  "/:id",
  obtenerOcurrencia
);

// CREAR
// CREAR
router.post(
  "/",
  upload.array("evidencias", 2),
  crearOcurrencia
);

// ACTUALIZAR ESTADO
router.put(
  "/:id/estado",
  actualizarEstadoOcurrencia
);

// ELIMINAR
router.delete(
  "/:id",
  eliminarOcurrencia
);
router.get(
  "/resumen",
  resumenOcurrencias
);
router.post(
  "/:id/reporte",
  crearReporte
);
router.post(
  "/:id/solucion",
  upload.array("imagenes"),
  crearSolucion
);
export default router;