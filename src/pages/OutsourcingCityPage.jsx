import { Link, useLocation } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

const cityData = {
  '/outsourcing-tunis': {
    city: 'Tunis',
    title: 'Outsourcing Tunis | Education Operations by EduGrowth',
    h1: 'Outsourcing services in Tunis for education institutions',
  },
  '/outsourcing-sousse': {
    city: 'Sousse',
    title: 'Outsourcing Sousse | Education Operations by EduGrowth',
    h1: 'Outsourcing services in Sousse for education institutions',
  },
  '/outsourcing-sfax': {
    city: 'Sfax',
    title: 'Outsourcing Sfax | Education Operations by EduGrowth',
    h1: 'Outsourcing services in Sfax for education institutions',
  },
};

export default function OutsourcingCityPage() {
  const { lang, toggleLanguage } = useLanguage();
  const { pathname } = useLocation();
  const data = cityData[pathname] || cityData['/outsourcing-tunis'];
  const copy = lang === 'fr'
    ? {
        description: `Équipes dédiées à ${data.city} pour la qualification des leads, le suivi des admissions et les opérations CRM.`,
        speed: 'Vitesse',
        speedText: 'Déploiement rapide et workflows de réponse pilotés par SLA.',
        quality: 'Qualité',
        qualityText: 'Contrôles qualité et reporting KPI clair pour les équipes admissions.',
        savings: 'Économies',
        savingsText: "Réduisez vos coûts opérationnels tout en augmentant la capacité de l'équipe.",
        consultation: 'Réserver une consultation gratuite',
        whatsappText: `Bonjour EduGrowth, j’ai besoin d’une proposition d’outsourcing pour des opérations à ${data.city}.`,
      }
    : {
        description: `Dedicated teams in ${data.city} for lead qualification, admissions follow-up, and CRM operations.`,
        speed: 'Speed',
        speedText: 'Fast deployment and SLA-driven response workflows.',
        quality: 'Quality',
        qualityText: 'Quality controls and clear KPI reporting for admissions teams.',
        savings: 'Savings',
        savingsText: 'Reduce operating cost while scaling team capacity.',
        consultation: 'Book Free Consultation',
        whatsappText: `Hello EduGrowth, I need an outsourcing proposal for operations in ${data.city}.`,
      };

  return (
    <>
      <SEOHelmet
        title={data.title}
        description={lang === 'fr'
          ? `Externalisation multilingue des admissions et du recrutement étudiant à ${data.city}, Tunisie.`
          : `Multilingual admissions and student recruitment outsourcing in ${data.city}, Tunisia.`}
        canonical={`https://edugrowth.tn${pathname}`}
        lang={lang}
      />
      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-bold text-[#005A9C]">
            <div className="flex flex-wrap gap-3">
              <Link to="/outsourcing">Outsourcing</Link>
              <Link to="/education-outsourcing-tunisia">Education Outsourcing Tunisia</Link>
              <Link to="/book-consultation">Book Consultation</Link>
            </div>
            <LanguageSwitch lang={lang} onToggle={toggleLanguage} />
          </div>
          <h1 className="mt-4 text-4xl font-black">{data.h1}</h1>
          <p className="mt-3 text-slate-600">{copy.description}</p>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-4">
              <h2 className="text-sm font-black uppercase text-slate-500">{copy.speed}</h2>
              <p className="mt-2 text-sm">{copy.speedText}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <h2 className="text-sm font-black uppercase text-slate-500">{copy.quality}</h2>
              <p className="mt-2 text-sm">{copy.qualityText}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <h2 className="text-sm font-black uppercase text-slate-500">{copy.savings}</h2>
              <p className="mt-2 text-sm">{copy.savingsText}</p>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book-consultation" className="rounded-xl bg-[#005A9C] px-5 py-3 text-sm font-black text-white">
              {copy.consultation}
            </Link>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
