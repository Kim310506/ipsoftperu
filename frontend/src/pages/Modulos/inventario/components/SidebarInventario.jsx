import {
  LogOut,
  X,
  Package,
  User
} from "lucide-react";
import { useState } from "react";

export default function SidebarInventario({
  menuActivo = "inventario",
  setMenuActivo,
  cerrarSesion,
}) {
  const [openSidebar, setOpenSidebar] = useState(false);

  // Leer la sesión actual (Asegúrate de que la key en el login sea la correcta)
  const usuarioStorage = localStorage.getItem("usuario"); // o la key que uses en tu login
  const usuarioInfo = usuarioStorage ? JSON.parse(usuarioStorage) : null;

  // Extraer datos o poner valores por defecto para evitar errores
  const rol = usuarioInfo?.rol || "ADMINISTRADOR";
  const nombre = usuarioInfo?.nombre || "Carlos Manuel Ibarra Sánchez";

  return (
    <>
      {/* BOTÓN MOBILE */}
      <button
        onClick={() => setOpenSidebar(true)}
        className="
          lg:hidden
          fixed top-5 left-5 z-50
          w-12 h-12
          rounded-xl
          bg-[#3B5BBD] text-white
          flex items-center justify-center
          shadow-xl active:scale-95 transition-all
        "
      >
        <div className="flex flex-col gap-1.5">
          <span className="w-5 h-[2px] bg-white rounded-full"></span>
          <span className="w-5 h-[2px] bg-white rounded-full"></span>
          <span className="w-5 h-[2px] bg-white rounded-full"></span>
        </div>
      </button>

      {/* FONDO OSCURO MOBILE */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="
            fixed inset-0
            bg-slate-900/40 backdrop-blur-sm
            z-40 lg:hidden
            transition-opacity
          "
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0
          min-h-screen w-[260px] xl:w-[280px]
          bg-[#3B5BBD] text-white
          flex flex-col z-50
          transition-transform duration-300 ease-in-out
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static shrink-0
        `}
      >
        {/* CERRAR MOBILE */}
        <button
          onClick={() => setOpenSidebar(false)}
          className="lg:hidden absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all"
        >
          <X size={20} />
        </button>

        {/* 1. LOGO IPS */}
        <div className="pt-10 pb-8 text-center border-b border-white/10">
          <h1 className="font-black text-4xl italic tracking-wider leading-none">
            IPS
          </h1>
          <h2 className="font-bold text-[9px] tracking-[0.3em] uppercase mt-2 text-blue-200">
            Security
          </h2>
        </div>

        {/* 2. PERFIL DE USUARIO */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center gap-4 bg-white/5">
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
            <User size={20} className="text-blue-100" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[9px] font-black tracking-widest text-blue-200 uppercase">
              {rol}
            </span>
            <span className="text-xs font-bold text-white truncate w-full mt-0.5" title={nombre}>
              {nombre}
            </span>
          </div>
        </div>

        {/* 3. MENÚ DE NAVEGACIÓN */}
        <div className="flex flex-col gap-2 p-4 mt-2">
          <button
            onClick={() => {
              if (setMenuActivo) setMenuActivo("inventario");
              setOpenSidebar(false);
            }}
            className={`
              w-full px-5 py-4
              rounded-2xl
              flex items-center gap-4
              transition-all duration-200
              ${
                menuActivo === "inventario"
                  ? "bg-white text-[#3B5BBD] shadow-xl shadow-black/10 translate-x-2 lg:translate-x-4"
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
              }
            `}
          >
            <Package size={20} strokeWidth={menuActivo === "inventario" ? 2.5 : 2} />
            <span className="font-black tracking-widest text-[11px] uppercase">
              Inventario
            </span>
          </button>
        </div>

        {/* 4. BOTÓN CERRAR SESIÓN */}
        <div className="mt-auto p-4 mb-2">
          <button
            onClick={cerrarSesion}
            className="
              w-full py-4 px-5
              bg-white/5 hover:bg-red-500
              border border-white/10 hover:border-red-500
              text-blue-100 hover:text-white
              rounded-2xl
              flex items-center justify-center gap-3
              font-black text-[10px] tracking-widest uppercase
              transition-all duration-300 shadow-sm hover:shadow-red-500/20
            "
          >
            <LogOut size={16} />
            Salir
          </button>
        </div>
      </aside>
    </>
  );
}