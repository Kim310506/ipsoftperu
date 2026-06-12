import { useEffect, useState } from "react";
import api from "../../../../api/axios";
import {
  ShieldCheck,
  Search,
  Check,
  X,
  Users,
  Clock3,
} from "lucide-react";

export default function AutorizarProveedores() {
const [ordenCampo, setOrdenCampo] =
  useState("fechaInicio");
const [openTrabajadoresModal, setOpenTrabajadoresModal] =
  useState(false);
const [contrataSeleccionada, setContrataSeleccionada] =
  useState(null);
const [ordenDireccion, setOrdenDireccion] =
  useState("desc");
  const [contratas, setContratas] =
    useState([]);

  const [busqueda, setBusqueda] =
    useState("");

  useEffect(() => {

    cargarContratas();
  }, []);
const [user] = useState(() => {
  return JSON.parse(
    localStorage.getItem("proveedoresUser")
  );
});
const rol =
  user?.user?.rol ||
  user?.rol;
const roles =
  (rol || "")
    .split(",")
    .map(r => r.trim());  
    console.log("ROLES:", roles);
  const cargarContratas = async () => {

    try {

      const res =
        await api.get("/contratas");

      setContratas(res.data);

    } catch (error) {

      console.log(error);

    }

  };
const ordenarPor = (campo) => {

  if (ordenCampo === campo) {

    setOrdenDireccion(
      ordenDireccion === "asc"
        ? "desc"
        : "asc"
    );

  } else {

    setOrdenCampo(campo);
    setOrdenDireccion("asc");

  }

};
 const pendientes =
  contratas.filter(
    c =>
      c.estado === "PENDIENTE_SEGURIDAD" ||
      c.estado === "PENDIENTE_AMBIENTE"
  ).length;
  const autorizadas =
    contratas.filter(
      c => c.estado === "AUTORIZADO"
    ).length;
const contratasFiltradas =
  [...contratas]
    .filter((item) => {

      const texto = `
        ${item.codigo}
        ${item.motivo}
        ${item.estado}
        ${item.sede?.nombre || ""}
        ${item.ambiente?.nombre || ""}
      `
        .toLowerCase();

      return texto.includes(
        busqueda.toLowerCase()
      );

    })
    .sort((a, b) => {

      let valorA =
        a[ordenCampo];

      let valorB =
        b[ordenCampo];

      if (
        ordenCampo ===
        "fechaInicio"
      ) {

        valorA = new Date(
          a.fechaInicio
        );

        valorB = new Date(
          b.fechaInicio
        );

      }

      if (valorA < valorB)
        return ordenDireccion ===
          "asc"
          ? -1
          : 1;

      if (valorA > valorB)
        return ordenDireccion ===
          "asc"
          ? 1
          : -1;

      return 0;

    });
const autorizarContrata = async (
  contrata
) => {

  try {

    const res = await api.put(
      `/contratas/${contrata.id}/autorizar`,
      {
        accionPorId: user?.id
      }
    );

    setContratas((prev) =>
      prev.map((c) =>
        c.id === contrata.id
          ? res.data
          : c
      )
    );

  } catch (error) {

    console.log(error);

  }

};
const aprobarSeguridad = async (contrata) => {
  try {
    const res = await api.put(
      `/contratas/${contrata.id}/aprobar-seguridad`,
      {
        usuarioId: user?.id
      }
    );

    setContratas(prev =>
      prev.map(c =>
        c.id === contrata.id ? res.data : c
      )
    );

  } catch (error) {
    console.log(error);
  }
};
const rechazarSeguridad = async (contrata) => {
  const motivo = prompt("Escribe el motivo del rechazo:");

  if (!motivo) return;

  try {
    const res = await api.put(
      `/contratas/${contrata.id}/rechazar`,
      {
        usuarioId: user?.id,
        motivoRechazo: motivo
      }
    );

    setContratas(prev =>
      prev.map(c =>
        c.id === contrata.id
          ? res.data
          : c
      )
    );

      } catch (error) {
        console.log(error);
      }
    };
const aprobarAmbiente = async (contrata) => {
  const res = await api.put(
    `/contratas/${contrata.id}/aprobar-ambiente`,
    {
      usuarioId: user?.id
    }
  );

  setContratas(prev =>
    prev.map(c =>
      c.id === contrata.id ? res.data : c
    )
  );
};
const getEstadoVisual = (item) => {

  switch (item.estado) {

    case "PENDIENTE_SEGURIDAD":
      return "REVISANDO SEGURIDAD 🛡️";

    case "PENDIENTE_AMBIENTE":
      return "REVISANDO AMBIENTE 🌿";

    case "AUTORIZADO":
      return "AUTORIZADO 🟢";

    case "RECHAZADO":
      return "RECHAZADO 🔴";

    default:
      return "EN PROCESO ⏳";
  }

};

    return (

    <main className="p-6 lg:p-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#1E55C0] to-[#3f83f8] rounded-3xl p-8 mb-8 shadow-lg">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white">

            <ShieldCheck size={34} />

          </div>

          <div>

            <h1 className="text-4xl font-black text-white">
              Autorizar Contratas
            </h1>

            <p className="text-blue-100">
              Gestión y control de autorizaciones
            </p>

          </div>

        </div>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center">

              <Clock3 size={28} />

            </div>

            <div>

              <h3 className="font-bold text-gray-500">
                Pendientes
              </h3>

              <p className="text-4xl font-black text-yellow-600">
                {pendientes}
              </p>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">

              <Check size={28} />

            </div>

            <div>

              <h3 className="font-bold text-gray-500">
                Autorizadas
              </h3>

              <p className="text-4xl font-black text-green-600">
                {autorizadas}
              </p>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">

              <Users size={28} />

            </div>

            <div>

              <h3 className="font-bold text-gray-500">
                Total
              </h3>

              <p className="text-4xl font-black text-blue-600">
                {contratas.length}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* TABLA */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

        <div className="
p-6
flex
flex-col
md:flex-row
gap-4
justify-between
md:items-center
">

          <h2 className="text-2xl font-black text-[#1E55C0]">
            Lista de Contratas
          </h2>

          <div className="
            relative
            w-full
            md:w-[320px]
            ">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) =>
                setBusqueda(e.target.value)
              }
              className="w-full border rounded-2xl pl-11 pr-4 py-3"
            />

          </div>

        </div>

        <div className="overflow-x-auto">

          <table
             className="
            w-full
            min-w-[1200px]
            text-sm
            "
            >

            <thead className="bg-[#f8fafc]">
              <tr className="text-xs md:text-sm">

                <th
                  onClick={() =>
                    ordenarPor("fechaInicio")
                  }
                  className="p-4 cursor-pointer"
                >
                  FECHA
                  {ordenCampo ===
                    "fechaInicio" &&
                    (
                      ordenDireccion ===
                        "asc"
                        ? " ↑"
                        : " ↓"
                    )}
                </th>

                <th
                  onClick={() =>
                    ordenarPor("codigo")
                  }
                  className="p-4 cursor-pointer"
                >
                  CODIGO
                  {ordenCampo ===
                    "codigo" &&
                    (
                      ordenDireccion ===
                        "asc"
                        ? " ↑"
                        : " ↓"
                    )}
                </th>

                <th className="p-4">
                  LOCAL
                </th>

                <th className="p-4">
                  ÁREA
                </th>

                <th className="p-4">
                  HORARIO
                </th>

                <th className="p-4">
                  MOTIVO
                </th>

                <th
                  onClick={() =>
                    ordenarPor("estado")
                  }
                  className="p-4 cursor-pointer"
                >
                  ESTADO
                  {ordenCampo ===
                    "estado" &&
                    (
                      ordenDireccion ===
                        "asc"
                        ? " ↑"
                        : " ↓"
                    )}
                </th>

                <th className="p-4">
                  AUTORIZADO
                </th>

                <th className="p-4">
                  TRABAJADORES
                </th>

                <th className="p-4">
                  ACCIONES
                </th>

              </tr>

            </thead>

            <tbody>

              {contratasFiltradas.map((item) => (

                <tr
                   key={item.id}
                    className="
                    border-b
                    border-gray-100
                    hover:bg-blue-50
                    transition
                    "
                >

                  <td className="p-4">
                    {new Date(
                      item.fechaInicio
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">{item.codigo}</td>

                  <td className="p-4">
                    {item.sede?.nombre}
                  </td>

                  <td className="p-4">
                    {item.ambiente?.nombre}
                  </td>

                  <td className="p-4">
                    {item.horaEntrada}
                    {" - "}
                    {item.horaSalida}
                  </td>

                  <td className="p-4">
                    {item.motivo}
                  </td>

                  <td className="p-4 font-semibold">
                    <span
                      className={
                        item.estado === "AUTORIZADO"
                          ? "text-green-600"
                          : item.estado === "RECHAZADO"
                          ? "text-red-600"
                          : !item.aprobadoSeguridadPor
                          ? "text-blue-600"
                          : "text-yellow-600"
                      }
                    >
                      {getEstadoVisual(item)}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => {
                        setContrataSeleccionada(item);
                        setOpenTrabajadoresModal(true);
                      }}
                      className="
                        bg-cyan-500
                        hover:bg-cyan-600
                        transition
                        text-white
                        px-4
                        py-2
                        rounded-xl
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <Users size={16} />
                      {item.trabajadores?.length}
                    </button>

                  </td>

                  <td className="p-4">

 {roles.includes("ANALISTA DE SEGURIDAD") &&
  item.estado === "PENDIENTE_SEGURIDAD" && (


    <div className="flex gap-2">

      <button
        onClick={() => aprobarSeguridad(item)}
        className="
          bg-blue-500
          text-white
          px-3
          py-2
          rounded-xl
        "
      >
        Aprobar ✔
      </button>

      <button
        onClick={() => rechazarSeguridad(item)}
        className="
          bg-red-500
          text-white
          px-3
          py-2
          rounded-xl
        "
      >
        Rechazar ✖
      </button>

    </div>

  )}

{roles.includes("RESPONSABLE AMBIENTE") &&
  item.estado === "PENDIENTE_AMBIENTE" && (

    <button
      onClick={() => aprobarAmbiente(item)}
      className="
        bg-green-600
        text-white
        px-4
        py-2
        rounded-xl
      "
    >
      Autorizar Ambiente ✔
    </button>

  )}

</td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
{/* ========================= */}
{/* MODAL TRABAJADORES */}
{/* ========================= */}

{openTrabajadoresModal &&
  contrataSeleccionada && (

  <div
    className="
      fixed
      inset-0
      z-50
      bg-black/40
      backdrop-blur-sm
      flex
      items-center
      justify-center
      p-4
    "
  >

    <div
      className="
        bg-white
        w-full
        max-w-5xl
        rounded-lg
        shadow-2xl
        overflow-hidden
      "
    >

      {/* HEADER */}
      <div
        className="
          bg-[#3B82F6]
          px-5
          py-3
          flex
          justify-between
          items-center
        "
      >

        <h2
          className="
            text-white
            font-bold
            text-lg
          "
        >
          Detalle de Contrata
        </h2>

        <button
          onClick={() =>
            setOpenTrabajadoresModal(false)
          }
          className="
            text-white
            text-xl
          "
        >
          <X size={20} />
        </button>

      </div>

      <div className="p-4">

        {/* INFORMACION */}
        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            mb-5
            overflow-hidden
          "
        >

          <div
            className="
              bg-[#F8FAFC]
              px-4
              py-2
              flex
              justify-between
              items-center
            "
          >

            <h3
              className="
                text-blue-600
                font-semibold
              "
            >
              ℹ Información de la Contrata
            </h3>

            <span
              className="
                bg-green-600
                text-white
                text-xs
                px-3
                py-1
                rounded
                font-bold
              "
            >
              {contrataSeleccionada.estado}
            </span>

          </div>

          <div className="p-4">

            <label
              className="
                font-semibold
                text-sm
              "
            >
              Detalle de la Solicitud:
            </label>

            <input
              readOnly
              value={contrataSeleccionada.descripcionServicio}
              className="
                w-full
                mt-2
                rounded-xl
                bg-[#F8FAFC]
                px-4
                py-3
                outline-none
                border-0
              "
            />

            {/* DOCUMENTOS */}

            <div
              className="
                grid
                grid-cols-3
                gap-8
                mt-5
              "
            >

              {contrataSeleccionada.documentos?.map(
                (doc) => (

                  <div
                    key={doc.id}
                    className="
                      bg-[#F8FAFC]
                      rounded-xl
                      p-4
                      text-center
                      hover:shadow-md
                      transition
                    "
                  >

                    <div
                      className="
                        font-semibold
                        text-sm
                        mb-2
                      "
                    >

                      {doc.tipo === "SCTR" &&
                        "📄 SCTR"}

                      {doc.tipo === "CM" &&
                        "🩺 Cert. Médico"}

                      {doc.tipo === "CTA" &&
                        "🪜 Cert. Altura"}

                    </div>

                    <a
                      href={`http://localhost:3000${doc.archivo}`}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        text-blue-600
                        hover:underline
                        text-sm
                      "
                    >

                      Ver {doc.tipo}

                    </a>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

        {/* TRABAJADORES */}

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            overflow-hidden
          "
        >

          <div
            className="
              bg-[#F8FAFC]
              px-4
              py-2
              text-blue-600
              font-semibold
            "
          >
            👥 Trabajadores (
            {contrataSeleccionada.trabajadores
              ?.length || 0}
            )
          </div>

          <table className="w-full">

            <thead
              className="
                bg-gray-50
                text-sm
              "
            >

              <tr>

                <th
                  className="
                    text-left
                    px-4
                    py-3
                  "
                >
                  Código
                </th>

                <th
                  className="
                    text-left
                    px-4
                    py-3
                  "
                >
                  DNI
                </th>

                <th
                  className="
                    text-left
                    px-4
                    py-3
                  "
                >
                  Nombre Completo
                </th>

                <th
                  className="
                    text-left
                    px-4
                    py-3
                  "
                >
                  Email
                </th>

              </tr>

            </thead>

            <tbody>

              {contrataSeleccionada.trabajadores?.map(
                (trabajador) => (

                  <tr
                    key={trabajador.id}
                    className="
                      hover:bg-[#F8FAFC]
                      transition
                      hover:bg-gray-50
                    "
                  >

                    <td className="px-4 py-3">
                      {trabajador.codigo}
                    </td>

                    <td className="px-4 py-3">
                      {trabajador.dni}
                    </td>

                    <td className="px-4 py-3">

                      {trabajador.nombres}{" "}
                      {
                        trabajador.apellidoPaterno
                      }{" "}
                      {
                        trabajador.apellidoMaterno
                      }

                    </td>

                    <td className="px-4 py-3">
                      {trabajador.email}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  </div>

)}
    </main>

  );
}