// src/pages/modulos/incidentes/components/SidebarIncidentes.jsx

import {
  Home,
  ClipboardPlus,
  Search,
  ShieldAlert,
  FileText,
  LogOut,
  X,
} from "lucide-react";

import { useState } from "react";

export default function SidebarIncidentes({

  menuActivo,
  setMenuActivo,
  cerrarSesion,

}) {

  const [openSidebar, setOpenSidebar] =
    useState(false);

  // USUARIO
  const usuarioStorage =
    localStorage.getItem(
      "incidentesUser"
    );

  const usuario =
    usuarioStorage
      ? JSON.parse(usuarioStorage)
      : null;

  // ROL
  const rol =
    usuario?.user?.rol ||
    usuario?.rol;

  // COMPONENTE BOTÓN
  const ItemMenu = ({
    icon: Icon,
    label,
    value,
  }) => (

    <button
      onClick={() => {

        setMenuActivo(value);

        setOpenSidebar(false);

      }}
      className={`
        rounded-2xl
        px-5
        py-4
        font-bold
        flex
        items-center
        gap-4
        transition-all
        duration-200

        ${
          menuActivo === value
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

      {/* BOTÓN HAMBURGUESA */}
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
          onClick={() =>
            setOpenSidebar(false)
          }
          className="
            fixed
            inset-0
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
          bg-[#244db7]
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
          onClick={() =>
            setOpenSidebar(false)
          }
          className="
            lg:hidden
            absolute
            top-5
            right-5
            text-3xl
          "
        >

          <X />

        </button>

        {/* LOGO */}
        <div
          className="
            p-10
            border-b
            border-white/10
            text-center
          "
        >

          <div
            className="
              w-20
              h-20
              rounded-3xl
              bg-white/10
              mx-auto
              flex
              items-center
              justify-center
              mb-5
            "
          >

            <ShieldAlert size={40} />

          </div>

          <h1
            className="
              text-2xl
              font-black
              tracking-widest
            "
          >
            INCIDENTES
          </h1>

          <p
            className="
              text-white/70
              text-sm
              mt-2
            "
          >
            Sistema de Gestión
          </p>

        </div>

        {/* MENÚ */}
        <div
          className="
            flex
            flex-col
            gap-4
            p-5
          "
        >

          {/* ====================== */}
          {/* ADMIN */}
          {/* ====================== */}

          {rol === "ADMIN" && (
            <>

              <ItemMenu
                icon={Home}
                label="INICIO"
                value="inicio"
              />

              <ItemMenu
                icon={ClipboardPlus}
                label="OCURRENCIAS"
                value="ocurrencias"
              />

              <ItemMenu
                icon={FileText}
                label="REPORTES"
                value="reportes"
              />

            </>
          )}

          {/* USUARIO */}
          {rol === "USUARIO" && (
            <>

              <ItemMenu
                icon={ClipboardPlus}
                label="REGISTRAR"
                value="registrar"
              />

              <ItemMenu
                icon={Search}
                label="CONSULTAS"
                value="consultas"
              />

            </>
          )}

          {/* SEGURIDAD */}
          {rol === "SEGURIDAD" && (
            <>

              <ItemMenu
                icon={Search}
                label="CONSULTAS"
                value="consultas"
              />

              <ItemMenu
                icon={ShieldAlert}
                label="GESTIÓN"
                value="gestion"
              />

            </>
          )}

        </div>

        {/* FOOTER */}
        <div className="mt-auto p-5">

          {/* USUARIO */}
          <div
            className="
              bg-white/10
              rounded-2xl
              p-4
              mb-4
            "
          >

            <p
              className="
                text-sm
                text-white/60
              "
            >
              Usuario
            </p>

            <h3
              className="
                font-bold
                mt-1
              "
            >
              {usuario?.nombre ||
               "Usuario"}
            </h3>

            <p
              className="
                text-xs
                text-white/60
                mt-1
              "
            >
              {rol}
            </p>

          </div>

          {/* LOGOUT */}
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
