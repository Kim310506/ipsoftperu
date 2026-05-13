import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaArrowLeft
} from "react-icons/fa6";

import { users } from "../data/users";

export default function LoginAdmin() {

  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = (e) => {

    e.preventDefault();

    const usuarioValido = users.find(
      (user) =>
        user.correo === correo &&
        user.password === password
    );

    if (usuarioValido) {

      localStorage.setItem(
        "usuario",
        JSON.stringify(usuarioValido)
      );

      navigate("/dashboard");

    } else {

      alert("Credenciales incorrectas");

    }

  };

  return (

    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10 relative">

        {/* BOTÓN REGRESAR */}
        <button
          onClick={() => navigate("/")}
          className="
            absolute
            top-6
            left-6
            text-[#2833a8]
            hover:text-[#1f2887]
            transition-all
            text-xl
          "
        >
          <FaArrowLeft />
        </button>

        <div className="flex justify-center mb-6">
          <img
            src="/iconos/logoUSIL.png"
            alt=""
            className="h-20"
          />
        </div>

        <h1 className="text-3xl font-black text-center text-[#2833a8] mb-2">
          ADMINISTRACIÓN
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Iniciar sesión
        </p>

        <form onSubmit={iniciarSesion} className="space-y-5">

          <div>
            <label className="text-sm font-semibold text-gray-600">
              Correo
            </label>

            <div className="flex items-center border rounded-xl px-4 mt-2">
              <FaUser className="text-gray-400" />

              <input
                type="email"
                placeholder="Ingrese su correo"
                className="w-full p-4 outline-none"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">
              Contraseña
            </label>

            <div className="flex items-center border rounded-xl px-4 mt-2">
              <FaLock className="text-gray-400" />

              <input
                type="password"
                placeholder="Ingrese su contraseña"
                className="w-full p-4 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="
              w-full
              bg-[#2833a8]
              hover:bg-[#1f2887]
              text-white
              py-4
              rounded-xl
              font-bold
              transition-all
            "
          >
            INGRESAR
          </button>

        </form>
      </div>
    </div>

  );
}