import { FaXmark } from "react-icons/fa6";

export default function ModalPiso({
  openPisoModal,
  setOpenPisoModal,
  pisoSeleccionadoGlobal
}) {
  if (!openPisoModal || !pisoSeleccionadoGlobal) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-4xl rounded-[35px] p-8 relative">

        {/* CERRAR */}
        <button
          onClick={() => setOpenPisoModal(false)}
          className="absolute top-6 right-6 bg-red-100 text-red-500 w-10 h-10 rounded-full flex items-center justify-center text-lg"
        >
          <FaXmark />
        </button>

        {/* TITULO */}
        <div className="mb-10">

          <h1 className="text-4xl font-black italic text-[#132238]">
            {pisoSeleccionadoGlobal.nombre}
          </h1>

          <p className="mt-2 text-[#8a9aba] font-bold uppercase">
            {pisoSeleccionadoGlobal.pabellonNombre}
          </p>

        </div>

        {/* AMBIENTES */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {pisoSeleccionadoGlobal.ambientes.map((ambiente) => (
            <div
              key={ambiente.id}
              className="bg-[#f5f7fb] border border-gray-200 rounded-2xl px-5 py-5"
            >
              <h2 className="font-black text-[#132238]">
                {ambiente.nombre}
              </h2>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}