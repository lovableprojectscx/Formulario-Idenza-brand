import React, { useState } from 'react';
import { BrandBriefingRecord } from '../../types/briefing';
import { 
  X, 
  Phone, 
  Calendar, 
  ExternalLink, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Trash2, 
  Building2, 
  Users, 
  Crosshair, 
  Sparkles, 
  Palette, 
  Tag, 
  UserCheck, 
  FileText,
  Sliders,
  AlertCircle
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

  const formattedDate = new Date(briefing.created_at).toLocaleString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleCopySummary = () => {
    const summary = `
📋 BRIEFING DE MARCA DENZA
━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 Negocio: ${briefing.business_name || 'Sin nombre'}
👤 Contacto: ${briefing.contact_name || '-'} (${briefing.contact_role || '-'})
📱 WhatsApp: ${briefing.contact_whatsapp || '-'}
🌐 Redes / Web: ${briefing.contact_social_web || '-'}

🛠️ Productos / Servicios:
${(briefing.products_sold || []).map((p) => `  • ${p}`).join('\n')}
${briefing.products_other ? `  • Otro: ${briefing.products_other}` : ''}

🎯 Clientes Principales:
${(briefing.target_clients || []).map((c) => `  • ${c}`).join('\n')}
💰 Posicionamiento de Precio: ${briefing.pricing_comparison || '-'}
⭐ Por qué lo eligen: ${briefing.value_proposition || '-'}

🎨 Preferencias de Logo:
• Estado: ${briefing.has_current_logo || '-'}
• Estilo: ${briefing.logo_style_preference || '-'}
• Colores que gustan: ${briefing.colors_liked || '-'}
• Colores que NO quiere: ${briefing.colors_disliked || '-'}
• Marcas de referencia: ${briefing.benchmark_logos || '-'}

📌 Aplicaciones:
${(briefing.brand_touchpoints || []).map((t) => `  • ${t}`).join('\n')}
⏰ Fecha límite: ${briefing.deadline || 'No especificada'}
━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveNotes = () => {
    setIsSavingNotes(true);
    onNotesChange(notes);
    setTimeout(() => setIsSavingNotes(false), 800);
  };

  const traits = briefing.personality_traits || {
    traditional_modern: 50,
    industrial_elegant: 50,
    formal_friendly: 50,
    economical_premium: 50,
    local_bigcorp: 50,
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-mono text-slate-400">
                Recibido el {formattedDate}
              </span>
              <span className="text-xs text-slate-600">•</span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                  briefing.status === 'nuevo'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : briefing.status === 'en_revision'
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    : briefing.status === 'en_diseno'
                    ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}
              >
                {briefing.status === 'nuevo'
                  ? 'Nuevo'
                  : briefing.status === 'en_revision'
                  ? 'En revisión'
                  : briefing.status === 'en_diseno'
                  ? 'En diseño'
                  : 'Completado'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white truncate">
              {briefing.business_name || 'Negocio sin nombre registrado'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 truncate">
              Contacto: {briefing.contact_name} {briefing.contact_role ? `(${briefing.contact_role})` : ''}
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopySummary}
              type="button"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-all"
              title="Copiar resumen para WhatsApp"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-blue-400" />}
              <span className="hidden sm:inline">{copied ? '¡Copiado!' : 'Copiar Ficha'}</span>
            </button>

            <button
              onClick={() => window.print()}
              type="button"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition-all"
              title="Imprimir ficha"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-all"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm">
          {/* Status & Quick WhatsApp bar */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Estado del Briefing:
              </label>
              <select
                value={briefing.status}
                onChange={(e) => onStatusChange(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-medium text-white focus:outline-none focus:border-blue-500"
              >
                <option value="nuevo">🟡 Nuevo</option>
                <option value="en_revision">🔵 En revisión</option>
                <option value="en_diseno">🟣 En diseño</option>
                <option value="completado">🟢 Completado</option>
              </select>
            </div>

            {briefing.contact_whatsapp && (
              <a
                href={`https://wa.me/${briefing.contact_whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-medium transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Abrir chat de WhatsApp ({briefing.contact_whatsapp})</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* 01 El Negocio */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm border-b border-slate-800 pb-2">
              <Building2 className="w-4 h-4" />
              <span>01 / El Negocio</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">Nombre del negocio:</span>
                <p className="text-slate-200 font-semibold text-sm">{briefing.business_name || 'No especificado'}</p>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Tiempo operando:</span>
                <p className="text-slate-200">{briefing.years_operating || 'No especificado'}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block mb-0.5">Ubicación y cobertura:</span>
                <p className="text-slate-200">{briefing.location_scope || 'No especificado'}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block mb-1">Productos que fabrican o venden:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(briefing.products_sold || []).map((p, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {p}
                    </span>
                  ))}
                  {briefing.products_other && (
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      Otro: {briefing.products_other}
                    </span>
                  )}
                  {(!briefing.products_sold || briefing.products_sold.length === 0) && !briefing.products_other && (
                    <span className="text-slate-500 italic">No seleccionaron productos</span>
                  )}
                </div>
              </div>
              {briefing.business_story && (
                <div className="sm:col-span-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-amber-400 font-medium block mb-1 text-[11px]">Cómo empezó el negocio:</span>
                  <p className="text-slate-300 leading-relaxed text-xs italic">"{briefing.business_story}"</p>
                </div>
              )}
            </div>
          </div>

          {/* 02 Sus Clientes */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm border-b border-slate-800 pb-2">
              <Users className="w-4 h-4" />
              <span>02 / Sus Clientes</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <span className="text-slate-500 block mb-1">A quién le venden más:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(briefing.target_clients || []).map((c, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {c}
                    </span>
                  ))}
                  {briefing.target_clients_other && (
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      Otro: {briefing.target_clients_other}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Precios comparados con la competencia:</span>
                <p className="text-slate-200 font-medium">{briefing.pricing_comparison || 'No especificado'}</p>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Dudas antes de comprar:</span>
                <p className="text-slate-200">{briefing.pre_purchase_questions || 'No especificado'}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block mb-0.5">Por qué lo eligen a usted y no a otro:</span>
                <p className="text-slate-200 font-medium">{briefing.value_proposition || 'No especificado'}</p>
              </div>
            </div>
          </div>

          {/* 03 La Competencia */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm border-b border-slate-800 pb-2">
              <Crosshair className="w-4 h-4" />
              <span>03 / La Competencia</span>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">Competidores directos / páginas:</span>
                <p className="text-slate-200 whitespace-pre-wrap">{briefing.competitors || 'No especificado'}</p>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Qué hacen ellos que nunca haría:</span>
                <p className="text-rose-300 font-medium whitespace-pre-wrap">{briefing.competitors_dealbreakers || 'No especificado'}</p>
              </div>
            </div>
          </div>

          {/* 04 La Personalidad & Sliders */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm border-b border-slate-800 pb-2">
              <Sparkles className="w-4 h-4" />
              <span>04 / Personalidad y Tono</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">Tres palabras clave:</span>
                <p className="text-amber-300 font-bold text-sm">{briefing.brand_words || 'No especificado'}</p>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Si fuera una persona sería:</span>
                <p className="text-slate-200">{briefing.business_as_person || 'No especificado'}</p>
              </div>
            </div>

            {/* Slider visualizer */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Calibración de identidad visual
              </span>

              {[
                { left: 'Tradicional', right: 'Moderno', val: traits.traditional_modern },
                { left: 'Industrial, rudo', right: 'Elegante, fino', val: traits.industrial_elegant },
                { left: 'Serio, formal', right: 'Cercano, amigable', val: traits.formal_friendly },
                { left: 'Económico', right: 'Premium', val: traits.economical_premium },
                { left: 'Local, de barrio', right: 'Gran empresa', val: traits.local_bigcorp },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className={item.val < 45 ? 'text-blue-400 font-bold' : 'text-slate-400'}>
                      {item.left}
                    </span>
                    <span className="font-mono text-slate-500 text-[10px]">{item.val}%</span>
                    <span className={item.val > 55 ? 'text-amber-400 font-bold' : 'text-slate-400'}>
                      {item.right}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-amber-500 rounded-full"
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 05 El Logo & Imágenes de referencia */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm border-b border-slate-800 pb-2">
              <Palette className="w-4 h-4" />
              <span>05 / El Logo y Referencias</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">Situación actual de logo:</span>
                <p className="text-slate-200 font-semibold">{briefing.has_current_logo || 'No especificado'}</p>
                {briefing.current_logo_changes && (
                  <p className="text-slate-400 mt-1 italic">"{briefing.current_logo_changes}"</p>
                )}
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Tipo de logo preferido:</span>
                <p className="text-blue-300 font-semibold">{briefing.logo_style_preference || 'No especificado'}</p>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Colores que le gustan:</span>
                <p className="text-emerald-300 font-medium">{briefing.colors_liked || 'No especificado'}</p>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Colores que NO quiere:</span>
                <p className="text-rose-400 font-medium">{briefing.colors_disliked || 'No especificado'}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 block mb-0.5">Logos o marcas de referencia:</span>
                <p className="text-slate-200 whitespace-pre-wrap">{briefing.benchmark_logos || 'No especificado'}</p>
              </div>
            </div>

            {/* Reference Images Gallery */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Imágenes y fotos subidas ({briefing.reference_images?.length || 0})
                </span>
              </div>

              {briefing.reference_images && briefing.reference_images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {briefing.reference_images.map((img, idx) => (
                    <div
                      key={idx}
                      className="group relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow"
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <a
                          href={img.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow"
                          title="Abrir imagen completa"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No se adjuntaron fotos de referencia.</p>
              )}
            </div>
          </div>

          {/* 06 Aplicaciones de la Marca */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm border-b border-slate-800 pb-2">
              <Tag className="w-4 h-4" />
              <span>06 / Aplicaciones y Tiempos</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block mb-1">Dónde se va a usar la marca:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(briefing.brand_touchpoints || []).map((t, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {t}
                    </span>
                  ))}
                  {briefing.brand_touchpoints_other && (
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      Otro: {briefing.brand_touchpoints_other}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Fecha límite o urgencia:</span>
                <p className="text-amber-300 font-semibold">{briefing.deadline || 'Sin fecha específica'}</p>
              </div>
            </div>
          </div>

          {/* 07 Datos de Contacto y Notas Adicionales */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm border-b border-slate-800 pb-2">
              <UserCheck className="w-4 h-4" />
              <span>07 / Datos del Cliente</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">Nombre:</span>
                <p className="text-slate-200 font-semibold text-sm">{briefing.contact_name}</p>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Cargo:</span>
                <p className="text-slate-200">{briefing.contact_role || 'No indicado'}</p>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">WhatsApp:</span>
                <p className="text-emerald-400 font-mono font-medium">{briefing.contact_whatsapp}</p>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Redes / Web:</span>
                <p className="text-slate-200">{briefing.contact_social_web || 'No indicado'}</p>
              </div>
              {briefing.additional_notes && (
                <div className="sm:col-span-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 font-medium block mb-1 text-[11px]">Notas adicionales del cliente:</span>
                  <p className="text-slate-200 whitespace-pre-wrap">{briefing.additional_notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Notas internas del equipo */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Notas Internas del Equipo</span>
              </label>
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="text-xs px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
              >
                {isSavingNotes ? 'Guardando...' : 'Guardar Notas'}
              </button>
            </div>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Escriba aquí notas para el equipo de diseño (ej. 'Ya se contactó por WhatsApp, preferencia por tipografía pesada en negro y amarillo')..."
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-xs focus:outline-none focus:border-blue-500 leading-relaxed"
            />
          </div>

          {/* Danger zone: Delete */}
          <div className="pt-2 flex justify-between items-center border-t border-slate-800/80">
            {confirmDelete ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-rose-400 font-medium">¿Seguro que desea eliminar esta ficha?</span>
                <button
                  type="button"
                  onClick={() => onDelete(briefing.id)}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
                >
                  Confirmar eliminación
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar este registro</span>
              </button>
            )}

            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
