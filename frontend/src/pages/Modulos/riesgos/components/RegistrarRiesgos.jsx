import { useEffect, useState } from "react";
import api from "../../../../api/axios";

export default function RegistrarRiesgo({
  open,
  onClose,
  onSaved
}) {
  
  const [sedes, setSedes] = useState([]);
  const [pabellones, setPabellones] = useState([]);
  const [pisos, setPisos] = useState([]);
  const [ambientes, setAmbientes] = useState([]);

  const [form, setForm] = useState({
    sedeId: "",
    pabellonId: "",
    pisoId: "",
    ambienteId: "",
    categoria: "",
    riesgo: "",
    probabilidad: 1,
    impacto: 1,
    descripcion: "",
  });

  const nivel = form.probabilidad * form.impacto;

  const getNivelTexto = (nivel) => {
    if (nivel <= 2) return "BAJO";
    if (nivel <= 4) return "MEDIO";
    return "ALTO";
  };

  // 1. CARGAR TODO (solo sedes)
  useEffect(() => {
    if (!open) return;

    api.get("/sedes").then(({ data }) => {
      setSedes(data);
    });
  }, [open]);

  // 2. cuando cambia sede → pabellones
  useEffect(() => {
    if (!form.sedeId) return;

    const sede = sedes.find((s) => s.id === Number(form.sedeId));
    setPabellones(sede?.pabellones || []);

    setPisos([]);
    setAmbientes([]);
    setForm((f) => ({ ...f, pabellonId: "", pisoId: "", ambienteId: "" }));
  }, [form.sedeId, sedes]);

  // 3. cuando cambia pabellón → pisos (desde TODOS los pisos que vienen en backend)
  useEffect(() => {
    if (!form.pabellonId) return;

    api.get("/pisos").then(({ data }) => {
      const filtrados = data.filter(
        (p) => p.pabellonId === Number(form.pabellonId)
      );

      setPisos(filtrados);
      setAmbientes([]);

      setForm((f) => ({ ...f, pisoId: "", ambienteId: "" }));
    });
  }, [form.pabellonId]);

  // 4. cuando cambia piso → ambientes
  useEffect(() => {
    if (!form.pisoId) return;

    const piso = pisos.find((p) => p.id === Number(form.pisoId));
    setAmbientes(piso?.ambientes || []);

    setForm((f) => ({ ...f, ambienteId: "" }));
  }, [form.pisoId, pisos]);

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "categoria") {
    setForm((prev) => ({
      ...prev,
      categoria: value,
      riesgo: "",
    }));
    return;
  }

  const camposNumericos = [
    "sedeId",
    "pabellonId",
    "pisoId",
    "ambienteId",
    "probabilidad",
    "impacto",
  ];

  setForm((prev) => ({
    ...prev,
    [name]: camposNumericos.includes(name)
      ? Number(value)
      : value,
  }));
};
const [imagen, setImagen] = useState(null);
  const guardar = async () => {
  try {
    const formData = new FormData();

    formData.append("sedeId", String(form.sedeId));
    formData.append("pabellonId", String(form.pabellonId));
    formData.append("pisoId", String(form.pisoId));
    formData.append("ambienteId", String(form.ambienteId));

    formData.append("categoria", form.categoria);
    formData.append("riesgo", form.riesgo);
    formData.append("probabilidad", String(form.probabilidad));
    formData.append("impacto", String(form.impacto));
    formData.append("nivel", String(nivel));
    formData.append("descripcion", form.descripcion);

    if (imagen) {
      formData.append("imagen", imagen);
    }

    await api.post("/riesgos", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

setForm({
  sedeId: "",
  pabellonId: "",
  pisoId: "",
  ambienteId: "",
  categoria: "",
  riesgo: "",
  probabilidad: 1,
  impacto: 1,
  descripcion: "",
});

setImagen(null);

onSaved?.();
onClose();

  } catch (error) {
    console.log(error);
  }
};
const riesgosPorCategoria = {
  FISICA: [
    "Falta luces de emergencia",
    "Falta señalética de evacuación",
    "Rutas / puertas de salida bloqueadas",
    "Vulneración de Perímetro",
  ],

  HUMANA: [
    "Ingreso personal no autorizado",
    "Pérdida/Robo de Credenciales",
    "Suplantación de Identidad",
  ],

  PROCEDIMIENTOS: [
    "Desactualización de Bajas",
    "Falta de Capacitación (Brigadas)",
    "Gestión Deficiente de Visitante",
    "No existe Brigadas de Evacuacion",
  ],

  TECNOLÓGICA: [
    "Falta de Detectores de Humo",
    "Falta de extintores",
    "Falta de Lectoras de control de accesos",
    "Falta de Molinetes peatonales de control de accesos",
    "Falta de Rociadores / Gabinetes",
    "Falta de Tranqueras Vehiculares de control de accesos",
    "Sistemas de Seguridad fuera de su vida Útil",
  ],
};
const riesgosDisponibles =
  riesgosPorCategoria[form.categoria] || [];
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-lg p-5 space-y-4">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="font-bold text-blue-600">
            Registrar Nuevo Riesgo
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {/* SEDE */}
          <select name="sedeId" onChange={handleChange} className="border p-2 rounded">
            <option value="">Sede</option>
            {sedes.map((s) => (
              <option key={s.id} value={s.id}>{s.nombre}</option>
            ))}
          </select>

          {/* PABELLON */}
          <select
            name="pabellonId"
            onChange={handleChange}
            disabled={!form.sedeId}
            className="border p-2 rounded"
            >
            <option value="">Pabellón</option>
            {pabellones.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>

          {/* PISO */}
          <select
            name="pisoId"
            onChange={handleChange}
            disabled={!form.pabellonId}
            className="border p-2 rounded"
            >
            <option value="">Piso</option>
            {pisos.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>

          {/* AMBIENTE */}
         <select
            name="ambienteId"
            onChange={handleChange}
            disabled={!form.pisoId}
            className="border p-2 rounded"
            >
            <option value="">Ambiente</option>
            {ambientes.map((a) => (
              <option key={a.id} value={a.id}>{a.nombre}</option>
            ))}
          </select>

          {/* CATEGORIA */}
          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">
              Seleccione categoría
            </option>

            <option value="FISICA">
              FÍSICA
            </option>

            <option value="HUMANA">
              HUMANA
            </option>

            <option value="PROCEDIMIENTOS">
              PROCEDIMIENTOS
            </option>

            <option value="TECNOLÓGICA">
              TECNOLÓGICA
            </option>

          </select>
          {/* RIESGO */}
          <select
            name="riesgo"
            value={form.riesgo}
            onChange={handleChange}
            disabled={!form.categoria}
            className="border p-2 rounded"
          >
            <option value="">
              Seleccione riesgo
            </option>

            {riesgosDisponibles.map((riesgo) => (
              <option
                key={riesgo}
                value={riesgo}
              >
                {riesgo}
              </option>
            ))}
          </select>

          {/* PROBABILIDAD */}
          <select name="probabilidad" onChange={handleChange} className="border p-2 rounded">
            <option value={1}>1 - POSIBLE</option>
            <option value={2}>2 - PROBABLE</option>
            <option value={3}>3 - CASI SEGURO</option>
          </select>

          {/* IMPACTO */}
          <select name="impacto" onChange={handleChange} className="border p-2 rounded">
            <option value={1}>1 - MENOR</option>
            <option value={2}>2 - MODERADO</option>
            <option value={3}>3 - GRAVE</option>
          </select>

          {/* NIVEL */}
          <div className="border p-2 rounded bg-green-100 font-bold text-center">
            Nivel: {getNivelTexto(nivel)} ({nivel})
          </div>

          {/* DESCRIPCIÓN */}
          <textarea
            name="descripcion"
            onChange={handleChange}
            placeholder="Descripción"
            className="border p-2 rounded md:col-span-2"
          />
          {/* EVIDENCIA */}
            <div className="md:col-span-2">
            <label className="block mb-1 font-medium">
                Evidencia (Foto)
            </label>

            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagen(e.target.files[0])}
                className="border p-2 rounded w-full"
            />
            </div>
        </div>

        {/* BOTONES */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancelar
          </button>

          <button
            onClick={guardar}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}