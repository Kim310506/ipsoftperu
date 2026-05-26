import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../../api/axios";
import {
  PlusCircle,
  Trash2,
  Building2,
  User,
  Mail,
  IdCard
} from "lucide-react";

export default function RegistroExterno() {

  const { codigo } = useParams();

  const [visitantes, setVisitantes] = useState([]);

  const [dni, setDni] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");

  const [loading, setLoading] = useState(false);

  /* ========================= */
  /* AGREGAR VISITANTE */
  /* ========================= */

  const agregarVisitante = () => {

    if (
      !dni ||
      !nombres ||
      !apellidoPaterno
    ) {
      alert("Complete los campos");
      return;
    }

    const nuevo = {
      id: Date.now(),
      dni,
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      email,
      empresa,
    };

    setVisitantes([
      ...visitantes,
      nuevo
    ]);

    setDni("");
    setNombres("");
    setApellidoPaterno("");
    setApellidoMaterno("");
    setEmail("");
    setEmpresa("");
  };

  /* ========================= */
  /* REGISTRAR */
  /* ========================= */

  const registrar = async () => {

    try {

      if (visitantes.length === 0) {
        alert("Agregue visitantes");
        return;
      }

      setLoading(true);

      await api.post(
        `/visitas/registro-externo/${codigo}`,
        {
          visitantes
        }
      );

      alert("Visitantes registrados");

      setVisitantes([]);

    } catch (error) {

      console.log(error);

      alert("Error al registrar");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-[#1E55C0] text-white px-8 py-6">

          <h1 className="text-3xl font-black">
            Registro de Visitantes
          </h1>

          <p className="text-sm opacity-80 mt-2">
            Código de visita: {codigo}
          </p>

        </div>

        {/* BODY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">

          {/* FORM */}
          <div>

            <h2 className="text-2xl font-black text-[#1E55C0] mb-6">
              Datos del Visitante
            </h2>

            <div className="space-y-5">

              <div>
                <label className="block font-bold mb-2">
                  DNI
                </label>

                <div className="flex items-center border rounded-xl px-4 py-3">

                  <IdCard size={18} />

                  <input
                    type="number"
                    value={dni}
                    onChange={(e) =>
                      setDni(e.target.value)
                    }
                    className="w-full outline-none ml-3"
                    placeholder="Ingrese DNI"
                  />

                </div>
              </div>

              <div>
                <label className="block font-bold mb-2">
                  Nombres
                </label>

                <div className="flex items-center border rounded-xl px-4 py-3">

                  <User size={18} />

                  <input
                    type="text"
                    value={nombres}
                    onChange={(e) =>
                      setNombres(e.target.value)
                    }
                    className="w-full outline-none ml-3"
                    placeholder="Ingrese nombres"
                  />

                </div>
              </div>

              <div>
                <label className="block font-bold mb-2">
                  Apellido Paterno
                </label>

                <input
                  type="text"
                  value={apellidoPaterno}
                  onChange={(e) =>
                    setApellidoPaterno(e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">
                  Apellido Materno
                </label>

                <input
                  type="text"
                  value={apellidoMaterno}
                  onChange={(e) =>
                    setApellidoMaterno(e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">
                  Email
                </label>

                <div className="flex items-center border rounded-xl px-4 py-3">

                  <Mail size={18} />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="w-full outline-none ml-3"
                    placeholder="correo@gmail.com"
                  />

                </div>
              </div>

              <div>
                <label className="block font-bold mb-2">
                  Empresa
                </label>

                <div className="flex items-center border rounded-xl px-4 py-3">

                  <Building2 size={18} />

                  <input
                    type="text"
                    value={empresa}
                    onChange={(e) =>
                      setEmpresa(e.target.value)
                    }
                    className="w-full outline-none ml-3"
                    placeholder="Empresa"
                  />

                </div>
              </div>

              <button
                onClick={agregarVisitante}
                className="w-full bg-green-600 hover:bg-green-700 transition text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2"
              >

                <PlusCircle size={20} />

                Agregar Visitante

              </button>

            </div>

          </div>

          {/* TABLA */}
          <div>

            <h2 className="text-2xl font-black text-[#1E55C0] mb-6">
              Lista de Visitantes
            </h2>

            <div className="border rounded-2xl overflow-hidden">

              <table className="w-full">

                <thead className="bg-[#1E55C0] text-white">

                  <tr>

                    <th className="px-4 py-3 text-left">
                      DNI
                    </th>

                    <th className="px-4 py-3 text-left">
                      Nombres
                    </th>

                    <th className="px-4 py-3 text-left">
                      Email
                    </th>

                    <th className="px-4 py-3 text-center">
                      Acción
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {visitantes.map((v) => (

                    <tr
                      key={v.id}
                      className="border-b"
                    >

                      <td className="px-4 py-4">
                        {v.dni}
                      </td>

                      <td className="px-4 py-4">
                        {v.nombres}
                      </td>

                      <td className="px-4 py-4">
                        {v.email}
                      </td>

                      <td className="px-4 py-4 text-center">

                        <button
                          onClick={() =>
                            setVisitantes(
                              visitantes.filter(
                                (item) =>
                                  item.id !== v.id
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

            <button
              onClick={registrar}
              disabled={loading}
              className="w-full mt-6 bg-[#1E55C0] hover:bg-[#1947a3] transition text-white py-4 rounded-2xl font-black"
            >

              {loading
                ? "Registrando..."
                : "Finalizar Registro"}

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}
