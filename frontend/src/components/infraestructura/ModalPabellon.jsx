import { FaXmark } from "react-icons/fa6";

export default function ModalPabellon({
  openPabellonModal,
  setOpenPabellonModal,
  pabellonSeleccionado
}) {
  if (!openPabellonModal || !pabellonSeleccionado) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-5xl rounded-[35px] p-8 max-h-[90vh] overflow-y-auto relative">

        {/* CERRAR */}
        <button
          onClick={() => setOpenPabellonModal(false)}
          className="absolute top-6 right-6 bg-red-100 text-red-500 w-10 h-10 rounded-full flex items-center justify-center text-lg"
        >
          <FaXmark />
        </button>

        {/* TITULO */}
        <div className="mb-10">

          <h1 className="text-4xl font-black italic text-[#132238]">
            {pabellonSeleccionado.nombre}
          </h1>

          <p className="text-[#8a9aba] font-bold mt-2 uppercase">
            Infraestructura
          </p>

        </div>

        {/* PISOS */}
        <div className="flex flex-col gap-8">

          {pabellonSeleccionado.pisos.map((piso) => (
            <div
              key={piso.id}
              className="border border-gray-200 rounded-[30px] p-6"
            >

              {/* PISO HEADER */}
              <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-black text-[#132238]">
                  {piso.nombre}
                </h2>

                <span className="bg-[#0456b3]/10 text-[#0456b3] px-4 py-2 rounded-full text-sm font-black">
                  {piso.ambientes.length} AMBIENTES
                </span>

              </div>

              {/* AMBIENTES */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                {piso.ambientes.map((ambiente) => (
                  <div
                    key={ambiente.id}
                    className="bg-[#f5f7fb] border border-gray-200 rounded-2xl px-5 py-4 font-black text-[#132238]"
                  >
                    {ambiente.nombre}
                  </div>
                ))}

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}