import React, { useState, useEffect } from 'react';
import { BrandBriefingRecord } from '../../types/briefing';
import { 
  fetchAllBriefings, 
  updateBriefingStatus, 
  deleteBriefing 
} from '../../lib/api';
import { AdminDetailModal } from './AdminDetailModal';
import { IdenzaLogo } from '../IdenzaLogo';
import { 
  Search, 
  RefreshCw, 
  LogOut, 
  ArrowLeft,
  Image as ImageIcon
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
      alert('Error al actualizar estado');
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
      alert('Error guardando notas');
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
    <div className="min-h-screen bg-blanco-hueso text-tinta flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-tinta-border bg-blanco/95 backdrop-blur-sm px-4 sm:px-8 py-3 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <IdenzaLogo size="sm" />

          <div className="h-4 w-px bg-tinta-border hidden sm:block" />

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs text-tinta-muted hover:text-tinta transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ver formulario</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="px-2.5 py-1.5 rounded-lg bg-blanco hover:bg-blanco-hover text-tinta-soft hover:text-tinta border border-tinta-border text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            title="Actualizar datos"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-ambar-dark' : ''}`} />
            <span className="hidden sm:inline">Actualizar</span>
          </button>

          <button
            onClick={onLogout}
            className="px-2.5 py-1.5 rounded-lg bg-blanco hover:bg-blanco-hover text-tinta-muted hover:text-rose-600 border border-tinta-border text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            title="Cerrar sesión"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Title & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-tinta-border pb-5">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-tinta-muted block mb-1">
              Administración
            </span>
            <h1 className="text-xl sm:text-2xl font-display font-medium text-tinta">
              Panel de Recepción
            </h1>
            <p className="text-xs text-tinta-muted mt-0.5">
              Respuestas y referencias enviadas por clientes.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-tinta-muted">
            <span>Total: <strong className="text-tinta font-semibold">{totalCount}</strong></span>
            <span>•</span>
            <span>Nuevos: <strong className="text-ambar-dark font-semibold">{newCount}</strong></span>
            <span>•</span>
            <span>En diseño: <strong className="text-tinta font-semibold">{inDesignCount}</strong></span>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-tinta-subtle absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por negocio, cliente o WhatsApp..."
              className="w-full pl-8 pr-3 py-2 bg-blanco border border-tinta-borderDark rounded-lg text-xs text-tinta placeholder-tinta-subtle focus:outline-none focus:border-ambar transition-colors shadow-sm"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto text-xs">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'nuevo', label: 'Nuevos' },
              { id: 'en_revision', label: 'En revisión' },
              { id: 'en_diseno', label: 'En diseño' },
              { id: 'completado', label: 'Completados' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  statusFilter === tab.id
                    ? 'bg-ambar text-tinta font-semibold shadow-xs'
                    : 'bg-blanco text-tinta-muted hover:text-tinta border border-tinta-border shadow-xs'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="py-12 text-center text-xs text-tinta-muted">
            <RefreshCw className="w-5 h-5 text-ambar-dark animate-spin mx-auto mb-2" />
            <span>Cargando datos...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="border border-tinta-border bg-blanco rounded-xl p-10 text-center text-xs text-tinta-muted shadow-sm">
            {totalCount === 0 ? 'Aún no se han recibido formularios.' : 'No se encontraron resultados para la búsqueda.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((item) => {
              const formattedDate = new Date(item.created_at).toLocaleDateString('es-PE', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedBriefing(item)}
                  className="bg-blanco hover:bg-blanco-hover border border-tinta-border hover:border-ambar rounded-xl p-4 cursor-pointer transition-all shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-2">
                      <span className="font-mono tabular-nums text-tinta-muted">{formattedDate}</span>
                      <span className="font-mono uppercase text-[10px] text-tinta bg-ambar-light border border-ambar px-1.5 py-0.5 rounded font-semibold">
                        {item.status}
                      </span>
                    </div>

                    <h3 className="text-sm font-display font-medium text-tinta truncate mb-0.5">
                      {item.business_name || 'Negocio sin nombre'}
                    </h3>
                    <p className="text-xs text-tinta-muted truncate mb-3">
                      {item.contact_name} {item.contact_role ? `• ${item.contact_role}` : ''}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {(item.products_sold || []).slice(0, 3).map((p, idx) => (
                        <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-blanco-hueso border border-tinta-border text-tinta-soft">
                          {p}
                        </span>
                      ))}
                      {(item.products_sold || []).length > 3 && (
                        <span className="text-[10px] px-1 py-0.5 rounded bg-blanco-hueso text-tinta-muted font-mono">
                          +{item.products_sold.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-tinta-border flex items-center justify-between text-[11px] text-tinta-muted">
                    <span className="font-mono tabular-nums">{item.contact_whatsapp || '—'}</span>
                    <div className="flex items-center gap-1.5">
                      {item.reference_images && item.reference_images.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-tinta-muted">
                          <ImageIcon className="w-3 h-3 text-ambar-dark" />
                          <span>{item.reference_images.length}</span>
                        </span>
                      )}
                      <span className="text-tinta font-semibold">Ver →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

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
