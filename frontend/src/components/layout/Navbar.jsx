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
    url: "#"
  },
  {
    title: "Acta entrega normativas",
    url: "#"
  },
  {
    title: "Politica Global Seguridad",
    url: "#"
  },
  {
    title: "Reglamento Control Acceso",
    url: "#"
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
      <div className="border border-gray-200 rounded-lg p-4 h-full shadow hover:shadow-lg hover:border-[#F5B300] transition bg-white flex flex-col items-center justify-center text-center">
        <div className="mb-2 text-[#000000] group-hover:text-[#F5B300] transition-colors">
          <FileText size={28} />
        </div>

        <span className="font-medium text-gray-700 group-hover:text-[#000000] transition text-xs">
          {title}
        </span>
      </div>
    </a>
  );

  return (
    <>
      {/* NAVBAR DESKTOP */}
      <nav className="w-full bg-[#000000] text-white shadow-md relative z-40 border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-6 md:px-12 py-4">

          {/* LOGO */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-3">
              <img
                src="/logo-upn.png"
                alt="Logo UPN"
                className="h-[40px] md:h-[50px] object-contain"
              />
            </a>
          </div>

          {/* BUTTON MOBILE */}
          <button
            className="md:hidden border border-white/30 p-2 rounded text-[#F5B300]"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* MENU DESKTOP */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-10 text-xs font-bold tracking-wide">

              {/* NOSOTROS */}
              <li className="relative group py-4">
                <div className="flex items-center gap-1 cursor-pointer hover:text-[#F5B300] transition">
                  NOSOTROS
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform"
                  />
                </div>

                <div className="absolute top-full left-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="bg-white rounded-lg shadow-xl border-t-4 border-[#F5B300] overflow-hidden">

                    <a
                      href="https://www.upn.edu.pe/nosotros"
                      target="_blank"
                      rel="noreferrer"
                      className="block px-4 py-3 hover:bg-gray-50"
                    >
                      <div className="text-[#000000] font-black text-sm mb-1 group-hover:text-[#F5B300]">
                        Propósito, misión y visión
                      </div>

                      <div className="text-gray-500 text-[11px] font-normal">
                        Conoce nuestro compromiso, valores e idearios
                      </div>
                    </a>

                  </div>
                </div>
              </li>

              {/* NORMATIVAS */}
              <li className="relative group py-4">
                <div className="flex items-center gap-1 cursor-pointer hover:text-[#F5B300] transition">
                  NORMATIVAS
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform"
                  />
                </div>

                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

                  <div className="bg-gray-50 rounded shadow-2xl border-t-4 border-[#F5B300] p-8">

                    <h5 className="font-black text-[#000000] text-sm mb-4 border-b border-gray-300 pb-2">
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
                <div className="flex items-center gap-1 cursor-pointer hover:text-[#F5B300] transition">
                  PLANOS EVACUACION
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform"
                  />
                </div>

                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

                  <div className="bg-gray-50 rounded shadow-2xl border-t-4 border-[#F5B300] p-8">

                    <h5 className="font-black text-[#000000] text-sm mb-4 border-b border-gray-300 pb-2">
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
                <div className="flex items-center gap-1 cursor-pointer hover:text-[#F5B300] transition">
                  PLANOS EXTINTORES
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform"
                  />
                </div>

                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

                  <div className="bg-gray-50 rounded shadow-2xl border-t-4 border-[#F5B300] p-8">

                    <h5 className="font-black text-[#000000] text-sm mb-4 border-b border-gray-300 pb-2">
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
                  className="bg-[#F5B300] hover:bg-[#dca100] text-[#000000] transition px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg font-black"
                >
                  <LogIn size={16} />
                  ADMINISTRACIÓN
                </Link>
              </li>

              {/* VIDEO */}
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 transition px-5 py-2.5 rounded-full flex items-center gap-2 text-white"
                >
                  <ArrowRight size={16} className="text-[#F5B300]" />
                  VIDEOS SEGURIDAD
                </a>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`
          fixed inset-0 z-50 md:hidden
          bg-gradient-to-br from-[#111111] via-[#000000] to-[#1a1a1a]
          transform
          ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
          transition-all duration-500 ease-in-out
          flex flex-col overflow-hidden
        `}
      >

        {/* EFECTOS */}
        <div className="absolute top-[-120px] right-[-120px] w-[260px] h-[260px] bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-120px] left-[-120px] w-[260px] h-[260px] bg-[#F5B300]/10 rounded-full blur-3xl"></div>

        {/* HEADER */}
        <div className="relative flex justify-between items-center px-6 py-5 border-b border-white/10 backdrop-blur-xl">

          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl border border-white/10 shadow-xl">
              <img
                src="/logo-upn.png"
                alt="Logo UPN"
                className="h-[30px] object-contain"
              />
            </div>

            <div>
              <h1 className="text-white font-black text-lg tracking-wide">
                iCURA
              </h1>

              <p className="text-[#F5B300] text-[10px] uppercase tracking-[2px] font-bold">
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
              hover:bg-[#F5B300] hover:text-black
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
                hover:text-[#F5B300] transition-colors
              "
            >
              Nosotros

              <ChevronDown
                size={20}
                className={`
                  transition-transform duration-300
                  ${activeMobileMenu === 'nosotros' ? 'rotate-180 text-[#F5B300]' : ''}
                `}
              />
            </button>

            {activeMobileMenu === 'nosotros' && (
              <div className="px-5 pb-5 flex flex-col gap-3 animate-fadeIn">

                <a
                  href="https://www.upn.edu.pe/nosotros"
                  className="
                    text-sm text-white/70
                    hover:text-[#F5B300]
                    transition
                    flex items-center gap-3
                  "
                >
                  <div className="w-2 h-2 rounded-full bg-[#F5B300]"></div>
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
                hover:text-[#F5B300] transition-colors
              "
            >
              Normativas

              <ChevronDown
                size={20}
                className={`
                  transition-transform duration-300
                  ${activeMobileMenu === 'normativas' ? 'rotate-180 text-[#F5B300]' : ''}
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
                    <div className="bg-white/10 p-2 rounded-xl group-hover:bg-[#F5B300] group-hover:text-black transition">
                      <FileText size={15} />
                    </div>

                    <span className="mt-1">{n.title}</span>
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
                hover:text-[#F5B300] transition-colors
              "
            >
              Planos Evacuación

              <ChevronDown
                size={20}
                className={`
                  transition-transform duration-300
                  ${activeMobileMenu === 'evacuacion' ? 'rotate-180 text-[#F5B300]' : ''}
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
                    <div className="bg-white/10 p-2 rounded-xl group-hover:bg-[#F5B300] group-hover:text-black transition">
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
                hover:text-[#F5B300] transition-colors
              "
            >
              Planos Extintores

              <ChevronDown
                size={20}
                className={`
                  transition-transform duration-300
                  ${activeMobileMenu === 'extintores' ? 'rotate-180 text-[#F5B300]' : ''}
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
                    <div className="bg-white/10 p-2 rounded-xl group-hover:bg-[#F5B300] group-hover:text-black transition">
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
                bg-[#F5B300] text-[#000000]
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
              href="#"
              className="
                bg-white/5
                border border-white/10
                text-white
                py-4 rounded-2xl
                flex items-center justify-center gap-3
                font-black text-sm
                hover:bg-white/10
                transition-all duration-300
              "
            >
              <ArrowRight size={18} className="text-[#F5B300]" />
              VIDEOS SEGURIDAD
            </a>

          </div>

        </div>

      </div>
    </>
  );
}