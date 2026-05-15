import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  FileText,
  LogIn
} from "lucide-react";

/* ========================= */
/* DATA */
/* ========================= */

const normativas = [
  {
    title: "Normativa Corporativa Seguridad",
    url: "https://ipsoftperu.com/usil/documentos/normativas%20de%20seguridad/20130613_Normativa_Corporativa_de_Seguridad.pdf"
  },
  {
    title: "Acta entrega normativas TDP",
    url: "https://ipsoftperu.com/usil/documentos/normativas%20de%20seguridad/Acta_de_entrega_de_normativas_de_TDP.pdf"
  },
  {
    title: "Politica Global Seguridad",
    url: "https://ipsoftperu.com/usil/documentos/normativas%20de%20seguridad/Politica_Global_de_Seguridad_Edicion_2.pdf"
  },
  {
    title: "Reglamento Control Acceso",
    url: "https://ipsoftperu.com/usil/documentos/normativas%20de%20seguridad/Reglamento_de_Control_de_Acceso_Edicion1_Agosto2017.pdf"
  }
];

const evacuacion = [
  "LOCAL 01 VF",
  "LOCAL 02 VF",
  "LOCAL 03 VF",
  "LOCAL 04 VF"
];

const extintores = [
  "LOCAL 01",
  "LOCAL 02",
  "LOCAL 03",
  "LOCAL 04"
];

/* ========================= */
/* COMPONENT */
/* ========================= */

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null);

  const toggleMobileMenu = (menu) => {
    setActiveMobileMenu(
      activeMobileMenu === menu ? null : menu
    );
  };

  const renderPdfCard = (title, url = "#") => (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="block group h-full"
    >
      <div className="border rounded-lg p-4 h-full shadow hover:shadow-lg transition bg-white flex flex-col items-center justify-center text-center">
        <div className="mb-2 text-blue-600">
          <FileText size={28} />
        </div>

        <span className="font-medium text-gray-700 group-hover:text-blue-600 transition text-xs">
          {title}
        </span>
      </div>
    </a>
  );

  return (
    <>
      {/* NAVBAR DESKTOP */}
      <nav className="w-full bg-[#3a48da] text-white shadow-md relative z-40">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-6 md:px-12 py-4">

          {/* LOGO */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-3">
              <img
                src="/iconos/logoUSIL.png"
                alt="Logo USIL"
                className="h-[40px] md:h-[60px] object-contain"
              />
            </a>
          </div>

          {/* BUTTON MOBILE */}
          <button
            className="md:hidden border border-white/30 p-2 rounded"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* MENU DESKTOP */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-10 text-xs font-bold tracking-wide">

              {/* NOSOTROS */}
              <li className="relative group py-4">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition">
                  NOSOTROS
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform"
                  />
                </div>

                <div className="absolute top-full left-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="bg-white rounded-lg shadow-xl border-t-4 border-[#263398] overflow-hidden">

                    <a
                      href="https://usil.edu.pe/nosotros/mision-vision/"
                      target="_blank"
                      rel="noreferrer"
                      className="block px-4 py-3 hover:bg-gray-50"
                    >
                      <div className="text-[#3a48da] font-bold text-sm mb-1">
                        Propósito, misión y visión
                      </div>

                      <div className="text-gray-500 text-[11px]">
                        Conoce nuestro compromiso, valores e idearios
                      </div>
                    </a>

                  </div>
                </div>
              </li>

              {/* NORMATIVAS */}
              <li className="relative group py-4">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition">
                  NORMATIVAS
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform"
                  />
                </div>

                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

                  <div className="bg-gray-100 rounded shadow-2xl border-t-4 border-[#263398] p-8">

                    <h5 className="font-bold text-[#3a48da] text-sm mb-4 border-b border-gray-300 pb-2">
                      NORMATIVAS
                    </h5>

                    <div className="grid grid-cols-4 gap-4">
                      {normativas.map((pdf, idx) => (
                        <div key={idx}>
                          {renderPdfCard(pdf.title, pdf.url)}
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </li>

              {/* EVACUACION */}
              <li className="relative group py-4">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition">
                  PLANOS EVACUACION
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform"
                  />
                </div>

                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

                  <div className="bg-gray-100 rounded shadow-2xl border-t-4 border-[#263398] p-8">

                    <h5 className="font-bold text-[#3a48da] text-sm mb-4 border-b border-gray-300 pb-2">
                      PLANOS DE EVACUACIÓN
                    </h5>

                    <div className="grid grid-cols-4 gap-4">
                      {evacuacion.map((item, idx) => (
                        <div key={idx}>
                          {renderPdfCard(`PLANOS ${item}`)}
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </li>

              {/* EXTINTORES */}
              <li className="relative group py-4">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-200 transition">
                  PLANOS EXTINTORES
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform"
                  />
                </div>

                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

                  <div className="bg-gray-100 rounded shadow-2xl border-t-4 border-[#263398] p-8">

                    <h5 className="font-bold text-[#3a48da] text-sm mb-4 border-b border-gray-300 pb-2">
                      PLANOS EXTINTORES
                    </h5>

                    <div className="grid grid-cols-4 gap-4">
                      {extintores.map((item, idx) => (
                        <div key={idx}>
                          {renderPdfCard(`PLANOS ${item}`)}
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </li>

              {/* ADMIN */}
              <li>
                <Link
                  to="/administracion"
                  className="bg-[#263398] hover:bg-[#1a237e] transition px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg"
                >
                  <LogIn size={16} />
                  ADMINISTRACIÓN
                </Link>
              </li>

              {/* VIDEO */}
              <li>
                <a
                  href="https://www.youtube.com/watch?v=rk0Zz16yISg"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#263398] hover:bg-[#1a237e] transition px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg"
                >
                  <ArrowRight size={16} />
                  VIDEOS SEGURIDAD
                </a>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 bg-[#263398] z-50 transform ${
          isMenuOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >

        <div className="flex justify-between items-center p-6 border-b border-white/20">
          <img
            src="/iconos/logoUSIL.png"
            alt="Logo"
            className="h-[35px]"
          />

          <button
            onClick={() => setIsMenuOpen(false)}
            className="border border-white/30 p-2 rounded"
          >
            <X size={24} />
          </button>
        </div>
       ```jsx
{/* Navbar Mobile Premium */}
<div
  className={`
    fixed inset-0 z-50 md:hidden
    bg-gradient-to-br from-[#1a237e] via-[#263398] to-[#0f172a]
    transform
    ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
    transition-all duration-500 ease-in-out
    flex flex-col overflow-hidden
  `}
>

  {/* EFECTOS */}
  <div className="absolute top-[-120px] right-[-120px] w-[260px] h-[260px] bg-white/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-[-120px] left-[-120px] w-[260px] h-[260px] bg-blue-400/10 rounded-full blur-3xl"></div>

  {/* HEADER */}
  <div className="relative flex justify-between items-center px-6 py-5 border-b border-white/10 backdrop-blur-xl">

    <div className="flex items-center gap-3">
      <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-xl">
        <img
          src="iconos/logoUSIL.png"
          alt="Logo USIL"
          className="h-[38px] object-contain"
        />
      </div>

      <div>
        <h1 className="text-white font-black text-lg tracking-wide">
          iCURA
        </h1>

        <p className="text-white/60 text-[11px] uppercase tracking-[3px]">
          Seguridad Integral
        </p>
      </div>
    </div>

    <button
      onClick={() => setIsMenuOpen(false)}
      className="
        text-white
        bg-white/10
        border border-white/10
        p-3
        rounded-2xl
        hover:bg-white/20
        transition-all
        duration-300
        active:scale-95
      "
    >
      <X size={22} />
    </button>

  </div>

  {/* CONTENIDO */}
  <div className="relative flex-1 overflow-y-auto px-6 py-6 text-white">

    {/* NOSOTROS */}
    <div className="mb-4 rounded-3xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-xl">

      <button
        onClick={() => toggleMobileMenu('nosotros')}
        className="
          w-full flex justify-between items-center
          px-5 py-5
          text-sm font-black tracking-wide uppercase
        "
      >
        Nosotros

        <ChevronDown
          size={20}
          className={`
            transition-transform duration-300
            ${activeMobileMenu === 'nosotros' ? 'rotate-180' : ''}
          `}
        />
      </button>

      {activeMobileMenu === 'nosotros' && (
        <div className="px-5 pb-5 flex flex-col gap-3 animate-fadeIn">

          <a
            href="https://usil.edu.pe/nosotros/mision-vision/"
            className="
              text-sm text-white/70
              hover:text-white
              transition
              flex items-center gap-3
            "
          >
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            Propósito, misión y visión
          </a>

        </div>
      )}

    </div>

    {/* NORMATIVAS */}
    <div className="mb-4 rounded-3xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-xl">

      <button
        onClick={() => toggleMobileMenu('normativas')}
        className="
          w-full flex justify-between items-center
          px-5 py-5
          text-sm font-black tracking-wide uppercase
        "
      >
        Normativas

        <ChevronDown
          size={20}
          className={`
            transition-transform duration-300
            ${activeMobileMenu === 'normativas' ? 'rotate-180' : ''}
          `}
        />
      </button>

      {activeMobileMenu === 'normativas' && (
        <div className="px-5 pb-5 flex flex-col gap-4">

          {normativas.map((n, i) => (
            <a
              key={i}
              href={n.url}
              className="
                text-[13px]
                text-white/70
                hover:text-white
                transition-all
                leading-relaxed
                flex items-start gap-3
                group
              "
            >
              <div className="bg-blue-500/20 p-2 rounded-xl group-hover:bg-blue-500/30 transition">
                <FileText size={15} />
              </div>

              <span>{n.title}</span>
            </a>
          ))}

        </div>
      )}

    </div>

    {/* EVACUACION */}
    <div className="mb-4 rounded-3xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-xl">

      <button
        onClick={() => toggleMobileMenu('evacuacion')}
        className="
          w-full flex justify-between items-center
          px-5 py-5
          text-sm font-black tracking-wide uppercase
        "
      >
        Planos Evacuación

        <ChevronDown
          size={20}
          className={`
            transition-transform duration-300
            ${activeMobileMenu === 'evacuacion' ? 'rotate-180' : ''}
          `}
        />
      </button>

      {activeMobileMenu === 'evacuacion' && (
        <div className="px-5 pb-5 flex flex-col gap-4">

          {evacuacion.map((e, i) => (
            <a
              key={i}
              href="#"
              className="
                text-[13px]
                text-white/70
                hover:text-white
                transition-all
                flex items-center gap-3
                group
              "
            >
              <div className="bg-green-500/20 p-2 rounded-xl group-hover:bg-green-500/30 transition">
                <FileText size={15} />
              </div>

              <span>Planos {e}</span>
            </a>
          ))}

        </div>
      )}

    </div>

    {/* EXTINTORES */}
    <div className="mb-8 rounded-3xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-xl">

      <button
        onClick={() => toggleMobileMenu('extintores')}
        className="
          w-full flex justify-between items-center
          px-5 py-5
          text-sm font-black tracking-wide uppercase
        "
      >
        Planos Extintores

        <ChevronDown
          size={20}
          className={`
            transition-transform duration-300
            ${activeMobileMenu === 'extintores' ? 'rotate-180' : ''}
          `}
        />
      </button>

      {activeMobileMenu === 'extintores' && (
        <div className="px-5 pb-5 flex flex-col gap-4">

          {extintores.map((e, i) => (
            <a
              key={i}
              href="#"
              className="
                text-[13px]
                text-white/70
                hover:text-white
                transition-all
                flex items-center gap-3
                group
              "
            >
              <div className="bg-red-500/20 p-2 rounded-xl group-hover:bg-red-500/30 transition">
                <FileText size={15} />
              </div>

              <span>Planos {e}</span>
            </a>
          ))}

        </div>
      )}

    </div>

    {/* BOTONES */}
    <div className="flex flex-col gap-4">

      <Link
        to="/administracion"
        onClick={() => setIsMenuOpen(false)}
        className="
          bg-white text-[#1a237e]
          py-4 rounded-2xl
          flex items-center justify-center gap-3
          font-black text-sm
          shadow-2xl
          hover:scale-[1.02]
          active:scale-95
          transition-all duration-300
        "
      >
        <LogIn size={18} />
        ADMINISTRACIÓN
      </Link>

      <a
        href="https://www.youtube.com/watch?v=rk0Zz16yISg"
        className="
          bg-[#0f172a]
          border border-white/10
          text-white
          py-4 rounded-2xl
          flex items-center justify-center gap-3
          font-black text-sm
          hover:bg-[#111c35]
          transition-all duration-300
        "
      >
        <ArrowRight size={18} />
        VIDEOS SEGURIDAD
      </a>

    </div>

  </div>

</div>
      </div>
    </>
  );
}