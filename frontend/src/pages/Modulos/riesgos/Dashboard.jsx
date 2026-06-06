import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SidebarRiesgos from "./components/SidebarRiesgos";

import InicioRiesgos from "./components/InicioRiesgos";
import ResponsablesRiesgos from "./components/ResponsablesRiesgos";
import GraficoRiesgos from "./components/GraficoRiesgos";
import ReporteRiesgos from "./components/ReporteRiesgos";

export default function DashboardRiesgos() {

  const navigate = useNavigate();

  const [menuActivo, setMenuActivo] =
    useState("inicio");

  const usuario = JSON.parse(
    localStorage.getItem("riesgosUser") || "null"
  );

  const cerrarSesion = () => {

    localStorage.removeItem("riesgosToken");
    localStorage.removeItem("riesgosUser");

    navigate("/riesgos/login");

  };

  return (

    <div className="min-h-screen bg-[#f5f7fb] flex">

      <SidebarRiesgos
        menuActivo={menuActivo}
        setMenuActivo={setMenuActivo}
        cerrarSesion={cerrarSesion}
      />

      <main className="flex-1 p-4 lg:p-8">

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

        {menuActivo === "inicio" && (
          <InicioRiesgos usuario={usuario} />
        )}

        {menuActivo === "responsables" && (
          <ResponsablesRiesgos />
        )}

        {menuActivo === "grafico" && (
          <GraficoRiesgos />
        )}

        {menuActivo === "reporte" && (
          <ReporteRiesgos />
        )}

      </main>

    </div>

  );

}