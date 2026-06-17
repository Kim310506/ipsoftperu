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

    if (
      req.originalUrl.includes("/riesgos")
    ) {
      dir =
        "uploads/riesgos";
    }

    if (
  req.originalUrl.includes("/documento")
) {
console.log("URL:", req.originalUrl);
  console.log("BODY:", req.body)
 const tipo = req.params.tipo;

console.log("TIPO:", tipo);
  if (tipo === "SCTR") {
    dir =
      "uploads/contratas/sctr";
  }

  if (tipo === "CM") {
    dir =
      "uploads/contratas/cm";
  }

  if (tipo === "CTA") {
    dir =
      "uploads/contratas/cta";
  }

}
if (
  req.originalUrl.includes("/llaves/prestamo") ||
  req.originalUrl.includes("/llaves/llaveros")
) {
  dir = "uploads/llaveros/prestamos";
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