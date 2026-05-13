import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaBuilding,
  FaPenToSquare,
  FaTrash,
  FaPlus,
  FaXmark,
  FaUser,
  FaEnvelope,
  FaLock,
  FaRightFromBracket,
  FaChevronDown
} from "react-icons/fa6";
import { users } from "../data/users";
import { zonales } from "../data/infraestructura";
export default function DashboardAdmin() {
const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const [menuActivo, setMenuActivo] = useState("usuarios");
const [openSidebar, setOpenSidebar] = useState(false);
  const usuarioLogueado = JSON.parse(
    localStorage.getItem("usuario")
  );
const [vistaInfra, setVistaInfra] = useState("menu");

const [sedeSeleccionada, setSedeSeleccionada] = useState(null);
const [pabellonSeleccionado, setPabellonSeleccionado] = useState(null);
const [pisoSeleccionado, setPisoSeleccionado] = useState(null);
const [sedeFiltro, setSedeFiltro] = useState("TODOS");

const [moduloFiltro, setModuloFiltro] = useState("TODOS");
const [openEditModal, setOpenEditModal] = useState(false);
const [openDeleteModal, setOpenDeleteModal] = useState(false);
const sedes = zonales.flatMap((zonal) => zonal.sedes);
const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
const obtenerNombreSede = (id) => {
  const sede = sedes.find((s) => s.id === id);

  return sede ? sede.nombre : "SIN SEDE";
};
const cerrarSesion = () => {

  localStorage.removeItem("usuario");

  navigate("/administracion");

};
const [paginaActual, setPaginaActual] = useState(1);

const usuariosPorPagina = 5;
  return (

    <div className="min-h-screen bg-[#f4f6fb] flex flex-col lg:flex-row">

      {/* SIDEBAR */}
      
{/* BOTÓN HAMBURGUESA SOLO MOBILE */}
<button
  onClick={() => setOpenSidebar(true)}
  className="
    lg:hidden
    fixed
    top-5
    right-5
    z-50
    w-14
    h-14
    rounded-full
    bg-[#345ccf]
    text-white
    flex
    items-center
    justify-center
    shadow-xl
  "
>
  <div className="flex flex-col gap-1">
    <span className="w-6 h-[3px] bg-white rounded-full"></span>
    <span className="w-6 h-[3px] bg-white rounded-full"></span>
    <span className="w-6 h-[3px] bg-white rounded-full"></span>
  </div>
</button>

{/* FONDO OSCURO */}
{openSidebar && (
  <div
    onClick={() => setOpenSidebar(false)}
    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
  />
)}

{/* SIDEBAR */}
<aside
  className={`
    fixed
    top-0
    right-0
    min-h-screen
    w-[290px]
    bg-[#0456b3]
    text-white
    flex
    flex-col
    z-50
    transition-all
    duration-300

    ${
      openSidebar
        ? "translate-x-0"
        : "translate-x-full"
    }

    lg:translate-x-0
    lg:static
    lg:min-h-screen
  `}
>

  {/* CERRAR MOBILE */}
  <button
    onClick={() => setOpenSidebar(false)}
    className="
      lg:hidden
      absolute
      top-5
      right-5
      text-3xl
      text-white
    "
  >
    <FaXmark />
  </button>

  {/* LOGO */}
  <div className="p-10 border-b border-white/10">
    <img
      src="/iconos/logoUSIL.png"
      alt=""
      className="h-16"
    />
  </div>

  {/* PERFIL */}
  <div className="px-8 py-8 border-b border-white/10">

    <div className="flex items-center gap-4">

      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
        <FaUsers className="text-2xl" />
      </div>

      <div>

        <p className="text-xs uppercase opacity-70">
          {usuarioLogueado?.rol}
        </p>

        <h3 className="font-bold text-lg">
          {usuarioLogueado?.nombre}
        </h3>

      </div>

    </div>

  </div>

  {/* MENU */}
  <div className="flex flex-col gap-4 p-5">

    {/* USUARIOS */}
    <button
      onClick={() => {
        setMenuActivo("usuarios");
        setOpenSidebar(false);
      }}
      className={`
        rounded-2xl
        px-5
        py-5
        font-bold
        flex
        items-center
        gap-4
        transition-all

        ${
          menuActivo === "usuarios"
            ? "bg-white text-[#0456b3] shadow-lg"
            : "text-white/80 hover:bg-white/10"
        }
      `}
    >
      <FaUsers />
      USUARIOS
    </button>

    {/* INFRAESTRUCTURA */}
    <button
      onClick={() => {
        setMenuActivo("infraestructura");
        setOpenSidebar(false);
      }}
      className={`
        rounded-2xl
        px-5
        py-5
        font-bold
        flex
        items-center
        gap-4
        transition-all

        ${
          menuActivo === "infraestructura"
            ? "bg-white text-[#0456b3] shadow-lg"
            : "text-white/80 hover:bg-white/10"
        }
      `}
    >
      <FaBuilding />
      INFRAESTRUCTURA
    </button>

  </div>

  {/* CERRAR SESIÓN */}
  <div className="mt-auto p-5">

    <button
      onClick={cerrarSesion}
      className="
        w-full
        bg-white/10
        hover:bg-white
        hover:text-[#0456b3]
        text-white
        py-4
        rounded-2xl
        font-bold
        flex
        items-center
        justify-center
        gap-3
        transition-all
      "
    >
      <FaRightFromBracket />
      CERRAR SESIÓN
    </button>

  </div>

</aside>

      {/* CONTENIDO */}
     <main className="flex-1 p-5 lg:p-10"> 

        {/* ========================= */}
        {/* USUARIOS */}
        {/* ========================= */}

        {menuActivo === "usuarios" && (

          <>

            {/* TOP */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5 mb-10">

              <div>

                <p className="uppercase text-sm tracking-[6px] text-gray-400 font-bold mb-2">
                  Administración
                </p>

                <h1 className="text-2xl lg:text-4xl font-black text-[#0456b3] italic">
                  BIENVENIDO, {usuarioLogueado?.nombre}
                </h1>

              </div>

              <button
                onClick={() => setOpenModal(true)}
                className="
                  bg-[#0456b3]
                  hover:bg-[#034696]
                  text-white
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                  text-sm
                  flex
                  items-center
                  gap-3
                  shadow-xl
                  transition-all
                "
              >
                <FaPlus />
                NUEVO USUARIO
              </button>

            </div>

            {/* FILTROS */}
            <div className="flex flex-col lg:flex-row gap-5 mb-8">

            {/* FILTRO SEDE */}
            <select
                value={sedeFiltro}
                onChange={(e) => setSedeFiltro(e.target.value)}
                className="
                bg-white
                px-5
                py-4
                w-full lg:w-auto
                rounded-2xl
                border
                border-gray-200
                font-bold
                outline-none
                "
            >

                <option value="TODOS">
                TODAS LAS SEDES
                </option>

                {sedes.map((sede) => (

                <option
                    key={sede.id}
                    value={sede.id}
                >
                    {sede.nombre}
                </option>

                ))}

            </select>

            {/* FILTRO MODULO */}
            <select
                value={moduloFiltro}
                onChange={(e) => setModuloFiltro(e.target.value)}
                className="
                bg-white
                w-full lg:w-auto
                px-5
                py-4
                rounded-2xl
                border
                border-gray-200
                font-bold
                outline-none
                "
            >

                <option value="TODOS">
                TODOS LOS MÓDULOS
                </option>

                <option value="CONFIGURACION">
                CONFIGURACION
                </option>

                <option value="EXTINTORES">
                EXTINTORES
                </option>

                <option value="INVENTARIO, EXTINTORES">
                INVENTARIO, EXTINTORES
                </option>

            </select>

            </div>

         {/* CABECERA */}
<div
  className="
    hidden
    xl:grid
    xl:grid-cols-[2.2fr_1fr_1.4fr_1.2fr_0.7fr]
    xl:gap-8
    px-10
    mb-5
    text-gray-400
    font-bold
    text-sm
    uppercase
  "
>

  <p>Usuario</p>
  <p>Rol</p>
  <p>Módulo</p>
  <p>Sede</p>
  <p className="text-right">Acciones</p>

</div>

{/* LISTA */}
<div className="flex flex-col gap-6">

  {
    users
      .filter((user) => {

        const filtroSede =
          sedeFiltro === "TODOS"
            ? true
            : user.sedeId === Number(sedeFiltro);

        const filtroModulo =
          moduloFiltro === "TODOS"
            ? true
            : user.modulo === moduloFiltro;

        return filtroSede && filtroModulo;

      })
      .slice(
        (paginaActual - 1) * usuariosPorPagina,
        paginaActual * usuariosPorPagina
      )
      .map((user, index) => (

        <div
          key={index}
          className="
            bg-white
            rounded-[35px]
            p-5
            xl:p-8
            shadow-sm
            border
            border-gray-100

            flex
            flex-col
            gap-5

            xl:grid
            xl:grid-cols-[2.2fr_1fr_1.4fr_1.2fr_0.7fr]
            xl:gap-8
            xl:items-center
          "
        >

          {/* USUARIO */}
          <div className="flex items-center gap-5 min-w-0">

            <div className="w-14 h-14 rounded-2xl bg-[#eef5ff] flex items-center justify-center flex-shrink-0">
              <FaUsers className="text-[#0456b3]" />
            </div>

            <div className="min-w-0">

              <h3 className="font-black italic text-lg 2xl:text-xl text-[#132238] break-words">
                {user.nombre}
              </h3>

              <p className="text-gray-400 font-semibold break-all text-sm">
                {user.correo}
              </p>

            </div>

          </div>

          {/* ROL */}
          <div>

            <span
              className={`
                px-6
                py-2
                rounded-full
                text-xs
                font-black
                whitespace-nowrap

                ${
                  user.rol === "ADMIN"
                    ? "bg-purple-100 text-purple-600"
                    : user.rol === "INVITADO"
                    ? "bg-gray-200 text-gray-600"
                    : "bg-blue-100 text-[#0456b3]"
                }
              `}
            >
              {user.rol}
            </span>

          </div>

          {/* MODULO */}
          <div>

            <p className="font-black italic text-[#25364f] break-words">
              {user.modulo}
            </p>

          </div>

          {/* SEDE */}
          <div>

            <p className="font-black italic text-[#0456b3] break-words">
              {obtenerNombreSede(user.sedeId)}
            </p>

          </div>

          {/* ACCIONES */}
          <div className="flex xl:justify-end gap-6 text-gray-400 text-xl">

            {/* EDITAR */}
            <button
              onClick={() => {
                setUsuarioSeleccionado(user);
                setOpenEditModal(true);
              }}
              className="hover:text-[#0456b3] transition-all"
            >
              <FaPenToSquare />
            </button>

            {/* ELIMINAR */}
            <button
              onClick={() => {
                setUsuarioSeleccionado(user);
                setOpenDeleteModal(true);
              }}
              className="hover:text-red-500 transition-all"
            >
              <FaTrash />
            </button>

          </div>

        </div>

      ))
  }

</div>

{/* PAGINACIÓN */}
<div className="flex justify-center items-center gap-3 mt-10 flex-wrap">

  <button
    onClick={() =>
      setPaginaActual((prev) =>
        prev > 1 ? prev - 1 : prev
      )
    }
    className="
      px-5
      py-3
      rounded-2xl
      bg-white
      border
      border-gray-200
      font-bold
      hover:bg-[#0456b3]
      hover:text-white
      transition-all
    "
  >
    ← Anterior
  </button>

  {Array.from({
    length: Math.ceil(
      users.filter((user) => {

        const filtroSede =
          sedeFiltro === "TODOS"
            ? true
            : user.sedeId === Number(sedeFiltro);

        const filtroModulo =
          moduloFiltro === "TODOS"
            ? true
            : user.modulo === moduloFiltro;

        return filtroSede && filtroModulo;

      }).length / usuariosPorPagina
    ),
  }).map((_, index) => (

    <button
      key={index}
      onClick={() => setPaginaActual(index + 1)}
      className={`
        w-12
        h-12
        rounded-2xl
        font-black
        transition-all

        ${
          paginaActual === index + 1
            ? "bg-[#0456b3] text-white"
            : "bg-white border border-gray-200 text-[#132238]"
        }
      `}
    >
      {index + 1}
    </button>

  ))}

  <button
    onClick={() =>
      setPaginaActual((prev) =>
        prev <
        Math.ceil(
          users.filter((user) => {

            const filtroSede =
              sedeFiltro === "TODOS"
                ? true
                : user.sedeId === Number(sedeFiltro);

            const filtroModulo =
              moduloFiltro === "TODOS"
                ? true
                : user.modulo === moduloFiltro;

            return filtroSede && filtroModulo;

          }).length / usuariosPorPagina
        )
          ? prev + 1
          : prev
      )
    }
    className="
      px-5
      py-3
      rounded-2xl
      bg-white
      border
      border-gray-200
      font-bold
      hover:bg-[#0456b3]
      hover:text-white
      transition-all
    "
  >
    Siguiente →
  </button>

</div>
          </>

        )}
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
{/* ========================= */}
{/* MODAL ELIMINAR */}
{/* ========================= */}

{openDeleteModal && (

  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-5">

    <div className="bg-white w-full max-w-md rounded-[35px] p-10 shadow-2xl text-center relative">

      {/* CERRAR */}
      <button
        onClick={() => setOpenDeleteModal(false)}
        className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-black"
      >
        <FaXmark />
      </button>

      {/* ICONO */}
      <div className="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-8">

        <FaTrash className="text-4xl text-red-500" />

      </div>

      {/* TEXTO */}
      <h1 className="text-3xl font-black text-[#132238] mb-4">
        ELIMINAR USUARIO
      </h1>

      <p className="text-gray-500 font-semibold leading-relaxed">
        ¿Deseas eliminar a
        <span className="font-black text-[#132238]">
          {" "} {usuarioSeleccionado?.nombre}
        </span>?
      </p>

      {/* BOTONES */}
      <div className="grid grid-cols-2 gap-4 mt-10">

        <button
          onClick={() => setOpenDeleteModal(false)}
          className="
            bg-gray-100
            hover:bg-gray-200
            py-4
            rounded-2xl
            font-black
            transition-all
          "
        >
          CANCELAR
        </button>

        <button
          className="
            bg-red-500
            hover:bg-red-600
            text-white
            py-4
            rounded-2xl
            font-black
            transition-all
          "
        >
          ELIMINAR
        </button>

      </div>

    </div>

  </div>

)}
        {/* ========================= */}
        {/* INFRAESTRUCTURA */}
        {/* ========================= */}

        {menuActivo === "infraestructura" && (

  <>

    {/* ======================= */}
    {/* MENU PRINCIPAL */}
    {/* ======================= */}

    {vistaInfra === "menu" && (

      <>

        <p className="uppercase text-sm tracking-[6px] text-gray-400 font-bold mb-2">
          Sistema ICURA
        </p>

        <h1 className="text-3xl lg:text-5xl font-black italic text-[#132238] mb-10">
          BIENVENIDO, {usuarioLogueado?.nombre}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {/* zonal */}
          <div
            onClick={() => setVistaInfra("zonal")}
            className="bg-white rounded-[35px] p-8 shadow-md hover:scale-105 transition-all cursor-pointer"
          >

            <div className="w-16 h-16 rounded-2xl bg-[#eef5ff] flex items-center justify-center mb-8">
              <FaBuilding className="text-2xl text-[#0456b3]" />
            </div>

            <h2 className="text-3xl font-black italic text-[#132238]">
              ZONAL
            </h2>

            <p className="mt-3 text-[#0456b3] font-black text-sm tracking-[2px] uppercase">
              Ver zonales
            </p>

          </div>

          {/* SEDES */}
          <div
            onClick={() => setVistaInfra("sedes")}
            className="bg-white rounded-[35px] p-8 shadow-md hover:scale-105 transition-all cursor-pointer"
          >

            <div className="w-16 h-16 rounded-2xl bg-[#eef5ff] flex items-center justify-center mb-8">
              <FaBuilding className="text-2xl text-[#0456b3]" />
            </div>

            <h2 className="text-3xl font-black italic text-[#132238]">
              SEDES
            </h2>

            <p className="mt-3 text-[#0456b3] font-black text-sm tracking-[2px] uppercase">
              Ver sedes
            </p>

          </div>

          {/* PABELLONES */}
          <div
            onClick={() => setVistaInfra("listaPabellones")}
            className="bg-white rounded-[35px] p-8 shadow-md hover:scale-105 transition-all cursor-pointer"
          >

            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-8">
              <FaBuilding className="text-2xl text-orange-500" />
            </div>

            <h2 className="text-3xl font-black italic text-[#132238]">
              PABELLONES
            </h2>

            <p className="mt-3 text-orange-500 font-black text-sm tracking-[2px] uppercase">
              Lista global
            </p>

          </div>

          {/* PISOS */}
          <div
            onClick={() => setVistaInfra("listaPisos")}
            className="bg-white rounded-[35px] p-8 shadow-md hover:scale-105 transition-all cursor-pointer"
          >

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-8">
              <FaBuilding className="text-2xl text-green-500" />
            </div>

            <h2 className="text-3xl font-black italic text-[#132238]">
              PISOS
            </h2>

            <p className="mt-3 text-green-500 font-black text-sm tracking-[2px] uppercase">
              Lista global
            </p>

          </div>

          {/* AMBIENTES */}
          <div
            onClick={() => setVistaInfra("listaAmbientes")}
            className="bg-white rounded-[35px] p-8 shadow-md hover:scale-105 transition-all cursor-pointer"
          >

            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-8">
              <FaBuilding className="text-2xl text-purple-500" />
            </div>

            <h2 className="text-3xl font-black italic text-[#132238]">
              AMBIENTES
            </h2>

            <p className="mt-3 text-purple-500 font-black text-sm tracking-[2px] uppercase">
              Lista global
            </p>

          </div>

        </div>

      </>

    )}
{/* ======================= */}
{/* ZONALES */}
{/* ======================= */}

{vistaInfra === "zonal" && (

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

)}
    {/* ======================= */}
{/* SEDES */}
{/* ======================= */}

{vistaInfra === "sedes" && (

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

)}

    {/* PABELLONES */}
{vistaInfra === "pabellones" && (

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

)}

 {/* PISOS */}
{vistaInfra === "pisos" && (

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

)}
  {/* AMBIENTES */}
{vistaInfra === "ambientes" && (

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

)}


    {/* ======================= */}
    {/* LISTA GLOBAL PABELLONES */}
    {/* ======================= */}

    {/* ======================= */}
{/* LISTA GLOBAL PABELLONES */}
{/* ======================= */}

{vistaInfra === "listaPabellones" && (

  <>

    {/* HEADER */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

      <div>

        <button
          onClick={() => setVistaInfra("menu")}
          className="mb-5 text-[#7184a3] font-black"
        >
          ← VOLVER
        </button>

        <h1 className="text-3xl lg:text-5xl font-black italic text-[#132238]">
          PABELLONES
        </h1>

      </div>

      {/* FILTROS */}
      <div className="flex flex-col lg:flex-row gap-4">

        {/* BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar pabellón..."
          className="
            bg-white
            px-5
            py-4
            rounded-2xl
            border
            border-gray-200
            outline-none
            font-bold
            w-full lg:w-[280px]
          "
        />

        {/* FILTRO SEDE */}
        <select
          className="
            bg-white
            px-5
            py-4
            rounded-2xl
            border
            border-gray-200
            outline-none
            font-bold
          "
        >

          <option>
            TODAS LAS SEDES
          </option>

          {sedes.map((sede) => (

            <option key={sede.id}>
              {sede.nombre}
            </option>

          ))}

        </select>

      </div>

    </div>

    {/* CABECERA */}
    <div
      className="
        hidden
        xl:grid
        xl:grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr]
        gap-8
        px-8
        mb-5
        text-gray-400
        font-black
        text-sm
        uppercase
      "
    >

      <p>Pabellón</p>
      <p>Sede</p>
      <p>Pisos</p>
      <p>Ambientes</p>
      <p className="text-right">
        Acción
      </p>

    </div>

    {/* LISTA */}
    <div className="flex flex-col gap-5">

      {sedes.flatMap((sede) =>

        sede.pabellones.map((pabellon) => (

          <div
            key={pabellon.id}
            className="
              bg-white
              rounded-[30px]
              p-6
              shadow-sm
              border
              border-gray-100

              flex
              flex-col
              gap-5

              xl:grid
              xl:grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr]
              xl:items-center
              xl:gap-8
            "
          >

            {/* PABELLON */}
            <div>

              <h2 className="text-2xl font-black italic text-[#132238]">
                {pabellon.nombre}
              </h2>

              <p className="text-sm text-[#8a9aba] font-bold uppercase mt-2">
                Infraestructura
              </p>

            </div>

            {/* SEDE */}
            <div>

              <span
                className="
                  bg-orange-100
                  text-orange-600
                  px-5
                  py-2
                  rounded-full
                  text-xs
                  font-black
                "
              >
                {sede.nombre}
              </span>

            </div>

            {/* PISOS */}
            <div>

              <p className="font-black text-[#132238] text-lg">
                {pabellon.pisos.length}
              </p>

            </div>

            {/* AMBIENTES */}
            <div>

              <p className="font-black text-[#0456b3] text-lg">

                {
                  pabellon.pisos.reduce(
                    (acc, piso) =>
                      acc + piso.ambientes.length,
                    0
                  )
                }

              </p>

            </div>

            {/* BOTON */}
            <div className="flex xl:justify-end">

              <button
                onClick={() => {
                  setPabellonSeleccionado(pabellon);
                  setVistaInfra("pisos");
                }}
                className="
                  bg-[#0456b3]
                  hover:bg-[#034696]
                  text-white
                  px-5
                  py-3
                  rounded-2xl
                  font-black
                  transition-all
                "
              >
                VER
              </button>

            </div>

          </div>

        ))

      )}

    </div>

  </>

)}

    {/* ======================= */}
    {/* LISTA GLOBAL PISOS */}
    {/* ======================= */}

    {vistaInfra === "listaPisos" && (

      <>

        <button
          onClick={() => setVistaInfra("menu")}
          className="mb-8 text-[#7184a3] font-black"
        >
          ← VOLVER
        </button>

        <h1 className="text-3xl lg:text-5xl font-black italic text-[#132238] mb-10">
          PISOS
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {sedes.flatMap((sede) =>
            sede.pabellones.flatMap((pabellon) =>
              pabellon.pisos.map((piso) => (

                <div
                  key={piso.id}
                  className="bg-white rounded-[35px] p-8 shadow-md"
                >

                  <h2 className="text-3xl font-black italic text-[#132238]">
                    {piso.nombre}
                  </h2>

                  <p className="mt-3 text-green-500 font-black text-sm uppercase">
                    {pabellon.nombre}
                  </p>

                </div>

              ))
            )
          )}

        </div>

      </>

    )}

    {/* ======================= */}
    {/* LISTA GLOBAL AMBIENTES */}
    {/* ======================= */}

    {vistaInfra === "listaAmbientes" && (

      <>

        <button
          onClick={() => setVistaInfra("menu")}
          className="mb-8 text-[#7184a3] font-black"
        >
          ← VOLVER
        </button>

        <h1 className="text-3xl lg:text-5xl font-black italic text-[#132238] mb-10">
          AMBIENTES
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {sedes.flatMap((sede) =>
            sede.pabellones.flatMap((pabellon) =>
              pabellon.pisos.flatMap((piso) =>
                piso.ambientes.map((ambiente) => (

                  <div
                    key={ambiente.id}
                    className="bg-white rounded-[35px] p-8 shadow-md"
                  >

                    <h2 className="text-3xl font-black italic text-[#132238]">
                      {ambiente.nombre}
                    </h2>

                    <p className="mt-3 text-purple-500 font-black text-sm uppercase">
                      {piso.nombre}
                    </p>

                  </div>

                ))
              )
            )
          )}

        </div>

      </>

    )}

  </>

)}

      </main>

      {/* ========================= */}
      {/* MODAL CREAR*/}
      {/* ========================= */}

      {openModal && (
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

      {/* BOTÓN CERRAR */}
      <button
        onClick={() => setOpenModal(false)}
        className="absolute top-7 right-7 text-3xl text-gray-400 hover:text-black transition"
      >
        <FaXmark />
      </button>

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#1d2b4f]">
          REGISTRAR USUARIO
        </h1>

        <p className="text-sm uppercase tracking-[3px] text-gray-400 font-bold mt-2">
          Nuevo acceso al sistema iCURA
        </p>
      </div>

      {/* FORM */}
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
              placeholder="Ej. Juan Pérez"
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
              placeholder="usuario@ips.com"
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
              placeholder="••••••••"
              className="w-full bg-transparent p-5 outline-none font-semibold"
            />
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

         {/* ROL */}
          <div className="w-full relative">
            <label className="block text-[12px] uppercase font-black text-[#7184a3] tracking-wide mb-2">
              Rol
            </label>

            <select
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
      className="list-none bg-[#f5f7fb] rounded-[22px] px-6 py-5
      font-bold text-[#8b97ad] cursor-pointer select-none
      flex items-center justify-between"
    >
      <span>Seleccionar módulos</span>

      <FaChevronDown
        className="text-[13px] text-[#8b97ad]
        transition-transform duration-300 group-open:rotate-180"
      />
    </summary>

    {/* OPCIONES */}
    <div
      className="absolute mt-3 w-full bg-white rounded-[24px]
      shadow-[0_10px_35px_rgba(0,0,0,0.08)]
      border border-[#edf1f7]
      p-5 flex flex-col gap-5 z-50"
    >
      
      {/* USUARIOS */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          className="w-5 h-5 accent-[#0456b3]"
        />

        <span className="font-bold text-[#25364f] text-sm">
          USUARIOS
        </span>
      </label>

      {/* UBICACIONES */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          className="w-5 h-5 accent-[#0456b3]"
        />

        <span className="font-bold text-[#25364f] text-sm">
          UBICACIONES
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
    className="w-full bg-[#f5f7fb] rounded-[22px] px-6 py-5 pr-14
    font-bold text-[#8b97ad] outline-none appearance-none
    cursor-pointer border-none"
  >
    <option>LIMA</option>
    <option>AREQUIPA</option>
    <option>TRUJILLO</option>
    <option>CUSCO</option>
  </select>

  {/* FLECHA */}
  <FaChevronDown
    className="absolute right-5 top-[58px] text-[13px] text-[#8b97ad] pointer-events-none"
  />
</div>
        </div>

        {/* BOTÓN */}
        <button
          className="w-full mt-6 bg-[#345ccf] hover:bg-[#284dbd] text-white rounded-2xl py-5 font-black tracking-[2px] transition-all"
        >
          CREAR USUARIO
        </button>

      </div>
    </div>
  </div>
)}
    </div>

  );
}

