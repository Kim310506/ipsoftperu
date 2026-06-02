// src/pages/modulos/sismos/DashboardSismos.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SidebarSismos from "./components/SidebarSismos";

import InicioSismos from "./components/InicioSismos";
import ReportarSismo from "./components/ReportarSismo";
import DashboardSismo from "./components/DashboardSismos";

export default function DashboardSismos() {

  const navigate = useNavigate();

  const [menuActivo, setMenuActivo] =
    useState("inicio");

  const usuario = JSON.parse(
    localStorage.getItem("sismosUser") || "null"
  );

  const cerrarSesion = () => {

    localStorage.removeItem("sismosToken");
    localStorage.removeItem("sismosUser");

    navigate("/sismos/login");

  };

  return (

    <div className="min-h-screen bg-[#f5f7fb] flex">

      {/* SIDEBAR */}
      <SidebarSismos
        menuActivo={menuActivo}
        setMenuActivo={setMenuActivo}
        cerrarSesion={cerrarSesion}
      />

      {/* CONTENIDO */}
      <main className="flex-1 p-4 lg:p-8">

        {/* BARRA SUPERIOR */}
        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-4
            mb-6
            flex
            justify-end
            items-center
          "
        >
          <div className="text-sm text-gray-600">

            Bienvenido:
            {" "}
            <span className="font-semibold">
              {usuario?.nombre || usuario?.usuario}
            </span>

          </div>
        </div>

        {/* Sismos */}

        {menuActivo === "inicio" && (
          <InicioSismos usuario={usuario} />
        )}

        {menuActivo === "dashboard" && (
          <DashboardSismo />
        )}

      </main>

    </div>

  );

}