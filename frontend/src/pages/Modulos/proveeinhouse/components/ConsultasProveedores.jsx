import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import ScannerVisitas from "./ScannerProveedores";
import api from "../../../../api/axios";
import {
  Search,
  Building2,
  MapPin,
  Clock3,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

export default function ConsultasProveedores() {
const [contratas, setContratas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [qrImage, setQrImage] = useState(null);
  const [openScanner, setOpenScanner] = useState(false);
const [visitanteEscaneado, setVisitanteEscaneado] = useState(null);

  /* ========================= */
/* BUSCAR VISITANTE */
/* ========================= */

const visitanteBuscado = useMemo(() => {
  if (!busqueda.trim()) return null;

  for (const contrata of contratas) {
    const lista = contrata?.trabajadores || [];

    for (const trabajador of lista) {
      const texto = `
        ${trabajador?.dni || ""}
        ${trabajador?.nombres || ""}
        ${trabajador?.apellidoPaterno || ""}
        ${trabajador?.apellidoMaterno || ""}
      `.toLowerCase();

      if (texto.includes(busqueda.toLowerCase())) {
        return {
          ...trabajador,
          contrata,
        };
      }
    }
  }

  return null;
}, [busqueda, contratas]);

const visitanteEncontrado =
  visitanteEscaneado || visitanteBuscado;

  /* ========================= */
  /* GENERAR QR DINÁMICO */
  /* ========================= */
  useEffect(() => {
    const generarQR = async () => {
      try {
        if (visitanteEncontrado?.qrData) {
          const img = await QRCode.toDataURL(visitanteEncontrado.qrData);
          setQrImage(img);
        } else {
          setQrImage(null);
        }
      } catch (err) {
        console.log("Error generando QR:", err);
        setQrImage(null);
      }
    };

    generarQR();
  }, [visitanteEncontrado]);
  /* ========================= */
  /* FETCH */
  /* ========================= */
  useEffect(() => {
    const fetchVisitas = async () => {
      try {
        const res = await api.get("/contratasinhouse");
        setContratas(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log("Error cargando visitas:", error);
      }
    };

    fetchVisitas();
  }, []);
const registrarIngreso = async (id) => {
  try {

    const res = await api.put(
      `/contratasinhouse/ingreso/${id}`
    );

    setVisitanteEscaneado((prev) => ({
      ...(prev || visitanteEncontrado),
      horaIngreso: res.data.horaIngreso
    }));

  } catch (err) {
    console.log(err);
  }
};

const registrarSalida = async (id) => {
  try {

    const res = await api.put(
      `/contratasinhouse/salida/${id}`
    );

    setVisitanteEscaneado((prev) => ({
      ...(prev || visitanteEncontrado),
      horaSalida: res.data.horaSalida
    }));

  } catch (err) {
    console.log(err);
  }
};
  return (
    <>
      <main className="p-6 lg:p-8">

        {/* BUSCADOR */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-col lg:flex-row gap-4 w-full max-w-3xl">

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Buscar por DNI, nombre o apellido..."
                value={busqueda}
                onChange={(e) => {

                  setBusqueda(e.target.value);
                  setVisitanteEscaneado(null);  
                  if (!e.target.value.trim()) {
                    setVisitanteEscaneado(null);
                  }

                }}
                className="w-full border border-gray-300 rounded-2xl pl-11 pr-4 py-4 outline-none focus:border-[#1E55C0]"
              />
            </div>

            <button
              onClick={() => setOpenScanner(true)}
              className="bg-[#2563eb] hover:bg-[#1d4ed8] transition text-white px-6 py-4 rounded-2xl font-bold shadow-sm"
            >
              Escanear
            </button>

          </div>
        </div>

        {/* RESULTADO */}
        {visitanteEncontrado && (
          <div className="max-w-md bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-200">

            <div className="p-6 flex items-start justify-between border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#e5e7eb] flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>

                <div>
                  <h2 className="text-xl font-black text-gray-800">
                    {visitanteEncontrado.nombres}{" "}
                    {visitanteEncontrado.apellidoPaterno}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    DNI: {visitanteEncontrado.dni}
                  </p>
                </div>
              </div>

              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-xl text-xs font-bold">
                AUTORIZADO
              </span>
            </div>

            <div className="p-6 space-y-4">

              <div className="flex items-center gap-3 text-gray-700">
                <Building2 size={18} className="text-[#2563eb]" />
                <p>
                  <span className="font-bold">Empresa:</span>{" "}
                  {visitanteEncontrado?.contrata?.empresaContratista || "SIN EMPRESA"}
                </p>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <MapPin size={18} className="text-[#2563eb]" />
                <p>
                  <span className="font-bold">Sede/Área:</span>{" "}
                  {visitanteEncontrado?.contrata?.sede?.nombre || "SIN SEDE"}
                  /
                  {visitanteEncontrado?.contrata?.ambiente?.nombre || "SIN ÁREA"}
                </p>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Clock3 size={18} className="text-[#2563eb]" />
                <p>
                  <span className="font-bold">Horario:</span>{" "}
                  {visitanteEncontrado?.contrata?.horaEntrada || "--"} -{" "}
                  {visitanteEncontrado?.contrata?.horaSalida || "--"}
                </p>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <ClipboardList size={18} className="text-[#2563eb]" />
                <p>
                  <span className="font-bold">Motivo:</span>{" "}
                  {visitanteEncontrado?.contrata?.motivo || "SIN MOTIVO"}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6 flex flex-col items-center">

                <div className="w-36 h-36 bg-white p-2 rounded-2xl shadow flex items-center justify-center">

                  {qrImage ? (
                    <img
                      src={qrImage}
                      className="w-full h-full object-contain"
                      alt="QR"
                    />
                  ) : (
                    <div className="text-gray-400 text-sm">
                      QR no disponible
                    </div>
                  )}

                </div>

                <p className="text-gray-400 text-sm mt-4">
                  Cód. Autorización:{" "}
                  {visitanteEncontrado?.contrata?.codigo || "SIN CÓDIGO"}
                </p>

              </div>
            </div>

            <div className="bg-[#f8fafc] px-6 py-4 flex items-center justify-between text-sm">

              {/* INGRESO */}
              <div className="flex flex-col items-start gap-2">

                {!visitanteEncontrado?.horaIngreso ? (

                  <button
                    onClick={() => registrarIngreso(visitanteEncontrado.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-bold"
                  >
                    Registrar Ingreso
                  </button>

                ) : (

                  <div className="flex items-center gap-2 text-green-600 font-bold bg-green-100 px-4 py-2 rounded-xl">
                    <CheckCircle2 size={16} />
                    {visitanteEncontrado.horaIngreso}
                  </div>

                )}

              </div>

              {/* SALIDA */}
              <div className="flex flex-col items-end gap-2">

                {!visitanteEncontrado?.horaSalida ? (

                  <button
                    onClick={() => registrarSalida(visitanteEncontrado.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-bold"
                    disabled={!visitanteEncontrado?.horaIngreso}
                  >
                    Registrar Salida
                  </button>

                ) : (

                  <div className="flex items-center gap-2 text-red-500 font-bold bg-red-100 px-4 py-2 rounded-xl">
                    <Clock3 size={16} />
                    {visitanteEncontrado.horaSalida}
                  </div>

                )}

              </div>

            </div>

          </div>
        )}

      </main>

      {/* MODAL SCANNER */}
      {openScanner && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-4 w-[90%] max-w-md relative">

            <button
              onClick={() => setOpenScanner(false)}
              className="absolute top-2 right-3 text-gray-500 text-xl"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-3">
              Escanear QR
            </h2>

            <ScannerVisitas
  onClose={() => setOpenScanner(false)}
onSuccess={(res) => {
  setVisitanteEscaneado(res);
  setBusqueda("");
}}
/>

          </div>
        </div>
      )}
    </>
  );
}