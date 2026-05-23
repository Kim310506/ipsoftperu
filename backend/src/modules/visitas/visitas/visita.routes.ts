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
  registrarSalidaVisitante
} from "./visita.controller";

const router = Router();

// 🔹 CRUD Visitas
router.get("/", getVisitas);
router.get("/dashboard", dashboardVisitas);
router.get("/:id", getVisitaById);
router.post("/", createVisita);
router.put("/:id", updateVisita);
router.delete("/:id", deleteVisita);
router.post("/verificar-qr", verificarQRController);
router.put("/visitantes/ingreso/:id", registrarIngresoVisitante);

router.put("/visitantes/salida/:id", registrarSalidaVisitante);
export default router;