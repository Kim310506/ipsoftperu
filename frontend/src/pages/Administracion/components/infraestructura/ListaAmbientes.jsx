import { useEffect, useMemo, useState } from "react";

export default function ListaAmbientes({
  vistaInfra,
  setVistaInfra,
  buscarAmbiente,
  setBuscarAmbiente,
  ambientesFiltrados,
  setAmbienteSeleccionado,
  setOpenAmbienteModal
}) {

  if (vistaInfra !== "listaAmbientes") return null;

  // ======================
  // PAGINACIÓN
  // ======================
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 6;

  // ======================
  // FILTROS
  // ======================
  const [filtroSede, setFiltroSede] = useState("TODAS");
  const [filtroPabellon, setFiltroPabellon] = useState("TODOS");
  const [filtroPiso, setFiltroPiso] = useState("TODOS");

// ======================
// RESET PAGINA
// ======================
useEffect(() => {
  setPaginaActual(1);
}, [
  buscarAmbiente,
  filtroSede,
  filtroPabellon,
  filtroPiso
]);

// ======================
// TRANSFORMAR DATA DB
// ======================
console.log("ambientesFiltrados", ambientesFiltrados);
const ambientes = useMemo(() => {

  return (ambientesFiltrados || []).map((a) => ({
    id: a.id,
    nombre: a.nombre || "",
    pisoNombre: a.pisoNombre || "",
    pabellonNombre: a.pabellonNombre || "",
    sedeNombre: a.sedeNombre || ""
  }));

}, [ambientesFiltrados]);


// ======================
// SEDES DESDE DB
// ======================
const sedes = useMemo(() => {

  let data = ambientes;

  const uniques = [
    ...new Set(
      data.map(
        (a) => a.sedeNombre
      )
    )
  ];

  return ["TODAS", ...uniques];

}, [
   ambientes,
]);

  // ======================
  // PABELLONES
  // ======================
 const pabellones = useMemo(() => {

  const data =
    filtroSede === "TODAS"
      ? ambientes
      : ambientes.filter(
          (a) => a.sedeNombre === filtroSede
        );

  const uniques = [
    ...new Set(
      data.map((a) => a.pabellonNombre)
    )
  ];

  return ["TODOS", ...uniques];

}, [ambientes, filtroSede]);

  // ======================
  // PISOS
  // ======================
 const pisos = useMemo(() => {

  const data =
    filtroPabellon === "TODOS"
      ? ambientes
      : ambientes.filter(
          (a) =>
            a.pabellonNombre === filtroPabellon
        );

  const uniques = [
    ...new Set(
      data.map((a) => a.pisoNombre)
    )
  ];

  return ["TODOS", ...uniques];

}, [ambientes, filtroPabellon]);

  // ======================
  // FILTRO FINAL
  // ======================
  const dataFiltrada = ambientes.filter((a) => {

    const okBusqueda = (a.nombre || "")
      .toLowerCase()
      .includes(
        (buscarAmbiente || "").toLowerCase()
      );

    const okSede =
      filtroSede === "TODAS" ||
      a.sedeNombre === filtroSede;

    const okPab =
      filtroPabellon === "TODOS" ||
      a.pabellonNombre === filtroPabellon;

    const okPiso =
      filtroPiso === "TODOS" ||
      a.pisoNombre === filtroPiso;

    return (
      okBusqueda &&
      okSede &&
      okPab &&
      okPiso
    );

  });

  // ======================
  // PAGINACIÓN FINAL
  // ======================
  const totalPaginas = Math.ceil(
    dataFiltrada.length / itemsPorPagina
  );

  const inicio =
    (paginaActual - 1) * itemsPorPagina;

  const ambientesPaginados = dataFiltrada.slice(
    inicio,
    inicio + itemsPorPagina
  );

  return (
    <div className="w-full max-w-[1300px]">

      {/* ====================== */}
      {/* HEADER */}
      {/* ====================== */}

      <div className="mb-10">

        {/* TITULO */}
        <div className="mb-6">

          <button
            onClick={() => {
              setVistaInfra("menu");
              setBuscarAmbiente("");
              setFiltroSede("TODAS");
              setFiltroPabellon("TODOS");
              setFiltroPiso("TODOS");
            }}
            className="mb-5 text-[#7184a3] font-black"
          >
            ← VOLVER
          </button>

          <h1 className="text-3xl lg:text-5xl font-black italic text-[#132238]">
            AMBIENTES
          </h1>

        </div>

        {/* FILTROS */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-5 gap-4">

          {/* BUSCADOR */}
          <input
            type="text"
            placeholder="Buscar ambiente..."
            value={buscarAmbiente}
            onChange={(e) =>
              setBuscarAmbiente(e.target.value)
            }
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold w-full"
          />


          {/* SEDE */}
          <select
            value={filtroSede}
            onChange={(e) => {
              setFiltroSede(e.target.value);
              setFiltroPabellon("TODOS");
              setFiltroPiso("TODOS");
            }}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold w-full"
          >
            {sedes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* PABELLON */}
          <select
            value={filtroPabellon}
            onChange={(e) => {
              setFiltroPabellon(e.target.value);
              setFiltroPiso("TODOS");
            }}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold w-full"
          >
            {pabellones.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {/* PISO */}
          <select
            value={filtroPiso}
            onChange={(e) =>
              setFiltroPiso(e.target.value)
            }
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold w-full"
          >
            {pisos.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

        </div>

      </div>

      {/* ====================== */}
      {/* CABECERA */}
      {/* ====================== */}

      <div className="hidden xl:grid xl:grid-cols-[2fr_1.2fr_1.2fr_auto] gap-8 px-8 mb-5 text-gray-400 font-black text-sm uppercase">

        <p>Ambientes</p>

        <p>Pisos</p>

        <p>Pabellón</p>

        <p className="text-right">
          Acción
        </p>

      </div>

      {/* ====================== */}
      {/* LISTA */}
      {/* ====================== */}

      <div className="flex flex-col gap-5">

        {ambientesPaginados.map((ambiente) => (

          <div
            key={`${ambiente.nombre}-${ambiente.pisoNombre}`}
            className="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 flex flex-col gap-5 xl:grid xl:grid-cols-[2fr_1.2fr_1.2fr_auto] xl:items-center xl:gap-8"
          >

            {/* NOMBRE */}
            <div className="font-black text-[#132238] text-2xl italic">
              {ambiente.nombre}
            </div>

            {/* PISO */}
            <div>
              <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-xs font-black whitespace-nowrap">
                {ambiente.pisoNombre}
              </span>
            </div>

            {/* PABELLON */}
            <div>
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs font-black whitespace-nowrap">
                {ambiente.pabellonNombre}
              </span>
            </div>

            {/* BOTON */}
            <div className="flex xl:justify-end">

              <button
                onClick={() => {
                  setAmbienteSeleccionado(ambiente);
                  setOpenAmbienteModal(true);
                }}
                className="bg-[#0456b3] hover:bg-[#034696] text-white px-5 py-3 rounded-2xl font-black"
              >
                VER
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* ====================== */}
      {/* PAGINACIÓN */}
      {/* ====================== */}

      {totalPaginas > 1 && (

        <div className="flex justify-center items-center gap-3 mt-10">

          <button
            onClick={() =>
              setPaginaActual((p) =>
                Math.max(p - 1, 1)
              )
            }
            className="px-4 py-2 bg-gray-200 rounded-xl font-black"
          >
            ←
          </button>

          <span className="font-black text-[#132238]">
            {paginaActual} / {totalPaginas}
          </span>

          <button
            onClick={() =>
              setPaginaActual((p) =>
                Math.min(p + 1, totalPaginas)
              )
            }
            className="px-4 py-2 bg-gray-200 rounded-xl font-black"
          >
            →
          </button>

        </div>

      )}

    </div>
  );
}