import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import LanguageSwitch from '../components/LanguageSwitch';
import PortalSelector from '../components/PortalSelector';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackEvent } from '../utils/tracking';

const portalTranslations = {
  en: {
    gateTitle: 'Choose your portal',
    gateSubtitle: 'Access Abroad Zone for student guidance or EduGrowth for outsourcing and B2B services from Tunisia.',
  },
  fr: {
    gateTitle: 'Choisissez votre portail',
    gateSubtitle: "Accédez à Abroad Zone pour l'accompagnement étudiant ou à EduGrowth pour l'outsourcing et les services B2B depuis la Tunisie.",
  },
};

const pageCopy = {
  en: {
    title: 'EduGrowth Portal',
    subtitle: 'Choose Abroad Zone for student guidance or Outsourcing for business services from Tunisia.',
    openPortal: 'Open portal',
    seoPage: 'SEO page',
    description: 'Welcome to EduGrowth. Select the portal that fits your needs or continue to the SEO landing page for more details.',
  },
  fr: {
    title: 'Portail EduGrowth',
    subtitle: "Choisissez Abroad Zone pour l'accompagnement étudiant ou Outsourcing pour les services B2B depuis la Tunisie.",
    openPortal: 'Ouvrir le portail',
    seoPage: 'Page SEO',
    description: 'Bienvenue sur EduGrowth. Sélectionnez le portail qui vous convient ou poursuivez vers la page SEO pour en savoir plus.',
  },
};

export default function PortalGatePage() {
  const { lang, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const copy = pageCopy[lang] || pageCopy.en;

  const handleOpenPortal = () => {
    trackEvent('portal_open', { page: '/' });
    setIsOpen(true);
  };

  const handleClosePortal = () => {
    trackEvent('portal_close', { page: '/' });
    setIsOpen(false);
  };

  const handleSelectPortal = (view) => {
    trackEvent('portal_select', { portal: view, page: '/' });
    setIsOpen(false);
    navigate(view === 'student' ? '/abroad-zone' : '/outsourcing');
  };

  return (
    <>
      <SEOHelmet
        title={lang === 'fr' ? 'EduGrowth Tunisie | Portail' : 'EduGrowth Tunisia | Portal'}
        description={copy.description}
        canonical="https://edugrowth.tn/"
        lang={lang}
      />

      <div className="min-h-screen bg-slate-950 text-white">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Link to="/home" className="inline-flex items-center gap-2 rounded-full border border-slate-600/40 bg-slate-900/90 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-slate-100 transition hover:bg-slate-800">
              {copy.seoPage}
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-slate-600/40 bg-slate-900/90 px-2 py-2">
              <LanguageSwitch lang={lang} onToggle={toggleLanguage} className="border-0 bg-transparent px-3 py-1.5 shadow-none hover:bg-slate-800" />
            </div>
          </div>
        </header>

        <main className="grid min-h-[calc(100vh-80px)] place-items-center px-4 py-10 text-center">
          {!isOpen && (
            <div className="max-w-3xl rounded-[2rem] border border-white/10 bg-slate-900/90 p-10 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-slate-200">
                <Sparkles size={14} />
                {lang === 'fr' ? 'Portail fermé' : 'Portal closed'}
              </div>
              <h1 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl">{copy.title}</h1>
              <p className="mb-8 text-lg leading-8 text-slate-300">{copy.subtitle}</p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={handleOpenPortal}
                  className="rounded-full bg-[#1c3450] px-6 py-3 text-sm font-black text-white transition hover:bg-[#162c43]"
                >
                  {copy.openPortal}
                </button>
                <Link
                  to="/home"
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:bg-white/15"
                >
                  {copy.seoPage}
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>

      <PortalSelector
        isOpen={isOpen}
        onClose={handleClosePortal}
        onSelect={handleSelectPortal}
        onToggleLanguage={toggleLanguage}
        translations={portalTranslations}
        lang={lang}
      />
    </>
  );
}
