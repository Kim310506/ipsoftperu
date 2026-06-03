import { Router } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

  destination: (
    req,
    file,
    cb
  ) => {

    cb(
      null,
      "uploads/sismos"
    );

  },

  filename: (
    req,
    file,
    cb
  ) => {

    const extension =
      path.extname(
        file.originalname
      );

    cb(
      null,
      `${Date.now()}${extension}`
    );

  }

});

const upload = multer({
  storage
});
import {
  listarSismos,
  obtenerSismo,
  crearSismo,
  dashboardSismos,
  obtenerSedesAutorizables,
  autorizarSede,
  cambiarEstadoAutorizacion,
  listarAutorizaciones,
  monitoreoOseg
} from "./sismos.controller";

const router = Router();
router.get(
  "/dashboard",
  dashboardSismos
);
router.get(
  "/sedes-autorizables",
  obtenerSedesAutorizables
);
router.get(
  "/autorizaciones",
  listarAutorizaciones
);
router.post(
  "/autorizar",
  upload.single("plano"),
  autorizarSede
);
router.get(
  "/monitoreo",
  monitoreoOseg
);
router.put(
  "/autorizar/:id",
  cambiarEstadoAutorizacion
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