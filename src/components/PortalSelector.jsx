import React, { useEffect, useLayoutEffect } from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';

const PortalSelector = ({ isOpen, onClose, onSelect, translations, lang }) => {
  const t = translations[lang];

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

  useLayoutEffect(() => {
    if (!isOpen) return;

    const bgElement = document.getElementById('portal-background');
    if (bgElement && !bgElement.vantaEffect && window.VANTA?.NET && window.THREE) {
      bgElement.vantaEffect = window.VANTA.NET({
        el: bgElement,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 100.00,
        minWidth: 100.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3b82f6,
        backgroundColor: 0x0a0f1e,
        points: 20.00,
        maxDistance: 30.00,
        spacing: 14.00,
        showDots: true,
        backgroundAlpha: 1.0,
        speed: 1.5
      });
    }

    return () => {
      const bgElement = document.getElementById('portal-background');
      if (bgElement?.vantaEffect) {
        bgElement.vantaEffect.destroy();
        bgElement.vantaEffect = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelect = (view) => {
    onSelect(view);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* VANTA Background */}
      <div
        id="portal-background"
        className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Backdrop blur */}

      <div
        className="absolute inset-0 backdrop-blur-sm z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main modal */}
      <div
        className="relative w-full max-w-6xl h-[95vh] overflow-hidden rounded-[40px] border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl animate-portal-rise z-20"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="portal-selector-title"
      >
        {/* Header */}
        <div className="border-b border-white/10 bg-slate-950/50 px-6 py-4 sm:px-8 sm:py-6">
          <div className="flex items-center justify-center">
            <button
              onClick={onClose}
              className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 transition-all hover:border-white/30 hover:bg-white/20 hover:text-white"
              aria-label="Close portal selector"
            >
              <X size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-4 sm:px-6 sm:py-6 h-full flex flex-col">
          {/* Title section */}
          <div className="mb-6 text-center flex-shrink-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#175c7d]/30 bg-[#175c7d]/20 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-bold uppercase tracking-wider text-white">
              <Sparkles size={14} className="text-[#eebc39]" />
              Welcome to EduGrowth
            </div>
            <h1 id="portal-selector-title" className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex-shrink-0">
              {t.gateTitle}
            </h1>
            <p className="mx-auto max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-300">
              {t.gateSubtitle}
            </p>
          </div>

          {/* Portal options */}
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 flex-1 mb-4">
            {/* Student Portal - LEFT CARD */}
            <button
              onClick={() => handleSelect('student')}
              className="group relative overflow-hidden rounded-[32px] border-2 border-white/10 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-blue-950/90 p-10 text-left transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/40 hover:bg-gradient-to-br hover:from-slate-800 hover:via-slate-900 hover:to-blue-900 hover:shadow-[0_25px_80px_rgba(59,130,246,0.3)] focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                {/* Icon and main label */}
                <div className="mb-6 flex items-center gap-6">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border-2 border-blue-300/30 bg-blue-500/20 text-blue-100 transition-all group-hover:bg-blue-400/30 group-hover:scale-110">
                    <img
                      src="/abraod.jpeg"
                      alt="Abroad Zone"
                      loading="eager"
                      decoding="sync"
                      fetchPriority="high"
                      width="56"
                      height="56"
                      className="h-14 w-auto max-h-full max-w-full object-contain rounded-sm"
                    />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-bold uppercase tracking-wider text-blue-200/80">
                      I am a student
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      Abroad Zone
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed text-slate-300">
                  Discover international study opportunities, personalized guidance, and expert support for your educational journey abroad.
                </p>

                {/* Features */}
                <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-slate-300">
                    <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-blue-400" />
                    <span className="font-medium">Study destination guides</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="h-3 w-3 rounded-full bg-blue-400" />
                    <span className="font-medium">Application assistance</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="h-3 w-3 rounded-full bg-blue-400" />
                    <span className="font-medium">WhatsApp support</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between rounded-2xl border-2 border-white/20 bg-white/10 px-8 py-6 transition-all group-hover:border-blue-300/30 group-hover:bg-blue-500/10">
                  <div className="text-lg font-bold text-white">
                    Start Your Journey
                  </div>
                  <div className="inline-flex items-center gap-3 text-blue-100 transition-transform group-hover:translate-x-1">
                    <span className="text-lg font-bold">Explore</span>
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </button>

            {/* B2B Portal - RIGHT CARD */}
            <button
              onClick={() => handleSelect('b2b')}
              className="group relative overflow-hidden rounded-[32px] border-2 border-white/10 bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-emerald-950/90 p-10 text-left transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400/40 hover:bg-gradient-to-br hover:from-slate-800 hover:via-slate-900 hover:to-emerald-900 hover:shadow-[0_25px_80px_rgba(16,185,129,0.3)] focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                {/* Icon and main label */}
                <div className="mb-6 flex items-center gap-6">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border-2 border-emerald-300/30 bg-emerald-500/20 text-emerald-100 transition-all group-hover:bg-emerald-400/30 group-hover:scale-110">
                    <img
                      src="/Submark.png"
                      alt="EduGrowth"
                      loading="eager"
                      decoding="sync"
                      fetchPriority="high"
                      width="56"
                      height="56"
                      className="h-14 w-auto max-h-full max-w-full object-contain rounded-sm"
                    />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-bold uppercase tracking-wider text-emerald-200/80">
                      I am a partner
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      B2B Partnership
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed text-slate-300">
                  Scale your admissions operations with professional outsourcing services, multilingual support, and structured workflows.
                </p>

                {/* Features */}
                <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-slate-300">
                    <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-400" />
                    <span className="font-medium">Lead qualification & CRM</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                    <span className="font-medium">Multilingual conversion</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="h-3 w-3 rounded-full bg-emerald-400" />
                    <span className="font-medium">Admissions support</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between rounded-2xl border-2 border-white/20 bg-white/10 px-8 py-6 transition-all group-hover:border-emerald-300/30 group-hover:bg-emerald-500/10">
                  <div className="text-lg font-bold text-white">
                    Scale Your Operations
                  </div>
                  <div className="inline-flex items-center gap-3 text-emerald-100 transition-transform group-hover:translate-x-1">
                    <span className="text-lg font-bold">Enter Platform</span>
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Footer note */}
          <div className="mt-4 text-center border-t border-white/5 pt-3 sm:pt-4 flex-shrink-0">
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              Choose the option that best fits your needs. You can switch between them anytime.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes portal-rise {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-portal-rise {
          animation: portal-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </div>
  );
};

export default PortalSelector;
