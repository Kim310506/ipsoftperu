// src/pages/modulos/incidentes/DashboardIncidentes.jsx

import { useState } from "react";

import {
  useNavigate,
  useSearchParams
} from "react-router-dom";

import SidebarIncidentes
from "./components/SidebarIncidentes";

import InicioIncidentes
from "./components/InicioIncidentes";

import OcurrenciasIncidentes
from "./components/OcurrenciasIncidentes";

import ReportesIncidentes
from "./components/ReporteIncidentes";
import DetalleOcurrencia from "./components/DetalleOcurrencia";

export default function DashboardIncidentes() {

  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const menuInicial =
    searchParams.get("menu") ||
    "inicio";

  const [menuActivo, setMenuActivo] =
    useState(menuInicial);
const [incidenteSeleccionado,
setIncidenteSeleccionado] =
useState(null);
  const usuario = JSON.parse(
    localStorage.getItem(
      "incidentesUser"
    ) || "null"
  );

  // CERRAR SESIÓN
  const cerrarSesion = () => {

    localStorage.removeItem(
      "incidentesToken"
    );

    localStorage.removeItem(
      "incidentesUser"
    );

    navigate("/incidentes/login");

  };

  return (

    <div
      className="
        min-h-screen
        bg-[#f5f7fb]
        flex
      "
    >

      {/* SIDEBAR */}
      <SidebarIncidentes
        menuActivo={menuActivo}
        setMenuActivo={setMenuActivo}
        cerrarSesion={cerrarSesion}
      />

      {/* CONTENIDO */}
      <main
        className="
          flex-1
          p-8
          overflow-y-auto
        "
      >
        
        {menuActivo === "inicio" && (

          <InicioIncidentes
            usuario={usuario}
          />

        )}

        {menuActivo === "ocurrencias" && (

          <OcurrenciasIncidentes />

        )}



        {menuActivo === "reportes" && (

          <ReportesIncidentes
            setMenuActivo={setMenuActivo}
            setIncidenteSeleccionado={
              setIncidenteSeleccionado
            }
          />

        )}
        {menuActivo === "detalle" && (

          <DetalleOcurrencia
            incidenteId={
              incidenteSeleccionado
            }
          />

        )}

      </main>

    </div>

  );

}

