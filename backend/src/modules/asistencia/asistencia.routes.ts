import { Router } from "express";
import { upload } from "../../config/multer";
import {
  registrarBiometria,
  getBiometria,
  createAsistencia,
  getAsistenciasByUser,
  getAllAsistencias,
  marcarAsistencia,
  dashboardAsistencia
} from "./asistencia.controller";

const router = Router();

/* =======================
   ASISTENCIA
======================= */

router.post("/", createAsistencia);

router.get("/user/:userId", getAsistenciasByUser);

router.get("/", getAllAsistencias);

/* =======================
   BIOMETRÍA
======================= */
router.get(
  "/dashboard",
  dashboardAsistencia
);
router.post(
  "/biometria",
  (req, res, next) => {
    console.log("🔥 PASO POR ROUTE");
    next();
  },
  upload.single("fotoPerfil"),
  registrarBiometria
);
router.get("/biometria/:userId", getBiometria);
router.post("/marcar", marcarAsistencia);

export default router;