import { useState, useEffect } from "react";
import {
  ShieldAlert,
  Plus,
  List,
  MapPin,
  ClipboardCheck,
  Settings,
} from "lucide-react";
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

  const riesgos = [
    {
      id: 1,
      estado: "EN PROCESO",
      tratamiento: "MITIGAR",
      categoria: "FÍSICA",
      riesgo: "Falta luces de emergencia",
      ubicacion: "Arequipa - Pabellón A - Piso 1",
      probabilidad: 1,
      impacto: 2,
      nivel: 2,
      accion: "EJECUCION",
    },
    {
      id: 2,
      estado: "PENDIENTE",
      categoria: "TECNOLÓGICA",
      riesgo: "Vulneración de perímetro",
      ubicacion: "Arequipa - Pabellón B - Piso 2",
      probabilidad: 2,
      impacto: 2,
      nivel: 4,
      accion: "PLANIFICAR",
    },
  ];

  const colorNivel = (nivel) => {
    if (nivel <= 2) return "#16a34a";
    if (nivel <= 4) return "#f59e0b";
    return "#dc2626";
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

        <button onClick={() => setOpen(true)}>
        Registrar Riesgo
      </button>

      <RegistrarRiesgos
        open={open}
        onClose={() => setOpen(false)}
        onSaved={() => {
          setOpen(false);
          // recargar tabla si quieres
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
                    <span style={{
                      background: r.estado === "EN PROCESO" ? "#2563eb" : "#6b7280",
                      color: "white",
                      padding: "3px 8px",
                      borderRadius: 4,
                      fontSize: 11
                    }}>
                      {r.estado}
                    </span>
                  </td>

                  <td style={td}>{r.categoria}</td>

                  <td style={td}>
                    <div style={{ fontWeight: 600 }}>{r.riesgo}</div>
                    <div style={{ fontSize: 11, color: "#6b7280", display: "flex", gap: 4 }}>
                      <MapPin size={12} color="red" />
                      {r.ubicacion}
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
                    {r.accion === "PLANIFICAR" ? (
                      <button style={{
                        border: "1px solid #2563eb",
                        color: "#2563eb",
                        background: "white",
                        padding: "4px 8px",
                        borderRadius: 4,
                        display: "flex",
                        alignItems: "center",
                        gap: 4
                      }}>
                        <ClipboardCheck size={14} />
                        Planificar
                      </button>
                    ) : (
                      <span style={{ color: "#6b7280", fontSize: 11 }}>
                        <Settings size={12} /> Ejecución
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
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {riesgos.map((r) => (
            <div
              key={r.id}
              style={{
                background: "white",
                borderRadius: 10,
                padding: 12,
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{r.riesgo}</strong>

                <span style={{
                  background: r.estado === "EN PROCESO" ? "#2563eb" : "#6b7280",
                  color: "white",
                  fontSize: 10,
                  padding: "2px 6px",
                  borderRadius: 4
                }}>
                  {r.estado}
                </span>
              </div>

              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 5 }}>
                <MapPin size={12} /> {r.ubicacion}
              </div>

              <div style={{ marginTop: 8, fontSize: 13 }}>
                <div>Categoría: {r.categoria}</div>
                <div>Prob: {r.probabilidad} | Imp: {r.impacto}</div>

                <div style={{ marginTop: 6 }}>
                  Nivel:{" "}
                  <span style={{
                    background: colorNivel(r.nivel),
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: 4
                  }}>
                    {r.nivel}
                  </span>
                </div>
              </div>

              <div style={{ marginTop: 10 }}>
                {r.accion === "PLANIFICAR" ? (
                  <button style={{
                    width: "100%",
                    border: "1px solid #2563eb",
                    color: "#2563eb",
                    background: "white",
                    padding: "6px",
                    borderRadius: 6
                  }}>
                    <ClipboardCheck size={14} /> Planificar
                  </button>
                ) : (
                  <span style={{ color: "#6b7280", fontSize: 12 }}>
                    <Settings size={12} /> En ejecución
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

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