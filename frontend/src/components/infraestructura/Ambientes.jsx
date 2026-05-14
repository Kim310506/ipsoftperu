import { FaBuilding } from "react-icons/fa6";
export default function Ambientes({
  sedeFiltro,
  setVistaInfra
}) {

  return (
    <>

      <button
        onClick={() => setVistaInfra("pisos")}
        className="mb-8 text-[#7184a3] font-black"
      >
        ← VOLVER A PISOS
      </button>

      <h1 className="text-3xl lg:text-5xl font-black italic text-[#132238] mb-10">
        {sedeFiltro?.nombre}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {sedeFiltro?.ambientes.map((ambiente) => (

          <div
            key={ambiente.id}
            className="bg-white rounded-[35px] p-8 shadow-md"
          >

            <h2 className="text-3xl font-black italic text-[#132238]">
              {ambiente.nombre}
            </h2>

            <p className="mt-3 text-[#8a9aba] font-black text-sm uppercase">
              Ambiente registrado
            </p>

          </div>

        ))}

      </div>

    </>
  );
}