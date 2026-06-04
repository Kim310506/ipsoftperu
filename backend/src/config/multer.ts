// src/config/multer.ts

import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    let dir =
      "uploads/ocurrencias/evidencias_iniciales";

    // cuando envías una solución
    if (
      req.originalUrl.includes("/solucion")
    ) {

      dir =
        "uploads/ocurrencias/soluciones";

    }

    if (!fs.existsSync(dir)) {

      fs.mkdirSync(dir, {
        recursive: true
      });

    }

    cb(null, dir);

  },

  filename: (req, file, cb) => {

    const unique =
      `${Date.now()}-${file.originalname}`;

    cb(null, unique);

  },

});

export const upload =
  multer({ storage });