import React, {
  useState,
  useMemo
} from "react";
import api from "../../../../../api/axios";
import { X, Trash2, PlusCircle, FileText } from "lucide-react";

export default function ModalRegistro({
  openModal,
  setOpenModal,
  sedes = [],
}) {
const [sedeId, setSedeId] = useState("");
const [pabellonId, setPabellonId] = useState("");
const [pisoId, setPisoId] = useState("");
const [ambienteId, setAmbienteId] = useState("");

const [motivo, setMotivo] = useState("");

const [fechaInicio, setFechaInicio] = useState("");
const [fechaFin, setFechaFin] = useState("");

const [horaEntrada, setHoraEntrada] =
  useState("");

const [horaSalida, setHoraSalida] =
  useState("");

const [empresaContratista,
  setEmpresaContratista] =
  useState("");

const [emailResponsable,
  setEmailResponsable] =
  useState("");

const [dniResponsable,
  setDniResponsable] =
  useState("");

const [nombresResponsable,
  setNombresResponsable] =
  useState("");

const [apellidoPaternoResponsable,
  setApellidoPaternoResponsable] =
  useState("");

const [apellidoMaternoResponsable,
  setApellidoMaternoResponsable] =
  useState("");

const [telefonoResponsable,
  setTelefonoResponsable] =
  useState("");

const [descripcionServicio,
  setDescripcionServicio] =
  useState("");
  const pabellones = useMemo(() => {

  if (!sedeId) return [];

  const sede = sedes.find(
    s => s.id === Number(sedeId)
  );

  return sede?.pabellones || [];

}, [sedeId, sedes]);
const pisos = useMemo(() => {

  if (!pabellonId) return [];

  const pabellon =
    pabellones.find(
      p => p.id === Number(pabellonId)
    );

  return pabellon?.pisos || [];

}, [pabellonId, pabellones]);
const ambientes = useMemo(() => {

  if (!pisoId) return [];

  const piso = pisos.find(
    p => p.id === Number(pisoId)
  );

  return piso?.ambientes || [];

}, [pisoId, pisos]);
if (!openModal) return null;

const guardarContrata = async () => {

  try {
if (
  !sedeId ||
  !pabellonId ||
  !pisoId ||
  !ambienteId ||
  !motivo ||
  !fechaInicio ||
  !fechaFin ||
  !horaEntrada ||
  !horaSalida ||
  !empresaContratista ||
  !emailResponsable ||
  !dniResponsable ||
  !nombresResponsable
) {
  alert("Complete todos los campos");
  return;
}
   await api.post("/contratas", {
  sedeId: Number(sedeId),
  ambienteId: Number(ambienteId),

  motivo,

  fechaInicio,
  fechaFin,

  horaEntrada,
  horaSalida,

  empresaContratista,

  emailResponsable,
  dniResponsable,

  nombresResponsable,
  apellidoPaternoResponsable,
  apellidoMaternoResponsable,

  telefonoResponsable,

  descripcionServicio
});

    alert(
      "Contrata registrada correctamente"
    );
onSaved?.();
    setOpenModal(false);

  } catch (error) {

    console.log(error);
  }

};
  return (

    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-5">

          <div className="flex items-center gap-3">

            <FileText
              size={22}
              className="text-[#1E55C0]"
            />

            <div>

              <h2 className="text-2xl font-black text-[#1E55C0]">
                Nuevo Registro de Acceso
              </h2>

              <p className="text-sm text-gray-500 font-bold">
                [ADMINISTRADOR]
              </p>

            </div>

          </div>

          <button
            onClick={() => setOpenModal(false)}
            className="text-gray-400 hover:text-red-500 transition"
          >

            <X size={28} />

          </button>

        </div>

        {/* BODY */}
        <div className="p-8 max-h-[85vh] overflow-y-auto">

          <h3 className="text-xl font-black text-[#1E55C0] mb-6">
            Datos de la Contrata
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

  {/* SEDE */}
  <div>
    <label className="block text-sm font-bold text-[#1E55C0] mb-2">
      Sede
    </label>

    <select
      value={sedeId}
      onChange={(e) => {
        setSedeId(e.target.value);
        setPabellonId("");
        setPisoId("");
        setAmbienteId("");
      }}
      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
    >
      <option value="">
        -- SELECCIONE SEDE --
      </option>

      {sedes.map((sede) => (
        <option
          key={sede.id}
          value={sede.id}
        >
          {sede.nombre}
        </option>
      ))}
    </select>
  </div>

  {/* PABELLON */}
  <div>
    <label className="block text-sm font-bold text-[#1E55C0] mb-2">
      Pabellón
    </label>

    <select
      value={pabellonId}
      onChange={(e) => {
        setPabellonId(e.target.value);
        setPisoId("");
        setAmbienteId("");
      }}
      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
    >
      <option value="">
        -- SELECCIONE PABELLÓN --
      </option>

      {pabellones.map((p) => (
        <option
          key={p.id}
          value={p.id}
        >
          {p.nombre}
        </option>
      ))}
    </select>
  </div>

  {/* PISO */}
  <div>
    <label className="block text-sm font-bold text-[#1E55C0] mb-2">
      Piso
    </label>

    <select
      value={pisoId}
      onChange={(e) => {
        setPisoId(e.target.value);
        setAmbienteId("");
      }}
      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
    >
      <option value="">
        -- SELECCIONE PISO --
      </option>

      {pisos.map((p) => (
        <option
          key={p.id}
          value={p.id}
        >
          {p.nombre}
        </option>
      ))}
    </select>
  </div>

  {/* AMBIENTE */}
  <div>
    <label className="block text-sm font-bold text-[#1E55C0] mb-2">
      Ambiente
    </label>

    <select
      value={ambienteId}
      onChange={(e) =>
        setAmbienteId(e.target.value)
      }
      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
    >
      <option value="">
        -- SELECCIONE AMBIENTE --
      </option>

      {ambientes.map((a) => (
        <option
          key={a.id}
          value={a.id}
        >
          {a.nombre}
        </option>
      ))}
    </select>
  </div>

</div>
<div className="mb-5">

  <label className="block text-sm font-bold text-[#1E55C0] mb-2">
    Motivo
  </label>

  <select
    value={motivo}
    onChange={(e) =>
      setMotivo(e.target.value)
    }
    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
  >
    <option value="">
      -- SELECCIONE MOTIVO --
    </option>
    <option value="REPARACIONES">
      REPARACIONES
    </option>
    <option value="REUNION">
      REUNIÓN
    </option>
    <option value="SUPERVISIONES">
      SUPERVISIONES
    </option>
    <option value="VISITA TECNICA">
      VISITA TÉCNICA
    </option>
  </select>

</div>
<div className="grid grid-cols-2 gap-5 mb-5">

  <div>
    <label className="block text-sm font-bold text-[#1E55C0] mb-2">
      Fecha Inicio
    </label>

    <input
      type="date"
      value={fechaInicio}
      onChange={(e) =>
        setFechaInicio(e.target.value)
      }
      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
    />
  </div>

  <div>
    <label className="block text-sm font-bold text-[#1E55C0] mb-2">
      Fecha Final
    </label>

    <input
      type="date"
      value={fechaFin}
      onChange={(e) =>
        setFechaFin(e.target.value)
      }
      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
    />
  </div>

</div>
<div className="grid grid-cols-2 gap-5 mb-5">

  <div>
    <label className="block text-sm font-bold text-[#1E55C0] mb-2">
      Hora Entrada
    </label>

    <input
      type="time"
      value={horaEntrada}
      onChange={(e) =>
        setHoraEntrada(e.target.value)
      }
      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
    />
  </div>

  <div>
    <label className="block text-sm font-bold text-[#1E55C0] mb-2">
      Hora Salida
    </label>

    <input
      type="time"
      value={horaSalida}
      onChange={(e) =>
        setHoraSalida(e.target.value)
      }
      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
    />
  </div>

</div>
  <div>
    <label className="block text-sm font-bold text-[#1E55C0] mb-2">
      Empresa Contratista
    </label>

    <input
      value={empresaContratista}
      onChange={(e) =>
        setEmpresaContratista(e.target.value)
      }
      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
    />
  </div>

  <div>
    <label className="block text-sm font-bold text-[#1E55C0] mb-2">
      Email
    </label>

    <input
      type="email"
      value={emailResponsable}
      onChange={(e) =>
        setEmailResponsable(e.target.value)
      }
      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
    />
  </div>

  <div>
    <label className="block text-sm font-bold text-[#1E55C0] mb-2">
      DNI
    </label>

    <input
      value={dniResponsable}
      onChange={(e) =>
        setDniResponsable(e.target.value)
      }
      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
    />
  </div>

  <div>
    <label className="block text-sm font-bold text-[#1E55C0] mb-2">
      Nombres
    </label>

    <input
      value={nombresResponsable}
      onChange={(e) =>
        setNombresResponsable(e.target.value)
      }
      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
    />
  </div>

  <div>
    <label className="block text-sm font-bold text-[#1E55C0] mb-2">
      Apellido Paterno
    </label>

    <input
      value={apellidoPaternoResponsable}
      onChange={(e) =>
        setApellidoPaternoResponsable(
          e.target.value
        )
      }
      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
    />
  </div>

  <div>
    <label className="block text-sm font-bold text-[#1E55C0] mb-2">
      Apellido Materno
    </label>

    <input
      value={apellidoMaternoResponsable}
      onChange={(e) =>
        setApellidoMaternoResponsable(
          e.target.value
        )
      }
      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
    />
  </div>

  <div>
    <label className="block text-sm font-bold text-[#1E55C0] mb-2">
      Teléfono
    </label>

    <input
      value={telefonoResponsable}
      onChange={(e) =>
        setTelefonoResponsable(
          e.target.value
        )
      }
      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
    />
  </div>

</div>
<div className="mb-6">

  <label className="block text-sm font-bold text-[#1E55C0] mb-2">
    Descripción del Servicio
  </label>

  <textarea
    rows={4}
    value={descripcionServicio}
    onChange={(e) =>
      setDescripcionServicio(
        e.target.value
      )
    }
    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
  />

</div>
               {/* BOTONES */}
        <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => setOpenModal(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold"
            >
              Cancelar
            </button>

            <button
  onClick={guardarContrata}
  className="
  bg-[#1E55C0]
  hover:bg-[#1947a3]
  text-white
  px-6
  py-3
  rounded-xl
  font-bold
  "
>
  Registrar Contrata
</button>
          </div>
      </div>

      </div>

    </div>

)}