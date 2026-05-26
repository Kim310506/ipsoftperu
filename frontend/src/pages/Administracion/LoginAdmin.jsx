import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaLock,
  FaArrowLeft,
  FaShieldHalved
} from "react-icons/fa6";

export default function LoginAdmin() {

  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  /* ========================= */
  /* LOGIN */
  /* ========================= */

  const iniciarSesion = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);

    try {

      const response = await fetch(

        `${import.meta.env.VITE_API_URL}/api/auth/login`,

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            correo,

            password,
              modulo: "ADMIN"


          })

        }

      );

      const data = await response.json();

      /* ERROR */

      if (!response.ok) {

        setError(data.message);

        setLoading(false);

        return;

      }

      /* GUARDAR SESION */

      localStorage.setItem(
        "usuario",
        JSON.stringify(data)
      );

      /* REDIRECCION */

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      setError("Error del servidor");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#6b7280] to-[#4b5563] flex items-center justify-center p-4">

      <div className="bg-white rounded-[30px] shadow-2xl w-full max-w-md p-8 relative overflow-hidden">

        {/* BOTÓN VOLVER */}
        <button
          onClick={() => navigate("/")}
          className="
            absolute
            top-6
            left-6
            text-[#6b7280]
            hover:text-[#4b5563]
            transition-all
            text-xl
          "
        >

          <FaArrowLeft />

        </button>

        {/* HEADER */}
        <div className="flex flex-col items-center mb-8">

          <div className="bg-[#6b7280] p-5 rounded-full mb-5 shadow-lg">

            <FaShieldHalved className="text-white text-4xl" />

          </div>

          <h1 className="text-3xl font-black text-[#6b7280] text-center">

            ADMINISTRACIÓN

          </h1>

          <p className="text-gray-500 text-sm mt-2 text-center">

            Ingresa tus credenciales

          </p>

        </div>

        {/* FORMULARIO */}
        <form
          onSubmit={iniciarSesion}
          className="space-y-5"
        >

          {/* ERROR */}
          {error && (

            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-2xl text-sm font-semibold">

              {error}

            </div>

          )}

          {/* CORREO */}
          <div>

            <label className="block text-sm font-bold text-gray-700 mb-2">

              Correo Electrónico

            </label>

            <div className="flex items-center border-2 border-gray-300 rounded-2xl px-4 py-2 focus-within:border-[#6b7280] transition-all">

              <FaUser className="text-gray-400 text-lg" />

              <input
                type="email"
                placeholder="admin@ips.com"
                className="w-full pl-3 py-2 outline-none bg-transparent"
                value={correo}
                onChange={(e) =>
                  setCorreo(e.target.value)
                }
                required
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div>

            <label className="block text-sm font-bold text-gray-700 mb-2">

              Contraseña

            </label>

            <div className="flex items-center border-2 border-gray-300 rounded-2xl px-4 py-2 focus-within:border-[#6b7280] transition-all">

              <FaLock className="text-gray-400 text-lg" />

              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-3 py-2 outline-none bg-transparent"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>

          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-[#6b7280]
              hover:bg-[#4b5563]
              text-white
              font-black
              py-4
              rounded-2xl
              transition-all
              hover:scale-[1.02]
              shadow-lg
              mt-4
              disabled:opacity-60
            "
          >

            {loading
              ? "INGRESANDO..."
              : "INGRESAR"}

          </button>

        </form>

      </div>

    </div>

  );

}
