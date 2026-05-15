import { FaBuilding } from "react-icons/fa6";
export default function Pisos({
  pisoSeleccionado,
  setVistaInfra,
  setSedeFiltro
}) {

  return (
    <>

      <button
        onClick={() => setVistaInfra("pabellones")}
        className="mb-8 text-[#7184a3] font-black"
      >
        ← VOLVER A PABELLONES
      </button>

      <h1 className="text-3xl lg:text-5xl font-black italic text-[#132238] mb-10">
        {pisoSeleccionado?.nombre}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {pisoSeleccionado?.pisos.map((piso) => (

          <div
            key={piso.id}
            onClick={() => {
              setVistaInfra("ambientes");
              setSedeFiltro(piso);
            }}
            className="bg-white rounded-[35px] p-8 shadow-md hover:scale-105 transition-all cursor-pointer"
          >

            <h2 className="text-3xl font-black italic text-[#132238]">
              {piso.nombre}
            </h2>

            <p className="mt-3 text-[#8a9aba] font-black text-sm uppercase">
              Click para entrar
            </p>

          </div>

        ))}

      </div>

    </>
  );
}