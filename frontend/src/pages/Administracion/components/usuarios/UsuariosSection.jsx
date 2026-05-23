import {
  FaUsers,
  FaPenToSquare,
  FaTrash,
  FaPlus
} from "react-icons/fa6";

export default function UsuariosSection(props) {

  const {
    menuActivo,
    usuarioLogueado,
    setOpenModal,
    sedeFiltro,
    setSedeFiltro,
    moduloFiltro,
    setModuloFiltro,
    sedes,
    users,
    paginaActual,
    setPaginaActual,
    usuariosPorPagina,
    obtenerNombreSede,
    setUsuarioSeleccionado,
    setOpenEditModal,
    setOpenDeleteModal
  } = props;

  return (
    <>
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
                <option value="ADMIN">
                ADMIN
                </option>
                <option value="VISITAS">
                VISITAS
                </option>

                <option value="PROVEEDORES">
                PROVEEDORES
                </option>
                <option value="INCIDENTES">
                INCIDENTES
                </option>
                 <option value="INVENTARIOS">
                INVENTARIOS
                </option> 
                <option value="EXTINTORES">
                EXTINTORES
                </option>
                <option value="MANTENIMIENTO">
                MANTENIMIENTO
                </option>
                <option value="RIESGO">
                RIESGO
                </option>
                <option value="SISMO">
                SISMO
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
            : user.modulo?.split(",").includes(moduloFiltro);

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
    </>
  );
}
