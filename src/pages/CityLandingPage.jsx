import { Link, useLocation } from 'react-router-dom';
import { Building2, Home, MessageCircle } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

const cityData = {
  '/agence-etude-etranger-tunis': {
    city: 'Tunis',
    h1: "Agence étude à l'étranger à Tunis",
    title: "Agence étude à l'étranger Tunis | EduGrowth",
    description: "Conseillers study abroad à Tunis: orientation, admission, visa étudiant, suivi dossier et préparation départ.",
    links: [
      { to: '/etudier-en-france-depuis-tunisie', label: 'Étudier en France depuis la Tunisie' },
      { to: '/blog/campus-france-tunisie-etapes', label: 'Campus France Tunisie : étapes' },
      { to: '/blog/refus-visa-etudiant-france-erreurs', label: 'Erreurs visa étudiant France' },
      { to: '/book-consultation', label: 'Réserver une consultation' },
    ],
  },
  '/agence-etude-etranger-sousse': {
    city: 'Sousse',
    h1: "Agence étude à l'étranger à Sousse",
    title: "Agence étude à l'étranger Sousse | EduGrowth",
    description: "Accompagnement complet pour étudier à l'étranger depuis Sousse: choix pays, dossier, admission, visa.",
    links: [
      { to: '/etudier-en-france-depuis-tunisie', label: 'Étudier en France depuis la Tunisie' },
      { to: '/etudier-en-allemagne-depuis-tunisie', label: 'Étudier en Allemagne depuis la Tunisie' },
      { to: '/blog/bourses-etudes-etranger-tunisiens', label: 'Bourses à l’étranger' },
      { to: '/book-consultation', label: 'Réserver une consultation' },
    ],
  },
  '/agence-etude-etranger-sfax': {
    city: 'Sfax',
    h1: "Agence étude à l'étranger à Sfax",
    title: "Agence étude à l'étranger Sfax | EduGrowth",
    description: "Service local à Sfax pour étudiants: stratégie d'admission internationale, préparation visa et support WhatsApp.",
    links: [
      { to: '/etudier-au-canada-depuis-tunisie', label: 'Étudier au Canada depuis la Tunisie' },
      { to: '/blog/cout-des-etudes-a-l-etranger', label: 'Coût des études à l’étranger' },
      { to: '/blog/top-pays-pour-etudier', label: 'Top pays pour étudier' },
      { to: '/book-consultation', label: 'Réserver une consultation' },
    ],
  },
};

export default function CityLandingPage() {
  const { lang, toggleLanguage } = useLanguage();
  const { pathname } = useLocation();
  const data = cityData[pathname] || cityData['/agence-etude-etranger-tunis'];
  const copy = lang === 'fr'
    ? {
        back: 'Retour à Abroad Zone',
        orientation: 'Orientation',
        orientationText: 'Sélection du pays et du programme selon votre budget et votre profil.',
        admissions: 'Admissions',
        admissionsText: 'Montage du dossier, gestion des deadlines et suivi des candidatures.',
        visa: 'Visa',
        visaText: "Checklist visa, préparation à l'entretien et conformité des documents.",
        consultation: 'Réserver une consultation gratuite',
        whatsappText: `Bonjour, je suis à ${data.city} et je veux étudier à l'étranger.`,
        localTitle: 'Présence locale + accompagnement digital',
        related: 'Guides utiles depuis votre ville',
        localText:
          'Notre équipe suit votre dossier en continu avec un support rapide sur WhatsApp et une méthode structurée jusqu’au départ.',
      }
    : {
        back: 'Back to Abroad Zone',
        orientation: 'Orientation',
        orientationText: 'Country and program selection based on your budget and profile.',
        admissions: 'Admissions',
        admissionsText: 'Application file setup, deadline management, and submission follow-up.',
        visa: 'Visa',
        visaText: 'Visa checklist, interview preparation, and document compliance.',
        consultation: 'Book Free Consultation',
        whatsappText: `Hello, I am based in ${data.city} and I want to study abroad.`,
        localTitle: 'Local presence + digital guidance',
        related: 'Useful guides from your city',
        localText:
          'Our team follows your file continuously with fast WhatsApp support and a structured method until departure.',
      };

  return (
    <>
      <SEOHelmet
        title={data.title}
        description={data.description}
        canonical={`https://edugrowth.tn${pathname}`}
        lang={lang}
      />
      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <Link to="/abroad-zone" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">
              <Home size={16} /> {copy.back}
            </Link>
            <LanguageSwitch lang={lang} onToggle={toggleLanguage} />
          </div>

          <h1 className="mt-6 text-4xl font-black">{data.h1}</h1>
          <p className="mt-3 text-slate-600">{data.description}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-black uppercase text-slate-500">Orientation</p>
              <p className="mt-2 text-sm">{copy.orientationText}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-black uppercase text-slate-500">{copy.admissions}</p>
              <p className="mt-2 text-sm">{copy.admissionsText}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-black uppercase text-slate-500">{copy.visa}</p>
              <p className="mt-2 text-sm">{copy.visaText}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book-consultation" className="rounded-xl bg-[#005A9C] px-5 py-3 text-sm font-black text-white">
              {copy.consultation}
            </Link>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>

          <section className="mt-10 rounded-2xl bg-slate-950 p-6 text-white">
            <h2 className="flex items-center gap-2 text-2xl font-black"><Building2 size={22} /> {copy.localTitle}</h2>
            <p className="mt-3 text-slate-300">{copy.localText}</p>
            <p className="mt-3 text-xs text-slate-400">
              Mots-clés locaux: agence étude à l'étranger {data.city.toLowerCase()} · study abroad agency Tunisia ·
              الدراسة بالخارج تونس
            </p>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-black">{copy.related}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {data.links.map((item) => (
                <Link key={item.to} to={item.to} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 font-bold text-[#005A9C] transition hover:-translate-y-0.5 hover:shadow-sm">
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
