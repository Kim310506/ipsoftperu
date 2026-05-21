import { Router } from "express";

import {

  listarUnidades,
  obtenerUnidad,
  crearUnidad,
  actualizarUnidad,
  eliminarUnidad

} from "./unidad.controller";

const router = Router();



/* ========================= */
/* LISTAR */
/* ========================= */

router.get(
  "/",
  listarUnidades
);



/* ========================= */
/* OBTENER UNO */
/* ========================= */

router.get(
  "/:id",
  obtenerUnidad
);



/* ========================= */
/* CREAR */
/* ========================= */

router.post(
  "/",
  crearUnidad
);



/* ========================= */
/* ACTUALIZAR */
/* ========================= */

router.put(
  "/:id",
  actualizarUnidad
);



/* ========================= */
/* ELIMINAR */
/* ========================= */

router.delete(
  "/:id",
  eliminarUnidad
);



export default router;