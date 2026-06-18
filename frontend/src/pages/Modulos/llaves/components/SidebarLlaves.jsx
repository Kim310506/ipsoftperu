// src/pages/modulos/llaves/components/SidebarLlaves.jsx

import {
  Home,
  KeyRound,
  FolderPlus,
  ClipboardList,
  FileText,
  LogOut,
  X,
} from "lucide-react";

import { useState } from "react";

export default function SidebarLlaves({
  menuActivo,
  setMenuActivo,
  cerrarSesion,
}) {

const [openSidebar, setOpenSidebar] =
useState(false);

const usuarioStorage =
localStorage.getItem("llavesUser");

const usuario =
usuarioStorage
? JSON.parse(usuarioStorage)
: null;

const rol =
usuario?.user?.rol ||
usuario?.rol;

const roles =
(rol || "")
.split(",")
.map(r => r.trim());

const abrir = (menu) => {

setMenuActivo(menu);

setOpenSidebar(false);

};

const MenuButton = ({
menu,
icon: Icon,
label,
}) => (

<button
onClick={() => abrir(menu)}
className={`

rounded-2xl
px-5
py-5
font-bold
flex
items-center
gap-4
transition-all

${
menuActivo===menu
? "bg-white text-[#244db7] shadow-lg"
: "text-white/80 hover:bg-white/10"
}

`}
>

<Icon size={20} />

{label}

</button>

);

return (

<>

<button
onClick={() =>
setOpenSidebar(true)
}
className="
lg:hidden
fixed
top-5
right-5
z-50
w-14
h-14
rounded-full
bg-[#244db7]
text-white
"
>

☰

</button>

{
openSidebar && (

<div
onClick={() =>
setOpenSidebar(false)
}
className="
fixed
inset-0
bg-black/40
z-40
lg:hidden
"
/>

)
}

<aside
className={`

fixed
top-0
right-0
w-[280px]
min-h-screen
bg-[#244db7]
text-white
flex
flex-col
z-50
transition-all

${
openSidebar
? "translate-x-0"
: "translate-x-full"
}

lg:translate-x-0
lg:static

`}
>

<button
onClick={() =>
setOpenSidebar(false)
}
className="
lg:hidden
absolute
top-5
right-5
"
>

<X/>

</button>

<div className="p-10">

<h1 className="text-2xl font-black">

LLAVES

</h1>

</div>

<div className="flex flex-col gap-3 p-5">

{/* RESPONSABLE */}
{
roles.includes(
"RESPONSABLE LLAVES"
) && (

<>

<MenuButton
menu="inicio"
icon={Home}
label="INICIO"
/>

<MenuButton
menu="prestamos"
icon={ClipboardList}
label="PRÉSTAMOS"
/>

<MenuButton
menu="reportes"
icon={FileText}
label="REPORTES"
/>

</>

)
}
{/* RECEPCION SEGURIDAD */}

{
roles.includes(
"RECEPCION DE SEGURIDAD"
) && (

<>

<MenuButton
menu="reportes"
icon={FileText}
label="REPORTES"
/>

</>

)
}

{/* ADMIN */}

{
roles.includes("ADMIN")
&& (

<>

<MenuButton
menu="inicio"
icon={Home}
label="INICIO"
/>

<MenuButton
menu="administrar"
icon={KeyRound}
label="ADMINISTRAR"
/>

<MenuButton
menu="llavero"
icon={FolderPlus}
label="CREAR LLAVERO"
/>

<MenuButton
menu="prestamos"
icon={ClipboardList}
label="PRÉSTAMOS"
/>

<MenuButton
menu="reportes"
icon={FileText}
label="REPORTES"
/>

</>

)
}

</div>

<div className="mt-auto p-5">

<button
onClick={cerrarSesion}
className="

w-full
py-4
rounded-2xl
bg-white/10
hover:bg-white
hover:text-[#244db7]
font-bold
flex
justify-center
gap-3

"
>

<LogOut/>

CERRAR SESIÓN

</button>

</div>

</aside>

</>

);

}