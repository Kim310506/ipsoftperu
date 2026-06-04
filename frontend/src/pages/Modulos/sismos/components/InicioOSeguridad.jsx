import { useEffect, useState } from "react";
import api from "../../../../api/axios";
import {
  Activity,
  AlertTriangle,
  Radio
} from "lucide-react";
import ReportarFaltanteModal from "./ReportarFaltanteModal";
export default function InicioOSeguridad() {

  const [monitoreo, setMonitoreo] =
    useState([]);
const [alerta, setAlerta] = useState(null);
const alertaActiva = alerta;

  useEffect(() => {

  cargarMonitoreo();
  cargarAlerta();

  const interval =
    setInterval(() => {

      cargarMonitoreo();
      cargarAlerta();

    }, 5000);

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
    const monitoreoVisible = monitoreo.filter(
  (item) => item.estado !== "CERRADO"
);
    const cargarAlerta = async () => {
  try {

    const { data } =
      await api.get("/sismos/alerta");

    setAlerta(data.activa);

  } catch (error) {

    console.log(error);

  }
};
const cerrarEvento = async () => {
  try {

    await api.patch("/sismos/cerrar-evento");
    await cargarAlerta();
    setAlerta(false);

    cargarMonitoreo();
    cargarAlerta();

  } catch (error) {

    console.log(error);

  }
};
const [openFaltante, setOpenFaltante] =
  useState(false);

const [sedesFaltantes,
  setSedesFaltantes] =
  useState([]);

const [sedeSeleccionada,
  setSedeSeleccionada] =
  useState("");
  const abrirModalFaltante =
  async () => {

    try {

      const { data } =
        await api.get(
          "/sismos/sedes-faltantes"
        );

      setSedesFaltantes(data);

      setOpenFaltante(true);

    } catch (error) {

      console.log(error);

    }

  };
  return (

    <div className="space-y-6">

      {/* ALERTA */}

             <div
  className="
    bg-white
    rounded-2xl
    shadow-sm
    p-6
  "
>
  <div className="flex items-center gap-3">

{alerta ? (
      <Activity
        className="text-red-500"
        size={30}
      />
    ) : (
      <Activity
        className="text-green-500"
        size={30}
      />
    )}

    <div>

      {alerta ? (
  <>
    <h2 className="font-bold text-xl text-red-600">
      ALERTA SÍSMICA ACTIVA
    </h2>

    <p className="text-gray-500">
      {alerta.reporte ? (
        <>
          Evento sísmico detectado el{" "}
          {new Date(alerta.reporte.fechaReporte).toLocaleDateString("es-PE")}{" "}
          {alerta.reporte.horaReporte}
        </>
      ) : (
        "Evento sísmico detectado"
      )}
    </p>
  </>
) : (
  <>
    <h2 className="font-bold text-xl">
      Sin Actividad
    </h2>

    <p className="text-gray-500">
      Sistema en espera.
    </p>
  </>
)}

    </div>

  </div>
</div>
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
          onClick={abrirModalFaltante}
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

            {monitoreoVisible.map(
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

  {item.estado === "REPORTADO" ? (

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
<ReportarFaltanteModal
  open={openFaltante}
  onClose={() =>
    setOpenFaltante(false)
  }
  sedes={sedesFaltantes}
/>
    </div>

  );

}