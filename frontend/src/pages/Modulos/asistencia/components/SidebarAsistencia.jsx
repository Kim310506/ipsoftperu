// src/pages/modulos/asistencia/components/SidebarAsistencia.jsx

import {
  Home,
  Camera,
  Clock3,
  ScanFace,
  MapPinned,
  FileText,
  LogOut,
  X,
} from "lucide-react";

import { useState } from "react";

export default function SidebarAsistencia({
  menuActivo,
  setMenuActivo,
  cerrarSesion,
}) {

  const [openSidebar, setOpenSidebar] =
    useState(false);

  const usuarioStorage =
    localStorage.getItem("asistenciaUser");

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
          menuActivo === menu
          ? "bg-[#F5B300] text-black shadow-lg"
          : "text-gray-300 hover:bg-white/10 hover:text-[#F5B300]"
        }
      `}
    >
      <Icon size={20} />
      {label}
    </button>

  );

  return (

    <>

      {/* BOTÓN MÓVIL */}

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
          bg-[#1A1A1A]
          text-white
        "
      >
        ☰
      </button>

      {/* FONDO */}

      {openSidebar && (

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

      )}

      {/* SIDEBAR */}

      <aside
        className={`
          fixed
          top-0
          right-0
          w-[280px]
          min-h-screen
          bg-[#1A1A1A]
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
          <X />
        </button>

        <div className="p-10">

          <h1 className="text-3xl font-black text-[#F5B300]">
              ASISTENCIA
          </h1>

        </div>

        <div className="flex flex-col gap-3 p-5">

          {/* TRABAJADOR */}

          {roles.includes("EMPLEADO") && (

            <>

              <MenuButton
                menu="asistencia"
                icon={Camera}
                label="MARCAR ASISTENCIA"
              />

            </>

          )}

          {/* ADMIN */}

          {roles.includes("ADMIN") && (

            <>

              <MenuButton
                menu="inicio"
                icon={Home}
                label="INICIO"
              />

              <MenuButton
                menu="asistencia"
                icon={Camera}
                label="MARCAR ASISTENCIA"
              />

              <MenuButton
                menu="biometria"
                icon={ScanFace}
                label="BIOMETRÍA"
              />

              <MenuButton
                menu="reportes"
                icon={FileText}
                label="REPORTES"
              />

            </>

          )}

        </div>

        <div className="mt-auto p-5">

          <button
            onClick={cerrarSesion}
            className="
              w-full
              py-4
              rounded-2xl
              bg-[#2A2A2A]
              text-white
              hover:bg-[#F5B300]
              hover:text-black
              font-bold
              flex
              justify-center
              gap-3
            "
          >

            <LogOut />

            CERRAR SESIÓN

          </button>

        </div>

      </aside>

    </>

  );

}