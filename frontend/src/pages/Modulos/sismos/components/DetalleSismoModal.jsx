// src/pages/modulos/sismos/components/DetalleSismoModal.jsx

import { X } from "lucide-react";

export default function DetalleSismoModal({
  open,
  onClose,
  reporte
}) {
  if (!open || !reporte) return null;

  return (
    <div
      className="
        fixed inset-0
        bg-black/50
        flex items-center justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-xl
          w-full
          max-w-4xl
          max-h-[90vh]
          overflow-y-auto
          shadow-xl
        "
      >
        <div className="bg-white rounded-xl border-b border-slate-300 p-4 p-4 flex justify-between">

          <h2 className="text-xl font-bold">
            Detalle del Reporte
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="p-6 space-y-6">

          <div className="grid md:grid-cols-3 gap-4">

            <Info
              titulo="FECHA INCIDENTE"
              valor={`${new Date(
                reporte.fechaIncidente
              ).toLocaleDateString()} ${reporte.horaIncidente}`}
            />

            <Info
              titulo="RESPONSABLE"
              valor={reporte.responsable?.nombre}
            />

            <Info
              titulo="CONTACTO"
              valor="CONFIRMADO"
            />

          </div>

          <div className="rounded-xl p-4">

            <h3 className="font-bold text-blue-600 mb-4">
              Estado Operativo
            </h3>

            <div className="grid md:grid-cols-3 gap-4">

              <Info
                titulo="¿En Operación?"
                valor={
                  reporte.operacion
                    ? "SI"
                    : "NO"
                }
              />

              <Info
                titulo="¿Corte Energía?"
                valor={
                  reporte.corteEnergia
                    ? "SI"
                    : "NO"
                }
              />

              <Info
                titulo="¿Continuidad?"
                valor={
                  reporte.continuidad
                    ? "SI"
                    : "NO"
                }
              />

            </div>

          </div>

          <div className=" rounded-xl p-4">

            <h3 className="font-bold text-red-600 mb-4">
              Situación de Emergencia
            </h3>

            <div className="grid md:grid-cols-3 gap-4">

              <Info
                titulo="¿Evacuaron?"
                valor={
                  reporte.evacuaron
                    ? `SI (${reporte.tiempoEvacuacion || ""})`
                    : "NO"
                }
              />

              <Info
                titulo="¿Hay Daños?"
                valor={
                  reporte.danios
                    ? "SI"
                    : "NO"
                }
              />

              <Info
                titulo="¿Víctimas?"
                valor={
                  reporte.victimas
                    ? `SI (${reporte.cantidadVictimas})`
                    : "NO"
                }
              />

            </div>

          </div>

          <div className="bg-white rounded-2xl p-5">

  <h3 className="font-bold text-lg text-gray-800 mb-4">
    Evidencia Fotográfica
  </h3>

  {reporte.evidencias?.length > 0 ? (

    <div className="grid md:grid-cols-3 gap-5">

      {reporte.evidencias.map((foto, index) => {

        let etiqueta = "EVIDENCIA";

        if (
          reporte.evacuaron &&
          index === 0
        ) {
          etiqueta = "EVACUACIÓN";
        }

        if (
          reporte.danios &&
          (
            (reporte.evacuaron && index === 1) ||
            (!reporte.evacuaron && index === 0)
          )
        ) {
          etiqueta = "DAÑOS";
        }

        if (
          reporte.victimas &&
          (
            (reporte.evacuaron &&
              reporte.danios &&
              index === 2) ||

            (reporte.evacuaron &&
              !reporte.danios &&
              index === 1) ||

            (!reporte.evacuaron &&
              reporte.danios &&
              index === 1) ||

            (!reporte.evacuaron &&
              !reporte.danios &&
              index === 0)
          )
        ) {
          etiqueta = "VÍCTIMAS";
        }

        return (

          <div
            key={foto.id}
            className="
              overflow-hidden
              rounded-xl
            bg-gray-50
              shadow-sm
            "
          >

            <img
              src={`http://localhost:3000${foto.url}`}
              alt=""
              className="
                w-full
                h-56
                object-cover
              "
            />

            <div className="p-3">

              <span
                className={`
                  inline-block
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold

                  ${
                    etiqueta === "EVACUACIÓN"
                      ? "bg-blue-100 text-blue-700"
                      : etiqueta === "DAÑOS"
                      ? "bg-red-100 text-red-700"
                      : etiqueta === "VÍCTIMAS"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-700"
                  }
                `}
              >
                {etiqueta}
              </span>

            </div>

          </div>

        );

      })}

    </div>

  ) : (

    <div
      className="
        border-2
        border-dashed
        rounded-xl
        p-10
        text-center
        text-gray-400
      "
    >
      No se registraron fotografías.
    </div>

  )}

</div>

        </div>
      </div>
    </div>
  );
}

function Info({ titulo, valor }) {
  return (
    <div>
      <p className="text-xs text-gray-500">
        {titulo}
      </p>

      <p className="font-semibold">
        {valor || "-"}
      </p>
    </div>
  );
}