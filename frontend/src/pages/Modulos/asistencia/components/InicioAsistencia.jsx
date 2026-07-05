import { useEffect, useState } from "react";
import api from "../../../../api/axios";

import {
  Clock3,
  CalendarDays,
  MapPinned,
  ScanFace,
} from "lucide-react";

export default function InicioAsistencia() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const cargarDashboard = async () => {
    try {
      setLoading(true);

      const res = await api.get("/asistencia/dashboard");

      setData(res.data.data);

    } catch (error) {
      console.error("ERROR DASHBOARD:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDashboard();
  }, []);

  return (
    <div className="space-y-8">

      {/* BIENVENIDA */}
      <div className="bg-white rounded-3xl shadow p-8">

        <h1 className="text-3xl font-black text-gray-800">
          Dashboard General de Asistencia
        </h1>

        <p className="text-gray-500 mt-2">
          Control global de todos los registros del sistema
        </p>

      </div>

      {/* RESUMEN GLOBAL */}
      <div className="grid lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-3xl shadow p-6">
          <Clock3 size={40} className="text-[#244db7]" />

          <h2 className="text-3xl font-black mt-4">
            {loading ? "--:--" : data?.ultimaAsistencia || "--:--"}
            </h2>
            <p className="text-gray-500">Último registro global</p>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <CalendarDays size={40} className="text-green-600" />

          <h2 className="text-3xl font-black mt-4">
            {loading ? "0" : data?.asistenciasMes || 0}
            </h2>
            <p className="text-gray-500">Asistencias del mes</p>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <MapPinned size={40} className="text-red-500" />

          <h2 className="text-xl font-black mt-4">
            {data?.sedeMasActiva || "Sin datos"}
            </h2>
            <p className="text-gray-500">Sede más activa</p>
                    </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <ScanFace size={40} className="text-purple-600" />

          <h2 className="text-xl font-black mt-4">
        {data?.estadoGeneral || "Operativo"}
        </h2>
        <p className="text-gray-500">Estado del sistema</p>
        </div>

      </div>

      {/* DETALLE GLOBAL */}
      <div className="bg-white rounded-3xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">
          Resumen del día (Global)
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">

         <div className="bg-white rounded-3xl shadow p-6 border-l-4 border-green-500">
    <p className="text-gray-500 font-medium">Entradas hoy</p>

    <p className="text-3xl font-black text-green-600 mt-2">
      {data?.entradasHoy ?? 0}
    </p>
  </div>

  {/* SALIDAS */}
  <div className="bg-white rounded-3xl shadow p-6 border-l-4 border-red-500">
    <p className="text-gray-500 font-medium">Salidas hoy</p>

    <p className="text-3xl font-black text-red-600 mt-2">
      {data?.salidasHoy ?? 0}
    </p>
  </div>

  {/* USUARIOS ACTIVOS */}
  <div className="bg-white rounded-3xl shadow p-6 border-l-4 border-blue-500">
    <p className="text-gray-500 font-medium">Usuarios activos</p>

    <p className="text-3xl font-black text-blue-600 mt-2">
      {data?.usuariosActivos ?? 0}
    </p>
  </div>

          <div>
            <p className="font-semibold">Estado sistema</p>

            <span className="inline-block mt-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
              Operativo
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}