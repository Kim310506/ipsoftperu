import { prisma } from "../../config/prisma";
import { randomUUID } from "crypto";
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

if(!llaveroId){

const nuevo =
await prisma.llavero.create({

data:{

nombre:
llavero.nombre,

codigo:
llavero.codigo,

tipoAgrupacion:
"COMPLETA",

createdById:
Number(
createdById
)

}

});

llaveroId =
nuevo.id;

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