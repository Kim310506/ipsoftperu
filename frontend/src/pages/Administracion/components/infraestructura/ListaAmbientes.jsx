import { useEffect, useMemo, useState } from "react";
import { zonales as zonalesData } from "../../../../data/infraestructura";
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
  const [filtroZonal, setFiltroZonal] = useState("TODOS");
  const [filtroSede, setFiltroSede] = useState("TODAS");
  const [filtroPabellon, setFiltroPabellon] = useState("TODOS");
  const [filtroPiso, setFiltroPiso] = useState("TODOS");

  // reset página si cambia algo
  useEffect(() => {
    setPaginaActual(1);
  }, [buscarAmbiente, filtroZonal, filtroSede, filtroPabellon, filtroPiso]);

  // ======================
  // OPCIONES ÚNICAS
  // ======================
const zonales = useMemo(() => {
  const set = new Set();

  zonalesData.forEach((z) => {
    set.add(z.nombre);
  });

  return ["TODOS", ...Array.from(set)];
}, []);
  const sedes = useMemo(() => {
  if (filtroZonal === "TODOS") {
    return ["TODAS", ...zonalesData.flatMap(z => z.sedes.map(s => s.nombre))];
  }

  const zona = zonalesData.find(z => z.nombre === filtroZonal);

  return zona
    ? ["TODAS", ...zona.sedes.map(s => s.nombre)]
    : ["TODAS"];
}, [filtroZonal]);

  const pabellones = useMemo(() => {
    const data =
      filtroSede === "TODAS"
        ? ambientesFiltrados
        : ambientesFiltrados.filter(a => a.sedeNombre === filtroSede);

    const set = new Set(data.map(a => a.pabellonNombre));
    return ["TODOS", ...set];
  }, [ambientesFiltrados, filtroSede]);

  const pisos = useMemo(() => {
    const data =
      filtroPabellon === "TODOS"
        ? ambientesFiltrados
        : ambientesFiltrados.filter(a => a.pabellonNombre === filtroPabellon);

    const set = new Set(data.map(a => a.pisoNombre));
    return ["TODOS", ...set];
  }, [ambientesFiltrados, filtroPabellon]);

  // ======================
  // FILTRO FINAL
  // ======================
  const dataFiltrada = ambientesFiltrados.filter((a) => {
    const okBusqueda = a.nombre
      .toLowerCase()
      .includes(buscarAmbiente.toLowerCase());

    const okZonal =
        filtroZonal === "TODOS" ||
        zonalesData.some((z) =>
            z.nombre === filtroZonal &&
            z.sedes.some((s) =>
            s.nombre === a.sedeNombre
            )
        );

    const okSede =
      filtroSede === "TODAS" || a.sedeNombre === filtroSede;

    const okPab =
      filtroPabellon === "TODOS" || a.pabellonNombre === filtroPabellon;

    const okPiso =
      filtroPiso === "TODOS" || a.pisoNombre === filtroPiso;

    return okBusqueda && okZonal && okSede && okPab && okPiso;
  });

  // ======================
  // PAGINACIÓN FINAL
  // ======================
  const totalPaginas = Math.ceil(dataFiltrada.length / itemsPorPagina);

  const inicio = (paginaActual - 1) * itemsPorPagina;

  const ambientesPaginados = dataFiltrada.slice(
    inicio,
    inicio + itemsPorPagina
  );

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

        <div>
          <button
            onClick={() => {
              setVistaInfra("menu");
              setBuscarAmbiente("");
              setFiltroZonal("TODOS");
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

        {/* BUSCADOR + FILTROS */}
        <div className="flex flex-col lg:flex-row gap-4">

          <input
            type="text"
            placeholder="Buscar ambiente..."
            value={buscarAmbiente}
            onChange={(e) => setBuscarAmbiente(e.target.value)}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold w-full lg:w-[280px]"
          />

          <select
            value={filtroZonal}
            onChange={(e) => {
              setFiltroZonal(e.target.value);
              setFiltroSede("TODAS");
              setFiltroPabellon("TODOS");
              setFiltroPiso("TODOS");
            }}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold"
          >
            {zonales.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>

          <select
            value={filtroSede}
            onChange={(e) => {
              setFiltroSede(e.target.value);
              setFiltroPabellon("TODOS");
              setFiltroPiso("TODOS");
            }}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold"
          >
            {sedes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={filtroPabellon}
            onChange={(e) => {
              setFiltroPabellon(e.target.value);
              setFiltroPiso("TODOS");
            }}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold"
          >
            {pabellones.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select
            value={filtroPiso}
            onChange={(e) => setFiltroPiso(e.target.value)}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold"
          >
            {pisos.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

        </div>
      </div>
{/* CABECERA */}
      <div className="hidden xl:grid xl:grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr] gap-8 px-8 mb-5 text-gray-400 font-black text-sm uppercase">

        <p>Ambientes</p>
        <p>Pisos</p>
        <p>Pabellón</p>
        <p className="text-right">Acción</p>

      </div>

      {/* LISTA */}
      <div className="flex flex-col gap-5">

        {ambientesPaginados.map((ambiente) => (
          <div
            key={`${ambiente.nombre}-${ambiente.pisoNombre}`}
            className="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 flex flex-col gap-5 xl:grid xl:grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr] xl:items-center xl:gap-8"
          >
            <div className="font-black text-[#132238] text-2xl italic">
              {ambiente.nombre}
            </div>

            <div>
              <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-xs font-black">
                {ambiente.pisoNombre}
              </span>
            </div>

            <div>
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs font-black">
                {ambiente.pabellonNombre}
              </span>
            </div>

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

      {/* PAGINACIÓN */}
      {totalPaginas > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10">

          <button
            onClick={() => setPaginaActual(p => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-gray-200 rounded-xl font-black"
          >
            ←
          </button>

          <span className="font-black text-[#132238]">
            {paginaActual} / {totalPaginas}
          </span>

          <button
            onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))}
            className="px-4 py-2 bg-gray-200 rounded-xl font-black"
          >
            →
          </button>

        </div>
      )}
    </>
  );
}