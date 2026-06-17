import { useEffect, useState } from "react";
import api from "../../../../api/axios";

export default function ReporteLlaveros() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [datos, setDatos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);

  const consultar = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/llaves/llaveros/reporte", {
        params: { fechaInicio, fechaFin },
      });

      setDatos(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    consultar();
  }, []);

  const filtrados = datos.filter((x) =>
    x.llavero?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const estadoBadge = (estado) => {
    switch (estado) {
      case "PRESTADO":
        return "bg-orange-100 text-orange-700";
      case "DEVUELTO":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center gap-2 text-blue-700 font-bold text-xl">
        📘 Reporte Histórico de Llaveros
      </div>

      {/* FILTROS */}
      <div className="bg-white p-4 rounded-xl shadow grid grid-cols-1 md:grid-cols-3 gap-4">

        <div>
          <label className="text-sm font-semibold">Fecha Inicio</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">Fecha Fin</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <button
          onClick={consultar}
          className="bg-blue-600 text-white rounded-lg h-[42px] mt-6 hover:bg-blue-700"
        >
          🔍 Consultar
        </button>
      </div>

      {/* ACCIONES */}
      <div className="flex flex-wrap justify-between gap-3">

        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            Excel
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
            PDF
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg">
            Imprimir
          </button>
        </div>

        <input
          placeholder="Buscar por llavero..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border rounded-lg px-3 py-2 w-64"
        />
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full text-sm">

          {/* HEADER TABLE */}
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">LLAVERO</th>
              <th className="p-4 text-left">RESPONSABLE</th>
              <th className="p-4 text-left">FECHA ENTREGA</th>
              <th className="p-4 text-left">FECHA DEVOLUCIÓN</th>
              <th className="p-4 text-left">ESTADO</th>
              <th className="p-4 text-center">ACCIONES</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan={7} className="p-10 text-center text-gray-500">
                  Cargando datos...
                </td>
              </tr>
            ) : filtrados.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-10 text-center text-gray-400">
                  Sin registros
                </td>
              </tr>
            ) : (
              filtrados.map((x) => (
                <tr key={x.id} className="border-b hover:bg-gray-50">

                  <td className="p-4 font-semibold text-gray-600">
                    #{x.id}
                  </td>

                  <td className="p-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                      {x.llavero?.nombre}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="font-semibold">
                      {x.responsableNombre}
                    </div>
                    <div className="text-xs text-gray-500">
                      DNI: {x.responsableDni}
                    </div>
                  </td>

                  <td className="p-4 text-gray-600">
                    {new Date(x.fechaEntrega).toLocaleString()}
                  </td>

                  <td className="p-4 text-gray-600">
                    {x.fechaDevolucion
                      ? new Date(x.fechaDevolucion).toLocaleString()
                      : "Pendiente"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${estadoBadge(
                        x.estado
                      )}`}
                    >
                      {x.estado}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <button className="bg-cyan-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-cyan-600">
                      Ver
                    </button>
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>
      </div>
    </div>
  );
}