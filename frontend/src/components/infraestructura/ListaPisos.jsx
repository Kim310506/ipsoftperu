export default function ListaPisos({
  vistaInfra,
  setVistaInfra,
  buscarPiso,
  setBuscarPiso,
  pisosFiltrados,
  setPisoSeleccionadoGlobal,
  setOpenPisoModal
}) {
  if (vistaInfra !== "listaPisos") return null;

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

        <div>
          <button
            onClick={() => {
              setVistaInfra("menu");
              setBuscarPiso("");
            }}
            className="mb-5 text-[#7184a3] font-black"
          >
            ← VOLVER
          </button>

          <h1 className="text-3xl lg:text-5xl font-black italic text-[#132238]">
            PISOS
          </h1>
        </div>

        {/* BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar piso..."
          value={buscarPiso}
          onChange={(e) => setBuscarPiso(e.target.value)}
          className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold w-full lg:w-[320px]"
        />

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {pisosFiltrados.map((piso) => (
          <div
            key={`${piso.nombre}-${piso.pabellonNombre}`}
            className="bg-white rounded-[35px] p-8 shadow-md border border-gray-100"
          >

            <h2 className="text-3xl font-black italic text-[#132238]">
              {piso.nombre}
            </h2>

            <p className="mt-3 text-green-500 font-black text-sm uppercase">
              {piso.pabellonNombre}
            </p>

            <p className="mt-2 text-[#8a9aba] font-bold text-sm uppercase">
              {piso.sedeNombre}
            </p>

            <button
              onClick={() => {
                setPisoSeleccionadoGlobal(piso);
                setOpenPisoModal(true);
              }}
              className="mt-8 bg-[#0456b3] hover:bg-[#034696] text-white px-5 py-3 rounded-2xl font-black w-full"
            >
              VER AMBIENTES
            </button>

          </div>
        ))}

      </div>
    </>
  );
}