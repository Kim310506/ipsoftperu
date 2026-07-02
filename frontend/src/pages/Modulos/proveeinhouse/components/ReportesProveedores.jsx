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

export default function ReportesProveedores() {

  const [contratas, setContratas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  const [paginaActual, setPaginaActual] =
    useState(1);

  const registrosPorPagina = 8;

  useEffect(() => {

    cargarContratas();

  }, []);

  const cargarContratas = async () => {

    try {

      const res =
        await api.get("/contratasinhouse");

      setContratas(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    } catch (error) {

      console.log(error);

    }

  };

const filasReporte = useMemo(() => {

  let filas = [];

  contratas.forEach((contrata) => {

    contrata.trabajadores?.forEach((trabajador) => {

      filas.push({

        fecha: new Date(
          contrata.fechaInicio
        ).toLocaleDateString(),

        dni: trabajador.dni,

        nombres: trabajador.nombres,

        apellidoPaterno:
          trabajador.apellidoPaterno,

        apellidoMaterno:
          trabajador.apellidoMaterno,

        empresa:
          contrata.empresaContratista,

        local:
          contrata.sede?.nombre ||
          "SIN LOCAL",

        area:
          contrata.ambiente?.nombre ||
          "SIN ÁREA",

        horario:
          `${contrata.horaEntrada} - ${contrata.horaSalida}`,

        motivo:
          contrata.motivo,

       entrada: trabajador.horaIngreso
        ? new Date(
            trabajador.horaIngreso
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        : "-",

      salida: trabajador.horaSalida
        ? new Date(
            trabajador.horaSalida
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        : "-",

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

    return texto.includes(
      busqueda.toLowerCase()
    );

  });

}, [contratas, busqueda]);
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

  const filasFiltradas = useMemo(() => {

    let data = [...filasReporte];

    if (sortConfig.key) {

      data.sort((a, b) => {

        let aValue =
          a[sortConfig.key];

        let bValue =
          b[sortConfig.key];

        if (
          sortConfig.key === "fecha"
        ) {

          aValue =
            new Date(aValue);

          bValue =
            new Date(bValue);

        }

        if (aValue < bValue)
          return sortConfig.direction ===
            "asc"
            ? -1
            : 1;

        if (aValue > bValue)
          return sortConfig.direction ===
            "asc"
            ? 1
            : -1;

        return 0;

      });

    }

    return data;

  }, [filasReporte, sortConfig]);

  const totalPaginas =
    Math.ceil(
      filasFiltradas.length /
      registrosPorPagina
    );

  const indiceInicial =
    (paginaActual - 1) *
    registrosPorPagina;

  const filasPaginadas =
    filasFiltradas.slice(
      indiceInicial,
      indiceInicial +
        registrosPorPagina
    );

  useEffect(() => {

    setPaginaActual(1);

  }, [busqueda]);

  const exportarExcel = () => {

    const worksheet =
      XLSX.utils.json_to_sheet(
        filasReporte
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Proveedores"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

    const fileData =
      new Blob(
        [excelBuffer],
        {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        }
      );

    saveAs(
      fileData,
      "reporte_proveedores.xlsx"
    );

  };

  const exportarPDF = () => {

    const doc = new jsPDF(
      "landscape"
    );

    doc.setFontSize(18);

    doc.text(
      "Reporte de Proveedores",
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
  "Salida"
]],

body: filasReporte.map((item) => [

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

]),

      styles: {
        fontSize: 7,
      },

      headStyles: {
        fillColor: [30, 85, 192],
      },

    });

    doc.save(
      "reporte_proveedores.pdf"
    );

  };

  const imprimirReporte = () => {

    const contenido =
      document.getElementById(
        "tabla-reporte"
      ).outerHTML;

    const ventana =
      window.open(
        "",
        "",
        "width=1200,height=800"
      );

    ventana.document.write(`
      <html>
      <head>
      <title>Reporte Proveedores</title>

      <style>

      body{
        font-family:Arial;
        padding:20px;
      }

      table{
        width:100%;
        border-collapse:collapse;
      }

      th,td{
        border:1px solid #ccc;
        padding:8px;
        font-size:11px;
      }

      th{
        background:#1E55C0;
        color:white;
      }

      </style>

      </head>

      <body>

      <h1>
      Reporte de Proveedores
      </h1>

      ${contenido}

      </body>
      </html>
    `);

    ventana.document.close();
    ventana.print();

  };

  return (

    <main className="w-full max-w-full p-3 sm:p-5 lg:p-8">

      <div className="bg-gradient-to-r from-[#1E55C0] to-[#3f83f8] rounded-3xl p-8 mb-8 shadow-lg">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white">

            <ClipboardList size={34} />

          </div>

          <div>

            <h1 className="text-4xl font-black text-white">
              Reporte de Proveedores
            </h1>

            <p className="text-blue-100">
              Sistema de Contratas
            </p>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

        <div className="p-6 flex flex-col xl:flex-row gap-4 justify-between">

          <div className="flex gap-3 flex-wrap">

            <button
              onClick={exportarExcel}
              className="bg-green-500 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
            >
              <FileSpreadsheet size={20}/>
              Excel
            </button>

            <button
              onClick={exportarPDF}
              className="bg-red-500 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
            >
              <FileText size={20}/>
              PDF
            </button>

            <button
              onClick={imprimirReporte}
              className="bg-gray-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
            >
              <Printer size={20}/>
              Imprimir
            </button>

          </div>

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
              className="w-full border rounded-2xl pl-11 pr-4 py-3"
            />

          </div>

        </div>

        <div className="overflow-x-auto">

          <table
            id="tabla-reporte"
            className="
w-full
table-auto
text-sm
"
          >
            <thead className="bg-[#3f83f8] text-white">
              <tr>
                <th onClick={() => handleSort("fecha")} className="p-4 cursor-pointer">
                  Fecha
                </th>

                <th onClick={() => handleSort("dni")} className="p-4 cursor-pointer">
                  DNI
                </th>

                <th onClick={() => handleSort("nombres")} className="p-4 cursor-pointer">
                  Nombres
                </th>

                <th className="p-4">
                  Ap. Paterno
                </th>

                <th className="p-4">
                  Ap. Materno
                </th>

                <th className="p-4">
                  Empresa
                </th>

                <th className="p-4">
                  Local
                </th>

                <th className="p-4">
                  Área
                </th>

                <th className="p-4">
                  Horario
                </th>

                <th className="p-4">
                  Motivo
                </th>

                <th className="p-4">
                  Entrada
                </th>

                <th className="p-4">
                  Salida
                </th>

              </tr>

            </thead>

           <tbody>
            {filasPaginadas.map((item, index) => (

              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {item.fecha}
                </td>

                <td className="p-4">
                  {item.dni}
                </td>

                <td className="p-4">
                  {item.nombres}
                </td>

                <td className="p-4">
                  {item.apellidoPaterno}
                </td>

                <td className="p-4">
                  {item.apellidoMaterno}
                </td>

                <td className="p-4">
                  {item.empresa}
                </td>

                <td className="p-4">
                  {item.local}
                </td>

                <td className="p-4">
                  {item.area}
                </td>

                <td className="p-4">
                  {item.horario}
                </td>

                <td className="p-4">
                  {item.motivo}
                </td>

                <td className="p-4">
                  {item.entrada}
                </td>

                <td className="p-4">
                  {item.salida}
                </td>

              </tr>

            ))}

          </tbody>

          </table>

        </div>

      </div>

      <div className="flex justify-center gap-2 mt-5">

        {Array.from(
          { length: totalPaginas },
          (_, i) => (

            <button
              key={i}
              onClick={() =>
                setPaginaActual(
                  i + 1
                )
              }
              className={`px-4 py-2 rounded-xl ${
                paginaActual === i + 1
                  ? "bg-[#1E55C0] text-white"
                  : "border"
              }`}
            >
              {i + 1}
            </button>

          )
        )}

      </div>

    </main>

  );

}