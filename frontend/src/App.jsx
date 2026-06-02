import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import LoginAdmin from "./pages/Administracion/LoginAdmin";
import DashboardAdmin from "./pages/Administracion/DashboardAdmin";
import RegistroExterno from "./pages/Modulos/visitas/components/ProgramarVisitas/RegistroExterno";
import ProtectedRoute from "./components/ProtectedRoute";

/* VISITAS */
import VisitasLogin from "./pages/modulos/visitas/Login";
import VisitasDashboard from "./pages/modulos/visitas/Dashboard";

/* PROVEEDORES */
import ProveedoresLogin from "./pages/modulos/proveedores/Login";
import ProveedoresDashboard from "./pages/modulos/proveedores/Dashboard";

/* INCIDENTES */
import IncidentesLogin from "./pages/modulos/incidentes/Login";
import IncidentesDashboard from "./pages/modulos/incidentes/Dashboard";

/* INVENTARIO 
import InventarioLogin from "./pages/modulos/inventario/Login";
import InventarioDashboard from "./pages/modulos/inventario/Dashboard";*/

/* EXTINTORES */
/*import ExtintorLogin from "./pages/modulos/extintor/Login";
import ExtintorDashboard from "./pages/modulos/extintor/Dashboard";*/

/* MANTENIMIENTO 
import MantenimientoLogin from "./pages/modulos/mantenimiento/Login";
import MantenimientoDashboard from "./pages/modulos/mantenimiento/Dashboard";*/

/* RIESGO 
import RiesgoLogin from "./pages/modulos/riesgo/Login";
import RiesgoDashboard from "./pages/modulos/riesgo/Dashboard";*/

/* SISMOS */
import SismosLogin from "./pages/modulos/sismos/Login";
import SismosDashboard from "./pages/modulos/sismos/Dashboard";

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

      {/* EXTINTORES */}
      <Route
        path="/registro-externo/:codigo"
        element={<RegistroExterno />}
      />

      {/* SISMOS */}
      <Route path="/sismos/login" element={<SismosLogin />} />
      <Route path="/sismos/dashboard" element={<SismosDashboard />} />
    </Routes>
  );
}