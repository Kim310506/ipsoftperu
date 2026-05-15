import { useState, useMemo } from "react";

export default function ListaSedes({
  vistaInfra,
  setVistaInfra,
  buscarSede,
  setBuscarSede,
  sedesFiltradas,
  setSedeSeleccionadaGlobal,
  setOpenSedeModal
}) {
  if (vistaInfra !== "listaSedes") return null;

  // 🔥 FILTRO ZONAL
  const [zonalFiltro, setZonalFiltro] = useState("TODOS");

  // 🔥 obtener zonales únicos
  const zonalesUnicos = useMemo(() => {
    const set = new Set();
    sedesFiltradas.forEach((s) => set.add(s.zonalNombre));
    return ["TODOS", ...Array.from(set)];
  }, [sedesFiltradas]);

  // 🔥 filtro final combinado
  const sedesFinales = sedesFiltradas.filter((sede) => {
    const coincideNombre = sede.nombre
      .toLowerCase()
      .includes(buscarSede.toLowerCase());

    const coincideZonal =
      zonalFiltro === "TODOS" || sede.zonalNombre === zonalFiltro;

    return coincideNombre && coincideZonal;
  });

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

        <div>
          <button
            onClick={() => {
              setVistaInfra("menu");
              setBuscarSede("");
            }}
            className="mb-5 text-[#7184a3] font-black"
          >
            ← VOLVER
          </button>

          <h1 className="text-3xl lg:text-5xl font-black italic text-[#132238]">
            SEDES
          </h1>
        </div>

        {/* FILTROS */}
        <div className="flex flex-col lg:flex-row gap-4">

          {/* BUSCADOR */}
          <input
            type="text"
            placeholder="Buscar sede..."
            value={buscarSede}
            onChange={(e) => setBuscarSede(e.target.value)}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold w-full lg:w-[280px]"
          />

          {/* FILTRO ZONAL */}
          <select
            value={zonalFiltro}
            onChange={(e) => setZonalFiltro(e.target.value)}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold"
          >
            {zonalesUnicos.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>

        </div>
      </div>

      {/* CABECERA */}
      <div className="hidden xl:grid xl:grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr] gap-8 px-8 mb-5 text-gray-400 font-black text-sm uppercase">

        <p>Sede / Local</p>
        <p>Zonal</p>
        <p>Pabellones</p>
        <p>Pisos</p>
        <p className="text-right">Acción</p>

      </div>

      {/* LISTA */}
      <div className="flex flex-col gap-5">

        {sedesFinales.map((sede) => (
          <div
            key={sede.id}
            className="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 flex flex-col gap-5 xl:grid xl:grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr] xl:items-center xl:gap-8"
          >

            {/* SEDE */}
            <div>
              <h2 className="text-2xl font-black italic text-[#132238]">
                {sede.nombre}
              </h2>
            </div>

            {/* ZONAL */}
            <div>
              <span className="bg-orange-100 text-orange-600 px-5 py-2 rounded-full text-xs font-black">
                {sede.zonalNombre}
              </span>
            </div>

            {/* PABELLONES */}
            <div>
              <p className="font-black text-[#132238] text-lg">
                {sede.pabellones.length}
              </p>
            </div>

            {/* PISOS */}
            <div>
              <p className="font-black text-[#0456b3] text-lg">
                {sede.pabellones.reduce(
                  (acc, p) => acc + p.pisos.length,
                  0
                )}
              </p>
            </div>

            {/* BOTÓN */}
            <div className="flex xl:justify-end">
              <button
                onClick={() => {
                  setSedeSeleccionadaGlobal(sede);
                  setOpenSedeModal(true);
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