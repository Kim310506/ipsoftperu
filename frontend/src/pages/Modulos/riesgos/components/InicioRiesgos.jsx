import { useState, useEffect } from "react";
import api from "../../../../api/axios";
import {
  ShieldAlert,
  Plus,
  List,
  MapPin,
  ClipboardCheck,
  Settings,
} from "lucide-react";
import ModalPlanificarRiesgo from "./ModalPlanificarRiesgo";
import ModalEjecutarRiesgo from "./ModalEjecutarRiesgo";
import ModalValidarRiesgo from "./ModalValidarRiesgo";
import RegistrarRiesgos from "./RegistrarRiesgos";
export default function InicioRiesgos() {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [riesgos, setRiesgos] =
  useState([]);
  useEffect(() => {
  obtenerRiesgos();
}, []);
const [riesgoSeleccionado,
setRiesgoSeleccionado] =
useState(null);

const [openPlanificar,
setOpenPlanificar] =
useState(false);

const [openEjecutar,
setOpenEjecutar] =
useState(false);

const [openValidar,
setOpenValidar] =
useState(false);
const abrirPlanificar = (riesgo) => {
  setRiesgoSeleccionado(riesgo);
  setOpenPlanificar(true);
};
const usuarioStorage =
  localStorage.getItem("riesgosUser");

const usuario = usuarioStorage
  ? JSON.parse(usuarioStorage)
  : null;
const rol = usuario?.rol;
const abrirEjecutar = (riesgo) => {
  setRiesgoSeleccionado(riesgo);
  setOpenEjecutar(true);
};

const abrirValidar = (riesgo) => {
  setRiesgoSeleccionado(riesgo);
  setOpenValidar(true);
};
const obtenerRiesgos = async () => {
  try {

    const { data } =
      await api.get(
        "/riesgos/listar"
      );

    setRiesgos(data);

  } catch (error) {
    console.log(error);
  }
};

  const colorNivel = (nivel) => {
    if (nivel <= 2) return "#16a34a";
    if (nivel <= 4) return "#f59e0b";
    return "#dc2626";
  };
const esJefeSeguridad =
  rol?.includes(
    "JEFE DE SEGURIDAD"
  );

const esResponsableCategoria =
  rol?.includes(
    "RESPONSABLE DE CATEGORIA"
  );
  console.log(usuario);
console.log("ROL:", rol);
const botonAccion = {
  border: "none",
  borderRadius: "10px",
  padding: "10px 14px",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  minWidth: "120px",
  transition: "0.3s",
};
  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh", padding: 20 }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 20,
        flexWrap: "wrap",
        gap: 10
      }}>
        <div>
          <h2 style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShieldAlert size={22} />
            Registro de Riesgos
          </h2>
          <small style={{ color: "#6b7280" }}>
            Sistema de Gestión de Riesgos
          </small>
        </div>

<button
  onClick={() => setOpen(true)}
  style={{
    background:
      "linear-gradient(135deg,#dc2626,#b91c1c)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "12px 18px",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    boxShadow:
      "0 4px 15px rgba(220,38,38,.25)",
  }}
>
  <Plus size={18} />
  Registrar Riesgo
</button>
      <RegistrarRiesgos
        open={open}
        onClose={() => setOpen(false)}
        onSaved={() => {
          setOpen(false);
          obtenerRiesgos();
        }}
      />
      </div>

      {/* DESKTOP TABLE */}
      {!isMobile && (
        <div style={{ background: "white", borderRadius: 8, overflow: "hidden" }}>

          <div style={{
            padding: 12,
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 600
          }}>
            <List size={16} />
            Lista de Riesgos
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                <th style={th}>Estado</th>
                <th style={th}>Categoría</th>
                <th style={th}>Riesgo / Ubicación</th>
                <th style={th}>Prob.</th>
                <th style={th}>Imp.</th>
                <th style={th}>Nivel</th>
                <th style={th}>Acción</th>
              </tr>
            </thead>

            <tbody>
              {riesgos.map((r) => (
                <tr key={r.id} style={{ borderTop: "1px solid #eee" }}>

                  <td style={td}>
  {/* ESTADO */}
  <span
  style={{
    background:
      r.estado === "PENDIENTE"
        ? "#6b7280" // gris
        : r.estado === "EN PROCESO"
        ? "#2563eb" // azul
        : r.estado === "ATENDIDO"
        ? "#facc15" // amarillo
        : "#16a34a", // COMPLETADO verde

    color:
      r.estado === "ATENDIDO" ? "#000" : "#fff",

    padding: "3px 8px",
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600,
  }}
>
  {r.estado}
</span>

  {/* TRATAMIENTO */}
  {r.tratamientos?.length > 0 && (
    <div
      style={{
    marginTop: 6,
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 6,
    padding: "6px 8px",
    fontSize: 11,
    color: "#111827",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    display: "block",
    width: "fit-content",
    maxWidth: "180px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }}
    >
      <strong></strong>{" "}
      {r.tratamientos[0]?.tipoTratamiento}
    </div>
  )}
</td>

                  <td style={td}>{r.categoria}</td>

                  <td style={td}>
                    <div style={{ fontWeight: 600 }}>{r.riesgo}</div>
                    <div style={{ fontSize: 11, color: "#6b7280", display: "flex", gap: 4 }}>
                      <MapPin size={12} color="red" />
                      {r.sede?.nombre} - {r.pabellon?.nombre} - {r.piso?.nombre}
                    </div>
                  </td>

                  <td style={tdCenter}>{r.probabilidad}</td>
                  <td style={tdCenter}>{r.impacto}</td>

                  <td style={tdCenter}>
                    <span style={{
                      background: colorNivel(r.nivel),
                      color: "white",
                      padding: "3px 10px",
                      borderRadius: 5,
                      fontWeight: 700
                    }}>
                      {r.nivel}
                    </span>
                  </td>
                  <td style={tdCenter}>
                  {/* PENDIENTE */}
                  {r.estado === "PENDIENTE" && (
                    <>
                     {esJefeSeguridad ? (
                        <button
                          onClick={() =>
                            abrirPlanificar(r)
                          }
                          style={{
                            ...botonAccion,
                            background:
                              "linear-gradient(135deg,#2563eb,#1d4ed8)",
                          }}
                        >
                          Planificar
                        </button>
                      ) : (
                        <span
                          style={{
                            color: "#f59e0b",
                            fontWeight: 600,
                          }}
                        >
                          EN REVISIÓN
                        </span>
                      )}
                    </>
                  )}

                  {/* EN PROCESO */}

                  {r.estado === "EN PROCESO" && (
                    <>
                      {esResponsableCategoria ? (
                        <button
                          onClick={() =>
                            abrirEjecutar(r)
                          }
                          style={{
                            ...botonAccion,
                            background:
                              "linear-gradient(135deg,#f59e0b,#d97706)",
                          }}
                        >
                          Ejecutar
                        </button>
                      ) : (
                        <span
                          style={{
                            color: "#2563eb",
                            fontWeight: 600,
                          }}
                        >
                          EN EJECUCIÓN
                        </span>
                      )}
                    </>
                  )}

                  {/* ATENDIDO */}

                  {r.estado === "ATENDIDO" && (
                    <>
                      {esJefeSeguridad ? (
                        <button
                          onClick={() =>
                            abrirValidar(r)
                          }
                          style={{
                            ...botonAccion,
                            background:
                              "linear-gradient(135deg,#16a34a,#15803d)",
                          }}
                        >
                          Validar
                        </button>
                      ) : (
                        <span
                          style={{
                            color: "#f59e0b",
                            fontWeight: 600,
                          }}
                        >
                          POR VALIDAR
                        </span>
                      )}
                    </>
                  )}

                  {/* COMPLETADO */}

                  {r.estado === "COMPLETADO" && (
                    <span
                      style={{
                        color: "#16a34a",
                        fontWeight: 700,
                      }}
                    >
                      CERRADO
                    </span>
                  )}

                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MOBILE CARDS */}
     {isMobile && (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 16,
      marginTop: 10,
    }}
  >
    {riesgos.map((r) => (
      <div
        key={r.id}
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,.08)",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span
            style={{
              background: colorNivel(r.nivel),
              color: "#fff",
              padding: "4px 10px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            Nivel {r.nivel}
          </span>

          <span
  style={{
    background:
      r.estado === "PENDIENTE"
        ? "#6b7280" // gris
        : r.estado === "EN PROCESO"
        ? "#2563eb" // azul
        : r.estado === "ATENDIDO"
        ? "#facc15" // amarillo
        : "#16a34a", // COMPLETADO verde

    color:
      r.estado === "ATENDIDO" ? "#000" : "#fff",

    padding: "3px 8px",
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600,
  }}
>
  {r.estado}
</span>
        </div>

        {/* RIESGO */}
        <h4
          style={{
            margin: 0,
            marginBottom: 8,
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          {r.riesgo}
        </h4>

        {/* UBICACION */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: "#6b7280",
            fontSize: 13,
            marginBottom: 12,
          }}
        >
          <MapPin size={14} />
          {r.sede?.nombre} - {r.pabellon?.nombre} - {r.piso?.nombre}
        </div>

        {/* DATOS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 15,
          }}
        >
          <div>
            <strong>Probabilidad</strong>
            <div>{r.probabilidad}</div>
          </div>

          <div>
            <strong>Impacto</strong>
            <div>{r.impacto}</div>
          </div>
        </div>

        {/* BOTONES */}
        {r.estado === "PENDIENTE" && esJefeSeguridad && (
          <button
            onClick={() => abrirPlanificar(r)}
            style={{
              ...botonAccion,
              width: "100%",
              background:
                "linear-gradient(135deg,#2563eb,#1d4ed8)",
            }}
          >
            <ClipboardCheck size={16} />
            Planificar
          </button>
        )}

        {r.estado === "EN PROCESO" &&
          esResponsableCategoria && (
            <button
              onClick={() => abrirEjecutar(r)}
              style={{
                ...botonAccion,
                width: "100%",
                background:
                  "linear-gradient(135deg,#f59e0b,#d97706)",
              }}
            >
              <Settings size={16} />
              Ejecutar
            </button>
          )}

        {r.estado === "ATENDIDO" &&
          esJefeSeguridad && (
            <button
              onClick={() => abrirValidar(r)}
              style={{
                ...botonAccion,
                width: "100%",
                background:
                  "linear-gradient(135deg,#16a34a,#15803d)",
              }}
            >
              <ClipboardCheck size={16} />
              Validar
            </button>
          )}

        {r.estado === "COMPLETADO" && (
          <div
            style={{
              textAlign: "center",
              fontWeight: 700,
              color: "#16a34a",
            }}
          >
            ✓ Riesgo Cerrado
          </div>
        )}
      </div>
    ))}
  </div>
)}
       <ModalPlanificarRiesgo
  open={openPlanificar}
  onClose={() =>
    setOpenPlanificar(false)
  }
  riesgo={riesgoSeleccionado}
  onSaved={obtenerRiesgos}
/>

<ModalEjecutarRiesgo
  open={openEjecutar}
  onClose={() =>
    setOpenEjecutar(false)
  }
  riesgo={riesgoSeleccionado}
  onSaved={obtenerRiesgos}
/>

<ModalValidarRiesgo
  open={openValidar}
  onClose={() =>
    setOpenValidar(false)
  }
  riesgo={riesgoSeleccionado}
  onSaved={obtenerRiesgos}
/>
    </div>

  );
  
}

const th = {
  padding: 10,
  textAlign: "left",
  fontWeight: 700,
};

const td = {
  padding: 10,
};

const tdCenter = {
  padding: 10,
  textAlign: "center",
};