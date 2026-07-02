import { prisma } from "../../config/prisma";
export const listarContratasService = async () => {

  const contratas = await prisma.contrataProveedor.findMany({
  include: {
    sede: true,
    ambiente: true,
    trabajadores: true,
  }
});
  const contratasInhouse = await prisma.contrataProveedorInhouse.findMany({
  include: {
    sede: true,
    ambiente: true,
    trabajadores: true,
  }
});
  const data = [
    ...contratas.map(c => ({
      ...c,
      tipo: "CONTRATA"
    })),
    ...contratasInhouse.map(c => ({
      ...c,
      tipo: "INHOUSE"
    }))
  ];

  return data;
};
export const listarLlavesService = async () => {
  return prisma.llave.findMany({
    include: {
      llavero: true,
      ambiente: {
        include: {
          piso: {
            include: {
              pabellon: {
                include: {
                  sede: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      codigo: "asc",
    },
  });
};
export const listarLlaverosService = async () => {

  const llaveros = await prisma.llavero.findMany({
    include: {
      llaves: true,
      prestamos: {
        include: {
          transferencias: true
        }
      },
      createdBy: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const contratas = await prisma.contrataProveedor.findMany();
  const contratasInhouse = await prisma.contrataProveedorInhouse.findMany();

  const trabajadores = await prisma.trabajadorContrata.findMany();
  const trabajadoresInhouse = await prisma.trabajadorContrataInhouse.findMany();

  for (const llavero of llaveros) {

    for (const prestamo of llavero.prestamos as any[]) {

      // Empresa
      prestamo.contrata =
        prestamo.tipoContrata === "CONTRATA"
          ? contratas.find(c => c.id === prestamo.contrataId) ?? null
          : contratasInhouse.find(c => c.id === prestamo.contrataId) ?? null;

      // Responsable entrega
      prestamo.responsableEntrega =
        prestamo.tipoResponsableEntrega === "CONTRATA"
          ? trabajadores.find(t => t.id === prestamo.responsableEntregaId) ?? null
          : trabajadoresInhouse.find(t => t.id === prestamo.responsableEntregaId) ?? null;

      // Responsable devolución
      prestamo.responsableDevolucion =
        prestamo.tipoResponsableDevolucion === "CONTRATA"
          ? trabajadores.find(t => t.id === prestamo.responsableDevolucionId) ?? null
          : trabajadoresInhouse.find(t => t.id === prestamo.responsableDevolucionId) ?? null;

      // Transferencias
      for (const transferencia of prestamo.transferencias as any[]) {

        transferencia.contrataOrigen =
          transferencia.tipoOrigen === "CONTRATA"
            ? contratas.find(c => c.id === transferencia.contrataOrigenId) ?? null
            : contratasInhouse.find(c => c.id === transferencia.contrataOrigenId) ?? null;

        transferencia.contrataDestino =
          transferencia.tipoDestino === "CONTRATA"
            ? contratas.find(c => c.id === transferencia.contrataDestinoId) ?? null
            : contratasInhouse.find(c => c.id === transferencia.contrataDestinoId) ?? null;

        transferencia.responsable =
          transferencia.tipoResponsable === "CONTRATA"
            ? trabajadores.find(t => t.id === transferencia.responsableId) ?? null
            : trabajadoresInhouse.find(t => t.id === transferencia.responsableId) ?? null;
      }
    }
  }

  return llaveros;
};
export const crearLlaveService =
async (
body:any
)=>{

const {
createdById,
ambienteId,
llavero,
llave
}=body;


/* VALIDAR */
if(!createdById){

throw new Error(
"Usuario no enviado"
);

}


/* REUTILIZAR */
let llaveroId =
llavero?.id;

if(
!llaveroId
){

const existe =

await prisma.llavero.findFirst({

where:{

codigo:
llavero.codigo

}

});

if(
existe
){

llaveroId=
existe.id;

}else{

const nuevo=

await prisma.llavero.create({

data:{

nombre:
llavero.nombre,

codigo:
llavero.codigo,

tipoAgrupacion:
llavero.tipoAgrupacion,

createdById:
Number(
createdById
)

}

});

llaveroId=
nuevo.id;

}

}


/* CREAR LLAVE */

return await prisma.llave.create({

data:{

codigo:
llave.codigo,

descripcion:
llave.descripcion,

ambienteId:
Number(
ambienteId
),

llaveroId:
Number(
llaveroId
)

},

include:{

llavero:true,

ambiente:true

}

});

};
export const registrarMovimientoService = async (
data: {
  llaveroId: number;
  contrataId?: number;
  tipoContrata: string;

  tipoMovimiento: string;
  detalle?: string;

  responsableEntregaId?: number;
  tipoResponsableEntrega?: string;

  responsableDevolucionId?: number;
  tipoResponsableDevolucion?: string;

  responsableTransferenciaId?: number;
  tipoResponsableTransferencia?: string;

  fotoEntrega?: string;
  fotoDevolucion?: string;

  contrataDestinoId?: number;
  tipoContrataDestino?: string;
}
) => {

  const llavero = await prisma.llavero.findUnique({
    where: { id: data.llaveroId }
  });

  if (!llavero) throw new Error("Llavero no encontrado");

  // =========================
  // ENTREGA
  // =========================
  if (data.tipoMovimiento === "ENTREGA") {

    if (llavero.estado === "PRESTADO") {
      throw new Error("El llavero ya está prestado");
    }

    return prisma.$transaction(async (tx) => {

      const prestamo = await tx.prestamoLlavero.create({
        data: {
          llaveroId: data.llaveroId,

          contrataId: data.contrataId!,
          tipoContrata: data.tipoContrata,

          tipoMovimiento: "ENTREGA",
          estado: "ACTIVO",
          detalle: data.detalle ?? null,

          responsableEntregaId: data.responsableEntregaId ?? null,
          tipoResponsableEntrega: data.tipoResponsableEntrega ?? "",
          responsableDevolucionId: data.responsableDevolucionId ?? null,
          tipoResponsableDevolucion: data.tipoResponsableDevolucion ?? "",
          fotoEntrega: data.fotoEntrega ?? null
        }
      });

      await tx.llavero.update({
        where: { id: data.llaveroId },
        data: { estado: "PRESTADO" }
      });

      return prestamo;
    });
  }

  // =========================
  // DEVOLUCIÓN
  // =========================
  if (data.tipoMovimiento === "DEVOLUCION") {

    const prestamo = await prisma.prestamoLlavero.findFirst({
      where: {
        llaveroId: data.llaveroId,
        estado: "ACTIVO"
      }
    });

    if (!prestamo) throw new Error("No existe préstamo activo");

    return prisma.$transaction(async (tx) => {

      const actualizado = await tx.prestamoLlavero.update({
        where: { id: prestamo.id },
        data: {
          estado: "DEVUELTO",
          fechaDevolucion: new Date(),

          responsableDevolucionId: data.responsableDevolucionId ?? null,
          tipoResponsableDevolucion: data.tipoResponsableDevolucion ?? "",

          fotoDevolucion: data.fotoDevolucion ?? null,
          detalle: data.detalle ?? null
        }
      });

      await tx.llavero.update({
        where: { id: data.llaveroId },
        data: { estado: "DISPONIBLE" }
      });

      return actualizado;
    });
  }

  // =========================
  // TRANSFERENCIA
  // =========================
  if (data.tipoMovimiento === "TRANSFERENCIA") {

    const prestamo = await prisma.prestamoLlavero.findFirst({
      where: {
        llaveroId: data.llaveroId,
        estado: "ACTIVO"
      }
    });

    if (!prestamo) throw new Error("No existe préstamo activo");

    if (!data.contrataDestinoId) {
      throw new Error("Debe indicar contrata destino");
    }

    return prisma.$transaction(async (tx) => {

      const transferencia = await tx.transferenciaLlavero.create({
        data: {
          prestamoId: prestamo.id,

          contrataOrigenId: prestamo.contrataId!,
          tipoOrigen: prestamo.tipoContrata,

          contrataDestinoId: data.contrataDestinoId!,
          tipoDestino: data.tipoContrataDestino!,   // ✅ CLAVE

          responsableId: data.responsableTransferenciaId ?? null,
          tipoResponsable: data.tipoResponsableTransferencia ?? "",

          detalle: data.detalle ?? null
        }
      });

      await tx.prestamoLlavero.update({
        where: { id: prestamo.id },
        data: {
          contrataId: data.contrataDestinoId!,
          tipoContrata: data.tipoContrataDestino!   // ✅ CLAVE REAL
        }
      });

      return transferencia;
    });
  }

  throw new Error("Movimiento inválido");
};
export const reporteLlaverosService = async (
  fechaInicio?: string,
  fechaFin?: string
) => {

  const where: any = {};

  if (fechaInicio || fechaFin) {
    where.fechaEntrega = {};

    if (fechaInicio) {
      where.fechaEntrega.gte = new Date(`${fechaInicio}T00:00:00`);
    }

    if (fechaFin) {
      where.fechaEntrega.lte = new Date(`${fechaFin}T23:59:59`);
    }
  }

  const prestamos = await prisma.prestamoLlavero.findMany({
    where,
    include: {
      llavero: true,
      transferencias: true
    },
    orderBy: {
      fechaEntrega: "desc"
    }
  });

  const contratas = await prisma.contrataProveedor.findMany();
  const contratasInhouse = await prisma.contrataProveedorInhouse.findMany();

  const trabajadores = await prisma.trabajadorContrata.findMany();
  const trabajadoresInhouse = await prisma.trabajadorContrataInhouse.findMany();

  for (const prestamo of prestamos as any[]) {

    // ================= CONTRATA =================
    prestamo.contrata =
      prestamo.tipoContrata === "CONTRATA"
        ? contratas.find(c => c.id === prestamo.contrataId) ?? null
        : contratasInhouse.find(c => c.id === prestamo.contrataId) ?? null;

    // ================= ENTREGA =================
    prestamo.responsableEntrega =
      prestamo.tipoResponsableEntrega === "CONTRATA"
        ? trabajadores.find(t => t.id === prestamo.responsableEntregaId) ?? null
        : trabajadoresInhouse.find(t => t.id === prestamo.responsableEntregaId) ?? null;

    // ================= DEVOLUCIÓN =================
    prestamo.responsableDevolucion =
      prestamo.tipoResponsableDevolucion === "CONTRATA"
        ? trabajadores.find(t => t.id === prestamo.responsableDevolucionId) ?? null
        : trabajadoresInhouse.find(t => t.id === prestamo.responsableDevolucionId) ?? null;

    // ================= TRANSFERENCIAS =================
    for (const t of prestamo.transferencias as any[]) {

      t.contrataOrigen =
        t.tipoOrigen === "CONTRATA"
          ? contratas.find(c => c.id === t.contrataOrigenId) ?? null
          : contratasInhouse.find(c => c.id === t.contrataOrigenId) ?? null;

      t.contrataDestino =
        t.tipoDestino === "CONTRATA"
          ? contratas.find(c => c.id === t.contrataDestinoId) ?? null
          : contratasInhouse.find(c => c.id === t.contrataDestinoId) ?? null;

      t.responsable =
        t.tipoResponsable === "CONTRATA"
          ? trabajadores.find(r => r.id === t.responsableId) ?? null
          : trabajadoresInhouse.find(r => r.id === t.responsableId) ?? null;
    }
  }

  return prestamos;
};
export const detalleReporteLlaveroService = async (id: number) => {

  const prestamo = await prisma.prestamoLlavero.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      llavero: true,
      transferencias: {
        orderBy: {
          fecha: "asc",
        },
      },
    },
  });

  if (!prestamo) return null;

  // =========================
  // DATA AUXILIAR
  // =========================
  const contratas = await prisma.contrataProveedor.findMany();
  const contratasInhouse = await prisma.contrataProveedorInhouse.findMany();

  const trabajadores = await prisma.trabajadorContrata.findMany();
  const trabajadoresInhouse = await prisma.trabajadorContrataInhouse.findMany();

  // =========================
  // RESOLVER TRANSFERENCIAS
  // =========================
  for (const t of prestamo.transferencias as any[]) {

    // 🔹 ORIGEN (CONTRATA / INHOUSE)
    t.contrataOrigen =
      t.tipoOrigen === "CONTRATA"
        ? contratas.find(c => c.id === t.contrataOrigenId) ?? null
        : contratasInhouse.find(c => c.id === t.contrataOrigenId) ?? null;

    // 🔹 DESTINO (CONTRATA / INHOUSE)
    t.contrataDestino =
      t.tipoDestino === "CONTRATA"
        ? contratas.find(c => c.id === t.contrataDestinoId) ?? null
        : contratasInhouse.find(c => c.id === t.contrataDestinoId) ?? null;

    // 🔹 RESPONSABLE (CONTRATA / INHOUSE)
    t.responsable =
      t.tipoResponsable === "CONTRATA"
        ? trabajadores.find(r => r.id === t.responsableId) ?? null
        : trabajadoresInhouse.find(r => r.id === t.responsableId) ?? null;
  }

  // =========================
  // RESOLVER ENTREGA / DEVOLUCIÓN
  // (ESTO TE FALTABA)
  // =========================

  (prestamo as any).contrata =
    prestamo.tipoContrata === "CONTRATA"
      ? contratas.find(c => c.id === prestamo.contrataId) ?? null
      : contratasInhouse.find(c => c.id === prestamo.contrataId) ?? null;

  (prestamo as any).responsableEntrega =
    prestamo.tipoResponsableEntrega === "CONTRATA"
      ? trabajadores.find(t => t.id === prestamo.responsableEntregaId) ?? null
      : trabajadoresInhouse.find(t => t.id === prestamo.responsableEntregaId) ?? null;

  (prestamo as any).responsableDevolucion =
    prestamo.tipoResponsableDevolucion === "CONTRATA"
      ? trabajadores.find(t => t.id === prestamo.responsableDevolucionId) ?? null
      : trabajadoresInhouse.find(t => t.id === prestamo.responsableDevolucionId) ?? null;

  return prestamo;
};