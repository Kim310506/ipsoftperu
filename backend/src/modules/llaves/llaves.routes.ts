import { Router } from "express";
import { upload } from "../../config/multer";

import {
listarLlavesController,
crearLlave,
registrarMovimientoController,
listarLlaverosController,
reporteLlaverosController
} from "./llaves.controller";

const router = Router();
router.post(
"/",
crearLlave
);
router.get("/", listarLlavesController);
router.get("/llaveros", listarLlaverosController);
router.post(
  "/prestamo",
  upload.fields([
    {
      name: "fotoEntrega",
      maxCount: 1
    },
    {
      name: "fotoDevolucion",
      maxCount: 1
    }
  ]),
  registrarMovimientoController
);
router.get("/llaveros/reporte", reporteLlaverosController);
export default router;