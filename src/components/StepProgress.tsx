import React from 'react';
import { Check } from 'lucide-react';

export interface StepInfo {
  num: string;
  id: number;
  label: string;
}

export const STEPS: StepInfo[] = [
  { num: '01', id: 1, label: 'El negocio' },
  { num: '02', id: 2, label: 'Sus clientes' },
  { num: '03', id: 3, label: 'La competencia' },
  { num: '04', id: 4, label: 'La personalidad' },
  { num: '05', id: 5, label: 'El logo' },
  { num: '06', id: 6, label: 'Dónde va la marca' },
  { num: '07', id: 7, label: 'Sus datos' },
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
      <div className="flex items-center justify-between text-xs text-tinta-muted mb-2 px-0.5">
        <span className="font-sans font-medium text-tinta">
          Parte <span className="tabular-nums font-mono text-ambar-dark font-semibold">{currentStep}</span> de <span className="tabular-nums font-mono">{totalSteps}</span> — {STEPS[currentStep - 1]?.label}
        </span>
        <span className="font-mono text-tinta-muted tabular-nums">{progressPercent}% completado</span>
      </div>

      {/* Clean progress bar */}
      <div className="w-full h-1.5 bg-tinta-border rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-ambar transition-all duration-300 ease-out"
          style={{ width: `${Math.max(4, progressPercent)}%` }}
        />
      </div>

      {/* Step navigation tabs */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {STEPS.map((step) => {
          const isCurrent = step.id === currentStep;
          const isDone = step.id < currentStep;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelectStep(step.id)}
              className={`flex flex-col items-center py-2 px-1 rounded-xl text-center transition-all ${
                isCurrent
                  ? 'bg-blanco border border-ambar text-tinta shadow-sm'
                  : isDone
                  ? 'bg-blanco/80 border border-tinta-border text-tinta-muted hover:border-tinta-borderDark hover:text-tinta'
                  : 'bg-transparent border border-transparent text-tinta-subtle cursor-not-allowed opacity-50'
              }`}
              disabled={step.id > currentStep}
            >
              <div
                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono tabular-nums mb-1 transition-colors ${
                  isCurrent
                    ? 'bg-ambar text-tinta font-bold'
                    : isDone
                    ? 'bg-blanco-hover text-tinta-soft border border-tinta-border'
                    : 'text-tinta-subtle'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5 stroke-[2.5] text-ambar-dark" /> : step.num}
              </div>
              <span className="text-[10px] leading-tight font-sans truncate w-full hidden md:block">
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
