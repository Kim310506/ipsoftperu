export default function Card({ titulo, icon, link }) {
  return (
    <a
      href={link}
      className="
        group
        flex flex-col justify-between items-center
        h-full min-h-[160px] md:min-h-[180px]
        p-4 md:p-6
        border-2 border-[#3a48da]
        rounded-xl
        bg-white
        hover:-translate-y-1
        transition-all duration-200
        shadow-sm hover:shadow-lg
      "
    >
      
      <div className="flex-grow flex flex-col justify-center items-center w-full">
        
        <div className="
          text-[#3a48da]
          mb-3 md:mb-4
          group-hover:scale-110
          transition-transform duration-200
        ">
          {icon}
        </div>

        <h3 className="
          text-[#3a48da]
          font-bold
          text-[13px] md:text-sm
          text-center
          leading-tight
        ">
          {titulo}
        </h3>

      </div>

      <div className="
        mt-4
        px-4 py-2
        w-[90%] md:w-auto
        text-center
        rounded-full
        bg-[#3a48da]
        text-white
        text-[9px] md:text-[10px]
        font-bold
        group-hover:bg-[#263398]
        transition-colors
        uppercase
        tracking-wide
      ">
        Ir a la Aplicación
      </div>

    </a>
  )
}