import {
  FaUsers,
  FaBuilding,
  FaRightFromBracket,
  FaXmark,
  FaSitemap
} from "react-icons/fa6";

export default function SidebarAdmin({
  openSidebar,
  setOpenSidebar,
  menuActivo,
  setMenuActivo,
  usuarioLogueado,
  cerrarSesion
}) {

  return (
    <>

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
          <button
            onClick={() => {
              setMenuActivo("uunn");
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
                menuActivo === "uunn"
                  ? "bg-white text-[#0456b3] shadow-lg"
                  : "text-white/80 hover:bg-white/10"
              }
            `}
          >
            <FaSitemap/>
            UNIDAD DE NEGOCIO
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

    </>
  );
}