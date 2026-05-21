import { Router } from "express";

import {
  getVisitantes,
  getVisitanteById,
  createVisitante,
  updateVisitante,
  deleteVisitante
} from "./visitante.controller";

const router = Router();

// 🔹 CRUD Visitantes
router.get("/", getVisitantes);
router.get("/:id", getVisitanteById);
router.post("/", createVisitante);
router.put("/:id", updateVisitante);
router.delete("/:id", deleteVisitante);

export default router;