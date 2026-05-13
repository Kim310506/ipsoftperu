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
  FaRightFromBracket
} from "react-icons/fa6";

import { users } from "../data/users";
import { sedes } from "../data/infraestructura";
export default function DashboardAdmin() {
const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const [menuActivo, setMenuActivo] = useState("usuarios");

  const usuarioLogueado = JSON.parse(
    localStorage.getItem("usuario")
  );
const [vistaInfra, setVistaInfra] = useState("menu");

const [sedeSeleccionada, setSedeSeleccionada] = useState(null);
const [pabellonSeleccionado, setPabellonSeleccionado] = useState(null);
const [pisoSeleccionado, setPisoSeleccionado] = useState(null);
const [sedeFiltro, setSedeFiltro] = useState("TODOS");

const [moduloFiltro, setModuloFiltro] = useState("TODOS");

const obtenerNombreSede = (id) => {
  const sede = sedes.find((s) => s.id === id);

  return sede ? sede.nombre : "SIN SEDE";
};
const cerrarSesion = () => {

  localStorage.removeItem("usuario");

  navigate("/administracion");

};
  return (

    <div className="min-h-screen bg-[#f4f6fb] flex">

      {/* SIDEBAR */}
      <aside className="w-[290px] bg-[#0456b3] min-h-screen text-white flex flex-col">

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
            onClick={() => setMenuActivo("usuarios")}
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
            onClick={() => setMenuActivo("infraestructura")}
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
{/* BOTÓN CERRAR SESIÓN */}
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
      <main className="flex-1 p-10">

        {/* ========================= */}
        {/* USUARIOS */}
        {/* ========================= */}

        {menuActivo === "usuarios" && (

          <>

            {/* TOP */}
            <div className="flex justify-between items-start mb-10">

              <div>

                <p className="uppercase text-sm tracking-[6px] text-gray-400 font-bold mb-2">
                  Administración
                </p>

                <h1 className="text-4xl font-black text-[#0456b3] italic">
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
            <div className="flex gap-5 mb-8">

            {/* FILTRO SEDE */}
            <select
                value={sedeFiltro}
                onChange={(e) => setSedeFiltro(e.target.value)}
                className="
                bg-white
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
            <div className="grid grid-cols-5 px-10 mb-5 text-gray-400 font-bold text-sm uppercase">

            <p>Usuario</p>
            <p>Rol</p>
            <p>Módulo</p>
            <p>Sede</p>
            <p className="text-right">Acciones</p>

            </div>

            {/* LISTA */}
            <div className="flex flex-col gap-6">

              {users

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

  .map((user, index) => (

                <div
                  key={index}
                  className="
                    bg-white
                    rounded-[35px]
                    p-8
                    shadow-sm
                    border
                    border-gray-100
                    grid
                    grid-cols-5
                    items-center
                  "
                >

                  {/* USUARIO */}
                  <div className="flex items-center gap-5">

                    <div className="w-14 h-14 rounded-2xl bg-[#eef5ff] flex items-center justify-center">
                      <FaUsers className="text-[#0456b3]" />
                    </div>

                    <div>

                      <h3 className="font-black italic text-xl text-[#132238]">
                        {user.nombre}
                      </h3>

                      <p className="text-gray-400 font-semibold">
                        {user.correo}
                      </p>

                    </div>

                  </div>

                  {/* ROL */}
                  <div>

                    <span
                      className={`
                        px-6 py-2 rounded-full text-xs font-black
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

                    <p className="font-black italic text-[#25364f]">
                      {user.modulo}
                    </p>

                  </div>
                    {/* SEDE */}
                    <div>

                    <p className="font-black italic text-[#0456b3]">
                        {obtenerNombreSede(user.sedeId)}
                    </p>

                    </div>
                  {/* ACCIONES */}
                  <div className="flex justify-end gap-6 text-gray-400 text-xl">

                    <button className="hover:text-[#0456b3] transition-all">
                      <FaPenToSquare />
                    </button>

                    <button className="hover:text-red-500 transition-all">
                      <FaTrash />
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </>

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

        <h1 className="text-5xl font-black italic text-[#132238] mb-10">
          BIENVENIDO, {usuarioLogueado?.nombre}
        </h1>

        <div className="grid grid-cols-4 gap-8">

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
    {/* SEDES */}
    {/* ======================= */}

     {/* SEDES */}
    {vistaInfra === "sedes" && (

      <>

        <button
          onClick={() => setVistaInfra("menu")}
          className="mb-8 text-[#7184a3] font-black"
        >
          ← VOLVER AL MENÚ
        </button>

        <p className="uppercase text-sm tracking-[6px] text-gray-400 font-bold mb-2">
          Gestión de sedes
        </p>

        <h1 className="text-5xl font-black italic text-[#132238] mb-10">
          SEDES
        </h1>

        <div className="grid grid-cols-3 gap-8">

          {sedes.map((sede) => (

            <div
              key={sede.id}
              onClick={() => {
                setSedeSeleccionada(sede);
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

        <h1 className="text-5xl font-black italic text-[#132238] mb-10">
          {sedeSeleccionada?.nombre}
        </h1>

        <div className="grid grid-cols-3 gap-8">

          {sedeSeleccionada?.pabellones.map((pabellon) => (

            <div
              key={pabellon.id}
              onClick={() => {
                setPabellonSeleccionado(pabellon);
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

        <h1 className="text-5xl font-black italic text-[#132238] mb-10">
          {pabellonSeleccionado?.nombre}
        </h1>

        <div className="grid grid-cols-3 gap-8">

          {pabellonSeleccionado?.pisos.map((piso) => (

            <div
              key={piso.id}
              onClick={() => {
                setPisoSeleccionado(piso);
                setVistaInfra("ambientes");
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

        <h1 className="text-5xl font-black italic text-[#132238] mb-10">
          {pisoSeleccionado?.nombre}
        </h1>

        <div className="grid grid-cols-3 gap-8">

          {pisoSeleccionado?.ambientes.map((ambiente) => (

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

    {vistaInfra === "listaPabellones" && (

      <>

        <button
          onClick={() => setVistaInfra("menu")}
          className="mb-8 text-[#7184a3] font-black"
        >
          ← VOLVER
        </button>

        <h1 className="text-5xl font-black italic text-[#132238] mb-10">
          PABELLONES
        </h1>

        <div className="grid grid-cols-3 gap-8">

          {sedes.flatMap((sede) =>
            sede.pabellones.map((pabellon) => (

              <div
                key={pabellon.id}
                className="bg-white rounded-[35px] p-8 shadow-md"
              >

                <h2 className="text-3xl font-black italic text-[#132238]">
                  {pabellon.nombre}
                </h2>

                <p className="mt-3 text-orange-500 font-black text-sm uppercase">
                  {sede.nombre}
                </p>

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

        <h1 className="text-5xl font-black italic text-[#132238] mb-10">
          PISOS
        </h1>

        <div className="grid grid-cols-3 gap-8">

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

        <h1 className="text-5xl font-black italic text-[#132238] mb-10">
          AMBIENTES
        </h1>

        <div className="grid grid-cols-3 gap-8">

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
      {/* MODAL */}
      {/* ========================= */}

      {openModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-5">
    
    <div className="bg-white w-full max-w-2xl rounded-[40px] p-10 relative shadow-2xl">

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* ROL */}
          <div>
            <label className="text-xs uppercase font-black text-[#7184a3]">
              Rol
            </label>

            <select
              className="mt-3 w-full bg-[#f5f7fb] rounded-2xl p-5 font-bold outline-none"
            >
              <option>USUARIO</option>
              <option>ADMIN</option>
              <option>INVITADO</option>
            </select>
          </div>

          {/* ACCESOS */}
          <div className="relative">
            <label className="text-xs uppercase font-black text-[#7184a3]">
              Accesos
            </label>

            <details className="mt-3">
              
              {/* SELECT */}
              <summary
                className="list-none bg-[#f5f7fb] rounded-2xl p-5 font-bold text-[#7184a3] cursor-pointer select-none"
              >
                Seleccionar accesos...
              </summary>

              {/* OPCIONES */}
              <div
                className="absolute mt-3 w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-5 flex flex-col gap-4 z-50"
              >
                
                {/* USUARIOS */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-[#0456b3]"
                  />

                  <span className="font-bold text-[#25364f]">
                    USUARIOS
                  </span>
                </label>

                {/* UBICACIONES */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-[#0456b3]"
                  />

                  <span className="font-bold text-[#25364f]">
                    UBICACIONES
                  </span>
                </label>
              </div>
            </details>
          </div>

          {/* SEDE */}
          <div>
            <label className="text-xs uppercase font-black text-[#7184a3]">
              Sede
            </label>

            <select
              className="mt-3 w-full bg-[#f5f7fb] rounded-2xl p-5 font-bold outline-none"
            >
              <option>LIMA</option>
              <option>AREQUIPA</option>
              <option>TRUJILLO</option>
              <option>CUSCO</option>
            </select>
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

