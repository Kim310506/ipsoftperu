import { Router } from "express";

import {

  listarSedes,
  obtenerSede,
  crearSede,
  actualizarSede,
  eliminarSede

} from "./sede.controller";

const router = Router();



router.get(
  "/",
  listarSedes
);

router.get(
  "/:id",
  obtenerSede
);

router.post(
  "/",
  crearSede
);

router.put(
  "/:id",
  actualizarSede
);

router.delete(
  "/:id",
  eliminarSede
);



export default router;