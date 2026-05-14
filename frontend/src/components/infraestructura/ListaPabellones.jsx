export default function ListaPabellones({
  vistaInfra,
  setVistaInfra,
  buscarPabellon,
  setBuscarPabellon,
  filtroSede,
  setFiltroSede,
  sedes,
  pabellonesFiltrados,
  setPabellonSeleccionado,
  setOpenPabellonModal
}) {
  if (vistaInfra !== "listaPabellones") return null;

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

        <div>
          <button
            onClick={() => {
              setVistaInfra("menu");
              setBuscarPabellon("");
              setFiltroSede("TODAS");
            }}
            className="mb-5 text-[#7184a3] font-black"
          >
            ← VOLVER
          </button>

          <h1 className="text-3xl lg:text-5xl font-black italic text-[#132238]">
            PABELLONES
          </h1>
        </div>

        {/* FILTROS */}
        <div className="flex flex-col lg:flex-row gap-4">

          {/* BUSCADOR */}
          <input
            type="text"
            placeholder="Buscar pabellón..."
            value={buscarPabellon}
            onChange={(e) => setBuscarPabellon(e.target.value)}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold w-full lg:w-[280px]"
          />

          {/* FILTRO SEDE */}
          <select
            value={filtroSede}
            onChange={(e) => setFiltroSede(e.target.value)}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold"
          >
            <option value="TODAS">TODAS LAS SEDES</option>

            {sedes.map((sede) => (
              <option key={sede.id} value={sede.nombre}>
                {sede.nombre}
              </option>
            ))}
          </select>

        </div>
      </div>

      {/* CABECERA */}
      <div className="hidden xl:grid xl:grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr] gap-8 px-8 mb-5 text-gray-400 font-black text-sm uppercase">

        <p>Pabellón</p>
        <p>Sede</p>
        <p>Pisos</p>
        <p>Ambientes</p>
        <p className="text-right">Acción</p>

      </div>

      {/* LISTA */}
      <div className="flex flex-col gap-5">

        {pabellonesFiltrados.map((pabellon) => (
          <div
            key={pabellon.id}
            className="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 flex flex-col gap-5 xl:grid xl:grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr] xl:items-center xl:gap-8"
          >

            {/* PABELLÓN */}
            <div>
              <h2 className="text-2xl font-black italic text-[#132238]">
                {pabellon.nombre}
              </h2>
            </div>

            {/* SEDE */}
            <div>
              <span className="bg-orange-100 text-orange-600 px-5 py-2 rounded-full text-xs font-black">
                {pabellon.sedeNombre}
              </span>
            </div>

            {/* PISOS */}
            <div>
              <p className="font-black text-[#132238] text-lg">
                {pabellon.pisos.length}
              </p>
            </div>

            {/* AMBIENTES */}
            <div>
              <p className="font-black text-[#0456b3] text-lg">
                {pabellon.pisos.reduce(
                  (acc, piso) => acc + piso.ambientes.length,
                  0
                )}
              </p>
            </div>

            {/* BOTÓN */}
            <div className="flex xl:justify-end">
              <button
                onClick={() => {
                  setPabellonSeleccionado(pabellon);
                  setOpenPabellonModal(true);
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