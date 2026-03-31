import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Home, MessageCircle } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

const countryData = {
  '/etudier-en-france-depuis-tunisie': {
    country: 'France',
    title: "Étudier en France depuis la Tunisie",
    description: "Guide complet pour étudier en France depuis la Tunisie: admission, Campus France, visa étudiant, budget, logement et calendrier.",
    h1: "Étudier en France depuis la Tunisie: guide complet 2026",
    tuition: "2 770€ à 3 770€/an (public) + coûts de vie",
    visa: "VLS-TS étudiant avec dossier Campus France",
    timeline: ["Choix du programme (M-10)", "Dossier Campus France (M-8)", "Admission & financement (M-5)", "Visa & départ (M-2)"],
  },
  '/etudier-en-allemagne-depuis-tunisie': {
    country: 'Allemagne',
    title: "Étudier en Allemagne depuis la Tunisie",
    description: "Comment étudier en Allemagne: admission, blocage financier, visa, Ausbildung et opportunités pour étudiants tunisiens.",
    h1: "Étudier en Allemagne depuis la Tunisie",
    tuition: "Souvent faible en public, frais semestriels variables",
    visa: "Visa national étudiant + compte bloqué",
    timeline: ["Validation langue et programme", "Candidature université", "Compte bloqué", "Visa & installation"],
  },
  '/etudier-au-canada-depuis-tunisie': {
    country: 'Canada',
    title: "Étudier au Canada depuis la Tunisie",
    description: "Guide pour étudier au Canada depuis la Tunisie: admission collège/université, permis d'études, preuve financière, coûts.",
    h1: "Étudier au Canada depuis la Tunisie",
    tuition: "En moyenne 15 000 à 30 000 CAD/an selon programme",
    visa: "Permis d'études + preuve de fonds + biométrie",
    timeline: ["Choisir province et programme", "Admission établissement", "Préparer financement", "Permis d'études"],
  },
  '/etudier-a-chypre-depuis-tunisie': {
    country: 'Chypre',
    title: "Étudier à Chypre depuis la Tunisie",
    description: "Admissions, budget, logement et visa pour étudier à Chypre en tant qu'étudiant tunisien.",
    h1: "Étudier à Chypre depuis la Tunisie",
    tuition: "Souvent accessible comparé à d'autres destinations",
    visa: "Visa étudiant selon établissement et documents requis",
    timeline: ["Sélection université", "Dépôt dossier", "Admission", "Visa & arrivée"],
  },
  '/etudier-en-turquie-depuis-tunisie': {
    country: 'Turquie',
    title: "Étudier en Turquie depuis la Tunisie",
    description: "Guide admission et visa pour étudier en Turquie depuis la Tunisie.",
    h1: "Étudier en Turquie depuis la Tunisie",
    tuition: "Variable selon université publique/privée",
    visa: "Visa étudiant et justificatifs académiques",
    timeline: ["Choix université", "Candidature", "Admission", "Visa étudiant"],
  },
  '/etudier-a-dubai-depuis-tunisie': {
    country: 'Dubai',
    title: "Étudier à Dubai depuis la Tunisie",
    description: "Guide pratique pour admissions, budget et visa étudiant à Dubai.",
    h1: "Étudier à Dubai depuis la Tunisie",
    tuition: "Frais académiques variables selon institution",
    visa: "Visa étudiant sponsorisé par établissement",
    timeline: ["Sélection programme", "Admission", "Paiement initial", "Visa et installation"],
  },
};

export default function CountryGuidePage() {
  const { lang, toggleLanguage } = useLanguage();
  const { pathname } = useLocation();
  const data = countryData[pathname] || countryData['/etudier-en-france-depuis-tunisie'];
  const copy = lang === 'fr'
    ? {
        back: 'Retour à Abroad Zone',
        advisor: 'Conseiller WhatsApp',
        advisorText: `Bonjour EduGrowth, je veux étudier en ${data.country}.`,
        badge: "Guide d'études à l'étranger",
        tuition: 'Estimation des frais',
        visa: 'Parcours visa',
        timeline: 'Timeline recommandée',
        supportTitle: "Besoin d'un accompagnement personnalisé ?",
        supportText:
          'Nos conseillers vous aident à choisir le bon programme, préparer le dossier et sécuriser votre visa.',
        consultation: 'Réserver une consultation gratuite',
        whatsappNow: 'WhatsApp maintenant',
        supportWhatsapp: `Je souhaite un accompagnement pour étudier en ${data.country}.`,
        related: 'Guides liés',
      }
    : {
        back: 'Back to Abroad Zone',
        advisor: 'WhatsApp Advisor',
        advisorText: `Hello EduGrowth, I want to study in ${data.country}.`,
        badge: 'Study Abroad Guide',
        tuition: 'Tuition Estimate',
        visa: 'Visa Path',
        timeline: 'Recommended Timeline',
        supportTitle: 'Need personalized guidance?',
        supportText:
          'Our advisors help you choose the right program, prepare your application, and secure your visa.',
        consultation: 'Book Free Consultation',
        whatsappNow: 'WhatsApp Now',
        supportWhatsapp: `I want personalized guidance to study in ${data.country}.`,
        related: 'Related Guides',
      };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.h1,
    description: data.description,
    author: {
      '@type': 'Organization',
      name: 'EduGrowth Outsourcing',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EduGrowth Outsourcing',
      logo: {
        '@type': 'ImageObject',
        url: 'https://edugrowth.tn/Submark.png',
      },
    },
  };

  return (
    <>
      <SEOHelmet
        title={`${data.title} | EduGrowth`}
        description={data.description}
        canonical={`https://edugrowth.tn${pathname}`}
        structuredData={structuredData}
        lang={lang}
      />

      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
            <Link to="/abroad-zone" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">
              <Home size={16} /> {copy.back}
            </Link>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.advisorText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700"
            >
              <MessageCircle size={16} /> {copy.advisor}
            </a>
            </div>
            <LanguageSwitch lang={lang} onToggle={toggleLanguage} />
          </div>

          <article className="rounded-3xl bg-white p-8 shadow-sm">
            <p className="inline-flex rounded-full bg-blue-50 px-4 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#005A9C]">
              {copy.badge}
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight">{data.h1}</h1>
            <p className="mt-4 text-slate-600">{data.description}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-5">
                <h2 className="text-sm font-black uppercase text-slate-500">{copy.tuition}</h2>
                <p className="mt-2 font-semibold">{data.tuition}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-5">
                <h2 className="text-sm font-black uppercase text-slate-500">{copy.visa}</h2>
                <p className="mt-2 font-semibold">{data.visa}</p>
              </div>
            </div>

            <section className="mt-10">
              <h2 className="text-2xl font-black">{copy.timeline}</h2>
              <div className="mt-4 space-y-3">
                {data.timeline.map((step) => (
                  <p key={step} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 size={18} className="text-emerald-600" /> {step}
                  </p>
                ))}
              </div>
            </section>

            <section className="mt-10 rounded-2xl bg-slate-950 p-6 text-white">
              <h2 className="text-2xl font-black">{copy.supportTitle}</h2>
              <p className="mt-2 text-slate-300">{copy.supportText}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/book-consultation" className="rounded-xl bg-[#005A9C] px-5 py-3 text-sm font-black">{copy.consultation}</Link>
                <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.supportWhatsapp)}`} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/30 px-5 py-3 text-sm font-black">{copy.whatsappNow}</a>
              </div>
            </section>
          </article>

          <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-black">{copy.related}</h3>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-bold text-[#005A9C]">
              <Link to="/etudier-en-france-depuis-tunisie">Étudier en France</Link>
              <Link to="/etudier-en-allemagne-depuis-tunisie">Étudier en Allemagne</Link>
              <Link to="/etudier-au-canada-depuis-tunisie">Étudier au Canada</Link>
              <Link to="/etudier-en-turquie-depuis-tunisie">Étudier en Turquie</Link>
              <Link to="/etudier-a-dubai-depuis-tunisie">Étudier à Dubai</Link>
              <Link to="/blog">Blog Study Abroad</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
