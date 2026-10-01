import React from 'react';
import { BrandBriefingData } from '../../types/briefing';
import { Building2, Check, Sparkles } from 'lucide-react';

interface StepProps {
  data: BrandBriefingData;
  onChange: (updates: Partial<BrandBriefingData>) => void;
}

const PRODUCTS_OPTIONS = [
  'Escritorios',
  'Sillas',
  'Archivadores y lockers',
  'Estantería metálica',
  'Mobiliario escolar',
  'Hospitales o laboratorios',
  'Estructuras metálicas',
  'Trabajos a medida',
];

export const Step1Business: React.FC<StepProps> = ({ data, onChange }) => {
  const toggleProduct = (item: string) => {
    const current = data.products_sold || [];
    if (current.includes(item)) {
      onChange({ products_sold: current.filter((p) => p !== item) });
    } else {
      onChange({ products_sold: [...current, item] });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-blue-400 font-mono text-sm uppercase tracking-wider mb-1">
          <Building2 className="w-4 h-4" />
          <span>Parte 01</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          El negocio
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Lo básico para entender qué hacen y capturar la esencia de su trabajo.
        </p>
      </div>

      {/* Fields */}
      <div className="space-y-6">
        {/* Nombre del negocio */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1.5">
            Nombre del negocio
          </label>
          <p className="text-xs text-slate-400 mb-2">
            Si todavía no tiene nombre o quiere cambiarlo, dígalo aquí.
          </p>
          <input
            type="text"
            value={data.business_name}
            onChange={(e) => onChange({ business_name: e.target.value })}
            placeholder="Ej. Industrias Metálicas Denza / Sin nombre definitivo aún"
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
          />
        </div>

        {/* ¿Qué fabrican o venden? */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1.5">
            ¿Qué fabrican o venden?
          </label>
          <p className="text-xs text-slate-400 mb-3">
            Marque todo lo que aplique a su producción actual o futura.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRODUCTS_OPTIONS.map((item) => {
              const isSelected = (data.products_sold || []).includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleProduct(item)}
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
              value={data.products_other}
              onChange={(e) => onChange({ products_other: e.target.value })}
              placeholder="¿Fabrican algo más? Especifíquelo aquí..."
              className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-800/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Grid: Años operando y Ubicación */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* ¿Desde cuándo trabajan? */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1.5">
              ¿Desde cuándo trabajan?
            </label>
            <p className="text-xs text-slate-400 mb-2">
              Ej. 2015, o hace 8 años, o estamos empezando
            </p>
            <input
              type="text"
              value={data.years_operating}
              onChange={(e) => onChange({ years_operating: e.target.value })}
              placeholder="Ej. Desde 2018"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
            />
          </div>

          {/* ¿Dónde están y hasta dónde llegan? */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1.5">
              ¿Dónde están y hasta dónde llegan?
            </label>
            <p className="text-xs text-slate-400 mb-2">
              Ciudad base, envíos a nivel nacional, regional…
            </p>
            <input
              type="text"
              value={data.location_scope}
              onChange={(e) => onChange({ location_scope: e.target.value })}
              placeholder="Ej. Taller en Lima, envíos a todo el Perú"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* ¿Cómo empezó el negocio? */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1.5">
            ¿Cómo empezó el negocio?
          </label>
          <div className="flex items-center gap-1.5 text-xs text-amber-400/90 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>En dos o tres líneas. A veces de aquí sale la idea del logo.</span>
          </div>
          <textarea
            rows={3}
            value={data.business_story}
            onChange={(e) => onChange({ business_story: e.target.value })}
            placeholder="Ej. Empezamos en un pequeño taller familiar fabricando archivadores para notarías locales, y con los años nos fuimos especializando en metalmecánica pesada..."
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
