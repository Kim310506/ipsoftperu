// src/pages/modulos/llaves/DashboardLlaves.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SidebarLlaves from "./components/SidebarLlaves";

import InicioLlaves from "./components/InicioLlaves";
import GestionLlaveros from "./components/GestionLlaveros";
import PrestamoLlaves from "./components/PrestamoLlaves";
import ReportesLlaves from "./components/ReportesLlaves";

export default function DashboardLlaves() {

  const navigate = useNavigate();

  const [menuActivo, setMenuActivo] =
    useState("inicio");

  const usuario = JSON.parse(
    localStorage.getItem("llavesUser")
    || "null"
  );

  const cerrarSesion = () => {

    localStorage.removeItem(
      "llavesToken"
    );

    localStorage.removeItem(
      "llavesUser"
    );

    navigate("/llaves/login");

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
      <SidebarLlaves
        menuActivo={menuActivo}
        setMenuActivo={setMenuActivo}
        cerrarSesion={cerrarSesion}
      />

      {/* CONTENIDO */}
      <main
        className="
        flex-1
        p-8
        overflow-auto
        "
      >

        {menuActivo ===
          "inicio" && (
          <InicioLlaves
            usuario={usuario}
          />
        )}

        {menuActivo ===
          "llaveros" && (
          <GestionLlaveros />
        )}

        {menuActivo ===
          "prestamos" && (
          <PrestamoLlaves />
        )}

        {menuActivo ===
          "reportes" && (
          <ReportesLlaves />
        )}

      </main>

    </div>

  );

}