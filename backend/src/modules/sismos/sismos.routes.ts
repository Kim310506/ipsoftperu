import { Router } from "express";
import multer from "multer";
const upload = multer({
  dest: "uploads/sismos"
});
import {
  listarSismos,
  obtenerSismo,
  crearSismo,
  dashboardSismos
} from "./sismos.controller";

const router = Router();
router.get(
  "/dashboard",
  dashboardSismos
);
router.get(
  "/",
  listarSismos
);

router.get(
  "/:id",
  obtenerSismo
);

router.post(
  "/",
  upload.fields([
    {
      name: "fotoEvacuacion",
      maxCount: 1
    },
    {
      name: "fotoDanios",
      maxCount: 1
    },
    {
      name: "fotoVictimas",
      maxCount: 1
    }
  ]),
  crearSismo
);

export default router;