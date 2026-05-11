import Swal from "sweetalert2";

export default function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "¡Enviado!",
      text: "Correo enviado satisfactoriamente",
    });
  };

  return (
    <section className="w-full bg-[#3d47db] text-white py-14 px-6">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16">

        {/* IZQUIERDA */}
        <div className="flex flex-col justify-start">

          <h2 className="text-3xl font-bold mb-12">
            Contáctanos
          </h2>

          <div className="mb-12">
            <p className="text-sm mb-2 font-light">
              Central telefónica
            </p>

            <h3 className="text-3xl font-extrabold tracking-tight">
              (01) 317-1000
            </h3>
          </div>

          <div>
            <p className="text-sm mb-2 font-light">
              Central admisión
            </p>

            <h3 className="text-3xl font-extrabold leading-tight tracking-tight">
              (01) 317 - 1050 USIL
            </h3>

            <p className="text-2xl font-bold mt-2">
              anexo: opción 1
            </p>
          </div>

        </div>

        {/* DERECHA */}
        <div>

          <h2 className="text-3xl font-bold uppercase mb-10">
            Contáctenos
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-bold uppercase mb-2">
                Nombres
              </label>

              <input
                type="text"
                className="w-full h-12 bg-[#e5e5e5] text-black px-4 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase mb-2">
                Apellidos
              </label>

              <input
                type="text"
                className="w-full h-12 bg-[#e5e5e5] text-black px-4 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase mb-2">
                Email
              </label>

              <input
                type="email"
                className="w-full h-12 bg-[#e5e5e5] text-black px-4 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase mb-2">
                Celular
              </label>

              <input
                type="text"
                className="w-full h-12 bg-[#e5e5e5] text-black px-4 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase mb-2">
                Mensaje
              </label>

              <textarea
                rows="5"
                className="w-full bg-[#e5e5e5] text-black px-4 py-3 rounded-sm outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="border border-white px-10 py-3 uppercase font-bold hover:bg-white hover:text-[#3d47db] transition-all duration-300"
            >
              Enviar
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}