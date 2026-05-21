import api from "../../../../api/axios"; 

import {
  FaXmark,
  FaTrash
} from "react-icons/fa6";

export default function ModalEliminarUsuario({
  openDeleteModal,
  setOpenDeleteModal,
  usuarioSeleccionado,
  users,
  setUsers,
  obtenerUsuarios
}) {

  const eliminarUsuario = async () => {

    try {

      await api.delete(
        `/users/${usuarioSeleccionado.id}`
      );
      await obtenerUsuarios();
      setUsers((prev) =>
        prev.filter(
          (user) => user.id !== usuarioSeleccionado.id
        )
      );

      setOpenDeleteModal(false);

      alert("Usuario eliminado");

    } catch (error) {

      console.log(error);

      alert("Error al eliminar");

    }

  };

  if (!openDeleteModal) return null;

  return (

    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-5">

      <div className="bg-white w-full max-w-md rounded-[35px] p-10 shadow-2xl text-center relative">

        {/* CERRAR */}
        <button
          onClick={() => setOpenDeleteModal(false)}
          className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-black"
        >
          <FaXmark />
        </button>

        {/* ICONO */}
        <div className="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-8">

          <FaTrash className="text-4xl text-red-500" />

        </div>

        {/* TEXTO */}
        <h1 className="text-3xl font-black text-[#132238] mb-4">
          ELIMINAR USUARIO
        </h1>

        <p className="text-gray-500 font-semibold leading-relaxed">
          ¿Deseas eliminar a
          <span className="font-black text-[#132238]">
            {" "} {usuarioSeleccionado?.nombre}
          </span>?
        </p>

        {/* BOTONES */}
        <div className="grid grid-cols-2 gap-4 mt-10">

          <button
            onClick={() => setOpenDeleteModal(false)}
            className="
              bg-gray-100
              hover:bg-gray-200
              py-4
              rounded-2xl
              font-black
              transition-all
            "
          >
            CANCELAR
          </button>

          <button
            onClick={eliminarUsuario}
            className="
              bg-red-500
              hover:bg-red-600
              text-white
              py-4
              rounded-2xl
              font-black
              transition-all
            "
          >
            ELIMINAR
          </button>

        </div>

      </div>

    </div>

  );
}
