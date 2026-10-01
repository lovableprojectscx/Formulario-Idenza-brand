import React from 'react';
import { BrandBriefingData } from '../../types/briefing';
import { 
  UserCheck, 
  Send, 
  Loader2, 
  Phone, 
  Globe, 
  Briefcase, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

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
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-blue-400 font-mono text-sm uppercase tracking-wider mb-1">
          <UserCheck className="w-4 h-4" />
          <span>Parte 07</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Sus datos
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Para saber con quién hablamos y contactarlo con los avances y propuestas de diseño.
        </p>
      </div>

      <div className="space-y-6">
        {/* Grid: Nombre y Cargo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Su nombre */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1.5">
              Su nombre <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              required
              value={data.contact_name}
              onChange={(e) => onChange({ contact_name: e.target.value })}
              placeholder="Ej. Carlos Mendoza"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
            />
          </div>

          {/* Cargo */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <label className="text-sm font-medium text-slate-200">
                Cargo
              </label>
            </div>
            <p className="text-xs text-slate-400 mb-2">
              Dueño, gerente general, encargado de compras…
            </p>
            <input
              type="text"
              value={data.contact_role}
              onChange={(e) => onChange({ contact_role: e.target.value })}
              placeholder="Ej. Dueño y Gerente General"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Grid: WhatsApp y Redes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* WhatsApp */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <label className="text-sm font-medium text-slate-200">
                WhatsApp <span className="text-amber-400">*</span>
              </label>
            </div>
            <p className="text-xs text-slate-400 mb-2">
              Número con código para coordinar por chat o llamada
            </p>
            <input
              type="tel"
              required
              value={data.contact_whatsapp}
              onChange={(e) => onChange({ contact_whatsapp: e.target.value })}
              placeholder="+51 987 654 321"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm font-mono"
            />
          </div>

          {/* Facebook, Instagram o web del negocio */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <label className="text-sm font-medium text-slate-200">
                Facebook, Instagram o web
              </label>
            </div>
            <p className="text-xs text-slate-400 mb-2">
              Enlaces a sus perfiles actuales si ya los tiene
            </p>
            <input
              type="text"
              value={data.contact_social_web}
              onChange={(e) => onChange({ contact_social_web: e.target.value })}
              placeholder="Ej. instagram.com/miempresa o www.empresa.com"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* ¿Algo más que quiera contarnos? */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <label className="text-sm font-medium text-slate-200">
              ¿Algo más que quiera contarnos?
            </label>
          </div>
          <p className="text-xs text-slate-400 mb-2">
            Cualquier detalle que no hayamos preguntado pero que sea importante para usted.
          </p>
          <textarea
            rows={3}
            value={data.additional_notes}
            onChange={(e) => onChange({ additional_notes: e.target.value })}
            placeholder="Ej. Me gustaría que el logo tenga fuerza cuando se grabe con láser sobre metal, o tenemos proyectado abrir una sucursal pronto..."
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm leading-relaxed"
          />
        </div>

        {/* Submit Error banner if any */}
        {submitError && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm">
            {submitError}
          </div>
        )}

        {/* Security & privacy assurance */}
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            Sus respuestas son confidenciales y serán usadas exclusivamente por el equipo de diseño de Denza para crear su propuesta de identidad visual.
          </span>
        </div>

        {/* Main CTA: Terminar y enviar mis respuestas */}
        <div className="pt-4">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="w-full group relative flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-600 hover:from-blue-500 hover:via-indigo-500 hover:to-amber-500 text-white font-bold text-base sm:text-lg shadow-xl shadow-blue-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Guardando y enviando respuestas...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                <span>Terminar y enviar mis respuestas</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
