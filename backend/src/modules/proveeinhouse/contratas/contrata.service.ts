import { prisma } from "../../../config/prisma";
import { randomUUID } from "crypto";
import {
  enviarCorreoContrataInhouse,
  enviarCorreoQRContrataInhouse,
  enviarCorreoRechazoContrataInhouse
} from "../../../utils/mailer";
import QRCode from "qrcode";
export const crearContrata = async (data: any) => {

    const codigo =
      `CON-${Date.now()}`;

    const tokenAcceso =
      crypto.randomUUID();

    const contrata =
      await prisma.contrataProveedorInhouse.create({
        data: {

          codigo,
          tokenAcceso,

          estado: "PENDIENTE",

          sedeId: Number(data.sedeId),

          ambienteId:
            Number(data.ambienteId),

          motivo:
            data.motivo,

          fechaInicio:
            new Date(
              data.fechaInicio
            ),

          fechaFin:
            new Date(
              data.fechaFin
            ),

          horaEntrada:
            data.horaEntrada,

          horaSalida:
            data.horaSalida,

          empresaContratista:
            data.empresaContratista,

          descripcionServicio:
            data.descripcionServicio,

          emailResponsable:
            data.emailResponsable,

          dniResponsable:
            data.dniResponsable,

          nombresResponsable:
            data.nombresResponsable,

          apellidoPaternoResponsable:
            data.apellidoPaternoResponsable,

          apellidoMaternoResponsable:
            data.apellidoMaternoResponsable,

          telefonoResponsable:
            data.telefonoResponsable

        }

      });
try {
  await enviarCorreoContrataInhouse(
    contrata.emailResponsable,
    contrata
  );
} catch (error) {
  console.log("Error enviando correo:", error);
}
    return contrata;
};
export const listarContratasService = async () => {
  return await prisma.contrataProveedorInhouse.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      sede: true,

      ambiente: {

        include: {

          piso: {

            include: {

              pabellon: true

            }

          }

        }

      },
      aprobadoSeguridadPor: true,
      aprobadoAmbientePor: true,
      trabajadores: true,
      documentos: true
    },
  });
};
export const obtenerContrataPorTokenService = async (token: string) => {
  return await prisma.contrataProveedorInhouse.findUnique({
    where: {
      tokenAcceso: token,
    },
    include: {
      sede: true,
      ambiente: {

        include: {

          piso: {

            include: {

              pabellon: true

            }

          }

        }

      },
      trabajadores: true,
      documentos: true
    },
  });
};
export const actualizarTrabajadorService =
async (
  id: number,
  data: any
) => {

  return prisma.trabajadorContrataInhouse.update({

    where: { id },

    data: {

      dni: data.dni,
      nombres: data.nombres,
      apellidoPaterno:
        data.apellidoPaterno,
      apellidoMaterno:
        data.apellidoMaterno,
      email: data.email

    }

  });

};
export const registrarTrabajadorService = async (
  token: string,
  data: {
    dni: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
  }
) => {

  const contrata =
    await prisma.contrataProveedorInhouse.findUnique({
      where: {
        tokenAcceso: token
      }
    });

  if (!contrata) {
    throw new Error("Contrata no encontrada");
  }

  const total =
    await prisma.trabajadorContrataInhouse.count();

  return prisma.trabajadorContrataInhouse.create({
    data: {
      codigo: `TRA-${String(
        total + 1
      ).padStart(5, "0")}`,

      dni: data.dni,
      nombres: data.nombres,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      email: data.email,

      contrataId: contrata.id
    }
  });
};
export const guardarDocumentoService = async (
  token: string,
  tipo: string,
  archivo: string
) => {

  const contrata =
    await prisma.contrataProveedorInhouse.findUnique({
      where: {
        tokenAcceso: token
      }
    });

  if (!contrata) {
    throw new Error(
      "Contrata no encontrada"
    );
  }

  const documentoExistente =
    await prisma.documentoContrataInhouse.findFirst({

      where: {
        contrataId: contrata.id,
        tipo
      }

    });

  // SI YA EXISTE → ACTUALIZA
  if (documentoExistente) {

    return prisma.documentoContrataInhouse.update({

      where: {
        id: documentoExistente.id
      },

      data: {
        archivo
      }

    });

  }

  // SI NO EXISTE → CREA
  return prisma.documentoContrataInhouse.create({

    data: {

      contrataId: contrata.id,

      tipo,

      archivo

    }

  });

};
export const guardarDocumentosExtraService =
async (
  token: string,
  archivos: string[]
) => {

const contrata =
await prisma.contrataProveedorInhouse.findUnique({

where: {
tokenAcceso: token
}

});

if (!contrata) {

throw new Error(
"Contrata no encontrada"
);

}

/*
NO actualiza,
crea un registro
por cada archivo
*/

return prisma.documentoContrataInhouse.createMany({

data:

archivos.map(
(archivo) => ({

contrataId:
contrata.id,

tipo:
"EXTRA",

archivo

})
)

});

};
export const guardarNivelRiesgoService =
  async (
    token: string,
    nivelRiesgo: string
  ) => {

    const contrata =
      await prisma.contrataProveedorInhouse.findUnique({

        where: {
          tokenAcceso: token
        }

      });

    if (!contrata) {
      throw new Error(
        "Contrata no encontrada"
      );
    }

    if (nivelRiesgo === "BAJA") {

      await prisma.documentoContrataInhouse.deleteMany({

        where: {

          contrataId: contrata.id,

          tipo: {
            in: ["CM", "CTA"]
          }

        }

      });

    }

    if (nivelRiesgo === "MEDIA") {

      await prisma.documentoContrataInhouse.deleteMany({

        where: {

          contrataId: contrata.id,

          tipo: "CTA"

        }

      });

    }

    return prisma.contrataProveedorInhouse.update({

      where: {
        tokenAcceso: token
      },

      data: {

        nivelRiesgo,

        estado:
          "PENDIENTE_SEGURIDAD"

      }

    });

};
export const aprobarSeguridadService = async (
  id: number,
  usuarioId: number
) => {

  const contrata = await prisma.contrataProveedorInhouse.findUnique({
    where: { id }
  });

  if (!contrata) throw new Error("No existe la contrata");

  if (contrata.estado !== "PENDIENTE_SEGURIDAD") {
    throw new Error("No se puede aprobar seguridad en este estado");
  }

  return prisma.contrataProveedorInhouse.update({
    where: { id },
    data: {
      aprobadoSeguridadPorId: usuarioId,
      fechaAprobacionSeguridad: new Date(),
      estado: "PENDIENTE_AMBIENTE" // 👈 desbloquea siguiente paso
    },
    include: {
      sede: true,
      ambiente: true,
      trabajadores: true,
      aprobadoSeguridadPor: true
    }
  });
};
export const aprobarAmbienteService = async (
  id: number,
  usuarioId: number
) => {

  const contrata =
    await prisma.contrataProveedorInhouse.findUnique({
      where: { id },
      include: {
        trabajadores: true
      }
    });

  if (!contrata) {
    throw new Error("No existe la contrata");
  }

  console.log("ESTADO:", contrata.estado);

  if (
    contrata.estado !==
    "PENDIENTE_AMBIENTE"
  ) {
    throw new Error(
      "No corresponde revisión de ambiente aún"
    );
  }

  console.log(
    "TRABAJADORES:",
    contrata.trabajadores
  );

  const contrataActualizada =
    await prisma.contrataProveedorInhouse.update({
      where: { id },
      data: {
        aprobadoAmbientePorId: usuarioId,
        fechaAprobacionAmbiente: new Date(),
        estado: "AUTORIZADO"
      },
      include: {
        sede: true,
        ambiente: true,
        trabajadores: true,
        aprobadoAmbientePor: true
      }
    });

  for (const trabajador of contrata.trabajadores) {

    try {

      console.log(
        "Procesando trabajador:",
        trabajador.id
      );

      console.log(
        "Email:",
        trabajador.email
      );

      const qrData =
        `CONTRATA-${contrata.id}|TRA-${trabajador.id}|UUID-${randomUUID()}`;

      await prisma.trabajadorContrataInhouse.update({
        where: {
          id: trabajador.id
        },
        data: {
          qrData,
          estadoQr: "ACTIVO"
        }
      });

      const qrImage =
        await QRCode.toDataURL(qrData);

      if (trabajador.email) {

        console.log(
          "ANTES DE ENVIAR CORREO"
        );

        await enviarCorreoQRContrataInhouse(
          trabajador.email,
          trabajador.nombres,
          contrata.empresaContratista,
          qrImage
        );

        console.log(
          "CORREO ENVIADO A:",
          trabajador.email
        );

      } else {

        console.log(
          "Trabajador sin correo"
        );

      }

    } catch (error) {

      console.log(
        "ERROR EN TRABAJADOR:",
        trabajador.id
      );

      console.error(error);

    }

  }

  return contrataActualizada;

};

export const rechazarContrataService = async (
  id: number,
  usuarioId: number,
  motivo: string
) => {

  const contrata =
    await prisma.contrataProveedorInhouse.findUnique({
      where: { id }
    });

  if (!contrata) {
    throw new Error("No existe la contrata");
  }

  const contrataActualizada =
    await prisma.contrataProveedorInhouse.update({

      where: { id },

      data: {

        estado: "RECHAZADO",

        aprobadoSeguridadPorId:
          usuarioId,

        fechaAprobacionSeguridad:
          new Date(),

        motivoRechazo: motivo

      }

    });

  try {

    console.log(
      "Enviando correo a:",
      contrata.emailResponsable
    );

    await enviarCorreoRechazoContrataInhouse(

      contrata.emailResponsable,

      `${contrata.nombresResponsable} ${contrata.apellidoPaternoResponsable}`,

      motivo,

      contrata.tokenAcceso

    );

    console.log(
      "Correo de rechazo enviado"
    );

  } catch (error) {

    console.log(
      "Error enviando correo:",
      error
    );

  }

  return contrataActualizada;

};
export const eliminarTrabajadorService =
async (id: number) => {

  return prisma.trabajadorContrataInhouse.delete({

    where: {
      id
    }

  });

};

export const listarTrabajadoresContrataService = async () => {
  return prisma.trabajadorContrataInhouse.findMany({
    include: {
      contrata: {
        include: {
          sede: true,
          ambiente: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
export const verificarQrContrataService = async (qrData: string) => {

  const trabajador = await prisma.trabajadorContrataInhouse.findFirst({
    where: {
      qrData: {
    equals: qrData.trim(),
  }
    },
    include: {
      contrata: {
        include: {
          sede: true,
          ambiente: true,
        },
      },
    },
  });

  if (!trabajador) {
    throw new Error("QR inválido");
  }

  return trabajador;
};
// REGISTRAR INGRESO
export const registrarIngresoVisitanteService = async (id: number) => {

  const fechaPeru = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());

  return prisma.trabajadorContrataInhouse.update({
    where: { id },
    data: {
      horaIngreso: fechaPeru,
    },
  });
};

// REGISTRAR SALIDA
export const registrarSalidaVisitanteService = async (id: number) => {

  const fechaPeru = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());

  return prisma.trabajadorContrataInhouse.update({
    where: { id },
    data: {
      horaSalida: fechaPeru,
    },
  });
};