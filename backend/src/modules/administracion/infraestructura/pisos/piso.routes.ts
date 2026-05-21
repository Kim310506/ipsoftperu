import { Router } from "express";

import {
  listarPisos,
  obtenerPiso,
  crearPiso,
  actualizarPiso,
  eliminarPiso
} from "./piso.controller";

const router = Router();

router.get("/", listarPisos);
router.get("/:id", obtenerPiso);
router.post("/", crearPiso);
router.put("/:id", actualizarPiso);
router.delete("/:id", eliminarPiso);

export default router;