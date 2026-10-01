import React, { useState, useEffect } from 'react';
import { BrandBriefingRecord } from '../../types/briefing';
import { 
  fetchAllBriefings, 
  updateBriefingStatus, 
  deleteBriefing 
} from '../../lib/api';
import { AdminDetailModal } from './AdminDetailModal';
import { 
  ShieldCheck, 
  Search, 
  RefreshCw, 
  LogOut, 
  Eye, 
  Phone, 
  Building2, 
  Calendar, 
  ArrowLeft,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  Palette,
  ExternalLink,
  Layers
} from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onLogout }) => {
  const [briefings, setBriefings] = useState<BrandBriefingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedBriefing, setSelectedBriefing] = useState<BrandBriefingRecord | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllBriefings();
      setBriefings(data);
    } catch (err) {
      console.error('Error cargando briefings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: BrandBriefingRecord['status']) => {
    try {
      await updateBriefingStatus(id, newStatus);
      setBriefings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
      if (selectedBriefing && selectedBriefing.id === id) {
        setSelectedBriefing({ ...selectedBriefing, status: newStatus });
      }
    } catch (err) {
      alert('Error actualizando estado en Supabase');
    }
  };

  const handleNotesChange = async (id: string, notes: string) => {
    try {
      const current = briefings.find((b) => b.id === id);
      if (!current) return;
      await updateBriefingStatus(id, current.status, notes);
      setBriefings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, admin_notes: notes } : b))
      );
      if (selectedBriefing && selectedBriefing.id === id) {
        setSelectedBriefing({ ...selectedBriefing, admin_notes: notes });
      }
    } catch (err) {
      alert('Error guardando notas en Supabase');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBriefing(id);
      setBriefings((prev) => prev.filter((b) => b.id !== id));
      setSelectedBriefing(null);
    } catch (err) {
      alert('Error al eliminar registro');
    }
  };

  // Filtered list
  const filtered = briefings.filter((item) => {
    const matchesSearch =
      (item.business_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.contact_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.contact_whatsapp || '').includes(search) ||
      (item.contact_role || '').toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalCount = briefings.length;
  const newCount = briefings.filter((b) => b.status === 'nuevo').length;
  const inReviewCount = briefings.filter((b) => b.status === 'en_revision').length;
  const inDesignCount = briefings.filter((b) => b.status === 'en_diseno').length;
  const completedCount = briefings.filter((b) => b.status === 'completado').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ver formulario cliente</span>
          </button>

          <div className="h-4 w-px bg-slate-800" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight leading-none">
                Panel de Recepción Denza
              </h1>
              <span className="text-[11px] text-slate-400">
                Briefings de clientes recibidos
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={loadData}
            disabled={loading}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1.5 transition-all"
            title="Recargar datos"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-blue-400' : ''}`} />
            <span className="hidden sm:inline">Actualizar</span>
          </button>

          <button
            onClick={onLogout}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-500/30 text-xs flex items-center gap-1.5 transition-colors"
            title="Cerrar sesión de administrador"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <button
            onClick={() => setStatusFilter('all')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              statusFilter === 'all'
                ? 'bg-slate-900 border-blue-500/50 shadow-md ring-1 ring-blue-500/20'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Total recibidos</span>
              <Layers className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">{totalCount}</div>
          </button>

          <button
            onClick={() => setStatusFilter('nuevo')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              statusFilter === 'nuevo'
                ? 'bg-amber-950/20 border-amber-500/50 shadow-md ring-1 ring-amber-500/20'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-amber-400/90 mb-1">
              <span>Nuevos</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-400 font-mono">{newCount}</div>
          </button>

          <button
            onClick={() => setStatusFilter('en_revision')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              statusFilter === 'en_revision'
                ? 'bg-blue-950/20 border-blue-500/50 shadow-md ring-1 ring-blue-500/20'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-blue-400/90 mb-1">
              <span>En revisión</span>
              <Eye className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-400 font-mono">{inReviewCount}</div>
          </button>

          <button
            onClick={() => setStatusFilter('en_diseno')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              statusFilter === 'en_diseno'
                ? 'bg-indigo-950/20 border-indigo-500/50 shadow-md ring-1 ring-indigo-500/20'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-indigo-400/90 mb-1">
              <span>En diseño</span>
              <Palette className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-indigo-400 font-mono">{inDesignCount}</div>
          </button>

          <button
            onClick={() => setStatusFilter('completado')}
            className={`p-3.5 rounded-2xl border text-left transition-all col-span-2 sm:col-span-1 ${
              statusFilter === 'completado'
                ? 'bg-emerald-950/20 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/20'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-emerald-400/90 mb-1">
              <span>Completados</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400 font-mono">{completedCount}</div>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por negocio, nombre de cliente o WhatsApp..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['all', 'nuevo', 'en_revision', 'en_diseno', 'completado'].map((statusKey) => (
              <button
                key={statusKey}
                onClick={() => setStatusFilter(statusKey)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  statusFilter === statusKey
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {statusKey === 'all'
                  ? 'Todos'
                  : statusKey === 'nuevo'
                  ? 'Nuevos'
                  : statusKey === 'en_revision'
                  ? 'En revisión'
                  : statusKey === 'en_diseno'
                  ? 'En diseño'
                  : 'Completados'}
              </button>
            ))}
          </div>
        </div>

        {/* Briefings List */}
        {loading ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center">
            <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" />
            <p className="text-slate-300 font-medium">Cargando briefings de clientes...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-12 text-center">
            <Building2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-300 mb-1">
              {totalCount === 0 ? 'Aún no se han recibido formularios' : 'No se encontraron resultados'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {totalCount === 0
                ? 'Comparta el enlace del formulario con sus clientes para comenzar a recibir sus respuestas.'
                : 'Intente buscar con otro término o cambie el filtro de estado.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => {
              const formattedDate = new Date(item.created_at).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedBriefing(item)}
                  className="group bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-5 cursor-pointer transition-all hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Date + Status */}
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="text-slate-500 font-mono">{formattedDate}</span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                          item.status === 'nuevo'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : item.status === 'en_revision'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            : item.status === 'en_diseno'
                            ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}
                      >
                        {item.status === 'nuevo'
                          ? 'Nuevo'
                          : item.status === 'en_revision'
                          ? 'En revisión'
                          : item.status === 'en_diseno'
                          ? 'En diseño'
                          : 'Completado'}
                      </span>
                    </div>

                    {/* Business Name & Contact */}
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 mb-1">
                      {item.business_name || 'Negocio sin nombre'}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium mb-3">
                      {item.contact_name} {item.contact_role ? `• ${item.contact_role}` : ''}
                    </p>

                    {/* Products tags preview */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {(item.products_sold || []).slice(0, 3).map((p, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          {p}
                        </span>
                      ))}
                      {(item.products_sold || []).length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 font-mono">
                          +{item.products_sold.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: WhatsApp & Images Info */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                      <Phone className="w-3 h-3" />
                      <span>{item.contact_whatsapp || 'Sin WhatsApp'}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {item.reference_images && item.reference_images.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          <ImageIcon className="w-3 h-3 text-blue-400" />
                          <span>{item.reference_images.length}</span>
                        </span>
                      )}
                      <span className="text-blue-400 group-hover:translate-x-0.5 transition-transform font-medium">
                        Ver ficha →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Selected Briefing Detail Modal */}
      {selectedBriefing && (
        <AdminDetailModal
          briefing={selectedBriefing}
          onClose={() => setSelectedBriefing(null)}
          onStatusChange={(newStatus) => handleStatusChange(selectedBriefing.id, newStatus)}
          onNotesChange={(notes) => handleNotesChange(selectedBriefing.id, notes)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
