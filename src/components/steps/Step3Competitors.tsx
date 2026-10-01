import React from 'react';
import { BrandBriefingData } from '../../types/briefing';

interface StepProps {
  data: BrandBriefingData;
  onChange: (updates: Partial<BrandBriefingData>) => void;
}

export const Step3Competitors: React.FC<StepProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-7 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-tinta-border pb-4">
        <span className="text-xs font-mono tabular-nums text-blanco-dim uppercase tracking-wider block mb-1">
          Parte 03
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-medium text-blanco tracking-tight">
          La competencia
        </h2>
        <p className="text-blanco-muted text-sm mt-1">
          Para no parecernos a ellos.
        </p>
      </div>

      <div className="space-y-6">
        {/* ¿Quiénes son sus competidores? */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
            ¿Quiénes son sus competidores?
          </label>
          <p className="text-xs text-blanco-dim mb-2">
            Nombres, y si puede, su Facebook o página.
          </p>
          <textarea
            rows={3}
            value={data.competitors}
            onChange={(e) => onChange({ competitors: e.target.value })}
            placeholder="Nombres o enlaces de competidores en su ciudad o rubro..."
            className="w-full px-4 py-3 bg-tinta-surface border border-tinta-border rounded-xl text-blanco placeholder-blanco-dim text-sm leading-relaxed focus:outline-none focus:border-ambar transition-colors"
          />
        </div>

        {/* ¿Qué hacen ellos que usted no haría nunca? */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
            ¿Qué hacen ellos que usted no haría nunca?
          </label>
          <p className="text-xs text-blanco-dim mb-2">
            Prácticas o acabados de la competencia que usted rechaza tajantemente.
          </p>
          <textarea
            rows={3}
            value={data.competitors_dealbreakers}
            onChange={(e) => onChange({ competitors_dealbreakers: e.target.value })}
            placeholder="Ej. Bajar calibres de metal sin avisar, usar pintura de baja calidad, incumplir plazos..."
            className="w-full px-4 py-3 bg-tinta-surface border border-tinta-border rounded-xl text-blanco placeholder-blanco-dim text-sm leading-relaxed focus:outline-none focus:border-ambar transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
