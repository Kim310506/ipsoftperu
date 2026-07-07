import { useEffect, useState } from "react";
import api from "../../../../api/axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Search,
  Download,
  FileSpreadsheet,
  Printer,
  Eye,
} from "lucide-react";

export default function ReportesAsistencia() {
const [modalOpen, setModalOpen] = useState(false);
const [detalle, setDetalle] = useState(null);
  const [asistencias, setAsistencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const obtenerDatos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/asistencia");
      setAsistencias(res.data.data || []);
    } catch (error) {
      console.error("ERROR ASISTENCIAS:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

 const agrupados = Object.values(
  asistencias.reduce((acc, item) => {
    const fecha = new Date(item.fecha).toLocaleDateString();
    const key = `${item.userId}-${fecha}`;

    if (!acc[key]) {
      acc[key] = {
        user: item.user,
        fecha,
        sede: item.sede,
        registros: [],
      };
    }

    acc[key].registros.push(item);

    return acc;
  }, {})
)
  .map((g) => ({
    ...g,
    registros: g.registros.sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    ),
  }))
  .filter((g) =>
    g.user.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
const abrirDetalle = (asistencia) => {
  setDetalle(asistencia);
  setModalOpen(true);
};
  /* =======================
     EXPORTAR EXCEL
  ======================= */
  const exportExcel = () => {
    const data = agrupados.map((g) => ({
      Empleado: g.user.nombre,
      Fecha: g.fecha,
      Entradas: g.registros.filter(r => r.tipo === "ENTRADA").length,
      Salidas: g.registros.filter(r => r.tipo === "SALIDA").length,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Asistencias");

    XLSX.writeFile(wb, "reporte_asistencia.xlsx");
  };

  /* =======================
     EXPORTAR PDF
  ======================= */
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text("Reporte de Asistencia", 14, 10);

    const tableData = agrupados.map((g) => [
      g.user.nombre,
      g.fecha,
      g.registros.filter(r => r.tipo === "ENTRADA").length,
      g.registros.filter(r => r.tipo === "SALIDA").length,
    ]);

    autoTable(doc, {
      head: [["Empleado", "Fecha", "Entradas", "Salidas"]],
      body: tableData,
    });

    doc.save("reporte_asistencia.pdf");
  };

  /* =======================
     IMPRIMIR
  ======================= */
  const imprimir = () => {
    const printContent = document.getElementById("tabla-print").innerHTML;
    const win = window.open("", "", "width=900,height=600");

    win.document.write(`
      <html>
        <head>
          <title>Imprimir Reporte</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
            th { background: #244db7; color: white; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);

    win.document.close();
    win.print();
  };

  return (
    <div className="space-y-8">

      {/* TÍTULO */}
      <div>
        <h1 className="text-3xl font-black text-gray-800">
          Reportes de Asistencia
        </h1>
        <p className="text-gray-500 mt-2">
          Consulta y exporta el historial de asistencias.
        </p>
      </div>

      {/* FILTRO */}
      <div className="bg-white rounded-3xl shadow p-6">
        <div className="grid lg:grid-cols-3 gap-4">

          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            type="text"
            placeholder="Buscar empleado..."
            className="border rounded-xl p-3 outline-none"
          />

          <button
            onClick={obtenerDatos}
           className="rounded-xl bg-[#F5B300] hover:bg-[#d89d00] text-black font-bold flex items-center justify-center gap-2 transition"
          >
            <Search size={18}/>
            Buscar
          </button>

        </div>
      </div>

      {/* BOTONES */}
      <div className="flex gap-4">

        <button
          onClick={exportExcel}
          className="px-5 py-3 rounded-xl bg-green-600 text-white font-bold flex items-center gap-2"
        >
          <FileSpreadsheet size={18}/>
          Exportar Excel
        </button>

        <button
          onClick={exportPDF}
          className="px-5 py-3 rounded-xl bg-red-600 text-white font-bold flex items-center gap-2"
        >
          <Download size={18}/>
          Exportar PDF
        </button>

        <button
          onClick={imprimir}
          className="px-5 py-3 rounded-xl bg-gray-800 text-white font-bold flex items-center gap-2"
        >
          <Printer size={18}/>
          Imprimir
        </button>

      </div>

      {/* TABLA */}
      <div id="tabla-print" className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#F5B300] text-black">
            <tr>
                <th className="p-4">Empleado</th>
                <th>Fecha</th>
                <th>Acción</th>
            </tr>
            </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan="6" className="p-6 text-center">
                  Cargando...
                </td>
              </tr>
            ) : agrupados.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-400">
                  Sin registros
                </td>
              </tr>
            ) : (
              agrupados.map((grupo) => (
              <tr
                key={`${grupo.user.id}-${grupo.fecha}`}
                className="border-b hover:bg-gray-50 transition"
              >

                  <td className="p-4 text-center font-medium">
                    {grupo.user.nombre}
                  </td>

                  <td className="p-4 text-center">
                    {grupo.fecha}
                  </td>
                  <td>
                      <button
                        onClick={() => abrirDetalle(grupo)}
                        className="flex items-center gap-2 bg-[#F5B300] hover:bg-[#d89d00] text-black px-4 py-2 rounded-xl mx-auto transition font-semibold"
                    >
                        <Eye size={18}/>
                        Ver
                    </button>
                  </td>

              </tr>
              ))
            )}

          </tbody>

        </table>
{modalOpen && detalle && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
    <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">

      <div className="flex justify-between items-start border-b pb-5 mb-6">
        <div>
          <h2 className="text-3xl font-black text-[#F5B300]">
            {detalle.user.nombre}
          </h2>

          <p className="text-gray-500">
            {detalle.fecha}
          </p>

          <p className="mt-2">
            <span className="font-semibold">Sede:</span>{" "}
            {detalle.sede.nombre}
          </p>
        </div>

        <button
          onClick={() => setModalOpen(false)}
          className="text-2xl text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      <div className="space-y-5">

        {detalle.registros.map((r) => (

          <div
            key={r.id}
            className={`rounded-2xl border-l-8 shadow-md p-5 ${
              r.tipo === "ENTRADA"
                ? "border-green-500 bg-green-50"
                : "border-red-500 bg-red-50"
            }`}
          >

            <div className="flex justify-between items-center">

              <div>

                <h3
                  className={`text-xl font-bold ${
                    r.tipo === "ENTRADA"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {r.tipo}
                </h3>

                <p className="text-gray-500">
                  {new Date(r.fecha).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

              </div>

              <div
                className={`px-4 py-2 rounded-full font-bold ${
                  r.tipo === "ENTRADA"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {r.distancia.toFixed(2)} m
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4 shadow">
                <p className="text-sm text-gray-500">
                  Latitud
                </p>

                <p className="font-semibold break-all">
                  {r.latitud}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow">
                <p className="text-sm text-gray-500">
                  Longitud
                </p>

                <p className="font-semibold break-all">
                  {r.longitud}
                </p>
              </div>

            </div>

          </div>

        ))}

      </div>

      <div className="flex justify-end mt-8">

        <button
          onClick={() => setModalOpen(false)}
          className="bg-[#F5B300] hover:bg-[#d89d00] text-black px-8 py-3 rounded-xl font-bold transition"
        >
          Cerrar
        </button>

      </div>

    </div>
  </div>
)}
      </div>

    </div>
  );
}