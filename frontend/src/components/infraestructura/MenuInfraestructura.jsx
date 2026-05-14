import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBuilding } from "react-icons/fa6";
export default function MenuInfraestructura({
  usuarioLogueado,
  setVistaInfra
}) {

  return (
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
                onClick={() => setVistaInfra("listaSedes")}
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
  );
}