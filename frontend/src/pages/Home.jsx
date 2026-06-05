import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import WhatsappButton from '../components/layout/WhatsappButton'
import ContactForm from '../components/forms/ContactForm'
import Card from '../components/cards/Card'

import {
  AlertCircle,
  AlertTriangle,
  BoxesIcon,
  Flame,
  Wrench,
  Shield,
  Users,
  Building2
} from 'lucide-react'

<<<<<<< HEAD
  const modulos = [
    { id: 1, titulo: "Acceso de Visitas", icon: <Users size={36} />, link: "/visitas/login" },
    { id: 2, titulo: "Acceso de Proveedores", icon: <Building2 size={36} />, link: "/proveedores/login" },
    { id: 3, titulo: "Gestión de Incidentes", icon: <AlertTriangle size={36} />, link: "/incidentes/login" },
    { id: 4, titulo: "Gestión de Inventarios", icon: <BoxesIcon size={36} />, link: "/inventario/login" },
    { id: 5, titulo: "Control de Extintores", icon: <Flame size={36} />, link: "/extintor/login" },
    { id: 6, titulo: "Gestión de Mantenimiento", icon: <Wrench size={36} />, link: "/mantenimiento/login" },
    { id: 7, titulo: "Gestión de Riesgo", icon: <Shield size={36} />, link: "/riesgos/login" },
    { id: 8, titulo: "Gestión de Sismo", icon: <AlertCircle size={36} />, link: "/sismos/login" },
  ];
=======
const modulos = [
  { id: 1, titulo: "Acceso de Visitas", icon: <Users size={36} />, link: "/visitas/login" },
  { id: 2, titulo: "Acceso de Proveedores", icon: <Building2 size={36} />, link: "/proveedores/login" },
  { id: 3, titulo: "Gestión de Incidentes", icon: <AlertTriangle size={36} />, link: "/incidentes/login" },
  { id: 4, titulo: "Gestión de Inventarios", icon: <BoxesIcon size={36} />, link: "/inventario/login" },
  { id: 5, titulo: "Control de Extintores", icon: <Flame size={36} />, link: "/extintor/login" },
  { id: 6, titulo: "Gestión de Mantenimiento", icon: <Wrench size={36} />, link: "/mantenimiento/login" },
  { id: 7, titulo: "Gestión de Riesgo", icon: <Shield size={36} />, link: "/riesgo/login" },
  { id: 8, titulo: "Gestión de Sismo", icon: <AlertCircle size={36} />, link: "/sismos/login" },
];
>>>>>>> 81a1038f3310bf11d8b293492b527ea5f64966a8

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col overflow-x-hidden relative">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main className="flex-grow flex flex-col justify-center items-center py-10 md:py-14 px-4">

        {/* LOGO Y TITULO */}
        <div className="text-center mb-10 md:mb-14">
          
          <div className="flex justify-center mb-6">
            <img 
              src="/logo-upn.png" 
              alt="Logo Universidad Privada del Norte" 
              className="h-20 md:h-24 object-contain"
            />
          </div>

          <h1
            className="
              text-[#000000] 
              text-5xl
              md:text-7xl
              font-black
              tracking-tight
              mb-3
            "
          >
            iCURA
          </h1>

          <h2
            className="
              text-[#F5B300] 
              text-sm
              md:text-xl
              font-black
              uppercase
              tracking-widest
            "
          >
            Sistema de Gestión de Seguridad Integral
          </h2>

        </div>

        {/* CARDS */}
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-4
            md:gap-6
            max-w-[1200px]
            w-full
          "
        >
          {modulos.map((card) => (
            <Card
              key={card.id}
              titulo={card.titulo}
              icon={card.icon}
              link={card.link}
            />
          ))}
        </div>

      </main>

      {/* CONTACTO */}
      <ContactForm />

      {/* FOOTER */}
      <Footer />

      {/* WHATSAPP */}
      <WhatsappButton />

      {/* BOTON BRIGADISTA (Estilo Botones UPN) */}
      <a
        href="#"
        className="
          hidden md:flex fixed bottom-6 left-0 z-50
          items-center gap-3
          bg-[#F5B300] 
          text-[#000000] 
          py-3 px-6
          rounded-r-2xl
          shadow-xl
          hover:bg-[#dca100]
          transition-all duration-300
          group
          border-y border-r border-black/10
        "
      >
        <AlertCircle
          size={30}
          className="group-hover:scale-110 transition-transform text-[#000000]"
        />

        <div className="flex flex-col leading-tight">
          <span className="text-[10px] font-bold uppercase tracking-widest text-black/70">
            Quiero ser
          </span>

          <span className="text-sm font-black uppercase">
            Brigadista
          </span>
        </div>
      </a>

    </div>
  )
}