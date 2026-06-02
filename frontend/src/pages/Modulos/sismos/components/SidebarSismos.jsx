import {
  Home,
  LayoutDashboard,
  FileWarning,
  LogOut,
  X,
} from "lucide-react";

import { useState } from "react";

export default function SidebarSismos({
  menuActivo,
  setMenuActivo,
  cerrarSesion,
}) {

  const [openSidebar, setOpenSidebar] = useState(false);

  const usuarioStorage =
    localStorage.getItem("sismosUser");

  const usuario = usuarioStorage
    ? JSON.parse(usuarioStorage)
    : null;

  const rol = usuario?.user?.rol || usuario?.rol;

  return (
    <>
      {/* BOTÓN MOBILE */}
      <button
        onClick={() => setOpenSidebar(true)}
        className="
          lg:hidden
          fixed
          top-5
          left-5
          z-50
          w-14
          h-14
          rounded-full
          bg-blue-600
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

      {/* FONDO OSCURO */}
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="
            fixed inset-0
            bg-black/40
            backdrop-blur-sm
            z-40
            lg:hidden
          "
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed
          top-0
          left-0
          min-h-screen
          w-[280px]
          bg-blue-600
          text-white
          flex
          flex-col
          z-50
          transition-all
          duration-300

          ${
            openSidebar
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
          lg:static
        `}
      >

        {/* CERRAR MOBILE */}
        <button
          onClick={() => setOpenSidebar(false)}
          className="
            lg:hidden
            absolute
            top-5
            right-5
          "
        >
          <X />
        </button>

        {/* LOGO */}
        <div className="p-8 text-center border-b border-white/10">

          <div className="mb-4 flex justify-center">
            <FileWarning size={50} />
          </div>

          <h1 className="font-bold text-lg">
            Sistema Gestión
          </h1>

          <h2 className="font-bold">
            de Sismos
          </h2>

        </div>

        {/* MENÚ */}
        <div className="flex flex-col gap-3 p-5">

          <button
            onClick={() => {
              setMenuActivo("inicio");
              setOpenSidebar(false);
            }}
            className={`
              rounded-2xl
              px-5
              py-4
              flex
              items-center
              gap-4
              font-semibold

              ${
                menuActivo === "inicio"
                  ? "bg-white text-blue-600 shadow-lg"
                  : "hover:bg-white/10"
              }
            `}
          >
            <Home size={20} />
            Principal
          </button>

          <button
            onClick={() => {
              setMenuActivo("dashboard");
              setOpenSidebar(false);
            }}
            className={`
              rounded-2xl
              px-5
              py-4
              flex
              items-center
              gap-4
              font-semibold

              ${
                menuActivo === "dashboard"
                  ? "bg-white text-blue-600 shadow-lg"
                  : "hover:bg-white/10"
              }
            `}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>

        </div>

        {/* LOGOUT */}
        <div className="mt-auto p-5">

          <button
            onClick={cerrarSesion}
            className="
              w-full
              bg-white/10
              hover:bg-white
              hover:text-blue-600
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
            Cerrar Sesión
          </button>

        </div>

      </aside>
    </>
  );
}