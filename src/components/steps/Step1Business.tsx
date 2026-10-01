import React from 'react';
import { BrandBriefingData } from '../../types/briefing';
import { Check } from 'lucide-react';

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
    <div className="space-y-7 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-tinta-border pb-4">
        <span className="text-xs font-mono tabular-nums text-blanco-dim uppercase tracking-wider block mb-1">
          Parte 01
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-medium text-blanco tracking-tight">
          El negocio
        </h2>
        <p className="text-blanco-muted text-sm mt-1">
          Lo básico para entender qué hacen.
        </p>
      </div>

      <div className="space-y-6">
        {/* Nombre del negocio */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
            Nombre del negocio
          </label>
          <p className="text-xs text-blanco-dim mb-2">
            Si todavía no tiene nombre o quiere cambiarlo, dígalo.
          </p>
          <input
            type="text"
            value={data.business_name}
            onChange={(e) => onChange({ business_name: e.target.value })}
            placeholder="Ej. Industrias Metálicas Denza"
            className="w-full px-4 py-3 bg-tinta-surface border border-tinta-border rounded-xl text-blanco placeholder-blanco-dim text-sm focus:outline-none focus:border-ambar transition-colors"
          />
        </div>

        {/* ¿Qué fabrican o venden? */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
            ¿Qué fabrican o venden?
          </label>
          <p className="text-xs text-blanco-dim mb-3">
            Marque todo lo que aplique.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRODUCTS_OPTIONS.map((item) => {
              const isSelected = (data.products_sold || []).includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleProduct(item)}
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
              value={data.products_other}
              onChange={(e) => onChange({ products_other: e.target.value })}
              placeholder="Otro producto o servicio..."
              className="w-full px-4 py-2.5 bg-tinta-surface border border-tinta-border rounded-xl text-blanco placeholder-blanco-dim text-xs sm:text-sm focus:outline-none focus:border-ambar transition-colors"
            />
          </div>
        </div>

        {/* Grid: Años y Alcance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* ¿Desde cuándo trabajan? */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
              ¿Desde cuándo trabajan?
            </label>
            <p className="text-xs text-blanco-dim mb-2">
              Ej. 2015
            </p>
            <input
              type="text"
              value={data.years_operating}
              onChange={(e) => onChange({ years_operating: e.target.value })}
              placeholder="Ej. 2018"
              className="w-full px-4 py-3 bg-tinta-surface border border-tinta-border rounded-xl text-blanco placeholder-blanco-dim text-sm focus:outline-none focus:border-ambar transition-colors tabular-nums"
            />
          </div>

          {/* ¿Dónde están y hasta dónde llegan? */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
              ¿Dónde están y hasta dónde llegan?
            </label>
            <p className="text-xs text-blanco-dim mb-2">
              Ciudad, envíos a…
            </p>
            <input
              type="text"
              value={data.location_scope}
              onChange={(e) => onChange({ location_scope: e.target.value })}
              placeholder="Ej. Lima, envíos a todo el Perú"
              className="w-full px-4 py-3 bg-tinta-surface border border-tinta-border rounded-xl text-blanco placeholder-blanco-dim text-sm focus:outline-none focus:border-ambar transition-colors"
            />
          </div>
        </div>

        {/* ¿Cómo empezó el negocio? */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
            ¿Cómo empezó el negocio?
          </label>
          <p className="text-xs text-blanco-dim mb-2">
            En dos o tres líneas. A veces de aquí sale la idea del logo.
          </p>
          <textarea
            rows={3}
            value={data.business_story}
            onChange={(e) => onChange({ business_story: e.target.value })}
            placeholder="Cuéntenos brevemente el origen del negocio..."
            className="w-full px-4 py-3 bg-tinta-surface border border-tinta-border rounded-xl text-blanco placeholder-blanco-dim text-sm leading-relaxed focus:outline-none focus:border-ambar transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
