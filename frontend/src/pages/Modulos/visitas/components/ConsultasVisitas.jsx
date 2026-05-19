// src/pages/modulos/visitas/components/ConsultasVisitas.jsx

import { useMemo, useState } from "react";

import {
  Search,
  Building2,
  MapPin,
  Clock3,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

import {
  visitasData,
} from "../../../../data/visitasData";

import { zonales } from "../../../../data/infraestructura";

export default function ConsultasVisitas() {

  /* ========================= */
  /* STATES */
  /* ========================= */

  const [busqueda, setBusqueda] =
    useState("");

  /* ========================= */
  /* OBTENER NOMBRE SEDE */
  /* ========================= */

  const obtenerNombreSede = (
    sedeId
  ) => {

    for (const zonal of zonales) {

      const sede = zonal.sedes.find(
        (s) => s.id === sedeId
      );

      if (sede) return sede.nombre;

    }

    return "SIN SEDE";

  };

  /* ========================= */
  /* OBTENER NOMBRE AMBIENTE */
  /* ========================= */

  const obtenerNombreAmbiente = (
    ambienteId
  ) => {

    for (const zonal of zonales) {

      for (const sede of zonal.sedes) {

        for (const pabellon of sede.pabellones) {

          for (const piso of pabellon.pisos) {

            const ambiente =
              piso.ambientes.find(
                (a) => a.id === ambienteId
              );

            if (ambiente) {
              return ambiente.nombre;
            }

          }

        }

      }

    }

    return "SIN ÁREA";

  };

  /* ========================= */
  /* BUSCAR VISITANTE */
  /* ========================= */

  const visitanteEncontrado =
    useMemo(() => {

      if (!busqueda.trim()) return null;

      for (const visita of visitasData) {

        for (const visitante of visita.visitantes) {

          const texto = `
            ${visitante.dni}
            ${visitante.nombres}
            ${visitante.apellidoPaterno}
            ${visitante.apellidoMaterno}
          `
            .toLowerCase();

          if (
            texto.includes(
              busqueda.toLowerCase()
            )
          ) {

            return {
              ...visitante,
              visita,
            };

          }

        }

      }

      return null;

    }, [busqueda]);

  return (

    <main className="p-6 lg:p-8">

      {/* BUSCADOR */}
      <div className="flex justify-center mb-10">

        <div className="flex flex-col lg:flex-row gap-4 w-full max-w-3xl">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Buscar por DNI, nombre o apellido..."
              value={busqueda}
              onChange={(e) =>
                setBusqueda(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-2xl pl-11 pr-4 py-4 outline-none focus:border-[#1E55C0]"
            />

          </div>

          <button className="bg-[#2563eb] hover:bg-[#1d4ed8] transition text-white px-6 py-4 rounded-2xl font-bold shadow-sm">

            Escanear

          </button>

        </div>

      </div>

      {/* RESULTADO */}
      {visitanteEncontrado && (

        <div className="max-w-md bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-200">

          {/* TOP */}
          <div className="p-6 flex items-start justify-between border-b border-gray-100">

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-full bg-[#e5e7eb] flex items-center justify-center">

                <span className="text-2xl">
                  👤
                </span>

              </div>

              <div>

                <h2 className="text-xl font-black text-gray-800">

                  {visitanteEncontrado.nombres}{" "}
                  {visitanteEncontrado.apellidoPaterno}

                </h2>

                <p className="text-gray-500 text-sm">

                  DNI:
                  {" "}
                  {visitanteEncontrado.dni}

                </p>

              </div>

            </div>

            <span className="bg-green-100 text-green-700 px-4 py-1 rounded-xl text-xs font-bold">

              AUTORIZADO

            </span>

          </div>

          {/* BODY */}
          <div className="p-6 space-y-4">

            <div className="flex items-center gap-3 text-gray-700">

              <Building2
                size={18}
                className="text-[#2563eb]"
              />

              <p>

                <span className="font-bold">
                  Empresa:
                </span>{" "}

                {visitanteEncontrado.empresa}

              </p>

            </div>

            <div className="flex items-center gap-3 text-gray-700">

              <MapPin
                size={18}
                className="text-[#2563eb]"
              />

              <p>

                <span className="font-bold">
                  Sede/Área:
                </span>{" "}

                {obtenerNombreSede(
                  visitanteEncontrado.visita
                    .sedeId
                )}{" "}

                /{" "}

                {obtenerNombreAmbiente(
                  visitanteEncontrado.visita
                    .ambienteId
                )}

              </p>

            </div>

            <div className="flex items-center gap-3 text-gray-700">

              <Clock3
                size={18}
                className="text-[#2563eb]"
              />

              <p>

                <span className="font-bold">
                  Horario:
                </span>{" "}

                {
                  visitanteEncontrado.visita
                    .horaEntrada
                }{" "}

                -{" "}

                {
                  visitanteEncontrado.visita
                    .horaSalida
                }

              </p>

            </div>

            <div className="flex items-center gap-3 text-gray-700">

              <ClipboardList
                size={18}
                className="text-[#2563eb]"
              />

              <p>

                <span className="font-bold">
                  Motivo:
                </span>{" "}

                {
                  visitanteEncontrado.visita
                    .motivo
                }

              </p>

            </div>

            {/* QR */}
            <div className="border-t border-gray-100 pt-6 flex flex-col items-center">

              <div className="w-36 h-36 bg-gray-100 rounded-2xl flex items-center justify-center text-sm text-gray-400">

                QR

              </div>

              <p className="text-gray-400 text-sm mt-4">

                Cód. Autorización:
                {" "}
                {
                  visitanteEncontrado.visita
                    .codigo
                }

              </p>

            </div>

          </div>

          {/* FOOTER */}
          <div className="bg-[#f8fafc] px-6 py-4 flex items-center justify-between text-sm">

            <div className="flex items-center gap-2 text-green-600 font-bold">

              <CheckCircle2 size={16} />

              Ingreso: 11:45

            </div>

            <div className="flex items-center gap-2 text-red-500 font-bold">

              <Clock3 size={16} />

              Salida: 11:45

            </div>

          </div>

        </div>

      )}

    </main>

  );

}

