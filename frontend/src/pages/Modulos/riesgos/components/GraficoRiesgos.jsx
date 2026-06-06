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
} from "recharts";

import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

export default function GraficoRiesgos() {

  const [data, setData] =
    useState(null);

  useEffect(() => {
    cargarGraficos();
  }, []);

  const cargarGraficos =
    async () => {

      try {

        const res =
          await api.get(
            "/riesgos/dashboard"
          );
setData({
  total: res.data.total,
  altos: res.data.altos,
  medios: res.data.medios,
  bajos: res.data.bajos,

  niveles: [
    {
      nivel: "ALTO",
      cantidad: res.data.altos,
    },
    {
      nivel: "MEDIO",
      cantidad: res.data.medios,
    },
    {
      nivel: "BAJO",
      cantidad: res.data.bajos,
    },
  ],

  categorias:
    res.data.porCategoria || [],

  estados:
    Object.entries(
      res.data.estados || {}
    ).map(
      ([estado, cantidad]) => ({
        estado,
        cantidad,
      })
    ),

  matriz:
    res.data.matriz || [],
});

      } catch (error) {

        console.log(error);

      }

    };

  if (!data)
    return <div>Cargando...</div>;

  const coloresNivel = [
    "#ef4444",
    "#facc15",
    "#22c55e",
  ];

  const coloresEstado = [
    "#94a3b8",
    "#3b82f6",
    "#f59e0b",
    "#22c55e",
  ];

  return (
    <div
      style={{
        padding: 20,
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          color: "#2563eb",
          marginBottom: 20,
        }}
      >
        Panel de Análisis de Riesgo
      </h2>

      {/* TARJETAS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: 15,
          marginBottom: 25,
        }}
      >
        <Card
          titulo="TOTAL RIESGOS"
          valor={data.total}
          icono={<ShieldCheck />}
        />

        <Card
          titulo="RIESGOS ALTOS"
          valor={data.altos}
          icono={<ShieldAlert />}
        />

        <Card
          titulo="RIESGOS MEDIOS"
          valor={data.medios}
          icono={<AlertTriangle />}
        />

        <Card
          titulo="RIESGOS BAJOS"
          valor={data.bajos}
          icono={<ShieldCheck />}
        />
      </div>

      {/* GRAFICOS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(350px,1fr))",
          gap: 20,
        }}
      >
        {/* NIVEL */}

        <div className="cardGrafico">
          <h4>
            Distribución por Nivel
          </h4>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>

              <Pie
                data={data.niveles}
                dataKey="cantidad"
                nameKey="nivel"
                outerRadius={100}
              >
                {data.niveles.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        coloresNivel[
                          index
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

        {/* CATEGORIA */}

        <div className="cardGrafico">
          <h4>
            Distribución por Categoría
          </h4>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart
              data={
                data.categorias
              }
            >
              <XAxis
                dataKey="categoria"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="cantidad"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ESTADO */}

        <div className="cardGrafico">
          <h4>
            Estado de Gestión
          </h4>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>

              <Pie
                data={data.estados}
                dataKey="cantidad"
                nameKey="estado"
                outerRadius={100}
              >
                {data.estados.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        coloresEstado[
                          index %
                            coloresEstado.length
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

      {/* MAPA DE CALOR */}

      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          marginTop: 25,
        }}
      >
        <h4>
          Mapa de Calor
        </h4>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3,120px)",
            gap: 3,
            justifyContent:
              "center",
          }}
        >
          {data.matriz.map(
            (item, index) => (
              <div
                key={index}
                style={{
                  height: 80,
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  color: "#fff",
                  fontWeight: 700,
                  borderRadius: 6,
                  background:
  item.probabilidad *
    item.impacto >= 6
    ? "#ef4444"
    : item.probabilidad *
          item.impacto >= 3
      ? "#facc15"
      : "#22c55e",
                }}
              >
                {item.cantidad}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function Card({
  titulo,
  valor,
  icono,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 20,
        display: "flex",
        gap: 15,
        alignItems: "center",
      }}
    >
      {icono}

      <div>
        <small>
          {titulo}
        </small>

        <h2
          style={{
            margin: 0,
          }}
        >
          {valor}
        </h2>
      </div>
    </div>
  );
}