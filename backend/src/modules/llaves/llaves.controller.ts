import { Request, Response } from "express";
import {
    listarLlavesService,
    crearLlaveService
} from "./llaves.service";
export const listarLlavesController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await listarLlavesService();

    res.json(data);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const crearLlave =
async(
req:Request,
res:Response
)=>{

try{

const data =
await crearLlaveService(
req.body
);

return res
.status(201)
.json(data);

}catch(err:any){

console.log(err);

return res
.status(500)
.json({

message:
err.message
});
}
};