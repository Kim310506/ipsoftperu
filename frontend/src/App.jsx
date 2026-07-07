import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import LoginAdmin from "./pages/Administracion/LoginAdmin";
import DashboardAdmin from "./pages/Administracion/DashboardAdmin";
// ⚠️ CORREGIDO: "modulos" en minúscula para evitar el error de Vite
import RegistroExterno from "./pages/modulos/visitas/components/ProgramarVisitas/RegistroExterno";
import ProtectedRoute from "./components/ProtectedRoute";

/* VISITAS */
import VisitasLogin from "./pages/modulos/visitas/Login";
import VisitasDashboard from "./pages/modulos/visitas/Dashboard";

/* PROVEEDORES */
import ProveedoresLogin from "./pages/modulos/proveedores/Login";
import ProveedoresDashboard from "./pages/modulos/proveedores/Dashboard";
import RegistroVisitantes from "./pages/Modulos/proveedores/components/ProgramarProveedores/RegistroVisitantes";

/* PROVEEDORES INHOUSE*/
import ProveedoresInhouseLogin from "./pages/modulos/proveeinhouse/Login";
import ProveedoresInhouseDashboard from "./pages/modulos/proveeinhouse/Dashboard";
import RegistroVisitantesInhouse from "./pages/Modulos/proveeinhouse/components/ProgramarProveedores/RegistroVisitantes";

/* INCIDENTES */
import IncidentesLogin from "./pages/modulos/incidentes/Login";
import IncidentesDashboard from "./pages/modulos/incidentes/Dashboard";

// INVENTARIO 
import InventarioLogin from "./pages/modulos/inventario/Login";
import InventarioDashboard from "./pages/modulos/inventario/Dashboard";

/* EXTINTORES */
/*import ExtintorLogin from "./pages/modulos/extintor/Login";
import ExtintorDashboard from "./pages/modulos/extintor/Dashboard";*/

/* MANTENIMIENTO 
import MantenimientoLogin from "./pages/modulos/mantenimiento/Login";
import MantenimientoDashboard from "./pages/modulos/mantenimiento/Dashboard";*/

/* RIESGO */
import RiesgosLogin from "./pages/modulos/riesgos/Login";
import RiesgosDashboard from "./pages/modulos/riesgos/Dashboard";

/* SISMOS */
import LlavesLogin from "./pages/modulos/llaves/Login";
import LlavesDashboard from "./pages/modulos/llaves/Dashboard";

/* LLAVES */
import SismosLogin from "./pages/modulos/sismos/Login";
import SismosDashboard from "./pages/modulos/sismos/Dashboard";
/* ASISTENCIA */
import AsistenciaLogin from "./pages/modulos/asistencia/Login";
import AsistenciaDashboard from "./pages/modulos/asistencia/Dashboard";
/* RONDAS */
import RondasLogin from "./pages/modulos/rondas/Login";
import RondasDashboard from "./pages/modulos/rondas/Dashboard";
export default function App() {

  return (
    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* ADMIN */}
      <Route
        path="/administracion"
        element={<LoginAdmin />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />

      {/* VISITAS */}
      <Route path="/visitas/login" element={<VisitasLogin />} />
      <Route path="/visitas/dashboard" element={<VisitasDashboard />} />

      {/* INCIDENTES */}
      <Route path="/incidentes/login" element={<IncidentesLogin />} />
      <Route path="/incidentes/dashboard" element={<IncidentesDashboard />} />

      {/* PROVEEDORES */}
      <Route path="/proveedores/login" element={<ProveedoresLogin />} />
      <Route path="/proveedores/dashboard" element={<ProveedoresDashboard />} />
       <Route
    path="/registro-visita/:token"
    element={<RegistroVisitantes />}
  />
     {/* PROVEEDORES INHOUSE */}
      <Route path="/proveedoresinhouse/login" element={<ProveedoresInhouseLogin />} />
      <Route path="/proveedoresinhouse/dashboard" element={<ProveedoresInhouseDashboard />} />
       <Route
    path="/registro-visita-inhouse/:token"
    element={<RegistroVisitantesInhouse />}
  />
        {/* INVENTARIO (¡AQUÍ ESTÁN TUS RUTAS NUEVAS!) */}
      <Route path="/inventario/login" element={<InventarioLogin />} />
      <Route path="/inventario/dashboard" element={<InventarioDashboard />} />

      {/* RIESGOS */}
      <Route path="/riesgos/login" element={<RiesgosLogin />} />
      <Route path="/riesgos/dashboard" element={<RiesgosDashboard />} />
      <Route
        path="/registro-externo/:codigo"
        element={<RegistroExterno />}
      />

      {/* SISMOS */}
      <Route path="/sismos/login" element={<SismosLogin />} />
      <Route path="/sismos/dashboard" element={<SismosDashboard />} />
      <Route path="/llaves/login" element={<LlavesLogin />} />
      <Route path="/llaves/dashboard" element={<LlavesDashboard />} />
      <Route path="/rondas/login" element={<RondasLogin />} />
      <Route path="/rondas/dashboard" element={<RondasDashboard />} />
    </Routes>
  );
}