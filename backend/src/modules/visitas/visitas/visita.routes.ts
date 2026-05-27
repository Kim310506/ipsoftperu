import { Router } from "express";

import {
  getVisitas,
  getVisitaById,
  createVisita,
  updateVisita,
  deleteVisita,
  verificarQRController,
  dashboardVisitas,
  registrarIngresoVisitante,
  registrarSalidaVisitante,
  registrarVisitantesExternos,
listarNotificaciones,
  autorizarVisita,
  desautorizarVisita,
  cancelarVisita

} from "./visita.controller";

const router = Router();

/* ========================= */
/* CRUD */
/* ========================= */

router.get("/", getVisitas);

router.get("/dashboard", dashboardVisitas);

router.get("/:id", getVisitaById);

router.post("/", createVisita);

router.put("/:id", updateVisita);

router.delete("/:id", deleteVisita);

/* ========================= */
/* AUTORIZACION */
/* ========================= */

router.put(
  "/:id/autorizar",
  autorizarVisita
);

router.put(
  "/:id/desautorizar",
  desautorizarVisita
);

router.put(
  "/:id/cancelar",
  cancelarVisita
);

/* ========================= */
/* QR */
/* ========================= */

router.post(
  "/verificar-qr",
  verificarQRController
);

/* ========================= */
/* INGRESOS */
/* ========================= */

router.put(
  "/visitantes/ingreso/:id",
  registrarIngresoVisitante
);

router.put(
  "/visitantes/salida/:id",
  registrarSalidaVisitante
);

/* ========================= */
/* REGISTRO EXTERNO */
/* ========================= */

router.post(
  "/registro-externo/:codigo",
  registrarVisitantesExternos
);
router.get(
  "/notificaciones",
  listarNotificaciones
);
export default router;