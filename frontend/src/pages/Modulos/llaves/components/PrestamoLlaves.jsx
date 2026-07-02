import {useEffect,
useMemo,
useState,
useRef} from "react";

export default function PrestamoLlaveros() {

const [llaveros,setLlaveros]=useState([]);
const [contratas,setContratas]=useState([]);
const [cameraOpen,setCameraOpen]=useState(false);
const [stream,setStream]=useState(null);
const videoRef=useRef(null);
const canvasRef=useRef(null);
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
  detalle:"",
  trabajadorId:""
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
"http://localhost:3000/llaves/contratas"
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

const abrirModal=
(data)=>{

setModal(data);

setForm({
detalle:"",
trabajadorId:""
});

setFotoEntrega(null);

setFotoDevolucion(null);

if(
tipoMovimiento
!==
"TRANSFERENCIA"
){

setTimeout(
abrirCamara,
300
);

}

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
    if (!form.trabajadorId) {
  alert("Seleccione un responsable");
  return;
}
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
    const tipoContrataFinal =
  modal?.tipoContrata ||
  modal?.tipo ||
  modal?.contrata?.tipo ||
  "SIN_TIPO";

fd.append("tipoContrata", tipoContrataFinal);
if (tipoMovimiento === "ENTREGA") {
  fd.append(
    "responsableEntregaId",
    String(form.trabajadorId)
  );
  fd.append("tipoResponsableEntrega", modal.tipo); 
}

if (tipoMovimiento === "DEVOLUCION") {
  fd.append(
    "responsableDevolucionId",
    String(form.trabajadorId)
  );
  fd.append("tipoResponsableDevolucion", modal.tipo);
}

if (tipoMovimiento === "TRANSFERENCIA") {
  fd.append(
    "responsableTransferenciaId",
    String(form.trabajadorId)
  );
  fd.append("tipoResponsableTransferencia", modal.tipo);
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
fd.append("tipoContrataDestino", modal.tipo);
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
console.log("TIPO CONTRATA FINAL:", tipoContrataFinal);
console.log("MODAL COMPLETO:", modal);
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
const abrirCamara=
async()=>{

try{

const media=
await navigator
.mediaDevices
.getUserMedia({

video:{
facingMode:
"environment"
},

audio:false

});

setStream(
media
);

setCameraOpen(
true
);

setTimeout(()=>{

if(
videoRef.current
){

videoRef.current.srcObject=
media;

}

},100);

}catch{

alert(
"No se pudo abrir cámara"
);

}

};
const cerrarCamara=
()=>{

stream
?.getTracks()
.forEach(
t=>
t.stop()
);

setStream(null);

setCameraOpen(false);

};
const tomarFoto=
()=>{

const canvas=
canvasRef.current;

const video=
videoRef.current;

canvas.width=
video.videoWidth;

canvas.height=
video.videoHeight;

const ctx=
canvas.getContext(
"2d"
);

ctx.drawImage(

video,

0,
0,

canvas.width,
canvas.height

);

canvas.toBlob(

(blob)=>{

const archivo=
new File(

[blob],

"foto.jpg",

{
type:
"image/jpeg"
}

);

if(
tipoMovimiento
===
"ENTREGA"
){

setFotoEntrega(
archivo
);

}

if(
tipoMovimiento
===
"DEVOLUCION"
){

setFotoDevolucion(
archivo
);

}

cerrarCamara();

},

"image/jpeg",

0.9

);

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

const filas = useMemo(() => {

  return contratas
    .map(c => {

  const llave =
    llaveros
      .flatMap(l =>
        l.llaves?.map(k => ({
          ...k,
          llavero: l
        })) || []
      )
      .find(k =>
        k.ambienteId === c.ambienteId
      );

  const prestamos =
    llave?.llavero?.prestamos || [];

  const movimientosDeContrata =
    prestamos.filter(p =>
      p.contrataId === c.id ||
      p.transferencias?.some(
        t =>
          t.contrataOrigenId === c.id ||
          t.contrataDestinoId === c.id
      )
    );

  const todoDevuelto =
    movimientosDeContrata.length > 0 &&
    movimientosDeContrata.every(
      p => p.estado === "DEVUELTO"
    );

  const mostrar =
    movimientosDeContrata.length === 0 ||
    !todoDevuelto;

  const prestamoActivo =
    prestamos.find(
      p => p.estado === "ACTIVO"
    );

  /*
    QUIÉN TIENE EL LLAVERO AHORITA
  */
  const ultimaTransferencia =
    prestamoActivo?.transferencias?.at(-1);

  const responsableActualId =
    ultimaTransferencia
      ? ultimaTransferencia.contrataDestinoId
      : prestamoActivo?.contrataId;

  const esResponsableActual =
    responsableActualId === c.id;

  return {
    ...c,
    llavero: llave?.llavero,
    llave,
    prestamoActivo,
    mostrar,
    esResponsableActual
  };

})

    .filter(c =>
      c.mostrar &&
      `
      ${c.tipo}
      ${c.codigo}
      ${c.sede?.nombre}
      ${c.ambiente?.nombre}
      `
        .toLowerCase()
        .includes(search.toLowerCase())
    );

}, [contratas, llaveros, search]);
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
<TH>Tipo</TH>
<TH>Código</TH>
<TH>Sede</TH>
<TH>Ambiente</TH>
<TH>Llavero</TH>
<TH>Motivo</TH>
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
<TD>{c.tipo}</TD>
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

{
c.motivo
}

</TD>

<TD>

{
c.llavero?.estado === "DISPONIBLE"

?

<Action
text="Entregar"
color="#16a34a"
onClick={()=>{
setTipoMovimiento("ENTREGA");
abrirModal(c);
}}
/>

:

c.esResponsableActual

?

<Action
text="Devolver"
color="#dc2626"
onClick={()=>{
setTipoMovimiento("DEVOLUCION");
abrirModal(c);
}}
/>

:

<div
style={{
display:"flex",
gap:10
}}
>

<Action
text="Transferir"
color="#f59e0b"
onClick={()=>{
setTipoMovimiento("TRANSFERENCIA");
abrirModal(c);
}}
/>

<Action
text="Devolver"
color="#dc2626"
onClick={()=>{
setTipoMovimiento("DEVOLUCION");
abrirModal(c);
}}
/>

</div>

}

</TD>

</tr>

))

}

</tbody>

</table>

</div>

{
modal && (

<div style={overlay}>

<div style={modalBox}>


{/* HEADER */}

<div
style={{
background:
tipoMovimiento==="ENTREGA"
? "linear-gradient(135deg,#16a34a,#22c55e)"
: tipoMovimiento==="DEVOLUCION"
? "linear-gradient(135deg,#dc2626,#ef4444)"
: "linear-gradient(135deg,#f59e0b,#f97316)",

padding:28,
color:"#fff"
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<div>

<div
style={{
fontSize:26,
fontWeight:800
}}
>

{
tipoMovimiento==="ENTREGA"
? "🔑 Entrega de Llavero"

: tipoMovimiento==="DEVOLUCION"

? "📥 Devolución"

: "🔄 Transferencia"

}

</div>
<div style={{ marginTop: 6, fontSize: 14, opacity: 0.9 }}>
  Tipo de contrata: <b>{modal?.tipo || "-"}</b>
</div>
<div
style={{
opacity:.9,
marginTop:8
}}
>

Registro seguro del movimiento

</div>

</div>

<button
onClick={()=>{
cerrarCamara();
cerrarModal();
}}
style={{
background:"rgba(255,255,255,.2)",
border:"none",
color:"#fff",
width:42,
height:42,
borderRadius:999,
cursor:"pointer"
}}
>

✕

</button>

</div>

</div>


{/* BODY */}

<div
style={{
padding:30
}}
>

<div
style={{
background:"#f8fafc",
borderRadius:20,
padding:20,
marginBottom:22
}}
>

<Info
label="Llavero"
value={
modal.llavero?.codigo
}
/>

<Info
label="Ambiente"
value={
modal.ambiente?.nombre
}
/>

<div style={{ marginBottom:20 }}>

  <div
    style={{
      fontWeight:700,
      marginBottom:10
    }}
  >
    👤 Responsable
  </div>

  <select
    name="trabajadorId"
    value={form.trabajadorId}
    onChange={handleChange}
    style={{
      width:"100%",
      padding:16,
      borderRadius:16,
      border:"1px solid #e2e8f0"
    }}
  >
    <option value="">
      Seleccione trabajador
    </option>

    {modal.trabajadores?.map(t=>(
      <option
        key={t.id}
        value={t.id}
      >
        {t.nombres} {t.apellidoPaterno} {t.apellidoMaterno}
      </option>
    ))}

  </select>

</div>

</div>


{
tipoMovimiento!=="TRANSFERENCIA"
&&

<div
style={{
marginBottom:20
}}
>

<div
style={{
fontWeight:700,
marginBottom:14
}}
>

📷 Evidencia fotográfica

</div>


{

cameraOpen

?

<div
style={{
position:"relative"
}}
>

<video
ref={videoRef}
autoPlay
playsInline
style={{

width:"100%",
height:340,

objectFit:"cover",

borderRadius:24,

background:"#000"

}}
/>

<canvas
ref={canvasRef}
style={{
display:"none"
}}
/>

<button

onClick={tomarFoto}

style={{

position:"absolute",

bottom:20,

left:"50%",

transform:
"translateX(-50%)",

width:84,

height:84,

borderRadius:"50%",

background:"#fff",

border:
"8px solid #2563eb",

cursor:"pointer"

}}

>

📸

</button>

</div>

:

<div
style={{
border:
"2px dashed #cbd5e1",

borderRadius:24,

padding:40,

textAlign:"center"
}}
>

{

fotoEntrega
||
fotoDevolucion

?

<>

<div
style={{
fontSize:60
}}
>
✅
</div>

<div
style={{
marginTop:10,
fontWeight:700
}}
>

Foto capturada

</div>

</>

:

<>

<div
style={{
fontSize:50
}}
>
📷
</div>

<button

onClick={abrirCamara}

style={{

marginTop:16,

background:
"#2563eb",

color:"#fff",

padding:
"14px 28px",

border:"none",

borderRadius:16,

fontWeight:700,

cursor:"pointer"

}}

>

Abrir cámara

</button>

</>

}

</div>

}

</div>

}

<textarea

name="detalle"

value={
form.detalle
}

onChange={
handleChange
}

placeholder="Observaciones del movimiento..."

style={{

width:"100%",

height:130,

border:
"1px solid #e2e8f0",

borderRadius:18,

padding:18,

fontSize:15,

resize:"none"

}}

/>


<div
style={{
display:"flex",
gap:14,
marginTop:28
}}
>

<button

onClick={()=>{
cerrarCamara();
cerrarModal();
}}

style={cancel}

>

Cancelar

</button>


<button

onClick={prestar}

disabled={loading}

style={save}

>

{

loading

?

"Guardando..."

:

"Confirmar movimiento"

}

</button>

</div>

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
const overlay={

position:"fixed",

inset:0,

background:
"rgba(15,23,42,.65)",

backdropFilter:
"blur(12px)",

display:"grid",

placeItems:"center",

zIndex:999

};

const modalBox={

width:"min(760px,95vw)",

maxHeight:"92vh",

overflow:"auto",

background:"#fff",

borderRadius:34,

boxShadow:
"0 30px 100px rgba(0,0,0,.25)"

};

const save={

flex:1,

padding:18,

background:
"linear-gradient(135deg,#2563eb,#1d4ed8)",

color:"#fff",

border:"none",

borderRadius:18,

fontWeight:800,

cursor:"pointer"

};

const cancel={

flex:1,

padding:18,

background:"#f1f5f9",

border:"none",

borderRadius:18,

fontWeight:700,

cursor:"pointer"

};

const Info=({
label,
value
})=>(

<div
style={{
marginBottom:14
}}
>

<div
style={{
fontSize:12,
color:"#64748b"
}}
>
{label}
</div>

<div
style={{
fontWeight:700,
fontSize:18
}}
>
{value||"-"}
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