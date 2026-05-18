import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaBuilding,
  FaPenToSquare,
  FaTrash,
  FaPlus,
  FaXmark,
  FaUser,
  FaEnvelope,
  FaLock,
  FaRightFromBracket,
  FaChevronDown
} from "react-icons/fa6";
import { users } from "../../data/users";
import SidebarAdmin from "./components/SidebarAdmin";
import { zonales } from "../../data/infraestructura";
import UsuariosAdmin from "./components/usuarios/UsuariosSection";
import ModalCrearUsuario from "./components/usuarios/ModalCrearUsuario";
import ModalEliminarUsuario from "./components/usuarios/ModalEliminarUsuario";
import ModalEditarUsuario from "./components/usuarios/ModalEditarUsuario";
import MenuInfraestructura from "./components/infraestructura/MenuInfraestructura";
import Zonales from "./components/infraestructura/Zonales";
import Sedes from "./components/infraestructura/Sedes";
import Pabellones from "./components/infraestructura/Pabellones";
import Pisos from "./components/infraestructura/Pisos";
import Ambientes from "./components/infraestructura/Ambientes";
import ListaSedes from "./components/infraestructura/ListaSedes";
import ModalSede from "./components/infraestructura/ModalSede";
import ListaPabellones from "./components/infraestructura/ListaPabellones";
import ModalPabellon from "./components/infraestructura/ModalPabellon";
import ListaPisos from "./components/infraestructura/ListaPisos";
import ModalPiso from "./components/infraestructura/ModalPiso";
import ListaAmbientes from "./components/infraestructura/ListaAmbientes";
import ModalAmbiente from "./components/infraestructura/ModalAmbiente";
import CrearUbicacion from "./components/infraestructura/CrearUbicacion";
import GestionUUNN from "./components/uunn/GestionUUNN";
export default function DashboardAdmin() {
const navigate = useNavigate();
const [openModal, setOpenModal] = useState(false);
const [menuActivo, setMenuActivo] = useState("usuarios");

const [openSidebar, setOpenSidebar] = useState(false);
  const usuarioLogueado = JSON.parse(
    localStorage.getItem("usuario")
  );
const [vistaInfra, setVistaInfra] = useState("menu");
const [openPabellonModal, setOpenPabellonModal] = useState(false);
const [sedeSeleccionada, setSedeSeleccionada] = useState(null);
const [pabellonSeleccionado, setPabellonSeleccionado] = useState(null);
const [pisoSeleccionado, setPisoSeleccionado] = useState(null);
const [sedeFiltro, setSedeFiltro] = useState("TODOS");
const [buscarPabellon, setBuscarPabellon] = useState("");
const [filtroSede, setFiltroSede] = useState("TODAS");
const [moduloFiltro, setModuloFiltro] = useState("TODOS");
const [openEditModal, setOpenEditModal] = useState(false);
const [openDeleteModal, setOpenDeleteModal] = useState(false);
const sedes = zonales.flatMap((zonal) => zonal.sedes);
const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
const obtenerNombreSede = (id) => {
const sede = sedes.find((s) => s.id === id);

  return sede ? sede.nombre : "SIN SEDE";
};
const cerrarSesion = () => {

  localStorage.removeItem("usuario");

  navigate("/administracion");

};
const [paginaActual, setPaginaActual] = useState(1);
const [buscarAmbiente, setBuscarAmbiente] = useState("");
const [openAmbienteModal, setOpenAmbienteModal] = useState(false);
const [ambienteSeleccionado, setAmbienteSeleccionado] = useState(null);
const usuariosPorPagina = 5;
const sedesGlobales = zonales.flatMap((zonal) =>

  zonal.sedes.map((sede) => ({
    ...sede,
    zonalNombre: zonal.nombre
  }))

);
const [buscarSede, setBuscarSede] = useState("");
const [openSedeModal, setOpenSedeModal] = useState(false);
const [sedeSeleccionadaGlobal, setSedeSeleccionadaGlobal] = useState(null);
const sedesFiltradas = sedesGlobales.filter((sede) =>

  sede.nombre
    .toLowerCase()
    .includes(
      buscarSede.toLowerCase()
    )

);
const pabellonesFiltrados = sedes.flatMap((sede) =>
  sede.pabellones
    .filter((pabellon) => {

      // BUSCADOR
      const coincideBusqueda =
        pabellon.nombre
          .toLowerCase()
          .includes(
            buscarPabellon.toLowerCase()
          );
// FILTRO SEDE
const coincideSede =
        filtroSede === "TODAS" ||
        sede.nombre === filtroSede;

      return coincideBusqueda && coincideSede;

    })

    .map((pabellon) => ({
      ...pabellon,
      sedeNombre: sede.nombre
    }))

);
const [buscarPiso, setBuscarPiso] = useState("");
const [openPisoModal, setOpenPisoModal] = useState(false);
const [pisoSeleccionadoGlobal, setPisoSeleccionadoGlobal] = useState(null);
const ambientesFiltrados = sedes.flatMap((sede) =>
  sede.pabellones.flatMap((pabellon) =>
    pabellon.pisos.flatMap((piso) =>
      piso.ambientes
        .filter((ambiente) =>
          ambiente.nombre
            .toLowerCase()
            .includes(
              buscarAmbiente.toLowerCase()
            )
        )
        .map((ambiente) => ({
          ...ambiente,
          pisoNombre: piso.nombre,
          pabellonNombre: pabellon.nombre,
          sedeNombre: sede.nombre
        }))
    )
  )
);
const pisosFiltrados = sedes.flatMap((sede) =>
  sede.pabellones.flatMap((pabellon) =>
    pabellon.pisos
      .filter((piso) =>
        piso.nombre
          .toLowerCase()
          .includes(
            buscarPiso.toLowerCase()
          )
      )
      .map((piso) => ({
        ...piso,
        sedeNombre: sede.nombre,
        pabellonNombre: pabellon.nombre
      }))
  )
);
  return (

    <div className="min-h-screen bg-[#f4f6fb] flex flex-col lg:flex-row">
      <SidebarAdmin
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        menuActivo={menuActivo}
        setMenuActivo={setMenuActivo}
        usuarioLogueado={usuarioLogueado}
        cerrarSesion={cerrarSesion}
      />
      {/* CONTENIDO */}
     <main className="flex-1 p-5 lg:p-10"> 
      {/* USUARIOS */}
      {menuActivo === "usuarios" && (
        <>
        <UsuariosAdmin
        menuActivo={menuActivo}
        setOpenModal={setOpenModal}
        usuarioLogueado={usuarioLogueado}
        sedeFiltro={sedeFiltro}
        setSedeFiltro={setSedeFiltro}
        moduloFiltro={moduloFiltro}
        setModuloFiltro={setModuloFiltro}
        sedes={sedes}
        users={users}
        obtenerNombreSede={obtenerNombreSede}
        paginaActual={paginaActual}
        setPaginaActual={setPaginaActual}
        usuariosPorPagina={usuariosPorPagina}
        setUsuarioSeleccionado={setUsuarioSeleccionado}
        setOpenEditModal={setOpenEditModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
          <ModalEditarUsuario
            openEditModal={openEditModal}
            setOpenEditModal={setOpenEditModal}
            usuarioSeleccionado={usuarioSeleccionado}
          />
          <ModalEliminarUsuario
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            usuarioSeleccionado={usuarioSeleccionado}
          />
        </>
      )}
    {/* INFRAESTRUCTURA */}
    {menuActivo === "infraestructura" && (
      <>
    {/* MENU PRINCIPAL */}
      {vistaInfra === "menu" && (
          <MenuInfraestructura
      usuarioLogueado={usuarioLogueado}
      setVistaInfra={setVistaInfra}
      
    />
        )}
  {/* CREAR UBICACION */}
{vistaInfra === "crear" && (
  <CrearUbicacion
    setVistaInfra={setVistaInfra}
  />
)}
    {/* ZONALES */}
    {vistaInfra === "zonal" && (
          <Zonales
            zonales={zonales}
            setVistaInfra={setVistaInfra}
            setSedeSeleccionada={setSedeSeleccionada}
          />
        )}
        {vistaInfra === "sedes" && (
          <Sedes
            sedeSeleccionada={sedeSeleccionada}
            setVistaInfra={setVistaInfra}
            setPabellonSeleccionado={setPabellonSeleccionado}
          />
        )}

        {vistaInfra === "pabellones" && (
          <Pabellones
            pabellonSeleccionado={pabellonSeleccionado}
            setVistaInfra={setVistaInfra}
            setPisoSeleccionado={setPisoSeleccionado}
          />
        )}

        {vistaInfra === "pisos" && (
          <Pisos
            pisoSeleccionado={pisoSeleccionado}
            setVistaInfra={setVistaInfra}
            setSedeFiltro={setSedeFiltro}
          />
        )}

        {vistaInfra === "ambientes" && (
          <Ambientes
            sedeFiltro={sedeFiltro}
            setVistaInfra={setVistaInfra}
          />
        )}
{/* ======================= */}
{/* LISTA GLOBAL SEDES */}
{/* ======================= */}
  {/* 🔥 LISTA SEDES */}
    <ListaSedes
      vistaInfra={vistaInfra}
      setVistaInfra={setVistaInfra}
      buscarSede={buscarSede}
      setBuscarSede={setBuscarSede}
      sedesFiltradas={sedesFiltradas}
      setSedeSeleccionadaGlobal={setSedeSeleccionadaGlobal}
      setOpenSedeModal={setOpenSedeModal}
    />
{/* MODAL SEDE */}
<ModalSede
      openSedeModal={openSedeModal}
      setOpenSedeModal={setOpenSedeModal}
      sedeSeleccionadaGlobal={sedeSeleccionadaGlobal}
    />
{/* ======================= */}
{/* LISTA GLOBAL PABELLONES */}
{/* ======================= */}
<ListaPabellones
  vistaInfra={vistaInfra}
  setVistaInfra={setVistaInfra}
  buscarPabellon={buscarPabellon}
  setBuscarPabellon={setBuscarPabellon}
  filtroSede={filtroSede}
  setFiltroSede={setFiltroSede}
  sedes={sedes}
  pabellonesFiltrados={pabellonesFiltrados}
  setPabellonSeleccionado={setPabellonSeleccionado}
  setOpenPabellonModal={setOpenPabellonModal}
/>
<ModalPabellon
  openPabellonModal={openPabellonModal}
  setOpenPabellonModal={setOpenPabellonModal}
  pabellonSeleccionado={pabellonSeleccionado}
/>
<ListaPisos
  vistaInfra={vistaInfra}
  setVistaInfra={setVistaInfra}
  buscarPiso={buscarPiso}
  setBuscarPiso={setBuscarPiso}
  pisosFiltrados={pisosFiltrados}
  setPisoSeleccionadoGlobal={setPisoSeleccionadoGlobal}
  setOpenPisoModal={setOpenPisoModal}
/>
<ModalPiso
  openPisoModal={openPisoModal}
  setOpenPisoModal={setOpenPisoModal}
  pisoSeleccionadoGlobal={pisoSeleccionadoGlobal}
/>
<ListaAmbientes
  vistaInfra={vistaInfra}
  setVistaInfra={setVistaInfra}
  buscarAmbiente={buscarAmbiente}
  setBuscarAmbiente={setBuscarAmbiente}
  ambientesFiltrados={ambientesFiltrados}
  setAmbienteSeleccionado={setAmbienteSeleccionado}
  setOpenAmbienteModal={setOpenAmbienteModal}
/>
<ModalAmbiente
  openAmbienteModal={openAmbienteModal}
  setOpenAmbienteModal={setOpenAmbienteModal}
  ambienteSeleccionado={ambienteSeleccionado}
/>
  </>

)}
<ModalCrearUsuario
  openModal={openModal}
  setOpenModal={setOpenModal}
/>
{menuActivo === "uunn" && (
  <GestionUUNN />
)}

      </main> 
    </div>

  );
}

