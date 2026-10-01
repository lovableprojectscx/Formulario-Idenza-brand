import React from 'react';
import { BrandBriefingData } from '../../types/briefing';
import { Check } from 'lucide-react';

interface StepProps {
  data: BrandBriefingData;
  onChange: (updates: Partial<BrandBriefingData>) => void;
}

const TOUCHPOINTS = [
  'Letrero del local',
  'Placa en los muebles',
  'Uniformes',
  'Camioneta',
  'Cotizaciones y facturas',
  'Redes sociales',
  'Página web',
  'Catálogo impreso',
];

export const Step6Touchpoints: React.FC<StepProps> = ({ data, onChange }) => {
  const toggleTouchpoint = (item: string) => {
    const current = data.brand_touchpoints || [];
    if (current.includes(item)) {
      onChange({ brand_touchpoints: current.filter((t) => t !== item) });
    } else {
      onChange({ brand_touchpoints: [...current, item] });
    }
  };

  return (
    <div className="space-y-7 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-tinta-border pb-4">
        <span className="text-xs font-mono tabular-nums text-blanco-dim uppercase tracking-wider block mb-1">
          Parte 06
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-medium text-blanco tracking-tight">
          Dónde va a ir la marca
        </h2>
        <p className="text-blanco-muted text-sm mt-1">
          El logo tiene que verse bien en todos estos lugares.
        </p>
      </div>

      <div className="space-y-6">
        {/* Marque los lugares donde se va a usar */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
            Marque los lugares donde se va a usar
          </label>
          <p className="text-xs text-blanco-dim mb-3">
            Seleccione todas las aplicaciones que apliquen a su caso.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {TOUCHPOINTS.map((item) => {
              const isSelected = (data.brand_touchpoints || []).includes(item);

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleTouchpoint(item)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left text-sm transition-all ${
                    isSelected
                      ? 'bg-tinta-hover border-ambar/70 text-blanco font-medium'
                      : 'bg-tinta-surface border-tinta-border text-blanco-muted hover:border-tinta-borderActive hover:text-blanco'
                  }`}
                >
                  <span>{item}</span>
                  <div
                    className={`w-4 h-4 rounded-[3px] flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-ambar border-ambar text-tinta'
                        : 'border-tinta-border bg-tinta'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-2.5">
            <input
              type="text"
              value={data.brand_touchpoints_other}
              onChange={(e) => onChange({ brand_touchpoints_other: e.target.value })}
              placeholder="Otro lugar de aplicación..."
              className="w-full px-4 py-2.5 bg-tinta-surface border border-tinta-border rounded-xl text-blanco placeholder-blanco-dim text-xs sm:text-sm focus:outline-none focus:border-ambar transition-colors"
            />
          </div>
        </div>

        {/* ¿Para cuándo lo necesita? */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
            ¿Para cuándo lo necesita?
          </label>
          <p className="text-xs text-blanco-dim mb-2">
            Ej. Antes de una licitación, fin de mes…
          </p>
          <input
            type="text"
            value={data.deadline}
            onChange={(e) => onChange({ deadline: e.target.value })}
            placeholder="Ej. Antes de fin de mes"
            className="w-full px-4 py-3 bg-tinta-surface border border-tinta-border rounded-xl text-blanco placeholder-blanco-dim text-sm focus:outline-none focus:border-ambar transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
