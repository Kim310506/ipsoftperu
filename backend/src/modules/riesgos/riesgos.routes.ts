import { Router } from "express";
import { 
  crearRiesgo,
  listarRiesgos,
  listarResponsables,
  crearResponsable,
  reporteRiesgos,
  dashboardRiesgos,
  planificarRiesgo,
  ejecutarRiesgo,
  completarRiesgo
} from "./riesgos.controller";
import { upload } from "../../config/multer";

const router = Router();

router.post(
  "/",
  upload.single("imagen"),
  crearRiesgo
);
router.get(
  "/listar",
  listarRiesgos
);
router.get(
  "/reporte",
  reporteRiesgos
);
router.get(
  "/dashboard",
  dashboardRiesgos
);
router.get(
  "/responsables",
  listarResponsables
);
router.post(
  "/responsables",
  crearResponsable
);
router.put(
  "/planificar/:id",
  upload.single("presupuesto"),
  planificarRiesgo
);

router.put(
  "/ejecutar/:id",
  upload.single("evidencia"),
  ejecutarRiesgo
);

router.put(
  "/completar/:id",
  completarRiesgo
);
export default router;