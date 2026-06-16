import { Router } from "express";
import {
listarLlavesController,
crearLlave
} from "./llaves.controller";

const router = Router();

router.get("/", listarLlavesController);
router.post(
"/",
crearLlave
);
export default router;