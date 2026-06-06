import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { 
  Plus, Save, X, Package, MapPin, 
  Loader2, Search, Power, Edit3, FileUp, 
  ChevronLeft, ChevronDown, ChevronRight, Upload, Download, Camera, MessageSquare 
} from 'lucide-react';

// ⚠️ Entorno local
const API_BASE = 'http://localhost:3000';
const ITEMS_PER_PAGE = 12;

const InventarioContenido = () => {
  const fileInputRef = useRef(null);
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activos, setActivos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [menuExcelAbierto, setMenuExcelAbierto] = useState(false);

  // 🎯 FILTROS NAVBAR (Solo Sede)
  const [filtroSede, setFiltroSede] = useState("");
  const [sedesList, setSedesList] = useState([]); 

  // 🎯 CASCADA MODAL (Sede -> Pabellón -> Piso -> Ambiente)
  const [pabellones, setPabellones] = useState([]);
  const [pisos, setPisos] = useState([]);
  const [ambientes, setAmbientes] = useState([]);
  
  const [ubicacionSel, setUbicacionSel] = useState({ 
    sedeId: '', pabellonId: '', pisoId: '' 
  });

  const initialFormState = {
    nombre: '', marca: '', modelo: '', serie: '', categoria: '', sistema: '',
    estadoInv: 'ALTA', observaciones: '', ambienteId: '',
    foto: null,
    detalle: { 
      numInterno: '', fabricacion: '', capacidad: '', agente: 'PQS', 
      tipoUltimoServicio: 'RECARGA', fechaUltimoServicio: '', fechaUltimaPH: '' 
    }
  };

  const [formData, setFormData] = useState(initialFormState);

  // --- CARGA INICIAL ---
  const fetchActivos = async () => {
    try {
      const res = await axios.get(`${API_BASE}/activos`);
      setActivos(res.data);
      setPaginaActual(1);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchActivos();
    // Carga todas las sedes directamente para el navbar
    axios.get(`${API_BASE}/sedes`).then(res => setSedesList(res.data)).catch(err => console.log(err));
  }, []);


  // ==========================================
  // 🎯 HANDLERS PARA LA CASCADA DEL MODAL
  // ==========================================
  const handleSedeModalChange = async (id, skipReset = false) => {
    if (!skipReset) setUbicacionSel({ sedeId: id, pabellonId: '', pisoId: '' });
    if (id) {
      // Ajusta la ruta a tu endpoint real (ej. /pabellones/sede/:id o /pabellones?sedeId=)
      const res = await axios.get(`${API_BASE}/pabellones?sedeId=${id}`); 
      setPabellones(res.data);
    } else { setPabellones([]); }
  };

  const handlePabellonChange = async (id, skipReset = false) => {
    if (!skipReset) setUbicacionSel(prev => ({ ...prev, pabellonId: id, pisoId: '' }));
    if (id) {
      const res = await axios.get(`${API_BASE}/pisos?pabellonId=${id}`);
      setPisos(res.data);
    } else { setPisos([]); }
  };

  const handlePisoChange = async (id, skipReset = false) => {
    if (!skipReset) setUbicacionSel(prev => ({ ...prev, pisoId: id }));
    if (id) {
      const res = await axios.get(`${API_BASE}/ambientes?pisoId=${id}`);
      setAmbientes(res.data);
    } else { setAmbientes([]); }
  };


  // ==========================================
  // 🎯 LÓGICA DE FILTRADO DE LA TABLA
  // ==========================================
  const activosFiltrados = activos.filter(a => {
    const coincideTexto = a.codigo?.toLowerCase().includes(filtro.toLowerCase()) || 
                          a.nombre?.toLowerCase().includes(filtro.toLowerCase());
    
    const actSedeId = a.ambiente?.piso?.pabellon?.sedeId;
    let coincideJerarquia = true;

    if (filtroSede) {
      coincideJerarquia = actSedeId === parseInt(filtroSede);
    }
    
    return coincideTexto && coincideJerarquia;
  });

  const totalPaginas = Math.ceil(activosFiltrados.length / ITEMS_PER_PAGE);
  const indiceInicio = (paginaActual - 1) * ITEMS_PER_PAGE;
  const indiceFin = indiceInicio + ITEMS_PER_PAGE;
  const activosPaginados = activosFiltrados.slice(indiceInicio, indiceFin);

  const irAPagina = (pagina) => {
    const p = Math.max(1, Math.min(pagina, totalPaginas));
    setPaginaActual(p);
  };


  // ==========================================
  // 🎯 GUARDAR Y EDITAR
  // ==========================================
  const handleEdit = async (activo) => {
    setIsEditing(true);
    setCurrentId(activo.id);

    const piId = activo.ambiente?.pisoId || '';
    const pId = activo.ambiente?.piso?.pabellonId || '';
    const sId = activo.ambiente?.piso?.pabellon?.sedeId || '';

    await handleSedeModalChange(sId, true);
    await handlePabellonChange(pId, true);
    await handlePisoChange(piId, true);

    setUbicacionSel({ sedeId: sId, pabellonId: pId, pisoId: piId });

    setFormData({ 
      ...activo, 
      detalle: activo.detalle || initialFormState.detalle,
      foto: activo.foto || null 
    });

    setIsModalOpen(true);
  };

  const toggleEstado = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    if (!window.confirm(`¿Cambiar estado a ${nuevoEstado}?`)) return;
    try {
      await axios.patch(`${API_BASE}/activos/${id}/estado`, { estado: nuevoEstado });
      fetchActivos();
    } catch (error) { alert("Error al cambiar estado"); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'detalle' && key !== 'foto') data.append(key, formData[key]);
    });
    data.append('detalle', JSON.stringify(formData.detalle));
    if (formData.foto) data.append('foto', formData.foto);

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      if (isEditing) {
        await axios.put(`${API_BASE}/activos/${currentId}`, data, config);
      } else {
        await axios.post(`${API_BASE}/activos`, data, config);
      }
      setIsModalOpen(false);
      setFormData(initialFormState);
      fetchActivos(); 
    } catch (error) {
      alert("Error: " + (error.response?.data?.error || "Error al guardar"));
    } finally { setLoading(false); }
  };

  // ==========================================
  // 🎯 EXPORTAR E IMPORTAR
  // ==========================================
  const handleExportarExcel = async () => {
    setExporting(true);
    try {
      const res = await axios.get(`${API_BASE}/activos/exportar/excel`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Reporte_Activos_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setMenuExcelAbierto(false);
    } catch (error) {
      alert("❌ Error al descargar el Excel");
    } finally { setExporting(false); }
  };

  const handleImportExcel = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setImporting(true);

    try {
      const res = await axios.post(`${API_BASE}/activos/importar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(`¡Éxito! Se crearon ${res.data.creados} activos.`);
      fetchActivos();
    } catch (error) {
      alert("Error en la importación");
    } finally {
      setImporting(false);
      e.target.value = '';
    }
  };


  return (
    <div className="p-4 sm:p-6 flex flex-col h-screen max-h-screen bg-slate-50 gap-4 sm:gap-6 overflow-hidden">
      
      {/* ================= NAVBAR INTERNO DEL MÓDULO ================= */}
      <nav className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-4 shrink-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#2B59C3] tracking-tighter italic uppercase leading-none">
              Inventario
            </h1>
            <p className="text-slate-400 font-bold uppercase text-[9px] sm:text-[10px] tracking-[0.4em] mt-2 sm:mt-3 ml-1">
              Gestión Global de Activos
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* INPUT INVISIBLE EXCEL */}
            <input type="file" ref={fileInputRef} onChange={handleImportExcel} accept=".xlsx, .xls" className="hidden" />

            {/* BÚSQUEDA */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
              <input 
                type="text" 
                placeholder="Buscar código..." 
                value={filtro}
                onChange={(e) => { setFiltro(e.target.value); setPaginaActual(1); }}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-blue-300 font-bold text-xs h-10 transition-colors"
              />
            </div>

            {/* FILTRO SEDE */}
            <div className="relative flex-1 sm:w-48">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
              <select 
                value={filtroSede}
                onChange={(e) => { setFiltroSede(e.target.value); setPaginaActual(1); }}
                className="w-full pl-10 pr-8 py-2 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-blue-300 font-bold text-xs h-10 appearance-none cursor-pointer transition-colors"
              >
                <option value="">Todas las Sedes</option>
                {sedesList.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
              </select>
            </div>

            {/* BOTÓN EXCEL */}
            <div className="relative">
              <button 
                onClick={() => setMenuExcelAbierto(!menuExcelAbierto)}
                disabled={importing || exporting}
                className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-md hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 h-10 whitespace-nowrap"
              >
                {importing || exporting ? <Loader2 className="animate-spin" size={14} /> : <FileUp size={14} strokeWidth={3} />}
                <span className="hidden sm:inline">Excel</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${menuExcelAbierto ? 'rotate-180' : ''}`} />
              </button>

              {menuExcelAbierto && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-white border border-slate-100 shadow-xl rounded-2xl p-2 z-50 flex flex-col gap-1">
                  <button onClick={() => { fileInputRef.current.click(); setMenuExcelAbierto(false); }} className="flex w-full items-center gap-3 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl transition-colors text-left">
                    <Upload size={14} /> Subir Excel
                  </button>
                  <a href="/Plantilla_Activos_USIL.xlsx" download="Plantilla_Activos_USIL.xlsx" onClick={() => setMenuExcelAbierto(false)} className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors text-left">
                    <Download size={14} /> Plantilla
                  </a>
                  <button onClick={handleExportarExcel} disabled={exporting} className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-colors text-left disabled:opacity-50">
                    {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />} Exportar Todo
                  </button>
                </div>
              )}
            </div>

            {/* BOTÓN NUEVO */}
            <button 
              onClick={() => { setIsEditing(false); setFormData(initialFormState); setIsModalOpen(true); }}
              className="bg-[#2B59C3] text-white px-5 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-md hover:bg-blue-800 transition-all flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap h-10"
            >
              <Plus size={14} strokeWidth={3} /> Nuevo
            </button>
          </div>
        </div>
      </nav>

      {/* ================= TABLA DE ACTIVOS ================= */}
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col min-h-0">
        <div className="overflow-y-auto flex-1">
          <table className="w-full text-center border-collapse">
            <thead className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-md">
              <tr className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 border-b-2 border-slate-100">
                <th className="px-4 sm:px-6 py-4 text-center whitespace-nowrap">Código</th>
                <th className="px-4 sm:px-6 py-4 text-center whitespace-nowrap">Dispositivo</th>
                <th className="px-4 sm:px-6 py-4 text-center whitespace-nowrap">Serie</th>
                <th className="px-4 sm:px-6 py-4 text-center whitespace-nowrap">Categoría</th>
                <th className="px-4 sm:px-6 py-4 text-center whitespace-nowrap">Ubicación</th>
                <th className="px-4 sm:px-6 py-4 text-center whitespace-nowrap">Estado</th>
                <th className="px-4 sm:px-6 py-4 text-center whitespace-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activosPaginados.length > 0 ? (
                activosPaginados.map((activo) => (
                  <tr key={activo.id} className="hover:bg-blue-50/40 transition-colors group h-14">
                    <td className="px-4 sm:px-6 py-3 font-black text-[#2B59C3] italic text-xs text-center align-middle">
                      {activo.codigo}
                    </td>

                    <td className="px-4 sm:px-6 py-3 font-bold text-slate-700 text-xs text-center align-middle">
                      {activo.nombre} 
                      <span className="block text-[8px] text-slate-400 uppercase font-black tracking-widest mt-0.5">
                        {activo.marca} {activo.modelo}
                      </span>
                    </td>

                    <td className="px-4 sm:px-6 py-3 font-mono font-bold text-slate-500 text-[10px] text-center align-middle uppercase tracking-wider">
                      {activo.serie || '-'}
                    </td>

                    <td className="px-4 sm:px-6 py-3 text-center align-middle">
                      <span className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-wider border inline-block ${
                        activo.categoria === 'SEGURIDAD ELECTRÓNICA' 
                          ? 'bg-blue-50 text-blue-600 border-blue-100' 
                          : 'bg-orange-50 text-orange-600 border-orange-100'
                      }`}>
                        {activo.categoria === 'SEGURIDAD ELECTRÓNICA' ? 'ELECTRÓNICA' : 'INCENDIOS'}
                      </span>
                      <span className="block text-[7px] font-bold text-slate-400 mt-1 uppercase italic tracking-tighter">
                        {activo.sistema?.replace('SISTEMA ', '')}
                      </span>
                    </td>

                    <td className="px-4 sm:px-6 py-3 text-center align-middle">
                      <div className="flex flex-col items-center justify-center gap-0.5">
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest line-clamp-1">
                          {activo.ambiente?.piso?.pabellon?.sede?.nombre || 'N/A'} 
                        </span>
                        <span className="text-[9px] text-[#2B59C3] font-black uppercase tracking-tighter line-clamp-1">
                          {activo.ambiente?.nombre || 'General'}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 sm:px-6 py-3 text-center align-middle">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[8px] font-black uppercase whitespace-nowrap ${activo.estado === 'ACTIVO' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${activo.estado === 'ACTIVO' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                        {activo.estado}
                      </span>
                    </td>

                    <td className="px-4 sm:px-6 py-3 text-center align-middle">
                      <div className="flex justify-center gap-2 sm:opacity-20 group-hover:opacity-100 transition-all">
                        <button onClick={() => handleEdit(activo)} className="p-1.5 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => toggleEstado(activo.id, activo.estado)} className={`p-1.5 rounded-lg ${activo.estado === 'ACTIVO' ? 'text-slate-300 hover:text-red-600 hover:bg-red-50' : 'text-green-400 hover:text-green-600 hover:bg-green-50'}`}>
                          <Power size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400 font-bold text-xs">
                    {activosFiltrados.length === 0 ? 'No hay activos registrados en esta ubicación' : 'Cargando...'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINACIÓN */}
        {totalPaginas > 1 && (
          <div className="px-4 sm:px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div className="text-xs font-bold text-slate-500">
              Mostrando {indiceInicio + 1} a {Math.min(indiceFin, activosFiltrados.length)} de {activosFiltrados.length}
            </div>
            
            <div className="flex items-center justify-center gap-1">
              <button onClick={() => irAPagina(paginaActual - 1)} disabled={paginaActual === 1} className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-30 rounded-md">
                <ChevronLeft size={16} />
              </button>
              
              <div className="flex items-center gap-1">
                {(() => {
                  const pages = [];
                  for (let i = Math.max(2, paginaActual - 2); i <= Math.min(totalPaginas - 1, paginaActual + 2); i++) pages.push(i);
                  const result = [1];
                  if (pages[0] > 2) result.push('...');
                  result.push(...pages);
                  if (pages[pages.length - 1] < totalPaginas - 1) result.push('...');
                  if (totalPaginas > 1) result.push(totalPaginas);

                  return result.map((pagina, idx) =>
                    pagina === '...' ? <span key={`dots-${idx}`} className="px-1 text-slate-400 font-bold text-xs">…</span>
                      : <button key={pagina} onClick={() => irAPagina(pagina)} className={`px-2.5 py-1 rounded-md font-bold text-[10px] ${paginaActual === pagina ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                          {pagina}
                        </button>
                  );
                })()}
              </div>
              
              <button onClick={() => irAPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas} className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-30 rounded-md">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL DE CREACIÓN / EDICIÓN ================= */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" style={{ zIndex: 999999 }}>
          <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
              
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-[#2B59C3] text-white shrink-0">
                <h3 className="text-lg font-black uppercase italic tracking-tighter">
                  {isEditing ? 'Editar Activo' : 'Nuevo Registro'}
                </h3>
                <button type="button" onClick={() => setIsModalOpen(false)} className="hover:bg-white/20 rounded-full p-1.5 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
                
                {/* 1. JERARQUÍA DE UBICACIÓN */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#2B59C3] font-black text-xs uppercase tracking-widest border-b-2 border-slate-100 pb-2">
                    <MapPin size={16}/> Ubicación del Activo
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <SelectCascada label="Sede" options={sedesList} value={ubicacionSel.sedeId} onChange={(e) => handleSedeModalChange(e.target.value)} />
                    <SelectCascada label="Pabellón" options={pabellones} value={ubicacionSel.pabellonId} onChange={(e) => handlePabellonChange(e.target.value)} disabled={!ubicacionSel.sedeId} />
                    <SelectCascada label="Piso" options={pisos} value={ubicacionSel.pisoId} onChange={(e) => handlePisoChange(e.target.value)} disabled={!ubicacionSel.pabellonId} />
                    <SelectCascada label="Ambiente (Final)" options={ambientes} value={formData.ambienteId} onChange={(e) => setFormData({...formData, ambienteId: e.target.value})} disabled={!ubicacionSel.pisoId} />
                  </div>
                </div>

                {/* 2. DETALLES TÉCNICOS */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#2B59C3] font-black text-xs uppercase tracking-widest border-b-2 border-slate-100 pb-2">
                    <Package size={16}/> Detalles Técnicos
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectGeneral label="Categoría" value={formData.categoria} onChange={(e) => setFormData({...formData, categoria: e.target.value})}>
                      <option value="">- Seleccione -</option>
                      <option value="SEGURIDAD ELECTRÓNICA">SEGURIDAD ELECTRÓNICA</option>
                      <option value="SEGURIDAD CONTRA INCENDIOS">SEGURIDAD CONTRA INCENDIOS</option>
                    </SelectGeneral>
                    <SelectGeneral label="Sistema" value={formData.sistema} onChange={(e) => setFormData({...formData, sistema: e.target.value})} disabled={!formData.categoria}>
                      <option value="">- Seleccione -</option>
                      {formData.categoria === 'SEGURIDAD ELECTRÓNICA' && ['SISTEMA DETECCIÓN DE INCENDIOS', 'SISTEMA CCTV', 'SISTEMA CONTRA INTRUSIÓN', 'SISTEMA CONTROL DE ACCESOS'].map(s => <option key={s} value={s}>{s}</option>)}
                      {formData.categoria === 'SEGURIDAD CONTRA INCENDIOS' && ['SISTEMA EXTINCIÓN AUTOMÁTICA POR AGUA', 'SISTEMA EXTINCIÓN MANUAL', 'AGENTE LIMPIO'].map(s => <option key={s} value={s}>{s}</option>)}
                    </SelectGeneral>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputGeneral label="Dispositivo" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value.toUpperCase()})} />
                    <InputGeneral label="Marca" value={formData.marca} onChange={(e) => setFormData({...formData, marca: e.target.value.toUpperCase()})} />
                    <InputGeneral label="Modelo" value={formData.modelo} onChange={(e) => setFormData({...formData, modelo: e.target.value.toUpperCase()})} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                      <label className="text-[9px] font-black text-red-500 uppercase mb-1.5 block tracking-widest">Nro. Serie</label>
                      <input 
                        value={formData.serie} 
                        onChange={(e) => setFormData({...formData, serie: e.target.value.toUpperCase()})} 
                        placeholder="S/N..." 
                        className="w-full p-2.5 border-2 border-red-200 rounded-xl focus:border-red-500 outline-none font-bold text-xs uppercase bg-red-50/30" 
                      />
                    </div>

                    {formData.sistema?.includes('MANUAL') && (
                      <>
                        <InputGeneral label="N° Extintor" value={formData.detalle.numInterno} onChange={(e) => setFormData({...formData, detalle: {...formData.detalle, numInterno: e.target.value}})} />
                        <InputGeneral label="Año Fab." type="number" value={formData.detalle.fabricacion} onChange={(e) => setFormData({...formData, detalle: {...formData.detalle, fabricacion: e.target.value}})} />
                        <InputGeneral label="Peso (Lbs/Kg)" value={formData.detalle.capacidad} onChange={(e) => setFormData({...formData, detalle: {...formData.detalle, capacidad: e.target.value}})} />
                      </>
                    )}
                  </div>

                  {formData.sistema?.includes('MANUAL') && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 mt-2">
                      <SelectGeneral label="Tipo Servicio" value={formData.detalle.tipoUltimoServicio} onChange={(e) => setFormData({...formData, detalle: {...formData.detalle, tipoUltimoServicio: e.target.value}})}>
                        <option value="RECARGA">RECARGA</option>
                        <option value="MANTENIMIENTO">MANTENIMIENTO</option>
                      </SelectGeneral>
                      <InputGeneral label="Fecha Servicio" type="date" value={formData.detalle.fechaUltimoServicio} onChange={(e) => setFormData({...formData, detalle: {...formData.detalle, fechaUltimoServicio: e.target.value}})} />
                      <InputGeneral label="Fecha P.H." type="date" value={formData.detalle.fechaUltimaPH} onChange={(e) => setFormData({...formData, detalle: {...formData.detalle, fechaUltimaPH: e.target.value}})} />
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
                    <div className="lg:col-span-4 space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Camera size={12}/> Evidencia Visual
                      </label>
                      <div className="relative w-full h-36 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center">
                        {formData.foto ? (
                          <img src={typeof formData.foto === 'string' ? formData.foto : URL.createObjectURL(formData.foto)} alt="Evidencia" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center text-slate-300">
                            <Camera size={30} className="mx-auto mb-1" />
                            <p className="text-[8px] font-black uppercase">Sin Foto</p>
                          </div>
                        )}
                      </div>
                      <input type="file" accept="image/*" onChange={(e) => { if (e.target.files[0]) setFormData({ ...formData, foto: e.target.files[0] }); }} className="text-[9px] w-full p-2 border border-slate-100 rounded-lg file:bg-[#2B59C3] file:text-white file:border-none file:px-3 file:py-1 file:rounded-full file:text-[8px] file:font-black file:uppercase file:mr-2 cursor-pointer" />
                    </div>

                    <div className="lg:col-span-8 space-y-2">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <MessageSquare size={12}/> Observaciones
                      </label>
                      <textarea value={formData.observaciones || ""} onChange={(e) => setFormData({...formData, observaciones: e.target.value})} className="w-full p-4 border-2 border-slate-100 rounded-xl outline-none focus:border-blue-400 min-h-[144px] text-xs font-bold" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 font-black uppercase text-[10px] text-slate-500 bg-white border border-slate-200 rounded-xl hover:bg-slate-100">
                  Cancelar
                </button>
                <button type="submit" disabled={loading} className="px-8 py-2.5 bg-[#2B59C3] text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-md flex items-center gap-2 hover:bg-blue-800">
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
        , document.body
      )}
    </div>
  );
};

// COMPONENTES AUXILIARES
const SelectCascada = ({ label, options, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">{label}</label>
    <select {...props} className="w-full p-2.5 bg-white border border-slate-200 rounded-xl outline-none font-bold text-xs shadow-sm focus:border-[#2B59C3] disabled:opacity-50 disabled:bg-slate-50">
      <option value="">- Seleccione -</option>
      {options.map(opt => <option key={opt.id} value={opt.id}>{opt.nombre}</option>)}
    </select>
  </div>
);

const InputGeneral = ({ label, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">{label}</label>
    <input {...props} className="w-full p-2.5 border border-slate-200 rounded-xl focus:border-[#2B59C3] outline-none font-bold text-xs shadow-sm bg-white" />
  </div>
);

const SelectGeneral = ({ label, children, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">{label}</label>
    <select {...props} className="w-full p-2.5 border border-slate-200 rounded-xl outline-none font-bold text-xs shadow-sm focus:border-[#2B59C3] bg-white">{children}</select>
  </div>
);

export default InventarioContenido;