import React from 'react';
import { BrandBriefingData } from '../../types/briefing';
import { Check } from 'lucide-react';

interface StepProps {
  data: BrandBriefingData;
  onChange: (updates: Partial<BrandBriefingData>) => void;
}

const TARGET_CLIENTS_OPTIONS = [
  'Empresas y oficinas',
  'Instituciones públicas',
  'Colegios y universidades',
  'Clínicas y hospitales',
  'Tiendas y almacenes',
  'Personas particulares',
];

const PRICING_OPTIONS = [
  { id: 'Más económicos', label: 'Más económicos', desc: 'Precios por debajo del mercado' },
  { id: 'Parecidos', label: 'Parecidos', desc: 'Dentro del promedio de la competencia' },
  { id: 'Más caros, mejor calidad', label: 'Más caros, mejor calidad', desc: 'Mayor grosor, mejores acabados y garantía' },
];

export const Step2Clients: React.FC<StepProps> = ({ data, onChange }) => {
  const toggleClient = (item: string) => {
    const current = data.target_clients || [];
    if (current.includes(item)) {
      onChange({ target_clients: current.filter((c) => c !== item) });
    } else {
      onChange({ target_clients: [...current, item] });
    }
  };

  return (
    <div className="space-y-7 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-tinta-border pb-4">
        <span className="text-xs font-mono tabular-nums text-tinta-muted uppercase tracking-wider block mb-1">
          Parte 02
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-medium text-tinta tracking-tight">
          Sus clientes
        </h2>
        <p className="text-tinta-muted text-sm mt-1">
          Para que la marca le hable a quien le compra.
        </p>
      </div>

      <div className="space-y-6">
        {/* ¿A quién le venden más? */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-tinta-soft mb-1">
            ¿A quién le venden más?
          </label>
          <p className="text-xs text-tinta-muted mb-3">
            Marque los clientes principales de su negocio.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {TARGET_CLIENTS_OPTIONS.map((item) => {
              const isSelected = (data.target_clients || []).includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleClient(item)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-left text-sm transition-all ${
                    isSelected
                      ? 'bg-ambar-subtle border-ambar text-tinta font-medium shadow-sm'
                      : 'bg-blanco border-tinta-border text-tinta-soft hover:border-tinta-borderDark hover:bg-blanco-hover'
                  }`}
                >
                  <span>{item}</span>
                  <div
                    className={`w-4 h-4 rounded-[3px] flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-ambar border-ambar text-tinta'
                        : 'border-tinta-borderDark bg-blanco'
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
              value={data.target_clients_other}
              onChange={(e) => onChange({ target_clients_other: e.target.value })}
              placeholder="Otro tipo de cliente..."
              className="w-full px-4 py-2.5 bg-blanco border border-tinta-borderDark rounded-xl text-tinta placeholder-tinta-subtle text-xs sm:text-sm focus:outline-none focus:border-ambar transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* ¿Por qué lo eligen a usted y no a otro? */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-tinta-soft mb-1">
            ¿Por qué lo eligen a usted y no a otro?
          </label>
          <p className="text-xs text-tinta-muted mb-2">
            Lo que sus clientes le dicen: precio, resistencia, rapidez, acabado, garantía…
          </p>
          <textarea
            rows={3}
            value={data.value_proposition}
            onChange={(e) => onChange({ value_proposition: e.target.value })}
            placeholder="Lo que más valoran sus compradores habituales..."
            className="w-full px-4 py-3 bg-blanco border border-tinta-borderDark rounded-xl text-tinta placeholder-tinta-subtle text-sm leading-relaxed focus:outline-none focus:border-ambar transition-colors shadow-sm"
          />
        </div>

        {/* ¿Qué le preguntan antes de comprar? */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-tinta-soft mb-1">
            ¿Qué le preguntan antes de comprar?
          </label>
          <p className="text-xs text-tinta-muted mb-2">
            Las dudas o exigencias más habituales de sus clientes.
          </p>
          <textarea
            rows={2}
            value={data.pre_purchase_questions}
            onChange={(e) => onChange({ pre_purchase_questions: e.target.value })}
            placeholder="Ej. Si aguanta peso, si entregan a domicilio, tiempo de fabricación..."
            className="w-full px-4 py-3 bg-blanco border border-tinta-borderDark rounded-xl text-tinta placeholder-tinta-subtle text-sm leading-relaxed focus:outline-none focus:border-ambar transition-colors shadow-sm"
          />
        </div>

        {/* Sus precios comparados con la competencia */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-tinta-soft mb-1">
            Sus precios comparados con la competencia
          </label>
          <p className="text-xs text-tinta-muted mb-3">
            Seleccione la opción más precisa.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRICING_OPTIONS.map((item) => {
              const isSelected = data.pricing_comparison === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChange({ pricing_comparison: item.id })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-ambar-subtle border-ambar text-tinta font-medium shadow-sm'
                      : 'bg-blanco border-tinta-border text-tinta-soft hover:border-tinta-borderDark hover:bg-blanco-hover'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.label}</span>
                    <div
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-ambar bg-ambar'
                          : 'border-tinta-borderDark bg-blanco'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-tinta" />}
                    </div>
                  </div>
                  <p className="text-xs text-tinta-muted leading-snug">{item.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
