// src/pages/modulos/visitas/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users } from 'lucide-react';

export default function VisitasDashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem('visitasUser');

  const handleLogout = () => {
    localStorage.removeItem('visitasToken');
    localStorage.removeItem('visitasUser');
    navigate('/visitas/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-[#3a48da] text-white p-6 shadow-lg">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Users size={32} />
            <h1 className="text-2xl font-bold">Gestión de Visitas</h1>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm">{user}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <LogOut size={18} /> Salir
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido */}
      <main className="p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#3a48da] mb-8">Bienvenido al Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold text-[#3a48da] mb-2">Visitas Activas</h3>
              <p className="text-3xl font-bold text-gray-800">12</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold text-[#3a48da] mb-2">Visitas Hoy</h3>
              <p className="text-3xl font-bold text-gray-800">5</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold text-[#3a48da] mb-2">Pendientes</h3>
              <p className="text-3xl font-bold text-gray-800">3</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}