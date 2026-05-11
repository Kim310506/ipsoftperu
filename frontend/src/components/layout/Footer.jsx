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
    <footer className="w-full bg-[#3d47db] text-white pt-8 pb-8 border-t border-white/20">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-8">

          {/* LOGO */}
          <div>
            <img
              src="/iconos/logoUSIL.png"
              alt="Logo USIL"
              className="h-[60px]"
            />
          </div>

          {/* INFORMACIÓN */}
          <div className="flex flex-col gap-4 text-sm md:text-base">

            <div className="flex items-center gap-2">
              <FaLocationDot />
              <span>Sede La Molina: av. La Fontana 550.</span>
            </div>

            <div className="flex items-center gap-2">
              <FaEnvelope />

              <a
                href="mailto:atencionalumno@usil.edu.pe"
                className="hover:underline"
              >
                atencionalumno@usil.edu.pe
              </a>
            </div>

            <div className="flex items-center gap-2">
              <FaClock />

              <span>
                Lunes a viernes de 9:00 a.m. a 9:00 p.m.
              </span>
            </div>

          </div>
        </div>

        <hr className="border-white/20 mb-6" />

        {/* COPYRIGHT + REDES */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          <div className="text-white/80 text-sm">
            Copyright 2026 - Universidad San Ignacio de Loyola
          </div>

          <div className="flex gap-4 text-xl">

            <a href="#">
              <FaLinkedinIn />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

            <a href="#">
              <FaYoutube />
            </a>

            <a href="#">
              <FaTiktok />
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}