import {Router} from "express";


import {

ambientes,
crearQR,
listarQR,
registrarRonda,
reportes,
dashboard

} from "./rondas.controller";


const router = Router();



router.get(
"/ambientes",
ambientes
);



router.post(
"/qr",
crearQR
);



router.get(
"/qr",
listarQR
);



router.post(
"/escanear",
registrarRonda
);

router.get(
"/dashboard",
dashboard
);

router.get(
"/reportes",
reportes
);



export default router;