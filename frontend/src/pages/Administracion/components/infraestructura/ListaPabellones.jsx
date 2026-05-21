import { useEffect, useMemo, useState } from "react";
import api from "../../../../api/axios";

export default function ListaPabellones({
  vistaInfra,
  setVistaInfra,
  buscarPabellon,
  setBuscarPabellon,
  filtroSede,
  setFiltroSede,
  pabellonesFiltrados,
  setPabellonSeleccionado,
  setOpenPabellonModal
}) {

  if (vistaInfra !== "listaPabellones") return null;

  // =========================
  // DATA BD
  // =========================

  const [zonalesData, setZonalesData] =
    useState([]);

  // =========================
  // FILTRO ZONAL
  // =========================

  const [filtroZonal, setFiltroZonal] =
    useState("TODOS");

  // =========================
  // OBTENER ZONALES
  // =========================

  useEffect(() => {

    obtenerZonales();

  }, []);

  const obtenerZonales = async () => {

    try {

      const response =
        await api.get("/zonales");

      setZonalesData(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // =========================
  // ZONALES
  // =========================

  const zonales = useMemo(() => {

    return [
      "TODOS",
      ...zonalesData.map(
        (z) => z.nombre
      )
    ];

  }, [zonalesData]);

  // =========================
  // SEDES SEGUN ZONAL
  // =========================

  const sedesFiltradas =
    useMemo(() => {

      if (
        filtroZonal === "TODOS"
      ) {

        return zonalesData.flatMap(
          (z) => z.sedes || []
        );

      }

      const zona =
        zonalesData.find(
          (z) =>
            z.nombre ===
            filtroZonal
        );

      return zona?.sedes || [];

    }, [
      filtroZonal,
      zonalesData
    ]);

  // =========================
  // FILTRO FINAL
  // =========================

  const pabellonesFinales =
    pabellonesFiltrados.filter(
      (pabellon) => {

        const coincideBusqueda =
          pabellon.nombre
            .toLowerCase()
            .includes(
              buscarPabellon.toLowerCase()
            );

        const coincideSede =

          filtroSede === "TODAS" ||

          pabellon.sedeNombre ===
            filtroSede;

        const coincideZonal =

          filtroZonal === "TODOS" ||

          sedesFiltradas.some(
            (sede) =>
              sede.nombre ===
              pabellon.sedeNombre
          );

        return (

          coincideBusqueda &&
          coincideSede &&
          coincideZonal

        );

      }
    );

  return (

    <>

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

        <div>

          <button
            onClick={() => {

              setVistaInfra("menu");

              setBuscarPabellon("");

              setFiltroSede("TODAS");

              setFiltroZonal("TODOS");

            }}
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
            value={buscarPabellon}
            onChange={(e) =>
              setBuscarPabellon(
                e.target.value
              )
            }
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold w-full lg:w-[280px]"
          />

          {/* ZONAL */}

          <select
            value={filtroZonal}
            onChange={(e) => {

              setFiltroZonal(
                e.target.value
              );

              setFiltroSede(
                "TODAS"
              );

            }}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold"
          >

            {zonales.map((z) => (

              <option
                key={z}
                value={z}
              >
                {z}
              </option>

            ))}

          </select>

          {/* SEDE */}

          <select
            value={filtroSede}
            onChange={(e) =>
              setFiltroSede(
                e.target.value
              )
            }
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold"
          >

            <option value="TODAS">
              TODAS LAS SEDES
            </option>

            {sedesFiltradas.map(
              (sede) => (

                <option
                  key={sede.id}
                  value={sede.nombre}
                >
                  {sede.nombre}
                </option>

              )
            )}

          </select>

        </div>

      </div>

      {/* CABECERA */}

      <div className="hidden xl:grid xl:grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr] gap-8 px-8 mb-5 text-gray-400 font-black text-sm uppercase">

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

        {pabellonesFinales.map(
          (pabellon) => (

            <div
              key={pabellon.id}
              className="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 flex flex-col gap-5 xl:grid xl:grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr] xl:items-center xl:gap-8"
            >

              <div className="font-black italic text-[#132238] text-2xl">
                {pabellon.nombre}
              </div>

              <div>

                <span className="bg-orange-100 text-orange-600 px-5 py-2 rounded-full text-xs font-black">
                  {pabellon.sedeNombre}
                </span>

              </div>

              <div className="font-black">
                {pabellon.pisos.length}
              </div>

              <div className="font-black text-[#0456b3]">

                {pabellon.pisos.reduce(
                  (acc, p) =>
                    acc +
                    p.ambientes.length,
                  0
                )}

              </div>

              <div className="flex xl:justify-end">

                <button
                  onClick={() => {

                    setPabellonSeleccionado(
                      pabellon
                    );

                    setOpenPabellonModal(
                      true
                    );

                  }}
                  className="bg-[#0456b3] hover:bg-[#034696] text-white px-5 py-3 rounded-2xl font-black"
                >
                  VER
                </button>

              </div>

            </div>

          )
        )}

      </div>

    </>

  );

}