import { useEffect, useState } from "react";

import api from "../../../../api/axios";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function InicioIncidentes({ usuario }) {

  const user =
    typeof usuario === "string"
      ? JSON.parse(usuario)
      : usuario;

  /* ========================= */
  /* STATES */
  /* ========================= */

  const [dashboard, setDashboard] = useState({
    totalVisitas: 0,
    pendientes: 0,
    aprobados: 0,
    estadoData: [],
    sedeData: [],
    motivosData: [],
  });

  /* ========================= */
  /* FETCH DASHBOARD */
  /* ========================= */

  useEffect(() => {

    const cargarDashboard = async () => {

      try {

        const res = await api.get(
          "/visitas/dashboard"
        );

        setDashboard(res.data);

      } catch (error) {

        console.log(
          "Error dashboard:",
          error
        );

      }

    };

    cargarDashboard();

  }, []);

  const COLORS = [
    "#10b981",
    "#f59e0b",
    "#6366f1",
    "#ec4899",
    "#3b82f6",
    "#ef4444",
  ];

  return (

    <main className="p-6 bg-[#f5f7fb] min-h-screen">

      {/* TITULO */}
      <div className="mb-8">

        <h1 className="text-4xl font-black text-[#244db7]">
          Dashboard de Visitas
        </h1>

        <p className="text-gray-400 mt-2">
          Bienvenido {user?.nombre}
        </p>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h3 className="text-gray-500 font-semibold">
            Total Visitas
          </h3>

          <p className="text-5xl font-black text-[#244db7] mt-3">
            {dashboard.totalVisitas}
          </p>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h3 className="text-gray-500 font-semibold">
            Pendientes
          </h3>

          <p className="text-5xl font-black text-yellow-500 mt-3">
            {dashboard.pendientes}
          </p>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h3 className="text-gray-500 font-semibold">
            Aprobados
          </h3>

          <p className="text-5xl font-black text-green-600 mt-3">
            {dashboard.aprobados}
          </p>

        </div>

      </div>

      {/* GRAFICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* ESTADO */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h2 className="font-bold text-gray-700 mb-5">
            Visitas por Estado
          </h2>

          <div className="h-[300px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={dashboard.estadoData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >

                  {dashboard.estadoData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index % COLORS.length
                          ]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* SEDES */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <h2 className="font-bold text-gray-700 mb-5">
            Distribución por Sede
          </h2>

          <div className="h-[300px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={dashboard.sedeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                >

                  {dashboard.sedeData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index % COLORS.length
                          ]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* BARRAS */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <h2 className="font-bold text-gray-700 mb-6">
          Top Motivos de Visita
        </h2>

        <div className="h-[400px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={dashboard.motivosData}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="motivo" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="cantidad"
                radius={[10, 10, 0, 0]}
              >

                {dashboard.motivosData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index % COLORS.length
                        ]
                      }
                    />
                  )
                )}

              </Bar>

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </main>

  );

}