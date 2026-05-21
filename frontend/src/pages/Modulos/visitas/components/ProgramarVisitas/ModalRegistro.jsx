import React, { useState } from "react";
import api from "../../../../../api/axios";
import { X, Trash2, PlusCircle, FileText } from "lucide-react";

export default function ModalRegistro({
  openModal,
  setOpenModal,

  tipoVisita,
  setTipoVisita,

  tipoCarga,
  setTipoCarga,

  sedeSeleccionada,
  setSedeSeleccionada,

  ambienteSeleccionado,
  setAmbienteSeleccionado,

  sedes = [],
  ambientes = [],

  dni,
  setDni,

  nombres,
  setNombres,

  apellidoPaterno,
  setApellidoPaterno,

  apellidoMaterno,
  setApellidoMaterno,

  email,
  setEmail,

  empresa,
  setEmpresa,

  visitantes,
  setVisitantes,

  agregarVisitante,
}) {
  if (!openModal) return null;
const [qr, setQr] = useState(null);
  /* ========================= */
  /* SUBMIT */
  /* ========================= */
  const handleSubmit = async () => {
  try {
    const payload = {
      tipo: tipoVisita,
      sedeId: sedeSeleccionada ? Number(sedeSeleccionada) : null,
      ambienteId: ambienteSeleccionado ? Number(ambienteSeleccionado) : null,

      motivo: "REUNION",
      fecha: new Date().toISOString(),

      horaEntrada: "08:00",
      horaSalida: "10:00",

      estado: "PENDIENTE",
      autorizado: "NO",

      visitantes: visitantes || [],
      email,
    };

    const res = await api.post("/visitas", payload);

    // 👇 AQUÍ está el QR que viene del backend
    const qrGenerado = res.data?.qr || res.data?.qrUrl || res.data?.codigoQR;

    console.log("QR:", qrGenerado);

    // reset
    setVisitantes([]);
    setSedeSeleccionada("");
    setAmbienteSeleccionado("");
    setTipoVisita("INTERNO");
    setTipoCarga("INDIVIDUAL");

    setOpenModal(false);

    alert("Visita registrada correctamente");

  } catch (error) {
    console.log(error);
    alert("Error al registrar visita");
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

          <h1 className="text-sm font-semibold text-gray-400 tracking-wide mb-2">
            Tipo de Acceso
          </h1>

          <h3 className="text-xl font-black text-[#1E55C0] mb-6">
            Nueva Visita
          </h3>

        {/* ========================= */}
        {/* TIPO */}
        {/* ========================= */}

        <div className="flex items-center gap-8 mb-8">

          <label className="flex items-center gap-2 font-semibold">

            <input
              type="radio"
              name="tipoVisita"
              checked={tipoVisita === "INTERNO"}
              onChange={() =>
                setTipoVisita("INTERNO")
              }
            />

            Interno

          </label>

          <label className="flex items-center gap-2 font-semibold">

            <input
              type="radio"
              name="tipoVisita"
              checked={tipoVisita === "EXTERNO"}
              onChange={() =>
                setTipoVisita("EXTERNO")
              }
            />

            Externo

          </label>

        </div>

        {/* ========================= */}
        {/* GRID */}
        {/* ========================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

          {/* SEDE */}
         <div>
              <label className="block text-sm font-bold text-[#1E55C0] mb-2">
                Sede
              </label>

              <select
                value={sedeSeleccionada}
                onChange={(e) => {
                  setSedeSeleccionada(e.target.value);
                  setAmbienteSeleccionado("");
                }}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              >
                <option value="">-- SELECCIONE SEDE --</option>

                {sedes.length > 0 &&
                  sedes.map((sede) => (
                    <option key={sede.id} value={sede.id}>
                      {sede.nombre}
                    </option>
                  ))}
              </select>
            </div>

          {/* AREA */}
          <div>
              <label className="block text-sm font-bold text-[#1E55C0] mb-2">
                Área
              </label>

              <select
                value={ambienteSeleccionado}
                onChange={(e) => setAmbienteSeleccionado(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              >
                <option value="">-- SELECCIONE ÁREA --</option>

                {ambientes.length > 0 &&
                  ambientes.map((ambiente) => (
                    <option key={ambiente.id} value={ambiente.id}>
                      {ambiente.nombre}
                    </option>
                  ))}
              </select>
            </div>

        </div>

        {/* ========================= */}
        {/* FILA */}
        {/* ========================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">

          <div>

            <label className="block text-sm font-bold text-[#1E55C0] mb-2">

              Motivo

            </label>

            <select className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]">

              <option>
                -- SELECCIONE MOTIVO --
              </option>

              <option>REUNION</option>
              <option>VISITA TECNICA</option>
              <option>SUPERVISION</option>

            </select>

          </div>

          <div>

            <label className="block text-sm font-bold text-[#1E55C0] mb-2">

              Fecha Inicio

            </label>

            <input
              type="date"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
            />

          </div>

          <div>

            <label className="block text-sm font-bold text-[#1E55C0] mb-2">

              Fecha Final

            </label>

            <input
              type="date"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
            />

          </div>

        </div>

        {/* ========================= */}
        {/* HORAS */}
        {/* ========================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

          <div>

            <label className="block text-sm font-bold text-[#1E55C0] mb-2">

              Hora Entrada

            </label>

            <input
              type="time"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
            />

          </div>

          <div>

            <label className="block text-sm font-bold text-[#1E55C0] mb-2">

              Hora Salida

            </label>

            <input
              type="time"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
            />

          </div>

        </div>

        {/* ========================= */}
{/* VISITANTE */}
{/* ========================= */}

{tipoVisita === "INTERNO" && (

  <>

    <h4 className="text-lg font-black text-[#1E55C0] mb-5">

      Datos del Visitante

    </h4>

    <div className="flex items-center gap-8 mb-6">

      {/* INDIVIDUAL */}
      <label className="flex items-center gap-2 font-semibold">

        <input
          type="radio"
          name="tipoCarga"
          checked={tipoCarga === "INDIVIDUAL"}
          onChange={() =>
            setTipoCarga("INDIVIDUAL")
          }
        />

        Datos Individuales

      </label>

      {/* MASIVO */}
      <label className="flex items-center gap-2 font-semibold">

        <input
          type="radio"
          name="tipoCarga"
          checked={tipoCarga === "MASIVO"}
          onChange={() =>
            setTipoCarga("MASIVO")
          }
        />

        Datos Masivos (Excel)

      </label>

    </div>

  </>

)}
        {tipoVisita === "INTERNO" &&
tipoCarga === "INDIVIDUAL" && (
    <p className="text-sm text-gray-500 font-semibold mb-4">
Registro Manual
        </p>
)}
{tipoVisita === "INTERNO" &&
tipoCarga === "MASIVO" && (
    <p className="text-sm text-gray-500 font-semibold mb-4">
Carga Masiva (Varios visitantes)
        </p>
)}
{tipoVisita === "EXTERNO" && (
    <p className="text-sm text-gray-500 font-semibold mb-4">
Datos del Contacto (Responsable del grupo)
        </p>
)}

        {/* ========================= */}
        {/* INTERNO */}
        {/* ========================= */}

     {tipoVisita === "INTERNO" &&
tipoCarga === "INDIVIDUAL" && (

  <>
    {/* INPUTS */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">

      <div>
        <label className="block text-sm font-bold text-[#1E55C0] mb-2">
          DNI
        </label>

        <input
          type="number"
          value={dni}
          onChange={(e) =>
            setDni(e.target.value)
          }
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[#1E55C0] mb-2">
          Nombres
        </label>

        <input
          type="text"
          value={nombres}
          onChange={(e) =>
            setNombres(e.target.value)
          }
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[#1E55C0] mb-2">
          Apellido Paterno
        </label>

        <input
          type="text"
          value={apellidoPaterno}
          onChange={(e) =>
            setApellidoPaterno(
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
          type="text"
          value={apellidoMaterno}
          onChange={(e) =>
            setApellidoMaterno(
              e.target.value
            )
          }
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
        />
      </div>

    </div>

    {/* EMAIL */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

      <div>
        <label className="block text-sm font-bold text-[#1E55C0] mb-2">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[#1E55C0] mb-2">
          Empresa
        </label>

        <input
          type="text"
          value={empresa}
          onChange={(e) =>
            setEmpresa(e.target.value)
          }
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
        />
      </div>

    </div>

    {/* LISTA */}
    {visitantes.length > 0 && (

      <div className="mt-8 border border-indigo-500 rounded-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-5 py-3 flex items-center gap-3">

          <span className="text-white font-black">
            ☰ Visitantes Agregados
          </span>

          <span className="bg-white text-indigo-600 text-xs font-black px-2 py-1 rounded-full">
            {visitantes.length}
          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px] bg-white">

            <thead>

              <tr className="border-b text-sm text-left">

                <th className="px-4 py-4 font-black">
                  DNI
                </th>

                <th className="px-4 py-4 font-black">
                  Nombres
                </th>

                <th className="px-4 py-4 font-black">
                  Apellidos
                </th>

                <th className="px-4 py-4 font-black">
                  Email
                </th>

                <th className="px-4 py-4 font-black">
                  Empresa
                </th>

                <th className="px-4 py-4 font-black text-center">
                  Acción
                </th>

              </tr>

            </thead>

            <tbody>

              {visitantes.map((visitante) => (

                <tr
                  key={visitante.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-4 py-4 font-semibold">
                    {visitante.dni}
                  </td>

                  <td className="px-4 py-4">
                    {visitante.nombres}
                  </td>

                  <td className="px-4 py-4">
                    {visitante.apellidos}
                  </td>

                  <td className="px-4 py-4">
                    {visitante.email}
                  </td>

                  <td className="px-4 py-4">
                    {visitante.empresa || "-"}
                  </td>

                  <td className="px-4 py-4 text-center">

                    <button
                      onClick={() =>
                        setVisitantes(
                          visitantes.filter(
                            (v) =>
                              v.id !== visitante.id
                          )
                        )
                      }
                      className="text-red-600 hover:text-red-800"
                    >

                      <Trash2 size={18} />

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    )}
  <div className="flex justify-end w-full">

    <button
      onClick={agregarVisitante}
      className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2"
    >

      <PlusCircle size={18} />

      Agregar a la Lista

    </button>

  </div>

  </>

)}
   {/* ========================= */}
{/* CARGA MASIVA */}
{/* ========================= */}

{tipoVisita === "INTERNO" &&
tipoCarga === "MASIVO" && (

  <div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

      <div>
        <label className="block text-sm font-bold text-[#1E55C0] mb-2">
          Contacto (Responsable)
        </label>

        <input
          type="text"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[#1E55C0] mb-2">
          Email (del Contacto)
        </label>

        <input
          type="email"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-[#1E55C0] mb-2">
          Empresa
        </label>

        <input
          type="text"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
        />
      </div>

    </div>

    {/* ARCHIVO */}
    <div className="border border-gray-300 rounded-2xl p-5 bg-white">

      <label className="flex items-center gap-2 text-sm font-black text-[#1E55C0] mb-4">

        📎 Archivo Excel

      </label>

      <input
        type="file"
        accept=".xlsx,.xls"
        className="w-full border border-gray-300 rounded-xl px-4 py-3"
      />

      <p className="text-xs text-gray-500 mt-3">
        Formato permitido: .xlsx
      </p>

      <div className="flex justify-center mt-6">

        <button
          type="button"
          className="bg-[#dbeafe] hover:bg-[#bfdbfe] text-[#1E55C0] font-bold px-8 py-3 rounded-xl transition"
        >

          ⬇ Descargar Modelo

        </button>

      </div>

    </div>

  </div>

)}

        {/* ========================= */}
        {/* EXTERNO */}
        {/* ========================= */}


{tipoVisita === "EXTERNO" && (

  <>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">

      {/* CONTACTO */}
      <div>

        <label className="block text-sm font-bold text-[#1E55C0] mb-2">
          Contacto
        </label>

        <input
          type="text"
          value={nombres}
          onChange={(e) =>
            setNombres(e.target.value)
          }
          placeholder="Nombre del contacto"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
        />

      </div>

      {/* EMAIL */}
      <div>

        <label className="block text-sm font-bold text-[#1E55C0] mb-2">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="correo@empresa.com"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
        />

      </div>

      {/* EMPRESA */}
      <div>

        <label className="block text-sm font-bold text-[#1E55C0] mb-2">
          Empresa
        </label>

        <input
          type="text"
          value={empresa}
          onChange={(e) =>
            setEmpresa(e.target.value)
          }
          placeholder="Empresa"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#1E55C0]"
        />

      </div>

    </div>

  </>

)}
               {/* BOTONES */}
        <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => setOpenModal(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold"
            >
              Cancelar
            </button>

            <button
              onClick={handleSubmit}
              className="bg-[#1E55C0] hover:bg-[#1947a3] text-white px-6 py-3 rounded-xl font-bold"
            >
              Registrar
            </button>
          </div>
      </div>

      </div>

    </div>

)}