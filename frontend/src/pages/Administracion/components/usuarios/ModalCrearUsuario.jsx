import { FaXmark, FaUser, FaEnvelope, FaLock, FaChevronDown } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../../../api/axios"; 
// ajusta la ruta según tu proyecto
export default function ModalCrearUsuario({
  openModal,
  setOpenModal,
  obtenerUsuarios
}) {
   const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [sedeId, setSedeId] = useState("");
const [sedes, setSedes] = useState([]);
const [modulos, setModulos] = useState([]);
useEffect(() => {

  const cargarSedes = async () => {

    try {

      const res = await api.get("/sedes");

      setSedes(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  cargarSedes();

}, []);
const obtenerModuloDeRol = (rol) => {

  for (const modulo in rolesPorModulo) {

    if (
      rolesPorModulo[modulo].includes(rol)
    ) {
      return modulo;
    }

  }

  return null;

};
const manejarModulo = (modulo) => {

  let nuevosModulos;

  if (modulos.includes(modulo)) {

    nuevosModulos =
      modulos.filter(
        m => m !== modulo
      );

  } else {

    nuevosModulos = [
      ...modulos,
      modulo
    ];

  }

  setModulos(nuevosModulos);

  const rolesValidos =
    nuevosModulos.flatMap(
      m =>
        rolesPorModulo[m] || []
    );

  setRoles(
    roles.filter(
      r =>
        rolesValidos.includes(r)
    )
  );

};
const rolesPorModulo = {

  ADMIN: [
    "ADMIN"
  ],

  VISITAS: [
    "SOLICITANTE DE ACCESO (SA)",
    "RESPONSABLE DE AREA (RA)",
    "RECEPCION DE SEGURIDAD (REC)"
  ],

  INCIDENTES: [
    "RESPONSABLE SAFETY",
    "RESPONSABLE SECURITY",
    "ENCARGADO DE SOLUCIONAR SAFETY",
    "ENCARGADO DE SOLUCIONAR SECURITY",
    "SEGURIDAD DEL LOCAL"
  ],

  SISMOS: [
    "PERSONAL DE VIGILANCIA (PVIG)",
    "PERSONAL DE SEGURIDAD (PSEG)",
    "OPERADOR DE SEGURIDAD (OSEG)"
  ],
   RIESGOS: [
    "JEFE DE SEGURIDAD",
    "RESPONSABLE DE CATEGORIA"  ],
  PROVEEDORES: [
     "SOLICITANTE DE ACCESO (SA)",
    "RESPONSABLE DE AREA (RA)",
    "RECEPCION DE SEGURIDAD (REC)",
    "ANALISTA DE SEGURIDAD",
    "RESPONSABLE AMBIENTE"
 ]

};
const manejarRol = (rol) => {

  const moduloRol =
    obtenerModuloDeRol(rol);

  const rolesDeEseModulo =
    rolesPorModulo[moduloRol];

  const rolesSeleccionadosDeEseModulo =
    roles.filter(r =>
      rolesDeEseModulo.includes(r)
    );

  if (roles.includes(rol)) {

    setRoles(
      roles.filter(r => r !== rol)
    );

    return;

  }

  if (
    rolesSeleccionadosDeEseModulo.length > 0
  ) {

    Swal.fire({
  icon: "info",
  title: "Solo un rol por módulo",
  html: `
    <div style="font-size:14px">
      El módulo <b>${moduloRol}</b> ya tiene un rol asignado.<br><br>
      Debes desmarcar el rol actual antes de seleccionar otro.
    </div>
  `,
  confirmButtonText: "Aceptar",
  confirmButtonColor: "#345ccf"
});

    return;

  }

  setRoles([
    ...roles,
    rol
  ]);

};
  const crearUsuario = async () => {

    try {

         const response = await api.post("/users", {
          nombre,
          correo,
          password,
          rol: roles.join(","),
          modulo: modulos.join(","),
          sedeId
        }
      );

      console.log(response.data);
      await obtenerUsuarios();  
      alert("Usuario creado");
        setNombre("");
        setCorreo("");
        setPassword("");
        setRoles([]);
        setSedeId("");
        setModulos([]);
      setOpenModal(false);

    } catch (error) {

      console.log(error);

      alert("Error al crear usuario");

    }

  };

  if (!openModal) return null;
const rolesDisponibles = [
  ...new Set(
    modulos.flatMap(
      modulo =>
        rolesPorModulo[modulo] || []
    )
  )
];
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-5">

      <div className="bg-white w-full max-w-2xl rounded-[40px] p-5 lg:p-10 relative shadow-2xl max-h-[95vh] overflow-y-auto">

        {/* CERRAR */}
        <button
          onClick={() => setOpenModal(false)}
          className="absolute top-7 right-7 text-3xl text-gray-400 hover:text-black transition"
        >
          <FaXmark />
        </button>

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#1d2b4f]">
            REGISTRAR USUARIO
          </h1>

          <p className="text-sm uppercase tracking-[3px] text-gray-400 font-bold mt-2">
            Nuevo acceso al sistema iCURA
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-6">

          {/* NOMBRE */}
          <div>
            <label className="text-xs uppercase font-black text-[#7184a3]">
              Nombre completo
            </label>

            <div className="mt-3 bg-[#f5f7fb] rounded-2xl px-5 flex items-center gap-4">
              <FaUser className="text-[#7184a3]" />

              <input
                type="text"
                placeholder="Ej. Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-transparent p-5 outline-none font-semibold"
              />
            </div>
          </div>

          {/* CORREO */}
          <div>
            <label className="text-xs uppercase font-black text-[#7184a3]">
              Correo electrónico
            </label>

            <div className="mt-3 bg-[#f5f7fb] rounded-2xl px-5 flex items-center gap-4">
              <FaEnvelope className="text-[#7184a3]" />

              <input
                type="email"
                placeholder="usuario@ips.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full bg-transparent p-5 outline-none font-semibold"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-xs uppercase font-black text-[#7184a3]">
              Contraseña
            </label>

            <div className="mt-3 bg-[#f5f7fb] rounded-2xl px-5 flex items-center gap-4">
              <FaLock className="text-[#7184a3]" />

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent p-5 outline-none font-semibold"
              />
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
{/* ACCESOS */}
            <div className="relative w-full">
              <label className="block text-[12px] uppercase font-black text-[#7184a3] mb-2">
                Accesos a módulos
              </label>

              <details className="group">
<summary className="list-none bg-[#f5f7fb] rounded-[22px] px-6 py-5 font-bold text-[#8b97ad] flex justify-between cursor-pointer">

  <span className="truncate">
    {modulos.length > 0
      ? modulos.join(", ")
      : "Seleccionar módulos"}
  </span>

  <FaChevronDown className="group-open:rotate-180 transition flex-shrink-0" />

</summary>
<div
  className="
    absolute mt-3 w-full
    bg-white rounded-[24px]
    shadow-lg border
    p-5
    z-50
    max-h-[320px]
    overflow-y-auto
  "
>
                  <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={modulos.includes("ADMIN")}
                    onChange={() =>
                      manejarModulo("ADMIN")
                    }
                    className="
                    min-w-[20px]
                    min-h-[20px]
                    w-5
                    h-5
                    accent-[#0456b3]
                  "
                  />

                  <span className="font-bold text-sm">
                    ADMIN
                  </span>

                </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={modulos.includes("VISITAS")}
                      onChange={() =>
                        manejarModulo("VISITAS")
                      }
                      className="
                      min-w-[20px]
                      min-h-[20px]
                      w-5
                      h-5
                      accent-[#0456b3]
                    "
                    />

                    <span className="font-bold text-sm">
                      VISITAS
                    </span>

                  </label>
                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      checked={modulos.includes("PROVEEDORES")}
                      onChange={() =>
                        manejarModulo("PROVEEDORES")
                      }
                      className="
                        min-w-[20px]
                        min-h-[20px]
                        w-5
                        h-5
                        accent-[#0456b3]
                      "
                    />

                    <span className="font-bold text-sm">
                      PROVEDORES
                    </span>
                  </label>
                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      checked={modulos.includes("INCIDENTES")}
                      onChange={() =>
                        manejarModulo("INCIDENTES")
                      }
                      className="
                        min-w-[20px]
                        min-h-[20px]
                        w-5
                        h-5
                        accent-[#0456b3]
                      "
                    />

                    <span className="font-bold text-sm">
                      INCIDENTES
                    </span>

                  </label>
                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      checked={modulos.includes("INVENTARIOS")}
                      onChange={() =>
                        manejarModulo("INVENTARIOS")
                      }
                      className="
                        min-w-[20px]
                        min-h-[20px]
                        w-5
                        h-5
                        accent-[#0456b3]
                      "
                    />

                    <span className="font-bold text-sm">
                      INVENTARIOS
                    </span>
                  </label>
                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      checked={modulos.includes("EXTINTORES")}
                      onChange={() =>
                        manejarModulo("EXTINTORES")
                      }
                      className="
                        min-w-[20px]
                        min-h-[20px]
                        w-5
                        h-5
                        accent-[#0456b3]
                      "
                    />

                    <span className="font-bold text-sm">
                      EXTINTORES
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={modulos.includes("MANTENIMIENTO")}
                      onChange={() =>
                        manejarModulo("MANTENIMIENTO")
                      }
                      className="
                        min-w-[20px]
                        min-h-[20px]
                        w-5
                        h-5
                        accent-[#0456b3]
                      "
                    />
                    <span className="font-bold text-sm">
                      MANTENIMIENTO
                    </span>
                  </label>    
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={modulos.includes("RIESGOS")}
                      onChange={() =>
                        manejarModulo("RIESGOS")
                      }
                      className="
                          min-w-[20px]
                          min-h-[20px]
                          w-5
                          h-5
                          accent-[#0456b3]
                        "
                    />
                    <span className="font-bold text-sm">
                      RIESGOS
                    </span>
                  </label>      
                  <label className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      checked={modulos.includes("SISMOS")}
                      onChange={() =>
                        manejarModulo("SISMOS")
                      }
                      className="
                        min-w-[20px]
                        min-h-[20px]
                        w-5
                        h-5
                        accent-[#0456b3]
                      "
                    />

                    <span className="font-bold text-sm">
                      SISMOS
                    </span>

                  </label>
                </div>
              </details>
            </div>
            {/* ROL */}
            <div className="relative w-full">
              <label className="block text-[12px] uppercase font-black text-[#7184a3] mb-2">
                Roles
              </label>

              <details className="group">
                <summary className="list-none bg-[#f5f7fb] rounded-[22px] px-6 py-5 font-bold text-[#8b97ad] flex justify-between cursor-pointer">
                  {roles.length > 0
                    ? roles.join(", ")
                    : "Seleccionar roles"}

                  <FaChevronDown className="group-open:rotate-180 transition" />
                </summary>

<div
  className="
    absolute mt-3 w-full
    bg-white rounded-[24px]
    shadow-lg border
    p-5
    flex flex-col gap-4
    z-50
    max-h-[280px]
    overflow-y-auto
  "
>
                 {modulos.map((modulo) => (

  <div
    key={modulo}
    className="border-b border-gray-100 pb-4 mb-4"
  >

    <div className="mb-3">
      <p className="text-[11px] uppercase tracking-[2px] font-black text-[#345ccf]">
        {modulo}
      </p>

      <div className="w-10 h-[2px] bg-[#345ccf] rounded-full mt-1" />
    </div>

    <div className="flex flex-col gap-3">

      {(rolesPorModulo[modulo] || []).map(
        (rolItem) => (

          <label
            key={rolItem}
            className="
              flex items-center gap-3
              p-3 rounded-xl
              hover:bg-[#f5f7fb]
              cursor-pointer
              transition
            "
          >

            <input
              type="checkbox"
              checked={roles.includes(rolItem)}
              onChange={() =>
                manejarRol(rolItem)
              }
              className="
                min-w-[20px]
                min-h-[20px]
                w-5
                h-5
                accent-[#345ccf]
              "
            />

            <span className="font-semibold text-sm text-[#1d2b4f]">
              {rolItem}
            </span>

          </label>

        )
      )}

    </div>

  </div>

))}

                </div>
              </details>
            </div>

            {/* SEDE */}
            <div className="relative w-full">
              <label className="block text-[12px] uppercase font-black text-[#7184a3] mb-2">
                Sede
              </label>

              <select
                value={sedeId}
                onChange={(e) =>
                  setSedeId(Number(e.target.value))
                }
                className="w-full bg-[#f5f7fb] rounded-[22px] px-6 py-5 pr-14 font-bold text-[#8b97ad] appearance-none"
              >

                <option value="">
                  Seleccionar sede
                </option>

                {sedes.map((sede) => (

                  <option
                    key={sede.id}
                    value={sede.id}
                  >
                    {sede.nombre}
                  </option>

                ))}

              </select>

              <FaChevronDown className="absolute right-5 top-[58px] text-[13px] text-[#8b97ad]" />
            </div>

          </div>

          {/* BOTÓN */}
          <button onClick={crearUsuario} className="w-full mt-6 bg-[#345ccf] hover:bg-[#284dbd] text-white rounded-2xl py-5 font-black tracking-[2px]">
            CREAR USUARIO
          </button>

        </div>
      </div>
    </div>
  );
}