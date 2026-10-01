import React, { useState } from 'react';
import { BrandBriefingRecord } from '../../types/briefing';
import { 
  X, 
  ExternalLink, 
  Printer, 
  Copy, 
  Check, 
  Trash2, 
  MessageSquare
} from 'lucide-react';

interface AdminDetailModalProps {
  briefing: BrandBriefingRecord;
  onClose: () => void;
  onStatusChange: (status: BrandBriefingRecord['status']) => void;
  onNotesChange: (notes: string) => void;
  onDelete: (id: string) => void;
}

export const AdminDetailModal: React.FC<AdminDetailModalProps> = ({
  briefing,
  onClose,
  onStatusChange,
  onNotesChange,
  onDelete,
}) => {
  const [copied, setCopied] = useState(false);
  const [notes, setNotes] = useState(briefing.admin_notes || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const formattedDate = new Date(briefing.created_at).toLocaleString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleCopySummary = () => {
    const summary = `
FICHA DE BRIEFING — IDENZA
━━━━━━━━━━━━━━━━━━━━━━━━━━
Negocio: ${briefing.business_name || 'Sin nombre'}
Contacto: ${briefing.contact_name || '-'} (${briefing.contact_role || '-'})
WhatsApp: ${briefing.contact_whatsapp || '-'}
Redes / Web: ${briefing.contact_social_web || '-'}

Productos / Servicios:
${(briefing.products_sold || []).map((p) => `  • ${p}`).join('\n')}
${briefing.products_other ? `  • Otro: ${briefing.products_other}` : ''}

Clientes Principales:
${(briefing.target_clients || []).map((c) => `  • ${c}`).join('\n')}
Posicionamiento de Precio: ${briefing.pricing_comparison || '-'}
Por qué lo eligen: ${briefing.value_proposition || '-'}

Preferencias de Logo:
• Estado: ${briefing.has_current_logo || '-'}
• Estilo: ${briefing.logo_style_preference || '-'}
• Colores que gustan: ${briefing.colors_liked || '-'}
• Colores rechazados: ${briefing.colors_disliked || '-'}
• Referencias: ${briefing.benchmark_logos || '-'}

Aplicaciones de marca:
${(briefing.brand_touchpoints || []).map((t) => `  • ${t}`).join('\n')}
Fecha límite: ${briefing.deadline || 'No especificada'}
━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNotes = () => {
    setIsSavingNotes(true);
    onNotesChange(notes);
    setTimeout(() => setIsSavingNotes(false), 600);
  };

  const traits = briefing.personality_traits || {
    traditional_modern: 50,
    industrial_elegant: 50,
    formal_friendly: 50,
    economical_premium: 50,
    local_bigcorp: 50,
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-tinta/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="w-full max-w-3xl bg-blanco border border-tinta-border rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-tinta-border bg-blanco-hueso flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono tabular-nums text-tinta-muted">
                {formattedDate}
              </span>
              <span className="text-tinta-muted text-xs">•</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-tinta bg-ambar-light border border-ambar px-1.5 py-0.5 rounded font-semibold">
                {briefing.status}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-display font-medium text-tinta truncate">
              {briefing.business_name || 'Negocio sin nombre'}
            </h2>
            <p className="text-xs text-tinta-muted truncate">
              {briefing.contact_name} {briefing.contact_role ? `(${briefing.contact_role})` : ''}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleCopySummary}
              type="button"
              className="px-2.5 py-1.5 rounded-lg bg-blanco hover:bg-blanco-hover text-tinta-soft hover:text-tinta border border-tinta-border text-xs flex items-center gap-1 transition-colors shadow-sm"
              title="Copiar resumen"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-ambar-dark" /> : <Copy className="w-3.5 h-3.5 text-tinta-muted" />}
              <span className="hidden sm:inline">{copied ? 'Copiado' : 'Copiar'}</span>
            </button>

            <button
              onClick={() => window.print()}
              type="button"
              className="p-1.5 rounded-lg bg-blanco hover:bg-blanco-hover text-tinta-muted hover:text-tinta border border-tinta-border transition-colors shadow-sm"
              title="Imprimir"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-lg bg-blanco hover:bg-blanco-hover text-tinta-muted hover:text-tinta border border-tinta-border transition-colors shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 text-xs text-tinta-soft">
          {/* Status Bar */}
          <div className="bg-blanco-hueso border border-tinta-border rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase text-tinta-muted">Estado:</span>
              <select
                value={briefing.status}
                onChange={(e) => onStatusChange(e.target.value as any)}
                className="bg-blanco border border-tinta-borderDark rounded-md px-2.5 py-1 text-xs text-tinta focus:outline-none focus:border-ambar"
              >
                <option value="nuevo">Nuevo</option>
                <option value="en_revision">En revisión</option>
                <option value="en_diseno">En diseño</option>
                <option value="completado">Completado</option>
              </select>
            </div>

            {briefing.contact_whatsapp && (
              <a
                href={`https://wa.me/${briefing.contact_whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-tinta hover:text-ambar-dark font-medium underline"
              >
                <MessageSquare className="w-3.5 h-3.5 text-ambar-dark" />
                <span>WhatsApp: {briefing.contact_whatsapp}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* 01 El Negocio */}
          <div className="border border-tinta-border rounded-xl p-4 space-y-2 bg-blanco">
            <span className="font-mono text-[10px] uppercase text-tinta-muted block">01 / El Negocio</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-tinta-muted block">Nombre:</span>
                <p className="text-tinta font-medium">{briefing.business_name || '—'}</p>
              </div>
              <div>
                <span className="text-tinta-muted block">Tiempo de trabajo:</span>
                <p className="text-tinta">{briefing.years_operating || '—'}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-tinta-muted block">Ubicación y cobertura:</span>
                <p className="text-tinta">{briefing.location_scope || '—'}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-tinta-muted block mb-1">Productos:</span>
                <div className="flex flex-wrap gap-1">
                  {(briefing.products_sold || []).map((p, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-blanco-hueso border border-tinta-border text-tinta font-medium">
                      {p}
                    </span>
                  ))}
                  {briefing.products_other && (
                    <span className="px-2 py-0.5 rounded bg-ambar-light border border-ambar text-tinta font-medium">
                      Otro: {briefing.products_other}
                    </span>
                  )}
                </div>
              </div>
              {briefing.business_story && (
                <div className="sm:col-span-2 bg-blanco-hueso p-2.5 rounded-lg border border-tinta-border">
                  <span className="text-tinta-muted block mb-0.5">Historia del negocio:</span>
                  <p className="text-tinta leading-relaxed italic">{briefing.business_story}</p>
                </div>
              )}
            </div>
          </div>

          {/* 02 Sus Clientes */}
          <div className="border border-tinta-border rounded-xl p-4 space-y-2 bg-blanco">
            <span className="font-mono text-[10px] uppercase text-tinta-muted block">02 / Sus Clientes</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <span className="text-tinta-muted block mb-1">A quién venden:</span>
                <div className="flex flex-wrap gap-1">
                  {(briefing.target_clients || []).map((c, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-blanco-hueso border border-tinta-border text-tinta font-medium">
                      {c}
                    </span>
                  ))}
                  {briefing.target_clients_other && (
                    <span className="px-2 py-0.5 rounded bg-ambar-light border border-ambar text-tinta font-medium">
                      Otro: {briefing.target_clients_other}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <span className="text-tinta-muted block">Nivel de precio:</span>
                <p className="text-tinta font-medium">{briefing.pricing_comparison || '—'}</p>
              </div>
              <div>
                <span className="text-tinta-muted block">Dudas frecuentes:</span>
                <p className="text-tinta">{briefing.pre_purchase_questions || '—'}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-tinta-muted block">Por qué lo eligen:</span>
                <p className="text-tinta">{briefing.value_proposition || '—'}</p>
              </div>
            </div>
          </div>

          {/* 03 La Competencia */}
          <div className="border border-tinta-border rounded-xl p-4 space-y-2 bg-blanco">
            <span className="font-mono text-[10px] uppercase text-tinta-muted block">03 / La Competencia</span>
            <div className="space-y-2">
              <div>
                <span className="text-tinta-muted block">Competidores:</span>
                <p className="text-tinta whitespace-pre-wrap">{briefing.competitors || '—'}</p>
              </div>
              <div>
                <span className="text-tinta-muted block">Lo que nunca harían:</span>
                <p className="text-tinta whitespace-pre-wrap">{briefing.competitors_dealbreakers || '—'}</p>
              </div>
            </div>
          </div>

          {/* 04 La Personalidad */}
          <div className="border border-tinta-border rounded-xl p-4 space-y-3 bg-blanco">
            <span className="font-mono text-[10px] uppercase text-tinta-muted block">04 / Personalidad</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-tinta-muted block">Tres palabras:</span>
                <p className="text-tinta font-semibold">{briefing.brand_words || '—'}</p>
              </div>
              <div>
                <span className="text-tinta-muted block">Como persona:</span>
                <p className="text-tinta">{briefing.business_as_person || '—'}</p>
              </div>
            </div>

            {/* Visualizer Sliders */}
            <div className="space-y-2 pt-1 border-t border-tinta-border">
              {[
                { left: 'Tradicional', right: 'Moderno', val: traits.traditional_modern },
                { left: 'Industrial, rudo', right: 'Elegante, fino', val: traits.industrial_elegant },
                { left: 'Serio, formal', right: 'Cercano, amigable', val: traits.formal_friendly },
                { left: 'Económico', right: 'Premium', val: traits.economical_premium },
                { left: 'Local, de barrio', right: 'Gran empresa', val: traits.local_bigcorp },
              ].map((item, idx) => (
                <div key={idx} className="bg-blanco-hueso p-2.5 rounded-lg border border-tinta-border">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className={item.val < 45 ? 'text-tinta font-semibold' : 'text-tinta-muted'}>
                      {item.left}
                    </span>
                    <span className="font-mono tabular-nums text-tinta font-medium">{item.val}%</span>
                    <span className={item.val > 55 ? 'text-tinta font-semibold' : 'text-tinta-muted'}>
                      {item.right}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-tinta-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-ambar"
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 05 El Logo & Referencias */}
          <div className="border border-tinta-border rounded-xl p-4 space-y-3 bg-blanco">
            <span className="font-mono text-[10px] uppercase text-tinta-muted block">05 / El Logo</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-tinta-muted block">Estado actual:</span>
                <p className="text-tinta font-medium">{briefing.has_current_logo || '—'}</p>
                {briefing.current_logo_changes && (
                  <p className="text-tinta-muted mt-0.5 italic">"{briefing.current_logo_changes}"</p>
                )}
              </div>
              <div>
                <span className="text-tinta-muted block">Estilo preferido:</span>
                <p className="text-tinta font-medium">{briefing.logo_style_preference || '—'}</p>
              </div>
              <div>
                <span className="text-tinta-muted block">Colores que gustan:</span>
                <p className="text-tinta">{briefing.colors_liked || '—'}</p>
              </div>
              <div>
                <span className="text-tinta-muted block">Colores que NO quieren:</span>
                <p className="text-tinta">{briefing.colors_disliked || '—'}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-tinta-muted block">Marcas de referencia:</span>
                <p className="text-tinta whitespace-pre-wrap">{briefing.benchmark_logos || '—'}</p>
              </div>
            </div>

            {/* Images */}
            {briefing.reference_images && briefing.reference_images.length > 0 && (
              <div className="pt-2 border-t border-tinta-border">
                <span className="text-tinta-muted block mb-2 font-mono tabular-nums">
                  Fotos adjuntas ({briefing.reference_images.length}):
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {briefing.reference_images.map((img, idx) => (
                    <a
                      key={idx}
                      href={img.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square rounded-lg overflow-hidden bg-blanco-hueso border border-tinta-border shadow-xs"
                      title={img.name}
                    >
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-tinta/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ExternalLink className="w-3.5 h-3.5 text-blanco" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 06 Aplicaciones */}
          <div className="border border-tinta-border rounded-xl p-4 space-y-2 bg-blanco">
            <span className="font-mono text-[10px] uppercase text-tinta-muted block">06 / Aplicaciones y Tiempos</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-tinta-muted block mb-1">Puntos de contacto:</span>
                <div className="flex flex-wrap gap-1">
                  {(briefing.brand_touchpoints || []).map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-blanco-hueso border border-tinta-border text-tinta font-medium">
                      {t}
                    </span>
                  ))}
                  {briefing.brand_touchpoints_other && (
                    <span className="px-2 py-0.5 rounded bg-ambar-light border border-ambar text-tinta font-medium">
                      Otro: {briefing.brand_touchpoints_other}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <span className="text-tinta-muted block">Fecha límite:</span>
                <p className="text-tinta font-medium">{briefing.deadline || 'Sin fecha específica'}</p>
              </div>
            </div>
          </div>

          {/* 07 Datos del Cliente */}
          <div className="border border-tinta-border rounded-xl p-4 space-y-2 bg-blanco">
            <span className="font-mono text-[10px] uppercase text-tinta-muted block">07 / Datos del Cliente</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-tinta-muted block">Nombre:</span>
                <p className="text-tinta font-medium">{briefing.contact_name}</p>
              </div>
              <div>
                <span className="text-tinta-muted block">Cargo:</span>
                <p className="text-tinta">{briefing.contact_role || '—'}</p>
              </div>
              <div>
                <span className="text-tinta-muted block">WhatsApp:</span>
                <p className="text-tinta font-mono tabular-nums font-semibold">{briefing.contact_whatsapp}</p>
              </div>
              <div>
                <span className="text-tinta-muted block">Redes / Web:</span>
                <p className="text-tinta">{briefing.contact_social_web || '—'}</p>
              </div>
              {briefing.additional_notes && (
                <div className="sm:col-span-2 bg-blanco-hueso p-2.5 rounded-lg border border-tinta-border">
                  <span className="text-tinta-muted block mb-0.5">Notas adicionales:</span>
                  <p className="text-tinta whitespace-pre-wrap">{briefing.additional_notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Notas internas */}
          <div className="bg-blanco-hueso border border-tinta-border rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase text-tinta-muted">
                Notas internas del equipo IDENZA
              </span>
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="text-[11px] px-2.5 py-0.5 rounded bg-blanco hover:bg-blanco-hover border border-tinta-border text-tinta shadow-xs"
              >
                {isSavingNotes ? 'Guardando...' : 'Guardar notas'}
              </button>
            </div>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anotaciones privadas del proyecto..."
              className="w-full px-3 py-2 bg-blanco border border-tinta-borderDark rounded-lg text-tinta placeholder-tinta-subtle text-xs focus:outline-none focus:border-ambar"
            />
          </div>

          {/* Footer actions */}
          <div className="pt-2 flex items-center justify-between border-t border-tinta-border">
            {confirmDelete ? (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-rose-600 font-medium">¿Eliminar registro?</span>
                <button
                  type="button"
                  onClick={() => onDelete(briefing.id)}
                  className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white text-[11px]"
                >
                  Sí, eliminar
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="px-2 py-1 rounded bg-blanco border border-tinta-border text-tinta text-[11px]"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="text-[11px] text-tinta-muted hover:text-rose-600 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Eliminar</span>
              </button>
            )}

            <button
              onClick={onClose}
              type="button"
              className="px-4 py-1.5 rounded-lg bg-blanco hover:bg-blanco-hover border border-tinta-border text-tinta text-xs shadow-xs"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
