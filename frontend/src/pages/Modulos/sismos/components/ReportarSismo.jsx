// src/pages/modulos/sismos/components/ReportarSismo.jsx
import api from "../../../../api/axios";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ReportarSismo({
  open,
  onClose,
}) {
    const usuario = JSON.parse(
  localStorage.getItem("sismosUser")
);

const ahora = new Date();

const fechaActual =
  ahora.getFullYear() +
  "-" +
  String(ahora.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(ahora.getDate()).padStart(2, "0");

const horaActual = ahora
  .toTimeString()
  .slice(0, 5);
if (!usuario) {
  alert("No se encontró la sesión");
  return;
}
const [operacion, setOperacion] = useState(false);
const [energia, setEnergia] = useState(false);
  const [evacuaron, setEvacuaron] = useState(false);
  const [danios, setDanios] = useState(false);
  const [victimas, setVictimas] = useState(false);
  const [continuidad, setContinuidad] = useState(false);
const [fechaIncidente, setFechaIncidente] = useState("");
const [horaIncidente, setHoraIncidente] = useState("");
const [fechaReporte, setFechaReporte] =
  useState(fechaActual);

const [horaReporte, setHoraReporte] =
  useState(horaActual);

const [tiempoEvacuacion, setTiempoEvacuacion] = useState("");
const [descripcionDanios, setDescripcionDanios] = useState("");
const [cantidadVictimas, setCantidadVictimas] = useState("");
const [fotoEvacuacion, setFotoEvacuacion] = useState(null);
const [fotoDanios, setFotoDanios] = useState(null);
const [fotoVictimas, setFotoVictimas] = useState(null);
const [descripcionContinuidad, setDescripcionContinuidad] = useState("");
useEffect(() => {
  if (open) {

    const ahora = new Date();

    setFechaReporte(
        ahora.getFullYear() +
            "-" +
            String(ahora.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(ahora.getDate()).padStart(2, "0")
        );

    setHoraReporte(
      ahora.toTimeString().slice(0, 5)
    );
  }
}, [open]);
  if (!open) return null;

  const ToggleSiNo = ({ value, setValue }) => (
    <div className="flex border rounded overflow-hidden">
      <button
        type="button"
        onClick={() => setValue(true)}
        className={`px-3 py-1 text-xs font-bold ${
          value
            ? "bg-green-600 text-white"
            : "bg-gray-100"
        }`}
      >
        SI
      </button>

      <button
        type="button"
        onClick={() => setValue(false)}
        className={`px-3 py-1 text-xs font-bold ${
          !value
            ? "bg-gray-300 text-gray-700"
            : "bg-gray-100"
        }`}
      >
        NO
      </button>
    </div>
  );
const guardarReporte = async () => {
  try {

    const usuario = JSON.parse(
      localStorage.getItem("sismosUser")
    );

    const formData = new FormData();

formData.append("fechaIncidente", fechaIncidente);
formData.append("horaIncidente", horaIncidente);
formData.append("fechaReporte", fechaReporte);
formData.append("horaReporte", horaReporte);

formData.append("responsableId", usuario.id);
formData.append("sedeId", usuario.sedeId);

formData.append("operacion", operacion);
formData.append("corteEnergia", energia);

formData.append("evacuaron", evacuaron);
formData.append("tiempoEvacuacion", tiempoEvacuacion);

formData.append("danios", danios);
formData.append("descripcionDanios", descripcionDanios);

formData.append("victimas", victimas);
formData.append("cantidadVictimas", cantidadVictimas || "");

formData.append("continuidad", continuidad);
formData.append(
  "descripcionContinuidad",
  descripcionContinuidad
);
if (fotoEvacuacion) {
  formData.append(
    "fotoEvacuacion",
    fotoEvacuacion
  );
}

if (fotoDanios) {
  formData.append(
    "fotoDanios",
    fotoDanios
  );
}

if (fotoVictimas) {
  formData.append(
    "fotoVictimas",
    fotoVictimas
  );
}
console.log([...formData.entries()]);
    await api.post(
  "/sismos",
  formData,
  {
    headers: {
      "Content-Type":
        "multipart/form-data",
    },
  }
);

    alert("Reporte registrado");

    onClose();

  } catch (error) {
    console.error(error);
    alert("Error al registrar");
  }
};
console.log(usuario);
  return (

    <div
      className="
        fixed
        inset-0
        bg-black/60
        flex
        items-center
        justify-center
        z-50
        p-4
      "
    >

      <div
        className="
          bg-white
          rounded-lg
          w-full
          max-w-5xl
          max-h-[95vh]
          overflow-y-auto
          shadow-2xl
        "
      >

        {/* HEADER */}
        <div className="border-b p-4 flex justify-between items-center">

          <h2 className="font-bold text-blue-600 text-lg">
            Reporte de Sismo
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X />
          </button>

        </div>

        {/* BODY */}
        <div className="grid md:grid-cols-2 gap-4 p-4">

          {/* INFORMACIÓN DEL INCIDENTE */}
          <div className="border rounded p-3 bg-gray-50">

            <h3 className="font-semibold text-blue-600 mb-3">
              Información del Incidente
            </h3>

            <label className="text-sm">
              Fecha del Incidente
            </label>

            <input
                type="date"
                value={fechaIncidente}
                onChange={(e) =>
                    setFechaIncidente(e.target.value)
                }
                className="w-full border rounded p-2 mb-2"
                />

            <label className="text-sm">
              Hora del Incidente
            </label>

            <input
                type="time"
                value={horaIncidente}
                onChange={(e) =>
                    setHoraIncidente(e.target.value)
                }
                className="w-full border rounded p-2 mb-2"
                />

            <label className="text-sm">
              Responsable del Reporte
            </label>

           <input
            type="text"
            value={usuario?.nombre || ""}
            disabled
            className="
                w-full
                border
                rounded
                p-2
                bg-gray-100
                cursor-not-allowed
            "
            />

          </div>

          {/* DETALLES */}
          <div className="border rounded p-3 bg-gray-50">

            <h3 className="font-semibold text-blue-600 mb-3">
              Detalles del Reporte
            </h3>

            <label className="text-sm">
              Fecha de Reporte
            </label>

            <input
                type="date"
                value={fechaReporte}
                disabled
                className="
                    w-full
                    border
                    rounded
                    p-2
                    mb-2
                    bg-gray-100
                    cursor-not-allowed
                "
                />

            <label className="text-sm">
              Hora de Inicio de Reporte
            </label>

            <input
            type="time"
            value={horaReporte}
            disabled
            className="
                w-full
                border
                rounded
                p-2
                mb-2
                bg-gray-100
                cursor-not-allowed
            "
            />
            <label className="text-sm">
              Unidad de Reporte
            </label>

            <input
                type="text"
                value={usuario?.sede?.nombre || usuario?.sedeNombre || ""}
                disabled
                className="
                    w-full
                    border
                    rounded
                    p-2
                    bg-gray-100
                    cursor-not-allowed
                "
                />

          </div>

          {/* EN OPERACIÓN */}
          <div className="border rounded p-3">

            <div className="flex justify-between items-center">

                <span className="font-medium text-blue-600">
                En Operación
                </span>

                <ToggleSiNo
                value={operacion}
                setValue={setOperacion}
                />

            </div>

            {operacion && (
                <p className="text-green-600 text-sm mt-3">
                ✓ Sede operativa.
                </p>
            )}

            </div>

          {/* CORTE ENERGÍA */}
          <div className="border rounded p-3">

            <div className="flex justify-between items-center">

                <span className="font-medium text-yellow-600">
                Corte Energía
                </span>

                <ToggleSiNo
                value={energia}
                setValue={setEnergia}
                />

            </div>

            {energia && (
                <p className="text-red-500 text-sm mt-3">
                ⚠ Sin fluido eléctrico.
                </p>
            )}

            </div>

          {/* EVACUARON */}
          <div className="border rounded p-3">

            <div className="flex justify-between items-center mb-3">

              <span className="font-medium text-blue-600">
                Evacuaron
              </span>

              <ToggleSiNo
                value={evacuaron}
                setValue={setEvacuaron}
              />

            </div>

            {evacuaron && (
              <>
                <input
                    type="text"
                    value={tiempoEvacuacion}
                    onChange={(e) =>
                        setTiempoEvacuacion(e.target.value)
                    }
                    placeholder="Tiempo (Ej: 5 min)"
                    className="w-full border rounded p-2 mb-2"
                    />

                <label className="text-sm block mb-1">
                  Evidencia (Foto)
                </label>

                <input
                    type="file"
                    onChange={(e) =>
                        setFotoEvacuacion(e.target.files[0])
                    }
                    className="w-full border rounded p-2"
                    />
              </>
            )}

          </div>

          {/* DAÑOS */}
          <div className="border rounded p-3">

            <div className="flex justify-between items-center mb-3">

              <span className="font-medium text-red-500">
                Daños
              </span>

              <ToggleSiNo
                value={danios}
                setValue={setDanios}
              />

            </div>

            {danios && (
              <>
                <textarea
                    rows="3"
                    value={descripcionDanios}
                    onChange={(e) =>
                        setDescripcionDanios(e.target.value)
                    }
                    placeholder="Describa el daño..."
                    className="w-full border rounded p-2 mb-2"
                    />

                <label className="text-sm block mb-1">
                  Evidencia (Foto)
                </label>

                <input
                    type="file"
                    onChange={(e) =>
                        setFotoDanios(e.target.files[0])
                    }
                    className="w-full border rounded p-2"
                    />
              </>
            )}

          </div>

          {/* VÍCTIMAS */}
          <div className="border rounded p-3">

            <div className="flex justify-between items-center mb-3">

              <span className="font-medium text-red-500">
                Víctimas
              </span>

              <ToggleSiNo
                value={victimas}
                setValue={setVictimas}
              />

            </div>

            {victimas && (
              <>
                <input
                    type="number"
                    value={cantidadVictimas}
                    onChange={(e) =>
                        setCantidadVictimas(e.target.value)
                    }
                    placeholder="Cantidad de personas"
                    className="w-full border rounded p-2 mb-2"
                    />

                <label className="text-sm block mb-1">
                  Foto (Opcional)
                </label>

                <input
                    type="file"
                    onChange={(e) =>
                        setFotoVictimas(e.target.files[0])
                    }
                    className="w-full border rounded p-2"
                    />
              </>
            )}

          </div>

          {/* CONTINUIDAD */}
          <div className="border rounded p-3">

            <div className="flex justify-between items-center mb-3">

              <span className="font-medium text-blue-600">
                Continuidad
              </span>

              <ToggleSiNo
                value={continuidad}
                setValue={setContinuidad}
              />

            </div>

            {continuidad && (
              <textarea
                rows="4"
                value={descripcionContinuidad}
                onChange={(e) =>
                    setDescripcionContinuidad(e.target.value)
                }
                placeholder="¿Puede continuar operaciones?"
                className="w-full border rounded p-2"
                />
            )}

          </div>

        </div>

        {/* FOOTER */}
        <div className="border-t p-4 flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="
              px-4
              py-2
              bg-gray-500
              text-white
              rounded
              hover:bg-gray-600
            "
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={guardarReporte}
            className="
                px-4
                py-2
                bg-blue-600
                text-white
                rounded
                hover:bg-blue-700
            "
            >
            Guardar Reporte
            </button>

        </div>

      </div>

    </div>

  );

}