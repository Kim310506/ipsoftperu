import { useEffect, useState } from "react";
import api from "../../../../api/axios";

export default function ModalPlanificarRiesgo({
  open,
  onClose,
  riesgo,
  onSaved,
}) {

  const [tipoTratamiento, setTipoTratamiento] =
    useState("");

  const [planAccion, setPlanAccion] =
    useState("");

  const [responsableId, setResponsableId] =
    useState("");

  const [presupuesto, setPresupuesto] =
    useState(null);

  const [responsables, setResponsables] =
    useState([]);

  useEffect(() => {
    if (open) {
      obtenerResponsables();
    }
  }, [open]);

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

  if (!open || !riesgo)
    return null;

  const guardar = async () => {

    try {

      if (
        !tipoTratamiento ||
        !planAccion ||
        !responsableId
      ) {

        alert(
          "Complete todos los campos"
        );

        return;
      }

      const formData =
        new FormData();

      formData.append(
        "tipoTratamiento",
        tipoTratamiento
      );

      formData.append(
        "planAccion",
        planAccion
      );

      formData.append(
        "responsableId",
        responsableId
      );

      if (presupuesto) {

        formData.append(
          "presupuesto",
          presupuesto
        );

      }

      await api.put(
        `/riesgos/planificar/${riesgo.id}`,
        formData
      );

      onSaved();
      onClose();

    } catch (error) {

      console.log(error);

      alert(
        "Error al planificar riesgo"
      );

    }

  };

  return (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      backdropFilter: "blur(3px)",
    }}
  >
    <div
      style={{
        width: "900px",
        maxWidth: "95%",
        background: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 10px 40px rgba(0,0,0,.25)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#2563eb",
          color: "#fff",
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        <span>📋 Planificar Riesgo</span>

        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: 22,
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>

      <div
        style={{
          padding: 20,
        }}
      >
        {/* DATOS RIESGO */}
        <div
          style={{
            background: "#f3f4f6",
            borderLeft: "4px solid #2563eb",
            borderRadius: 6,
            padding: 15,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            ℹ️ Datos del Riesgo
          </div>

          <div
            style={{
              marginBottom: 8,
            }}
          >
            <small
              style={{
                color: "#6b7280",
              }}
            >
              Riesgo:
            </small>

            <div
              style={{
                fontWeight: 600,
              }}
            >
              {riesgo.riesgo}
            </div>
          </div>

          <div
            style={{
              marginBottom: 8,
            }}
          >
            <small
              style={{
                color: "#6b7280",
              }}
            >
              Ubicación:
            </small>

            <div>
              {riesgo.sede?.nombre} -{" "}
              {riesgo.pabellon?.nombre}
            </div>
          </div>

          <div>
            <small
              style={{
                color: "#6b7280",
              }}
            >
              Descripción:
            </small>

            <div
              style={{
                fontStyle: "italic",
              }}
            >
              {riesgo.descripcion}
            </div>
          </div>
        </div>

        {/* TRATAMIENTO */}
        <div
          style={{
            marginBottom: 18,
          }}
        >
          <label
            style={{
              fontWeight: 600,
              display: "block",
              marginBottom: 6,
            }}
          >
            Tratamiento
          </label>

          <select
            value={tipoTratamiento}
            onChange={(e) =>
              setTipoTratamiento(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 6,
              border: "1px solid #d1d5db",
            }}
          >
            <option value="">
              - Seleccione -
            </option>

            <option value="ASUMIR">
              ASUMIR
            </option>

            <option value="TRANSFERIR">
              TRANSFERIR
            </option>
          </select>
        </div>

        {/* PLAN */}
        <div
          style={{
            marginBottom: 18,
          }}
        >
          <label
            style={{
              fontWeight: 600,
              display: "block",
              marginBottom: 6,
            }}
          >
            Plan de Acción
          </label>

          <textarea
            rows={4}
            value={planAccion}
            onChange={(e) =>
              setPlanAccion(
                e.target.value
              )
            }
            style={{
              width: "100%",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              padding: 12,
              resize: "none",
            }}
          />
        </div>

        {/* RESPONSABLE + ARCHIVO */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: 15,
            marginBottom: 20,
          }}
        >
          <div>
            <label
              style={{
                fontWeight: 600,
                display: "block",
                marginBottom: 6,
              }}
            >
              Presupuesto (PDF/Excel)
            </label>

            <input
              type="file"
              onChange={(e) =>
                setPresupuesto(
                  e.target.files[0]
                )
              }
              style={{
                width: "100%",
              }}
            />
          </div>

          <div>
            <label
              style={{
                fontWeight: 600,
                display: "block",
                marginBottom: 6,
              }}
            >
              Responsable
            </label>

            <select
              value={responsableId}
              onChange={(e) =>
                setResponsableId(
                  e.target.value
                )
              }
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 6,
                border: "1px solid #d1d5db",
              }}
            >
              <option value="">
                Seleccione Responsable
              </option>

              {responsables.map(
                (r) => (
                  <option
                    key={r.id}
                    value={r.id}
                  >
                    {r.nombre}{" "}
                    {r.apellidoPaterno}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* BOTONES */}
        <div
          style={{
            display: "flex",
            justifyContent:
              "flex-end",
            gap: 10,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding:
                "10px 20px",
              borderRadius: 6,
              border:
                "1px solid #d1d5db",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>

          <button
            onClick={guardar}
            style={{
              background:
                "#2563eb",
              color: "#fff",
              border: "none",
              padding:
                "10px 20px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Guardar Plan
          </button>
        </div>
      </div>
    </div>
  </div>
);

}