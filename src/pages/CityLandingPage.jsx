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
    intro:
      "Depuis Tunis, les étudiants ont souvent plus d'options mais aussi plus de bruit. Notre rôle est de transformer une intention floue en plan concret: pays pertinent, budget réaliste, dossier solide et calendrier maîtrisé.",
    localSignals: [
      "Accompagnement adapté aux étudiants de Tunis, Ariana, La Marsa, Manouba et Ben Arous.",
      'Support rapide sur WhatsApp pour débloquer documents, choix de pays et prochaines étapes.',
      'Méthode orientée résultats: orientation, admission, visa, départ.',
    ],
    process: [
      {
        title: 'Audit du profil',
        text: "Nous analysons niveau d'études, projet, langue, budget et contraintes familiales pour éviter les candidatures mal ciblées.",
      },
      {
        title: 'Sélection du pays et des écoles',
        text: "Nous priorisons les options les plus réalistes pour un étudiant basé à Tunis qui veut avancer vite sans se disperser.",
      },
      {
        title: 'Préparation du dossier et du visa',
        text: "Nous structurons les documents, la logique du projet et la préparation entretien pour limiter les erreurs qui bloquent.",
      },
    ],
    faq: [
      {
        question: "Pourquoi choisir une agence étude à l'étranger à Tunis ?",
        answer:
          "Parce qu'un bon accompagnement vous aide à choisir un pays adapté, éviter les erreurs de dossier et avancer plus vite vers l'admission et le visa.",
      },
      {
        question: 'Quels pays conseillez-vous le plus depuis Tunis ?',
        answer:
          "La France, l'Allemagne, le Canada, Chypre, la Turquie et Dubai font partie des destinations les plus demandées selon le budget et le projet.",
      },
      {
        question: 'Est-ce que vous aidez pour Campus France et le visa ?',
        answer:
          "Oui, nous accompagnons la stratégie dossier, les documents, la préparation entretien et le suivi jusqu'à la prochaine étape.",
      },
    ],
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
    intro:
      "À Sousse, beaucoup d'étudiants cherchent une solution claire, rapide et rassurante pour partir étudier à l'étranger. Nous structurons le projet pour éviter les mauvaises destinations, les budgets irréalistes et les dossiers incomplets.",
    localSignals: [
      'Accompagnement pensé pour Sousse, Monastir, Mahdia et les villes voisines du Sahel.',
      'Suivi simple et rapide pour les étudiants qui veulent avancer sans déplacements inutiles.',
      'Orientation personnalisée selon budget, notes, langue et délai de départ.',
    ],
    process: [
      {
        title: 'Clarifier le projet',
        text: "Nous transformons vos idées en parcours cohérent avec un vrai ordre de priorité entre France, Allemagne, Canada ou options plus accessibles.",
      },
      {
        title: 'Construire un dossier compétitif',
        text: "Nous vous aidons à préparer les pièces utiles, la logique de candidature et les échéances importantes sans perdre de temps.",
      },
      {
        title: 'Sécuriser la phase visa',
        text: "Nous vérifions le financement, la cohérence du projet et la préparation entretien pour réduire le risque de blocage final.",
      },
    ],
    faq: [
      {
        question: "Comment choisir le bon pays pour étudier depuis Sousse ?",
        answer:
          "Le bon choix dépend du budget, du niveau linguistique, du projet académique et des délais. Nous vous aidons à comparer les options réalistes plutôt que viser trop large.",
      },
      {
        question: 'Pouvez-vous accompagner un étudiant à distance depuis Sousse ?',
        answer:
          'Oui, notre méthode est pensée pour un suivi digital fluide avec WhatsApp, appels et checklist structurée du début à la fin.',
      },
      {
        question: 'Aidez-vous aussi pour les bourses et le budget ?',
        answer:
          'Oui, nous travaillons la stratégie financière globale, les coûts réels et les options de destinations plus accessibles.',
      },
    ],
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
    intro:
      "À Sfax, beaucoup de familles veulent une démarche sérieuse, rentable et bien pilotée pour les études à l'étranger. Nous aidons à choisir une destination réaliste et à bâtir un dossier crédible jusqu'au visa.",
    localSignals: [
      'Accompagnement adapté aux étudiants de Sfax, Sakiet Ezzit, Sakiet Eddaier et du sud tunisien.',
      'Support WhatsApp réactif pour suivre les étapes sans perdre le fil du dossier.',
      'Approche orientée exécution: admissions, visa, budget, installation.',
    ],
    process: [
      {
        title: 'Diagnostic et stratégie',
        text: "Nous évaluons le dossier pour définir la voie la plus réaliste et rentable selon le profil de l'étudiant.",
      },
      {
        title: 'Candidatures ciblées',
        text: "Nous évitons les candidatures dispersées et concentrons l'effort sur les établissements avec le meilleur potentiel de réussite.",
      },
      {
        title: 'Visa et préparation départ',
        text: "Nous accompagnons la cohérence du projet, le financement et les étapes finales avant installation.",
      },
    ],
    faq: [
      {
        question: "Pourquoi passer par une agence étude à l'étranger à Sfax ?",
        answer:
          "Parce qu'un accompagnement structuré réduit les erreurs, accélère les démarches et aide à construire un projet plus solide face à l'admission et au visa.",
      },
      {
        question: 'Le Canada et la France sont-ils adaptés aux étudiants de Sfax ?',
        answer:
          "Oui, selon le budget et le profil. La France reste très demandée, tandis que le Canada peut être pertinent pour certains parcours mieux préparés financièrement.",
      },
      {
        question: 'Est-ce que vous aidez à préparer tout le parcours jusqu’au départ ?',
        answer:
          "Oui, nous accompagnons l'étudiant depuis l'orientation jusqu'aux étapes de visa, installation et prochaines actions utiles.",
      },
    ],
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
        introTitle: 'Pourquoi cette page locale compte',
        localSignalsTitle: 'Pourquoi les étudiants de votre ville nous contactent',
        processTitle: 'Comment nous accompagnons votre dossier',
        faqTitle: 'Questions fréquentes',
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
        introTitle: 'Why this local page matters',
        localSignalsTitle: 'Why students in your city contact us',
        processTitle: 'How we move your file forward',
        faqTitle: 'Frequently asked questions',
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
        faqItems={data.faq}
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

          <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-black">{copy.introTitle}</h2>
            <p className="mt-3 leading-7 text-slate-700">{data.intro}</p>
          </section>

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

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black">{copy.localSignalsTitle}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {data.localSignals.map((signal) => (
                <div key={signal} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {signal}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-black">{copy.processTitle}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {data.process.map((step) => (
                <article key={step.title} className="rounded-2xl bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-black">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{step.text}</p>
                </article>
              ))}
            </div>
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

          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black">{copy.faqTitle}</h2>
            <div className="mt-4 space-y-4">
              {data.faq.map((item) => (
                <div key={item.question} className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="text-lg font-black">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
