// src/pages/modulos/incidentes/components/OcurrenciasIncidentes.jsx

import {
  ClipboardList,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import api from "../../../../api/axios";

export default function OcurrenciasIncidentes() {
const opciones = {

  SAFETY: {

    HALLAZGO: {

      subcategorias: [
        "LABORATORIO",
        "PREVENCIÓN",
      ],

      motivos: {
        LABORATORIO: [
          "Uso incorrecto de equipos",
          "Derrame químico",
          "Falta de EPP",
        ],

        PREVENCIÓN: [
          "Acto inseguro",
          "Condición insegura",
          "Comportamiento riesgoso",
        ],
      },

    },

    INCIDENTE: {

      subcategorias: [
        "EQUIPOS",
        "INCENDIOS",
        "INFRAESTRUCTURA",
        "MATERIALES",
      ],

      motivos: {

        EQUIPOS: [
          "Falla de equipo",
          "Manipulación incorrecta",
        ],

        INCENDIOS: [
          "Conato de incendio",
          "Cortocircuito",
        ],

        INFRAESTRUCTURA: [
          "Techo dañado",
          "Cable expuesto",
        ],

        MATERIALES: [
          "Derrame",
          "Material peligroso",
        ],

      },

    },

  },

  SECURITY: {

    HALLAZGO: {

      subcategorias: [
        "PREVENCIÓN",
        "TRÁNSITO",
      ],

      motivos: {

        PREVENCIÓN: [
          "Persona sospechosa",
          "Zona vulnerable",
        ],

        TRÁNSITO: [
          "Vehículo mal estacionado",
          "Congestión",
        ],

      },

    },

    INCIDENTE: {

      subcategorias: [
        "ACCESOS",
        "AMENAZA",
        "ROBO",
      ],

      motivos: {

        ACCESOS: [
          "Ingreso no autorizado",
          "Suplantación",
        ],

        AMENAZA: [
          "Amenaza verbal",
          "Paquete sospechoso",
        ],

        ROBO: [
          "Hurto",
          "Pérdida de equipo",
        ],

      },

    },

  },

};

  const [sedes, setSedes] =
    useState([]);

  const [ambientes, setAmbientes] =
    useState([]);

  const [form, setForm] =
    useState({

      categoria: "SAFETY",

      sedeId: "",

      ambienteId: "",

      tipo: "",

      subcategoria: "",

      motivo: "",

      vinculo: "",

      detalle: "",

      personaInvolucrada: "",

      evidencias: [],

    });
const subcategorias =
  form.tipo
    ? opciones?.[form.categoria]?.[form.tipo]
        ?.subcategorias || []
    : [];

const motivos =
  form.subcategoria
    ? opciones?.[form.categoria]?.[form.tipo]
        ?.motivos?.[form.subcategoria] || []
    : [];
  // CARGAR SEDES
  useEffect(() => {

    cargarSedes();

  }, []);

const vinculos = [
  "ALUMNO(A)",
  "DOCENTE",
  "ADMINISTRATIVO",
  "VISITA",
  "PROVEEDOR",
  "OTRO",
];
  const cargarSedes =
  async () => {

    try {

      const res =
        await api.get("/sedes");

      setSedes(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // CAMBIO INPUT
 const handleChange = (e) => {

  const { name, value } = e.target;

  // RESETEAR DEPENDENCIAS
  if (name === "categoria") {

    setForm({

      ...form,

      categoria: value,

      tipo: "",

      subcategoria: "",

      motivo: "",

    });

    return;

  }

  if (name === "tipo") {

    setForm({

      ...form,

      tipo: value,

      subcategoria: "",

      motivo: "",

    });

    return;

  }

  if (name === "subcategoria") {

    setForm({

      ...form,

      subcategoria: value,

      motivo: "",

    });

    return;

  }

  setForm({

    ...form,

    [name]: value,

  });

};

  // CAMBIO SEDE
  const handleSede = async (e) => {

    const sedeId =
      e.target.value;

    setForm({

      ...form,

      sedeId,

      ambienteId: "",

    });

    try {

      const res =
        await api.get(
          `/ambientes/sede/${sedeId}`
        );

      setAmbientes(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // ARCHIVOS
  const handleFiles = (e) => {

    const files =
      Array.from(e.target.files);

    // VALIDAR MÁXIMO 2
    if (files.length > 2) {

      alert(
        "Solo puedes subir máximo 2 archivos"
      );

      e.target.value = "";

      return;

    }

    setForm({

      ...form,

      evidencias: files,

    });

  };

  // GUARDAR
 const guardarOcurrencia =
async () => {

  try {

    const data =
      new FormData();

    data.append(
      "categoria",
      form.categoria
    );

    data.append(
      "tipo",
      form.tipo
    );

    data.append(
      "subcategoria",
      form.subcategoria
    );

    data.append(
      "motivo",
      form.motivo
    );

    data.append(
      "vinculo",
      form.vinculo
    );

    data.append(
      "detalle",
      form.detalle
    );

    data.append(
      "personaInvolucrada",
      form.personaInvolucrada
    );

    data.append(
      "sedeId",
      form.sedeId
    );

    data.append(
      "ambienteId",
      form.ambienteId
    );

    data.append(
      "usuarioId",
      1
    );

    // IMÁGENES
    for (
      let i = 0;
      i < form.evidencias.length;
      i++
    ) {

      data.append(
        "evidencias",
        form.evidencias[i]
      );

    }

    await api.post(
      "/incidentes",
      data
    );

    alert(
      "Ocurrencia registrada"
    );

  } catch (error) {

    console.log(error);

  }

};

  return (

    <div className="min-h-screen">

      {/* HEADER */}
      <div
        className="
          flex
          items-center
          gap-4
          mb-8
        "
      >

        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-[#244db7]
            text-white
            flex
            items-center
            justify-center
            shadow-lg
          "
        >

          <ClipboardList size={28} />

        </div>

        <h1
          className="
            text-4xl
            font-black
            text-gray-800
          "
        >
          Registro de Ocurrencias
        </h1>

      </div>

      {/* CARD */}
      <div
        className="
          bg-white
          rounded-[35px]
          p-8
          shadow-sm
          border
          border-gray-100
        "
      >

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-8
          "
        >

          {/* LEFT */}
          <div className="space-y-5">

            {/* CATEGORÍA */}
            <div
            className="
                bg-[#f5f7fb]
                rounded-2xl
                p-5
                flex
                items-center
                gap-6
                shadow-sm
            "
            >

            <span
                className="
                text-sm
                font-semibold
                text-gray-500
                "
            >
                CATEGORÍA:
            </span>

            <label
                className="
                flex
                items-center
                gap-3
                text-sm
                bg-white
                px-4
                py-3
                rounded-xl
                cursor-pointer
                shadow-sm
                "
            >

                <input
                type="radio"
                name="categoria"
                value="SAFETY"
                checked={
                    form.categoria === "SAFETY"
                }
                onChange={handleChange}
                className="
                    accent-[#244db7]
                    w-4
                    h-4
                "
                />

                SAFETY

            </label>

            <label
                className="
                flex
                items-center
                gap-3
                text-sm
                bg-white
                px-4
                py-3
                rounded-xl
                cursor-pointer
                shadow-sm
                "
            >

                <input
                type="radio"
                name="categoria"
                value="SECURITY"
                checked={
                    form.categoria === "SECURITY"
                }
                onChange={handleChange}
                className="
                    accent-[#244db7]
                    w-4
                    h-4
                "
                />

                SECURITY

            </label>

            </div>

            {/* CAMPUS */}
            <div>

              <label
                className="
                  text-sm
                  font-bold
                  text-gray-700
                  mb-2
                  block
                "
              >
                CAMPUS
              </label>

              <select
                name="sedeId"
                value={form.sedeId}
                onChange={handleSede}
                className="
                    w-full
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    bg-[#f5f7fb]
                    border-0
                    focus:ring-2
                    focus:ring-[#244db7]
                    "
              >

                <option value="">
                  -- SELECCIONE CAMPUS --
                </option>

                {sedes.map((s) => (

                  <option
                    key={s.id}
                    value={s.id}
                  >

                    {s.nombre}

                  </option>

                ))}

              </select>

            </div>

            {/* AMBIENTE */}
            <div>

              <label
                className="
                  text-sm
                  font-bold
                  text-gray-700
                  mb-2
                  block
                "
              >
                AMBIENTE
              </label>

              <select
                name="ambienteId"
                value={form.ambienteId}
                onChange={handleChange}
                className="
                    w-full
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    bg-[#f5f7fb]
                    border-0
                    focus:ring-2
                    focus:ring-[#244db7]
                    "
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

            {/* TIPO */}
            <div>

              <label
                className="
                  text-sm
                  font-bold
                  text-gray-700
                  mb-2
                  block
                "
              >
                TIPO
              </label>

              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className="
                    w-full
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    bg-[#f5f7fb]
                    border-0
                    focus:ring-2
                    focus:ring-[#244db7]
                    "
              >

                <option value="">
                  -- SELECCIONAR TIPO --
                </option>

                <option>
                  HALLAZGO
                </option>

                <option>
                  INCIDENTE
                </option>

              </select>

            </div>

            {/* SUBCATEGORÍA */}
            <div>

              <div>

                <label
                    className="
                    text-sm
                    font-bold
                    text-gray-700
                    mb-2
                    block
                    "
                >
                    SUBCATEGORÍA
                </label>

                <select
                    name="subcategoria"
                    value={form.subcategoria}
                    onChange={handleChange}
                    className="
                    w-full
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    bg-[#f5f7fb]
                    border-0
                    focus:ring-2
                    focus:ring-[#244db7]
                    "
                >

                    <option value="">
                    Seleccionar subcategoría
                    </option>

                    {subcategorias.map((s) => (

                    <option
                        key={s}
                        value={s}
                    >

                        {s}

                    </option>

                    ))}

                </select>

                </div>

            </div>

            {/* MOTIVO */}
            <div>
            <label
                className="
                text-sm
                font-bold
                text-gray-700
                mb-2
                block
                "
            >
                MOTIVO
            </label>

            <select
                name="motivo"
                value={form.motivo}
                onChange={handleChange}
                className="
                w-full
                rounded-2xl
                px-5
                py-4
                outline-none
                bg-[#f5f7fb]
                border-0
                focus:ring-2
                focus:ring-[#244db7]
                "
            >

                <option value="">
                Seleccionar motivo
                </option>

                {motivos.map((m) => (

                <option
                    key={m}
                    value={m}
                >

                    {m}

                </option>

                ))}

            </select>

            </div>

            {/* VÍNCULO */}
            <div>

            <label
                className="
                text-sm
                font-bold
                text-gray-700
                mb-2
                block
                "
            >
                VÍNCULO
            </label>

            <select
                name="vinculo"
                value={form.vinculo}
                onChange={handleChange}
                className="
                w-full
                rounded-2xl
                px-5
                py-4
                outline-none
                bg-[#f5f7fb]
                border-0
                focus:ring-2
                focus:ring-[#244db7]
                "
            >

                <option value="">
                Seleccionar vínculo
                </option>

                {vinculos.map((v) => (

                <option
                    key={v}
                    value={v}
                >

                    {v}

                </option>

                ))}

            </select>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            {/* DETALLE */}
            <div>

              <label
                className="
                  text-sm
                  font-bold
                  text-gray-700
                  mb-2
                  block
                "
              >
                DETALLE
              </label>

              <textarea
                name="detalle"
                value={form.detalle}
                onChange={handleChange}
                rows={7}
                placeholder="
                  Describe detalladamente...
                "
                className="
                    w-full
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    bg-[#f5f7fb]
                    border-0
                    focus:ring-2
                    focus:ring-[#244db7]
                    "
              />

            </div>

            {/* PERSONA */}
            <div>

              <label
                className="
                  text-sm
                  font-bold
                  text-gray-700
                  mb-2
                  block
                "
              >
                PERSONA INVOLUCRADA
              </label>

              <input
                type="text"
                name="personaInvolucrada"
                value={
                  form.personaInvolucrada
                }
                onChange={handleChange}
                placeholder="
                  Nombre completo
                "
                className="
                  w-full
                border-0
                bg-[#f5f7fb]
                focus:ring-2
                focus:ring-[#244db7]                  
                rounded-2xl
                  px-5
                  py-4
                  outline-none
                "
              />

            </div>

            {/* EVIDENCIAS */}
            <div>

              <label
                className="
                  text-sm
                  font-bold
                  text-gray-700
                  mb-2
                  block
                "
              >
                EVIDENCIA FOTOGRÁFICA
              </label>

              <div
                className="
                  border
                  border-dashed
                  rounded-2xl
                  p-4
                  bg-[#fafafa]
                "
              >

                <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFiles}
                className="
                  w-full
                  text-sm
                  text-gray-600
                "
              />

              {/* NOMBRES DE ARCHIVOS */}
              {form.evidencias.length > 0 && (

                <div className="mt-4 space-y-2">

                  {form.evidencias.map((file, index) => (

                    <div
                      key={index}
                      className="
                        bg-white
                        border
                        border-gray-200
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        text-gray-700
                        shadow-sm
                      "
                    >

                      📷 {file.name}

                    </div>

                  ))}

                </div>

              )}

              </div>

            </div>

            {/* BOTÓN */}
            <button
              onClick={
                guardarOcurrencia
              }
              className="
                w-full
                bg-[#3b82f6]
                hover:bg-[#2563eb]
                text-white
                py-5
                rounded-2xl
                font-black
                text-lg
                transition-all
                shadow-lg
              "
            >

              GRABAR

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}
