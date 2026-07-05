// src/pages/modulos/asistencia/components/UsuariosBiometria.jsx
import api from "../../../../api/axios";
import * as faceapi from "face-api.js";
import { useState, useEffect } from "react";
import {
  Search,
  ScanFace,
  Camera,
  User,
  Save,
} from "lucide-react";

export default function UsuariosBiometria() {
const [modelosListos, setModelosListos] = useState(false);
const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
const [usuarios, setUsuarios] = useState([]);
const [busqueda, setBusqueda] = useState("");
const buscarUsuarios = async () => {
  const res = await api.get("http://localhost:3000/users");

  const filtrados = res.data.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  setUsuarios(filtrados);
};
const seleccionarUsuario = async (user) => {
  setUsuarioSeleccionado(user);

  const res = await api.get(`/asistencia/biometria/${user.id}`);

  console.log(res.data);
};
useEffect(() => {
  const loadModels = async () => {
    try {
      console.log("🔄 Iniciando carga de modelos...");

      const MODEL_URL = "/models";

      console.log("📦 cargando tinyFaceDetector...");
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);

      console.log("📦 cargando landmarks...");
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);

      console.log("📦 cargando recognition...");
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

      console.log("✔ TODOS LOS MODELOS CARGADOS");

      setModelosListos(true);

    } catch (err) {
      console.error("❌ ERROR MODELOS:", err);
    }
  };

  loadModels();
}, []);
const activarCamara = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });

  const video = document.getElementById("videoCamara");

  video.srcObject = stream;

  await new Promise((resolve) => {
    video.onloadedmetadata = () => {
      video.play().then(resolve).catch(resolve);
    };
  });

  console.log("✔ Cámara lista");
};
const guardarBiometria = async () => {
    if (!modelosListos) {
    alert("Espera, modelos aún cargando...");
    return;
  }
  if (!usuarioSeleccionado) return;

  const video = document.getElementById("videoCamara");

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  canvas.toBlob(async (blob) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await new Promise(r => setTimeout(r, 500));
    console.log(video.videoWidth, video.videoHeight);
    const detections = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();
    if (!detections) {
      alert("No se detectó rostro");
      return;
    }

    const descriptor = Array.from(detections.descriptor);

    const formData = new FormData();
    formData.append("userId", usuarioSeleccionado.id);
    formData.append("descriptor", JSON.stringify(descriptor));

    if (blob) {
      formData.append("fotoPerfil", blob, "biometria.jpg");
    }

    await api.post("/asistencia/biometria", formData);

    alert("Biometría guardada correctamente");
  }, "image/jpeg");
};

  return (

    <div className="space-y-8">

      {/* TÍTULO */}

      <div>

        <h1 className="text-3xl font-black text-gray-800">

          Registro Biométrico

        </h1>

        <p className="text-gray-500 mt-2">

          Registra o actualiza el reconocimiento facial de los trabajadores.

        </p>

      </div>

      {/* BUSCADOR */}

      <div className="bg-white rounded-3xl shadow p-6">

        <div className="flex gap-4">

          <input  
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            type="text"
            placeholder="Buscar empleado..."
            className="
            flex-1
            border
            rounded-xl
            p-3
            outline-none
            "
          />
          <button
            className="
            bg-[#244db7]
            text-white
            rounded-xl
            px-6
            flex
            items-center
            gap-2
            "
            onClick={buscarUsuarios}
          >
            <Search size={18}/>

            Buscar

          </button>

        </div>
<div className="bg-white rounded-2xl shadow p-4 mt-4">
  {usuarios.length === 0 ? (
    <p className="text-gray-400">No hay usuarios</p>
  ) : (
    usuarios.map((u) => (
      <div
        key={u.id}
        onClick={() => seleccionarUsuario(u)}
        className="p-3 border-b cursor-pointer hover:bg-gray-100"
      >
        {u.nombre} - {u.correo}
      </div>
    ))
  )}
</div>
      </div>

      {/* INFORMACIÓN */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* DATOS */}

        <div className="bg-white rounded-3xl shadow p-6">

          <div className="flex items-center gap-4">

            <User
              size={55}
              className="text-[#244db7]"
            />

            <div>

              <h2 className="text-xl font-bold">

                Sin empleado seleccionado

              </h2>

              <p className="text-gray-500">

                Seleccione un trabajador.

              </p>

            </div>

          </div>

        </div>

        {/* ESTADO */}

        <div className="bg-white rounded-3xl shadow p-6">

          <div className="flex items-center gap-4">

            <ScanFace
              size={55}
              className="text-green-600"
            />

            <div>

              <h2 className="text-xl font-bold">

                Biometría

              </h2>

              <p className="text-gray-500">

                Sin registrar.

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* CÁMARA */}

      <div className="bg-white rounded-3xl shadow p-6">

        <h2 className="text-xl font-bold mb-5">

          Cámara

        </h2>

        <div
          className="
          h-[420px]
          rounded-2xl
          bg-gray-100
          border-2
          border-dashed
          flex
          items-center
          justify-center
          "
        >

          <video id="videoCamara" className="w-full h-full" />

        </div>

      </div>

      {/* BOTONES */}

      <div className="flex justify-center gap-4">

        <button
          className="
          bg-[#244db7]
          text-white
          px-8
          py-4
          rounded-2xl
          flex
          items-center
          gap-3
          "
              onClick={activarCamara}

        >

          <Camera/>

          Activar cámara

        </button>

        <button
          className="
          bg-green-600
          text-white
          px-8
          py-4
          rounded-2xl
          flex
          items-center
          gap-3
          "
          onClick={guardarBiometria}
        >
          <Save/>

          Guardar biometría

        </button>

      </div>

    </div>

  );

}