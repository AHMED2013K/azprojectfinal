import { Link, useLocation } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

const programData = {
  '/programmes/alternance-france': {
    title: 'Alternance en France depuis la Tunisie | Guide 2026',
    description:
      "Tout savoir pour trouver une alternance en France: candidature, entreprise, contrat et visa.",
    h1: 'Alternance en France depuis la Tunisie',
  },
  '/programmes/ausbildung-allemagne': {
    title: 'Ausbildung en Allemagne depuis la Tunisie | EduGrowth',
    description:
      "Guide complet Ausbildung: conditions, langue, dossier, contrat et installation en Allemagne.",
    h1: 'Ausbildung en Allemagne depuis la Tunisie',
  },
};

export default function ProgramGuidePage() {
  const { lang, toggleLanguage } = useLanguage();
  const { pathname } = useLocation();
  const data = programData[pathname] || programData['/programmes/alternance-france'];
  const copy = lang === 'fr'
    ? {
        roadmap: 'Roadmap recommandée',
        steps: [
          '1. Validation du profil et du niveau linguistique.',
          '2. Sélection des établissements ou entreprises ciblés.',
          '3. Candidatures et préparation des entretiens.',
          '4. Signature du contrat et dossier visa.',
        ],
        supportTitle: "Besoin d'un accompagnement personnalisé ?",
        consultation: 'Réserver une consultation gratuite',
        whatsapp: 'Conseiller WhatsApp',
        whatsappText: 'Bonjour EduGrowth, je veux un accompagnement pour ce programme.',
      }
    : {
        roadmap: 'Recommended Roadmap',
        steps: [
          '1. Validate your profile and language level.',
          '2. Select the target institutions or employers.',
          '3. Prepare applications and interviews.',
          '4. Finalize the contract and visa file.',
        ],
        supportTitle: 'Need personalized guidance?',
        consultation: 'Book Free Consultation',
        whatsapp: 'WhatsApp Advisor',
        whatsappText: 'Hello EduGrowth, I want guidance for this program.',
      };

  return (
    <>
      <SEOHelmet title={data.title} description={data.description} canonical={`https://edugrowth.tn${pathname}`} lang={lang} />
      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-bold text-[#005A9C]">
            <div className="flex flex-wrap gap-3">
              <Link to="/abroad-zone">Abroad Zone</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/book-consultation">Book Consultation</Link>
            </div>
            <LanguageSwitch lang={lang} onToggle={toggleLanguage} />
          </div>
          <h1 className="mt-4 text-4xl font-black">{data.h1}</h1>
          <p className="mt-3 text-slate-600">{data.description}</p>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-black">{copy.roadmap}</h2>
            {copy.steps.map((step) => (
              <p key={step}>{step}</p>
            ))}
          </section>

          <section className="mt-8 rounded-2xl bg-slate-950 p-6 text-white">
            <h2 className="text-2xl font-black">{copy.supportTitle}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/book-consultation" className="rounded-xl bg-[#005A9C] px-5 py-3 text-sm font-black">
                {copy.consultation}
              </Link>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/30 px-5 py-3 text-sm font-black"
              >
                {copy.whatsapp}
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
