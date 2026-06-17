import { prisma } from "../../config/prisma";
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
  return prisma.llavero.findMany({
    include: {
      llaves: true,

      prestamos: {
        include: {
          contrata: true,
          responsableEntrega: true,
          responsableDevolucion: true,
          transferencias: {
            include: {
              contrataOrigen: true,
              contrataDestino: true,
              responsable: true
            }
          }
        }
      },

      createdBy: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
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

  tipoMovimiento: string;
  detalle?: string;

  responsableEntregaId?: number;
  responsableDevolucionId?: number;
  responsableTransferenciaId?: number;

  fotoEntrega?: string;
  fotoDevolucion?: string;

  contrataDestinoId?: number;
}
) => {

  const llavero = await prisma.llavero.findUnique({
    where: {
      id: data.llaveroId
    }
  });

  if (!llavero) {
    throw new Error("Llavero no encontrado");
  }

  // ========================
  // ENTREGA
  // ========================

  if (data.tipoMovimiento === "ENTREGA") {

    if (llavero.estado === "PRESTADO") {
      throw new Error("El llavero ya está prestado");
    }

    return prisma.$transaction(async (tx) => {

      const prestamo =
        await tx.prestamoLlavero.create({
          data: {
            llaveroId: data.llaveroId,
            contrataId: data.contrataId,
            tipoMovimiento: "ENTREGA",
            estado: "ACTIVO",
            detalle: data.detalle,
            responsableEntregaId: data.responsableEntregaId,
            fotoEntrega: data.fotoEntrega
          }
        });

      await tx.llavero.update({
        where: {
          id: data.llaveroId
        },
        data: {
          estado: "PRESTADO"
        }
      });

      return prestamo;
    });
  }

  // ========================
  // DEVOLUCION
  // ========================

  if (data.tipoMovimiento === "DEVOLUCION") {

    const prestamo =
      await prisma.prestamoLlavero.findFirst({
        where: {
          llaveroId: data.llaveroId,
          estado: "ACTIVO"
        }
      });

    if (!prestamo) {
      throw new Error("No existe préstamo activo");
    }

    return prisma.$transaction(async (tx) => {

      const actualizado =
        await tx.prestamoLlavero.update({
          where: {
            id: prestamo.id
          },
          data: {
            estado: "DEVUELTO",
            fechaDevolucion: new Date(),
            responsableDevolucionId:data.responsableDevolucionId,
            fotoDevolucion: data.fotoDevolucion,
            detalle: data.detalle
          }
        });

      await tx.llavero.update({
        where: {
          id: data.llaveroId
        },
        data: {
          estado: "DISPONIBLE"
        }
      });

      return actualizado;
    });
  }
  // ========================
  // TRANSFERENCIA
  // ========================
if (data.tipoMovimiento === "TRANSFERENCIA") {

  const prestamo =
    await prisma.prestamoLlavero.findFirst({
      where: {
        llaveroId: data.llaveroId,
        estado: "ACTIVO"
      }
    });

  if (!prestamo) {
    throw new Error("No existe préstamo activo");
  }

  if (!data.contrataDestinoId) {
    throw new Error("Debe indicar contrata destino");
  }

  return prisma.$transaction(async (tx) => {

   const transferencia =
  await tx.transferenciaLlavero.create({
    data: {
      prestamoId: prestamo.id,
      contrataOrigenId: prestamo.contrataId!,
      contrataDestinoId: data.contrataDestinoId!,
      responsableId:data.responsableTransferenciaId,
      detalle: data.detalle
    }
  });

await tx.prestamoLlavero.update({
  where: {
    id: prestamo.id
  },
  data: {
    contrataId: data.contrataDestinoId!
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
    where.createdAt = {};

    if (fechaInicio) {
      where.createdAt.gte = new Date(fechaInicio);
    }

    if (fechaFin) {
      where.createdAt.lte = new Date(fechaFin);
    }
  }

  return prisma.prestamoLlavero.findMany({
    where,
    include: {
      llavero: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};