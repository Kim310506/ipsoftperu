// src/pages/modulos/rondas/components/EscanearQR.jsx

import { useEffect, useRef, useState } from "react";
import { QrCode } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import api from "../../../../api/axios";


export default function EscanearQR() {


  const scannerRef = useRef(null);
  const activoRef = useRef(false);

  const [mensaje,setMensaje] = useState("");
  const [escaneando,setEscaneando] = useState(false);
const [ambienteEscaneado,setAmbienteEscaneado] = useState(null);
  const iniciarEscaneo = async()=>{


    if(activoRef.current) return;


    try{


      const scanner = new Html5Qrcode("lector-qr");

      scannerRef.current = scanner;


      const cameras = await Html5Qrcode.getCameras();


      if(!cameras.length){

        setMensaje("❌ No hay cámara disponible");
        return;

      }



      await scanner.start(

        {
          facingMode:"environment"
        },

        {
          fps:10,
          qrbox:{
            width:250,
            height:250
          }
        },


        async(decodedText)=>{

            console.log("QR DETECTADO:", decodedText);


            if(!activoRef.current)
                return;


          activoRef.current=false;


          try{


            await detenerScanner();



            const usuario =
            JSON.parse(
              localStorage.getItem("rondasUser")
            );



            const {data}= await api.post(
                "/rondas/escanear",
                {
                    codigo:decodedText,
                    userId:usuario.id,
                    observacion:"Ronda registrada por escaneo QR"
                }
                );


                console.log(data);


                setAmbienteEscaneado(
                data.qr.ambiente.nombre
                );


                setMensaje(
                "✅ Ronda registrada correctamente"
                );


          }catch(error){


            console.log(error);


            setMensaje(
              error.response?.data?.message ||
              "Error registrando ronda"
            );


          }


        },


        ()=>{
          // errores normales de lectura
        }

      );


      activoRef.current=true;
      setEscaneando(true);



    }catch(error){

      console.log(error);

      setMensaje(
        "Error abriendo cámara"
      );

    }


  };

const nuevoEscaneo = ()=>{
  setMensaje("");
  setAmbienteEscaneado(null);
setEscaneando(false);
};
  const detenerScanner = async()=>{


    try{


      if(
        scannerRef.current &&
        activoRef.current
      ){

        await scannerRef.current.stop();

        await scannerRef.current.clear();

      }


    }catch(error){

      console.log(
        "Scanner ya detenido"
      );

    }


    activoRef.current=false;
    setEscaneando(false);

  };




  useEffect(()=>{


    return ()=>{


      detenerScanner();


    }


  },[]);





return (

<div className="space-y-8">


<div>

<h1 className="text-3xl font-black text-gray-800">
Escanear QR
</h1>


<p className="text-gray-500 mt-2">
Escanea el código QR del ambiente para registrar la ronda.
</p>


</div>



<div className="bg-white rounded-3xl shadow p-10">


<div className="flex flex-col items-center">


{
!escaneando &&

<>

<QrCode
size={90}
className="text-[#F5B300]"
/>


<h2 className="text-2xl font-bold mt-6">
Cámara QR
</h2>


</>

}



<div
id="lector-qr"
className="mt-5 w-full"
/>
<button

onClick={
escaneando
?
detenerScanner
:
iniciarEscaneo
}

className="
mt-8
px-8
py-4
rounded-2xl
bg-[#F5B300]
font-bold
"

>
{
escaneando
?
"Escaneando..."
:
""
}

</button>



<p className="mt-5 font-bold">
{mensaje}
</p>
{
ambienteEscaneado && (

<div className="
mt-5
bg-green-100
rounded-xl
p-5
text-center
">

<p className="text-green-700 font-bold">
Ambiente registrado:
</p>


<p className="text-2xl font-black">
{ambienteEscaneado}
</p>


<button

onClick={()=>{
  nuevoEscaneo();
  iniciarEscaneo();
}}

className="
mt-4
px-6
py-3
rounded-xl
bg-[#F5B300]
font-bold
"

>
Nuevo escaneo
</button>
</div>

)
}
</div>


</div>


</div>

);


}