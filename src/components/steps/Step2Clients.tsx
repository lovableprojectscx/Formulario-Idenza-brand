import React from 'react';
import { BrandBriefingData } from '../../types/briefing';
import { Users, Check, BadgeDollarSign } from 'lucide-react';

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
  {
    id: 'Más económicos',
    label: 'Más económicos',
    desc: 'Buscamos ser la opción más accesible por costo',
  },
  {
    id: 'Parecidos',
    label: 'Parecidos',
    desc: 'Precios competitivos dentro del promedio del mercado',
  },
  {
    id: 'Más caros, mejor calidad',
    label: 'Más caros, mejor calidad',
    desc: 'Mayor grosor de chapa, acabados superiores y mayor garantía',
  },
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
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-blue-400 font-mono text-sm uppercase tracking-wider mb-1">
          <Users className="w-4 h-4" />
          <span>Parte 02</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Sus clientes
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Para que la marca le hable directamente a quien realmente le compra y toma decisiones.
        </p>
      </div>

      <div className="space-y-6">
        {/* ¿A quién le venden más? */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1.5">
            ¿A quién le venden más?
          </label>
          <p className="text-xs text-slate-400 mb-3">
            Marque los clientes principales con los que hacen negocio frecuentemente.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {TARGET_CLIENTS_OPTIONS.map((item) => {
              const isSelected = (data.target_clients || []).includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleClient(item)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-blue-600/15 border-blue-500/60 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <span>{item}</span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'border-slate-700 bg-slate-800/80'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3">
            <input
              type="text"
              value={data.target_clients_other}
              onChange={(e) => onChange({ target_clients_other: e.target.value })}
              placeholder="¿Algún otro tipo de cliente? Escríbalo aquí..."
              className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-800/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* ¿Por qué lo eligen a usted y no a otro? */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1.5">
            ¿Por qué lo eligen a usted y no a otro?
          </label>
          <p className="text-xs text-slate-400 mb-2">
            Lo que sus clientes le dicen: precio, resistencia, rapidez de entrega, acabado de pintura, garantía…
          </p>
          <textarea
            rows={3}
            value={data.value_proposition}
            onChange={(e) => onChange({ value_proposition: e.target.value })}
            placeholder="Ej. Porque cumplimos la fecha de entrega al 100%, soldamos con mayor solidez y la pintura al horno no se raya fácilmente..."
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm leading-relaxed"
          />
        </div>

        {/* ¿Qué le preguntan antes de comprar? */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1.5">
            ¿Qué le preguntan antes de comprar?
          </label>
          <p className="text-xs text-slate-400 mb-2">
            Las dudas o exigencias más comunes que siempre surgen en la llamada o visita.
          </p>
          <textarea
            rows={2}
            value={data.pre_purchase_questions}
            onChange={(e) => onChange({ pre_purchase_questions: e.target.value })}
            placeholder="Ej. Si aguanta peso, si viene armado o desarmado, cuánto tarda el envío a provincia, si entregamos factura o ficha técnica..."
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm leading-relaxed"
          />
        </div>

        {/* Sus precios comparados con la competencia */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <BadgeDollarSign className="w-4 h-4 text-emerald-400" />
            <label className="text-sm font-medium text-slate-200">
              Sus precios comparados con la competencia
            </label>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Seleccione el posicionamiento donde se ubica su propuesta de valor.
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
                      ? 'bg-blue-600/15 border-blue-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{item.label}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-slate-700 bg-slate-800'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">{item.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
