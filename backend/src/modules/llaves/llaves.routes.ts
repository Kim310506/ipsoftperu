import { Router } from "express";
import { upload } from "../../config/multer";

import {
listarLlavesController,
crearLlave,
registrarMovimientoController,
listarLlaverosController,
reporteLlaverosController,
detalleReporteLlaveroController,
listarContratasController
} from "./llaves.controller";

const router = Router();
router.post(
"/",
crearLlave
);
router.get("/", listarLlavesController);
router.get("/contratas", listarContratasController);
router.get("/llaveros", listarLlaverosController);
router.post(
  "/prestamo",
  upload.fields([
    { name: "fotoEntrega", maxCount: 1 },
    { name: "fotoDevolucion", maxCount: 1 }
  ]),
  (req, res, next) => {
    req.body = req.body || {};
    next();
  },
  registrarMovimientoController
);
router.get("/llaveros/reporte", reporteLlaverosController);
router.get(
"/llaveros/reporte/:id",
detalleReporteLlaveroController
);
export default router;