import { useEffect, useState } from "react";
import api from "../../../../api/axios";

import {
  Users,
  PlusCircle,
  List,
  Mail,
  Pencil,
  Ban,
} from "lucide-react";

import RegistrarResponsable from "./RegistrarResponsables";

export default function ResponsablesRiesgos() {
  const [responsables, setResponsables] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  useEffect(() => {
    obtenerResponsables();
  }, []);

  const obtenerResponsables = async () => {
    try {

      const { data } =
        await api.get(
          "/riesgos/responsables"
        );

      setResponsables(data);

    } catch (error) {
      console.log(error);
    }
  };
const editarResponsable = (r) => {
  console.log("Editar:", r);
  setOpen(true);
  // aquí luego conectas modal con datos
};
const cambiarEstado = async (id, estado) => {
  try {
    await api.put(`/riesgos/responsables/${id}/estado`, {
      estado,
    });

    obtenerResponsables();
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div
      style={{
        padding: 20,
        background: "#f5f6fa",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          flexWrap: "wrap",
          gap: 15,
          marginBottom: 20,
        }}
      >
        <div>
          <h2
            style={{
              color: "#2563eb",
              display: "flex",
              alignItems: "center",
              gap: 10,
              margin: 0,
            }}
          >
            <Users size={28} />

            Gestión de Responsables
          </h2>

          <small
            style={{
              color: "#6b7280",
            }}
          >
            Asignación de responsables
            por categoría
          </small>
        </div>

        <button
          onClick={() =>
            setOpen(true)
          }
          className="btn btn-primary"
        >
          <PlusCircle size={16} />
          {" "}Nuevo Responsable
        </button>
      </div>

      {/* TABLA */}

      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow:
            "0 2px 8px rgba(0,0,0,.08)",
        }}
      >
        <div
          style={{
            padding: 12,
            borderBottom:
              "1px solid #e5e7eb",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <List size={16} />
          Lista de Responsables
        </div>

        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background:
                    "#f8fafc",
                }}
              >
                <th style={th}>
                  Categoría
                </th>

                <th style={th}>
                  Responsable
                </th>

                <th style={th}>
                  Correo
                </th>

                <th style={th}>
                  Área
                </th>

                <th style={th}>
                  Estado
                </th>

                <th style={th}>
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {responsables.map(
                (r) => (
                  <tr
                    key={r.id}
                    style={{
                      borderTop:
                        "1px solid #eee",
                    }}
                  >
                    <td
                      style={td}
                    >
                      <span
                        style={{
                          color:
                            "#2563eb",
                          fontWeight:
                            700,
                        }}
                      >
                        {
                          r.categoria
                        }
                      </span>
                    </td>

                    <td
                      style={td}
                    >
                      <div
                        style={{
                          fontWeight:
                            700,
                        }}
                      >
                        {r.nombre}{" "}
                        {
                          r.apellidoPaterno
                        }
                      </div>

                      <div
                        style={{
                          color:
                            "#6b7280",
                          fontSize:
                            12,
                        }}
                      >
                        {
                          r.apellidoMaterno
                        }
                      </div>
                    </td>

                    <td
                      style={td}
                    >
                      <Mail
                        size={14}
                      />
                      {" "}
                      {r.correo}
                    </td>

                    <td
                      style={td}
                    >
                      <span
                        style={{
                          background:
                            "#6b7280",
                          color:
                            "#fff",
                          padding:
                            "3px 8px",
                          borderRadius:
                            4,
                          fontSize:
                            11,
                        }}
                      >
                        {r.area}
                      </span>
                    </td>

                    <td
                      style={td}
                    >
                      <span
                        style={{
                          background:
                            r.estado ===
                            "ACTIVO"
                              ? "#198754"
                              : "#dc3545",
                          color:
                            "#fff",
                          padding:
                            "3px 8px",
                          borderRadius:
                            4,
                          fontSize:
                            11,
                        }}
                      >
                        {r.estado}
                      </span>
                    </td>

                    <td style={td}>
  <div style={{ display: "flex", gap: 8 }}>

    {/* EDITAR */}
    <button
      onClick={() => editarResponsable(r)}
      style={{
        background: "#facc15",
        border: "none",
        padding: "6px 10px",
        borderRadius: 8,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 4,
        color: "#111",
        fontWeight: 600,
      }}
    >
      <Pencil size={14} />
    </button>

    {/* ACTIVAR / DESACTIVAR */}
    {r.estado === "ACTIVO" ? (
      <button
        onClick={() => cambiarEstado(r.id, "INACTIVO")}
        style={{
          background: "#dc2626",
          border: "none",
          padding: "6px 10px",
          borderRadius: 8,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 4,
          color: "#fff",
        }}
      >
        <Ban size={14} />
      </button>
    ) : (
      <button
        onClick={() => cambiarEstado(r.id, "ACTIVO")}
        style={{
          background: "#16a34a",
          border: "none",
          padding: "6px 10px",
          borderRadius: 8,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 4,
          color: "#fff",
        }}
      >
        ✔
      </button>
    )}

  </div>
</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      <RegistrarResponsable
        open={open}
        onClose={() =>
          setOpen(false)
        }
        onSaved={() => {
          setOpen(false);
          obtenerResponsables();
        }}
      />
    </div>
  );
}

const th = {
  padding: "12px",
  textAlign: "left",
  fontWeight: 700,
};

const td = {
  padding: "12px",
};