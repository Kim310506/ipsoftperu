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

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

        <div>
          <button
            onClick={() => {
              setVistaInfra("menu");
              setBuscarAmbiente("");
            }}
            className="mb-5 text-[#7184a3] font-black"
          >
            ← VOLVER
          </button>

          <h1 className="text-3xl lg:text-5xl font-black italic text-[#132238]">
            AMBIENTES
          </h1>
        </div>

        {/* BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar ambiente..."
          value={buscarAmbiente}
          onChange={(e) => setBuscarAmbiente(e.target.value)}
          className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold w-full lg:w-[320px]"
        />

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {ambientesFiltrados.map((ambiente) => (
          <div
            key={`${ambiente.nombre}-${ambiente.pisoNombre}`}
            className="bg-white rounded-[35px] p-8 shadow-md border border-gray-100"
          >

            <h2 className="text-3xl font-black italic text-[#132238]">
              {ambiente.nombre}
            </h2>

            <p className="mt-3 text-purple-500 font-black text-sm uppercase">
              {ambiente.pisoNombre}
            </p>

            <p className="mt-2 text-[#8a9aba] font-bold text-sm uppercase">
              {ambiente.pabellonNombre}
            </p>

            <button
              onClick={() => {
                setAmbienteSeleccionado(ambiente);
                setOpenAmbienteModal(true);
              }}
              className="mt-8 bg-[#0456b3] hover:bg-[#034696] text-white px-5 py-3 rounded-2xl font-black w-full"
            >
              VER DETALLE
            </button>

          </div>
        ))}

      </div>
    </>
  );
}