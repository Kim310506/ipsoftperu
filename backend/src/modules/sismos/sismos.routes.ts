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
  monitoreoOseg,
  cerrarSismos,
  alertaSismica,
  reportePorSede,
  sedesFaltantes
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
router.get("/sedes-reportadas", reportePorSede);

router.get(
  "/autorizaciones",
  listarAutorizaciones
);
router.get(
  "/sedes-faltantes",
  sedesFaltantes
);
router.get("/alerta", alertaSismica);
router.patch(
  "/cerrar-evento",
  cerrarSismos
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
router.patch(
  "/cerrar-evento",
  cerrarSismos
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