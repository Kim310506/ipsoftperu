export default function Card({ titulo, imagen, link }) {
  return (
    <a
      href={link}
      target="_blank"
      className="group flex flex-col justify-between items-center h-44 p-3 border-4 border-blue-700 rounded-xl bg-white hover:-translate-y-1 transition-all duration-200 shadow-sm hover:shadow-lg"
    >
      <div className="flex-grow flex flex-col justify-center items-center">
        <img
          src={imagen}
          alt={titulo}
          className="h-12 w-auto mb-2 object-contain"
        />

        <h3 className="text-blue-700 font-bold text-xs text-center leading-tight px-1">
          {titulo}
        </h3>
      </div>

      <div className="mt-2 px-4 py-1.5 rounded-full bg-blue-700 text-white text-[10px] font-bold">
        Ir a la Aplicación
      </div>
    </a>
  )
}