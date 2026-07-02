import { Request, Response } from "express";
import { crearContrata, 
  listarContratasService, 
  obtenerContrataPorTokenService,
  registrarTrabajadorService,
guardarDocumentoService,
aprobarAmbienteService,
aprobarSeguridadService,
rechazarContrataService,
guardarNivelRiesgoService,
actualizarTrabajadorService,
eliminarTrabajadorService ,
listarTrabajadoresContrataService,
verificarQrContrataService,
registrarIngresoVisitanteService,
registrarSalidaVisitanteService,
guardarDocumentosExtraService

} from "./contrata.service";

export const crearContrataController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const contrata =
        await crearContrata(
          req.body
        );

      return res.status(201).json(
        contrata
      );

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        message:
          "Error al registrar contrata"
      });

    }

  };
export const listarContratasController = async (req: Request, res: Response) => {
  try {
    const data = await listarContratasService();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: "Error al listar contratas" });
  }
};
export const obtenerContrataPorToken = async (
  req: Request,
  res: Response
) => {
  try {
    const token = req.params.token;

if (!token || Array.isArray(token)) {
  return res.status(400).json({
    message: "Token inválido",
  });
}

const data = await obtenerContrataPorTokenService(token);
    if (!data) {
      return res.status(404).json({
        message: "Contrata no encontrada",
      });
    }

    return res.json(data);

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al obtener contrata",
    });
  }
};

export const registrarTrabajador = async (
  req: Request,
  res: Response
) => {
  try {

    const token = req.params.token;

    if (!token || Array.isArray(token)) {
      return res.status(400).json({
        message: "Token inválido"
      });
    }

    const trabajador =
      await registrarTrabajadorService(
        token,
        req.body
      );

    return res.status(201).json(
      trabajador
    );

  } catch (error: any) {

    console.log(error);

    return res.status(500).json({
      message: error.message
    });

  }
};

export const guardarDocumento = async (
  req: Request,
  res: Response
) => {
  try {

    const token = req.params.token;

    if (!token || Array.isArray(token)) {
      return res.status(400).json({
        message: "Token inválido"
      });
    }

    const tipo = req.params.tipo;

      if (!tipo || Array.isArray(tipo)) {
        return res.status(400).json({
          message: "Tipo inválido"
        });
      }

    const archivo =
      (req as any).file?.filename;

    if (!archivo) {
      return res.status(400).json({
        message: "Debe adjuntar archivo"
      });
    }

    let carpeta = "";

    if (tipo === "SCTR") {
      carpeta = "sctr";
    }

    if (tipo === "CM") {
      carpeta = "cm";
    }

    if (tipo === "CTA") {
      carpeta = "cta";
    }

    const rutaArchivo =
      `/uploads/inhouse/${carpeta}/${archivo}`;

    const data =
      await guardarDocumentoService(
        token,
        tipo,
        rutaArchivo
      );

    return res.json(data);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message:
        "Error al guardar documento"
    });

  }
};
export const subirDocumentosExtra =
async (
  req: Request,
  res: Response
) => {

try {

const token =
req.params.token;

if (
!token ||
Array.isArray(token)
) {

return res.status(400).json({

message:
"Token inválido"

});

}

const archivos =
(req as any)
.files;

if (
!archivos ||
archivos.length === 0
) {

return res.status(400).json({

message:
"Debe adjuntar archivos"

});

}

const rutas =

archivos.map(
(file: any) =>

`/uploads/inhouse/documentos_extra/${file.filename}`

);

const data =

await guardarDocumentosExtraService(

token,

rutas

);

return res.json({

message:
"Documentos extra registrados",

data

});

}

catch (error) {

console.log(error);

return res.status(500).json({

message:
"Error al guardar documentos extra"

});

}

};
export const guardarNivelRiesgo = async (
  req: Request,
  res: Response
) => {

  try {

    const token = req.params.token;
      if (!token || Array.isArray(token)) {
        return res.status(400).json({
          message: "Token inválido"
        });
      }

    const { nivelRiesgo } =
      req.body;

    const data =
      await guardarNivelRiesgoService(
        token,
        nivelRiesgo
      );

    return res.json(data);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message:
        "Error al guardar nivel de riesgo"
    });

  }

};
export const aprobarSeguridad = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const { usuarioId } = req.body;

    const result = await aprobarSeguridadService(
      Number(id),
      Number(usuarioId)
    );

    return res.json(result);

  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
};
export const aprobarAmbiente = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    const { usuarioId } = req.body;

    const result = await aprobarAmbienteService(
      Number(id),
      Number(usuarioId)
    );

    return res.json(result);

  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
};
export const rechazarContrata = async (
  req: Request,
  res: Response
) => {
  try {

    const id = Number(req.params.id);

    const {
      usuarioId,
      motivoRechazo
    } = req.body;

    const data =
      await rechazarContrataService(
        id,
        usuarioId,
        motivoRechazo
      );

    res.json(data);

  } catch (error: any) {

    res.status(400).json({
      message: error.message
    });

  }
};

export const actualizarTrabajador =
async (
  req: Request,
  res: Response
) => {

  const trabajador =
    await actualizarTrabajadorService(
      Number(req.params.id),
      req.body
    );

  res.json(trabajador);

};
export const eliminarTrabajador =
async (
  req: Request,
  res: Response
) => {

  const trabajador =
    await eliminarTrabajadorService(
      Number(req.params.id)
    );

  res.json(trabajador);

};
export const listarTrabajadoresContrata = async (
  req: Request,
  res: Response
) => {
  const data = await listarTrabajadoresContrataService();
  res.json(data);
};
export const verificarQrContrataController = async (
  req: Request,
  res: Response
) => {

  try {

    const { qrData } = req.body;

    if (!qrData) {
      return res.status(400).json({
        message: "QR requerido",
      });
    }

    const trabajador =
      await verificarQrContrataService(qrData);

    return res.json(trabajador);

  } catch (error: any) {

    return res.status(404).json({
      message: error.message || "Error al verificar QR",
    });

  }
};
// INGRESO
export const registrarIngresoVisitanteController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const data = await registrarIngresoVisitanteService(id);

    return res.json({
      horaIngreso: data.horaIngreso,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// SALIDA
export const registrarSalidaVisitanteController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const data = await registrarSalidaVisitanteService(id);

    return res.json({
      horaSalida: data.horaSalida,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};