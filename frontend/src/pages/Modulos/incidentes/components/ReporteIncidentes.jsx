import { useEffect, useState } from "react";
import api from "../../../../api/axios";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";

import "datatables.net-dt/css/dataTables.dataTables.css";

DataTable.use(DT);

export default function ReportesIncidentes({

  setMenuActivo,
  setIncidenteSeleccionado

}) {
    const [ocurrencias, setOcurrencias] = useState([]);

  useEffect(() => {
    cargar();
  }, []);
  useEffect(() => {

  const handleClick = (e) => {

    const btn =
      e.target.closest(".ver-detalle");

    if (btn) {

      const id = btn.dataset.id;

      setIncidenteSeleccionado(id);

      setMenuActivo("detalle");
    }
  };

  document.addEventListener(
    "click",
    handleClick
  );

  return () => {

    document.removeEventListener(
      "click",
      handleClick
    );
  };

}, []);
 const cargar = async () => {

  try {

    const res = await api.get(
      "/incidentes"
    );

    console.log(res.data);

    setOcurrencias(res.data);

  } catch (error) {

    console.log(error);

  }
};

  // ====== CARDS (como tu imagen) ======
  const total = ocurrencias.length;

  const safety = ocurrencias.filter(
    (o) => o.categoria === "SAFETY"
  ).length;

  const security = ocurrencias.filter(
    (o) => o.categoria === "SECURITY"
  ).length;

  const columns = [
    { title: "CÓDIGO", data: "codigo" },

    {
      title: "FECHA",
      data: "createdAt",
      render: (data) =>
        new Date(data).toLocaleDateString(),
    },

    {
      title: "CAMPUS",
      data: "sede.nombre",
      defaultContent: "-",
    },

    {
      title: "ÁREA",
      data: "ambiente.nombre",
      defaultContent: "-",
    },

    { title: "CATEGORÍA", data: "categoria" },
    { title: "MOTIVO", data: "motivo" },
    { title: "DETALLE", data: "detalle" },
    { title: "VÍNCULO", data: "vinculo" },
    { title: "PERSONA", data: "personaInvolucrada" },

    {
      title: "ESTADO",
      data: "estado",
      render: (data) => {
        const isClosed = data === "CERRADO";

        return `
          <span class="${
            isClosed
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          } px-3 py-1 rounded-full text-xs font-bold">
            ${data}
          </span>
        `;
      },
    },

    // ===== BOTÓN VER =====
    {
      title: " ",
      data: null,
     render: (data, type, row) => {
        console.log(row);

        return `
          <button
            class="ver-detalle bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg"
            data-id="${row.id}"
          >
            👁
          </button>
        `;
      },
    },
  ];
 
  return (
    <div className="p-4">

      {/* ===== PANEL DE CONTROL ===== */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Panel de Control{" "}
          <span className="text-gray-500 text-lg">
            ADMINISTRADOR
          </span>
        </h1>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

          {/* SAFETY */}
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4 border-l-4 border-blue-500">
            <div className="bg-blue-100 p-3 rounded-full">
              🛡️
            </div>
            <div>
              <p className="text-sm text-gray-500">
                SAFETY
              </p>
              <h2 className="text-xl font-bold">
                {safety}
              </h2>
            </div>
          </div>

          {/* SECURITY */}
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4 border-l-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-full">
              🔐
            </div>
            <div>
              <p className="text-sm text-gray-500">
                SECURITY
              </p>
              <h2 className="text-xl font-bold">
                {security}
              </h2>
            </div>
          </div>

          {/* TOTAL */}
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4 border-l-4 border-purple-500">
            <div className="bg-purple-100 p-3 rounded-full">
              📊
            </div>
            <div>
              <p className="text-sm text-gray-500">
                TOTAL
              </p>
              <h2 className="text-xl font-bold">
                {total}
              </h2>
            </div>
          </div>

        </div>
      </div>

      {/* ===== TABLA ===== */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        
        <div className="bg-blue-600 px-5 py-4">
          <h2 className="text-white font-bold">
            Reporte de Ocurrencias
          </h2>
        </div>

        <div className="p-4">
          <DataTable
            data={ocurrencias}
            columns={columns}
            className="display"
            options={{
              pageLength: 5,
              responsive: true,
              language: {
                search: "Buscar:",
                lengthMenu: "Mostrar _MENU_ registros",
                info:
                  "Mostrando _START_ a _END_ de _TOTAL_ registros",
                paginate: {
                  next: "›",
                  previous: "‹",
                },
              },
            }}
          />
        </div>

      </div>
    </div>
  );
}