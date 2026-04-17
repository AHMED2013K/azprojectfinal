import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { loadVantaDependencies } from '../utils/loadExternalScript.js';

const portalCopy = {
  en: {
    welcome: 'Welcome to EduGrowth',
    language: 'FR',
    studentRole: 'I am a student',
    studentDescription:
      'Discover international study opportunities, personalized guidance, and expert support for your educational journey abroad.',
    studentFeatures: ['Study destination guides', 'Application assistance', 'WhatsApp support'],
    studentCta: 'Start Your Journey',
    studentAction: 'Explore',
    partnerRole: 'I am a partner',
    partnerTitle: 'B2B Partnership',
    partnerDescription:
      'Scale your admissions operations with professional outsourcing services, multilingual support, and structured workflows.',
    partnerFeatures: ['Lead qualification & CRM', 'Multilingual conversion', 'Admissions support'],
    partnerCta: 'Scale Your Operations',
    partnerAction: 'Enter Platform',
    footer: 'Choose the option that best fits your needs. You can switch between them anytime.',
  },
  fr: {
    welcome: 'Bienvenue chez EduGrowth',
    language: 'EN',
    studentRole: 'Je suis étudiant(e)',
    studentDescription:
      "Découvrez des opportunités d'études à l'international, un accompagnement personnalisé et un support expert pour votre projet.",
    studentFeatures: ["Guides destinations", 'Aide à la candidature', 'Support WhatsApp'],
    studentCta: 'Commencer mon projet',
    studentAction: 'Explorer',
    partnerRole: 'Je suis partenaire',
    partnerTitle: 'Partenariat B2B',
    partnerDescription:
      "Développez vos opérations admissions avec des services d'outsourcing structurés, multilingues et orientés performance.",
    partnerFeatures: ['Qualification des leads & CRM', 'Conversion multilingue', 'Support admissions'],
    partnerCta: 'Développer mes opérations',
    partnerAction: 'Entrer',
    footer: "Choisissez l'option qui correspond à votre besoin. Vous pourrez changer à tout moment.",
  },
};

const PortalSelector = ({ isOpen, onClose, onSelect, onToggleLanguage, translations, lang }) => {
  const t = translations[lang];
  const copy = portalCopy[lang] || portalCopy.en;
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const vantaRef = useRef(null);

  useLayoutEffect(() => {
    if (!isOpen) return;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsLoading(true);
    setIsVisible(false);

    // Show loading for 400ms, then show content
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 400);

    // Fallback: force transition after 2 seconds even if VANTA fails
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 2000);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(fallbackTimer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  // Cleanup VANTA on unmount
  useEffect(() => {
    const currentVanta = vantaRef.current;
    return () => {
      if (currentVanta?.vantaEffect) {
        currentVanta.vantaEffect.destroy();
        currentVanta.vantaEffect = null;
      }
    };
  }, []);

  // Initialize VANTA when background div is rendered
  useEffect(() => {
    if (!isLoading && vantaRef.current && !vantaRef.current.vantaEffect) {
      loadVantaDependencies()
        .then(() => {
          if (!vantaRef.current) {
            return;
          }

          if (vantaRef.current.vantaEffect) {
            vantaRef.current.vantaEffect.destroy();
            vantaRef.current.vantaEffect = null;
          }

          vantaRef.current.vantaEffect = window.VANTA.NET({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 100.00,
            minWidth: 100.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x0066cc,
            backgroundColor: 0x1e293b,
            points: 20.00,
            maxDistance: 30.00,
            spacing: 14.00,
            showDots: true,
            speed: 1.5,
          });
        })
        .catch((error) => {
          console.warn('VANTA initialization failed:', error);
        });
    }
  }, [isLoading]);

  if (!isOpen) return null;

  const handleSelect = (view) => {
    onSelect(view);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Loading Background - Always visible initially */}
      <div className={`fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`} />

      {/* VANTA Background - Only show after loading */}
      {!isLoading && (
        <div
          ref={vantaRef}
          id="portal-background"
          className="fixed inset-0 z-0 opacity-100"
          style={{ width: '100%', height: '100%' }}
        />
      )}

      {/* Backdrop blur */}
      <div
        className={`absolute inset-0 backdrop-blur-sm z-10 transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main modal */}
      <div
        className={`relative w-full max-w-6xl h-[95vh] overflow-hidden rounded-[20px] sm:rounded-[40px] border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl z-20 transition-all duration-500 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
        }`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="portal-selector-title"
      >
        {/* Content */}
        <div className="px-4 py-4 sm:px-6 sm:py-6 h-full flex flex-col max-h-[95vh] overflow-y-auto">
          {/* Title section */}
          <div className="mb-4 sm:mb-6 text-center flex-shrink-0">
            <div className="mb-3 flex items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#175c7d]/30 bg-[#175c7d]/20 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-bold uppercase tracking-wider text-white">
                <Sparkles size={14} className="text-[#eebc39]" />
                {copy.welcome}
              </div>
              <button
                type="button"
                onClick={onToggleLanguage}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-white transition hover:bg-white/15"
              >
                {copy.language}
              </button>
            </div>
            <h1 id="portal-selector-title" className="mb-3 text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black tracking-tight text-white flex-shrink-0 px-2">
              {t.gateTitle}
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300 px-2">
              {t.gateSubtitle}
            </p>
          </div>

          {/* Portal options */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 flex-1 mb-4">
            {/* Student Portal - LEFT CARD */}
            <button
              onClick={() => handleSelect('student')}
              className="group relative overflow-hidden rounded-[24px] sm:rounded-[32px] border-2 border-white/10 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-blue-950/90 p-6 sm:p-8 lg:p-10 text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-400/40 hover:bg-gradient-to-br hover:from-slate-800 hover:via-slate-900 hover:to-blue-900 hover:shadow-[0_20px_60px_rgba(59,130,246,0.25)] focus:outline-none focus:ring-2 focus:ring-blue-400/50 transform hover:scale-[1.02] active:scale-[0.98] min-h-[44px] touch-manipulation"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                {/* Icon and main label */}
                <div className="mb-4 sm:mb-6 flex items-center gap-4 sm:gap-6">
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 items-center justify-center rounded-xl sm:rounded-2xl border-2 border-blue-300/30 bg-blue-500/20 text-blue-100 transition-all group-hover:bg-blue-400/30 group-hover:scale-110 flex-shrink-0">
                    <img
                      src="/abraod.jpeg"
                      alt="Abroad Zone"
                      loading="eager"
                      decoding="sync"
                      fetchPriority="high"
                      width="48"
                      height="48"
                      className="h-10 w-10 sm:h-14 sm:w-14 lg:h-16 lg:w-16 max-h-full max-w-full object-contain rounded-sm"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider text-blue-200/80 mb-1">
                      {copy.studentRole}
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                      Abroad Zone
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-300">
                  {copy.studentDescription}
                </p>

                {/* Features */}
                <div className="mb-4 sm:mb-6 lg:mb-8 space-y-2 sm:space-y-3 lg:space-y-4">
                  {copy.studentFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm lg:text-base text-slate-300">
                      <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3 rounded-full bg-blue-400 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between rounded-xl sm:rounded-2xl border-2 border-white/20 bg-white/10 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 transition-all group-hover:border-blue-300/30 group-hover:bg-blue-500/10 min-h-[44px]">
                  <div className="text-base sm:text-lg font-bold text-white">
                    {copy.studentCta}
                  </div>
                  <div className="inline-flex items-center gap-2 sm:gap-3 text-blue-100 transition-transform group-hover:translate-x-1">
                    <span className="text-sm sm:text-base lg:text-lg font-bold">{copy.studentAction}</span>
                    <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>
            </button>

            {/* B2B Portal - RIGHT CARD */}
            <button
              onClick={() => handleSelect('b2b')}
              className="group relative overflow-hidden rounded-[24px] sm:rounded-[32px] border-2 border-white/10 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-emerald-950/90 p-6 sm:p-8 lg:p-10 text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-gradient-to-br hover:from-slate-800 hover:via-slate-900 hover:to-emerald-900 hover:shadow-[0_20px_60px_rgba(16,185,129,0.25)] focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transform hover:scale-[1.02] active:scale-[0.98] min-h-[44px] touch-manipulation"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                {/* Icon and main label */}
                <div className="mb-4 sm:mb-6 flex items-center gap-4 sm:gap-6">
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 items-center justify-center rounded-xl sm:rounded-2xl border-2 border-emerald-300/30 bg-emerald-500/20 text-emerald-100 transition-all group-hover:bg-emerald-400/30 group-hover:scale-110 flex-shrink-0">
                    <img
                      src="/Submark.png"
                      alt="EduGrowth"
                      loading="eager"
                      decoding="sync"
                      fetchPriority="high"
                      width="48"
                      height="48"
                      className="h-10 w-10 sm:h-14 sm:w-14 lg:h-16 lg:w-16 max-h-full max-w-full object-contain rounded-sm"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wider text-emerald-200/80 mb-1">
                      {copy.partnerRole}
                    </div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                      {copy.partnerTitle}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-300">
                  {copy.partnerDescription}
                </p>

                {/* Features */}
                <div className="mb-4 sm:mb-6 lg:mb-8 space-y-2 sm:space-y-3 lg:space-y-4">
                  {copy.partnerFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm lg:text-base text-slate-300">
                      <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between rounded-xl sm:rounded-2xl border-2 border-white/20 bg-white/10 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 transition-all group-hover:border-emerald-300/30 group-hover:bg-emerald-500/10 min-h-[44px]">
                  <div className="text-base sm:text-lg font-bold text-white">
                    {copy.partnerCta}
                  </div>
                  <div className="inline-flex items-center gap-2 sm:gap-3 text-emerald-100 transition-transform group-hover:translate-x-1">
                    <span className="text-sm sm:text-base lg:text-lg font-bold">{copy.partnerAction}</span>
                    <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Footer note */}
          <div className="mt-4 text-center border-t border-white/5 pt-3 sm:pt-4 flex-shrink-0">
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              {copy.footer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalSelector;
