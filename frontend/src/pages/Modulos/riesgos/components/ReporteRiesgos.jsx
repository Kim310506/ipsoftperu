import { useEffect, useState } from "react";
import api from "../../../../api/axios";

import {
  FileText,
  Filter,
  Printer,
  Search,
} from "lucide-react";

export default function ReporteRiesgos() {

  const [riesgos, setRiesgos] =
    useState([]);
const [sedes, setSedes] = useState([]);
const [pabellones, setPabellones] = useState([]);
const [pisos, setPisos] = useState([]);
const [filtros, setFiltros] =
  useState({
    desde: "",
    hasta: "",
    estado: "",
    sedeId: "",
    pabellonId: "",
    pisoId: "",
  });
  useEffect(() => {

  if (!filtros.sedeId) {
    setPabellones([]);
    return;
  }

  const sede = sedes.find(
    (s) => s.id === Number(filtros.sedeId)
  );

  setPabellones(
    sede?.pabellones || []
  );

}, [filtros.sedeId, sedes]);
useEffect(() => {

  if (!filtros.pabellonId) {
    setPisos([]);
    return;
  }

  api.get("/pisos").then(({ data }) => {

    const filtrados =
      data.filter(
        (p) =>
          p.pabellonId ===
          Number(filtros.pabellonId)
      );

    setPisos(filtrados);

  });

}, [filtros.pabellonId]);
  const obtenerCombos = async () => {
  try {

    const sedesRes =
      await api.get("/sedes");

    setSedes(sedesRes.data);

  } catch (error) {

    console.log(error);

  }
};

  const [isMobile, setIsMobile] =
    useState(false);

  useEffect(() => {

  obtenerRiesgos();
  obtenerCombos();

  const handleResize = () => {
    setIsMobile(
      window.innerWidth <= 768
    );
  };

  handleResize();

  window.addEventListener(
    "resize",
    handleResize
  );

  return () =>
    window.removeEventListener(
      "resize",
      handleResize
    );

}, []);

  const obtenerRiesgos =
    async () => {

      try {

       const res = await api.get(
          "/riesgos/reporte",
          {
            params: {
              desde: filtros.desde,
              hasta: filtros.hasta,
              estado: filtros.estado,
              sedeId: filtros.sedeId,
              pabellonId: filtros.pabellonId,
              pisoId: filtros.pisoId,
            },
          }
        );

        setRiesgos(res.data);

      } catch (error) {
        console.log(error);
      }

    };

  const colorNivel =
    (nivel) => {

      if (nivel <= 2)
        return "#198754";

      if (nivel <= 4)
        return "#f0ad4e";

      return "#dc3545";
    };

  const riesgosFiltrados =
    riesgos.filter((r) => {

      if (
        filtros.estado &&
        r.estado !== filtros.estado
      )
        return false;

      return true;
    });

  return (
    <div
      style={{
        background: "#f4f6f9",
        minHeight: "100vh",
        padding: 20,
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div>

          <h2
            style={{
              margin: 0,
              color: "#0d6efd",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FileText size={26} />
            Reporte General
          </h2>

          <small
            style={{
              color: "#6c757d",
            }}
          >
            Generación de informes
            filtrados
          </small>

        </div>

        <button
          onClick={() =>
            window.print()
          }
          style={{
            background: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: 5,
            padding:
              "10px 16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Printer size={16} />
          Guardar PDF /
          Imprimir
        </button>

      </div>

      {/* FILTROS */}

      <div
        style={{
          background: "#fff",
          borderRadius: 6,
          marginBottom: 20,
          overflow: "hidden",
          boxShadow:
            "0 1px 3px rgba(0,0,0,.1)",
        }}
      >

        <div
          style={{
            padding: 12,
            borderBottom:
              "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 600,
          }}
        >
          <Filter size={16} />
          Filtros de Búsqueda
        </div>

       <div
  style={{
    padding: 15,
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: 12,
  }}
>

  <div>
    <label>Desde</label>

    <input
      type="date"
      style={input}
      value={filtros.desde}
      onChange={(e) =>
        setFiltros({
          ...filtros,
          desde: e.target.value,
        })
      }
    />
  </div>

  <div>
    <label>Hasta</label>

    <input
      type="date"
      style={input}
      value={filtros.hasta}
      onChange={(e) =>
        setFiltros({
          ...filtros,
          hasta: e.target.value,
        })
      }
    />
  </div>

  <div>
    <label>Estado</label>

    <select
      style={input}
      value={filtros.estado}
      onChange={(e) =>
        setFiltros({
          ...filtros,
          estado: e.target.value,
        })
      }
    >
      <option value="">
        TODOS
      </option>

      <option value="PENDIENTE">
        PENDIENTE
      </option>

      <option value="EN PROCESO">
        EN PROCESO
      </option>

      <option value="MITIGADO">
        MITIGADO
      </option>

      <option value="CERRADO">
        CERRADO
      </option>
    </select>
  </div>

  <div>
    <label>Ubicación (Sede)</label>

    <select
  style={input}
  value={filtros.sedeId}
  onChange={(e) =>
  setFiltros({
    ...filtros,
    sedeId: e.target.value,
    pabellonId: "",
    pisoId: "",
  })
}
>
      <option value="">
        Todas
      </option>

      {sedes.map((s) => (
        <option
          key={s.id}
          value={s.id}
        >
          {s.nombre}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label>Pabellón</label>
<select
  style={input}
  disabled={
    !filtros.sedeId
  }
  value={
    filtros.pabellonId
  }

  onChange={(e) =>
  setFiltros({
    ...filtros,
    pabellonId: e.target.value,
    pisoId: "",
  })
}
>
      <option value="">
        Todos
      </option>

      {pabellones.map((p) => (
        <option
          key={p.id}
          value={p.id}
        >
          {p.nombre}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label>Piso</label>

    <select
  style={input}
  disabled={
    !filtros.pabellonId
  }
  value={filtros.pisoId}
      onChange={(e) =>
  setFiltros({
    ...filtros,
    pisoId: e.target.value,
  })
}
    >
      <option value="">
        Todos
      </option>

      {pisos.map((p) => (
        <option
          key={p.id}
          value={p.id}
        >
          {p.nombre}
        </option>
      ))}
    </select>
  </div>

  <div
    style={{
      display: "flex",
      alignItems: "flex-end",
    }}
  >
    <button
      onClick={obtenerRiesgos}
      style={{
        background: "#0d6efd",
        color: "#fff",
        border: "none",
        width: "100%",
        height: 38,
        borderRadius: 4,
        cursor: "pointer",
      }}
    >
      <Search size={15} />
      {" "}
      Filtrar
    </button>
  </div>

</div>

      </div>

      {/* MOBILE */}

      {isMobile && (

        <div
          style={{
            display: "flex",
            flexDirection:
              "column",
            gap: 12,
          }}
        >

          {riesgosFiltrados.map(
            (r) => (

              <div
                key={r.id}
                style={{
                  background:
                    "white",
                  borderRadius: 8,
                  padding: 12,
                  boxShadow:
                    "0 1px 4px rgba(0,0,0,.1)",
                }}
              >

                <strong
                  style={{
                    color:
                      "#0d6efd",
                  }}
                >
                  {r.riesgo}
                </strong>

                <div
                  style={{
                    marginTop: 5,
                  }}
                >
                  {r.sede?.nombre}
                </div>

                <div>
                  {r.pabellon?.nombre}
                </div>

                <div>
                  {r.piso?.nombre}
                </div>

                <div
                  style={{
                    marginTop: 10,
                  }}
                >
                  Nivel:
                  <span
                    style={{
                      marginLeft: 8,
                      background:
                        colorNivel(
                          r.nivel
                        ),
                      color:
                        "white",
                      padding:
                        "3px 8px",
                      borderRadius:
                        4,
                    }}
                  >
                    {r.nivel}
                  </span>
                </div>

                <div
                  style={{
                    marginTop: 10,
                  }}
                >
                  Estado:
                  {" "}
                  {r.estado}
                </div>

              </div>
            )
          )}

        </div>
      )}

      {/* DESKTOP */}

      {!isMobile && (

        <div
          style={{
            background:
              "white",
            borderRadius: 6,
            overflowX:
              "auto",
            boxShadow:
              "0 1px 3px rgba(0,0,0,.1)",
          }}
        >

          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
              fontSize: 13,
            }}
          >

            <thead>

              <tr
                style={{
                  background:
                    "#f8f9fa",
                }}
              >

                <th style={th}>
                  Fecha
                </th>

                <th style={th}>
                  Ubicación
                </th>

                <th style={th}>
                  Riesgo /
                  Hallazgo
                </th>

                <th style={th}>
                  Evidencia
                </th>

                <th style={th}>
                  Nivel
                </th>

                <th style={th}>
                  Estado
                </th>

                <th style={th}>
                  Plan / Cierre
                </th>

              </tr>

            </thead>

            <tbody>

              {riesgosFiltrados.map(
                (r) => (

                  <tr
                    key={r.id}
                  >

                    <td style={td}>
                      {new Date(
                        r.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td style={td}>
                      <strong>
                        {
                          r.sede
                            ?.nombre
                        }
                      </strong>

                      <br />

                      {
                        r.pabellon
                          ?.nombre
                      }

                      <br />

                      {
                        r.piso
                          ?.nombre
                      }
                    </td>

                    <td style={td}>
                      <div
                        style={{
                          color:
                            "#0d6efd",
                          fontWeight:
                            600,
                        }}
                      >
                        {r.riesgo}
                      </div>

                      <small>
                        {
                          r.descripcion
                        }
                      </small>
                    </td>

                    <td style={td}>

                      {r.foto && (

                        <img
                          src={`http://localhost:3000${r.foto}`}
                          alt=""
                          style={{
                            width: 90,
                            border:
                              "1px solid #ddd",
                          }}
                        />

                      )}

                    </td>

                    <td style={td}>

                      <span
                        style={{
                          background:
                            colorNivel(
                              r.nivel
                            ),
                          color:
                            "white",
                          padding:
                            "3px 8px",
                          borderRadius:
                            4,
                          fontWeight:
                            600,
                        }}
                      >
                        {r.nivel}
                      </span>

                    </td>

                    <td style={td}>
                      <span
                        style={{
                          background:
                            r.estado ===
                            "COMPLETADO"
                              ? "#198754"
                              : "#6c757d",
                          color:
                            "white",
                          padding:
                            "3px 8px",
                          borderRadius:
                            4,
                          fontSize:
                            12,
                        }}
                      >
                        {r.estado}
                      </span>
                    </td>

                    <td style={td}>

                      {r.tratamientos
                        ?.length >
                        0 && (
                        <>
                          <div>
                            <strong>
                              Plan:
                            </strong>
                            {" "}
                            {
                              r
                                .tratamientos[0]
                                .planAccion
                            }
                          </div>

                          <div
                            style={{
                              marginTop:
                                6,
                              color:
                                "#0d6efd",
                            }}
                          >
                            {
                              r
                                .responsable
                                ?.nombre
                            }
                          </div>
                        </>
                      )}

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

const input = {
  width: "100%",
  height: 38,
  border:
    "1px solid #ced4da",
  borderRadius: 4,
  padding: "0 10px",
};

const th = {
  padding: 12,
  border:
    "1px solid #dee2e6",
  textAlign: "left",
};

const td = {
  padding: 12,
  border:
    "1px solid #dee2e6",
  verticalAlign: "top",
};