import { useEffect, useMemo, useState } from "react";
import api from "../../../../api/axios";
import {
  ClipboardList,
  FileSpreadsheet,
  FileText,
  Printer,
  Search,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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
 const [sortConfig, setSortConfig] = useState({
  key: "",
  direction: "asc",
});

const [paginaActual, setPaginaActual] = useState(1);
const registrosPorPagina = 8;
  /* ========================= */
  /* GENERAR FILAS */
  /* ========================= */

  const filasReporte = useMemo(() => {

  let filas = [];

  visitas.forEach((visita) => {

    visita.visitantes?.forEach((visitante) => {

      filas.push({

        fecha: visita.fechaInicio,
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

        entrada: visitante.horaIngreso
  ? visitante.horaIngreso.split(" ")[1]?.slice(0, 5)
  : "SIN REGISTRO",

salida: visitante.horaSalida
  ? visitante.horaSalida.split(" ")[1]?.slice(0, 5)
  : "SIN REGISTRO",

      });

    });

  });

  return filas.filter((item) => {

    const texto = `
      ${item.fechaInicio}
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
const handleSort = (key) => {
  let direction = "asc";

  if (sortConfig.key === key && sortConfig.direction === "asc") {
    direction = "desc";
  }

  setSortConfig({ key, direction });
};
  /* ========================= */
  /* EXPORTAR EXCEL */
  /* ========================= */

  const exportarExcel = () => {

    const data = filasReporte.map((item) => ({

      Fecha: item.fecha,
      DNI: item.dni,
      Nombres: item.nombres,
      "Apellido Paterno": item.apellidoPaterno,
      "Apellido Materno": item.apellidoMaterno,
      Empresa: item.empresa,
      Local: item.local,
      Área: item.area,
      Horario: item.horario,
      Motivo: item.motivo,
      Entrada: item.entrada,
      Salida: item.salida,

    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Reporte Visitas"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      }
    );

    saveAs(
      fileData,
      "reporte_visitas.xlsx"
    );

  };

  /* ========================= */
  /* EXPORTAR PDF */
  /* ========================= */

  const exportarPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "Reporte de Visitas",
      14,
      20
    );

    autoTable(doc, {

      startY: 30,

      head: [[
        "Fecha",
        "DNI",
        "Nombres",
        "Ap. Paterno",
        "Ap. Materno",
        "Empresa",
        "Local",
        "Área",
        "Horario",
        "Motivo",
        "Entrada",
        "Salida",
      ]],

      body: filasReporte.map((item) => ([

        item.fecha,
        item.dni,
        item.nombres,
        item.apellidoPaterno,
        item.apellidoMaterno,
        item.empresa,
        item.local,
        item.area,
        item.horario,
        item.motivo,
        item.entrada,
        item.salida,

      ])),

      styles: {
        fontSize: 7,
      },

      headStyles: {
        fillColor: [30, 85, 192],
      },

    });

    doc.save("reporte_visitas.pdf");

  };

  /* ========================= */
  /* IMPRIMIR */
  /* ========================= */

  const imprimirReporte = () => {

  const contenido = document.getElementById(
    "tabla-reporte"
  ).outerHTML;

  const ventana = window.open(
    "",
    "",
    "width=1200,height=800"
  );

  ventana.document.write(`
    <html>
      <head>
        <title>Reporte de Visitas</title>

        <style>

          body{
            font-family: Arial;
            padding: 20px;
          }

          h1{
            text-align: center;
            margin-bottom: 20px;
          }

          table{
            width: 100%;
            border-collapse: collapse;
          }

          th{
            background: #1E55C0;
            color: white;
            padding: 10px;
            border: 1px solid #ccc;
            font-size: 12px;
          }

          td{
            padding: 10px;
            border: 1px solid #ccc;
            font-size: 11px;
          }

        </style>

      </head>

      <body>

        <h1>
          Reporte de Visitas
        </h1>

        ${contenido}

      </body>
    </html>
  `);

  ventana.document.close();

  ventana.focus();

  ventana.print();

  ventana.close();

};
const filasFiltradas = useMemo(() => {
  let data = [...filasReporte];

  // FILTRO
  data = data.filter((item) => {
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

  // SORT
  if (sortConfig.key) {
    data.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // fechas bien manejadas
      if (sortConfig.key === "fecha") {
        aValue = new Date(aValue || 0);
        bValue = new Date(bValue || 0);
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  return data;
}, [filasReporte, busqueda, sortConfig]);
const totalPaginas = Math.ceil(filasFiltradas.length / registrosPorPagina);

const indiceInicial = (paginaActual - 1) * registrosPorPagina;
const indiceFinal = indiceInicial + registrosPorPagina;

const filasPaginadas = filasFiltradas.slice(indiceInicial, indiceFinal);
useEffect(() => {
  setPaginaActual(1);
}, [busqueda]);
  return (

<main className="w-full max-w-full p-3 sm:p-5 lg:p-8 overflow-hidden">
      {/* HEADER */}
<div className="bg-gradient-to-r from-[#1E55C0] to-[#3f83f8] rounded-3xl p-5 sm:p-6 lg:p-8 mb-8 shadow-lg overflow-hidden">

<div className="flex flex-col sm:flex-row sm:items-center gap-4">
<div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
            <ClipboardList size={34} />

          </div>

          <div>

<h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white break-words">
                Reporte de Visitas
            </h1>

            <p className="text-blue-100 mt-1">
              Sistema de Administración y Control
            </p>

          </div>

        </div>

      </div>

      {/* CONTENEDOR */}
<div className="bg-white rounded-3xl shadow-sm w-full overflow-hidden">
        {/* TOP */}
<div className="p-4 sm:p-6 flex flex-col xl:flex-row gap-5 xl:items-center xl:justify-between">
          {/* BOTONES */}
<div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 w-full xl:w-auto">
            <button
  onClick={exportarExcel}
  className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-3 shadow-sm"
>

  <FileSpreadsheet size={20} />
  Excel
</button>

<button
  onClick={exportarPDF}
  className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-3 shadow-sm"
>

  <FileText size={20} />

  PDF

</button>

<button
  onClick={imprimirReporte}
  className="bg-gray-700 hover:bg-gray-800 transition text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-3 shadow-sm"
>

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

          <table   id="tabla-reporte" className="w-full min-w-[1600px]">

            <thead className="bg-[#3f83f8] text-white">

              <tr className="text-left text-xs uppercase">

                <th onClick={() => handleSort("fecha")} className="cursor-pointer">
                  Fecha
                </th>

                <th onClick={() => handleSort("dni")} className="cursor-pointer">
                  DNI
                </th>

                <th onClick={() => handleSort("nombres")} className="cursor-pointer">
                  Nombres
                </th>

                <th className="px-6 py-4">
                  Ap. Paterno
                </th>

                <th className="px-6 py-4">
                  Ap. Materno
                </th>

                <th onClick={() => handleSort("empresa")} className="cursor-pointer">
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

              {filasPaginadas.map((item, index) => (
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
<div className="flex gap-2 justify-center mt-4">

  <button
    onClick={() => setPaginaActual((p) => Math.max(p - 1, 1))}
    disabled={paginaActual === 1}
    className="px-4 py-2 border border-gray-200 rounded-xl"
  >
    Anterior
  </button>

  {Array.from({ length: totalPaginas }, (_, i) => (
    <button
      key={i + 1}
      onClick={() => setPaginaActual(i + 1)}
      className={`px-4 py-2 rounded-xl border border-gray-200 ${
        paginaActual === i + 1 ? "bg-[#1E55C0] text-white" : ""
      }`}
    >
      {i + 1}
    </button>
  ))}

  <button
    onClick={() =>
      setPaginaActual((p) => Math.min(p + 1, totalPaginas))
    }
    disabled={paginaActual === totalPaginas}
    className="px-4 py-2 border border-gray-200 rounded-xl"
  >
    Siguiente
  </button>

</div>
    </main>

  );

}

