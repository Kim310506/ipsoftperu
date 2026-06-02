// src/pages/modulos/sismos/components/DashboardSismos.jsx

import { useEffect, useState } from "react";
import api from "../../../../api/axios";

import {
  Building2,
  PhoneCall,
  CheckCircle,
  Users,
  AlertTriangle,
  ShieldAlert,
  Zap,
  Image
} from "lucide-react";

export default function DashboardSismos() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    cargarDashboard();
  }, []);

  const cargarDashboard = async () => {
    try {

      const { data } = await api.get(
        "/sismos/dashboard"
      );

      setDashboard(data);

    } catch (error) {

      console.error(error);

    }
  };

  if (!dashboard) {
    return (
      <div className="bg-white rounded-xl p-6">
        Cargando dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <h2 className="text-3xl font-bold">
        DASHBOARD MÉTRICAS
      </h2>

      {/* TARJETAS */}

      <div className="grid md:grid-cols-4 gap-4">

        <Card
          titulo="TOTAL DE SEDES"
          valor={dashboard.totalSedes}
          color="bg-blue-100"
          icon={<Building2 />}
        />

        <Card
          titulo="SEDES CONTACTADAS"
          valor={dashboard.contactadas}
          color="bg-green-100"
          icon={<PhoneCall />}
        />

        <Card
          titulo="SEDES EN OPERACIÓN"
          valor={dashboard.operativas}
          color="bg-yellow-100"
          icon={<CheckCircle />}
        />

        <Card
          titulo="SEDES EVACUADAS"
          valor={dashboard.evacuadas}
          color="bg-orange-100"
          icon={<Users />}
        />

        <Card
          titulo="SEDES CON DAÑOS"
          valor={dashboard.danios}
          color="bg-red-100"
          icon={<AlertTriangle />}
        />

        <Card
          titulo="SEDES CON VÍCTIMAS"
          valor={dashboard.victimas}
          color="bg-purple-100"
          icon={<ShieldAlert />}
        />

        <Card
          titulo="SEDES SIN ENERGÍA"
          valor={dashboard.sinEnergia}
          color="bg-gray-100"
          icon={<Zap />}
        />

        <Card
          titulo="FOTOS SUBIDAS"
          valor={dashboard.fotos}
          color="bg-pink-100"
          icon={<Image />}
        />

      </div>

      {/* RESUMEN */}

      <div
        className="
          bg-blue-50
          rounded-xl
          p-4
        "
      >
        <h3 className="font-bold text-blue-700">
          Resumen del Incidente
        </h3>

        <p className="text-gray-700 mt-2">
          Se registraron{" "}
          <strong>
            {dashboard.contactadas}
          </strong>{" "}
          reportes.
          {" "}
          <strong>
            {dashboard.operativas}
          </strong>{" "}
          sedes continúan operando,
          {" "}
          <strong>
            {dashboard.evacuadas}
          </strong>{" "}
          fueron evacuadas,
          {" "}
          <strong>
            {dashboard.danios}
          </strong>{" "}
          presentan daños y
          {" "}
          <strong>
            {dashboard.sinEnergia}
          </strong>{" "}
          reportan corte de energía.
        </p>

      </div>
{/* ESTADO E IMPACTO */}

<div className="grid md:grid-cols-2 gap-4">

  <div className="bg-white rounded-xl  p-4">

    <h3 className="font-semibold mb-4">
      Estado de las Sedes
    </h3>

    <div className="grid grid-cols-3 text-center">

      <div>
        <div
          className="
            w-12 h-12
            mx-auto
            rounded-full
            bg-yellow-400
            flex
            items-center
            justify-center
            text-white
            font-bold
          "
        >
          !
        </div>

        <p className="mt-2 text-sm">
          Contactadas
        </p>
      </div>

      <div>
        <div
          className="
            w-12 h-12
            mx-auto
            rounded-full
            bg-yellow-400
            flex
            items-center
            justify-center
            text-white
            font-bold
          "
        >
          !
        </div>

        <p className="mt-2 text-sm">
          Operativas
        </p>
      </div>

      <div>
        <div
          className="
            w-12 h-12
            mx-auto
            rounded-full
            bg-yellow-400
            flex
            items-center
            justify-center
            text-white
            font-bold
          "
        >
          !
        </div>

        <p className="mt-2 text-sm">
          Evacuadas
        </p>
      </div>

    </div>

  </div>

  <div className="bg-white rounded-xl p-4">

    <h3 className="font-semibold mb-4">
      Impacto del Sismo
    </h3>

    <div className="grid grid-cols-3 text-center">

      <div>
        <div
          className="
            w-12 h-12
            mx-auto
            rounded-full
            bg-yellow-400
            flex
            items-center
            justify-center
            text-white
          "
        >
          <AlertTriangle size={20} />
        </div>

        <p className="mt-2 text-sm">
          Daños
        </p>
      </div>

      <div>
        <div
          className="
            w-12 h-12
            mx-auto
            rounded-full
            bg-green-500
            flex
            items-center
            justify-center
            text-white
          "
        >
          <ShieldAlert size={20} />
        </div>

        <p className="mt-2 text-sm">
          Víctimas
        </p>
      </div>

      <div>
        <div
          className="
            w-12 h-12
            mx-auto
            rounded-full
            bg-yellow-400
            flex
            items-center
            justify-center
            text-white
          "
        >
          <Zap size={20} />
        </div>

        <p className="mt-2 text-sm">
          Cortes
        </p>
      </div>

    </div>

  </div>

</div>
{/* INCIDENTES RECIENTES */}

<div className="bg-white rounded-xl  p-4">

  <h3 className="font-bold text-lg mb-4">
    Incidentes Recientes
  </h3>

  <table className="w-full text-sm">

    <thead>

      <tr className="bg-gray-50">

        <th className="text-left p-2">
          SEDE
        </th>

        <th className="p-2">
          REPORTADO
        </th>

        <th className="p-2">
          EVACUARON
        </th>

        <th className="p-2">
          DAÑOS
        </th>

        <th className="p-2">
          VÍCTIMAS
        </th>

        <th className="p-2">
          ENERGÍA
        </th>

      </tr>

    </thead>

    <tbody>

      {dashboard.ultimosReportes?.map(
        (item) => (

          <tr
            key={item.id}
            className="bg-white rounded-xl border-b border-slate-300 p-4"
          >

            <td className="p-2">

              <div className="font-semibold">
                {item.sede?.nombre}
              </div>

              <div className="text-xs text-gray-500">
                {item.responsable?.nombre}
              </div>

            </td>

            <td className="text-center">
              {item.operacion
                ? "SI"
                : "NO"}
            </td>

            <td className="text-center">
              {item.evacuaron
                ? "SI"
                : "NO"}
            </td>

            <td className="text-center">
              {item.danios
                ? "SI"
                : "NO"}
            </td>

            <td className="text-center">
              {item.victimas
                ? "SI"
                : "NO"}
            </td>

            <td className="text-center">
              {item.corteEnergia
                ? "SI"
                : "NO"}
            </td>

          </tr>

        )
      )}

    </tbody>

  </table>

</div>
    </div>
  );
}

function Card({
  titulo,
  valor,
  color,
  icon
}) {
  return (
    <div
      className={`
        ${color}
        rounded-xl
        p-5
        shadow-sm
      `}
    >
      <div className="flex justify-between items-center">

        <div>

          <h3 className="text-sm text-gray-600">
            {titulo}
          </h3>

          <p className="text-3xl font-bold">
            {valor}
          </p>

        </div>

        {icon}

      </div>
    </div>
  );
}