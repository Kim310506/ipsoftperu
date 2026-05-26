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
import ModalRegistro from "./ProgramarVisitas/ModalRegistro";

export default function InicioVisitas() {

  /* ========================= */
  /* STATES */
  /* ========================= */

  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const [visitantes, setVisitantes] = useState([]);

  const [zonales, setZonales] = useState([]);

  const [sedeSeleccionada, setSedeSeleccionada] = useState("");
  const [ambienteSeleccionado, setAmbienteSeleccionado] = useState("");

  const [tipoVisita, setTipoVisita] = useState("INTERNO");
  const [tipoCarga, setTipoCarga] = useState("INDIVIDUAL");

  const [dni, setDni] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");

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
  /* AGREGAR VISITANTE */
  /* ========================= */

  const agregarVisitante = () => {
    if (!dni || !nombres || !apellidoPaterno || !apellidoMaterno) return;

    const nuevo = {
      id: Date.now(),
      dni,
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      email,
      empresa,
    };

    setVisitantes([...visitantes, nuevo]);

    setDni("");
    setNombres("");
    setApellidoPaterno("");
    setApellidoMaterno("");
    setEmail("");
    setEmpresa("");
  };

  /* ========================= */
  /* VISITAS */
  /* ========================= */

  useEffect(() => {
    const cargarVisitas = async () => {
      try {
        setLoading(true);
        const res = await api.get("/visitas");
        setVisitas(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    cargarVisitas();
  }, []);

  /* ========================= */
  /* ESTADISTICAS */
  /* ========================= */

  const estadisticas = useMemo(() => ({
    visitas: visitas.length,
    pendientes: visitas.filter(v => v.estado === "PENDIENTE").length,
    aprobados: visitas.filter(v => v.estado === "AUTORIZADO").length,
  }), [visitas]);

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

 const visitasFiltradas = useMemo(() => {
  let data = [...visitas];

  // FILTRO
  data = data.filter((item) => {
    const texto = `
      ${item.fechaInicio}
      ${item.codigo}
      ${item.tipo}
      ${obtenerNombreSede(item.sedeId)}
      ${obtenerNombreAmbiente(item.ambienteId)}
      ${item.motivo}
      ${item.estado}
      ${item.autorizado}
    `.toLowerCase();

    return texto.includes(busqueda.toLowerCase());
  });

  // SORT (AQUÍ ES DONDE FALTABA)
  if (sortConfig.key) {
    data.sort((a, b) => {
      let valA;
      let valB;

      switch (sortConfig.key) {
        case "fecha":
          valA = new Date(a.fechaInicio);
          valB = new Date(b.fechaInicio);
          break;

        case "codigo":
          valA = a.codigo;
          valB = b.codigo;
          break;

        case "tipo":
          valA = a.tipo;
          valB = b.tipo;
          break;

        case "sede":
          valA = obtenerNombreSede(a.sedeId);
          valB = obtenerNombreSede(b.sedeId);
          break;

        case "area":
          valA = obtenerNombreAmbiente(a.ambienteId);
          valB = obtenerNombreAmbiente(b.ambienteId);
          break;

        case "motivo":
          valA = a.motivo;
          valB = b.motivo;
          break;

        case "estado":
          valA = a.estado;
          valB = b.estado;
          break;

        case "autorizado":
          valA = a.autorizadoPor?.nombre || "";
          valB = b.autorizadoPor?.nombre || "";
          break;

        default:
          return 0;
      }

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  return data;
}, [visitas, busqueda, sortConfig]);
/* ========================= */
/* PAGINACION */
/* ========================= */

const totalPaginas = Math.ceil(
  visitasFiltradas.length / registrosPorPagina
);

const indiceInicial =
  (paginaActual - 1) * registrosPorPagina;

const indiceFinal =
  indiceInicial + registrosPorPagina;

const visitasPaginadas =
  visitasFiltradas.slice(
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
              {estadisticas.aprobados}
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
              {estadisticas.visitas}
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

    <th
      onClick={() => handleSort("fecha")}
      className="px-6 py-4 cursor-pointer select-none font-black"
    >
      <div className="flex items-center gap-2">
        FECHA
        <span className="text-[10px] text-gray-400">
          ▲▼
        </span>
      </div>
    </th>

    <th
      onClick={() => handleSort("codigo")}
      className="px-6 py-4 cursor-pointer select-none font-black"
    >
      <div className="flex items-center gap-2">
        CODIGO
        <span className="text-[10px] text-gray-400">
          ▲▼
        </span>
      </div>
    </th>

    <th
      onClick={() => handleSort("tipo")}
      className="px-6 py-4 cursor-pointer select-none font-black"
    >
      <div className="flex items-center gap-2">
        TIPO
        <span className="text-[10px] text-gray-400">
          ▲▼
        </span>
      </div>
    </th>

    <th
      onClick={() => handleSort("sede")}
      className="px-6 py-4 cursor-pointer select-none font-black"
    >
      <div className="flex items-center gap-2">
        LOCAL
        <span className="text-[10px] text-gray-400">
          ▲▼
        </span>
      </div>
    </th>

    <th
      onClick={() => handleSort("area")}
      className="px-6 py-4 cursor-pointer select-none font-black"
    >
      <div className="flex items-center gap-2">
        AREA
        <span className="text-[10px] text-gray-400">
          ▲▼
        </span>
      </div>
    </th>

    <th className="px-4 lg:px-6 py-4 text-xs font-black">
      HORARIO
    </th>

    <th
      onClick={() => handleSort("motivo")}
      className="px-6 py-4 cursor-pointer select-none font-black"
    >
      <div className="flex items-center gap-2">
        MOTIVO
        <span className="text-[10px] text-gray-400">
          ▲▼
        </span>
      </div>
    </th>

    <th
      onClick={() => handleSort("estado")}
      className="px-6 py-4 cursor-pointer select-none font-black"
    >
      <div className="flex items-center gap-2">
        ESTADO
        <span className="text-[10px] text-gray-400">
          ▲▼
        </span>
      </div>
    </th>

    <th
      onClick={() => handleSort("autorizado")}
      className="px-6 py-4 cursor-pointer select-none font-black"
    >
      <div className="flex items-center gap-2">
        AUTORIZADO
        <span className="text-[10px] text-gray-400">
          ▲▼
        </span>
      </div>
    </th>

    <th className="px-4 lg:px-6 py-4 text-xs text-center font-black">
      ACCIONES
    </th>

  </tr>

            </thead>

            <tbody>

              {visitasPaginadas.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-[#f8fafc] transition"
                >

          <td className="px-4 lg:px-6 py-4 text-sm">                    
            {item.fechaInicio}
                  </td>

                  <td className="px-4 lg:px-6 py-4 text-sm">
                    {item.codigo}
                  </td>

                  <td className="px-4 lg:px-6 py-4 text-sm">

                    <span className="bg-yellow-500 text-yellow-100 px-4 py-1 rounded-xl text-sm font-bold">

                      {item.tipo}

                    </span>

                  </td>

                  <td className="px-4 lg:px-6 py-4 text-sm">

                    {obtenerNombreSede(item.sedeId)}

                  </td>

                  <td className="px-4 lg:px-6 py-4 text-sm">

                    {obtenerNombreAmbiente(item.ambienteId)}

                  </td>
                    <td className="px-6 py-5 font-semibold text-gray-700">

                    {item.horaEntrada} - {item.horaSalida}

                    </td>
                  <td className="px-4 lg:px-6 py-4 text-sm">
                    {item.motivo}
                  </td>
                    <td className="px-4 lg:px-6 py-4 text-sm">
  <span
    className={`px-4 py-1 rounded-full text-xs font-bold ${
      item.estado === "PENDIENTE"
        ? "bg-yellow-100 text-yellow-700"
        : item.estado === "AUTORIZADO"
        ? "bg-green-100 text-green-700"
        : "bg-gray-100 text-gray-700"
    }`}
  >
    {item.estado}
  </span>
</td>

                  <td className="px-4 lg:px-6 py-4 text-sm">
                    {item.autorizadoPor?.nombre || "—"}
                  </td>

                  <td className="px-4 lg:px-6 py-4 text-sm">

                    <div className="flex items-center justify-center gap-4">

                      <button className="text-gray-500 hover:text-blue-600 transition">

                        <Send size={19} />

                      </button>

                      <button className="text-red-500 hover:text-red-700 transition">

                        <Trash2 size={19} />

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
          visitasFiltradas.length
        )
      }
    </span>

    de

    <span className="font-bold text-[#1E55C0] mx-1">
      {visitasFiltradas.length}
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

    tipoVisita={tipoVisita}
    setTipoVisita={setTipoVisita}

    tipoCarga={tipoCarga}
    setTipoCarga={setTipoCarga}

    sedeSeleccionada={sedeSeleccionada}
    setSedeSeleccionada={setSedeSeleccionada}

    ambienteSeleccionado={ambienteSeleccionado}
    setAmbienteSeleccionado={setAmbienteSeleccionado}

    sedes={sedes}
    ambientes={ambientes}

    dni={dni}
    setDni={setDni}

    nombres={nombres}
    setNombres={setNombres}

    apellidoPaterno={apellidoPaterno}
    setApellidoPaterno={setApellidoPaterno}

    apellidoMaterno={apellidoMaterno}
    setApellidoMaterno={setApellidoMaterno}

    email={email}
    setEmail={setEmail}

    empresa={empresa}
    setEmpresa={setEmpresa}

    visitantes={visitantes}
    setVisitantes={setVisitantes}

    agregarVisitante={agregarVisitante}

  />

)}    </main>

  );

}