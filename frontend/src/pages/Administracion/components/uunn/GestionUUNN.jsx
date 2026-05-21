import { useEffect, useState } from "react";
import api from "../../../../api/axios";

export default function GestionUUNN() {

  // =========================
  // STATES
  // =========================
const [uunns, setUunns] = useState([]);

const [zonales, setZonales] = useState([]);
  const [uunnSeleccionada, setUunnSeleccionada] =
    useState("");

  const [zonalSeleccionada, setZonalSeleccionada] =
    useState("");

  // =========================
  // BUSCAR UUNN
  // =========================
  const uunnElegida = uunns.find(
    (u) =>
      u.nombre.toLowerCase() ===
      uunnSeleccionada.toLowerCase()
  );
useEffect(() => {

  obtenerUunn();

  obtenerZonales();

}, []);
const obtenerUunn = async () => {

  try {

    const response =
      await api.get("/unidades");

    setUunns(response.data);

  } catch (error) {

    console.log(error);

  }

};
const obtenerZonales = async () => {

  try {

    const response =
      await api.get("/zonales");

    setZonales(response.data);

  } catch (error) {

    console.log(error);

  }

};
// =========================
// GUARDAR / ASIGNAR
// =========================

const handleAsignar = async () => {

  try {

    if (
      !uunnSeleccionada ||
      !zonalSeleccionada
    ) {

      alert("Complete los campos");

      return;

    }

    /* ========================= */
    /* BUSCAR UUNN */
    /* ========================= */

    const uunnExistente =
      uunns.find(
        (u) =>
          u.nombre.toLowerCase() ===
          uunnSeleccionada.toLowerCase()
      );

    /* ===================================================== */
    /* SI NO EXISTE -> CREAR CON ZONAL DIRECTAMENTE */
    /* ===================================================== */

    if (!uunnExistente) {

      await api.post(
        "/unidades",
        {
          nombre:
            uunnSeleccionada.toUpperCase(),

          estado: "ACTIVO",

          zonalId:
            Number(zonalSeleccionada)
        }
      );

      alert(
        "Unidad creada y zonal asignada"
      );

      await obtenerUunn();

      setUunnSeleccionada("");

      setZonalSeleccionada("");

      return;

    }

    /* ========================= */
    /* VALIDAR SI YA TIENE */
    /* ========================= */

    const yaExiste =
      uunnExistente.zonales?.some(
        (z) =>
          z.zonalId ===
          Number(zonalSeleccionada)
      );

    if (yaExiste) {

      alert(
        "La UUNN ya tiene esa zonal"
      );

      return;

    }

    /* ========================= */
    /* BUSCAR ZONAL EN OTRA UUNN */
    /* ========================= */

    const uunnConZonal =
      uunns.find((u) =>
        u.zonales?.some(
          (z) =>
            z.zonalId ===
            Number(zonalSeleccionada)
        )
      );

    /* ========================= */
    /* ELIMINAR RELACION ANTERIOR */
    /* ========================= */

    if (uunnConZonal) {

      const relacion =
        uunnConZonal.zonales.find(
          (z) =>
            z.zonalId ===
            Number(zonalSeleccionada)
        );

      if (relacion) {

        await api.delete(
          `/unidad-zonal/${relacion.id}`
        );

      }

    }

    /* ========================= */
    /* ASIGNAR NUEVA RELACION */
    /* ========================= */

    await api.post(
      "/unidad-zonal",
      {
        unidadNegocioId:
          uunnExistente.id,

        zonalId:
          Number(zonalSeleccionada)
      }
    );

    alert(
      "Zonal reasignada correctamente"
    );

    await obtenerUunn();

    setUunnSeleccionada("");

    setZonalSeleccionada("");

  } catch (error) {

    console.log(error);

    alert(
      "Error al asignar"
    );

  }

};
const [uunnDetalle, setUunnDetalle] =
  useState(null);
  return (

    <div className="flex flex-col gap-8">

      {/* HEADER */}
      <div>

        <h1 className="text-4xl lg:text-5xl font-black italic text-[#0456b3]">
          UNIDAD DE NEGOCIO
        </h1>

        <p className="uppercase tracking-[5px] text-sm text-gray-400 font-bold mt-2">
          IPS SECURITY - USIL
        </p>

      </div>

      {/* FORMULARIO */}
      <div className="bg-white rounded-[35px] p-8 shadow-md">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* UUNN */}
          <div className="flex flex-col gap-2">

            <label className="font-black text-xs uppercase text-gray-400">
              1. Unidad de Negocio
            </label>

            <input
              list="lista-uunn"
              value={uunnSeleccionada}
              onChange={(e) =>
                setUunnSeleccionada(
                  e.target.value.toUpperCase()
                )
              }
              placeholder="Ej: PRONATEL"
              className="
                bg-gray-50
                border
                border-gray-200
                rounded-2xl
                px-5
                py-4
                font-bold
                outline-none
              "
            />

            <datalist id="lista-uunn">

              {uunns.map((uunn) => (

                <option
                  key={uunn.id}
                  value={uunn.nombre}
                />

              ))}

            </datalist>

          </div>

          {/* ZONAL */}
          <div className="flex flex-col gap-2">

            <label className="font-black text-xs uppercase text-gray-400">
              2. Asignar Zonal
            </label>

            <select
              value={zonalSeleccionada}
              onChange={(e) =>
                setZonalSeleccionada(
                  e.target.value
                )
              }
              className="
                bg-gray-50
                border
                border-gray-200
                rounded-2xl
                px-5
                py-4
                font-bold
                outline-none
              "
            >

              <option value="">
                SELECCIONAR ZONAL
              </option>

              {zonales.map((zonal) => (

                <option
                  key={zonal.id}
                  value={zonal.id}
                >
                  {zonal.nombre}
                </option>

              ))}

            </select>

          </div>

          {/* BOTON */}
          <div className="flex items-end">

            <button
              onClick={handleAsignar}
              className="
                w-full
                bg-[#345ccf]
                hover:bg-[#2647ad]
                text-white
                py-4
                rounded-2xl
                font-black
                transition-all
              "
            >
              GUARDAR / ASIGNAR
            </button>

          </div>

        </div>

      </div>

      {/* TABLA */}
      <div className="bg-white rounded-[35px] p-8 shadow-md overflow-x-auto">

        {/* CABECERA */}
        <div className="
          hidden
          lg:grid
          grid-cols-4
          gap-6
          text-xs
          uppercase
          font-black
          text-gray-400
          mb-6
          px-4
        ">

          <p>Unidad</p>
          <p>Zonales</p>
          <p>Estado</p>
          <p>Acción</p>

        </div>

        {/* ITEMS */}
        <div className="flex flex-col gap-4">

          {uunns.map((uunn) => {

           const nombresZonales =
                 uunn.zonales?.length > 0

                ? uunn.zonales
                  .map(
                    (z) =>
                      z.zonal?.nombre
                  )
                  .join(", ")

                : "NO TIENE";

            return (

              <div
                key={uunn.id}
                className="
                  grid
                  grid-cols-1
                  lg:grid-cols-4
                  gap-5
                  items-center
                  bg-gray-50
                  rounded-2xl
                  p-5
                "
              >

                <p className="font-black text-[#132238]">
                  {uunn.nombre}
                </p>

                <p className="font-bold text-gray-500">
                  {nombresZonales}
                </p>

                <span className="
                  bg-green-100
                  text-green-600
                  px-4
                  py-2
                  rounded-full
                  text-xs
                  font-black
                  w-fit
                ">
                  {uunn.estado}
                </span>

                <button
                onClick={() =>
                    setUunnDetalle(uunn)
                }
                className="
                    bg-[#0456b3]
                    hover:bg-[#034696]
                    text-white
                    px-5
                    py-3
                    rounded-2xl
                    font-black
                    w-fit
                "
                >
                VER
                </button>

              </div>

            );

          })}

        </div>

      </div>
{/* MODAL DETALLE */}
{uunnDetalle && (

  <div
    className="
      fixed
      inset-0
      bg-black/40
      backdrop-blur-sm
      flex
      items-center
      justify-center
      z-50
      p-5
    "
  >

    <div
      className="
        bg-white
        w-full
        max-w-4xl
        rounded-[35px]
        p-8
        relative
        max-h-[90vh]
        overflow-y-auto
      "
    >

      {/* CERRAR */}
      <button
        onClick={() =>
          setUunnDetalle(null)
        }
        className="
          absolute
          top-5
          right-6
          text-4xl
          text-gray-400
          hover:text-black
          transition-all
        "
      >
        ×
      </button>

      {/* HEADER */}
      <div className="mb-10">

        <p className="
          uppercase
          tracking-[4px]
          text-xs
          font-black
          text-gray-400
          mb-3
        ">
          Detalle Unidad de Negocio
        </p>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>

            <h2 className="
              text-4xl
              lg:text-5xl
              font-black
              italic
              text-[#0456b3]
            ">
              {uunnDetalle.nombre}
            </h2>

          </div>

          <span className="
            bg-green-100
            text-green-600
            px-6
            py-3
            rounded-full
            text-sm
            font-black
            w-fit
          ">
            {uunnDetalle.estado}
          </span>

        </div>

      </div>

      {/* ZONALES */}
      <div className="flex flex-col gap-6">

        {uunnDetalle.zonales.length > 0 ? (

          uunnDetalle.zonales.map((item) => {

            const zonal =
              item.zonal;

            if (!zonal) return null;

            return (

              <div
                key={zonal.id}
                className="
                  border
                  border-gray-200
                  rounded-[30px]
                  p-6
                  bg-gray-50
                "
              >

                {/* CABECERA ZONAL */}
                <div className="
                  flex
                  flex-col
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                  gap-4
                  mb-6
                ">

                  <div>

                    <p className="
                      text-xs
                      uppercase
                      text-gray-400
                      font-black
                      mb-2
                    ">
                      Zonal
                    </p>

                    <h3 className="
                      text-2xl
                      font-black
                      text-[#0456b3]
                    ">
                      {zonal.nombre}
                    </h3>

                  </div>

                  <div className="
                    bg-[#e8f0ff]
                    text-[#0456b3]
                    px-5
                    py-3
                    rounded-2xl
                    font-black
                    w-fit
                  ">
                    {zonal.sedes?.length || 0} SEDES
                  </div>

                </div>

                {/* SEDES */}
                <div>

                  <p className="
                    text-xs
                    uppercase
                    text-gray-400
                    font-black
                    mb-4
                  ">
                    Sedes Asignadas
                  </p>

                  <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-4
                  ">

                    {zonal.sedes?.map((sede) => (

                      <div
                        key={sede.id}
                        className="
                          bg-white
                          border
                          border-gray-200
                          rounded-2xl
                          p-5
                        "
                      >

                        <p className="
                          font-black
                          text-[#132238]
                          text-lg
                        ">
                          {sede.nombre}
                        </p>

                        <p className="
                          text-sm
                          text-gray-400
                          font-bold
                          mt-2
                        ">
                          SEDE OPERATIVA
                        </p>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            );

          })

        ) : (

          <div className="
            bg-gray-50
            rounded-3xl
            p-10
            text-center
          ">

            <p className="
              text-gray-400
              font-black
              text-lg
            ">
              NO HAY ZONALES ASIGNADAS
            </p>

          </div>

        )}

      </div>

    </div>

  </div>

)}
    </div>

  );

}