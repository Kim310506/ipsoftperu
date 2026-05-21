import { Router } from "express";

import {
  getAmbientes,
  getAmbienteById,
  createAmbiente,
  updateAmbiente,
  deleteAmbiente
} from "./ambiente.controller";

const router = Router();

router.get("/", getAmbientes);

router.get("/:id", getAmbienteById);

router.post("/", createAmbiente);

router.put("/:id", updateAmbiente);

router.delete("/:id", deleteAmbiente);

export default router;