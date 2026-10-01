import React from 'react';
import { BrandBriefingData } from '../types/briefing';
import { Check, MessageCircle, RotateCcw } from 'lucide-react';
import { IdenzaLogo } from './IdenzaLogo';

interface SuccessScreenProps {
  data: BrandBriefingData;
  onReset: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ data, onReset }) => {
  const businessName = data.business_name || 'Nuevo Negocio';
  const contactName = data.contact_name || 'Cliente';

  const whatsappMessage = encodeURIComponent(
    `Hola Jack, soy ${contactName} de "${businessName}". Acabo de completar el formulario de marca en la web de IDENZA.`
  );

  return (
    <div className="max-w-xl mx-auto py-10 px-4 text-center animate-fadeIn">
      {/* Brand logo */}
      <div className="mb-6 flex justify-center">
        <IdenzaLogo size="lg" />
      </div>

      {/* Status check icon */}
      <div className="w-12 h-12 mx-auto rounded-full bg-tinta-surface border border-tinta-border flex items-center justify-center text-ambar mb-4">
        <Check className="w-6 h-6 stroke-[2.5]" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-display font-medium text-blanco tracking-tight mb-2">
        Respuestas recibidas
      </h1>
      <p className="text-blanco-muted text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
        Gracias, <span className="text-blanco font-medium">{contactName}</span>. Analizaremos los datos de <span className="text-blanco font-medium">{businessName}</span> para comenzar la propuesta de identidad.
      </p>

      {/* Summary card */}
      <div className="bg-tinta-surface border border-tinta-border rounded-2xl p-5 text-left mb-8 space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-blanco-muted block border-b border-tinta-border pb-2">
          Ficha registrada
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-blanco-dim block mb-0.5">Negocio</span>
            <p className="text-blanco font-medium">{businessName}</p>
          </div>
          <div>
            <span className="text-blanco-dim block mb-0.5">Contacto</span>
            <p className="text-blanco font-medium">{contactName} {data.contact_role ? `(${data.contact_role})` : ''}</p>
          </div>
          <div>
            <span className="text-blanco-dim block mb-0.5">WhatsApp</span>
            <p className="text-blanco font-mono tabular-nums">{data.contact_whatsapp || '—'}</p>
          </div>
          <div>
            <span className="text-blanco-dim block mb-0.5">Imágenes adjuntas</span>
            <p className="text-blanco font-mono tabular-nums">
              {data.reference_images?.length || 0} archivo(s)
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-ambar hover:bg-ambar-hover text-tinta font-display font-bold text-sm transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Avisar por WhatsApp</span>
        </a>

        <button
          onClick={onReset}
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-tinta-surface hover:bg-tinta-hover text-blanco-muted hover:text-blanco border border-tinta-border text-sm transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Enviar otro formulario</span>
        </button>
      </div>
    </div>
  );
};
