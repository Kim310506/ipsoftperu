import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../../../api/axios";

export default function RegistroVisitantes() {
const { token } = useParams();
const [data, setData] = useState(null);
const [
  trabajadorEditando,
  setTrabajadorEditando
] = useState(null);
const [sctrFile, setSctrFile] = useState(null);
const [cmFile, setCmFile] =
  useState(null);
const [ctaFile, setCtaFile] =
  useState(null);
const [nivelRiesgo, setNivelRiesgo] =
  useState("BAJA");
const [archivosExtra, setArchivosExtra] =
useState([]);
const [form, setForm] = useState({
  dni: "",
  nombres: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  email: ""
});
  useEffect(() => {
  const cargar = async () => {
    try {
      console.log("TOKEN:", token);

      const res = await api.get(
        `/contratasinhouse/token/${token}`
      );

      console.log("DATA:", res.data);

      setData(res.data);
      if (res.data.nivelRiesgo) {
        setNivelRiesgo(
          res.data.nivelRiesgo
        );
      }
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  cargar();
}, [token]);

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  }
  const sctrExistente =
  data.documentos?.find(
    doc => doc.tipo === "SCTR"
  );

const cmExistente =
  data.documentos?.find(
    doc => doc.tipo === "CM"
  );

const ctaExistente =
  data.documentos?.find(
    doc => doc.tipo === "CTA"
  );
  const eliminarTrabajador =
async (id) => {

  const confirmar =
    window.confirm(
      "¿Eliminar trabajador?"
    );

  if (!confirmar) return;

  try {

    await api.delete(
      `/contratasinhouse/trabajadores/${id}`
    );

    const res =
      await api.get(
        `/contratasinhouse/token/${token}`
      );

    setData(res.data);

  } catch (error) {

    console.log(error);

  }

};
const agregarVisitante = async () => {
  try {

    await api.post(
      `/contratasinhouse/token/${token}/trabajadores`,
      form
    );

    const res = await api.get(
      `/contratasinhouse/token/${token}`
    );

    setData(res.data);

    setForm({
      dni: "",
      nombres: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      email: ""
    });

  } catch (error) {
    console.error(error);
    alert("Error al registrar visitante");
  }
};
const actualizarTrabajador =
async () => {

  await api.put(

    `/contratasinhouse/trabajadores/${trabajadorEditando.id}`,

    form

  );

  const res =
    await api.get(
      `/contratasinhouse/token/${token}`
    );

  setData(res.data);

  setTrabajadorEditando(null);

};
const finalizarRegistro = async () => {
  
  try {

    if (
        !sctrFile &&
        !sctrExistente
      ) {
        return alert(
          "Debe adjuntar el SCTR"
        );
      }

    if (
      ["MEDIA", "ALTA"].includes(
        nivelRiesgo
      ) &&
      !cmFile &&
      !cmExistente
    ) {
      return alert(
        "Debe adjuntar el Certificado Médico"
      );
    }

    if (
      nivelRiesgo === "ALTA" &&
      !ctaFile &&
  !ctaExistente
    ) {
      return alert(
        "Debe adjuntar el Certificado de Trabajo en Altura"
      );
    }
    await api.put(
  `/contratasinhouse/token/${token}/nivel-riesgo`,
  {
    nivelRiesgo
  }
);
    // GUARDAR SCTR

    const sctrData =
      new FormData();

    sctrData.append(
      "archivo",
      sctrFile
    );
      if (sctrFile) {

  const sctrData = new FormData();

  sctrData.append(
    "archivo",
    sctrFile
  );

  await api.post(
    `/contratasinhouse/token/${token}/documento/SCTR`,
    sctrData
  );

}

    // GUARDAR CM

    if (cmFile) {

      const cmData =
        new FormData();

      cmData.append(
        "archivo",
        cmFile
      );

      await api.post(
        `/contratasinhouse/token/${token}/documento/CM`,
        cmData
      );

    }

    // GUARDAR CTA

    if (ctaFile) {

      const ctaData =
        new FormData();

      ctaData.append(
        "archivo",
        ctaFile
      );

      await api.post(
        `/contratasinhouse/token/${token}/documento/CTA`,
        ctaData
      );

    }
// GUARDAR DOCUMENTOS EXTRA

if (
archivosExtra.length > 0
) {

const extraData =
new FormData();

archivosExtra.forEach(
(archivo) => {

extraData.append(
"archivos",
archivo
);

}
);

await api.post(

`/contratasinhouse/token/${token}/documentos-extra`,

extraData

);

}
    alert(
      "Documentos registrados correctamente"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Error al registrar documentos"
    );

  }

};
  return (
  <div className="min-h-screen bg-gray-100 p-6">

    {/* FILA SUPERIOR */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* DETALLES */}
      <div className="bg-white rounded-xl shadow p-5">

        <h2 className="text-xl font-bold mb-4">
          ℹ️ Detalles de Visita Contrata
        </h2>

        <div className="space-y-4 text-sm">

          <p>
            <b>Nombre del evento:</b>{" "}
            {data.descripcionServicio}
          </p>

          <p>
            <b>Sede:</b>{" "}
            {data.sede?.nombre}
          </p>

          <p>
            <b>Fecha:</b>{" "}
            {data.fechaInicio?.split("T")[0]}
          </p>

          <p>
            <b>Entrada:</b>{" "}
            {data.horaEntrada}
          </p>

          <p>
            <b>Salida:</b>{" "}
            {data.horaSalida}
          </p>

          <p>
            <b>Empresa:</b>{" "}
            {data.empresaContratista}
          </p>

          <p>
            <b>Detalle:</b>{" "}
            {data.motivo}
          </p>

        </div>

      </div>

      {/* REGISTRO */}
      <div className="bg-white rounded-xl shadow p-5">

        <div className="flex gap-3 mb-5">

          <button
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold"
          >
            👥 Carga Manual
          </button>

          <button
            className="flex-1 bg-gray-100 py-2 rounded-lg font-semibold text-gray-600"
          >
            📄 Carga Masiva
          </button>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-sm">
              DNI
            </label>

            <input
              value={form.dni}
              onChange={(e) =>
                setForm({
                  ...form,
                  dni: e.target.value
                })
              }
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="text-sm">
              Nombres
            </label>

           <input
            value={form.nombres}
            onChange={(e) =>
              setForm({
                ...form,
                nombres: e.target.value
              })
            }
            className="w-full border rounded-lg p-2"
          />
          </div>

          <div>
            <label className="text-sm">
              Apellido Paterno
            </label>

            <input
              value={form.apellidoPaterno}
              onChange={(e) =>
                setForm({
                  ...form,
                  apellidoPaterno: e.target.value
                })
              }
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="text-sm">
              Apellido Materno
            </label>

            <input
              value={form.apellidoMaterno}
              onChange={(e) =>
                setForm({
                  ...form,
                  apellidoMaterno: e.target.value
                })
              }
              className="w-full border rounded-lg p-2"
            />
          </div>

        </div>

        <div className="mt-4">

          <label className="text-sm">
            Email
          </label>

         <input
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
          className="w-full border rounded-lg p-2"
        />
        </div>

        <button
  onClick={() => {

    if (trabajadorEditando) {
      actualizarTrabajador();
    } else {
      agregarVisitante();
    }

  }}
  className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg font-semibold"
>

  {trabajadorEditando
    ? "💾 Actualizar Visitante"
    : "➕ Agregar Visitante"}

</button>

      </div>

    </div>

    {/* TABLA */}
    <div className="bg-white rounded-xl shadow p-5 mt-8">

      <h2 className="text-xl font-bold text-blue-700 mb-5">
        👥 Lista de Visitantes Registrados
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-blue-500 text-white text-sm">

              <th className="p-3 text-left">
                CODIGO
              </th>

              <th className="p-3 text-left">
                DNI
              </th>

              <th className="p-3 text-left">
                NOMBRES
              </th>

              <th className="p-3 text-left">
                APELLIDO PAT.
              </th>

              <th className="p-3 text-left">
                APELLIDO MAT.
              </th>

              <th className="p-3 text-left">
                EMAIL
              </th>

              <th className="p-3 text-left">
                ACCIONES
              </th>

            </tr>

          </thead>

          <tbody>

            {data.trabajadores?.map((item) => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td className="p-3">
                  {item.codigo}
                </td>

                <td className="p-3">
                  {item.dni}
                </td>

                <td className="p-3">
                  {item.nombres}
                </td>

                <td className="p-3">
                  {item.apellidoPaterno}
                </td>

                <td className="p-3">
                  {item.apellidoMaterno}
                </td>

                <td className="p-3">
                  {item.email}
                </td>

                <td>
                  <button
                    onClick={() => {

                      setTrabajadorEditando(item);

                      setForm({

                        dni: item.dni,

                        nombres: item.nombres,

                        apellidoPaterno:
                          item.apellidoPaterno,

                        apellidoMaterno:
                          item.apellidoMaterno,

                        email: item.email

                      });

                    }}
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() =>
                      eliminarTrabajador(item.id)
                    }
                  >
                    🗑️
                  </button>

                  </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

    {/* GESTIÓN */}
    <div className="bg-white rounded-xl shadow p-5 mt-8">

      <h2 className="text-xl font-bold text-blue-700 mb-5">
        ⚙️ Gestión de la Visita
      </h2>

      <div className="space-y-5">

       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

  {/* NIVEL DE RIESGO */}
  <div>

    <label className="block mb-2">
      ⚠️ Nivel de Riesgo
    </label>

    <select
      value={nivelRiesgo}
      onChange={(e) =>
        setNivelRiesgo(
          e.target.value
        )
      }
      className="w-full border rounded-lg p-3"
    >

      <option value="BAJA">
        BAJA
      </option>

      <option value="MEDIA">
        MEDIA
      </option>

      <option value="ALTA">
        ALTA
      </option>

    </select>

  </div>

  {/* ARCHIVOS EXTRA */}
  <div>

    <label className="block mb-2 font-semibold">
      📎 Adjuntar Archivos
    </label>

    <input
      type="file"
      multiple
      onChange={(e) =>
        setArchivosExtra(
          Array.from(
            e.target.files
          )
        )
      }
      className="w-full border rounded-lg p-2"
    />

    {archivosExtra.length > 0 && (

      <div className="mt-3 text-sm">

        {archivosExtra.map(
          (file, index) => (

            <div key={index}>
              📄 {file.name}
            </div>

          )
        )}

      </div>

    )}

  </div>

</div>
        {/* SCTR */}
<div>

  <label className="block mb-2 font-semibold">
    📄 Subir SCTR (PDF)
  </label>

  <input
    type="file"
    accept=".pdf"
    onChange={(e) =>
      setSctrFile(
        e.target.files?.[0]
      )
    }
    className="w-full border rounded-lg p-2"
  />
{sctrExistente && (
  <div className="flex items-center gap-3 mt-2">

    <span className="text-green-600 text-sm">
      ✅ SCTR registrado
    </span>

    <a
  href={`http://localhost:3000${sctrExistente.archivo}`}
  target="_blank"
  rel="noreferrer"
  className="text-blue-600"
>
  👁️
</a>

  </div>
)}
</div>

{/* CERTIFICADO MÉDICO */}
{["MEDIA", "ALTA"].includes(
  nivelRiesgo
) && (
  <div>
    <label className="block mb-2 font-semibold">
      🏥 Subir Certificado Médico - CM (PDF)
    </label>

    <input
      type="file"
      accept=".pdf"
      onChange={(e) =>
        setCmFile(
          e.target.files?.[0]
        )
      }
      className="w-full border rounded-lg p-2"
    />
    {cmExistente && (
  <div className="flex items-center gap-3 mt-2">

    <span className="text-green-600 text-sm">
      ✅ Certificado Médico registrado
    </span>

    <a
      href={`http://localhost:3000/${cmExistente.archivo}`}
      target="_blank"
      rel="noreferrer"
      className="text-blue-600 hover:text-blue-800"
    >
      👁️
    </a>

  </div>
)}
  </div>
)}

{/* CERTIFICADO TRABAJO EN ALTURA */}
{nivelRiesgo === "ALTA" && (

  <div>

    <label className="block mb-2 font-semibold">
      🦺 Subir Certificado de Trabajo en Altura - CTA (PDF)
    </label>

    <input
      type="file"
      accept=".pdf"
      onChange={(e) =>
        setCtaFile(
          e.target.files?.[0]
        )
      }
      className="w-full border rounded-lg p-2"
    />
{ctaExistente && (
  <div className="flex items-center gap-3 mt-2">

    <span className="text-green-600 text-sm">
      ✅ Certificado de Altura registrado
    </span>

    <a
      href={`http://localhost:3000/${ctaExistente.archivo}`}
      target="_blank"
      rel="noreferrer"
      className="text-blue-600 hover:text-blue-800"
    >
      👁️
    </a>

  </div>
)}
  </div>

)}

        <button
  onClick={finalizarRegistro}
  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
>
  Finalizar Registro
</button>

      </div>

    </div>

  </div>
  );
}