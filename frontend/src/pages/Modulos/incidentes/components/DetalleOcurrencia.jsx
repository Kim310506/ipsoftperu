import { useEffect, useState } from "react";
import api from "../../../../api/axios";

export default function DetalleOcurrencia({
  incidenteId
}) {
    const [mensajeReporte, setMensajeReporte] =
useState("");

const [historial, setHistorial] =
useState([]);
const [mensajeSolucion, setMensajeSolucion] = useState("");
const [archivos, setArchivos] = useState([]);
const [motivoRechazo, setMotivoRechazo] = useState("");
const [mostrarRechazo, setMostrarRechazo] =
  useState(false);
  const [incidente, setIncidente] = useState(null);

  useEffect(() => {
    cargarDetalle();
  }, []);

  const cargarDetalle = async () => {

  try {

    const res = await api.get(
      `/incidentes/${incidenteId}`
    );
console.log("HISTORIAL", res.data.historial);
    console.log(res.data);

    setIncidente(res.data);

    setHistorial(
      res.data.historial || []
    );
    
  } catch (error) {

    console.log(error);

  }

};

const grabarReporte = async () => {

  try {

    const usuarioStorage =
      localStorage.getItem("incidentesUser");

    if (!usuarioStorage) {

      alert("No hay usuario logueado");

      return;

    }

    const usuario =
      JSON.parse(usuarioStorage);

    await api.post(
      `/incidentes/${incidenteId}/reporte`,
      {
        mensaje: mensajeReporte,
        usuarioId: usuario.id
      }
    );

    setMensajeReporte("");

    cargarDetalle();

  } catch (error) {

    console.log(error);

  }

};

  const aprobarSolucion = async () => {

    try {

      await api.put(
`/incidentes/${incidenteId}/cerrar`
      );

      cargarDetalle();

    } catch (error) {
      console.log(error);
    }
  };

  const rechazarSolucion = async () => {

  try {

    await api.put(
      `/incidentes/${incidenteId}/rechazar`,
      {
        motivo: motivoRechazo
      }
    );

    setMotivoRechazo("");
setMostrarRechazo(false);
    cargarDetalle();

  } catch (error) {

    console.log(error);

  }

};
if (!incidente) {
  return (
    <div className="p-10">
      Cargando...
    </div>
  );
}
const reporteExistente = historial.find(
  (item) => item.tipo === "REPORTE"
);
const soluciones = historial.filter(
  (item) => item.tipo === "SOLUCION"
);
const rechazos = historial.filter(
  (item) => item.tipo === "RECHAZO"
);
const solucionExistente =
  soluciones.length > 0
    ? soluciones[soluciones.length - 1]
    : null;

const enviarSolucion = async () => {
  try {
    const usuario = JSON.parse(localStorage.getItem("incidentesUser"));

    const formData = new FormData();

    formData.append("mensaje", mensajeSolucion);
    formData.append("usuarioId", usuario.id);

    archivos.forEach((file) => {
      formData.append("imagenes", file);
    });

    await api.post(
      `/incidentes/${incidenteId}/solucion`,
      formData
    );

    setMensajeSolucion("");
    setArchivos([]);
    cargarDetalle();

  } catch (error) {
    console.log(error);
  }
};
const exportarPDF = async () => {

  try {

    const response = await api.get(
      `/incidentes/${incidenteId}/pdf`,
      {
        responseType: "blob"
      }
    );

    const url =
      window.URL.createObjectURL(
        new Blob([response.data])
      );

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `Ocurrencia_${incidente.codigo}.pdf`;

    link.click();

  } catch (error) {

    console.log(error);

  }

};
 return (
  <div className="min-h-screen bg-[#f4f4f4] p-6">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-6">

      <div className="flex items-center gap-2">

        <span className="text-2xl">👁</span>

        <h1 className="text-3xl font-bold text-[#0f172a]">
          Detalle de Ocurrencia
        </h1>

      </div>

      <button
  onClick={exportarPDF}
  className="
    bg-green-400
    hover:bg-green-500
    text-xs
    px-4
    py-2
    rounded
    font-semibold
  "
>
  Exportar PDF
</button>

    </div>

    {/* GRID */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* EVIDENCIA */}
      <div className="bg-[#f8f8f8] rounded-3xl p-8 shadow-sm">

        <h2 className="text-4xl font-bold text-[#0f172a] mb-6">
          Evidencia Inicial
        </h2>

        <img
          src={
  incidente.evidencias?.[0]?.url
    ? `http://localhost:3000${incidente.evidencias[0].url}`
    : "https://via.placeholder.com/500x300"
}
        />

        <div className="mt-6">

          <h3 className="font-bold text-xl text-[#0f172a] mb-3">
            Detalle Reportado
          </h3>

          <p className="uppercase text-gray-500 text-sm leading-6">
            {incidente.detalle}
          </p>

        </div>

      </div>

      {/* RESUMEN */}
      <div className="bg-[#f8f8f8] rounded-3xl p-8 shadow-sm">

        <h2 className="text-4xl font-bold text-[#0f172a] mb-6">
          Resumen y Estado
        </h2>

        <div className="space-y-5 text-sm">

          <div className="flex items-center gap-2">
            <span className="text-gray-500">
              Estado:
            </span>

            <span
              className="
                bg-red-500
                text-white
                px-3
                py-1
                rounded-full
                text-xs
                font-bold
              "
            >
              {incidente.estado}
            </span>
          </div>

          <div className="border-b border-[#e5e7eb] pb-4">
            <span className="font-bold text-[#1e3a8a]">
              #
            </span>

            <span className="ml-2 text-gray-500">
              Código:
            </span>

            <span className="font-bold ml-2">
              {incidente.codigo}
            </span>
          </div>

          <div className="border-b border-[#e5e7eb] pb-4">
            <span className="text-gray-500">
              Fecha:
            </span>

            <span className="ml-2">
              {new Date(
                incidente.createdAt
              ).toLocaleDateString()}
            </span>
          </div>

          <div className="border-b border-[#e5e7eb] pb-4">
            <span className="text-gray-500">
              Campus:
            </span>

            <span
              className="
                ml-2
                bg-green-500
                text-white
                px-2
                py-1
                rounded-full
                text-xs
              "
            >
              {incidente.sede?.nombre}
            </span>
          </div>

          <div className="border-b border-[#e5e7eb] pb-4">
            <span className="text-gray-500">
              Ambiente:
            </span>

            <span className="ml-2">
              {incidente.ambiente?.nombre}
            </span>
          </div>

          <div className="border-b border-[#e5e7eb] pb-4">
            <span className="text-gray-500">
              Categoría:
            </span>

            <span
              className="
                ml-2
                bg-red-500
                text-white
                px-2
                py-1
                rounded-full
                text-xs
                font-bold
              "
            >
              {incidente.categoria}
            </span>
          </div>

          <div className="border-b border-[#e5e7eb] pb-4">
            <span className="text-gray-500">
              Tipo:
            </span>

            <span className="ml-2 font-semibold">
              {incidente.tipo}
            </span>
          </div>

          <div className="border-b border-[#e5e7eb] pb-4">
            <span className="text-gray-500">
              Subcategoría:
            </span>

            <span className="ml-2 font-semibold">
              {incidente.subcategoria}
            </span>
          </div>

          <div className="border-b border-[#e5e7eb] pb-4">

            <p className="text-gray-500 mb-2">
              Motivo:
            </p>

            <div
              className="
                bg-blue-100
                text-blue-700
                p-3
                rounded-xl
              "
            >
              {incidente.motivo}
            </div>

          </div>

          <div className="border-b border-[#e5e7eb] pb-4">
            <span className="text-gray-500">
              Vínculo:
            </span>

            <span className="ml-2">
              {incidente.vinculo}
            </span>
          </div>

          <div className="border-b border-[#e5e7eb] pb-4">
            <span className="text-gray-500">
              Persona:
            </span>

            <span className="ml-2 uppercase">
              {incidente.personaInvolucrada}
            </span>
          </div>

        </div>

      </div>

      {/* REPORTE */}
<div
  className="
    bg-[#f8f8f8]
    rounded-3xl
    p-8
    shadow-sm
    border
    border-gray-200
  "
>

  {/* SI NO HAY REPORTE */}
  {!reporteExistente && (

    <>

      <h2 className="text-4xl font-bold text-[#0f172a] mb-6">
        Reporte ↩
      </h2>

      <textarea
        value={mensajeReporte}
        onChange={(e) =>
          setMensajeReporte(e.target.value)
        }
        placeholder="Añade un comentario de reporte..."
        className="
          w-full
          bg-white
          border
          border-gray-200
          rounded-2xl
          p-4
          h-32
          outline-none
          resize-none
          mb-4
          text-sm
        "
      />

      <button
        onClick={grabarReporte}
        className="
          w-full
          bg-blue-500
          hover:bg-blue-600
          text-white
          py-4
          rounded-2xl
          font-bold
        "
      >
        GRABAR REPORTE
      </button>

    </>

  )}


  {/* SI YA HAY REPORTE */}
  {reporteExistente && (

    <div className="mb-8">

      <h2
        className="
          text-4xl
          font-bold
          text-[#1f2937]
          mb-5
        "
      >
        Reporte ↪
      </h2>

      <div
        className="
          bg-green-100
          rounded-2xl
          p-4
          text-green-900
          font-semibold
          uppercase
          mb-3
        "
      >
        {reporteExistente.mensaje}
      </div>

      <div
        className="
          bg-green-500
          text-white
          rounded-full
          px-4
          py-2
          text-sm
          font-semibold
          inline-block
          leading-4
        "
      >
        <div>
          {reporteExistente.usuario?.correo}
        </div>

        <div className="text-xs">
          {new Date(
            reporteExistente.createdAt
          ).toLocaleString()}
        </div>

      </div>

    </div>

  )}

{/* REGISTRAR PRIMERA SOLUCIÓN */}
{reporteExistente &&
 soluciones.length === 0 &&
 incidente.estado !== "CERRADO" && (

  <div className="mb-8">

    <h2 className="text-2xl font-bold mb-4">
      Registrar Solución
    </h2>

    <textarea
      value={mensajeSolucion}
      onChange={(e) =>
        setMensajeSolucion(e.target.value)
      }
      placeholder="Describa la solución aplicada..."
      className="
        w-full
        border
        rounded-xl
        p-4
        mb-4
      "
    />

    <input
      type="file"
      multiple
      onChange={(e) =>
        setArchivos([...e.target.files])
      }
      className="mb-4"
    />

    <button
      onClick={enviarSolucion}
      className="
        w-full
        bg-purple-600
        text-white
        py-3
        rounded-xl
      "
    >
      Enviar Solución
    </button>

  </div>

)}
  {/* SOLUCIÓN + GESTIÓN DEL CASO */}
{reporteExistente && (
  <div className="mt-10">

    <h2 className="text-4xl font-bold text-[#1f2937] mb-5">
      Soluciones 🔧
    </h2>

   {historial
  .filter(
    (item) =>
      item.tipo === "SOLUCION" ||
      item.tipo === "RECHAZO"
  )
  .map((item, index) => (

    <div
      key={item.id}
      className="mb-6 border-b pb-6"
    >

      {item.tipo === "SOLUCION" && (

       <>
  <div className="mb-4">

    <h3
      className="
        text-lg
        font-bold
        text-purple-700
        mb-3
      "
    >
      🔧 Solución
    </h3>

    <div
      className="
        bg-purple-100
        rounded-2xl
        p-4
        text-purple-900
        font-semibold
        mb-3
      "
    >
      {item.mensaje}
    </div>

    {item.evidencias?.length > 0 && (

      <div className="space-y-3 mb-3">

        {item.evidencias.map((img) => (

          <img
            key={img.id}
            src={`http://localhost:3000${img.url}`}
            className="
              w-full
              rounded-2xl
              border
              shadow-sm
            "
          />

        ))}

      </div>

    )}

    <div
      className="
        bg-purple-600
        text-white
        rounded-full
        px-4
        py-2
        text-sm
        font-semibold
        inline-block
        leading-4
      "
    >

      <div>
        {item.usuario?.correo}
      </div>

      <div className="text-xs">
        {new Date(
          item.createdAt
        ).toLocaleString()}
      </div>

    </div>

  </div>
</>

      )}

      {item.tipo === "RECHAZO" && (

        <div
          className="
            bg-red-100
            border-l-4
            border-red-500
            p-4
            rounded-xl
          "
        >

          <div className="font-bold text-red-700">
            MOTIVO DEL RECHAZO
          </div>

          <div className="mt-2">
            {item.mensaje}
          </div>

          <div className="text-xs text-gray-500 mt-2">

            {item.usuario?.correo}

            {" - "}

            {new Date(
              item.createdAt
            ).toLocaleString()}

          </div>

        </div>

      )}

    </div>

))}


   {incidente.estado === "RECHAZADO" &&
 soluciones.length > 0 && (

      <>
        <textarea
          value={mensajeSolucion}
          onChange={(e) =>
            setMensajeSolucion(e.target.value)
          }
          placeholder="Nueva solución..."
          className="
            w-full
            border
            rounded-xl
            p-4
            mb-4
          "
        />

        <input
          type="file"
          multiple
          onChange={(e) =>
            setArchivos([...e.target.files])
          }
          className="mb-4"
        />

        <button
          onClick={enviarSolucion}
          className="
            w-full
            bg-purple-600
            text-white
            py-3
            rounded-xl
          "
        >
          Enviar nueva solución
        </button>

      </>

    )}

    {soluciones.length > 0 &&
      incidente.estado !== "CERRADO" && (

      <div className="mt-6">

        <h3 className="font-bold mb-3">
          Gestión del Caso
        </h3>

        {!mostrarRechazo ? (

  <div className="flex gap-3">

    <button
      onClick={aprobarSolucion}
      className="
        flex-1
        bg-green-500
        text-white
        py-3
        rounded-xl
      "
    >
      ✔ Aprobar
    </button>

    <button
      onClick={() =>
        setMostrarRechazo(true)
      }
      className="
        flex-1
        bg-red-500
        text-white
        py-3
        rounded-xl
      "
    >
      ✖ Rechazar
    </button>

  </div>

) : (

  <div className="mt-4">

    <textarea
      value={motivoRechazo}
      onChange={(e) =>
        setMotivoRechazo(e.target.value)
      }
      placeholder="Ingrese el motivo del rechazo..."
      className="
        w-full
        border
        rounded-xl
        p-3
        mb-3
      "
    />

    <div className="flex gap-2">

      <button
        onClick={rechazarSolucion}
        className="
          bg-red-600
          text-white
          px-4
          py-2
          rounded-xl
        "
      >
        Enviar Rechazo
      </button>

      <button
        onClick={() =>
          setMostrarRechazo(false)
        }
        className="
          bg-gray-300
          px-4
          py-2
          rounded-xl
        "
      >
        Cancelar
      </button>

    </div>

  </div>

)}

      </div>

    )}

    {incidente.estado === "CERRADO" && (

      <div
        className="
          mt-6
          bg-green-100
          p-5
          rounded-2xl
          text-center
        "
      >

        <div className="font-bold text-green-700">
          CERRADO
        </div>

        <div className="text-green-600">
          Caso cerrado correctamente ✔
        </div>

      </div>

    )}

  </div>
)}

</div>


</div>
</div>

);
}