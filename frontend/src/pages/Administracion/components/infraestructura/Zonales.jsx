import { FaBuilding } from "react-icons/fa6";

export default function Zonales({
  zonales,
  setVistaInfra,
  setSedeSeleccionada
}) {

  return (
    <>

      <button
        onClick={() => setVistaInfra("menu")}
        className="mb-8 text-[#7184a3] font-black"
      >
        ← VOLVER AL MENÚ
      </button>

      <p className="uppercase text-sm tracking-[6px] text-gray-400 font-bold mb-2">
        Gestión de zonales
      </p>

      <h1 className="text-3xl lg:text-5xl font-black italic text-[#132238] mb-10">
        ZONALES
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {zonales.map((zonal) => (

          <div
            key={zonal.id}
            onClick={() => {
              setSedeSeleccionada(zonal);
              setVistaInfra("sedes");
            }}
            className="bg-white rounded-[35px] p-8 shadow-md hover:scale-105 transition-all cursor-pointer"
          >

            <div className="w-16 h-16 rounded-2xl bg-[#eef5ff] flex items-center justify-center mb-8">
              <FaBuilding className="text-2xl text-[#0456b3]" />
            </div>

            <h2 className="text-3xl font-black italic text-[#132238]">
              {zonal.nombre}
            </h2>

            <p className="mt-3 text-[#0456b3] font-black text-sm tracking-[2px] uppercase">
              Ver sedes
            </p>

          </div>

        ))}

      </div>

    </>
  );
}