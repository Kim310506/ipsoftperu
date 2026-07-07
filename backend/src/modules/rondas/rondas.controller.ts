import { Request, Response } from "express";
import * as service from "./rondas.service";


/* =========================
   LISTAR AMBIENTES
========================= */

export const ambientes = async (
  req: Request,
  res: Response
) => {

  try {

    const data = await service.obtenerAmbientes();

    res.json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:"Error obteniendo ambientes"
    });

  }

};


/* =========================
   CREAR QR AMBIENTE
========================= */

export const crearQR = async (
  req: Request,
  res: Response
) => {

  try {

    const data = await service.crearQR(req.body);

    res.json(data);


  } catch(error){

    console.log(error);

    res.status(500).json({
      message:"Error creando QR"
    });

  }

};



/* =========================
   LISTAR QR AMBIENTES
========================= */

export const listarQR = async(
req:Request,
res:Response
)=>{

try{

const data =
await service.listarQR();


res.json(data);


}catch(error){

console.log(error);

res.status(500).json({
message:"Error listando QR"
});


}

};



/* =========================
   REGISTRAR RONDA
========================= */


export const registrarRonda = async(
req:Request,
res:Response
)=>{

try{


const data =
await service.registrarRonda(req.body);


res.json(data);



}catch(error){

console.log(error);


res.status(500).json({
message:"Error registrando ronda"
});


}

};



/* =========================
   REPORTES
========================= */


export const reportes = async(
req:Request,
res:Response
)=>{

try{


const data =
await service.obtenerReportes();


res.json(data);



}catch(error){

console.log(error);


res.status(500).json({
message:"Error obteniendo reportes"
});


}


};
export const dashboard = async(
req:Request,
res:Response
)=>{

try{
const data =
await service.obtenerDashboard();

res.json(data);
}catch(error){

console.log(error);
res.status(500).json({

message:"Error dashboard"
});

}
};