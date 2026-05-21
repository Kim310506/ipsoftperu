import { Router } from "express";
import {
  listarZonales,
  obtenerZonal,
  crearZonal,
  actualizarZonal,
  eliminarZonal
} from "./zonal.controller";

const router = Router();

// CRUD
router.get("/", listarZonales);
router.get("/:id", obtenerZonal);
router.post("/", crearZonal);
router.put("/:id", actualizarZonal);
router.delete("/:id", eliminarZonal);

export default router;