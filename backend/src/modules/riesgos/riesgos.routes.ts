import { Router } from "express";
import { crearRiesgo } from "./riesgos.controller";
import { upload } from "../../config/multer";

const router = Router();

router.post(
  "/",
  upload.single("imagen"),
  crearRiesgo
);

export default router;