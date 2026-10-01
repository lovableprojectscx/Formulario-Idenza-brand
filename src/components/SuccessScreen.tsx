import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BrandBriefingData } from '../types/briefing';
import { 
  CheckCircle2, 
  MessageCircle, 
  RotateCcw, 
  Sparkles, 
  Building2, 
  Calendar,
  FileCheck2
} from 'lucide-react';

interface SuccessScreenProps {
  data: BrandBriefingData;
  onReset: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ data, onReset }) => {
  useEffect(() => {
    // Launch celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#6366f1', '#f59e0b', '#10b981'],
    });

    const timer = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const businessName = data.business_name || 'Nuevo Negocio';
  const contactName = data.contact_name || 'Cliente';

  // Format WhatsApp message to notify the team
  const whatsappMessage = encodeURIComponent(
    `¡Hola Denza! Soy ${contactName} de "${businessName}". Acabo de completar el formulario de identidad de marca en la plataforma. Quedo atento a sus noticias.`
  );

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 text-center animate-fadeIn">
      {/* Success Badge */}
      <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-xl shadow-emerald-500/10">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Respuestas enviadas con éxito</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
        ¡Muchas gracias, {contactName}!
      </h1>
      <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed max-w-xl mx-auto">
        Hemos recibido toda la información sobre <span className="text-blue-400 font-semibold">{businessName}</span>. Con estos datos nuestro equipo empezará a trabajar en el diseño de su logotipo y propuesta de identidad de marca.
      </p>

      {/* Summary Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-left mb-8 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-slate-200 font-semibold text-sm">
          <FileCheck2 className="w-4 h-4 text-blue-400" />
          <span>Resumen de recepción</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block mb-0.5">Negocio</span>
            <p className="text-slate-200 font-medium">{businessName}</p>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">Contacto</span>
            <p className="text-slate-200 font-medium">{contactName} ({data.contact_role || 'Responsable'})</p>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">WhatsApp registrado</span>
            <p className="text-slate-200 font-medium font-mono">{data.contact_whatsapp || 'No especificado'}</p>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">Imágenes de referencia</span>
            <p className="text-slate-200 font-medium">
              {data.reference_images?.length ? `${data.reference_images.length} imágenes adjuntas` : 'Ninguna imagen adjunta'}
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/20"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Avisar por WhatsApp que ya completé el formulario</span>
        </a>

        <button
          onClick={onReset}
          type="button"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 font-medium text-sm transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Enviar otro formulario</span>
        </button>
      </div>
    </div>
  );
};
