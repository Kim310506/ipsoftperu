import {
  QrCode,
  FileText,
  Building2,
  ShieldCheck,
} from "lucide-react";

import {useEffect,useState} from "react";
import api from "../../../../api/axios";


export default function InicioRondas() {


const [data,setData]=useState({

rondasHoy:0,

ambientesQR:0,

vigilantesActivos:0,

totalReportes:0

});



useEffect(()=>{


cargarDashboard();


},[]);



const cargarDashboard=async()=>{

try{

const res =
await api.get("/rondas/dashboard");


setData(res.data);


}catch(error){

console.log(error);

}


};



return (
<div className="space-y-8">


<div>

<h1 className="text-3xl font-black text-gray-800">

Panel de Rondas

</h1>


<p className="text-gray-500 mt-2">

Resumen general del módulo de rondas.

</p>


</div>




<div className="grid lg:grid-cols-4 gap-6">



<Card

icon={<QrCode/>}

numero={data.rondasHoy}

texto="Rondas Hoy"

/>



<Card

icon={<Building2/>}

numero={data.ambientesQR}

texto="Ambientes con QR"

/>



<Card

icon={<ShieldCheck/>}

numero={data.vigilantesActivos}

texto="Total de Usuarios"

/>



<Card

icon={<FileText/>}

numero={data.totalReportes}

texto="Reportes"

/>



</div>


</div>

);


}



function Card({
icon,
numero,
texto
}){


return (

<div className="bg-white rounded-3xl p-6 shadow">


<div className="text-[#F5B300]">

{
icon
}

</div>


<h2 className="mt-4 text-3xl font-black">

{
numero
}

</h2>


<p className="text-gray-500">

{
texto
}

</p>


</div>

);


}