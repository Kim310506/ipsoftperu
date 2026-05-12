import { useState } from "react";

import {
  FaBars,
  FaChevronDown,
  FaArrowRight,
  FaFilePdf,FaGear
} from "react-icons/fa6";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#3d47db] text-white shadow-md relative z-50">
      
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 lg:px-12 py-5">

        {/* LOGO */}
        <div className="flex items-center">
          <img
            src="/iconos/logoUSIL.png"
            alt="Logo USIL"
            className="h-[65px] w-auto object-contain"
          />
        </div>

        {/* BOTON MOBILE */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars size={24} />
        </button>

        {/* MENÚ */}
        <div
          className={`
            absolute md:static top-full left-0 w-full md:w-auto
            bg-[#3d47db] md:bg-transparent
            transition-all duration-300
            ${menuOpen ? "block" : "hidden md:block"}
          `}
        >
          <ul className="flex flex-col md:flex-row md:items-center gap-0 md:gap-10 font-bold text-sm px-6 md:px-0 py-4 md:py-0">

            {/* NOSOTROS */}
            <li className="relative group">
              
              <button className="flex items-center gap-2 py-3 hover:text-gray-200 transition-all">
                NOSOTROS
                <FaChevronDown className="text-[10px]" />
              </button>

              {/* DROPDOWN */}
              <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50">
                
<div className="w-[290px] bg-[#ececec] rounded-xl shadow-2xl overflow-hidden border-t-5 border-[blue]">
                  <a
                    href="https://usil.edu.pe/nosotros/mision-vision/"
                    className="block px-6 py-5 hover:bg-gray-100 transition-all"
                  >
                    <h3 className="text-[#3d47db] font-bold text-xl mb-2">
                      Propósito, misión y visión
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      Conoce nuestro compromiso, valores e idearios
                    </p>
                  </a>

                </div>
              </div>
            </li>

                        {/* NORMATIVAS */}
<li className="relative group">

  <button className="flex items-center gap-2 py-3 hover:text-gray-200 transition-all">
    NORMATIVAS
    <FaChevronDown className="text-[10px]" />
  </button>

  {/* DROPDOWN */}
<div className="hidden group-hover:block fixed left-1/2 -translate-x-1/2 top-[95px] pt-4 z-50">

    <div className="w-[900px] bg-gray-100 rounded-xl shadow-2xl p-8 border-t-5 border-[blue]">

      <h3 className="text-[#3d47db] font-bold text-lg mb-6 uppercase">
        Normativas
      </h3>

      <div className="grid grid-cols-4 gap-6">

        {/* ITEM */}
        <a
          href="https://ipsoftperu.com/usil/documentos/normativas%20de%20seguridad/20130613_Normativa_Corporativa_de_Seguridad.pdf"
          className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all text-center"
        >
          <div className="text-[#3d47db] text-3xl mb-3 flex justify-center">
            <FaFilePdf />
          </div>

          <p className="text-gray-700 font-semibold text-sm">
            Normativa Corporativa Seguridad
          </p>
        </a>

        {/* ITEM */}
        <a
          href="https://ipsoftperu.com/usil/documentos/normativas%20de%20seguridad/Acta_de_entrega_de_normativas_de_TDP.pdf"
          className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all text-center"
        >
          <div className="text-[#3d47db] text-3xl mb-3 flex justify-center">
            <FaFilePdf />
          </div>

          <p className="text-gray-700 font-semibold text-sm">
            Acta entrega normativas TDP
          </p>
        </a>

        {/* ITEM */}
        <a
          href="https://ipsoftperu.com/usil/documentos/normativas%20de%20seguridad/Politica_Global_de_Seguridad_Edicion_2.pdf"
          className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all text-center"
        >
          <div className="text-[#3d47db] text-3xl mb-3 flex justify-center">
            <FaFilePdf />
          </div>

          <p className="text-gray-700 font-semibold text-sm">
            Política Global Seguridad
          </p>
        </a>

        {/* ITEM */}
        <a
          href="https://ipsoftperu.com/usil/documentos/normativas%20de%20seguridad/Reglamento_de_Control_de_Acceso_Edicion1_Agosto2017.pdf"
          className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all text-center"
        >
          <div className="text-[#3d47db] text-3xl mb-3 flex justify-center">
            <FaFilePdf />
          </div>

          <p className="text-gray-700 font-semibold text-sm">
            Reglamento Control Acceso
          </p>
        </a>

        {/* ITEM */}
        <a
          href="https://ipsoftperu.com/usil/documentos/normativas%20de%20seguridad/Reglamento_de_Gesti%C3%B3n_de_Activos_Edicion1_Agosto2017.pdf"
          className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all text-center"
        >
          <div className="text-[#3d47db] text-3xl mb-3 flex justify-center">
            <FaFilePdf />
          </div>

          <p className="text-gray-700 font-semibold text-sm">
            Reglamento Gestión Activos
          </p>
        </a>

        {/* ITEM */}
        <a
          href="https://ipsoftperu.com/usil/documentos/normativas%20de%20seguridad/Reglamento_de_Seguridad_Fisica_Edici%C3%B3n1_Agosto2017.pdf"
          className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all text-center"
        >
          <div className="text-[#3d47db] text-3xl mb-3 flex justify-center">
            <FaFilePdf />
          </div>

          <p className="text-gray-700 font-semibold text-sm">
            Reglamento Seguridad Física
          </p>
        </a>

        {/* ITEM */}
        <a
          href="https://ipsoftperu.com/usil/documentos/normativas%20de%20seguridad/Reglamento_de_Seguridad_en_las_Personas_Edicion1_Agosto2017.pdf"
          className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all text-center"
        >
          <div className="text-[#3d47db] text-3xl mb-3 flex justify-center">
            <FaFilePdf />
          </div>

          <p className="text-gray-700 font-semibold text-sm">
            Reglamento Seguridad Personas
          </p>
        </a>
        {/* ITEM */}
        <a
          href="https://ipsoftperu.com/usil/documentos/normativas%20de%20seguridad/TP-PS-001_Guia_de_obligaciones_y_recomendaciones_y_consejos_de_seguridad.pdf"
          className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all text-center"
        >
          <div className="text-[#3d47db] text-3xl mb-3 flex justify-center">
            <FaFilePdf />
          </div>

          <p className="text-gray-700 font-semibold text-sm">
            Guia obligaciones seguridad
          </p>
        </a>    
      </div>

    </div>
  </div>
</li>

            {/* PLANOS */}
        <li className="relative group">

        <button className="flex items-center gap-2 py-3 hover:text-gray-200 transition-all">
            PLANOS EVACUACION
            <FaChevronDown className="text-[10px]" />
        </button>

        {/* DROPDOWN */}
        <div className="hidden group-hover:block fixed left-1/2 -translate-x-1/2 top-[95px] pt-4 z-50">

    <div className="w-[900px] bg-gray-100 rounded-xl shadow-2xl p-8 border-t-5 border-[blue]">

            <h3 className="text-[#3d47db] font-bold text-lg mb-6 uppercase">
                Planos de Evacuación 
            </h3>

            <div className="grid grid-cols-3 gap-6">

                <a
                href="https://ipsoftperu.com/usil/documentos/planos%20de%20evacuacion/PLANOS_DE_EVACUACION_LOCAL_01_VF.pdf"
                className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all text-center"
                >
                <div className="text-[#3d47db] text-3xl mb-3 flex justify-center">
                    <FaFilePdf />
                </div>

                <p className="text-gray-700 font-semibold text-sm">
                    Planos de Evacuación Local 01  VF
                </p>
                </a>

                <a
                href="https://ipsoftperu.com/usil/documentos/planos%20de%20evacuacion/PLANOS_DE_EVACUACION_LOCAL_02_VF.pdf"
                className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all text-center"
                >
                <div className="text-[#3d47db] text-3xl mb-3 flex justify-center">
                    <FaFilePdf />
                </div>

                <p className="text-gray-700 font-semibold text-sm">
                    Planos de Evacuación Local 02  VF
                </p>
                </a>

                <a
                href="https://ipsoftperu.com/usil/documentos/planos%20de%20evacuacion/PLANOS_DE_EVACUACION_LOCAL_03_VF.pdf"
                className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all text-center"
                >
                <div className="text-[#3d47db] text-3xl mb-3 flex justify-center">
                    <FaFilePdf />
                </div>

                <p className="text-gray-700 font-semibold text-sm">
                    Planos de Evacuación Local 03  VF
                </p>
                </a>
                <a
                href="https://ipsoftperu.com/usil/documentos/planos%20de%20evacuacion/PLANOS_DE_EVACUACION_LOCAL_04_VF.pdf"
                className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all text-center"
                >
                <div className="text-[#3d47db] text-3xl mb-3 flex justify-center">
                    <FaFilePdf />
                </div>

                <p className="text-gray-700 font-semibold text-sm">
                    Planos de Evacuación Local 04  VF
                </p>
                </a>

            </div>
            </div>
        </div>
        </li>

        {/* PLANOS EXTINTORES */}
        <li className="relative group">

        <button className="flex items-center gap-2 py-3 hover:text-gray-200 transition-all">
            PLANOS EXTINTORES
            <FaChevronDown className="text-[10px]" />
        </button>

        {/* DROPDOWN */}
        <div className="hidden group-hover:block fixed left-1/2 -translate-x-1/2 top-[95px] pt-4 z-50">

    <div className="w-[900px] bg-gray-100 rounded-xl shadow-2xl p-8 border-t-5 border-[blue]">

            <h3 className="text-[#3d47db] font-bold text-lg mb-6 uppercase">
                Planos Extintores
            </h3>

            <div className="grid grid-cols-3 gap-6">

                <a
                href="https://ipsoftperu.com/usil/documentos/planos%20extintores/PLANOS_EXTINTORES_LOCAL_01.pdf"
                className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all text-center"
                >
                <div className="text-[#3d47db] text-3xl mb-3 flex justify-center">
                    <FaFilePdf />
                </div>

                <p className="text-gray-700 font-semibold text-sm">
                    Planos Extintores Local 01
                </p>
                </a>

                <a
                href="https://ipsoftperu.com/usil/documentos/planos%20extintores/PLANOS_EXTINTORES_LOCAL_02.pdf"
                className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all text-center"
                >
                <div className="text-[#3d47db] text-3xl mb-3 flex justify-center">
                    <FaFilePdf />
                </div>

                <p className="text-gray-700 font-semibold text-sm">
                    Planos Extintores Local 02
                </p>
                </a>

                <a
                href="https://ipsoftperu.com/usil/documentos/planos%20extintores/PLANOS_EXTINTORES_LOCAL_03.pdf"
                className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all text-center"
                >
                <div className="text-[#3d47db] text-3xl mb-3 flex justify-center">
                    <FaFilePdf />
                </div>

                <p className="text-gray-700 font-semibold text-sm">
                    Planos Extintores Local 03
                </p>
                </a>
                <a
                href="https://ipsoftperu.com/usil/documentos/planos%20extintores/PLANOS_EXTINTORES_LOCAL_04.pdf"
                className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all text-center"
                >
                <div className="text-[#3d47db] text-3xl mb-3 flex justify-center">
                    <FaFilePdf />
                </div>

                <p className="text-gray-700 font-semibold text-sm">
                    Planos Extintores Local 04
                </p>
                </a>

            </div>
            </div>
        </div>
        </li>
        {/* ADMINISTRACIÓN */}
        {/* BOTÓN */}
        <li className="mt-4 md:mt-0">

          <a
            href="/administracion"
            className="
              bg-[#2833a8]
              hover:bg-[#1f2887]
              transition-all
              px-6 py-3
              rounded-full
              flex items-center gap-3
              text-sm
              shadow-lg
            "
          >
            <FaGear />
            ADMINISTRACIÓN
          </a>

        </li>

            {/* BOTÓN */}
            <li className="mt-4 md:mt-0">

              <a
                href="https://www.youtube.com/watch?v=rk0Zz16yISg"
                className="
                  bg-[#2833a8]
                  hover:bg-[#1f2887]
                  transition-all
                  px-6 py-3
                  rounded-full
                  flex items-center gap-3
                  text-sm
                  shadow-lg
                "
              >
                <FaArrowRight />
                VIDEOS SEGURIDAD
              </a>

            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}