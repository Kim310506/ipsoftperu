import { useEffect, useMemo, useState } from "react";

export default function PrestamoLlaveros() {

const [llaveros,setLlaveros]=useState([]);
const [contratas,setContratas]=useState([]);

const [search,setSearch]=useState("");

const [modal,setModal]=useState(null);

const [loading,setLoading]=useState(false);

const [tipoMovimiento,setTipoMovimiento]=
useState("ENTREGA");

const [fotoEntrega,setFotoEntrega]=
useState(null);

const [fotoDevolucion,setFotoDevolucion]=
useState(null);

const [form,setForm]=useState({
detalle:""
});

useEffect(()=>{
cargar();
},[]);

const cargar=async()=>{

try{

const [
a,
b
]=await Promise.all([

fetch(
"http://localhost:3000/llaves/llaveros"
),

fetch(
"http://localhost:3000/contratas"
)

]);

setLlaveros(
await a.json()
);

const data=
await b.json();

setContratas(
data.filter(
x=>
x.estado==="AUTORIZADO"
)
);

}catch{

alert(
"Error cargando datos"
);

}

};

const abrirModal=(data)=>{

setModal(data);

setForm({
detalle:""
});

setFotoEntrega(null);

setFotoDevolucion(null);

};

const cerrarModal=()=>{

setModal(null);

setTipoMovimiento(
"ENTREGA"
);

};

const handleChange=(e)=>{

setForm({
...form,
[e.target.name]:
e.target.value
});

};

const prestar = async () => {

  try {

    setLoading(true);

    const fd = new FormData();

    if (!modal?.llavero?.id) {

      alert("No existe llavero asociado");
      return;

    }

    fd.append(
      "llaveroId",
      String(modal.llavero.id)
    );

    fd.append(
      "contrataId",
      String(modal.id)
    );
if (tipoMovimiento === "ENTREGA") {

  fd.append(
    "responsableEntregaId",
    String(modal.aprobadoAmbientePorId)
  );

}

if (tipoMovimiento === "DEVOLUCION") {

  fd.append(
    "responsableDevolucionId",
    String(modal.aprobadoAmbientePorId)
  );

}

if (tipoMovimiento === "TRANSFERENCIA") {

  fd.append(
    "responsableTransferenciaId",
    String(modal.aprobadoAmbientePorId)
  );

}
    fd.append(
      "tipoMovimiento",
      tipoMovimiento
    );

    fd.append(
      "detalle",
      form.detalle
    );
if (tipoMovimiento === "TRANSFERENCIA") {

  fd.append(
    "contrataDestinoId",
    String(modal.id)
  );

}
if(
tipoMovimiento==="ENTREGA"
&&
fotoEntrega
){

fd.append(
"fotoEntrega",
fotoEntrega
);

}

if(
tipoMovimiento==="DEVOLUCION"
&&
fotoDevolucion
){

fd.append(
"fotoDevolucion",
fotoDevolucion
);

}

const res=
await fetch(
"http://localhost:3000/llaves/prestamo",
{
method:"POST",
body:fd
}
);
if (!res.ok) {

  const error =
    await res.json();

  console.log(error);

  alert(error.message);

  return;
}

await cargar();

cerrarModal();

}catch{

alert(
"Error registrando"
);

}

finally{

setLoading(false);

}

};

const disponibles=
llaveros.filter(
x=>
x.estado==="DISPONIBLE"
).length;

const prestados=
llaveros.filter(
x=>
x.estado==="PRESTADO"
).length;

const filas=
useMemo(()=>{

return contratas

.filter(c=>{

return`

${c.codigo}
${c.sede?.nombre}
${c.ambiente?.nombre}

`

.toLowerCase()

.includes(
search.toLowerCase()
);

})

.map(c=>{

const llave=

llaveros

.flatMap(

l=>

l.llaves?.map(
k=>({

...k,

llavero:l

})

)

||

[]

)

.find(

k=>

k.ambienteId===

c.ambienteId

);

const prestamoActivo =
  llave?.llavero?.prestamos?.find(
    p => p.estado === "ACTIVO"
  );

const esResponsableActual =
  prestamoActivo?.contrataId === c.id;

return{
  ...c,
  llavero: llave?.llavero,
  llave,
  prestamoActivo,
  esResponsableActual
};

});

},[
contratas,
llaveros,
search
]);

return(

<div
style={{
padding:24,
background:"#f8fafc",
minHeight:"100vh"
}}
>

<div
style={{
background:
"linear-gradient(135deg,#0f172a,#2563eb)",
padding:35,
borderRadius:30,
color:"#fff",

display:"flex",
justifyContent:"space-between",
alignItems:"center",

marginBottom:30
}}
>

<div>

<div
style={{
fontSize:36,
fontWeight:800
}}
>
🔑 Control de Llaveros
</div>

<div
style={{
opacity:.8,
marginTop:8
}}
>
Gestión de préstamos • transferencias • devoluciones
</div>

</div>

<input

placeholder="Buscar..."

value={search}

onChange={
e=>
setSearch(
e.target.value
)
}

style={{

width:350,

padding:18,

borderRadius:18,

border:"none",

fontSize:16

}}

/>

</div>

<div
style={{
display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(260px,1fr))",
gap:20
}}
>

<Card
title="Total Llaveros"
value={llaveros.length}
icon="🗝️"
color="#dbeafe"
/>

<Card
title="Disponibles"
value={disponibles}
icon="🟢"
color="#dcfce7"
/>

<Card
title="Prestados"
value={prestados}
icon="🔴"
color="#fee2e2"
/>

</div>

<div
style={{
marginTop:30,
background:"#fff",
borderRadius:28,
overflow:"hidden",
boxShadow:
"0 10px 50px rgba(0,0,0,.05)"
}}
>

<table
style={{
width:"100%",
borderCollapse:"collapse"
}}
>

<thead>

<tr
style={{
background:"#f8fafc"
}}
>

<TH>Código</TH>
<TH>Sede</TH>
<TH>Ambiente</TH>
<TH>Llavero</TH>
<TH>Responsable</TH>
<TH>Acción</TH>

</tr>

</thead>

<tbody>

{filas.map(c=>(

<tr
key={c.id}
style={{
borderBottom:
"1px solid #f1f5f9"
}}
>

<TD>{c.codigo}</TD>

<TD>

🏢 {c.sede?.nombre}

</TD>

<TD>

📍 {c.ambiente?.nombre}

</TD>

<TD>

<span
style={{
padding:"8px 14px",
background:"#eff6ff",
borderRadius:30
}}
>

{
c.llavero?.codigo
||
"No asignado"
}

</span>

</TD>

<TD>

👤

{
c.aprobadoAmbientePor
?.nombre
}

</TD>

<TD>

{

c.llavero?.estado
===
"DISPONIBLE"

?

(

<Action
text="Entregar"
color="#16a34a"
onClick={()=>{
setTipoMovimiento(
"ENTREGA"
);
abrirModal(c);
}}
/>

)

:

<>
{
!c.esResponsableActual && (
<Action
text="Transferir"
color="#f59e0b"
onClick={()=>{
setTipoMovimiento("TRANSFERENCIA");
abrirModal(c);
}}
/>
)
}

<Action
text="Devolver"
color="#dc2626"
onClick={()=>{
setTipoMovimiento("DEVOLUCION");
abrirModal(c);
}}
/>
</>

}

</TD>

</tr>

))

}

</tbody>

</table>

</div>

{

modal&&(

<div
style={overlay}
>

<div
style={modalBox}
>

<h2>

Movimiento

</h2>

<p>

🔑
{
modal.llavero?.codigo
}

</p>

<p>

🏢
{
modal.ambiente?.nombre
}

</p>

<p>

👤
{
modal.aprobadoAmbientePor
?.nombre
}

</p>

{

tipoMovimiento
!==
"TRANSFERENCIA"

&&

<input

type="file"

accept="image/*"

capture="environment"

onChange={
e=>

tipoMovimiento
===
"ENTREGA"

?

setFotoEntrega(
e.target.files?.[0]
)

:

setFotoDevolucion(
e.target.files?.[0]
)

}

/>

}

<textarea

name="detalle"

placeholder="Observación"

value={
form.detalle
}

onChange={
handleChange
}

style={{
width:"100%",
height:120,
marginTop:15
}}

/>

<div
style={{
display:"flex",
gap:10,
marginTop:20
}}
>

<button
onClick={
prestar
}
disabled={
loading
}
style={save}
>

{
loading
?
"Guardando..."
:
"Confirmar"
}

</button>

<button
onClick={
cerrarModal
}
style={cancel}
>

Cancelar

</button>

</div>

</div>

</div>

)

}

</div>

);

}

const Card = ({
title,
value,
icon,
color
})=>(

<div
style={{
background:"#fff",
borderRadius:24,
padding:28,
boxShadow:
"0 10px 40px rgba(0,0,0,.06)",
border:
"1px solid #eef2f7",
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<div>

<div
style={{
color:"#64748b",
fontSize:14
}}
>
{title}
</div>

<h1
style={{
margin:"8px 0 0",
fontSize:34,
color:"#0f172a"
}}
>
{value}
</h1>

</div>

<div
style={{
width:64,
height:64,
borderRadius:20,
background:color,
display:"grid",
placeItems:"center",
fontSize:28
}}
>
{icon}
</div>

</div>

);

const TH=
({children})=>

<th
style={{
padding:18
}}
>

{children}

</th>;

const TD=
({children})=>

<td
style={{
padding:18
}}
>

{children}

</td>;

const Action=({

text,
color,
onClick

})=>(

<button

onClick={onClick}

style={{

padding:
"12px 18px",

border:"none",

cursor:"pointer",

borderRadius:14,

background:
color,

color:"#fff",

fontWeight:700,

transition:
".25s",

boxShadow:
"0 8px 20px rgba(0,0,0,.12)"

}}

>

{text}

</button>

);

const overlay={
position:"fixed",
inset:0,
background:"rgba(0,0,0,.4)"
};

const modalBox={
width:"min(500px,95%)",
background:"#fff",
margin:"40px auto",
padding:30,
borderRadius:20
};

const save={
flex:1,
padding:14,
background:"#2563eb",
color:"#fff",
border:"none"
};

const cancel={
flex:1,
padding:14
};