import React, { useState, useEffect } from 'react';
import { 
  BrandBriefingData, 
  INITIAL_BRIEFING_DATA 
} from './types/briefing';
import { submitBrandBriefing } from './lib/api';
import { Navbar } from './components/Navbar';
import { StepProgress, STEPS } from './components/StepProgress';
import { Step1Business } from './components/steps/Step1Business';
import { Step2Clients } from './components/steps/Step2Clients';
import { Step3Competitors } from './components/steps/Step3Competitors';
import { Step4Personality } from './components/steps/Step4Personality';
import { Step5Logo } from './components/steps/Step5Logo';
import { Step6Touchpoints } from './components/steps/Step6Touchpoints';
import { Step7Contact } from './components/steps/Step7Contact';
import { SuccessScreen } from './components/SuccessScreen';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminPanel } from './components/admin/AdminPanel';
import { 
  ArrowLeft, 
  ArrowRight, 
  Shield, 
  Sparkles, 
  Clock, 
  RotateCcw 
} from 'lucide-react';

const DRAFT_STORAGE_KEY = 'denza_briefing_draft_v1';

export const App: React.FC = () => {
  // Navigation & State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<BrandBriefingData>(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('No se pudo cargar el borrador anterior', e);
    }
    return INITIAL_BRIEFING_DATA;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Admin access state
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('denza_admin_auth') === 'true';
  });

  // Save draft on changes
  useEffect(() => {
    if (!isSubmitted) {
      try {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formData));
      } catch (e) {
        console.warn('Error guardando borrador en localStorage', e);
      }
    }
  }, [formData, isSubmitted]);

  const updateFormData = (updates: Partial<BrandBriefingData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!formData.contact_name?.trim()) {
      setSubmitError('Por favor ingrese su nombre para poder contactarlo.');
      return;
    }
    if (!formData.contact_whatsapp?.trim()) {
      setSubmitError('Por favor ingrese su número de WhatsApp para enviarle la propuesta.');
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await submitBrandBriefing(formData);
      localStorage.removeItem(DRAFT_STORAGE_KEY);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Error al enviar respuestas:', err);
      setSubmitError(
        err.message || 'Ocurrió un error al guardar sus respuestas. Por favor revise su conexión e intente nuevamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData(INITIAL_BRIEFING_DATA);
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setIsSubmitted(false);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If viewing admin panel
  if (showAdmin && isAdminAuthenticated) {
    return (
      <AdminPanel
        onClose={() => setShowAdmin(false)}
        onLogout={() => {
          localStorage.removeItem('denza_admin_auth');
          setIsAdminAuthenticated(false);
          setShowAdmin(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Navbar onOpenAdmin={() => setShowAdmin(true)} isSaved={!isSubmitted} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8">
        {isSubmitted ? (
          <SuccessScreen data={formData} onReset={handleResetForm} />
        ) : (
          <div>
            {/* Header intro as specified */}
            <div className="mb-8 text-center sm:text-left border-b border-slate-800/80 pb-6">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Denza · Identidad & Diseño de Marca</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Cuéntenos de su negocio para diseñar su marca
              </h1>
              <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
                Con esto armamos el logo y la identidad de su empresa. No hay respuestas buenas ni malas, escriba como le habla a un cliente. Si alguna no aplica, déjela en blanco.
              </p>
              <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>7 partes · unos 10 minutos</span>
              </div>
            </div>

            {/* Visual Step Progress */}
            <StepProgress
              currentStep={currentStep}
              totalSteps={7}
              onSelectStep={(step) => {
                if (step <= currentStep) {
                  setCurrentStep(step);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            />

            {/* Step Body */}
            <div className="bg-slate-900/40 border border-slate-800/90 rounded-3xl p-5 sm:p-8 backdrop-blur-sm shadow-xl shadow-black/40">
              {currentStep === 1 && (
                <Step1Business data={formData} onChange={updateFormData} />
              )}
              {currentStep === 2 && (
                <Step2Clients data={formData} onChange={updateFormData} />
              )}
              {currentStep === 3 && (
                <Step3Competitors data={formData} onChange={updateFormData} />
              )}
              {currentStep === 4 && (
                <Step4Personality data={formData} onChange={updateFormData} />
              )}
              {currentStep === 5 && (
                <Step5Logo data={formData} onChange={updateFormData} />
              )}
              {currentStep === 6 && (
                <Step6Touchpoints data={formData} onChange={updateFormData} />
              )}
              {currentStep === 7 && (
                <Step7Contact
                  data={formData}
                  onChange={updateFormData}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  submitError={submitError}
                />
              )}

              {/* Navigation Footer */}
              <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-sm font-medium transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 7 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 transition-all hover:translate-x-0.5"
                  >
                    <span>Siguiente parte</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Public Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Denza — Diseño & Estrategia de Marca</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAdmin(true)}
              className="text-slate-400 hover:text-white underline underline-offset-4 flex items-center gap-1.5 transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Acceso del equipo</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Login Modal (if opened and not yet authenticated) */}
      {showAdmin && !isAdminAuthenticated && (
        <AdminLogin
          onSuccess={() => {
            setIsAdminAuthenticated(true);
          }}
          onCancel={() => setShowAdmin(false)}
        />
      )}
    </div>
  );
};

export default App;
