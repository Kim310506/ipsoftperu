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
} from "lucide-react";

export default function ReportesAsistencia() {

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

  const filtrados = asistencias.filter((a) =>
    a.user?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  /* =======================
     EXPORTAR EXCEL
  ======================= */
  const exportExcel = () => {
    const data = filtrados.map((a) => ({
      Empleado: a.user?.nombre,
      Fecha: new Date(a.fecha).toLocaleDateString(),
      Tipo: a.tipo,
      Latitud: a.latitud,
      Longitud: a.longitud,
      Distancia: a.distancia,
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

    const tableData = filtrados.map((a) => [
      a.user?.nombre,
      new Date(a.fecha).toLocaleDateString(),
      a.tipo,
      a.latitud,
      a.longitud,
      a.distancia?.toFixed(2),
    ]);

    autoTable(doc, {
      head: [["Empleado", "Fecha", "Tipo", "Lat", "Lon", "Distancia"]],
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
            className="rounded-xl bg-[#244db7] text-white font-bold flex items-center justify-center gap-2"
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

          <thead className="bg-[#244db7] text-white">
            <tr>
              <th className="p-4">Empleado</th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Lat</th>
              <th>Lon</th>
              <th>Distancia</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan="6" className="p-6 text-center">
                  Cargando...
                </td>
              </tr>
            ) : filtrados.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-400">
                  Sin registros
                </td>
              </tr>
            ) : (
              filtrados.map((a) => (
                <tr key={a.id} className="text-center border-b">

                  <td className="p-4">{a.user?.nombre}</td>
                    <td>
                    {new Date(a.fecha).toLocaleDateString()}{" "}
                    {new Date(a.fecha).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                    </td>
                  <td>
                    <span className={`
                      px-3 py-1 rounded-full text-sm
                      ${a.tipo === "ENTRADA"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"}
                    `}>
                      {a.tipo}
                    </span>
                  </td>

                  <td>{a.latitud}</td>
                  <td>{a.longitud}</td>
                  <td>{a.distancia?.toFixed(2)} m</td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}