// src/pages/modulos/sismos/components/InicioSismos.jsx
import { useEffect, useState } from "react";
import api from "../../../../api/axios";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
DataTable.use(DT);
import ReportarSismo from "./ReportarSismo";
import DetalleSismoModal from "./DetalleSismoModal";
import {
  Activity,
  ClipboardList,
  Megaphone
} from "lucide-react";

export default function InicioSismos() {
  const [openModal, setOpenModal] = useState(false);
const [reportes, setReportes] = useState([]);
useEffect(() => {
  cargarReportes();
}, []);
const [openDetalle, setOpenDetalle] =
  useState(false);

const [reporteSeleccionado,
  setReporteSeleccionado] =
  useState(null);
const cargarReportes = async () => {
  try {

    const usuario = JSON.parse(
      localStorage.getItem("sismosUser")
    );

    const { data } = await api.get("/sismos");

    const filtrados = data.filter(
      (x) => x.responsableId === usuario.id
    );

    setReportes(filtrados);

  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {

  const tabla = document.querySelector(
    "#tablaSismos"
  );

  const clickHandler = (e) => {

    if (
      e.target.classList.contains(
        "btn-ver"
      )
    ) {

      const fila =
        e.target.closest("tr");

      const index =
        fila._DT_RowIndex;

      setReporteSeleccionado(
        reportes[index]
      );

      setOpenDetalle(true);

    }

  };

  tabla?.addEventListener(
    "click",
    clickHandler
  );

  return () => {
    tabla?.removeEventListener(
      "click",
      clickHandler
    );
  };

}, [reportes]);
  return (

    <div className="space-y-6">

      {/* ESTADO */}
      <div
        className="
          bg-white
          rounded-2xl
          shadow-sm
          p-6
        "
      >
        <div className="flex items-center gap-3">

          <Activity
            className="text-green-500"
            size={30}
          />

          <div>

            <h2 className="font-bold text-xl">
              Sin Actividad
            </h2>

            <p className="text-gray-500">
              Sistema en espera.
            </p>

          </div>

        </div>
      </div>

      {/* REPORTE */}
      <div
        className="
          bg-white
          rounded-2xl
          shadow-sm
        "
      >

        <div
          className="
            flex
            justify-between
            items-center
            p-6
            border-b
          "
        >

          <div className="flex items-center gap-3">

            <ClipboardList size={28} />

            <h2 className="font-bold text-2xl">
              Reporte de Sismo
            </h2>

          </div>

         <button
  onClick={() => setOpenModal(true)}
  className="
    bg-red-500
    hover:bg-red-600
    text-white
    px-5
    py-3
    rounded-xl
    flex
    items-center
    gap-2
    font-semibold
  "
>
  <Megaphone size={18} />
  REPORTAR
</button>

        </div>

        <div className="p-6">

          <h3 className="font-semibold mb-4">
            Historial de Mis Reportes
          </h3>

          {/* DATATABLE AQUÍ */}

  <DataTable
  data={reportes}
  id="tablaSismos"
  className="display"
  columns={[
    {
      title: "Fecha Incidente",
      data: null,
      render: (data) =>
        `${new Date(
          data.fechaIncidente
        ).toLocaleDateString()}
        <br/>
        ${data.horaIncidente}`
    },
    {
      title: "Responsable",
      data: "responsable.nombre"
    },
    {
      title: "Detalles",
      data: null,
      render: (data) =>
        `Evac: ${
          data.evacuaron ? "SI" : "NO"
        } | Daños: ${
          data.danios ? "SI" : "NO"
        }`
    },
    {
  title: "Reporte",
  data: null,
  render: () =>
    `<button class="btn-ver bg-blue-500 text-white px-3 py-1 rounded">
      Ver Reporte
    </button>`
}
  ]}
  options={{
    pageLength: 10,
    responsive: true,
    language: {
      search: "Buscar:",
      lengthMenu: "Mostrar _MENU_ registros",
      info:
        "Mostrando _START_ a _END_ de _TOTAL_ registros",
      paginate: {
        previous: "Anterior",
        next: "Siguiente"
      }
    }
  }}
>
  <thead>
    <tr>
      <th>Fecha Incidente</th>
      <th>Responsable</th>
      <th>Detalles</th>
      <th>Reporte</th>
    </tr>
  </thead>
</DataTable>

        </div>

      </div>
<ReportarSismo
  open={openModal}
  onClose={() => setOpenModal(false)}
/>
<DetalleSismoModal
  open={openDetalle}
  onClose={() =>
    setOpenDetalle(false)
  }
  reporte={reporteSeleccionado}
/>
    </div>

  );

}