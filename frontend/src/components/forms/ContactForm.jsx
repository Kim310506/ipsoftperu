import Swal from "sweetalert2";

export default function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "¡Enviado!",
      text: "Correo enviado satisfactoriamente",
      confirmButtonColor: "#000000",
    });
  };

  return (
    <section className="w-full bg-[#F5B300] text-[#000000] py-14 px-6 border-t-2 border-black/10">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16">

        {/* IZQUIERDA */}
        <div className="flex flex-col justify-start">

          <h2 className="text-4xl font-black mb-12 uppercase tracking-tight">
            Contáctanos
          </h2>

          <div className="mb-12">
            <p className="text-sm mb-2 font-bold uppercase tracking-widest text-black/70">
              Central Telefónica
            </p>

            <h3 className="text-4xl font-black tracking-tight">
              (01) 614-3311
            </h3>
          </div>

          <div>
            <p className="text-sm mb-2 font-bold uppercase tracking-widest text-black/70">
              Línea Gratuita
            </p>

            <h3 className="text-4xl font-black leading-tight tracking-tight">
              0800 - 00021
            </h3>

            <p className="text-xl font-bold mt-2">
              Opción 1: Lima
            </p>
          </div>

        </div>

        {/* DERECHA */}
        <div className="bg-white/10 p-8 rounded-3xl border border-black/5 shadow-xl backdrop-blur-sm">

          <h2 className="text-2xl font-black uppercase mb-8 border-b-2 border-black/10 pb-4">
            Envíanos un mensaje
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                  Nombres
                </label>
                <input
                  type="text"
                  required
                  className="w-full h-12 bg-white border border-black/10 text-black px-4 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                  Apellidos
                </label>
                <input
                  type="text"
                  required
                  className="w-full h-12 bg-white border border-black/10 text-black px-4 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full h-12 bg-white border border-black/10 text-black px-4 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                  Celular
                </label>
                <input
                  type="text"
                  required
                  className="w-full h-12 bg-white border border-black/10 text-black px-4 rounded-xl outline-none focus:ring-2 focus:ring-black transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Mensaje
              </label>
              <textarea
                rows="4"
                required
                className="w-full bg-white border border-black/10 text-black px-4 py-3 rounded-xl outline-none resize-none focus:ring-2 focus:ring-black transition-all"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#000000] text-[#F5B300] px-10 py-4 rounded-xl uppercase font-black tracking-widest hover:bg-gray-900 active:scale-95 transition-all duration-300 shadow-xl"
            >
              Enviar Mensaje
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}