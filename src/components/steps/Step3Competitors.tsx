import React from 'react';
import { BrandBriefingData } from '../../types/briefing';
import { Crosshair, AlertTriangle, ShieldCheck } from 'lucide-react';

interface StepProps {
  data: BrandBriefingData;
  onChange: (updates: Partial<BrandBriefingData>) => void;
}

export const Step3Competitors: React.FC<StepProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-blue-400 font-mono text-sm uppercase tracking-wider mb-1">
          <Crosshair className="w-4 h-4" />
          <span>Parte 03</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          La competencia
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Para no parecernos a ellos y destacar lo que lo hace auténtico en su rubro.
        </p>
      </div>

      <div className="space-y-6">
        {/* ¿Quiénes son sus competidores? */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1.5">
            ¿Quiénes son sus competidores?
          </label>
          <p className="text-xs text-slate-400 mb-2">
            Nombres de empresas o talleres similares, y si puede, pegue su Facebook o enlace web.
          </p>
          <textarea
            rows={3}
            value={data.competitors}
            onChange={(e) => onChange({ competitors: e.target.value })}
            placeholder="Ej. Estructuras Metálicas San José (facebook.com/sanjosemetal), Mobiliario Andino, etc."
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm leading-relaxed"
          />
        </div>

        {/* ¿Qué hacen ellos que usted no haría nunca? */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <label className="text-sm font-medium text-slate-200">
              ¿Qué hacen ellos que usted no haría nunca?
            </label>
          </div>
          <p className="text-xs text-slate-400 mb-2">
            Malas prácticas del mercado que usted evita: rebajar calibres de tubos sin avisar, usar pintura barata, demoras sin avisar, no dar garantía…
          </p>
          <textarea
            rows={3}
            value={data.competitors_dealbreakers}
            onChange={(e) => onChange({ competitors_dealbreakers: e.target.value })}
            placeholder="Ej. Vender planchas delgadas como si fueran de alto tránsito, dejar los bordes de metal filosos o no responder cuando un cliente tiene un reclamo..."
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm leading-relaxed"
          />
          <div className="mt-2.5 flex items-center gap-2 text-xs text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Esto nos ayuda a construir una marca con valores sólidos y creíbles para sus clientes.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
