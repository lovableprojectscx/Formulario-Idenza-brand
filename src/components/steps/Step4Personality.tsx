import React from 'react';
import { BrandBriefingData, PersonalityTraits } from '../../types/briefing';

interface StepProps {
  data: BrandBriefingData;
  onChange: (updates: Partial<BrandBriefingData>) => void;
}

interface SliderItem {
  key: keyof PersonalityTraits;
  left: string;
  right: string;
}

const SLIDERS: SliderItem[] = [
  { key: 'traditional_modern', left: 'Tradicional', right: 'Moderno' },
  { key: 'industrial_elegant', left: 'Industrial, rudo', right: 'Elegante, fino' },
  { key: 'formal_friendly', left: 'Serio, formal', right: 'Cercano, amigable' },
  { key: 'economical_premium', left: 'Económico', right: 'Premium' },
  { key: 'local_bigcorp', left: 'Local, de barrio', right: 'Gran empresa' },
];

export const Step4Personality: React.FC<StepProps> = ({ data, onChange }) => {
  const traits = data.personality_traits || {
    traditional_modern: 50,
    industrial_elegant: 50,
    formal_friendly: 50,
    economical_premium: 50,
    local_bigcorp: 50,
  };

  const handleSliderChange = (key: keyof PersonalityTraits, val: number) => {
    onChange({
      personality_traits: {
        ...traits,
        [key]: val,
      },
    });
  };

  return (
    <div className="space-y-7 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-tinta-border pb-4">
        <span className="text-xs font-mono tabular-nums text-tinta-muted uppercase tracking-wider block mb-1">
          Parte 04
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-medium text-tinta tracking-tight">
          La personalidad
        </h2>
        <p className="text-tinta-muted text-sm mt-1">
          Si su negocio fuera una persona, ¿cómo sería?
        </p>
      </div>

      <div className="space-y-6">
        {/* Si su negocio fuera una persona, ¿cómo sería? */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-tinta-soft mb-1">
            Si su negocio fuera una persona, ¿cómo sería?
          </label>
          <p className="text-xs text-tinta-muted mb-2">
            Descríbalo como si hablara de alguien conocido: su carácter, trato, vestimenta o actitud.
          </p>
          <textarea
            rows={2}
            value={data.business_as_person}
            onChange={(e) => onChange({ business_as_person: e.target.value })}
            placeholder="Ej. Un maestro experimentado, serio pero accesible, que da la mano con firmeza..."
            className="w-full px-4 py-3 bg-blanco border border-tinta-borderDark rounded-xl text-tinta placeholder-tinta-subtle text-sm leading-relaxed focus:outline-none focus:border-ambar transition-colors shadow-sm"
          />
        </div>

        {/* Tres palabras que describan su negocio */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-tinta-soft mb-1">
            Tres palabras que describan su negocio
          </label>
          <p className="text-xs text-tinta-muted mb-2">
            Ej. Resistente, puntual, serio
          </p>
          <input
            type="text"
            value={data.brand_words}
            onChange={(e) => onChange({ brand_words: e.target.value })}
            placeholder="Ej. Resistente, puntual, serio"
            className="w-full px-4 py-3 bg-blanco border border-tinta-borderDark rounded-xl text-tinta placeholder-tinta-subtle text-sm focus:outline-none focus:border-ambar transition-colors shadow-sm"
          />
        </div>

        {/* Mueva cada barra */}
        <div className="pt-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-tinta-soft mb-1">
            Mueva cada barra hacia donde se sienta más cerca
          </label>
          <p className="text-xs text-tinta-muted mb-4">
            Ajuste el indicador según el carácter que desea proyectar.
          </p>

          <div className="space-y-5 bg-blanco-hueso border border-tinta-border rounded-2xl p-5 sm:p-6">
            {SLIDERS.map((slider) => {
              const val = traits[slider.key] ?? 50;

              return (
                <div key={slider.key} className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className={val < 45 ? 'text-tinta font-semibold' : 'text-tinta-muted'}>
                      {slider.left}
                    </span>

                    <span className="font-mono text-[11px] tabular-nums text-tinta px-2 py-0.5 rounded bg-blanco border border-tinta-border shadow-xs">
                      {val}%
                    </span>

                    <span className={val > 55 ? 'text-tinta font-semibold' : 'text-tinta-muted'}>
                      {slider.right}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={val}
                    onChange={(e) => handleSliderChange(slider.key, Number(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
