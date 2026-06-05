import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaLocationDot,
  FaEnvelope,
  FaClock,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000] text-white pt-10 pb-8 border-t-4 border-[#F5B300]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-8">

          {/* LOGO */}
          <div className="bg-white px-6 py-4 rounded-xl">
            <img
              src="/logo-upn.png"
              alt="Logo UPN"
              className="h-[50px] object-contain"
            />
          </div>

          {/* INFORMACIÓN */}
          <div className="flex flex-col gap-4 text-sm md:text-base text-gray-300">

            <div className="flex items-center gap-3">
              <FaLocationDot className="text-[#F5B300] text-xl" />
              <span>Sede Principal: Av. Alfredo Mendiola 6062, Los Olivos.</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#F5B300] text-xl" />

              <a
                href="mailto:atencionalumno@upn.edu.pe"
                className="hover:text-[#F5B300] transition-colors"
              >
                atencionalumno@upn.edu.pe
              </a>
            </div>

            <div className="flex items-center gap-3">
              <FaClock className="text-[#F5B300] text-xl" />

              <span>
                Lunes a viernes de 9:00 a.m. a 9:00 p.m.
              </span>
            </div>

          </div>
        </div>

        <hr className="border-white/10 mb-6" />

        {/* COPYRIGHT + REDES */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="text-white/60 text-sm font-medium">
            Copyright 2026 - Universidad Privada del Norte
          </div>

          <div className="flex gap-5 text-xl">

            <a href="#" className="text-white/70 hover:text-[#F5B300] transition-transform hover:scale-110">
              <FaLinkedinIn />
            </a>

            <a href="#" className="text-white/70 hover:text-[#F5B300] transition-transform hover:scale-110">
              <FaInstagram />
            </a>

            <a href="#" className="text-white/70 hover:text-[#F5B300] transition-transform hover:scale-110">
              <FaFacebookF />
            </a>

            <a href="#" className="text-white/70 hover:text-[#F5B300] transition-transform hover:scale-110">
              <FaTwitter />
            </a>

            <a href="#" className="text-white/70 hover:text-[#F5B300] transition-transform hover:scale-110">
              <FaYoutube />
            </a>

            <a href="#" className="text-white/70 hover:text-[#F5B300] transition-transform hover:scale-110">
              <FaTiktok />
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}