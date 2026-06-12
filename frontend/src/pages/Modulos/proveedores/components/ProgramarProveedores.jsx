import React, { useMemo, useState, useEffect } from "react";
import api from "../../../../api/axios";
import {
  CircleCheckBig,
  UserRoundPlus,
  Clock3,
  Check,
  Users,
  Send,
  Trash2,
} from "lucide-react";
import ModalRegistro from "./ProgramarProveedores/ModalRegistro";

export default function InicioProveedores() {

  /* ========================= */
  /* STATES */
  /* ========================= */

  const [contratas, setContratas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
const [zonales, setZonales] = useState([]);
const [sedeSeleccionada, setSedeSeleccionada] =
  useState("");
const [ambienteSeleccionado, setAmbienteSeleccionado] =
  useState("");
 const [trabajadores, setTrabajadores] =
  useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
const [paginaActual, setPaginaActual] = useState(1);

const registrosPorPagina = 10;
  /* ========================= */
  /* CARGAR ZONALES */
  /* ========================= */

  useEffect(() => {
    const cargarZonales = async () => {
      try {
        const res = await api.get("/zonales");
        setZonales(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    cargarZonales();
  }, []);

  /* ========================= */
  /* SEDES */
  /* ========================= */

  const sedes = useMemo(() => {
    return zonales.flatMap((zonal) => zonal.sedes || []);
  }, [zonales]);

  /* ========================= */
  /* AMBIENTES */
  /* ========================= */

  const ambientes = useMemo(() => {
    if (!sedeSeleccionada) return [];

    const sede = sedes.find(
      (s) => s.id === Number(sedeSeleccionada)
    );

    if (!sede) return [];

    return sede.pabellones?.flatMap((p) =>
      p.pisos?.flatMap((pi) => pi.ambientes || [])
    ) || [];
  }, [sedeSeleccionada, sedes]);

  /* ========================= */
  /* HELPERS */
  /* ========================= */

  const obtenerNombreSede = (sedeId) => {
    for (const zonal of zonales) {
      const sede = zonal.sedes?.find((s) => s.id === sedeId);
      if (sede) return sede.nombre;
    }
    return "SIN SEDE";
  };

 const obtenerNombreAmbiente = (ambienteId) => {

  for (const zonal of zonales) {

    for (const sede of zonal.sedes || []) {

      for (const pabellon of sede.pabellones || []) {

        for (const piso of pabellon.pisos || []) {

          const amb = piso.ambientes?.find(
            (a) => a.id === ambienteId
          );

          if (amb) {
            return amb.nombre;
          }

        }

      }

    }

  }

  return "SIN AMBIENTE";
};

  /* ========================= */
  /* VISITAS */
  /* ========================= */

  useEffect(() => {
    const cargarVisitas = async () => {
      try {
        setLoading(true);
        const res =
            await api.get("/contratas");
            setContratas(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    cargarVisitas();
  }, []);
const cargarVisitas = async () => {
  try {
    setLoading(true);

    const res =
      await api.get("/contratas");

    setContratas(res.data);

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
  /* ========================= */
  /* ESTADISTICAS */
  /* ========================= */
const estadisticas = useMemo(() => ({

  total:
    contratas.length,

  pendientes:
    contratas.filter(
      c => c.estado === "PENDIENTE"
    ).length,

  autorizadas:
    contratas.filter(
      c => c.estado === "AUTORIZADO"
    ).length,

}), [contratas]);
  /* ========================= */
  /* SORT */
  /* ========================= */

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  /* ========================= */
  /* FILTRADO */
  /* ========================= */

const contratasFiltradas =
useMemo(() => {

  let data = [...contratas];

  data = data.filter((item) => {

    const texto = `
      ${item.codigo}
      ${item.empresaContratista}
      ${item.nombresResponsable}
      ${item.estado}
      ${item.nivelRiesgo || ""}
    `.toLowerCase();

    return texto.includes(
      busqueda.toLowerCase()
    );

  });

  return data;

}, [contratas, busqueda]);
/* ========================= */
/* PAGINACION */
/* ========================= */

const totalPaginas = Math.ceil(
  contratasFiltradas.length / registrosPorPagina
);

const indiceInicial =
  (paginaActual - 1) * registrosPorPagina;

const indiceFinal =
  indiceInicial + registrosPorPagina;

const contratasPaginadas =
  contratasFiltradas.slice(
    indiceInicial,
    indiceFinal
  );
  return (

<main className="w-full max-w-full p-3 sm:p-5 lg:p-8 overflow-hidden">        {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div className="flex items-center gap-3">

          <CircleCheckBig
            size={32}
            className="text-[#1E55C0]"
          />

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1E55C0] break-words">
            Panel de Control
          </h1>

        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-[#1E55C0] hover:bg-[#1947a3] transition-all text-white px-6 py-4 rounded-full font-bold shadow-lg flex items-center gap-2 w-full lg:w-auto justify-center"
        >

          <UserRoundPlus size={22} />

          Nuevo Registro

        </button>

      </div>

      {/* CARDS */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mb-8">          
  {/* PENDIENTES */}
<div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all p-4 sm:p-6 flex items-center gap-4 min-w-0">  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white">

            <Clock3 size={30} />

          </div>

          <div>

            <h3 className="text-blue-500 font-bold text-xl">
              Pendientes
            </h3>

            <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-500 break-words">
              {estadisticas.pendientes}
            </p>

          </div>

        </div>

        {/* APROBADOS */}
<div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all p-4 sm:p-6 flex items-center gap-4 min-w-0">  <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white">

            <Check size={30} />

          </div>

          <div>

            <h3 className="text-green-600 font-bold text-xl">
              Aprobados
            </h3>

            <p className="text-5xl font-black text-green-600">
              {estadisticas.autorizadas}
            </p>

          </div>

        </div>

        {/* VISITAS */}
<div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all p-4 sm:p-6 flex items-center gap-4 min-w-0">   <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white">

            <Users size={30} />

          </div>

          <div>

            <h3 className="text-purple-600 font-bold text-xl">
              Visitas
            </h3>

            <p className="text-5xl font-black text-purple-600">
              {estadisticas.total}
            </p>

          </div>

        </div>

      </div>

      {/* TABLA */}
<div className="bg-white rounded-3xl shadow-sm w-full overflow-hidden">              {/* HEADER */}
<div className="px-4 sm:px-6 py-5 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">          <h2 className="text-2xl font-black text-[#1E55C0]">
            Programación de visitas
          </h2>

          <input
            type="text"
            placeholder="Buscar por local, área, tipo..."
            value={busqueda}
            onChange={(e) =>
                setBusqueda(e.target.value)
            }
className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0] w-full lg:w-[300px] min-w-0"           />

        </div>

        {/* TABLA */}
<div className="w-full min-w-0">

  <div className="w-full overflow-x-auto overflow-y-hidden">

    <table className="w-full min-w-[1100px] border-separate border-spacing-0">
                <thead className="bg-[#f8fafc] border-b border-gray-200">

  <tr className="text-left text-gray-500 uppercase text-xs">

<th>FECHA</th>
<th>CÓDIGO</th>
<th>LOCAL</th>
<th>ÁREA</th>
<th>HORARIO</th>
<th>MOTIVO</th>
<th>ESTADO</th>
<th>AUTORIZADO</th>
<th>ACCIONES</th>

  </tr>

            </thead>

<tbody>

{contratasPaginadas.map((item) => (

<tr
  key={item.id}
  className="
    border-b
    hover:bg-blue-50
    transition-all
  "
>

<td className="px-4 py-4">

  <span
    className="
      px-3 py-1
      rounded-full
      text-xs
      font-bold
      bg-red-100
      text-red-600
    "
  >
    {new Date(
      item.fechaInicio
    ).toLocaleDateString("es-PE")}
  </span>

</td>

<td className="font-semibold">
  {item.codigo}
</td>

<td>
  {item.sede?.nombre}
</td>

<td>
  {item.ambiente?.nombre}
</td>

<td>

  <span className="font-medium">
    {item.horaEntrada}
  </span>

  <br />

  <span className="text-gray-400 text-xs">
    {item.horaSalida}
  </span>

</td>

<td>
  {item.motivo}
</td>

<td>

  <span
    className={`
      px-3 py-1
      rounded-full
      text-xs
      font-bold

      ${
        item.estado === "AUTORIZADO"
          ? "bg-green-100 text-green-700"
          : item.estado === "RECHAZADO"
          ? "bg-red-100 text-red-700"
          : item.estado === "COMPLETADO"
          ? "bg-blue-100 text-blue-700"
          : "bg-orange-100 text-orange-700"
      }
    `}
  >
    {item.estado}
  </span>

</td>

<td>

  {item.accionPor?.nombre ? (

    <span
      className="
        text-gray-700
        font-medium
      "
    >
      {item.accionPor.nombre}
    </span>

  ) : (

    <span
      className="
        text-gray-400
      "
    >
      Pendiente
    </span>

  )}

</td>

<td>

  <div className="flex gap-2">
    <button
      className="
        bg-red-500
        hover:bg-red-600
        text-white
        px-3 py-2
        rounded-xl
      "
    >
      <Trash2 size={15}/>
    </button>

  </div>

</td>

</tr>

))}

</tbody>

          </table>
          </div>
{/* PAGINACION */}
<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-4 sm:px-6 py-5 border-t border-gray-100">  <p className="text-sm text-gray-500">

    Mostrando

    <span className="font-bold text-[#1E55C0] mx-1">
      {indiceInicial + 1}
    </span>

    -

    <span className="font-bold text-[#1E55C0] mx-1">
      {
        Math.min(
          indiceFinal,
          contratasFiltradas.length
        )
      }
    </span>

    de

    <span className="font-bold text-[#1E55C0] mx-1">
      {contratasFiltradas.length}
    </span>

    registros

  </p>

<div className="flex items-center gap-2 flex-wrap justify-center lg:justify-end w-full lg:w-auto">
      <button
      onClick={() =>
        setPaginaActual((prev) =>
          Math.max(prev - 1, 1)
        )
      }
      disabled={paginaActual === 1}
      className="px-4 py-2 rounded-xl border disabled:opacity-40"
    >
      Anterior
    </button>

    {Array.from(
      { length: totalPaginas },
      (_, i) => i + 1
    ).map((pagina) => (

      <button
        key={pagina}
        onClick={() =>
          setPaginaActual(pagina)
        }
        className={`px-4 py-2 rounded-xl font-bold transition ${
          paginaActual === pagina
            ? "bg-[#1E55C0] text-white"
            : "border hover:bg-gray-100"
        }`}
      >
        {pagina}
      </button>

    ))}

    <button
      onClick={() =>
        setPaginaActual((prev) =>
          Math.min(prev + 1, totalPaginas)
        )
      }
      disabled={paginaActual === totalPaginas}
      className="px-4 py-2 rounded-xl border disabled:opacity-40"
    >
      Siguiente
    </button>

  </div>

</div>
        </div>

      </div>

{openModal && (

  <ModalRegistro
  openModal={openModal}
  setOpenModal={setOpenModal}

  sedes={sedes}

  sedeSeleccionada={sedeSeleccionada}
  setSedeSeleccionada={setSedeSeleccionada}

  ambienteSeleccionado={ambienteSeleccionado}
  setAmbienteSeleccionado={setAmbienteSeleccionado}

  ambientes={ambientes}
   onSaved={cargarVisitas}
/>

)}    </main>

  );

}