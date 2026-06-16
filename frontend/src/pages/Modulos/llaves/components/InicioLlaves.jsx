import { useEffect, useState } from "react";
import api from "../../../../api/axios";

import ModalRegistro from "./Modals/ModalRegistro";

export default function InicioLlaveros() {

  const [llaves, setLlaves] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [showModal,
    setShowModal] =
    useState(false);

  useEffect(() => {
    cargarLlaves();
  }, []);

  const cargarLlaves =
    async () => {

      try {

        const { data } =
          await api.get(
            "/llaves"
          );

        setLlaves(data);

      } catch (error) {

        console.error(
          error
        );

      }

    };

  const abrirModal = () => {
    setShowModal(true);
  };

  const llavesFiltradas =
    llaves.filter(
      (item) =>
        item.codigo
          ?.toLowerCase()
          .includes(
            search
            .toLowerCase()
          )
    );

  return (

    <div className="p-4 bg-gray-100 min-h-screen">

      {/* TITULO */}
      <div className="mb-4">

        <h1
          className="
          text-2xl
          font-bold
          text-blue-700
          flex
          items-center
          gap-2"
        >

          🔑 Administrar Llaves

        </h1>

      </div>

      {/* PANEL */}
      <div
        className="
        bg-white
        rounded-xl
        shadow
        overflow-hidden"
      >

        {/* HEADER */}
        <div
          className="
          flex
          justify-between
          items-center
          px-5
          py-4
          border-b"
        >

          <h2 className="font-semibold text-blue-700">
            Llaves Registradas
          </h2>

          <button
            onClick={abrirModal}
            className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded"
          >
            Agregar Llave
          </button>

        </div>

        {/* BUSCADOR */}
        <div className="p-4 flex justify-end">

          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
            className="
            w-64
            border
            rounded
            px-3
            py-2"
          />

        </div>

        {/* TABLA */}
        <div
          className="
          px-4
          pb-4
          overflow-x-auto"
        >

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">
                  LLAVERO
                </th>

                <th className="py-3 text-left">
                  SEDE
                </th>

                <th className="py-3 text-left">
                  PABELLÓN
                </th>

                <th className="py-3 text-left">
                  PISO
                </th>

                <th className="py-3 text-left">
                  AMBIENTE
                </th>

                <th className="py-3 text-left">
                  LLAVE
                </th>

                <th className="py-3 text-center">
                  ESTADO
                </th>

              </tr>

            </thead>

            <tbody>

              {llavesFiltradas.map(
                (item) => (

                <tr
                  key={item.id}
                  className="
                  border-b
                  hover:bg-gray-50"
                >

                  <td>
                    {
                      item.llavero
                        ?.codigo
                    }
                  </td>

                  <td>
                    {
                      item.ambiente
                      ?.piso
                      ?.pabellon
                      ?.sede
                      ?.nombre
                    }
                  </td>

                  <td>
                    {
                      item.ambiente
                      ?.piso
                      ?.pabellon
                      ?.nombre
                    }
                  </td>

                  <td>
                    {
                      item.ambiente
                      ?.piso
                      ?.nombre
                    }
                  </td>

                  <td>
                    {
                      item.ambiente
                      ?.nombre
                    }
                  </td>

                  <td>

                    <span className="text-blue-600">

                      {
                        item.codigo
                      }

                    </span>

                  </td>

                  <td className="text-center">

                    <span
                      className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-bold

                      ${
                        item.llavero
                          ?.estado ===
                        "PRESTADO"

                        ?
                        "bg-orange-100 text-orange-700"

                        :

                        "bg-green-100 text-green-700"
                      }
                    `}
                    >

                      {
                        item.llavero
                          ?.estado
                      }

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <ModalRegistro
        show={showModal}
        onClose={()=>
          setShowModal(
            false
          )
        }
      />

    </div>

  );

}