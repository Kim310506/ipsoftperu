import { useEffect, useState } from "react";
import api from "../../../../api/axios";

export default function CrearUbicacion({
  setVistaInfra,
  zonales
}) {

  const [formZonal, setFormZonal] = useState("");
  const [formSede, setFormSede] = useState("");
  const [formPabellon, setFormPabellon] = useState("");
  const [formPiso, setFormPiso] = useState("");
  const [nuevoAmbiente, setNuevoAmbiente] = useState("");

  /* ========================= */
  /* UUNN */
  /* ========================= */

  const [uunn, setUunn] = useState([]);
  const [formUunn, setFormUunn] = useState("");

  useEffect(() => {

    obtenerUunn();

  }, []);

  const obtenerUunn = async () => {

    try {

      const response = await api.get("/unidades");

      setUunn(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  /* ========================= */
  /* BUSQUEDAS */
  /* ========================= */

  const zonalElegida = zonales.find(
    (z) =>
      z.nombre.toLowerCase() ===
      formZonal.toLowerCase()
  );

  const sedesDisponibles =
    zonalElegida?.sedes || [];

  const sedeElegida =
    sedesDisponibles.find(
      (s) =>
        s.nombre.toLowerCase() ===
        formSede.toLowerCase()
    );

  const pabellonesDisponibles =
    sedeElegida?.pabellones || [];

  const pabellonElegido =
    pabellonesDisponibles.find(
      (p) =>
        p.nombre.toLowerCase() ===
        formPabellon.toLowerCase()
    );

  const pisosDisponibles =
    pabellonElegido?.pisos || [];

  const pisoElegido =
    pisosDisponibles.find(
      (p) =>
        p.nombre.toLowerCase() ===
        formPiso.toLowerCase()
    );
/* ========================= */
/* UUNN DE LA ZONAL */
/* ========================= */

const unidadAsignada =
  zonalElegida?.unidades?.[0];
  /* ========================= */
  /* CAMBIOS */
  /* ========================= */

  const handleZonalChange = (val) => {

    setFormZonal(val.toUpperCase());
    setFormSede("");
    setFormPabellon("");
    setFormPiso("");

  };

  const handleSedeChange = (val) => {

    setFormSede(val.toUpperCase());
    setFormPabellon("");
    setFormPiso("");

  };

  const handlePabellonChange = (val) => {

    setFormPabellon(val.toUpperCase());
    setFormPiso("");

  };

  const handlePisoChange = (val) => {

    setFormPiso(val.toUpperCase());

  };

  /* ========================= */
  /* GUARDAR */
  /* ========================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      /* ========================= */
      /* CREAR ZONAL */
      /* ========================= */

      let zonalId = zonalElegida?.id;

      if (!zonalId) {

        const responseZonal =
          await api.post(
            "/zonales",
            {
              nombre: formZonal
            }
          );

        zonalId =
          responseZonal.data.id;

      }

      /* ========================= */
      /* CREAR UUNN */
      /* ========================= */

      let unidadId =
        unidadAsignada?.unidadNegocioId;

      if (
        !unidadId &&
        formUunn
      ) {

        const responseUnidad =
          await api.post(
            "/unidades",
            {
              nombre: formUunn,
              estado: "ACTIVO",
              zonalId: zonalId
            }
          );

        unidadId =
          responseUnidad.data.id;

      }

      /* ========================= */
      /* CREAR SEDE */
      /* ========================= */

      let sedeId =
        sedeElegida?.id;

      if (!sedeId) {

        const responseSede =
          await api.post(
            "/sedes",
            {
              nombre: formSede,
              zonalId: zonalId
            }
          );

        sedeId =
          responseSede.data.id;

      }

      /* ========================= */
      /* CREAR PABELLON */
      /* ========================= */

      let pabellonId =
        pabellonElegido?.id;

      if (!pabellonId) {

        const responsePabellon =
          await api.post(
            "/pabellones",
            {
              nombre: formPabellon,
              sedeId: sedeId
            }
          );

        pabellonId =
          responsePabellon.data.id;

      }

      /* ========================= */
      /* CREAR PISO */
      /* ========================= */

      let pisoId =
        pisoElegido?.id;

      if (!pisoId) {

        const responsePiso =
          await api.post(
            "/pisos",
            {
              nombre: formPiso,
              pabellonId: pabellonId
            }
          );

        pisoId =
          responsePiso.data.id;

      }

      /* ========================= */
      /* CREAR AMBIENTE */
      /* ========================= */

      await api.post(
        "/ambientes",
        {
          nombre: nuevoAmbiente,
          pisoId: pisoId
        }
      );

      alert(
        "Ambiente creado correctamente"
      );

      /* ========================= */
      /* LIMPIAR */
      /* ========================= */

      setFormZonal("");
      setFormSede("");
      setFormPabellon("");
      setFormPiso("");
      setNuevoAmbiente("");
      setFormUunn("");

      setVistaInfra("menu");

    } catch (error) {

      console.log(error);

      alert(
        "Error al guardar"
      );

    }

  };

  return (

    <div className="w-full max-w-4xl mx-auto">

      {/* BOTON VOLVER */}
      <button
        onClick={() => setVistaInfra("menu")}
        className="mb-8 text-[#7184a3] font-black hover:text-[#132238] transition-colors"
      >
        ← VOLVER AL MENÚ
      </button>

      {/* TITULOS */}
      <p className="uppercase text-sm tracking-[6px] text-gray-400 font-bold mb-2">
        Creación de Infraestructura
      </p>

      <h1 className="text-3xl lg:text-5xl font-black italic text-[#132238] mb-10">
        NUEVO AMBIENTE
      </h1>

      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-[35px] p-8 shadow-md flex flex-col gap-6"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ZONAL */}
          <div className="flex flex-col gap-2">

            <label className="font-bold text-[#132238] text-sm uppercase">
              1. Zonal
            </label>

            <input
              list="lista-zonales"
              value={formZonal}
              onChange={(e) =>
                handleZonalChange(
                  e.target.value
                )
              }
              placeholder="Ej: LIMA"
              required
              className="bg-gray-50 px-5 py-4 rounded-2xl border border-gray-200 outline-none font-bold placeholder-gray-400 focus:border-[#0456b3] transition-colors"
            />

            <datalist id="lista-zonales">
              {zonales.map((z) => (
                <option
                  key={z.id}
                  value={z.nombre}
                />
              ))}
            </datalist>

          </div>

          {/* UUNN */}
          {/* UUNN */}
          <div className="flex flex-col gap-2">

            <label className="font-bold text-[#132238] text-sm uppercase">
              Unidad de Negocio
            </label>

            {/* SI YA EXISTE */}
            {unidadAsignada ? (

              <div
                className="
                  bg-[#e8f0ff]
                  border
                  border-[#b8d2ff]
                  rounded-2xl
                  px-5
                  py-4
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <p
                    className="
                      text-xs
                      uppercase
                      text-[#0456b3]
                      font-black
                    "
                  >
                    UUNN ASIGNADA
                  </p>

                  <h3
                    className="
                      font-black
                      text-[#132238]
                      text-lg
                    "
                  >
                    {unidadAsignada.unidadNegocio.nombre}
                  </h3>

                </div>

                <span
                  className="
                    bg-green-100
                    text-green-600
                    px-4
                    py-2
                    rounded-full
                    text-xs
                    font-black
                  "
                >
                  ACTIVO
                </span>

              </div>

            ) : (

              <>
              
                <input
                  list="lista-uunn"
                  value={formUunn}
                  onChange={(e) =>
                    setFormUunn(
                      e.target.value.toUpperCase()
                    )
                  }
                  disabled={!formZonal}
                  placeholder={
                    formZonal
                      ? "Ej: PRONATEL"
                      : "Primero escriba la Zonal"
                  }
                  className="
                    bg-gray-50
                    px-5
                    py-4
                    rounded-2xl
                    border
                    border-gray-200
                    outline-none
                    font-bold
                    disabled:opacity-50
                    placeholder-gray-400
                    focus:border-[#0456b3]
                    transition-colors
                  "
                />

                <datalist id="lista-uunn">

                  {uunn.map((unidad) => (

                    <option
                      key={unidad.id}
                      value={unidad.nombre}
                    />

                  ))}

                </datalist>

              </>

            )}

          </div>

          {/* SEDE */}
          <div className="flex flex-col gap-2">

            <label className="font-bold text-[#132238] text-sm uppercase">
              2. Sede
            </label>

            <input
              list="lista-sedes"
              value={formSede}
              onChange={(e) =>
                handleSedeChange(
                  e.target.value
                )
              }
              disabled={!formZonal}
              placeholder={
                formZonal
                  ? "Ej: CAMPUS I"
                  : "Primero escriba la Zonal"
              }
              required
              className="bg-gray-50 px-5 py-4 rounded-2xl border border-gray-200 outline-none font-bold disabled:opacity-50 placeholder-gray-400 focus:border-[#0456b3] transition-colors"
            />

            <datalist id="lista-sedes">

              {sedesDisponibles.map((s) => (
                <option
                  key={s.id}
                  value={s.nombre}
                />
              ))}

            </datalist>

          </div>

          {/* PABELLON */}
          <div className="flex flex-col gap-2">

            <label className="font-bold text-[#132238] text-sm uppercase">
              3. Pabellón
            </label>

            <input
              list="lista-pabellones"
              value={formPabellon}
              onChange={(e) =>
                handlePabellonChange(
                  e.target.value
                )
              }
              disabled={!formSede}
              placeholder={
                formSede
                  ? "Ej: A"
                  : "Primero escriba la Sede"
              }
              required
              className="bg-gray-50 px-5 py-4 rounded-2xl border border-gray-200 outline-none font-bold disabled:opacity-50 placeholder-gray-400 focus:border-[#0456b3] transition-colors"
            />

            <datalist id="lista-pabellones">

              {pabellonesDisponibles.map((p) => (
                <option
                  key={p.id}
                  value={p.nombre}
                />
              ))}

            </datalist>

          </div>

          {/* PISO */}
          <div className="flex flex-col gap-2">

            <label className="font-bold text-[#132238] text-sm uppercase">
              4. Piso
            </label>

            <input
              list="lista-pisos"
              value={formPiso}
              onChange={(e) =>
                handlePisoChange(
                  e.target.value
                )
              }
              disabled={!formPabellon}
              placeholder={
                formPabellon
                  ? "Ej: 1"
                  : "Primero escriba el Pabellón"
              }
              required
              className="bg-gray-50 px-5 py-4 rounded-2xl border border-gray-200 outline-none font-bold disabled:opacity-50 placeholder-gray-400 focus:border-[#0456b3] transition-colors"
            />

            <datalist id="lista-pisos">

              {pisosDisponibles.map((p) => (
                <option
                  key={p.id}
                  value={p.nombre}
                />
              ))}

            </datalist>

          </div>

        </div>

        <hr className="my-4 border-gray-100" />

        {/* NUEVO AMBIENTE */}
        <div className="flex flex-col gap-2 mt-2">

          <label className="font-black text-[#132238] text-lg uppercase text-center tracking-wide">
            Nombre del Nuevo Ambiente
          </label>

          <input
            type="text"
            value={nuevoAmbiente}
            onChange={(e) =>
              setNuevoAmbiente(
                e.target.value.toUpperCase()
              )
            }
            disabled={!formPiso}
            required
            placeholder="Ej: LABORATORIO 101"
            className="bg-gray-50 px-5 py-5 rounded-2xl border border-gray-200 outline-none font-black text-center text-xl text-[#0456b3] disabled:opacity-50 focus:border-[#0456b3] transition-colors shadow-inner"
          />

        </div>

        {/* BOTON */}
        <button
          type="submit"
          disabled={
            !formPiso ||
            !nuevoAmbiente
          }
          className="mt-6 bg-[#87b2e8] hover:bg-[#0456b3] text-white px-8 py-4 rounded-[20px] font-black text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          GUARDAR AMBIENTE
        </button>

      </form>

    </div>

  );

}