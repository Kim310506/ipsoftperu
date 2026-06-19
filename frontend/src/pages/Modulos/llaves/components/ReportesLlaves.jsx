import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import api from "../../../../api/axios";

export default function ReporteLlaveros() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [detalle,setDetalle]=useState(null);
const [open,setOpen]=useState(false);
  const [datos, setDatos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);

  const consultar = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/llaves/llaveros/reporte", {
        params: { fechaInicio, fechaFin },
      });

      setDatos(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    consultar();
  }, []);

  const filtrados = datos.filter((x) =>
    x.llavero?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const estadoBadge = (estado) => {
    switch (estado) {
      case "PRESTADO":
        return "bg-orange-100 text-orange-700";
      case "DEVUELTO":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
const verDetalle = async (id) => {

try{

const {data}=await api.get(
`/llaves/llaveros/reporte/${id}`
);

setDetalle(data);

setOpen(true);

}catch{

alert(
"No se pudo cargar detalle"
);

}

};
const exportarExcel = () => {

const rows = filtrados.map((x) => ({

ID: x.id,

LLAVERO: x.llavero?.nombre,

ENTREGADO_POR:
x.responsableEntrega?.nombre || "-",

DEVUELTO_POR:
x.responsableDevolucion?.nombre || "-",

FECHA_ENTREGA:
new Date(
x.fechaEntrega
).toLocaleString(),

FECHA_DEVOLUCION:
x.fechaDevolucion
? new Date(
x.fechaDevolucion
).toLocaleString()
: "Pendiente",

ESTADO:
x.estado

}));

const ws =
XLSX.utils.json_to_sheet(rows);

const wb =
XLSX.utils.book_new();

XLSX.utils.book_append_sheet(
wb,
ws,
"Reporte Llaveros"
);

XLSX.writeFile(
wb,
`Reporte_Llaveros_${Date.now()}.xlsx`
);

};


const exportarPDF = () => {

const doc =
new jsPDF();

doc.setFontSize(18);

doc.text(
"Reporte Histórico de Llaveros",
14,
20
);

autoTable(doc,{

startY:30,

head:[[
"ID",
"Llavero",
"Entregado",
"Devuelto",
"Entrega",
"Devolución",
"Estado"
]],

body:

filtrados.map((x)=>([

x.id,

x.llavero?.nombre,

x.responsableEntrega?.nombre
|| "-",

x.responsableDevolucion?.nombre
|| "-",

new Date(
x.fechaEntrega
).toLocaleString(),

x.fechaDevolucion
?

new Date(
x.fechaDevolucion
).toLocaleString()

:

"Pendiente",

x.estado

]))

});

doc.save(
`Reporte_Llaveros_${Date.now()}.pdf`
);

};


const imprimir = () => {

const tabla =
document.getElementById(
"tabla-reporte"
);

if(!tabla){

alert(
"No se encontró la tabla"
);

return;

}

const ventana =
window.open(
"",
"_blank",
"width=1400,height=900"
);

if(!ventana){

alert(
"Permite ventanas emergentes"
);

return;

}

ventana.document.write(`

<html>

<head>

<title>
Reporte Llaveros
</title>

<style>

body{
font-family:Arial;
padding:30px;
}

h1{
margin-bottom:20px;
}

table{
width:100%;
border-collapse:collapse;
}

th{
background:#2563eb;
color:white;
padding:12px;
border:1px solid #ddd;
}

td{
padding:10px;
border:1px solid #ddd;
}

tr:nth-child(even){
background:#f7f7f7;
}

@media print{

button{
display:none;
}

}

</style>

</head>

<body>

<h1>
📘 Reporte Histórico de Llaveros
</h1>

${tabla.outerHTML}

</body>

</html>

`);

ventana.document.close();

setTimeout(()=>{

ventana.focus();

ventana.print();

ventana.close();

},700);

};
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center gap-2 text-blue-700 font-bold text-xl">
        📘 Reporte Histórico de Llaveros
      </div>

      {/* FILTROS */}
      <div className="bg-white p-4 rounded-xl shadow grid grid-cols-1 md:grid-cols-3 gap-4">

        <div>
          <label className="text-sm font-semibold">Fecha Inicio</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Fecha Fin</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <button
          onClick={consultar}
          className="bg-blue-600 text-white rounded-lg h-[42px] mt-6 hover:bg-blue-700"
        >
          🔍 Consultar
        </button>
      </div>

      {/* ACCIONES */}
      <div className="flex flex-wrap justify-between gap-3">

        <div className="flex gap-2">

<button
onClick={exportarExcel}
className="
bg-green-600
text-white
px-4
py-2
rounded-lg
hover:bg-green-700
"
>
📗 Excel
</button>

<button
onClick={exportarPDF}
className="
bg-red-600
text-white
px-4
py-2
rounded-lg
hover:bg-red-700
"
>
📕 PDF
</button>

<button
onClick={imprimir}
className="
bg-gray-600
text-white
px-4
py-2
rounded-lg
hover:bg-gray-700
"
>
🖨 Imprimir
</button>

</div>

        <input
          placeholder="Buscar por llavero..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border rounded-lg px-3 py-2 w-64"
        />
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table id="tabla-reporte" className="w-full text-sm">

          {/* HEADER TABLE */}
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">LLAVERO</th>
              <th className="p-4 text-left">
                ENTREGADO POR
                </th>

                <th className="p-4 text-left">
                DEVUELTO POR
                </th>
              <th className="p-4 text-left">FECHA ENTREGA</th>
              <th className="p-4 text-left">FECHA DEVOLUCIÓN</th>
              <th className="p-4 text-left">ESTADO</th>
              <th className="p-4 text-center">ACCIONES</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan={8} className="p-10 text-center text-gray-500">
                  Cargando datos...
                </td>
              </tr>
            ) : filtrados.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-10 text-center text-gray-400">
                  Sin registros
                </td>
              </tr>
            ) : (
              filtrados.map((x) => (
                <tr key={x.id} className="border-b hover:bg-gray-50">

                  <td className="p-4 font-semibold text-gray-600">
                    #{x.id}
                  </td>

                  <td className="p-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                      {x.llavero?.nombre}
                    </span>
                  </td>

                  <td className="p-4">

<div className="font-semibold">

{
x.responsableEntrega
?.nombres
||

"—"

}

</div>

<div className="text-xs text-gray-500">

DNI:

{
x.responsableEntrega
?.dni
||

"-"

}

</div>

</td>


<td className="p-4">

{
x.responsableDevolucion

?

<>

<div className="font-semibold">

{
x.responsableDevolucion
?.nombres
}

</div>

<div className="text-xs text-gray-500">

DNI:

{
x.responsableDevolucion
?.dni
}

</div>

</>

:

<span className="
text-orange-500
text-xs
font-semibold
">

Pendiente

</span>

}

</td>

                  <td className="p-4 text-gray-600">
                    {new Date(x.fechaEntrega).toLocaleString()}
                  </td>

                  <td className="p-4 text-gray-600">
                    {x.fechaDevolucion
                      ? new Date(x.fechaDevolucion).toLocaleString()
                      : "Pendiente"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${estadoBadge(
                        x.estado
                      )}`}
                    >
                      {x.estado}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={()=>
                      verDetalle(x.id)
                      }
                      className="
                      bg-cyan-500
                      text-white
                      px-3
                      py-1
                      rounded-lg
                      text-xs
                      hover:bg-cyan-600
                      "
                      >
                      Ver
                      </button>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>
      </div>
{
open &&
detalle && (

<div className="
fixed
inset-0
bg-slate-900/70
backdrop-blur-sm
flex
justify-center
items-center
z-50
p-6
">

<div className="
bg-white
w-[950px]
max-h-[92vh]
overflow-auto
rounded-[28px]
shadow-2xl
">

{/* HEADER */}

<div className="
bg-gradient-to-r
from-blue-700
to-cyan-500
text-white
p-8
rounded-t-[28px]
">

<div className="flex justify-between">

<div>

<h2 className="text-3xl font-black">
📘 Historial Completo
</h2>

<div className="mt-2 opacity-90">

Seguimiento completo del movimiento

</div>

</div>

<button
onClick={()=>{
setOpen(false);
setDetalle(null);
}}
className="
w-10
h-10
rounded-full
bg-white/20
hover:bg-white/30
"
>
✕

</button>

</div>

</div>



<div className="p-8 space-y-8">

{/* RESUMEN */}

<div className="
bg-slate-50
rounded-2xl
p-6
grid
grid-cols-3
gap-5
">

<div>

<div className="text-sm text-gray-500">
Llavero
</div>

<div className="font-black text-2xl">

🔑 {detalle.llavero?.nombre}

</div>

</div>

<div>

</div>


<div>

<div className="text-sm text-gray-500">

Estado

</div>

<div className="mt-2">

<span className="
bg-blue-100
text-blue-700
px-4
py-2
rounded-full
font-bold
">

{detalle.estado}

</span>

</div>

</div>

</div>



{/* ENTREGA */}

<div className="
bg-green-50
border
border-green-200
rounded-3xl
p-6
">

<div className="
text-xl
font-black
text-green-700
mb-5
">

🔑 ENTREGA

</div>

<div className="grid grid-cols-2 gap-6">

<div>

<div className="mb-4">

<div className="text-gray-500">

Responsable

</div>

<div className="font-bold">

{
detalle.responsableEntrega
?.nombres
||

"No registrado"

}

</div>

</div>


<div className="mb-4">

<div className="text-gray-500">

Hora

</div>

<div>

{
new Date(
detalle.fechaEntrega
).toLocaleString()
}

</div>

</div>


<div>

<div className="text-gray-500">

Detalle

</div>

<div>

{
detalle.detalle
||

"Sin observaciones"

}

</div>

</div>

</div>


<div>

{

detalle.fotoEntrega

?

<img

src={`http://localhost:3000/uploads/llaveros/prestamos/${detalle.fotoEntrega}`}

alt="Entrega"

className="
w-full
h-[300px]
object-cover
rounded-2xl
border
"

/>

:

<div className="
h-[300px]
rounded-2xl
border
flex
items-center
justify-center
text-gray-400
">

Sin evidencia

</div>

}

</div>

</div>

</div>



{/* TRANSFERENCIAS */}

{

detalle.transferencias?.length>0 && (

<div>

<div className="
text-orange-600
font-black
text-xl
mb-4
">

🔄 TRANSFERENCIAS

</div>

<div className="space-y-4">

{

detalle.transferencias.map((t,index)=>(

<div
key={t.id}
className="
border
rounded-2xl
bg-orange-50
p-5
"
>

<div className="
flex
justify-between
mb-4
">

<div className="font-bold">

Transferencia #{index+1}

</div>

<div>

{
new Date(
t.fecha
).toLocaleString()
}

</div>

</div>


<div className="
grid
grid-cols-2
gap-5
">

<div>

<b>Origen</b>

<div>

{
t.contrataOrigen
?.empresaContratista
}

</div>

</div>


<div>

<b>Destino</b>

<div>

{
t.contrataDestino
?.empresaContratista
}

</div>

</div>


<div>

<b>Responsable</b>

<div>

{
t.responsable
?.nombres
||

"-"

}

</div>

</div>


<div>

<b>Detalle</b>

<div>

{
t.detalle
||

"-"

}

</div>

</div>

</div>

</div>

))

}

</div>

</div>

)



}



{/* DEVOLUCION */}

{

detalle.fechaDevolucion && (

<div className="
bg-red-50
border
border-red-200
rounded-3xl
p-6
">

<div className="
text-red-700
font-black
text-xl
mb-5
">

📥 DEVOLUCIÓN

</div>

<div className="grid grid-cols-2 gap-6">

<div>

<div className="mb-4">

<div className="text-gray-500">

Responsable

</div>

<div className="font-bold">

{
detalle
.responsableDevolucion
?.nombres
||

"No registrado"

}

</div>

</div>


<div>

<div className="text-gray-500">

Hora

</div>

<div>

{
new Date(
detalle.fechaDevolucion
).toLocaleString()
}

</div>

</div>

</div>


<div>

{

detalle.fotoDevolucion

?

<img

src={`http://localhost:3000/uploads/llaveros/prestamos/${detalle.fotoDevolucion}`}

alt="Devolucion"

className="
w-full
h-[300px]
object-cover
rounded-2xl
border
"

/>

:

<div className="
h-[300px]
rounded-2xl
border
flex
items-center
justify-center
text-gray-400
">

Sin evidencia devolución

</div>

}

</div>

</div>

</div>

)

}

</div>

</div>

</div>

)
}
    </div>
    
  );
}