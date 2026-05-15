// src/pages/modulos/proveedores/Dashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Building2, Plus, Edit2, Trash2, Search, MapPin, Phone, Mail, CheckCircle, XCircle } from 'lucide-react';

export default function ProveedoresDashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem('proveedoresUser');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    email: '',
    ciudad: '',
    estado: 'Activo'
  });

  const [proveedores, setProveedores] = useState([
    {
      id: 1,
      nombre: 'Juan García',
      empresa: 'Suministros Seguros S.A.',
      telefono: '+51 999 123 456',
      email: 'juan@suministros.com',
      ciudad: 'Lima',
      estado: 'Activo',
      fecha: '2024-01-15'
    },
    {
      id: 2,
      nombre: 'María López',
      empresa: 'Equipos de Protección Pro',
      telefono: '+51 988 234 567',
      email: 'maria@equipospro.com',
      ciudad: 'Lima',
      estado: 'Activo',
      fecha: '2024-02-20'
    },
    {
      id: 3,
      nombre: 'Carlos Ruiz',
      empresa: 'Servicios Industriales',
      telefono: '+51 977 345 678',
      email: 'carlos@servicios.com',
      ciudad: 'Callao',
      estado: 'Inactivo',
      fecha: '2023-12-10'
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      empresa: 'Distribuidora Regional',
      telefono: '+51 966 456 789',
      email: 'ana@distribuidora.com',
      ciudad: 'Arequipa',
      estado: 'Activo',
      fecha: '2024-03-05'
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('proveedoresToken');
    localStorage.removeItem('proveedoresUser');
    navigate('/proveedores/login');
  };

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({
      nombre: '',
      empresa: '',
      telefono: '',
      email: '',
      ciudad: '',
      estado: 'Activo'
    });
    setShowModal(true);
  };

  const handleEditClick = (proveedor) => {
    setEditingId(proveedor.id);
    setFormData(proveedor);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingId) {
      setProveedores(proveedores.map(p => 
        p.id === editingId ? { ...formData, id: editingId } : p
      ));
    } else {
      const newId = Math.max(...proveedores.map(p => p.id), 0) + 1;
      setProveedores([...proveedores, { 
        ...formData, 
        id: newId,
        fecha: new Date().toISOString().split('T')[0]
      }]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
      setProveedores(proveedores.filter(p => p.id !== id));
    }
  };

  const filteredProveedores = proveedores.filter(p =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = proveedores.filter(p => p.estado === 'Activo').length;
  const inactiveCount = proveedores.filter(p => p.estado === 'Inactivo').length;
  const totalCities = new Set(proveedores.map(p => p.ciudad)).size;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <nav className="bg-[#3a48da] text-white p-6 shadow-lg sticky top-0 z-30">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <Building2 size={32} className="text-[#3a48da]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Gestión de Proveedores</h1>
              <p className="text-sm text-blue-200">Sistema de Control Integral</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm bg-white/20 px-4 py-2 rounded-lg">{user}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <LogOut size={18} /> Salir
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* ESTADÍSTICAS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Total Proveedores</p>
                  <p className="text-3xl font-bold text-[#3a48da] mt-2">{proveedores.length}</p>
                </div>
                <Building2 size={40} className="text-blue-200" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Proveedores Activos</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">{activeCount}</p>
                </div>
                <CheckCircle size={40} className="text-green-200" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Proveedores Inactivos</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">{inactiveCount}</p>
                </div>
                <XCircle size={40} className="text-red-200" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Ciudades</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">{totalCities}</p>
                </div>
                <MapPin size={40} className="text-purple-200" />
              </div>
            </div>
          </div>

          {/* CONTROLES */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, empresa o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a48da]"
                />
              </div>
              <button
                onClick={handleAddClick}
                className="bg-[#3a48da] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#263398] transition font-semibold"
              >
                <Plus size={20} /> Agregar Proveedor
              </button>
            </div>
          </div>

          {/* TABLA */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#3a48da] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold">Nombre</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Empresa</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Teléfono</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Ciudad</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Estado</th>
                    <th className="px-6 py-4 text-center text-sm font-bold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProveedores.length > 0 ? (
                    filteredProveedores.map((proveedor) => (
                      <tr key={proveedor.id} className="border-b hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-semibold text-gray-800">{proveedor.nombre}</td>
                        <td className="px-6 py-4 text-gray-600">{proveedor.empresa}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail size={16} /> {proveedor.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone size={16} /> {proveedor.telefono}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin size={16} /> {proveedor.ciudad}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-4 py-1 rounded-full text-xs font-bold ${
                            proveedor.estado === 'Activo'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {proveedor.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleEditClick(proveedor)}
                              className="text-blue-600 hover:bg-blue-50 p-2 rounded transition"
                              title="Editar"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(proveedor.id)}
                              className="text-red-600 hover:bg-red-50 p-2 rounded transition"
                              title="Eliminar"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                        No se encontraron proveedores
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#3a48da] text-white p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {editingId ? 'Editar Proveedor' : 'Agregar Proveedor'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-2xl">&times;</button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a48da]"
                  placeholder="Nombre completo"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Empresa</label>
                <input
                  type="text"
                  value={formData.empresa}
                  onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a48da]"
                  placeholder="Nombre de la empresa"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a48da]"
                  placeholder="email@empresa.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a48da]"
                  placeholder="+51 999 123 456"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ciudad</label>
                <input
                  type="text"
                  value={formData.ciudad}
                  onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a48da]"
                  placeholder="Ciudad"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Estado</label>
                <select
                  value={formData.estado}
                  onChange={(e) => setFormData({...formData, estado: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a48da]"
                >
                  <option>Activo</option>
                  <option>Inactivo</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-[#3a48da] text-white font-bold py-2 rounded-lg hover:bg-[#263398] transition"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}