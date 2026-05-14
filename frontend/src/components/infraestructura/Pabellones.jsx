import { FaBuilding } from "react-icons/fa6";
export default function Pabellones({
  pabellonSeleccionado,
  setVistaInfra,
  setPisoSeleccionado
}) {

  return (
    <>

      <button
        onClick={() => setVistaInfra("sedes")}
        className="mb-8 text-[#7184a3] font-black"
      >
        ← VOLVER A SEDES
      </button>

      <h1 className="text-3xl lg:text-5xl font-black italic text-[#132238] mb-10">
        {pabellonSeleccionado?.nombre}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {pabellonSeleccionado?.pabellones.map((pabellon) => (

          <div
            key={pabellon.id}
            onClick={() => {
              setPisoSeleccionado(pabellon);
              setVistaInfra("pisos");
            }}
            className="bg-white rounded-[35px] p-8 shadow-md hover:scale-105 transition-all cursor-pointer"
          >

            <h2 className="text-3xl font-black italic text-[#132238]">
              {pabellon.nombre}
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