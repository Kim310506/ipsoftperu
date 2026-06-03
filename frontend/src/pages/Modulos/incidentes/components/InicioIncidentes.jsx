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
  Legend
} from "recharts";

export default function InicioOcurrencias({ usuario }) {
  const user =
    typeof usuario === "string" ? JSON.parse(usuario) : usuario;

  /* ========================= */
  /* STATE */
  /* ========================= */
  const [dashboard, setDashboard] = useState({
    totalOcurrencias: 0,
    pendientes: 0,
    resueltas: 0,

    motivoData: [],
    sedeData: [],
    vinculoData: [],
    personasData: [],
  });

  /* ========================= */
  /* FETCH */
  /* ========================= */
  useEffect(() => {
    const cargarDashboard = async () => {
      try {
        const res = await api.get("/incidentes/dashboard");
        setDashboard(res.data);
      } catch (error) {
        console.log("Error dashboard ocurrencias:", error);
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
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[#244db7]">
          Dashboard de Ocurrencias
        </h1>

        <p className="text-gray-400 mt-2">
          Bienvenido {user?.nombre}
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-6">

  <div className="bg-white rounded-3xl p-6 shadow-sm">
    <h3 className="text-gray-500 font-semibold">Total</h3>
    <p className="text-4xl font-black text-[#244db7] mt-3">
      {dashboard.totalOcurrencias}
    </p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-sm">
    <h3 className="text-gray-500 font-semibold">Pendiente</h3>
    <p className="text-4xl font-black text-yellow-500 mt-3">
      <p>{dashboard.pendientes}</p>
    </p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-sm">
    <h3 className="text-gray-500 font-semibold">Reportado</h3>
    <p className="text-4xl font-black text-orange-500 mt-3">
      {dashboard.reportados}
    </p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-sm">
    <h3 className="text-gray-500 font-semibold">Solucionado</h3>
    <p className="text-4xl font-black text-green-500 mt-3">
      {dashboard.solucionados}
    </p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-sm">
    <h3 className="text-gray-500 font-semibold">Cerrado</h3>
    <p className="text-4xl font-black text-blue-500 mt-3">
      {dashboard.cerrados}
    </p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-sm">
    <h3 className="text-gray-500 font-semibold">Rechazado</h3>
    <p className="text-4xl font-black text-red-500 mt-3">
      {dashboard.rechazados}
    </p>
  </div>

</div>

      {/* GRAFICOS PIE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* MOTIVO */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-700 mb-5">
            Ocurrencias por Motivo
          </h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboard.motivoData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {dashboard.motivoData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconType="circle"
                  /> 
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SEDE */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-700 mb-5">
            Ocurrencias por Campus
          </h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboard.sedeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                >
                  {dashboard.sedeData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                 <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconType="circle"
                />  
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* VÍNCULO + PERSONAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* VINCULO */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-700 mb-5">
            Ocurrencias por Vínculo
          </h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboard.vinculoData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                >
                  {dashboard.vinculoData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconType="circle"
                  />  
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PERSONAS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-700 mb-5">
            Top Personas Involucradas
          </h2>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboard.personasData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />
                <YAxis />

                <Tooltip formatter={(value) => [`${value}`, "Ocurrencias"]} />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {dashboard.personasData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}