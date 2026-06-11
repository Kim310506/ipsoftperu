import { Router } from "express";
import { upload } from "../../../config/multer";

import {
  crearContrataController,
  listarContratasController,
  obtenerContrataPorToken,
  registrarTrabajador,
  guardarDocumento,
  aprobarAmbiente,
  aprobarSeguridad,
  rechazarContrata,
  guardarNivelRiesgo,
  actualizarTrabajador,
  eliminarTrabajador
} from "./contrata.controller";

const router = Router();

router.post(
  "/",
  crearContrataController
);

router.get(
  "/",
  listarContratasController
);

router.get(
  "/token/:token",
  obtenerContrataPorToken
);
router.put("/:id/aprobar-seguridad", aprobarSeguridad);
router.put("/:id/aprobar-ambiente", aprobarAmbiente);
router.put("/:id/rechazar", rechazarContrata);
router.post(
  "/token/:token/trabajadores",
  registrarTrabajador
);
router.put(
  "/trabajadores/:id",
  actualizarTrabajador
);
router.delete(
  "/trabajadores/:id",
  eliminarTrabajador
);
router.post(
  "/token/:token/documento/:tipo",
  upload.single("archivo"),
  guardarDocumento
);
router.put(
  "/token/:token/nivel-riesgo",
  guardarNivelRiesgo
);
export default router;