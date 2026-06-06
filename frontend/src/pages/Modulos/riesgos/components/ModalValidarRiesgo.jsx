import {
  CheckCircle,
  Info,
  X,
  Eye,
} from "lucide-react";

import api from "../../../../api/axios";

export default function ModalValidarRiesgo({
  open,
  onClose,
  riesgo,
  onSaved,
}) {

  if (!open || !riesgo)
    return null;

  const cerrar = async () => {

    try {

      await api.put(
        `/riesgos/completar/${riesgo.id}`
      );

      onSaved();
      onClose();

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Error al completar riesgo"
      );

    }

  };

  const verEvidencia = () => {

    if (
      !riesgo.evidenciaEjecucion
    )
      return;

    window.open(
      `http://localhost:3000/${riesgo.evidenciaEjecucion}`,
      "_blank"
    );

  };

  return (

    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "rgba(15,23,42,.55)",
        backdropFilter:
          "blur(5px)",
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >

      <div
        style={{
          width: "850px",
          maxWidth: "95%",
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow:
            "0 25px 60px rgba(0,0,0,.25)",
        }}
      >

        {/* HEADER */}

        <div
          style={{
            background:
              "#198754",
            color: "#fff",
            padding:
              "14px 20px",
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: 8,
            }}
          >
            <CheckCircle
              size={18}
            />

            <strong>
              Validar y Cerrar
              Riesgo
            </strong>
          </div>

          <X
            size={18}
            style={{
              cursor:
                "pointer",
            }}
            onClick={
              onClose
            }
          />
        </div>

        {/* BODY */}

        <div
          style={{
            padding: 16,
          }}
        >

          {/* DATOS */}

          <div
            style={{
              background:
                "#f3f4f6",
              borderLeft:
                "4px solid #3b82f6",
              padding: 15,
              borderRadius:
                "6px",
              marginBottom:
                "15px",
            }}
          >
            <div
              style={{
                fontWeight:
                  700,
                marginBottom:
                  10,
              }}
            >
              <Info
                size={14}
              />{" "}
              Datos del
              Riesgo:
            </div>

            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "space-between",
              }}
            >
              <div>
                <strong>
                  Riesgo:
                </strong>{" "}
                {
                  riesgo.riesgo
                }
              </div>

              <div>
                <strong>
                  Ubicación:
                </strong>{" "}
                {
                  riesgo
                    .sede
                    ?.nombre
                }
                {" - "}
                {
                  riesgo
                    .pabellon
                    ?.nombre
                }
              </div>
            </div>

            <div
              style={{
                marginTop:
                  10,
              }}
            >
              <strong>
                Hallazgo:
              </strong>{" "}
              {
                riesgo.descripcion
              }
            </div>
          </div>

          {/* RESUMEN */}

          <div
            style={{
              borderLeft:
                "4px solid #22c55e",
              background:
                "#fafafa",
              padding: 15,
              borderRadius:
                "6px",
              marginBottom:
                "15px",
            }}
          >
            <div
              style={{
                color:
                  "#2563eb",
                fontWeight:
                  700,
                marginBottom:
                  10,
              }}
            >
              Resumen de
              Atención
            </div>

            <p>
              <strong>
                Plan
                Original:
              </strong>{" "}
              {
                riesgo
                  .tratamientos?.[0]
                  ?.planAccion
              }
            </p>

            <p>
              <strong>
                Comentario
                Ejecución:
              </strong>{" "}
              {
                riesgo.comentarioEjecucion
              }
            </p>

            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap: 10,
              }}
            >
              <strong>
                Evidencia:
              </strong>

              {riesgo.evidenciaEjecucion && (
                <button
                  onClick={
                    verEvidencia
                  }
                  style={{
                    border:
                      "1px solid #2563eb",
                    background:
                      "#eff6ff",
                    color:
                      "#2563eb",
                    borderRadius:
                      "6px",
                    padding:
                      "5px 12px",
                    cursor:
                      "pointer",
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: 5,
                  }}
                >
                  <Eye
                    size={14}
                  />
                  Ver
                </button>
              )}
            </div>
          </div>

          {/* CONFIRMACION */}

          <div
            style={{
              background:
                "#d1fae5",
              border:
                "1px solid #86efac",
              color:
                "#065f46",
              padding: 12,
              borderRadius:
                "6px",
              fontWeight:
                500,
            }}
          >
            ¿Confirma el
            cierre definitivo
            del riesgo?
          </div>

        </div>

        {/* FOOTER */}

        <div
          style={{
            padding: 15,
            borderTop:
              "1px solid #e5e7eb",
            display: "flex",
            justifyContent:
              "flex-end",
          }}
        >
          <button
            onClick={cerrar}
            style={{
              background:
                "#198754",
              color: "#fff",
              border: "none",
              padding:
                "10px 18px",
              borderRadius:
                "6px",
              cursor:
                "pointer",
              fontWeight:
                600,
            }}
          >
            Validar y
            COMPLETAR
          </button>
        </div>

      </div>

    </div>

  );

}