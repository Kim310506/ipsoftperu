// src/modules/administracion/infraestructura/pabellones/pabellon.routes.ts

import { Router } from "express";

import {

  getPabellones,

  getPabellonById,

  createPabellon,

  updatePabellon,

  deletePabellon

} from "./pabellon.controller";

const router = Router();

router.get(
  "/",
  getPabellones
);

router.get(
  "/:id",
  getPabellonById
);

router.post(
  "/",
  createPabellon
);

router.put(
  "/:id",
  updatePabellon
);

router.delete(
  "/:id",
  deletePabellon
);

export default router;