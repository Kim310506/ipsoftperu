import { prisma } from "../../config/prisma";
import { randomUUID } from "crypto";
import QRCode from "qrcode";


/* =========================
   OBTENER AMBIENTES
========================= */

export const obtenerAmbientes = async () => {

    return prisma.ambiente.findMany({

        include:{
            piso:{
                include:{
                    pabellon:{
                        include:{
                            sede:{
                                include:{
                                    zonal:true
                                }
                            }
                        }
                    }
                }
            }
        },

        orderBy:{
            id:"asc"
        }

    });

};


/* =========================
   CREAR QR AMBIENTE
========================= */

export const crearQR = async(data:any)=>{


const existe =
await prisma.qRAmbiente.findFirst({

where:{
    ambienteId:data.ambienteId,
    estado:"ACTIVO"
}

});


if(existe){

const imagen =
await QRCode.toDataURL(existe.codigo);


return {

    message:"El ambiente ya tiene un QR activo",

    qr:existe,

    imagen

};

}



const codigo =
`AMBIENTE-${data.ambienteId}-${randomUUID()}`;



const qr =
await prisma.qRAmbiente.create({

data:{

ambienteId:data.ambienteId,

codigo,

estado:"ACTIVO",

observacion:data.observacion,

createdById:data.usuarioId

},

include:{
ambiente:true
}

});



const imagen =
await QRCode.toDataURL(codigo);



return {

qr,

imagen

};


};


/* =========================
   LISTAR QR
========================= */

export const listarQR = async()=>{


const qrs =
await prisma.qRAmbiente.findMany({

include:{


ambiente:{

include:{

piso:{

include:{

pabellon:{

include:{

sede:true

}

}

}

}

}

}


},


orderBy:{
createdAt:"desc"
}


});



return Promise.all(

qrs.map(async(qr)=>{


const imagen =
await QRCode.toDataURL(qr.codigo);



return {

...qr,

imagen

};


})


);


};




/* =========================
   REGISTRAR RONDA POR QR
========================= */

export const registrarRonda = async(data:any)=>{


const {codigo,userId,observacion} = data;



// Buscar QR

const qr =
await prisma.qRAmbiente.findUnique({

where:{
codigo
},

include:{
ambiente:true
}

});



if(!qr){

throw new Error(
"QR no encontrado"
);

}



// validar estado

if(qr.estado !== "ACTIVO"){

throw new Error(
"QR desactivado"
);

}



// evitar doble marcado seguido

const ultimaRonda =
await prisma.ronda.findFirst({

where:{

userId,

qrId:qr.id

},

orderBy:{

fecha:"desc"

}

});



if(ultimaRonda){


const diferencia =
Date.now() -
new Date(ultimaRonda.fecha).getTime();



if(diferencia < 60000){

throw new Error(
"Ya registraste esta ronda hace menos de un minuto"
);

}


}



// Registrar ronda

const ronda =
await prisma.ronda.create({

data:{


userId,


qrId:qr.id,


observacion:
observacion ||
"Ronda registrada por QR"


},



include:{


user:true,


qr:{

include:{


ambiente:{

include:{

piso:{

include:{

pabellon:{

include:{

sede:true

}

}

}

}

}

}


}

}


}


});



return ronda;


};

/* =========================
   REPORTES
========================= */

export const obtenerReportes = async()=>{


return prisma.ronda.findMany({

include:{


user:true,


qr:{


include:{


ambiente:{


include:{


piso:{


include:{


pabellon:{


include:{


sede:true


}


}


}


}


}


}


}


}


},


orderBy:{

fecha:"desc"

}


});


};
/* =========================
   DASHBOARD RONDAS
========================= */

export const obtenerDashboard = async()=>{


const inicioDia = new Date();

inicioDia.setHours(
0,
0,
0,
0
);



const finDia = new Date();

finDia.setHours(
23,
59,
59,
999
);



const [
rondasHoy,
ambientesQR,
vigilantesActivos,
totalReportes
] = await Promise.all([



// RONDAS DEL DIA

prisma.ronda.count({

where:{

fecha:{

gte:inicioDia,

lte:finDia

}

}

}),





// AMBIENTES CON QR ACTIVO

prisma.qRAmbiente.count({

where:{

estado:"ACTIVO"

}

}),

// USUARIOS DEL MODULO RONDAS

prisma.user.count({

where:{

modulo:"RONDAS"

}

}),
// TOTAL REPORTES

prisma.ronda.count()



]);





return {


rondasHoy,

ambientesQR,

vigilantesActivos,

totalReportes


};


};