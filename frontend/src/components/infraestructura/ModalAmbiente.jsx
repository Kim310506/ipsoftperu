import { FaXmark } from "react-icons/fa6";

export default function ModalAmbiente({
  openAmbienteModal,
  setOpenAmbienteModal,
  ambienteSeleccionado
}) {
  if (!openAmbienteModal || !ambienteSeleccionado) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-3xl rounded-[35px] p-8 relative">

        {/* CERRAR */}
        <button
          onClick={() => setOpenAmbienteModal(false)}
          className="absolute top-6 right-6 bg-red-100 text-red-500 w-10 h-10 rounded-full flex items-center justify-center text-lg"
        >
          <FaXmark />
        </button>

        {/* TITULO */}
        <div className="mb-10">

          <h1 className="text-4xl font-black italic text-[#132238]">
            {ambienteSeleccionado.nombre}
          </h1>

          <p className="mt-3 text-purple-500 font-black uppercase">
            {ambienteSeleccionado.pisoNombre}
          </p>

        </div>

        {/* INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* PABELLÓN */}
          <div className="bg-[#f5f7fb] border border-gray-200 rounded-2xl p-6">

            <p className="text-sm text-[#8a9aba] font-black uppercase mb-2">
              PABELLÓN
            </p>

            <h2 className="text-xl font-black text-[#132238]">
              {ambienteSeleccionado.pabellonNombre}
            </h2>

          </div>

          {/* SEDE */}
          <div className="bg-[#f5f7fb] border border-gray-200 rounded-2xl p-6">

            <p className="text-sm text-[#8a9aba] font-black uppercase mb-2">
              SEDE
            </p>

            <h2 className="text-xl font-black text-[#132238]">
              {ambienteSeleccionado.sedeNombre}
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}