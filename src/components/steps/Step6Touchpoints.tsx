import React from 'react';
import { BrandBriefingData } from '../../types/briefing';
import { 
  Tag, 
  Check, 
  Store, 
  ShieldAlert, 
  Shirt, 
  Truck, 
  FileSpreadsheet, 
  Share2, 
  Globe, 
  BookOpen, 
  Calendar 
} from 'lucide-react';

interface StepProps {
  data: BrandBriefingData;
  onChange: (updates: Partial<BrandBriefingData>) => void;
}

const TOUCHPOINTS = [
  { id: 'Letrero del local', label: 'Letrero del local', icon: Store },
  { id: 'Placa en los muebles', label: 'Placa en los muebles', icon: ShieldAlert },
  { id: 'Uniformes', label: 'Uniformes', icon: Shirt },
  { id: 'Camioneta', label: 'Camioneta', icon: Truck },
  { id: 'Cotizaciones y facturas', label: 'Cotizaciones y facturas', icon: FileSpreadsheet },
  { id: 'Redes sociales', label: 'Redes sociales', icon: Share2 },
  { id: 'Página web', label: 'Página web', icon: Globe },
  { id: 'Catálogo impreso', label: 'Catálogo impreso', icon: BookOpen },
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
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-blue-400 font-mono text-sm uppercase tracking-wider mb-1">
          <Tag className="w-4 h-4" />
          <span>Parte 06</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Dónde va a ir la marca
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          El logo y la identidad tienen que verse impecables en todos los formatos físicos y digitales donde opere.
        </p>
      </div>

      <div className="space-y-6">
        {/* Marque los lugares donde se va a usar */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1.5">
            Marque los lugares donde se va a usar
          </label>
          <p className="text-xs text-slate-400 mb-3">
            Seleccione todas las aplicaciones que tenga proyectadas:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOUCHPOINTS.map((item) => {
              const isSelected = (data.brand_touchpoints || []).includes(item.id);
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleTouchpoint(item.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-blue-600/15 border-blue-500/60 text-white shadow-sm'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>

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
              value={data.brand_touchpoints_other}
              onChange={(e) => onChange({ brand_touchpoints_other: e.target.value })}
              placeholder="¿Algún otro lugar? Ej. Huinchas de embalaje, sellos de jebe, stickers vinílicos..."
              className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-800/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* ¿Para cuándo lo necesita? */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Calendar className="w-4 h-4 text-amber-400" />
            <label className="text-sm font-medium text-slate-200">
              ¿Para cuándo lo necesita?
            </label>
          </div>
          <p className="text-xs text-slate-400 mb-2">
            Ej. Antes de fin de mes, antes de una licitación importante, en 2 semanas, sin apuro…
          </p>
          <input
            type="text"
            value={data.deadline}
            onChange={(e) => onChange({ deadline: e.target.value })}
            placeholder="Ej. Para fines de este mes porque mandaremos a confeccionar uniformes y letrero"
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
          />
        </div>
      </div>
    </div>
  );
};
