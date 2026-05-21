// src/pages/modulos/visitas/components/AutorizarVisitas.jsx
import { useEffect, useMemo, useState } from "react";
import api from "../../../../api/axios";
import {
  ShieldCheck,
  Search,
  Check,
  X,
  Users,
  Clock3,
} from "lucide-react";

import {
  visitasData,
} from "../../../../data/visitasData";

import { zonales } from "../../../../data/infraestructura";

export default function AutorizarVisitas() {
const [user] = useState(() => {
  return JSON.parse(localStorage.getItem("visitasUser"));
});
  /* ========================= */
  /* STATES */
  /* ========================= */

  const [busqueda, setBusqueda] = useState("");

  const [sortConfig, setSortConfig] =
    useState({
      key: "",
      direction: "asc",
    });

  /* ========================= */
  /* OBTENER NOMBRE SEDE */
  /* ========================= */

  const obtenerNombreSede = (sedeId) => {

    for (const zonal of zonales) {

      const sede = zonal.sedes.find(
        (s) => s.id === sedeId
      );

      if (sede) return sede.nombre;

    }

    return "SIN SEDE";

  };
const [visitas, setVisitas] = useState([]);
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
  /* ORDENAMIENTO */
  /* ========================= */

  const handleSort = (key) => {

    let direction = "asc";

    if (
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({
      key,
      direction,
    });

  };
  console.log("USER LOGUEADO:", user);
/* ========================= */ /* MODAL VISITANTES */ /* ========================= */ 
const [openVisitantesModal, setOpenVisitantesModal] = useState(false); 
const [visitaSeleccionada, setVisitaSeleccionada] = useState(null);
  /* ========================= */
  /* FILTRO */
  /* ========================= */

 const visitasFiltradas = useMemo(() => {

  let data = [...visitas];

  data = data.filter((item) => {

    const texto = `
      ${item.codigo}
      ${item.tipo}
      ${item.fecha}
      ${item.estado}
      ${item.motivo}
      ${item.sede?.nombre || "SIN SEDE"}
      ${item.ambiente?.nombre || "SIN ÁREA"}
    `.toLowerCase();

    return texto.includes(busqueda.toLowerCase());

  });

  if (sortConfig.key) {

    data.sort((a, b) => {

      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }

      return 0;

    });

  }

  return data;

}, [visitas, busqueda, sortConfig]); 
const toggleAutorizacion = async (id) => {
  try {
    console.log("CLICK ID:", id);

    const visita = visitas.find(v => v.id === id);
    if (!visita) return;

    const nuevoEstado =
      visita.estado === "AUTORIZADO" ? "PENDIENTE" : "AUTORIZADO";

    const res = await api.put(`/visitas/${id}`, {
      estado: nuevoEstado,
      autorizadoPorId: nuevoEstado === "AUTORIZADO" ? user?.id : null,
    });

    console.log("ACTUALIZADO:", res.data);

    setVisitas(prev =>
  prev.map(v =>
    v.id === id
      ? {
          ...v,
          estado: nuevoEstado,
          autorizadoPor:
            nuevoEstado === "AUTORIZADO"
              ? { nombre: user?.nombre } // o el campo que tengas
              : null
        }
      : v
  )
);

  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message);
  }
};
useEffect(() => {
  const fetchVisitas = async () => {
    try {
      const res = await api.get("/visitas");

      console.log("DATA BACKEND:", res.data); 

      setVisitas(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log("Error cargando visitas:", error);
    }
  };

  fetchVisitas();
}, []);
const pendientes = visitas.filter(v => v.estado === "PENDIENTE").length;
const autorizadas = visitas.filter(v => v.estado === "AUTORIZADO").length;
const total = visitas.length;
  return (

    <main className="p-6 lg:p-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#1E55C0] to-[#3f83f8] rounded-3xl p-8 mb-8 shadow-lg">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white">

            <ShieldCheck size={34} />

          </div>

          <div>

            <h1 className="text-4xl font-black text-white">
              Autorización de Visitas
            </h1>

            <p className="text-blue-100 mt-1">
              Gestión y control de autorizaciones
            </p>

          </div>

        </div>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* PENDIENTES */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center">

              <Clock3 size={28} />

            </div>

            <div>

              <h3 className="font-bold text-gray-500">
                Pendientes
              </h3>

              <p className="text-4xl font-black text-yellow-600">
                {pendientes}
              </p>

            </div>

          </div>

        </div>

        {/* AUTORIZADAS */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">

              <Check size={28} />

            </div>

            <div>

              <h3 className="font-bold text-gray-500">
                Autorizadas
              </h3>

              <p className="text-4xl font-black text-green-600">
                {autorizadas}
              </p>

            </div>

          </div>

        </div>

        {/* VISITANTES */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">

              <Users size={28} />

            </div>

            <div>

              <h3 className="font-bold text-gray-500">
                Visitas
              </h3>

              <p className="text-4xl font-black text-blue-600">
                {total}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* TABLA */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

        {/* HEADER TABLA */}
        <div className="p-6 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

          <h2 className="text-2xl font-black text-[#1E55C0]">
            Lista de visitas
          </h2>

          <div className="relative w-full lg:w-[320px]">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Buscar visita..."
              value={busqueda}
              onChange={(e) =>
                setBusqueda(e.target.value)
              }
              className="w-full border border-gray-300 rounded-2xl pl-11 pr-4 py-3 outline-none focus:border-[#1E55C0]"
            />

          </div>

        </div>

        {/* TABLA */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[1200px]">

            <thead className="bg-[#f8fafc] border-b border-gray-200">

              <tr className="text-left text-xs uppercase text-gray-500">

                <th
                  onClick={() =>
                    handleSort("codigo")
                  }
                  className="px-6 py-4 cursor-pointer"
                >
                  CODIGO
                </th>

                <th className="px-6 py-4">
                  TIPO
                </th>

                <th className="px-6 py-4">
                  FECHA
                </th>

                <th className="px-6 py-4">
                  LOCAL
                </th>

                <th className="px-6 py-4">
                  ÁREA
                </th>

                <th className="px-6 py-4">
                  HORARIO
                </th>

                <th className="px-6 py-4">
                  MOTIVO
                </th>

                <th className="px-6 py-4">
                  ESTADO
                </th>
                <th className="px-6 py-4">
                    AUTORIZADO 
                  </th>
                  <th className="px-6 py-4 text-center"> VISITANTES </th>
                <th className="px-6 py-4 text-center">
                  ACCIONES
                </th>

              </tr>

            </thead>

            <tbody>

              {visitasFiltradas.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-[#f8fafc]"
                >

                  <td className="px-6 py-5 font-semibold text-gray-700">
                    {item.codigo}
                  </td>

                  <td className="px-6 py-5">

                    <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-xs font-bold">

                      {item.tipo}

                    </span>

                  </td>

                  <td className="px-6 py-5">
                    {item.fecha ? new Date(item.fecha).toLocaleDateString() : "-"}
                  </td>

                  <td className="px-6 py-5">
                    {item.sede?.nombre || "SIN SEDE"}

                  </td>

                  <td className="px-6 py-5">
                    {item.ambiente?.nombre || "SIN ÁREA"}
                  </td>

                  <td className="px-6 py-5">

                    {item.horaEntrada} - {" "}
                    {item.horaSalida}

                  </td>

                  <td className="px-6 py-5">
                    {item.motivo}
                  </td>
      
      
                  <td className="px-6 py-5">

                    <span
                      className={`
                        px-4 py-1 rounded-full text-xs font-bold
                        ${
                          item.estado === "AUTORIZADO"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >

                      {item.estado}

                    </span>

                  </td>
                   <td className="px-6 py-5">
                    {item.autorizadoPor?.nombre || "-"}
                  </td>
                  <td className="px-6 py-5">

                    <div className="flex justify-center">

                      <button
                        onClick={() => {

                          setVisitaSeleccionada(item);

                          setOpenVisitantesModal(true);

                        }}
                        className="bg-cyan-500 hover:bg-cyan-600 transition text-white w-11 h-11 rounded-xl flex items-center justify-center shadow-sm"
                      >

                        <Users size={18} />

                      </button>

                    </div>

                  </td>      
                  <td className="px-6 py-5">

                    <div className="flex justify-center">

                      {item.estado === "AUTORIZADO" ? (

                        <button
                            onClick={() => toggleAutorizacion(item.id)}
                            className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 shadow-sm"
                          >
                            <X size={17} />
                            Desautorizar
                          </button>

                      ) : (

                        <button
                            onClick={() => toggleAutorizacion(item.id)}
                            className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 shadow-sm"
                          >
                            <Check size={17} />
                            Autorizar
                          </button>

                      )}

                    </div>

                  </td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>
{/* ========================= */}
{/* MODAL VISITANTES */}
{/* ========================= */}

{openVisitantesModal && visitaSeleccionada && (

  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

    <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#1E55C0] to-[#3f83f8] px-8 py-6 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black text-white">
            Lista de Visitantes
          </h2>

          <p className="text-blue-100 mt-1">
            Código: {visitaSeleccionada.codigo}
          </p>

        </div>

        <button
          onClick={() =>
            setOpenVisitantesModal(false)
          }
          className="w-11 h-11 rounded-xl bg-white/20 hover:bg-white/30 transition text-white flex items-center justify-center"
        >

          <X size={24} />

        </button>

      </div>

      {/* BODY */}
      <div className="p-8 overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead className="bg-[#f8fafc]">

            <tr className="text-left text-xs uppercase text-gray-500">

              <th className="px-5 py-4">
                DNI
              </th>

              <th className="px-5 py-4">
                NOMBRES
              </th>

              <th className="px-5 py-4">
                EMPRESA
              </th>

              <th className="px-5 py-4">
                EMAIL
              </th>


              <th className="px-5 py-4">
                QR
              </th>

              <th className="px-5 py-4">
                ESTADO QR
              </th>

            </tr>

          </thead>

          <tbody>

            {visitaSeleccionada.visitantes.map(
              (visitante) => (

                <tr
                  key={visitante.id}
                  className="border-b border-gray-100 hover:bg-[#f8fafc]"
                >

                  <td className="px-5 py-5 font-semibold text-gray-700">
                    {visitante.dni}
                  </td>

                  <td className="px-5 py-5">

                    {visitante.nombres}{" "}
                    {visitante.apellidoPaterno}{" "}
                    {visitante.apellidoMaterno}

                  </td>

                  <td className="px-5 py-5">
                    {visitante.empresa}
                  </td>

                  <td className="px-5 py-5">
                    {visitante.email}
                  </td>

                  <td className="px-5 py-5">

                    <button className="bg-[#1E55C0] hover:bg-[#1947a3] transition text-white px-4 py-2 rounded-xl font-bold text-sm">

                      Ver QR

                    </button>

                  </td>

                  <td className="px-5 py-5">

                    <span
                      className={`
                        px-4 py-1 rounded-full text-xs font-bold
                        ${
                          visitante.estadoQr ===
                          "ENVIADO"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >

                      {visitante.estadoQr}

                    </span>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  </div>

)}


      </div>

    </main>

  );

}
