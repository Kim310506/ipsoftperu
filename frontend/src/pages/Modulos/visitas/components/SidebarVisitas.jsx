// src/pages/modulos/visitas/components/SidebarVisitas.jsx

import {
  Home,
  Search,
  Users,
  Calendar,
  Check,
  FileText,
  LogOut,
} from "lucide-react";

export default function SidebarVisitas({
  menuActivo,
  setMenuActivo,
  cerrarSesion,
}) {
  return (
    <aside className="w-[230px] bg-[#244db7] text-white flex flex-col">

      {/* LOGO */}
      <div className="h-[90px] flex items-center justify-center border-b border-white/10">
        <h1 className="text-2xl font-black">
          VISITAS
        </h1>
      </div>

      {/* MENU */}
      <div className="flex-1 py-8 px-5">
        <ul className="space-y-5">

          <li>
            <button
              onClick={() => setMenuActivo("inicio")}
              className={`flex items-center gap-3 font-semibold w-full ${
                menuActivo === "inicio"
                  ? "text-white"
                  : "text-white/70"
              }`}
            >
              <Home size={18} />
              Inicio
            </button>
          </li>

          <li>
            <button
              onClick={() => setMenuActivo("consultas")}
              className={`flex items-center gap-3 font-semibold w-full ${
                menuActivo === "consultas"
                  ? "text-white"
                  : "text-white/70"
              }`}
            >
              <Search size={18} />
              Consultas
            </button>
          </li>

          <li>
            <button
              onClick={() => setMenuActivo("programar")}
              className={`flex items-center gap-3 font-semibold w-full ${
                menuActivo === "programar"
                  ? "text-white"
                  : "text-white/70"
              }`}
            >
              <Calendar size={18} />
              Programar Visitas
            </button>
          </li>

          <li>
            <button
              onClick={() => setMenuActivo("autorizar")}
              className={`flex items-center gap-3 font-semibold w-full ${
                menuActivo === "autorizar"
                  ? "text-white"
                  : "text-white/70"
              }`}
            >
              <Check size={18} />
              Autorizar
            </button>
          </li>

          <li>
            <button
              onClick={() => setMenuActivo("reportes")}
              className={`flex items-center gap-3 font-semibold w-full ${
                menuActivo === "reportes"
                  ? "text-white"
                  : "text-white/70"
              }`}
            >
              <FileText size={18} />
              Reportes
            </button>
          </li>

        </ul>
      </div>

      {/* LOGOUT */}
      <div className="p-5 border-t border-white/10">
        <button
          onClick={cerrarSesion}
          className="flex items-center gap-3 font-semibold"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}