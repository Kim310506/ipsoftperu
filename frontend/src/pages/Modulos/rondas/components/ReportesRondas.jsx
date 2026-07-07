// src/pages/modulos/rondas/components/ReportesRondas.jsx

import {
  Download,
  FileSpreadsheet,
  Printer,
  Search,
  ArrowUpDown
} from "lucide-react";

import { useEffect, useState, useRef } from "react";
import api from "../../../../api/axios";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function ReportesRondas() {


const [reportes,setReportes] = useState([]);

const [filtrados,setFiltrados] = useState([]);

const [loading,setLoading] = useState(true);
const tablaRef = useRef();
const [busqueda,setBusqueda] = useState("");

const [orden,setOrden] = useState("desc");

const [fecha,setFecha] = useState("");




useEffect(()=>{

 cargarReportes();

},[]);




const cargarReportes = async()=>{

try{

const {data} =
await api.get("/rondas/reportes");


setReportes(data);

setFiltrados(data);


}catch(error){

console.log(error);

}
finally{

setLoading(false);

}

};





// FILTROS

useEffect(()=>{


let data=[...reportes];


// buscar

if(busqueda){

data=data.filter(r=>{


const texto = `

${r.user?.nombre}

${r.user?.nombres}

${r.qr?.ambiente?.nombre}

${r.qr?.ambiente?.piso?.pabellon?.sede?.nombre}

`.toLowerCase();



return texto.includes(
busqueda.toLowerCase()
);


});

}



// filtro fecha

if(fecha){

data=data.filter(r=>{


const fechaRonda =
new Date(r.fecha)
.toISOString()
.split("T")[0];


return fechaRonda===fecha;


});

}



// ordenar

data.sort((a,b)=>{


const fechaA =
new Date(a.fecha);


const fechaB =
new Date(b.fecha);



return orden==="desc"

?
fechaB-fechaA

:
fechaA-fechaB;



});



setFiltrados(data);



},[
busqueda,
fecha,
orden,
reportes
]);







// EXCEL

const exportarExcel=()=>{


const datos =
filtrados.map(r=>({


Vigilante:
r.user?.nombre ||
r.user?.nombres,


Ambiente:
r.qr?.ambiente?.nombre,


Sede:
r.qr?.ambiente?.piso?.pabellon?.sede?.nombre,


Fecha:
new Date(r.fecha)
.toLocaleDateString("es-PE"),


Hora:
new Date(r.fecha)
.toLocaleTimeString("es-PE")


}));



const hoja =
XLSX.utils.json_to_sheet(datos);


const libro =
XLSX.utils.book_new();


XLSX.utils.book_append_sheet(
libro,
hoja,
"Rondas"
);


XLSX.writeFile(
libro,
"Reporte_Rondas.xlsx"
);


};




// PDF

const exportarPDF=()=>{


const pdf =
new jsPDF();



pdf.text(
"Reporte de Rondas",
14,
15
);



autoTable(pdf,{

startY:25,

head:[[
"Vigilante",
"Ambiente",
"Sede",
"Fecha",
"Hora"
]],


body:

filtrados.map(r=>[


r.user?.nombre ||
r.user?.nombres,


r.qr?.ambiente?.nombre,


r.qr?.ambiente?.piso?.pabellon?.sede?.nombre,


new Date(r.fecha)
.toLocaleDateString("es-PE"),


new Date(r.fecha)
.toLocaleTimeString("es-PE")


])


});



pdf.save(
"Reporte_Rondas.pdf"
);


};
const imprimirTabla = ()=>{

const contenido =
tablaRef.current.innerHTML;


const ventana =
window.open(
"",
"",
"width=900,height=700"
);


ventana.document.write(`

<html>

<head>

<title>
Reporte de Rondas
</title>


<style>

body{
font-family:Arial;
padding:20px;
}


table{

width:100%;
border-collapse:collapse;

}


th{

background:#1A1A1A;
color:white;
padding:10px;

}


td{

padding:10px;
border:1px solid #ddd;
text-align:center;

}


h2{

text-align:center;

}

</style>


</head>


<body>


<h2>
Reporte de Rondas
</h2>


${contenido}



</body>


</html>

`);
ventana.document.close();
ventana.print();
};
if(loading)
return <div>Cargando reportes...</div>;
return (

<div className="space-y-8">



<div>

<h1 className="text-3xl font-black">

Reportes de Rondas

</h1>


<p className="text-gray-500">

Consulta y descarga las rondas realizadas.

</p>


</div>





<div className="flex flex-wrap gap-4">



<button
onClick={exportarExcel}
className="
px-5 py-3 rounded-xl
bg-green-600 text-white
font-bold flex gap-2
">

<FileSpreadsheet/>

Excel

</button>




<button
onClick={exportarPDF}
className="
px-5 py-3 rounded-xl
bg-red-600 text-white
font-bold flex gap-2
">

<Download/>

PDF

</button>





<button
onClick={imprimirTabla}className="
px-5 py-3 rounded-xl
bg-gray-800 text-white
font-bold flex gap-2
">

<Printer/>

Imprimir

</button>

</div>

<div ref={tablaRef} className="bg-white p-5 rounded-3xl shadow space-y-4">
<div className="flex flex-wrap gap-4">
<div  className="flex items-center gap-2 border rounded-xl px-3">
<Search/>
<input

placeholder="Buscar vigilante, ambiente..."

value={busqueda}

onChange={
e=>setBusqueda(e.target.value)
}

className="outline-none p-2"

/>

</div>

<input

type="date"
value={fecha}

onChange={
e=>setFecha(e.target.value)
}

className="border rounded-xl p-3"

/>
</div>

<table className="w-full">
<thead className="bg-[#1A1A1A] text-white">

<tr>

<th className="p-4">
Vigilante
</th>

<th>
Ambiente
</th>

<th>
Sede
</th>

<th>
Fecha
</th>

<th>
Hora
</th>


</tr>


</thead>

<tbody>

{
filtrados.length===0 ?

<tr>

<td
colSpan="5"
className="p-8 text-center text-gray-400"
>

Sin registros

</td>

</tr>


:

filtrados.map(r=>(


<tr
key={r.id}
className="border-b"
>


<td className="p-4 text-center">

{
r.user?.nombre ||
r.user?.nombres
}

</td>



<td className="text-center">

{
r.qr?.ambiente?.nombre
}

</td>



<td className="text-center">

{
r.qr?.ambiente?.piso?.pabellon?.sede?.nombre
}

</td>



<td className="text-center">

{
new Date(r.fecha)
.toLocaleDateString("es-PE")
}

</td>



<td className="text-center">

{
new Date(r.fecha)
.toLocaleTimeString("es-PE")
}

</td>



</tr>


))


}



</tbody>


</table>


</div>



</div>


);


}