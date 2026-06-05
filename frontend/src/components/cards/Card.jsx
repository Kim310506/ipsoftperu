export default function Card({ titulo, icon, link }) {
  return (
    <a
      href={link}
      className="
        group
        flex flex-col justify-between items-center
        h-full min-h-[160px] md:min-h-[180px]
        p-4 md:p-6
        border-2 border-gray-200
        rounded-xl
        bg-white
        hover:-translate-y-1
        hover:border-[#F5B300]
        transition-all duration-300
        shadow-sm hover:shadow-xl
      "
    >
      
      <div className="flex-grow flex flex-col justify-center items-center w-full">
        
        <div className="
          text-[#000000]
          mb-3 md:mb-4
          group-hover:scale-110
          group-hover:text-[#F5B300]
          transition-all duration-300
        ">
          {icon}
        </div>

        <h3 className="
          text-[#000000]
          font-black
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
        bg-[#000000]
        text-[#F5B300]
        text-[9px] md:text-[10px]
        font-black
        group-hover:bg-[#F5B300]
        group-hover:text-[#000000]
        transition-colors duration-300
        uppercase
        tracking-widest
      ">
        Ir a la Aplicación
      </div>

    </a>
  )
}