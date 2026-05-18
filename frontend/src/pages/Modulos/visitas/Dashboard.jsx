// src/pages/modulos/visitas/DashboardVisitas.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SidebarVisitas from "./components/SidebarVisitas";

import InicioVisitas from "./components/InicioVisitas";
import ConsultasVisitas from "./components/ConsultasVisitas";
import ProgramarVisitas from "./components/ProgramarVisitas";
import AutorizarVisitas from "./components/AutorizarVisitas";
import ReportesVisitas from "./components/ReportesVisitas";

export default function DashboardVisitas() {
  const navigate = useNavigate();

  const [menuActivo, setMenuActivo] = useState("inicio");

  const usuario = localStorage.getItem("visitasUser");

  const cerrarSesion = () => {
    localStorage.removeItem("visitasToken");
    localStorage.removeItem("visitasUser");

    navigate("/visitas/login");
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex">
      
      {/* SIDEBAR */}
      <SidebarVisitas
        menuActivo={menuActivo}
        setMenuActivo={setMenuActivo}
        cerrarSesion={cerrarSesion}
      />

      {/* CONTENIDO */}
      <main className="flex-1 p-8">

        {/* INICIO */}
        {menuActivo === "inicio" && (
          <InicioVisitas usuario={usuario} />
        )}

        {/* CONSULTAS */}
        {menuActivo === "consultas" && (
          <ConsultasVisitas />
        )}

        {/* PROGRAMAR */}
        {menuActivo === "programar" && (
          <ProgramarVisitas />
        )}

        {/* AUTORIZAR */}
        {menuActivo === "autorizar" && (
          <AutorizarVisitas />
        )}

        {/* REPORTES */}
        {menuActivo === "reportes" && (
          <ReportesVisitas />
        )}

      </main>
    </div>
  );
}