import { useState } from "react";
import api from "../../../../api/axios";

export default function ModalEjecutarRiesgo({
  open,
  onClose,
  riesgo,
  onSaved,
}) {

  const [comentario, setComentario] =
    useState("");

  const [evidencia, setEvidencia] =
    useState(null);

  if (!open || !riesgo)
    return null;

  const ejecutar = async () => {

    try {

      if (!comentario.trim()) {

        alert(
          "Ingrese un comentario de ejecución"
        );

        return;

      }

      const formData =
        new FormData();

      formData.append(
        "comentario",
        comentario
      );

      if (evidencia) {

        formData.append(
          "evidencia",
          evidencia
        );

      }

      await api.put(
        `/riesgos/ejecutar/${riesgo.id}`,
        formData
      );

      onSaved();
      onClose();

      setComentario("");
      setEvidencia(null);

    } catch (error) {

      console.log(error);

      alert(
        "Error al ejecutar la acción"
      );

    }

  };

return (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(15,23,42,.55)",
      backdropFilter: "blur(4px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      padding: 20,
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: 850,
        background: "#fff",
        borderRadius: 8,
        overflow: "hidden",
        boxShadow:
          "0 20px 40px rgba(0,0,0,.25)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#f5bc00",
          padding: "14px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 700,
          fontSize: 18,
          color: "#1f2937",
        }}
      >
        <span>
          🛠 Ejecutar Acción
        </span>

        <button
          onClick={onClose}
          style={{
            border: "none",
            background: "transparent",
            fontSize: 24,
            cursor: "pointer",
            color: "#444",
          }}
        >
          ×
        </button>
      </div>

      {/* BODY */}
      <div
        style={{
          padding: 18,
        }}
      >
        {/* DATOS */}
        <div
          style={{
            background: "#f3f4f6",
            borderLeft:
              "3px solid #3b82f6",
            borderRadius: 4,
            padding: 14,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              marginBottom: 10,
              color: "#374151",
            }}
          >
            ⓘ Datos del Riesgo a Tratar:
          </div>

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <div>
              <b>Riesgo:</b>{" "}
              {riesgo.riesgo}
            </div>

            <div>
              <b>Ubicación:</b>{" "}
              {riesgo.sede?.nombre}
              {" - "}
              {riesgo.pabellon?.nombre}
            </div>
          </div>

          <div
            style={{
              marginTop: 10,
            }}
          >
            <b>Hallazgo:</b>{" "}
            {riesgo.descripcion}
          </div>
        </div>

        {/* PLAN */}
        <div
          style={{
            marginTop: 12,
            background: "#f5e6b3",
            borderLeft:
              "3px solid #f5bc00",
            borderRadius: 4,
            padding: 14,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            ☑ Plan Asignado:
          </div>

          <div
            style={{
              fontWeight: 700,
              color: "#374151",
            }}
          >
            {
              riesgo.tratamientos?.[0]
                ?.planAccion
            }
          </div>
        </div>

        {/* COMENTARIO */}
        <div
          style={{
            marginTop: 16,
          }}
        >
          <label
            style={{
              display: "block",
              fontWeight: 600,
              marginBottom: 6,
              color: "#374151",
            }}
          >
            Comentario de Ejecución:
          </label>

          <textarea
            rows={4}
            value={comentario}
            onChange={(e) =>
              setComentario(
                e.target.value
              )
            }
            placeholder="Se instalaron las luces, se reparó la pared, etc..."
            style={{
              width: "100%",
              border:
                "1px solid #d1d5db",
              borderRadius: 4,
              padding: 12,
              resize: "none",
              outline: "none",
            }}
          />
        </div>

        {/* EVIDENCIA */}
        <div
          style={{
            marginTop: 16,
          }}
        >
          <label
            style={{
              display: "block",
              fontWeight: 600,
              marginBottom: 6,
              color: "#374151",
            }}
          >
            Evidencia de Cierre
            (Foto/PDF):
          </label>

          <input
            type="file"
            onChange={(e) =>
              setEvidencia(
                e.target.files?.[0] ||
                  null
              )
            }
            style={{
              width: "100%",
              border:
                "1px solid #d1d5db",
              borderRadius: 4,
              padding: 10,
            }}
          />
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          borderTop:
            "1px solid #e5e7eb",
          padding: 16,
          display: "flex",
          justifyContent:
            "flex-end",
        }}
      >
        <button
          onClick={ejecutar}
          style={{
            background: "#f5bc00",
            border: "none",
            color: "#111827",
            padding:
              "10px 18px",
            borderRadius: 4,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Enviar a Validación
          (JSEG)
        </button>
      </div>
    </div>
  </div>
);

}