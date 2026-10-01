import React from 'react';
import { Shield, Sparkles, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  isSaved?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, isSaved = true }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-extrabold text-xl tracking-tighter">D</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">Denza</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Identidad & Marca
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Briefing de diseño y estrategia de marca
            </p>
          </div>
        </div>

        {/* Right action / Admin access */}
        <div className="flex items-center gap-3">
          {isSaved && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400/90 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Borrador guardado</span>
            </div>
          )}

          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/60 transition-all hover:border-slate-600 shadow-sm"
            title="Acceso exclusivo para el equipo de Denza"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Acceso del equipo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
