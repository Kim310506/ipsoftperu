import { useEffect, useMemo, useState } from "react";
import api from "../../../../api/axios";

export default function ListaPisos({
  vistaInfra,
  setVistaInfra,
  buscarPiso,
  setBuscarPiso,
  setPisoSeleccionadoGlobal,
  setOpenPisoModal
}) {

  if (vistaInfra !== "listaPisos") return null;

  // ======================
  // DATA BD
  // ======================

  const [zonalesData, setZonalesData] =
    useState([]);

  // ======================
  // FILTROS
  // ======================

  const [filtroZonal, setFiltroZonal] =
    useState("TODOS");

  const [filtroSede, setFiltroSede] =
    useState("TODAS");

  const [filtroPabellon, setFiltroPabellon] =
    useState("TODOS");

  // ======================
  // OBTENER DATA
  // ======================

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

  // ======================
  // ZONALES
  // ======================

  const zonales = useMemo(() => {

    return [
      "TODOS",
      ...zonalesData.map((z) => z.nombre)
    ];

  }, [zonalesData]);

  // ======================
  // SEDES SEGÚN ZONAL
  // ======================

  const sedes = useMemo(() => {

    if (filtroZonal === "TODOS") {

      return zonalesData.flatMap(
        (z) => z.sedes || []
      );

    }

    const zona =
      zonalesData.find(
        (z) =>
          z.nombre === filtroZonal
      );

    return zona?.sedes || [];

  }, [filtroZonal, zonalesData]);

  // ======================
  // PABELLONES SEGÚN SEDE
  // ======================

  const pabellones = useMemo(() => {

    if (filtroSede === "TODAS") {

      return sedes.flatMap(
        (s) => s.pabellones || []
      );

    }

    const sede =
      sedes.find(
        (s) =>
          s.nombre === filtroSede
      );

    return sede?.pabellones || [];

  }, [sedes, filtroSede]);

  // ======================
  // FILTRAR PABELLON
  // ======================

  const pabellonesFiltrados =
    useMemo(() => {

      if (
        filtroPabellon === "TODOS"
      ) {
        return pabellones;
      }

      return pabellones.filter(
        (p) =>
          p.nombre ===
          filtroPabellon
      );

    }, [
      pabellones,
      filtroPabellon
    ]);

  // ======================
  // PISOS FINAL
  // ======================

  const pisos = useMemo(() => {

    let allPisos = [];

    pabellonesFiltrados.forEach(
      (pab) => {

        pab.pisos?.forEach(
          (piso) => {

            allPisos.push({

              ...piso,

              pabellonNombre:
                pab.nombre,

              sedeNombre:
                sedes.find((s) =>
                  s.pabellones?.some(
                    (p) =>
                      p.id === pab.id
                  )
                )?.nombre || "",

            });

          }
        );

      }
    );

    return allPisos;

  }, [
    pabellonesFiltrados,
    sedes
  ]);

  // ======================
  // FILTRO FINAL
  // ======================

  const pisosFiltrados =
    pisos.filter((piso) =>
      piso.nombre
        .toLowerCase()
        .includes(
          buscarPiso.toLowerCase()
        )
    );

  return (
    <div className="w-full max-w-[1300px]">

      {/* ====================== */}
      {/* HEADER */}
      {/* ====================== */}

      <div className="mb-10">

        <div className="mb-6">

          <button
            onClick={() => {
              setVistaInfra("menu");
              setBuscarPiso("");
              setFiltroZonal("TODOS");
              setFiltroSede("TODAS");
              setFiltroPabellon("TODOS");
            }}
            className="mb-5 text-[#7184a3] font-black"
          >
            ← VOLVER
          </button>

          <h1 className="text-3xl lg:text-5xl font-black italic text-[#132238]">
            PISOS
          </h1>

        </div>

        {/* FILTROS */}

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Buscar piso..."
            value={buscarPiso}
            onChange={(e) =>
              setBuscarPiso(
                e.target.value
              )
            }
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold w-full"
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
              setFiltroPabellon(
                "TODOS"
              );
            }}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold w-full"
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
            onChange={(e) => {
              setFiltroSede(
                e.target.value
              );
              setFiltroPabellon(
                "TODOS"
              );
            }}
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold w-full"
          >

            <option value="TODAS">
              TODAS LAS SEDES
            </option>

            {sedes.map((s) => (

              <option
                key={s.id}
                value={s.nombre}
              >
                {s.nombre}
              </option>

            ))}

          </select>

          {/* PABELLON */}

          <select
            value={filtroPabellon}
            onChange={(e) =>
              setFiltroPabellon(
                e.target.value
              )
            }
            className="bg-white px-5 py-4 rounded-2xl border border-gray-200 font-bold w-full"
          >

            <option value="TODOS">
              TODOS LOS PABELLONES
            </option>

            {pabellones.map((p) => (

              <option
                key={p.id}
                value={p.nombre}
              >
                {p.nombre}
              </option>

            ))}

          </select>

        </div>

      </div>

      {/* CABECERA */}

      <div className="hidden xl:grid xl:grid-cols-[2fr_1.3fr_1fr_auto] gap-8 px-8 mb-5 text-gray-400 font-black text-sm uppercase">

        <p>Piso</p>

        <p>Pabellones</p>

        <p>Sedes</p>

        <p className="text-right">
          Acción
        </p>

      </div>

      {/* LISTA */}

      <div className="flex flex-col gap-5 w-full">

        {pisosFiltrados.map(
          (piso, i) => (

            <div
              key={i}
              className="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100 flex flex-col gap-5 xl:grid xl:grid-cols-[2fr_1.3fr_1fr_auto] xl:items-center xl:gap-8"
            >

              <div className="font-black text-[#132238] text-2xl italic">
                {piso.nombre}
              </div>

              <div>
                <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-xs font-black whitespace-nowrap">
                  {piso.pabellonNombre}
                </span>
              </div>

              <div>
                <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs font-black whitespace-nowrap">
                  {piso.sedeNombre}
                </span>
              </div>

              <div className="flex xl:justify-end">

                <button
                  onClick={() => {
                    setPisoSeleccionadoGlobal(
                      piso
                    );

                    setOpenPisoModal(
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

    </div>
  );

}