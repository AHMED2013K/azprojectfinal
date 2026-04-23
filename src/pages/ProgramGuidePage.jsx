import { Link, useLocation } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackEvent } from '../utils/tracking';

const WA_NUMBER = '21656590703';
const APPLY_URL = 'https://app.edugrowth.tn/apply?utm_source=website&utm_medium=program_page&utm_campaign=alternance_france';

const programData = {
  '/programmes/alternance-france': {
    title: 'Alternance en France depuis la Tunisie | Guide 2026',
    description:
      "Tout savoir pour trouver une alternance en France: candidature, entreprise, contrat et visa.",
    h1: 'Alternance en France depuis la Tunisie',
    chips: [
      'alternance en france pour tunisiens',
      'alternance france étudiant tunisien',
      'étudier en france en alternance depuis la tunisie',
    ],
    highlights: [
      "Cette page programme sert à capter une demande SEO précise autour de l’alternance en France depuis la Tunisie.",
      "Le contenu rassure l’étudiant international, explique le chemin réaliste, puis pousse vers un CTA apply très visible.",
    ],
    proof: [
      { stat: '205+', label: 'candidatures déjà reçues via le formulaire public' },
      { stat: '400+', label: 'clics LinkedIn observés sur l’offre alternance France' },
      { stat: '1', label: 'funnel direct entre SEO, apply et CRM' },
    ],
    faq: [
      ['Comment trouver une alternance en France depuis la Tunisie ?', 'Il faut combiner choix du programme, ciblage d’entreprises, CV adapté, candidatures disciplinées et relances structurées.'],
      ['Peut-on faire une alternance en France en tant qu’étudiant international ?', 'Oui, mais il faut vérifier la réalité du programme, du timing administratif et des attentes du marché avant de construire la stratégie.'],
      ['Pourquoi candidater via le lien apply ?', 'Parce que le formulaire apply centralise le profil dans le CRM EduGrowth et permet un suivi plus propre et plus rapide.'],
    ],
    relatedLinks: [
      { to: '/alternance-en-france-pour-tunisiens', label: 'Landing SEO alternance en France pour Tunisiens' },
      { to: '/etudier-en-france-depuis-tunisie', label: 'Guide études en France' },
      { to: '/blog/alternance-france-pour-tunisiens', label: 'Article alternance France pour les Tunisiens' },
      { to: '/blog/comment-etudier-en-france-depuis-la-tunisie', label: 'Étudier en France depuis la Tunisie' },
      { to: '/book-consultation', label: 'Réserver une consultation' },
    ],
  },
  '/programmes/ausbildung-allemagne': {
    title: 'Ausbildung en Allemagne depuis la Tunisie | EduGrowth',
    description:
      "Guide complet Ausbildung: conditions, langue, dossier, contrat et installation en Allemagne.",
    h1: 'Ausbildung en Allemagne depuis la Tunisie',
    relatedLinks: [
      { to: '/etudier-en-allemagne-depuis-tunisie', label: 'Guide Allemagne' },
      { to: '/blog/etudier-en-allemagne-depuis-la-tunisie', label: 'Article complet Allemagne' },
      { to: '/blog/bourses-etudes-etranger-tunisiens', label: 'Bourses à l’étranger' },
      { to: '/book-consultation', label: 'Réserver une consultation' },
    ],
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
          '1. Validation du profil, du niveau académique et du timing.',
          '2. Sélection des écoles, programmes et pistes d’entreprises cohérents.',
          '3. Candidatures, entretiens, relances et ajustements du positionnement.',
          '4. Envoi du profil via apply, signature du contrat puis préparation administrative.',
        ],
        proofTitle: 'Preuve de traction',
        faqTitle: 'FAQ alternance France',
        supportTitle: "Besoin d'un accompagnement personnalisé ?",
        applyText: "Le SEO attire la demande. Le lien apply convertit les profils qui veulent vraiment avancer.",
        applyPrimary: 'Remplir le formulaire apply',
        related: 'Ressources liées',
        consultation: 'Réserver une consultation gratuite',
        whatsapp: 'Conseiller WhatsApp',
        whatsappText: 'Bonjour EduGrowth, je veux un accompagnement pour ce programme.',
      }
    : {
        roadmap: 'Recommended Roadmap',
        steps: [
          '1. Validate your profile, academic level, and timeline.',
          '2. Select coherent schools, programs, and employer targets.',
          '3. Run applications, interviews, follow-ups, and positioning adjustments.',
          '4. Send your profile through apply, secure the contract, and prepare admin steps.',
        ],
        proofTitle: 'Proof of demand',
        faqTitle: 'Alternance France FAQ',
        supportTitle: 'Need personalized guidance?',
        applyText: 'SEO captures demand. The apply link converts serious profiles into CRM-qualified leads.',
        applyPrimary: 'Open apply form',
        related: 'Related resources',
        consultation: 'Book Free Consultation',
        whatsapp: 'WhatsApp Advisor',
        whatsappText: 'Hello EduGrowth, I want guidance for this program.',
      };

  const handleApplyClick = () => {
    trackEvent('cta_click', {
      cta_type: 'program_apply',
      page: pathname,
    });
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

          {data.chips?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {data.chips.map((chip) => (
                <span key={chip} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700">
                  {chip}
                </span>
              ))}
            </div>
          ) : null}

          {data.highlights?.length ? (
            <section className="mt-8 grid gap-4 md:grid-cols-2">
              {data.highlights.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </section>
          ) : null}

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-black">{copy.roadmap}</h2>
            {copy.steps.map((step) => (
              <p key={step}>{step}</p>
            ))}
          </section>

          {data.proof?.length ? (
            <section className="mt-8">
              <h2 className="text-2xl font-black">{copy.proofTitle}</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {data.proof.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-3xl font-black text-[#005A9C]">{item.stat}</p>
                    <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-8 rounded-2xl bg-slate-950 p-6 text-white">
            <h2 className="text-2xl font-black">{copy.supportTitle}</h2>
            <p className="mt-3 text-slate-300">{copy.applyText}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {pathname === '/programmes/alternance-france' ? (
                <a
                  href={APPLY_URL}
                  onClick={handleApplyClick}
                  className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-black text-white"
                >
                  {copy.applyPrimary}
                </a>
              ) : null}
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

          {data.faq?.length ? (
            <section className="mt-8">
              <h2 className="text-2xl font-black">{copy.faqTitle}</h2>
              <div className="mt-4 space-y-4">
                {data.faq.map(([q, a]) => (
                  <div key={q} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="font-black">{q}</p>
                    <p className="mt-2 text-slate-600">{a}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-8">
            <h2 className="text-2xl font-black">{copy.related}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {data.relatedLinks.map((item) => (
                <Link key={item.to} to={item.to} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-bold text-[#005A9C] transition hover:-translate-y-0.5 hover:shadow-sm">
                  {item.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
