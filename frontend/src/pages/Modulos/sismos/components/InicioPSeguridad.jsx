// InicioPSeguridad.jsx

import { useEffect, useState } from "react";
import api from "../../../../api/axios";
import {
  Activity,
  ShieldCheck,
  Building2,
  FileText,
  Power,
  PowerOff,
  AlertTriangle
} from "lucide-react";

export default function InicioPSeguridad() {
const [autorizaciones,
  setAutorizaciones] =
  useState([]);
  const [sedes, setSedes] = useState([]);
  const [alerta, setAlerta] = useState(null);
  const [alertaActiva, setAlertaActiva] = useState(null);

useEffect(() => {
  cargarDatos();
  cargarAutorizaciones();
  cargarAlerta();

  const interval = setInterval(() => {
    cargarAlerta();
  }, 5000);

  return () => clearInterval(interval);
}, []);
const [openAutorizar, setOpenAutorizar] =
  useState(false);

const [sedesAutorizables,
  setSedesAutorizables] =
  useState([]);

const [sedeSeleccionada,
  setSedeSeleccionada] =
  useState("");

const [plano, setPlano] =
  useState(null);
  const cargarDatos = async () => {
    try {

      const { data } = await api.get("/sismos/dashboard");

      setSedes(data.sedes || []);

      if (data.contactadas > 0) {
        setAlertaActiva({
          fecha: new Date().toLocaleDateString(),
          hora: new Date().toLocaleTimeString()
        });
      }

    } catch (error) {
      console.log(error);
    }
  };
const cargarAlerta = async () => {
  try {
    const { data } = await api.get("/sismos/alerta");

    setAlerta(data.activa); // 🔥 GLOBAL, sin filtro

  } catch (error) {
    console.log(error);
  }
};
const abrirModalAutorizar =
  async () => {

    try {

      const { data } =
        await api.get(
          "/sismos/sedes-autorizables"
        );

      setSedesAutorizables(data);

      setOpenAutorizar(true);

    } catch (error) {

      console.log(error);

    }

  };
  const cambiarEstado = async (id, estadoActual) => {

  try {

    const nuevoEstado =
      estadoActual
        ? "INACTIVO"
        : "ACTIVO";

    await api.put(
      `/sismos/autorizar/${id}`,
      {
        estado: nuevoEstado
      }
    );

    cargarAutorizaciones();

  } catch (error) {

    console.log(error);

  }

};
  const guardarAutorizacion =
  async () => {

    try {

      const formData =
        new FormData();

      formData.append(
        "sedeId",
        sedeSeleccionada
      );

      formData.append(
        "plano",
        plano
      );

      await api.post(
        "/sismos/autorizar",
        formData
      );

      setOpenAutorizar(false);

      setSedeSeleccionada("");

      setPlano(null);

      cargarDatos();

    } catch (error) {

      console.log(error);

    }

  };
const cargarAutorizaciones =
async () => {

  try {

    const { data } =
      await api.get(
        "/sismos/autorizaciones"
      );

    setAutorizaciones(data);

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

      {/* TABLA */}

      <div className="bg-white rounded-xl shadow-sm">

        <div className="border-b p-5 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <ShieldCheck
              className="text-blue-600"
            />

            <h2 className="font-bold text-xl text-blue-600">
              Autorización Sedes
            </h2>

          </div>

          <button
            onClick={abrirModalAutorizar}
            className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-4
                py-2
                rounded-lg
            "
            >
            + Autorizar
            </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-gray-50">

                <th className="p-3 text-left">
                  Sede
                </th>

                <th className="p-3 text-center">
                  Plano
                </th>

                <th className="p-3 text-center">
                  Estado
                </th>

                <th className="p-3 text-center">
                  Acción
                </th>

              </tr>

            </thead>

            <tbody>

              {autorizaciones.map((item) => (

                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="p-3">

                    <div className="flex items-center gap-3">

                      <Building2
                        size={18}
                        className="text-gray-500"
                      />

                      <span className="font-semibold">
                        {item.sede?.nombre}
                        </span>

                    </div>

                  </td>

                  <td className="text-center">

  {item.plano ? (

    <a
      href={`http://localhost:3000${item.plano}`}
      target="_blank"
      rel="noreferrer"
    >

      <FileText
        className="
          mx-auto
          text-red-500
          cursor-pointer
          hover:scale-110
          transition
        "
      />

    </a>

  ) : (

    <span className="text-gray-400">
      Sin PDF
    </span>

  )}

</td>

<td className="text-center">

  {item.estado === "ACTIVO" ? (

    <span
      className="
        bg-green-100
        text-green-700
        px-3
        py-1
        rounded-md
        text-xs
        font-bold
      "
    >
      ACTIVO
    </span>

  ) : (

    <span
      className="
        bg-gray-200
        text-gray-700
        px-3
        py-1
        rounded-md
        text-xs
        font-bold
      "
    >
      INACTIVO
    </span>

  )}

</td>

<td className="text-center">
<button
  onClick={() =>
    cambiarEstado(
      item.sedeId,
      item.estado === "ACTIVO"
    )
  }
  className={`
    inline-flex
    items-center
    gap-2
    px-4
    py-2
    rounded-md
    text-sm
    font-bold
    ${
      item.estado === "ACTIVO"
        ? "border border-red-500 text-red-500"
        : "border border-green-500 text-green-500"
    }
  `}
>

  {item.estado === "ACTIVO" ? (
    <>
      <PowerOff size={14} />
      OFF
    </>
  ) : (
    <>
      <Power size={14} />
      ON
    </>
  )}

</button>

</td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
{
  openAutorizar && (

    <div
      className="
        fixed inset-0
        bg-black/40
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          bg-white
          rounded-xl
          w-full
          max-w-md
          overflow-hidden
        "
      >

        <div
          className="
            bg-blue-600
            text-white
            p-4
            flex
            justify-between
            items-center
          "
        >

          <h3 className="font-bold">
            Autorizar Sede
          </h3>

          <button
            onClick={() =>
              setOpenAutorizar(false)
            }
          >
            ✕
          </button>

        </div>

        <div className="p-4 space-y-4">

          <div>

            <label className="font-semibold">
              Sede:
            </label>

            <select
              value={sedeSeleccionada}
              onChange={(e) =>
                setSedeSeleccionada(
                  e.target.value
                )
              }
              className="
                w-full
                border
                rounded
                p-2
                mt-1
              "
            >

              <option value="">
                Seleccione
              </option>

              {sedesAutorizables.map(
                (sede) => (

                  <option
                    key={sede.id}
                    value={sede.id}
                  >
                    {sede.nombre}
                  </option>

                )
              )}

            </select>

          </div>

          <div>

            <label className="font-semibold">
              Plano de Evacuación
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setPlano(
                  e.target.files[0]
                )
              }
              className="
                w-full
                border
                rounded
                p-2
                mt-1
              "
            />

          </div>

          <div className="flex justify-end">

            <button
              onClick={
                guardarAutorizacion
              }
              className="
                bg-blue-600
                text-white
                px-4
                py-2
                rounded
              "
            >
              Guardar
            </button>

          </div>

        </div>

      </div>

    </div>

  )
}
    </div>
  );
}