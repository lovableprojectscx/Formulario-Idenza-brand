import React from 'react';
import { BrandBriefingData, PersonalityTraits } from '../../types/briefing';
import { Sparkles, Sliders, MessageSquareQuote } from 'lucide-react';

interface StepProps {
  data: BrandBriefingData;
  onChange: (updates: Partial<BrandBriefingData>) => void;
}

interface SliderDefinition {
  key: keyof PersonalityTraits;
  leftLabel: string;
  leftDesc: string;
  rightLabel: string;
  rightDesc: string;
}

const SLIDERS: SliderDefinition[] = [
  {
    key: 'traditional_modern',
    leftLabel: 'Tradicional',
    leftDesc: 'Clásico, historia, método artesanal',
    rightLabel: 'Moderno',
    rightDesc: 'Vanguardista, tecnológico, actual',
  },
  {
    key: 'industrial_elegant',
    leftLabel: 'Industrial, rudo',
    leftDesc: 'Metal pesado, fuerza, taller rudo',
    rightLabel: 'Elegante, fino',
    rightDesc: 'Líneas limpias, acabados delicados, diseño de autor',
  },
  {
    key: 'formal_friendly',
    leftLabel: 'Serio, formal',
    leftDesc: 'Protocolar, corporativo, sobrio',
    rightLabel: 'Cercano, amigable',
    rightDesc: 'Cálido, accesible, de confianza directa',
  },
  {
    key: 'economical_premium',
    leftLabel: 'Económico',
    leftDesc: 'Volumen accesible, precio imbatible',
    rightLabel: 'Premium',
    rightDesc: 'Exclusivo, alta gama, materiales selectos',
  },
  {
    key: 'local_bigcorp',
    leftLabel: 'Local, de barrio',
    leftDesc: 'Trato personalizado cara a cara',
    rightLabel: 'Gran empresa',
    rightDesc: 'Escala nacional o corporativa de gran envergadura',
  },
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
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-blue-400 font-mono text-sm uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Parte 04</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          La personalidad
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Si su negocio fuera una persona, ¿cómo hablaría, vestiría y se presentaría ante el mundo?
        </p>
      </div>

      <div className="space-y-7">
        {/* Si su negocio fuera una persona, ¿cómo sería? */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1.5">
            Si su negocio fuera una persona, ¿cómo sería?
          </label>
          <p className="text-xs text-slate-400 mb-2">
            Descríbalo como a un conocido: ¿Es un maestro experimentado de pocas palabras? ¿Un joven innovador y dinámico? ¿Un ingeniero minucioso?
          </p>
          <textarea
            rows={2}
            value={data.business_as_person}
            onChange={(e) => onChange({ business_as_person: e.target.value })}
            placeholder="Ej. Un profesional de 40 años, bien vestido pero sin corbata, que conoce el metal a fondo y da la mano con firmeza..."
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm leading-relaxed"
          />
        </div>

        {/* Tres palabras que describan su negocio */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <MessageSquareQuote className="w-4 h-4 text-blue-400" />
            <label className="text-sm font-medium text-slate-200">
              Tres palabras que describan su negocio
            </label>
          </div>
          <p className="text-xs text-slate-400 mb-2">
            Ej. Resistente, puntual, serio (o las que mejor reflejen su espíritu)
          </p>
          <input
            type="text"
            value={data.brand_words}
            onChange={(e) => onChange({ brand_words: e.target.value })}
            placeholder="Ej. Resistente, puntual, profesional"
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
          />
        </div>

        {/* Barras de calibración */}
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <label className="text-sm font-semibold text-slate-100">
              Mueva cada barra hacia donde se sienta más cerca
            </label>
          </div>
          <p className="text-xs text-slate-400 mb-5">
            Deslice el selector hacia el extremo que mejor encaje con la identidad que busca proyectar.
          </p>

          <div className="space-y-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-6">
            {SLIDERS.map((slider) => {
              const val = traits[slider.key] ?? 50;

              return (
                <div key={slider.key} className="space-y-2">
                  {/* Labels on sides */}
                  <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
                    <div className="text-left max-w-[45%]">
                      <span className={`${val < 45 ? 'text-blue-400 font-bold' : 'text-slate-300'}`}>
                        {slider.leftLabel}
                      </span>
                      <p className="text-[11px] text-slate-500 font-normal hidden sm:block">
                        {slider.leftDesc}
                      </p>
                    </div>

                    <div className="text-center px-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                        {val === 50 ? 'Punto medio' : val < 50 ? `${50 - val}% hacia izq.` : `${val - 50}% hacia der.`}
                      </span>
                    </div>

                    <div className="text-right max-w-[45%]">
                      <span className={`${val > 55 ? 'text-amber-400 font-bold' : 'text-slate-300'}`}>
                        {slider.rightLabel}
                      </span>
                      <p className="text-[11px] text-slate-500 font-normal hidden sm:block">
                        {slider.rightDesc}
                      </p>
                    </div>
                  </div>

                  {/* Range input */}
                  <div className="relative flex items-center py-1">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={val}
                      onChange={(e) => handleSliderChange(slider.key, Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
