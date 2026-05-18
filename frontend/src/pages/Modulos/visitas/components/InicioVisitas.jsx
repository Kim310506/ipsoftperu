// src/pages/modulos/visitas/components/InicioVisitas.jsx

export default function InicioVisitas({ usuario }) {
  return (
    <div>
      <h1 className="text-4xl font-black text-[#244db7] mb-3">
        Panel de Control
      </h1>

      <p className="text-gray-500 mb-10">
        Bienvenido {usuario}
      </p>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-8 shadow">
          <h3 className="text-xl font-bold text-blue-600">
            Pendientes
          </h3>

          <p className="text-5xl font-black mt-4">
            2
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow">
          <h3 className="text-xl font-bold text-green-600">
            Aprobados
          </h3>

          <p className="text-5xl font-black mt-4">
            21
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow">
          <h3 className="text-xl font-bold text-purple-600">
            Visitas
          </h3>

          <p className="text-5xl font-black mt-4">
            24
          </p>
        </div>
      </div>
    </div>
  );
}