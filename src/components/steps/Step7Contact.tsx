import React from 'react';
import { BrandBriefingData } from '../../types/briefing';
import { Loader2 } from 'lucide-react';

interface StepProps {
  data: BrandBriefingData;
  onChange: (updates: Partial<BrandBriefingData>) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError: string | null;
}

export const Step7Contact: React.FC<StepProps> = ({
  data,
  onChange,
  onSubmit,
  isSubmitting,
  submitError,
}) => {
  return (
    <div className="space-y-7 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-tinta-border pb-4">
        <span className="text-xs font-mono tabular-nums text-blanco-dim uppercase tracking-wider block mb-1">
          Parte 07
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-medium text-blanco tracking-tight">
          Sus datos
        </h2>
        <p className="text-blanco-muted text-sm mt-1">
          Para saber con quién hablamos.
        </p>
      </div>

      <div className="space-y-6">
        {/* Grid: Nombre y Cargo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Su nombre */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
              Su nombre <span className="text-ambar">*</span>
            </label>
            <input
              type="text"
              required
              value={data.contact_name}
              onChange={(e) => onChange({ contact_name: e.target.value })}
              placeholder="Ej. Carlos Mendoza"
              className="w-full px-4 py-3 bg-tinta-surface border border-tinta-border rounded-xl text-blanco placeholder-blanco-dim text-sm focus:outline-none focus:border-ambar transition-colors"
            />
          </div>

          {/* Cargo */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
              Cargo
            </label>
            <p className="text-xs text-blanco-dim mb-2">
              Dueño, gerente…
            </p>
            <input
              type="text"
              value={data.contact_role}
              onChange={(e) => onChange({ contact_role: e.target.value })}
              placeholder="Ej. Dueño"
              className="w-full px-4 py-3 bg-tinta-surface border border-tinta-border rounded-xl text-blanco placeholder-blanco-dim text-sm focus:outline-none focus:border-ambar transition-colors"
            />
          </div>
        </div>

        {/* Grid: WhatsApp y Redes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* WhatsApp */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
              WhatsApp <span className="text-ambar">*</span>
            </label>
            <p className="text-xs text-blanco-dim mb-2">
              Número para coordinar avances.
            </p>
            <input
              type="tel"
              required
              value={data.contact_whatsapp}
              onChange={(e) => onChange({ contact_whatsapp: e.target.value })}
              placeholder="+51 987 654 321"
              className="w-full px-4 py-3 bg-tinta-surface border border-tinta-border rounded-xl text-blanco placeholder-blanco-dim text-sm font-mono tabular-nums focus:outline-none focus:border-ambar transition-colors"
            />
          </div>

          {/* Facebook, Instagram o web del negocio */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
              Facebook, Instagram o web
            </label>
            <p className="text-xs text-blanco-dim mb-2">
              Página actual del negocio si tiene.
            </p>
            <input
              type="text"
              value={data.contact_social_web}
              onChange={(e) => onChange({ contact_social_web: e.target.value })}
              placeholder="facebook.com/miempresa"
              className="w-full px-4 py-3 bg-tinta-surface border border-tinta-border rounded-xl text-blanco placeholder-blanco-dim text-sm focus:outline-none focus:border-ambar transition-colors"
            />
          </div>
        </div>

        {/* ¿Algo más que quiera contarnos? */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
            ¿Algo más que quiera contarnos?
          </label>
          <p className="text-xs text-blanco-dim mb-2">
            Cualquier observación o detalle adicional.
          </p>
          <textarea
            rows={3}
            value={data.additional_notes}
            onChange={(e) => onChange({ additional_notes: e.target.value })}
            placeholder="Escriba aquí cualquier detalle adicional..."
            className="w-full px-4 py-3 bg-tinta-surface border border-tinta-border rounded-xl text-blanco placeholder-blanco-dim text-sm leading-relaxed focus:outline-none focus:border-ambar transition-colors"
          />
        </div>

        {submitError && (
          <p className="text-xs text-rose-400">
            {submitError}
          </p>
        )}

        {/* Primary CTA (Amber on Ink, authoritative and clean) */}
        <div className="pt-3">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-ambar hover:bg-ambar-hover text-tinta font-display font-bold text-base transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-tinta" />
                <span>Enviando respuestas...</span>
              </>
            ) : (
              <span>Terminar y enviar mis respuestas</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
