// src/pages/modulos/rondas/components/QRAmbientes.jsx

import { useEffect, useState } from "react";
import { ScanQrCode, Plus, X } from "lucide-react";
import api from "../../../../api/axios";

export default function QRAmbientes() {


  const [ambientes, setAmbientes] = useState([]);
  const [qrs, setQrs] = useState([]);

  const [loading, setLoading] = useState(true);


  const [qrSeleccionado, setQrSeleccionado] = useState(null);



  useEffect(() => {

    cargarDatos();

  }, []);



  const cargarDatos = async()=>{

    try{

      const ambientesRes = await api.get("/ambientes");

      const qrRes = await api.get("/rondas/qr");


      setAmbientes(ambientesRes.data);

      setQrs(qrRes.data);


    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);

    }

  };
const generarQR = async(ambienteId)=>{

try{

const usuario = JSON.parse(
localStorage.getItem("rondasUser")
);


await api.post(
"/rondas/qr",
{
ambienteId,
usuarioId:usuario.id,
observacion:"QR generado desde rondas"
}
);


await cargarDatos();


}catch(error){

console.log(error);

}

};
  const obtenerQR = (ambienteId)=>{

    return qrs.find(
      qr => qr.ambienteId === ambienteId
    );

  };




  if(loading)
    return <div>Cargando...</div>;




return (

<div className="space-y-8">


<h1 className="text-3xl font-black">
QR de Ambientes
</h1>


<p className="text-gray-500">
Administra los códigos QR para las rondas.
</p>




<div className="bg-white rounded-3xl shadow overflow-hidden">


<table className="w-full">


<thead className="bg-[#1A1A1A] text-white">

<tr>

<th className="p-4">
Sede
</th>

<th>
Pabellón
</th>

<th>
Piso
</th>

<th>
Ambiente
</th>

<th>
Acción
</th>


</tr>

</thead>



<tbody>


{
ambientes.map((ambiente)=>{


const qr = obtenerQR(ambiente.id);



return (

<tr key={ambiente.id}>


<td className="p-4 text-center">

{ambiente.piso?.pabellon?.sede?.nombre}

</td>


<td className="text-center">

{ambiente.piso?.pabellon?.nombre}

</td>


<td className="text-center">

{ambiente.piso?.nombre}

</td>


<td className="text-center font-bold">

{ambiente.nombre}

</td>



<td className="text-center">



{
qr ? (

<button
key={`qr-${ambiente.id}`}
onClick={()=>setQrSeleccionado(qr)}
className="
px-5
py-2
rounded-xl
bg-green-500
text-white
font-bold
flex
items-center
gap-2
mx-auto
"
>
<ScanQrCode size={18}/>
Ver QR
</button>

):(

<button
key={`crear-${ambiente.id}`}
onClick={()=>generarQR(ambiente.id)}
className="
px-5
py-2
rounded-xl
bg-[#F5B300]
font-bold
flex
items-center
gap-2
mx-auto
"
>
<Plus size={18}/>
Generar QR
</button>

)
}


</td>



</tr>

)

})

}



</tbody>



</table>


</div>






{/* MODAL QR */}

{

qrSeleccionado && (

<div
className="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
z-50
"
>


<div
className="
bg-white
rounded-3xl
p-8
relative
shadow-xl
"
>


<button

onClick={()=>setQrSeleccionado(null)}

className="
absolute
right-5
top-5
"

>

<X/>

</button>


<h2 className="text-2xl font-black mb-5">

QR Ambiente

</h2>



<img

src={qrSeleccionado.imagen}

className="
w-64
h-64
mx-auto
"

/>



<p className="text-center mt-4 font-bold">

{
qrSeleccionado.ambiente?.nombre
}

</p>



</div>


</div>

)

}



</div>

);


}