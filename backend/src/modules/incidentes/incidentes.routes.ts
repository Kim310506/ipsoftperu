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
  dashboardOcurrencias,
  cerrarOcurrencia,
  rechazarSolucion,
  exportarPdf

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
router.put(
  "/:id/cerrar",
  cerrarOcurrencia
);
router.get(
  "/:id/pdf",
  exportarPdf
);
router.put(
  "/:id/rechazar",
  rechazarSolucion
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