import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { ADMIN_PASSWORD } from '../../lib/supabase';
import { IdenzaLogo } from '../IdenzaLogo';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('denza_admin_auth', 'true');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tinta/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm bg-blanco border border-tinta-border rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onCancel}
            type="button"
            className="flex items-center gap-1.5 text-xs text-tinta-muted hover:text-tinta transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver</span>
          </button>
          <span className="text-[10px] font-mono uppercase tracking-wider text-tinta-muted">
            Equipo IDENZA
          </span>
        </div>

        <div className="text-center mb-6">
          <div className="mb-3 flex justify-center">
            <IdenzaLogo size="md" />
          </div>
          <h3 className="text-base font-display font-medium text-tinta">
            Panel de Recepción
          </h3>
          <p className="text-xs text-tinta-muted mt-1">
            Ingrese la clave del equipo para consultar las respuestas recibidas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Contraseña..."
                className={`w-full pl-3.5 pr-10 py-2.5 bg-blanco border rounded-xl text-tinta placeholder-tinta-subtle text-xs font-mono tracking-wider focus:outline-none transition-colors shadow-sm ${
                  error ? 'border-rose-500' : 'border-tinta-borderDark focus:border-ambar'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-tinta-muted hover:text-tinta p-1"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
            {error && (
              <p className="text-[11px] text-rose-600 mt-1.5 font-medium">
                Contraseña incorrecta.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-ambar hover:bg-ambar-hover text-tinta font-display font-bold text-xs transition-colors shadow-sm"
          >
            Ingresar al Panel
          </button>
        </form>
      </div>
    </div>
  );
};
