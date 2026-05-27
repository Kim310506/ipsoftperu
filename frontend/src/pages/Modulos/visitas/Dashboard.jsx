// src/pages/modulos/visitas/DashboardVisitas.jsx

import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import SidebarVisitas from "./components/SidebarVisitas";
import InicioVisitas from "./components/InicioVisitas";
import ConsultasVisitas from "./components/ConsultasVisitas";
import ProgramarVisitas from "./components/ProgramarVisitas";
import AutorizarVisitas from "./components/AutorizarVisitas";
import ReportesVisitas from "./components/ReportesVisitas";

export default function DashboardVisitas() {
  const navigate = useNavigate();
const [notificaciones, setNotificaciones] = useState([]);
  const [menuActivo, setMenuActivo] = useState("inicio");

const usuario = JSON.parse(localStorage.getItem("visitasUser") || "null");
  const cerrarSesion = () => {
    localStorage.removeItem("visitasToken");
    localStorage.removeItem("visitasUser");

    navigate("/visitas/login");
  };
useEffect(() => {
  const cargarNotificaciones = async () => {
    try {
      const res = await api.get("/visitas");

      const filtradas = res.data.filter(v =>
        v.estado === "CANCELADO" || v.estado === "DESAUTORIZADO"
      );

      setNotificaciones(filtradas);
    } catch (err) {
      console.log(err);
    }
  };

  if (usuario?.rol === "SOLICITANTE DE ACCESO (SA)") {
    cargarNotificaciones();
  }
}, [usuario]);
const cerrarNotificacion = (id) => {
  setNotificaciones(prev =>
    prev.filter(n => String(n.id) !== String(id))
  );
};
  return (
    <div className="min-h-screen bg-[#f5f7fb] flex">
      
      {/* SIDEBAR */}
      <SidebarVisitas
        menuActivo={menuActivo}
        setMenuActivo={setMenuActivo}
        cerrarSesion={cerrarSesion}
      />
{usuario?.rol === "SOLICITANTE DE ACCESO (SA)" && (
  <div className="fixed top-6 right-6 z-50 space-y-3 w-80">
    
    {notificaciones.map((n) => (
      <div
        key={n.id}
        className="bg-white shadow-xl rounded-xl p-4 border-l-4 border-red-500 relative animate-fade-in"
      >

        {/* BOTÓN CERRAR */}
        <button
          onClick={() => cerrarNotificacion(n.id)}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-600 text-lg"
        >
          ✕
        </button>

        <div className="flex items-start gap-3">

          <div className="text-2xl">🚫</div>

          <div className="flex-1 pr-6">
            <p className="font-semibold text-gray-800">
              Visita {n.codigo}
            </p>

            <p className="text-sm text-gray-600">
              Estado: <b>{n.estado}</b>
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Motivo: {n.motivoAccion || "Sin motivo"}
            </p>
          </div>

        </div>

      </div>
    ))}

  </div>
)}
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