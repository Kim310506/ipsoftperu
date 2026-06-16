import {
useEffect,
useState
} from "react";

import api from
"../../../../api/axios";

export default function ReporteLlaveros(){

const [
fechaInicio,
setFechaInicio
]=useState("");

const [
fechaFin,
setFechaFin
]=useState("");

const [
datos,
setDatos
]=useState([]);

const [
busqueda,
setBusqueda
]=useState("");

const [
loading,
setLoading
]=useState(false);


const consultar =
async()=>{

try{

setLoading(true);

const {
data
}=await api.get(
"/reportes/llaveros",
{

params:{

fechaInicio,
fechaFin

}

}
);

setDatos(
data
);

}catch(err){

console.log(err);

}

finally{

setLoading(false);

}

};


useEffect(()=>{

consultar();

},[]);


const filtrados=
datos.filter(
x=>

x.llavero
?.toLowerCase()
.includes(
busqueda
.toLowerCase()
)

);


return(

<div
className="
p-4
md:p-6
space-y-5
"
>

{/* TITULO */}

<div
className="
flex
items-center
gap-2
text-blue-700
font-bold
text-xl
"
>

📘 Reporte Histórico de Llaveros

</div>


{/* FILTROS */}

<div
className="
bg-white
rounded-xl
shadow
p-4
grid
grid-cols-1
md:grid-cols-3
gap-4
"
>

<div>

<label
className="
text-sm
font-semibold
"
>

Fecha Inicio

</label>

<input
type="date"
value={fechaInicio}
onChange={(e)=>
setFechaInicio(
e.target.value
)
}
className="
w-full
border
rounded-lg
p-2
"
/>

</div>


<div>

<label
className="
text-sm
font-semibold
"
>

Fecha Fin

</label>

<input
type="date"
value={fechaFin}
onChange={(e)=>
setFechaFin(
e.target.value
)
}
className="
w-full
border
rounded-lg
p-2
"
/>

</div>


<button
onClick={
consultar
}
className="
bg-blue-600
text-white
rounded-lg
mt-6
h-[42px]
"
>

🔍 Consultar

</button>

</div>


{/* ACCIONES */}

<div
className="
flex
flex-wrap
justify-between
gap-3
"
>

<div
className="
flex
gap-2
"
>

<button
className="
bg-green-600
text-white
px-4
py-2
rounded
"
>

Excel

</button>

<button
className="
bg-red-600
text-white
px-4
py-2
rounded
"
>

PDF

</button>

<button
className="
bg-gray-600
text-white
px-4
py-2
rounded
"
>

Imprimir

</button>

</div>


<input
placeholder="
Buscar...
"
value={
busqueda
}
onChange={
(e)=>
setBusqueda(
e.target.value
)
}
className="
border
rounded
px-3
py-2
"
/>

</div>


{/* TABLA */}

<div
className="
bg-white
rounded-xl
shadow
overflow-auto
"
>

<table
className="
min-w-full
text-sm
"
>

<thead>

<tr
className="
bg-gray-100
"
>

<th className="p-3">
ID
</th>

<th className="p-3">
LLAVERO
</th>

<th className="p-3">
ESTADO
</th>

<th className="p-3">
CREADO
</th>

<th className="p-3">
ACCIONES
</th>

</tr>

</thead>

<tbody>

{
loading
?

<tr>

<td
colSpan={5}
className="
p-10
text-center
"
>

Cargando...

</td>

</tr>

:

filtrados.map(
x=>(

<tr
key={
x.id
}
className="
border-b
"
>

<td className="p-3">
#{x.id}
</td>

<td className="p-3">

<span
className="
bg-blue-600
text-white
px-3
py-1
rounded-full
"
>

{x.llavero}

</span>

</td>

<td className="p-3">

{x.estado}

</td>

<td className="p-3">

{x.createdAt}

</td>

<td className="p-3">

<button
className="
bg-cyan-500
text-white
px-3
py-1
rounded
"
>

Ver

</button>

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