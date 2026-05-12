import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginAdmin from "./pages/LoginAdmin";
import DashboardAdmin from "./pages/DashboardAdmin";

export default function App() {

  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/administracion"
        element={<LoginAdmin />}
      />

      <Route
        path="/dashboard"
        element={<DashboardAdmin />}
      />

    </Routes>
  );
}