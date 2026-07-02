// src/pages/modulos/visitas/DashboardVisitas.jsx

import { useState, useEffect } from "react";
import { useNavigate,useSearchParams  } from "react-router-dom";
import api from "../../../api/axios";
import SidebarProveedores from "./components/SidebarProveedores";
import InicioProveedores from "./components/InicioProveedores";
import ConsultasProveedores from "./components/ConsultasProveedores";
import ProgramarProveedores from "./components/ProgramarProveedores";
import AutorizarProveedores from "./components/AutorizarProveedores";
import ReportesProveedores from "./components/ReportesProveedores";
import CalendarioProveedores from "./components/CalendarioContratas";

export default function DashboardProveedores() {

  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  const menuInicial =
    searchParams.get("menu") ||
    "inicio";

  const [menuActivo, setMenuActivo] =
    useState(menuInicial);

  const usuario = JSON.parse(
    localStorage.getItem(
      "inhouseUser"
    ) || "null"
  );

  const cerrarSesion = () => {

    localStorage.removeItem(
      "proveedoresToken"
    );

    localStorage.removeItem(
      "inhouseUser"
    );

    navigate("/proveedoresinhouse/login");

  };

  return (

    <div className="min-h-screen bg-[#f5f7fb] flex">

      <SidebarProveedores
        menuActivo={menuActivo}
        setMenuActivo={setMenuActivo}
        cerrarSesion={cerrarSesion}
      />

      <main className="flex-1 p-8">

        {menuActivo === "inicio" && (
          <InicioProveedores usuario={usuario} />
        )}

        {menuActivo === "consultas" && (
          <ConsultasProveedores />
        )}

        {menuActivo === "programar" && (
          <ProgramarProveedores />
        )}

        {menuActivo === "autorizar" && (
          <AutorizarProveedores />
        )}

        {menuActivo === "reportes" && (
          <ReportesProveedores />
        )}
{menuActivo === "calendario" && (
          <CalendarioProveedores />
        )}
      </main>

    </div>

  );

}