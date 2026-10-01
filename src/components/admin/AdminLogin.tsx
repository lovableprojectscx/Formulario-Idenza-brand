import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldAlert, ArrowLeft, KeyRound } from 'lucide-react';
import { ADMIN_PASSWORD } from '../../lib/supabase';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-900/20">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onCancel}
            type="button"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al formulario</span>
          </button>
          <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Área Restringida
          </span>
        </div>

        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-blue-600 to-amber-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/20">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Panel de Recepción Denza
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Ingrese la contraseña del equipo para consultar las respuestas de los clientes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Contraseña de Acceso
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Ingrese la clave..."
                className={`w-full pl-4 pr-11 py-3 bg-slate-950 border rounded-xl text-white placeholder-slate-600 text-sm font-mono tracking-wider focus:outline-none transition-all ${
                  error
                    ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500'
                    : 'border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-rose-400 mt-2 flex items-center gap-1.5 animate-fadeIn">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Contraseña incorrecta. Verifique e intente nuevamente.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>Ingresar al Panel</span>
          </button>
        </form>
      </div>
    </div>
  );
};
