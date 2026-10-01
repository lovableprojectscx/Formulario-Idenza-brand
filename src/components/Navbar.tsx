import React from 'react';
import { IdenzaLogo } from './IdenzaLogo';
import { Lock, Check } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  isSaved?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, isSaved = true }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-tinta-border bg-tinta/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <IdenzaLogo showTagline={true} />

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {isSaved && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-blanco-muted font-sans">
              <Check className="w-3.5 h-3.5 text-ambar" />
              <span>Borrador guardado</span>
            </div>
          )}

          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 text-xs font-medium text-blanco-muted hover:text-blanco px-3 py-1.5 rounded-lg bg-tinta-surface hover:bg-tinta-hover border border-tinta-border transition-colors"
            title="Acceso exclusivo del equipo"
          >
            <Lock className="w-3 h-3 text-ambar" />
            <span>Acceso del equipo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
