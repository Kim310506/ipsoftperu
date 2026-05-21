import { useEffect, useMemo, useState } from "react";
import api from "../../../../api/axios";
import {
  ClipboardList,
  FileSpreadsheet,
  FileText,
  Printer,
  Search,
} from "lucide-react";

export default function ReportesVisitas() {

  const [busqueda, setBusqueda] = useState("");
  const [visitas, setVisitas] = useState([]);

  useEffect(() => {
    const fetchVisitas = async () => {
      try {
        const res = await api.get("/visitas");
        setVisitas(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log("Error cargando visitas:", error);
      }
    };

    fetchVisitas();
  }, []);
 
  /* ========================= */
  /* GENERAR FILAS */
  /* ========================= */

  const filasReporte = useMemo(() => {

  let filas = [];

  visitas.forEach((visita) => {

    visita.visitantes?.forEach((visitante) => {

      filas.push({

        fecha: visita.fecha,
        dni: visitante.dni,
        nombres: visitante.nombres,
        apellidoPaterno: visitante.apellidoPaterno,
        apellidoMaterno: visitante.apellidoMaterno,
        empresa: visitante.empresa,

        // 👇 VIENE DEL BACKEND
        local: visita.sede?.nombre || "SIN SEDE",
        area: visita.ambiente?.nombre || "SIN ÁREA",

        horario: `${visita.horaEntrada} - ${visita.horaSalida}`,
        motivo: visita.motivo,

        entrada: "11:45",
        salida: "11:45",

      });

    });

  });

  return filas.filter((item) => {

    const texto = `
      ${item.fecha}
      ${item.dni}
      ${item.nombres}
      ${item.apellidoPaterno}
      ${item.apellidoMaterno}
      ${item.empresa}
      ${item.local}
      ${item.area}
      ${item.motivo}
    `.toLowerCase();

    return texto.includes(busqueda.toLowerCase());

  });

}, [visitas, busqueda]);

  return (

    <main className="p-6 lg:p-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#1E55C0] to-[#3f83f8] rounded-3xl p-8 mb-8 shadow-lg">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white">

            <ClipboardList size={34} />

          </div>

          <div>

            <h1 className="text-4xl font-black text-white">
              Reporte de Visitas
            </h1>

            <p className="text-blue-100 mt-1">
              Sistema de Administración y Control
            </p>

          </div>

        </div>

      </div>

      {/* CONTENEDOR */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

        {/* TOP */}
        <div className="p-6 flex flex-col xl:flex-row gap-5 xl:items-center xl:justify-between">

          {/* BOTONES */}
          <div className="flex flex-wrap items-center gap-4">

            <button className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-3 shadow-sm">

              <FileSpreadsheet size={20} />

              Excel

            </button>

            <button className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-3 shadow-sm">

              <FileText size={20} />

              PDF

            </button>

            <button className="bg-gray-700 hover:bg-gray-800 transition text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-3 shadow-sm">

              <Printer size={20} />

              Imprimir

            </button>

          </div>

          {/* BUSCADOR */}
          <div className="relative w-full xl:w-[320px]">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) =>
                setBusqueda(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-2xl pl-11 pr-4 py-3 outline-none focus:border-[#1E55C0]"
            />

          </div>

        </div>

        {/* TABLA */}
        <div className="overflow-x-auto">

          <table className="w-full min-w-[1600px]">

            <thead className="bg-[#3f83f8] text-white">

              <tr className="text-left text-xs uppercase">

                <th className="px-6 py-4">
                  Fecha
                </th>

                <th className="px-6 py-4">
                  DNI
                </th>

                <th className="px-6 py-4">
                  Nombres
                </th>

                <th className="px-6 py-4">
                  Ap. Paterno
                </th>

                <th className="px-6 py-4">
                  Ap. Materno
                </th>

                <th className="px-6 py-4">
                  Empresa
                </th>

                <th className="px-6 py-4">
                  Local
                </th>

                <th className="px-6 py-4">
                  Área
                </th>

                <th className="px-6 py-4">
                  Horario
                </th>

                <th className="px-6 py-4">
                  Motivo
                </th>

                <th className="px-6 py-4">
                  Entrada
                </th>

                <th className="px-6 py-4">
                  Salida
                </th>

              </tr>

            </thead>

            <tbody>

              {filasReporte.map(
                (item, index) => (

                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-[#f8fafc]"
                  >

                    <td className="px-6 py-5">
                      {item.fecha}
                    </td>

                    <td className="px-6 py-5 font-semibold text-gray-700">
                      {item.dni}
                    </td>

                    <td className="px-6 py-5">
                      {item.nombres}
                    </td>

                    <td className="px-6 py-5">
                      {item.apellidoPaterno}
                    </td>

                    <td className="px-6 py-5">
                      {item.apellidoMaterno}
                    </td>

                    <td className="px-6 py-5">
                      {item.empresa}
                    </td>

                    <td className="px-6 py-5">
                      {item.local}
                    </td>

                    <td className="px-6 py-5">
                      {item.area}
                    </td>

                    <td className="px-6 py-5">
                      {item.horario}
                    </td>

                    <td className="px-6 py-5">
                      {item.motivo}
                    </td>

                    <td className="px-6 py-5">
                      {item.entrada}
                    </td>

                    <td className="px-6 py-5">
                      {item.salida}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </main>

  );

}

