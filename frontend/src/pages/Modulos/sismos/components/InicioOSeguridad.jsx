import { useEffect, useState } from "react";
import api from "../../../../api/axios";
import {
  AlertTriangle,
  Radio
} from "lucide-react";

export default function InicioOSeguridad() {

  const [monitoreo, setMonitoreo] =
    useState([]);

  const [alertaActiva, setAlertaActiva] =
    useState(true);

  useEffect(() => {

    cargarMonitoreo();

    const interval =
      setInterval(
        cargarMonitoreo,
        5000
      );

    return () =>
      clearInterval(interval);

  }, []);

  const cargarMonitoreo =
    async () => {

      try {

        const { data } =
          await api.get(
            "/sismos/monitoreo"
          );

        setMonitoreo(data);

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="space-y-6">

      {/* ALERTA */}

      {alertaActiva && (

        <div
          className="
            bg-red-100
            border
            border-red-300
            rounded-xl
            p-5
            flex
            justify-between
            items-center
          "
        >

          <div>

            <h2
              className="
                text-3xl
                font-bold
                text-red-900
              "
            >
              ALERTA SÍSMICA ACTIVA
            </h2>

            <p className="text-red-700">

              Evento:
              {" "}
              Sismo Detectado

            </p>

          </div>

          <button
            onClick={() =>
              setAlertaActiva(false)
            }
            className="
              border
              border-black
              px-4
              py-2
              rounded
              bg-white
            "
          >
            Cerrar Evento
          </button>

        </div>

      )}

      {/* MONITOREO */}

      <div
        className="
          bg-white
          rounded-xl
          shadow-sm
          overflow-hidden
        "
      >

        <div
          className="
            flex
            justify-between
            items-center
            p-4
            border-b
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <Radio
              size={22}
              className="
                text-red-500
              "
            />

            <h2
              className="
                text-2xl
                font-bold
                text-red-500
              "
            >
              Monitoreo en Vivo (OSEG)
            </h2>

          </div>

          <button
            className="
              bg-red-400
              text-white
              px-4
              py-2
              rounded-lg
              font-semibold
            "
          >
            REPORTAR FALTANTE
          </button>

        </div>

        <table className="w-full">

          <thead>

            <tr
              className="
                bg-gray-100
                text-left
              "
            >

              <th className="p-3">
                Sede Requerida
              </th>

              <th className="p-3">
                Estado
              </th>

              <th className="p-3">
                Contacto
              </th>

              <th className="p-3">
                Detalles
              </th>

              <th className="p-3">
                Hora
              </th>

            </tr>

          </thead>

          <tbody>

            {monitoreo.map(
              (item) => (

                <tr
                  key={item.sedeId}
                  className={
                    item.estado ===
                    "PENDIENTE"
                      ? "bg-red-50"
                      : ""
                  }
                >

                  <td
                    className="
                      p-3
                      font-semibold
                    "
                  >
                    {item.sede}
                  </td>

                  <td className="p-3">

                    {item.estado ===
                    "REPORTADO" ? (

                      <span
                        className="
                          bg-green-600
                          text-white
                          px-3
                          py-1
                          rounded-md
                          text-xs
                          font-bold
                        "
                      >
                        REPORTADO
                      </span>

                    ) : (

                      <span
                        className="
                          bg-red-300
                          text-white
                          px-3
                          py-1
                          rounded-md
                          text-xs
                          font-bold
                        "
                      >
                        PENDIENTE
                      </span>

                    )}

                  </td>

                  <td className="p-3">
                    {item.contacto}
                  </td>

                  <td className="p-3">
                    {item.detalle}
                  </td>

                  <td className="p-3">
                    {item.hora}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}