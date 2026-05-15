import { useMemo, useState } from "react";
import { zonales as zonalesData } from "../../../../data/infraestructura";
export default function ListaPisos({
  vistaInfra,
  setVistaInfra,
  buscarPiso,
  setBuscarPiso,
  setPisoSeleccionadoGlobal,
  setOpenPisoModal
}) {
  if (vistaInfra !== "listaPisos") return null;

  // ======================
  // FILTROS
  // ======================
  const [filtroZonal, setFiltroZonal] = useState("TODOS");
  const [filtroSede, setFiltroSede] = useState("TODAS");
  const [filtroPabellon, setFiltroPabellon] = useState("TODOS");

  // ======================
  // ZONALES
  // ======================
  const zonales = useMemo(() => {
    return ["TODOS", ...zonalesData.map((z) => z.nombre)];
  }, []);

  // ======================
  // SEDES SEGÚN ZONAL
  // ======================
  const sedes = useMemo(() => {
    if (filtroZonal === "TODOS") {
      return zonalesData.flatMap((z) => z.sedes);
    }

    const zona = zonalesData.find((z) => z.nombre === filtroZonal);
    return zona ? zona.sedes : [];
  }, [filtroZonal]);

  // ======================
  // PABELLONES SEGÚN SEDE
  // ======================
  const pabellones = useMemo(() => {
    if (filtroSede === "TODAS") {
      return sedes.flatMap((s) => s.pabellones);
    }

    const sede = sedes.find((s) => s.nombre === filtroSede);
    return sede ? sede.pabellones : [];
  }, [sedes, filtroSede]);

  // ======================
  // PISOS FINAL
  // ======================
  const pisos = useMemo(() => {
    let allPisos = [];

    pabellones.forEach((pab) => {
      pab.pisos.forEach((piso) => {
        allPisos.push({
          ...piso,
          pabellonNombre: pab.nombre,
          sedeNombre: sedes.find((s) =>
            s.pabellones.some((p) => p.id === pab.id)
          )?.nombre || "",
        });
      });
    });

    return allPisos;
  }, [pabellones, sedes]);

  // ======================
  // FILTRO FINAL (BUSQUEDA)
  // ======================
  const pisosFiltrados = pisos.filter((piso) =>
    piso.nombre.toLowerCase().includes(buscarPiso.toLowerCase())
  );

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

        <div>
          <button
            onClick={() => {
              setVistaInfra("menu");
              setBuscarPiso("");
              setFiltroZonal("TODOS");
              setFiltroSede("TODAS");
              setFiltroPabellon("TODOS");
            }}
            className="mb-5 text-[#7184a3] font-black"
          >
            ← VOLVER
          </button>

          <h1 className="text-3xl lg:text-5xl font-black italic text-[#132238]">
            PISOS
          </h1>
        </div>

        {/* FILTROS */}
        <div className="flex flex-col lg:flex-row gap-4">

          {/* BUSCADOR */}
          <input
            type="text"
            placeholder="Buscar piso..."
            value={buscarPiso}
            onChange={(e) => setBuscarPiso(e.target.value)}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold w-full lg:w-[320px]"
          />

          {/* ZONAL */}
          <select
            value={filtroZonal}
            onChange={(e) => {
              setFiltroZonal(e.target.value);
              setFiltroSede("TODAS");
              setFiltroPabellon("TODOS");
            }}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold"
          >
            {zonales.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>

          {/* SEDE */}
          <select
            value={filtroSede}
            onChange={(e) => {
              setFiltroSede(e.target.value);
              setFiltroPabellon("TODOS");
            }}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold"
          >
            <option value="TODAS">TODAS LAS SEDES</option>

            {sedes.map((s) => (
              <option key={s.id} value={s.nombre}>
                {s.nombre}
              </option>
            ))}
          </select>

          {/* PABELLON */}
          <select
            value={filtroPabellon}
            onChange={(e) => setFiltroPabellon(e.target.value)}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold"
          >
            <option value="TODOS">TODOS LOS PABELLONES</option>

            {pabellones.map((p) => (
              <option key={p.id} value={p.nombre}>
                {p.nombre}
              </option>
            ))}
          </select>

        </div>
      </div>
{/* CABECERA */}
      <div className="hidden xl:grid xl:grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr] gap-8 px-8 mb-5 text-gray-400 font-black text-sm uppercase">

        <p>Piso</p>
        <p>Pabellones</p>
        <p>Sedes</p>
        <p className="text-right">Acción</p>

      </div>

      {/* LISTA */}
      <div className="flex flex-col gap-5">

        {pisosFiltrados.map((piso, i) => (
          <div
            key={i}
            className="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 flex flex-col gap-5 xl:grid xl:grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr] xl:items-center xl:gap-8"
          >

            <div className="font-black text-[#132238] text-2xl italic">
              {piso.nombre}
            </div>

            <div>
              <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-xs font-black">
                {piso.pabellonNombre}
              </span>
            </div>

            <div>
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs font-black">
                {piso.sedeNombre}
              </span>
            </div>

            <div className="flex xl:justify-end">
              <button
                onClick={() => {
                  setPisoSeleccionadoGlobal(piso);
                  setOpenPisoModal(true);
                }}
                className="bg-[#0456b3] hover:bg-[#034696] text-white px-5 py-3 rounded-2xl font-black"
              >
                VER
              </button>
            </div>

          </div>
        ))}

      </div>
    </>
  );
}