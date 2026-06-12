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
  eliminarTrabajador,
  listarTrabajadoresContrata,
  verificarQrContrataController,
  registrarIngresoVisitanteController,
  registrarSalidaVisitanteController
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
router.post(
  "/verificar-qr",
  verificarQrContrataController
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
router.get("/trabajadores", listarTrabajadoresContrata);
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
// INGRESO
router.put("/ingreso/:id", registrarIngresoVisitanteController);

// SALIDA
router.put("/salida/:id", registrarSalidaVisitanteController);
export default router;