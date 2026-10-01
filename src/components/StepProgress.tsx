import React from 'react';
import { 
  Building2, 
  Users, 
  Crosshair, 
  Sparkles, 
  Palette, 
  Tag, 
  UserCheck, 
  Check 
} from 'lucide-react';

export interface StepInfo {
  num: string;
  id: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const STEPS: StepInfo[] = [
  { num: '01', id: 1, label: 'El negocio', icon: Building2 },
  { num: '02', id: 2, label: 'Sus clientes', icon: Users },
  { num: '03', id: 3, label: 'La competencia', icon: Crosshair },
  { num: '04', id: 4, label: 'La personalidad', icon: Sparkles },
  { num: '05', id: 5, label: 'El logo', icon: Palette },
  { num: '06', id: 6, label: 'Dónde va la marca', icon: Tag },
  { num: '07', id: 7, label: 'Sus datos', icon: UserCheck },
];

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  onSelectStep: (step: number) => void;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  totalSteps,
  onSelectStep,
}) => {
  const progressPercent = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="w-full mb-8">
      {/* Top progress indicators */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
        <span className="font-semibold text-slate-300">
          Parte {currentStep} de {totalSteps} · {STEPS[currentStep - 1]?.label}
        </span>
        <span className="text-blue-400 font-mono font-medium">{progressPercent}% completado</span>
      </div>

      {/* Progress line */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-amber-500 transition-all duration-300 ease-out"
          style={{ width: `${Math.max(5, progressPercent)}%` }}
        />
      </div>

      {/* Desktop / Tablet step tabs */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {STEPS.map((step) => {
          const isCurrent = step.id === currentStep;
          const isDone = step.id < currentStep;
          const Icon = step.icon;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelectStep(step.id)}
              className={`group flex flex-col items-center p-2 rounded-xl text-center transition-all ${
                isCurrent
                  ? 'bg-blue-600/15 border border-blue-500/40 text-blue-300 shadow-sm'
                  : isDone
                  ? 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  : 'bg-slate-900/30 border border-transparent text-slate-600 cursor-not-allowed opacity-60'
              }`}
              disabled={step.id > currentStep}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold mb-1 transition-all ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : isDone
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : step.num}
              </div>
              <span className="text-[11px] leading-tight font-medium line-clamp-1 hidden md:block">
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
