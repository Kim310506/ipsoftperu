import React, { useState } from 'react';
import SidebarInventario from "./components/SidebarInventario";
import InventarioContenido from "./components/InventarioContenido";

export default function Dashboard() {
  const [menuActivo, setMenuActivo] = useState('inventario');

  // Función para cerrar sesión y mandarlo al login
  const cerrarSesion = () => {
    localStorage.removeItem("usuario"); // Esto borra la sesión
    
    // 👇 CAMBIA ESTA RUTA POR TU RUTA REAL DE LOGIN
    window.location.href = "/"; // <-- Pon "/" si tu login está en la pantalla principal
    // O si tu login está en otra ruta, cámbiala. Ejemplo: window.location.href = "/inventario/login";
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* ⬅️ IZQUIERDA: EL SIDEBAR AZUL */}
      <SidebarInventario 
        menuActivo={menuActivo}
        setMenuActivo={setMenuActivo}
        cerrarSesion={cerrarSesion}
      />

      {/* ➡️ DERECHA: LA TABLA GIGANTE */}
      <main className="flex-1 overflow-hidden w-full relative">
        {menuActivo === 'inventario' && (
          <InventarioContenido />
        )}
      </main>

    </div>
  );
}