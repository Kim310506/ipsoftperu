import { useEffect, useState } from "react";
import api from "../../../../api/axios";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";

const locales = { es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

/* =========================
   TOOLBAR PERSONALIZADO
========================= */
function CustomToolbar(toolbar) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">

      {/* NAVEGACIÓN */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => toolbar.onNavigate("PREV")}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          ←
        </button>

        <button
          onClick={() => toolbar.onNavigate("TODAY")}
          className="px-4 py-1 rounded bg-[#244db7] text-white font-bold"
        >
          Hoy
        </button>

        <button
          onClick={() => toolbar.onNavigate("NEXT")}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          →
        </button>
      </div>

      {/* TÍTULO */}
      <div className="font-bold text-lg text-[#244db7]">
        {toolbar.label}
      </div>

      {/* VISTAS */}
      <div className="flex gap-2 flex-wrap">
        {["month", "week", "day", "agenda"].map((view) => (
          <button
            key={view}
            onClick={() => toolbar.onView(view)}
            className={`px-3 py-1 rounded font-bold border ${
              toolbar.view === view
                ? "bg-[#244db7] text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {view === "month" && "Mes"}
            {view === "week" && "Semana"}
            {view === "day" && "Día"}
            {view === "agenda" && "Lista"}
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================
   CALENDARIO
========================= */
export default function CalendarioContratas() {
  const [eventos, setEventos] = useState([]);
  const [vista, setVista] = useState("month");
  const [fecha, setFecha] = useState(new Date()); // 🔥 IMPORTANTE

  useEffect(() => {
    cargarContratas();
  }, []);

  const cargarContratas = async () => {
    try {
      const res = await api.get("/contratasinhouse");

      const eventosMapeados = res.data
      .filter((c) => c.estado === "AUTORIZADO")
      .map((c) => ({
        id: c.id,
        title: `${c.codigo} - ${c.empresaContratista}`,
        start: new Date(c.fechaInicio),
        end: new Date(c.fechaFin),
        allDay: true,
        estado: c.estado,
      }));

      setEventos(eventosMapeados);
    } catch (error) {
      console.log(error);
    }
  };

  /* COLOR POR ESTADO */
  const eventStyleGetter = (event) => {
    let backgroundColor = "#3b82f6";

    if (event.estado === "APROBADO") backgroundColor = "#22c55e";
    if (event.estado === "PENDIENTE") backgroundColor = "#f59e0b";
    if (event.estado === "RECHAZADO") backgroundColor = "#ef4444";

    return {
      style: {
        backgroundColor,
        borderRadius: "10px",
        color: "white",
        border: "none",
        padding: "4px",
        fontWeight: "bold",
      },
    };
  };

  return (
    <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">

      <div className="mb-6">
        <h1 className="text-3xl font-black text-[#244db7]">
          Calendario de Contratas
        </h1>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-4 lg:p-6">

        <Calendar
          localizer={localizer}
          events={eventos}
          startAccessor="start"
          endAccessor="end"

          view={vista}
          onView={setVista}

          date={fecha}                 // 🔥 controla fecha
          onNavigate={setFecha}       // 🔥 navega correctamente

          views={["month", "week", "day", "agenda"]}
          style={{ height: "80vh" }}

          eventPropGetter={eventStyleGetter}

          components={{
            toolbar: CustomToolbar,
          }}

          /* 🔥 CLICK EN DÍA */
          onSelectSlot={(slotInfo) => {
            setFecha(slotInfo.start); // 👉 mueve a ese día
            setVista("day");          // 👉 cambia a vista día
          }}

          selectable

          /* CLICK EVENTO */
          onSelectEvent={(event) => {
            alert(`Contrata: ${event.title}`);
          }}
        />
      </div>
    </div>
  );
}