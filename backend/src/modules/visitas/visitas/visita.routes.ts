import { Router } from "express";

import {
  getVisitas,
  getVisitaById,
  createVisita,
  updateVisita,
  deleteVisita
} from "./visita.controller";

const router = Router();

// 🔹 CRUD Visitas
router.get("/", getVisitas);
router.get("/:id", getVisitaById);
router.post("/", createVisita);
router.put("/:id", updateVisita);
router.delete("/:id", deleteVisita);

export default router;