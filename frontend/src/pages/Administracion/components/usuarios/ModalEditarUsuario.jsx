import {
  FaXmark,
  FaUser,
  FaEnvelope,
  FaLock,
  FaChevronDown
} from "react-icons/fa6";

export default function ModalEditarUsuario({
  openEditModal,
  setOpenEditModal,
  usuarioSeleccionado
}) {

  if (!openEditModal) return null;

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-5">

{/* ========================= */}
{/* MODAL EDITAR */}
{/* ========================= */}

{openEditModal && (

  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-5">

    <div
  className="
    bg-white
    w-full
    max-w-2xl
    rounded-[30px]
    lg:rounded-[40px]
    p-5
    lg:p-10
    relative
    shadow-2xl
    max-h-[95vh]
    overflow-y-auto
  "
>

      {/* CERRAR */}
      <button
        onClick={() => setOpenEditModal(false)}
        className="absolute top-7 right-7 text-3xl text-gray-400 hover:text-black transition"
      >
        <FaXmark />
      </button>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-4xl font-black text-[#1d2b4f]">
          EDITAR ACCESO
        </h1>

        <p className="text-sm uppercase tracking-[3px] text-gray-400 font-bold mt-2">
          Modificando permisos en iCURA
        </p>

      </div>

      <div className="space-y-6">

        {/* NOMBRE */}
        <div>

          <label className="text-xs uppercase font-black text-[#7184a3]">
            Nombre completo
          </label>

          <div className="mt-3 bg-[#f5f7fb] rounded-2xl px-5 flex items-center gap-4">

            <FaUser className="text-[#7184a3]" />

            <input
              type="text"
              defaultValue={usuarioSeleccionado?.nombre}
              className="w-full bg-transparent p-5 outline-none font-semibold"
            />

          </div>

        </div>

        {/* CORREO */}
        <div>

          <label className="text-xs uppercase font-black text-[#7184a3]">
            Correo electrónico
          </label>

          <div className="mt-3 bg-[#f5f7fb] rounded-2xl px-5 flex items-center gap-4">

            <FaEnvelope className="text-[#7184a3]" />

            <input
              type="email"
              defaultValue={usuarioSeleccionado?.correo}
              className="w-full bg-transparent p-5 outline-none font-semibold"
            />

          </div>

        </div>

        {/* PASSWORD */}
        <div>

          <label className="text-xs uppercase font-black text-[#7184a3]">
            Contraseña
          </label>

          <div className="mt-3 bg-[#f5f7fb] rounded-2xl px-5 flex items-center gap-4">

            <FaLock className="text-[#7184a3]" />

            <input
              type="password"
              defaultValue={usuarioSeleccionado?.password}
              className="w-full bg-transparent p-5 outline-none font-semibold"
            />

          </div>

        </div>

       {/* GRID */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

  {/* ROL */}
  <div className="w-full relative">
    <label className="block text-[12px] uppercase font-black text-[#7184a3] tracking-wide mb-2">
      Rol
    </label>

    <select
      defaultValue={usuarioSeleccionado?.rol}
      className="w-full bg-[#f5f7fb] rounded-[22px]
      px-6 py-5 pr-14
      font-bold text-[#8b97ad]
      outline-none appearance-none
      cursor-pointer border-none"
    >
      <option>USUARIO</option>
      <option>ADMIN</option>
      <option>INVITADO</option>
    </select>

    {/* FLECHA */}
    <FaChevronDown
      className="absolute right-5 top-[58px]
      text-[13px] text-[#8b97ad]
      pointer-events-none"
    />
  </div>

  {/* ACCESOS */}
  <div className="relative w-full">
    <label className="block text-[12px] uppercase font-black text-[#7184a3] tracking-wide mb-2">
      Accesos a módulos
    </label>

    <details className="group relative">

      {/* SELECT */}
      <summary
        className="list-none bg-[#f5f7fb] rounded-[22px]
        px-6 py-5
        font-bold text-[#8b97ad]
        cursor-pointer select-none
        flex items-center justify-between"
      >
        <span>Seleccionar módulos</span>

        <FaChevronDown
          className="text-[13px] text-[#8b97ad]
          transition-transform duration-300
          group-open:rotate-180"
        />
      </summary>

      {/* OPCIONES */}
      <div
        className="absolute mt-3 w-full bg-white rounded-[24px]
        shadow-[0_10px_35px_rgba(0,0,0,0.08)]
        border border-[#edf1f7]
        p-5 flex flex-col gap-5 z-50"
      >

        {/* CONFIGURACION */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 accent-[#0456b3]"
          />

          <span className="font-bold text-[#25364f] text-sm">
            CONFIGURACIÓN
          </span>
        </label>

        {/* EXTINTORES */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 accent-[#0456b3]"
          />

          <span className="font-bold text-[#25364f] text-sm">
            EXTINTORES
          </span>
        </label>

        {/* INVENTARIO */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 accent-[#0456b3]"
          />

          <span className="font-bold text-[#25364f] text-sm">
            INVENTARIO
          </span>
        </label>

      </div>
    </details>
  </div>

  {/* SEDE */}
  <div className="w-full relative">
    <label className="block text-[12px] uppercase font-black text-[#7184a3] tracking-wide mb-2">
      Sede
    </label>

    <select
      defaultValue={usuarioSeleccionado?.sede}
      className="w-full bg-[#f5f7fb] rounded-[22px]
      px-6 py-5 pr-14
      font-bold text-[#8b97ad]
      outline-none appearance-none
      cursor-pointer border-none"
    >
      <option>LIMA</option>
      <option>AREQUIPA</option>
      <option>TRUJILLO</option>
      <option>CUSCO</option>
    </select>

    {/* FLECHA */}
    <FaChevronDown
      className="absolute right-5 top-[58px]
      text-[13px] text-[#8b97ad]
      pointer-events-none"
    />
  </div>

</div>


        {/* BOTÓN */}
        <button
          className="
            w-full
            mt-6
            bg-[#345ccf]
            hover:bg-[#284dbd]
            text-white
            rounded-2xl
            py-5
            font-black
            tracking-[2px]
            transition-all
          "
        >
          GUARDAR CAMBIOS
        </button>

      </div>

    </div>

  </div>

)}
    </div>

  );
}
