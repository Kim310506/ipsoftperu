import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    let dir =
      "uploads/ocurrencias/evidencias_iniciales";

    if (
      req.originalUrl.includes("/solucion")
    ) {
      dir =
        "uploads/ocurrencias/soluciones";
    }

    // NUEVO
    if (
      req.originalUrl.includes("/riesgos")
    ) {
      dir =
        "uploads/riesgos";
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