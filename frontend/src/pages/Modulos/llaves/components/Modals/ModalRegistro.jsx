import api from "../../../../../api/axios";
import {
useEffect,
useMemo,
useState,
} from "react";

export default function ModalRegistro({
show,
onClose,
}) {

const [sedes,setSedes]=
useState([]);

const [sedeId,setSedeId]=
useState("");

const [pabellonId,
setPabellonId]=
useState("");
const [
llaveroExistente,
setLlaveroExistente
]=
useState(
null
);
const [pisoId,
setPisoId]=
useState("");

const [ambienteId,
setAmbienteId]=
useState("");

const [
tipoAgrupacion,
setTipoAgrupacion
]=
useState(
"COMPLETA"
);

const [
nombreLlavero,
setNombreLlavero
]=
useState("");

const [
codigoLlavero,
setCodigoLlavero
]=
useState("");

const [
codigoLlave,
setCodigoLlave
]=
useState("");

const [
descripcion,
setDescripcion
]=
useState("");

useEffect(()=>{

if(show){

cargarZonales();

}

},[
show
]);

const cargarZonales=
async()=>{

try{

const {
data
}=
await api.get(
"/zonales"
);

setSedes(
data.flatMap(
z=>
z.sedes||[]
)
);

}catch(err){

console.log(err);

}

};


const pabellones=
useMemo(()=>{

if(
!sedeId
)
return[];

return (
sedes.find(
s=>
String(
s.id
)===
sedeId
)
?.pabellones
||
[]
);

},
[
sedeId,
sedes
]);


const pisos=
useMemo(()=>{

if(
!pabellonId
)
return[];

return (
pabellones.find(
x=>
String(
x.id
)===
pabellonId
)
?.pisos
||
[]
);

},
[
pabellonId,
pabellones
]);


const ambientes=
useMemo(()=>{

if(
!pisoId
)
return[];

return (
pisos.find(
x=>
String(
x.id
)===
pisoId
)
?.ambientes
||
[]
);

},
[
pisoId,
pisos
]);


useEffect(()=>{

const sede=
sedes.find(
x=>
String(x.id)===
sedeId
);

const pab=
pabellones.find(
x=>
String(x.id)===
pabellonId
);

const piso=
pisos.find(
x=>
String(x.id)===
pisoId
);

let nombre="";
let codigo="";

const s=
sede?.nombre
?.substring(0,3)
.toUpperCase()
|| "";

const p=
pab?.nombre
?.replace(
"PABELLON",
"P"
)
.replace(
" ",
""
)
.toUpperCase()
|| "";

const pi=
piso?.nombre
?.replace(
"PISO",
""
)
|| "";


// SOLO SEDE
if(
tipoAgrupacion===
"SEDE"
){

nombre=
`LLAV-${s}`;

codigo=
`LL-${s}`;

}


// SEDE + PABELLON + PISO
if(
tipoAgrupacion===
"PISO"
){

nombre=
`LLAV-${s}-${p}-${pi}`;

codigo=
`LL-${s}-${p}-${pi}`;

}


// COMPLETA
// YA NO USA AMBIENTE
if(
tipoAgrupacion===
"COMPLETA"
){

nombre=
`LLAV-${s}-${p}-${pi}`;

codigo=
`LL-${s}-${p}-${pi}`;

}

setNombreLlavero(
nombre
);

setCodigoLlavero(
codigo
);

setCodigoLlave(

ambienteId
? `KEY-${
ambienteId
}-${
Date.now()
}`
: ""

);

},
[
tipoAgrupacion,
sedeId,
pabellonId,
pisoId
]);

useEffect(()=>{

const verificar=
async()=>{

if(
!nombreLlavero
)
return;

try{

const {
data
}=
await api.get(
"/llaveros"
);

const existe=
data.find(
x=>

x.nombre===
nombreLlavero

||

x.codigo===
codigoLlavero

);

setLlaveroExistente(
existe ||
null
);

}catch(err){

console.log(
err
);

}

};

verificar();

},
[
nombreLlavero,
codigoLlavero
]);

const guardar = async () => {

try {

const usuario =
JSON.parse(
localStorage.getItem(
"llavesUser"
)
);

if(!usuario?.id){

alert(
"Sesión expirada"
);

return;

}

const payload = {

createdById:
usuario.id,

ambienteId,

llavero:
llaveroExistente
? {
id:
llaveroExistente.id
}
: {
nombre:
nombreLlavero,
codigo:
codigoLlavero
},

llave:{
codigo:
codigoLlave,
descripcion
}

};

console.log(
"PAYLOAD",
payload
);

await api.post(
"/llaves",
payload
);

onClose();

}catch(err){

console.log(err);

}

};
if(
!show
)
return null;

return (

<div className="
fixed inset-0
bg-black/60
backdrop-blur-sm
flex items-center justify-center
z-50
">

<div className="
bg-white
w-[95vw]
max-w-[700px]
max-h-[92vh]
overflow-y-auto
rounded-3xl
shadow-2xl
overflow-hidden
">

{/* HEADER */}

<div className="
bg-gradient-to-r
from-blue-700
to-indigo-700
text-white
px-8
py-5
flex
justify-between
items-center
">

<div>

<h2 className="
text-2xl
font-bold
">
🔑 Registro de Llaves
</h2>

<p className="
text-blue-100
text-sm
mt-1
">
Configuración automática del llavero
</p>

</div>

<button
onClick={onClose}
className="
w-10
h-10
rounded-full
hover:bg-white/20
"
>

✕

</button>

</div>


<div className="
p-8
space-y-8
">

{/* UBICACION */}

<div>

<h3 className="
font-semibold
text-gray-800
mb-4
text-lg
">
Ubicación
</h3>

<div className="
grid
grid-cols-2
gap-4
">

<select
className="
border
rounded-xl
p-3
focus:ring-2
focus:ring-blue-500
"
value={sedeId}
onChange={(e)=>{
setSedeId(e.target.value);
setPabellonId("");
setPisoId("");
setAmbienteId("");
}}
>

<option>Seleccione sede</option>

{
sedes.map(s=>(

<option
key={s.id}
value={s.id}
>

{s.nombre}

</option>

))
}

</select>


<select
className="
border
rounded-xl
p-3
"
value={pabellonId}
onChange={(e)=>{

setPabellonId(
e.target.value
);

setPisoId("");

}}
>

<option>
Seleccione pabellón
</option>

{
pabellones.map(x=>(

<option
key={x.id}
value={x.id}
>

{x.nombre}

</option>

))
}

</select>


<select
className="
border
rounded-xl
p-3
"
value={pisoId}
onChange={(e)=>
setPisoId(
e.target.value
)
}
>

<option>
Seleccione piso
</option>

{
pisos.map(x=>(

<option
key={x.id}
value={x.id}
>

{x.nombre}

</option>

))
}

</select>


<select
className="
border
rounded-xl
p-3
"
value={ambienteId}
onChange={(e)=>
setAmbienteId(
e.target.value
)
}
>

<option>
Seleccione ambiente
</option>

{
ambientes.map(x=>(

<option
key={x.id}
value={x.id}
>

{x.nombre}

</option>

))
}

</select>

</div>

</div>


{/* AGRUPACION */}

<div>

<h3 className="
font-semibold
text-gray-800
mb-4
text-lg
">
Tipo de agrupación
</h3>

<select
className="
w-full
border
rounded-xl
p-3
"
value={tipoAgrupacion}
onChange={(e)=>
setTipoAgrupacion(
e.target.value
)
}
>

<option value="SEDE">
🏢 Solo sede
</option>

<option value="PISO">
🏢 + 🏬 Piso
</option>

<option value="COMPLETA">
🏢 + 🏬 + 🚪 Completa
</option>

</select>

</div>


{/* RESULTADO */}

<div
className="
bg-slate-50
border
rounded-3xl
p-5
space-y-5
"
>

<div>

<label
className="
text-xs
uppercase
tracking-wider
text-slate-500
"
>

Llavero asignado

</label>

<input
disabled
value={nombreLlavero}
className="
mt-2
w-full
bg-white
border
rounded-2xl
px-4
py-4
font-semibold
text-slate-800
"
/>

</div>


<div>

<label
className="
text-xs
uppercase
tracking-wider
text-slate-500
"
>

Código de llave

</label>

<input
disabled
value={codigoLlave}
className="
mt-2
w-full
bg-white
border
rounded-2xl
px-4
py-4
font-mono
text-blue-700
"
/>

</div>


{
llaveroExistente && (

<div
className="
rounded-2xl
bg-blue-50
border
border-blue-200
p-4
"
>

<div
className="
font-semibold
text-blue-700
"
>

✓ Llavero encontrado

</div>

<div
className="
text-sm
text-slate-600
mt-1
"
>

Se reutilizará el llavero existente.

</div>

</div>

)}

</div>

<textarea
rows={4}
placeholder="Descripción"
value={descripcion}
onChange={(e)=>
setDescripcion(
e.target.value
)
}
className="
w-full
border
rounded-xl
p-4
resize-none
"
/>


<div className="
flex
justify-end
gap-3
pt-2
">

<button
onClick={onClose}
className="
px-6
py-3
rounded-xl
border
font-medium
"
>

Cancelar

</button>


<button
onClick={guardar}
className="
px-7
py-3
rounded-xl
bg-gradient-to-r
from-blue-600
to-indigo-700
text-white
font-semibold
shadow
hover:scale-[1.02]
transition
"
>

{
llaveroExistente
? "Usar llavero existente"
: "Guardar llave"
}

</button>

</div>

</div>

</div>

</div>

);

}