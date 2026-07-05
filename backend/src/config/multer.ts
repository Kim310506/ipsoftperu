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

const tipo =
req.params.tipo;

const esInhouse =
req.originalUrl.includes(
"/contratasinhouse/"
);

const base =
esInhouse
? "uploads/inhouse"
: "uploads/contratas";

if (tipo === "SCTR") {
dir =
`${base}/sctr`;
}

if (tipo === "CM") {
dir =
`${base}/cm`;
}

if (tipo === "CTA") {
dir =
`${base}/cta`;
}

}

/* DOCUMENTOS EXTRA */
if (
req.originalUrl.includes(
"/documentos-extra"
)
) {

const esInhouse =
req.originalUrl.includes(
"/contratasinhouse/"
);

dir =
esInhouse
? "uploads/inhouse/documentos_extra"
: "uploads/contratas/documentos_extra";

}
if (
  req.originalUrl.includes("/asistencia") ||
  req.originalUrl.includes("/biometria")
) {
  dir = "uploads/asistencia/biometria";
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