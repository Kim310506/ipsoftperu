import { FaBuilding } from "react-icons/fa6";
export default function Sedes({
  sedeSeleccionada,
  setVistaInfra,
  setPabellonSeleccionado
}) {

  return (
    <>

      <button
        onClick={() => setVistaInfra("zonal")}
        className="mb-8 text-[#7184a3] font-black"
      >
        ← VOLVER A ZONALES
      </button>

      <p className="uppercase text-sm tracking-[6px] text-gray-400 font-bold mb-2">
        Gestión de sedes
      </p>

      <h1 className="text-3xl lg:text-5xl font-black italic text-[#132238] mb-10">
        {sedeSeleccionada?.nombre}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {sedeSeleccionada?.sedes.map((sede) => (

          <div
            key={sede.id}
            onClick={() => {
              setPabellonSeleccionado(sede);
              setVistaInfra("pabellones");
            }}
            className="bg-white rounded-[35px] p-8 shadow-md hover:scale-105 transition-all cursor-pointer"
          >

            <h2 className="text-3xl font-black italic text-[#132238]">
              {sede.nombre}
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