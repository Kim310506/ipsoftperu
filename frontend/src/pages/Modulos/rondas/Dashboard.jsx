// src/pages/modulos/rondas/DashboardRondas.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SidebarRondas from "./components/SidebarRondas";

import InicioRondas from "./components/InicioRondas";
import EscanearQR from "./components/EscanearQR";
import QRAmbientes from "./components/QRAmbientes";
import ReportesRondas from "./components/ReportesRondas";

export default function DashboardRondas() {

  const navigate = useNavigate();

  const [menuActivo, setMenuActivo] = useState("inicio");

  const usuario = JSON.parse(
    localStorage.getItem("rondasUser") || "null"
  );

  const rol =
    usuario?.user?.rol || usuario?.rol || "";

  const cerrarSesion = () => {

    localStorage.removeItem("rondasToken");
    localStorage.removeItem("rondasUser");

    navigate("/rondas/login", {
      replace: true,
    });

  };

  return (
    <div className="min-h-screen flex bg-[#f5f7fb]">

      <SidebarRondas
        menuActivo={menuActivo}
        setMenuActivo={setMenuActivo}
        cerrarSesion={cerrarSesion}
        usuario={usuario}
      />

      <main className="flex-1 overflow-auto p-8">

        {menuActivo === "inicio" && (
          <InicioRondas usuario={usuario} />
        )}

        {menuActivo === "escanear" && (
          <EscanearQR usuario={usuario} />
        )}

        {/* Solo Jefe de Seguridad */}
        {rol === "JEFE DE SEGURIDAD" &&
          menuActivo === "qr" && (
            <QRAmbientes usuario={usuario} />
        )}

        {menuActivo === "reportes" && (
          <ReportesRondas usuario={usuario} />
        )}

      </main>

    </div>
  );

}