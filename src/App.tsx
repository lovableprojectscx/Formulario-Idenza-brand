import React, { useState, useEffect } from 'react';
import { 
  BrandBriefingData, 
  INITIAL_BRIEFING_DATA 
} from './types/briefing';
import { submitBrandBriefing } from './lib/api';
import { Navbar } from './components/Navbar';
import { StepProgress } from './components/StepProgress';
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
import { ArrowLeft, ArrowRight, Lock } from 'lucide-react';

const DRAFT_STORAGE_KEY = 'idenza_briefing_draft_v2';

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<BrandBriefingData>(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('No se pudo cargar el borrador', e);
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

  useEffect(() => {
    if (!isSubmitted) {
      try {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formData));
      } catch (e) {
        console.warn('Error al guardar borrador', e);
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
      setSubmitError('Por favor ingrese su nombre para identificar sus respuestas.');
      return;
    }
    if (!formData.contact_whatsapp?.trim()) {
      setSubmitError('Por favor ingrese su número de WhatsApp para contactarlo.');
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
      console.error('Error enviando respuestas:', err);
      setSubmitError(
        err.message || 'Ocurrió un error al enviar las respuestas. Por favor intente nuevamente.'
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
    <div className="min-h-screen bg-tinta text-blanco flex flex-col font-sans selection:bg-ambar selection:text-tinta">
      {/* Navbar */}
      <Navbar onOpenAdmin={() => setShowAdmin(true)} isSaved={!isSubmitted} />

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8">
        {isSubmitted ? (
          <SuccessScreen data={formData} onReset={handleResetForm} />
        ) : (
          <div>
            {/* Header copy as requested by user */}
            <div className="mb-8 border-b border-tinta-border pb-6">
              <span className="text-xs font-mono tabular-nums text-blanco-dim tracking-wider uppercase block mb-1">
                Denza
              </span>
              <h1 className="text-2xl sm:text-3xl font-display font-medium text-blanco tracking-tight">
                Cuéntenos de su negocio para diseñar su marca
              </h1>
              <p className="text-blanco-muted text-sm sm:text-base mt-2 leading-relaxed">
                Con esto armamos el logo y la identidad de su empresa. No hay respuestas buenas ni malas, escriba como le habla a un cliente. Si alguna no aplica, déjela en blanco.
              </p>
              <div className="mt-3 text-xs font-mono tabular-nums text-blanco-dim">
                7 partes · unos 10 minutos
              </div>
            </div>

            {/* Step Progress Bar */}
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

            {/* Step Card Container */}
            <div className="bg-tinta-surface border border-tinta-border rounded-2xl p-5 sm:p-8">
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
              <div className="mt-8 pt-6 border-t border-tinta-border flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-tinta hover:bg-tinta-hover border border-tinta-border text-blanco-muted hover:text-blanco text-xs font-medium transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Anterior</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 7 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-tinta hover:bg-tinta-hover border border-tinta-border hover:border-ambar/50 text-blanco text-xs font-medium transition-all"
                  >
                    <span>Siguiente parte</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-tinta-border bg-tinta py-6 text-center text-xs text-blanco-dim">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} idenza — Demanda real antes que diseño</p>
          <button
            onClick={() => setShowAdmin(true)}
            className="text-blanco-muted hover:text-blanco flex items-center gap-1.5 transition-colors"
          >
            <Lock className="w-3 h-3 text-ambar" />
            <span>Acceso del equipo</span>
          </button>
        </div>
      </footer>

      {/* Admin Login Modal if requested */}
      {showAdmin && !isAdminAuthenticated && (
        <AdminLogin
          onSuccess={() => setIsAdminAuthenticated(true)}
          onCancel={() => setShowAdmin(false)}
        />
      )}
    </div>
  );
};

export default App;
