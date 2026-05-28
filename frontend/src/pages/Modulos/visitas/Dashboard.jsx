// src/pages/modulos/visitas/DashboardVisitas.jsx

import { useState, useEffect } from "react";
import { useNavigate,useSearchParams  } from "react-router-dom";
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
  const [searchParams] = useSearchParams();

const menuInicial =
  searchParams.get("menu") || "inicio";

const [menuActivo, setMenuActivo] =
  useState(menuInicial);

  const usuario = JSON.parse(
    localStorage.getItem("visitasUser") || "null"
  );

  const cerrarSesion = () => {
    localStorage.removeItem("visitasToken");
    localStorage.removeItem("visitasUser");
    navigate("/visitas/login");
  };

  useEffect(() => {

    const cargarNotificaciones = async () => {

      try {

        const res = await api.get("/visitas");

        const ahora = new Date();
        const limite24h = new Date(
          ahora.getTime() + 24 * 60 * 60 * 1000
        );

        const filtradas = res.data.filter((v) => {

          // CANCELADAS O DESAUTORIZADAS
          const estadoEspecial =
            v.estado === "CANCELADO" ||
            v.estado === "DESAUTORIZADO";

          // VISITAS EN LAS PRÓXIMAS 24 HORAS
          let proximas24h = false;

          if (v.fechaInicio) {

            const fechaVisita = new Date(v.fechaInicio);

            proximas24h =
              fechaVisita >= ahora &&
              fechaVisita <= limite24h;

          }

          return estadoEspecial || proximas24h;

        });

        setNotificaciones(filtradas);

      } catch (err) {
        console.log(err);
      }

    };

    if (usuario?.rol === "SOLICITANTE DE ACCESO (SA)") {
      cargarNotificaciones();
    }

  }, []);

  // CERRAR NOTIFICACIÓN
  const cerrarNotificacion = (id) => {

    setNotificaciones((prev) =>
      prev.filter((n) => n.id !== id)
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

      {/* NOTIFICACIONES */}
      {usuario?.rol === "SOLICITANTE DE ACCESO (SA)" && (

        <div className="fixed top-6 right-6 z-50 space-y-3 w-80">

          {notificaciones.map((n) => {

            const esProxima =
              n.estado !== "CANCELADO" &&
              n.estado !== "DESAUTORIZADO";

            return (

              <div
                key={n.id}
                className={`
                  bg-white shadow-xl rounded-xl p-4
                  border-l-4 relative animate-fade-in
                  ${
                    esProxima
                      ? "border-blue-500"
                      : "border-red-500"
                  }
                `}
              >

                {/* BOTÓN CERRAR */}
                <button
                  onClick={() => cerrarNotificacion(n.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-600 text-lg"
                >
                  ✕
                </button>

                <div className="flex items-start gap-3">

                  <div className="text-2xl">
                    {esProxima ? "⏰" : "🚫"}
                  </div>

                  <div className="flex-1 pr-6">

                    <p className="font-semibold text-gray-800">
                      Visita {n.codigo}
                    </p>

                    <p className="text-sm text-gray-600">
                      Estado: <b>{n.estado}</b>
                    </p>

                    {esProxima ? (
                      <p className="text-xs text-blue-600 mt-1">
                        Esta visita inicia dentro de 24 horas
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">
                        Motivo:
                        {" "}
                        {n.motivoAccion || "Sin motivo"}
                      </p>
                    )}

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      )}

      {/* CONTENIDO */}
      <main className="flex-1 p-8">

        {menuActivo === "inicio" && (
          <InicioVisitas usuario={usuario} />
        )}

        {menuActivo === "consultas" && (
          <ConsultasVisitas />
        )}

        {menuActivo === "programar" && (
          <ProgramarVisitas />
        )}

        {menuActivo === "autorizar" && (
          <AutorizarVisitas />
        )}

        {menuActivo === "reportes" && (
          <ReportesVisitas />
        )}

      </main>

    </div>

  );

}