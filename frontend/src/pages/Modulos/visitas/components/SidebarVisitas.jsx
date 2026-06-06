// src/pages/modulos/visitas/components/SidebarVisitas.jsx

import {
  Home,
  Search,
  Calendar,
  Check,
  FileText,
  LogOut,
  X,
} from "lucide-react";

import { useState } from "react";

export default function SidebarVisitas({
  menuActivo,
  setMenuActivo,
  cerrarSesion,
}) {

  const [openSidebar, setOpenSidebar] = useState(false);

  // OBTENER USUARIO
  const usuarioStorage = localStorage.getItem("visitasUser");

  const usuario = usuarioStorage
    ? JSON.parse(usuarioStorage)
    : null;

  console.log("USUARIO:", usuario);

  // OBTENER ROL
  const rol = usuario?.user?.rol || usuario?.rol;
const roles = (rol || "").split(",").map(r => r.trim());
  console.log("ROL:", rol);

  return (
    <>

      {/* BOTÓN HAMBURGUESA MOBILE */}
      <button
        onClick={() => setOpenSidebar(true)}
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
          flex
          items-center
          justify-center
          shadow-xl
        "
      >
        <div className="flex flex-col gap-1">
          <span className="w-6 h-[3px] bg-white rounded-full"></span>
          <span className="w-6 h-[3px] bg-white rounded-full"></span>
          <span className="w-6 h-[3px] bg-white rounded-full"></span>
        </div>
      </button>

      {/* BACKDROP */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed
          top-0
          right-0
          min-h-screen
          w-[280px]
          bg-[#244db7]
          text-white
          flex
          flex-col
          z-50
          transition-all
          duration-300

          ${openSidebar ? "translate-x-0" : "translate-x-full"}

          lg:translate-x-0
          lg:static
          lg:min-h-screen
        `}
      >

        {/* CLOSE MOBILE */}
        <button
          onClick={() => setOpenSidebar(false)}
          className="lg:hidden absolute top-5 right-5 text-3xl"
        >
          <X />
        </button>

        {/* LOGO */}
        <div className="p-10 border-b border-white/10 text-center">
          <h1 className="text-2xl font-black tracking-widest">
            VISITAS
          </h1>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-4 p-5">

          {/* ========================= */}
{/* MENÚ SEGÚN ROL */}
{/* ========================= */}

{/* SA */}
{roles.includes("SOLICITANTE DE ACCESO (SA)") && (
    <>
    <button
      onClick={() => {
        setMenuActivo("programar");
        setOpenSidebar(false);
      }}
      className={`rounded-2xl px-5 py-5 font-bold flex items-center gap-4 transition-all
        ${
          menuActivo === "programar"
            ? "bg-white text-[#244db7] shadow-lg"
            : "text-white/80 hover:bg-white/10"
        }`}
    >
      <Calendar size={20} />
      PROGRAMAR
    </button>

    <button
      onClick={() => {
        setMenuActivo("autorizar");
        setOpenSidebar(false);
      }}
      className={`rounded-2xl px-5 py-5 font-bold flex items-center gap-4 transition-all
        ${
          menuActivo === "autorizar"
            ? "bg-white text-[#244db7] shadow-lg"
            : "text-white/80 hover:bg-white/10"
        }`}
    >
      <Check size={20} />
      AUTORIZAR
    </button>
  </>
)}

{/* RA */}
{roles.includes("RESPONSABLE DE AREA (RA)") && (
  <>
    <button
      onClick={() => {
        setMenuActivo("autorizar");
        setOpenSidebar(false);
      }}
      className={`rounded-2xl px-5 py-5 font-bold flex items-center gap-4 transition-all
        ${
          menuActivo === "autorizar"
            ? "bg-white text-[#244db7] shadow-lg"
            : "text-white/80 hover:bg-white/10"
        }`}
    >
      <Check size={20} />
      AUTORIZAR
    </button>

    <button
      onClick={() => {
        setMenuActivo("reportes");
        setOpenSidebar(false);
      }}
      className={`rounded-2xl px-5 py-5 font-bold flex items-center gap-4 transition-all
        ${
          menuActivo === "reportes"
            ? "bg-white text-[#244db7] shadow-lg"
            : "text-white/80 hover:bg-white/10"
        }`}
    >
      <FileText size={20} />
      REPORTES
    </button>
  </>
)}

{/* REC */}
{roles.includes("RECEPCION DE SEGURIDAD (REC)") && (
  <>
    <button
      onClick={() => {
        setMenuActivo("consultas");
        setOpenSidebar(false);
      }}
      className={`rounded-2xl px-5 py-5 font-bold flex items-center gap-4 transition-all
        ${
          menuActivo === "consultas"
            ? "bg-white text-[#244db7] shadow-lg"
            : "text-white/80 hover:bg-white/10"
        }`}
    >
      <Search size={20} />
      CONSULTAS
    </button>

    <button
      onClick={() => {
        setMenuActivo("reportes");
        setOpenSidebar(false);
      }}
      className={`rounded-2xl px-5 py-5 font-bold flex items-center gap-4 transition-all
        ${
          menuActivo === "reportes"
            ? "bg-white text-[#244db7] shadow-lg"
            : "text-white/80 hover:bg-white/10"
        }`}
    >
      <FileText size={20} />
      REPORTES
    </button>
  </>
)}
{/* ADMIN */}
{roles.includes("ADMIN") && (
  <>
    <button
      onClick={() => {
        setMenuActivo("inicio");
        setOpenSidebar(false);
      }}
      className={`rounded-2xl px-5 py-5 font-bold flex items-center gap-4 transition-all
        ${
          menuActivo === "inicio"
            ? "bg-white text-[#244db7] shadow-lg"
            : "text-white/80 hover:bg-white/10"
        }`}
    >
      <Home size={20} />
      INICIO
    </button>

    <button
      onClick={() => {
        setMenuActivo("consultas");
        setOpenSidebar(false);
      }}
      className={`rounded-2xl px-5 py-5 font-bold flex items-center gap-4 transition-all
        ${
          menuActivo === "consultas"
            ? "bg-white text-[#244db7] shadow-lg"
            : "text-white/80 hover:bg-white/10"
        }`}
    >
      <Search size={20} />
      CONSULTAS
    </button>

    <button
      onClick={() => {
        setMenuActivo("programar");
        setOpenSidebar(false);
      }}
      className={`rounded-2xl px-5 py-5 font-bold flex items-center gap-4 transition-all
        ${
          menuActivo === "programar"
            ? "bg-white text-[#244db7] shadow-lg"
            : "text-white/80 hover:bg-white/10"
        }`}
    >
      <Calendar size={20} />
      PROGRAMAR
    </button>

    <button
      onClick={() => {
        setMenuActivo("autorizar");
        setOpenSidebar(false);
      }}
      className={`rounded-2xl px-5 py-5 font-bold flex items-center gap-4 transition-all
        ${
          menuActivo === "autorizar"
            ? "bg-white text-[#244db7] shadow-lg"
            : "text-white/80 hover:bg-white/10"
        }`}
    >
      <Check size={20} />
      AUTORIZAR
    </button>

    <button
      onClick={() => {
        setMenuActivo("reportes");
        setOpenSidebar(false);
      }}
      className={`rounded-2xl px-5 py-5 font-bold flex items-center gap-4 transition-all
        ${
          menuActivo === "reportes"
            ? "bg-white text-[#244db7] shadow-lg"
            : "text-white/80 hover:bg-white/10"
        }`}
    >
      <FileText size={20} />
      REPORTES
    </button>
  </>
)}
        </div>

        {/* LOGOUT */}
        <div className="mt-auto p-5">

          <button
            onClick={cerrarSesion}
            className="
              w-full
              bg-white/10
              hover:bg-white
              hover:text-[#244db7]
              text-white
              py-4
              rounded-2xl
              font-bold
              flex
              items-center
              justify-center
              gap-3
              transition-all
            "
          >
            <LogOut size={18} />
            CERRAR SESIÓN
          </button>

        </div>

      </aside>
    </>
  );
}