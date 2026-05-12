import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Home, MessageCircle, Send } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

const countryData = {
  '/etudier-en-allemagne-depuis-tunisie': {
    country: 'Allemagne',
    title: "Étudier en Allemagne depuis la Tunisie | Visa, Ausbildung, budget",
    description: "Étudier en Allemagne depuis la Tunisie: admission, compte bloqué, visa étudiant, budget, logement, universités et opportunités Ausbildung pour Tunisiens.",
    h1: "Étudier en Allemagne depuis la Tunisie",
    tuition: "Souvent faible en public, avec frais semestriels et budget de vie à prévoir",
    visa: "Visa national étudiant + compte bloqué + admission",
    timeline: ["Choix du programme et langue", "Candidature université ou Hochschule", "Compte bloqué et financement", "Visa puis installation"],
    highlights: [
      "Les universités publiques peuvent être très compétitives en coût",
      "Le compte bloqué reste un point critique du dossier",
      "La langue et la cohérence du projet pèsent fortement",
      "L’Ausbildung peut être une alternative concrète pour certains profils",
    ],
    budget: [
      "Frais académiques souvent modérés en public",
      "Logement variable selon la ville",
      "Assurance santé obligatoire",
      "Compte bloqué à anticiper tôt",
    ],
    programs: ['Licence', 'Master', 'Ausbildung', 'Langue allemande', 'Ingénierie', 'IT', 'Business', 'Santé'],
    faq: [
      {
        q: "Peut-on étudier en Allemagne sans parler allemand ?",
        a: "Oui pour certains programmes en anglais, mais beaucoup de parcours et l’intégration quotidienne restent plus faciles avec un bon niveau d’allemand.",
      },
      {
        q: "Le compte bloqué est-il obligatoire ?",
        a: "Dans la majorité des cas, il fait partie des preuves financières attendues pour le visa étudiant en Allemagne.",
      },
      {
        q: "Quelle différence entre université et Ausbildung ?",
        a: "L’université vise un cursus académique, tandis que l’Ausbildung combine formation théorique et expérience pratique rémunérée.",
      },
    ],
    relatedLinks: [
      { to: "/programmes/ausbildung-allemagne", label: "Guide Ausbildung Allemagne" },
      { to: "/blog/etudier-en-allemagne-depuis-la-tunisie", label: "Article complet Allemagne" },
      { to: "/blog/bourses-etudes-etranger-tunisiens", label: "Bourses à l’étranger" },
      { to: "/book-consultation", label: "Réserver une consultation" },
    ],
  },
  '/etudier-a-chypre-depuis-tunisie': {
    country: 'Chypre du Nord',
    title: "Étudier à Chypre du Nord depuis la Tunisie | Bourses jusqu’à 70%",
    description: "Étudier à Chypre du Nord depuis la Tunisie: European University of Lefke, bourses jusqu’à 70%, admission Bachelor, Master et PhD.",
    h1: "Étudier à Chypre du Nord depuis la Tunisie",
    tuition: "Bourses possibles jusqu’à 70% des frais de scolarité selon le dossier",
    visa: "Procédure facilitée avec vérification des règles applicables avant le départ",
    timeline: ["Évaluation du profil", "Choix European University of Lefke", "Admission", "Préparation du départ"],
    highlights: [
      "Destination attractive pour les profils qui cherchent une voie plus accessible",
      "Vérifier la reconnaissance du programme et la qualité de l’établissement",
      "Prévoir budget logement et frais de vie",
      "Bien cadrer les délais d’admission et de visa",
    ],
    budget: [
      "Frais académiques variables selon université",
      "Logement étudiant ou colocation",
      "Transport et dépenses courantes",
      "Frais administratifs et assurance",
    ],
    programs: ['Bachelor', 'Master', 'PhD', 'IT', 'Business', 'Génie mécanique', 'Dentisterie', 'Ingénierie'],
    faq: [
      { q: "Chypre est-elle une destination abordable ?", a: "Elle peut l’être selon l’établissement choisi, mais il faut regarder le coût global et pas seulement les frais d’inscription." },
      { q: "Faut-il passer par une agence ?", a: "Un accompagnement réduit les erreurs sur le choix de l’école, le dossier et la préparation du départ." },
    ],
    relatedLinks: [
      { to: "/study-in-north-cyprus", label: "Page prioritaire Chypre du Nord" },
      { to: "/abroad-zone", label: "Voir Abroad Zone" },
      { to: "/blog/top-pays-pour-etudier", label: "Comparer les destinations" },
      { to: "/book-consultation", label: "Réserver une consultation" },
      { to: "/etudier-en-turquie-depuis-tunisie", label: "Voir aussi Turquie" },
    ],
  },
  '/etudier-en-turquie-depuis-tunisie': {
    country: 'Turquie',
    title: "Étudier en Turquie depuis la Tunisie | Universités et bourses",
    description: "Étudier en Turquie depuis la Tunisie: universités, admission, bourses, budget, logement, visa étudiant et choix de programme pour étudiants tunisiens.",
    h1: "Étudier en Turquie depuis la Tunisie",
    tuition: "Variable selon université publique ou privée",
    visa: "Visa étudiant et justificatifs académiques",
    timeline: ["Choix université", "Candidature", "Admission", "Visa étudiant"],
    highlights: [
      "La Turquie attire sur le rapport coût / accessibilité",
      "Il faut comparer qualité académique et débouchés",
      "Le dossier doit rester cohérent avec votre projet",
      "L’installation et le logement doivent être anticipés",
    ],
    budget: [
      "Frais de scolarité selon établissement",
      "Logement et alimentation",
      "Transport local",
      "Assurance et dépenses administratives",
    ],
    programs: ['Médecine', 'Dentisterie', 'Ingénierie', 'IT', 'Business', 'Architecture', 'Licence', 'Master'],
    faq: [
      { q: "Quels profils choisissent la Turquie ?", a: "Souvent les profils à la recherche d’une destination plus flexible en admission et en budget." },
      { q: "Le visa est-il compliqué ?", a: "Il reste gérable avec un dossier propre, une admission valide et des justificatifs complets." },
    ],
    relatedLinks: [
      { to: "/abroad-zone", label: "Voir Abroad Zone" },
      { to: "/blog/top-pays-pour-etudier", label: "Comparer les destinations" },
      { to: "/book-consultation", label: "Réserver une consultation" },
      { to: "/etudier-a-dubai-depuis-tunisie", label: "Voir aussi Dubai" },
    ],
  },
  '/etudier-a-dubai-depuis-tunisie': {
    country: 'Dubai',
    title: "Étudier à Dubai depuis la Tunisie | Universités UAE",
    description: "Étudier à Dubai depuis la Tunisie: admissions, universités aux Émirats, budget, visa étudiant, logement et programmes internationaux.",
    h1: "Étudier à Dubai depuis la Tunisie",
    tuition: "Frais académiques variables selon institution",
    visa: "Visa étudiant sponsorisé par l’établissement",
    timeline: ["Sélection programme", "Admission", "Paiement initial", "Visa et installation"],
    highlights: [
      "Destination premium avec forte orientation internationale",
      "Le budget global doit être étudié avec précision",
      "Le choix de l’établissement est central",
      "Le projet doit rester réaliste par rapport aux coûts",
    ],
    budget: [
      "Frais de scolarité souvent plus élevés",
      "Logement à budgéter sérieusement",
      "Assurance santé et frais divers",
      "Transport et coût de vie global",
    ],
    programs: ['Business', 'Marketing', 'IT', 'Hospitality', 'Finance', 'Engineering', 'Bachelor', 'Master'],
    faq: [
      { q: "Dubai est-elle adaptée à tous les budgets ?", a: "Non. C’est souvent une destination plus coûteuse, donc il faut valider la faisabilité financière avant de se lancer." },
      { q: "Pourquoi choisir Dubai ?", a: "Pour l’environnement international, certains programmes spécifiques et la proximité avec le Golfe." },
    ],
    relatedLinks: [
      { to: "/abroad-zone", label: "Voir Abroad Zone" },
      { to: "/blog/top-pays-pour-etudier", label: "Comparer les destinations" },
      { to: "/book-consultation", label: "Réserver une consultation" },
      { to: "/etudier-a-chypre-depuis-tunisie", label: "Voir aussi Chypre" },
    ],
  },
  '/etudier-en-russie-depuis-tunisie': {
    country: 'Russie',
    title: "Étudier en Russie depuis la Tunisie | Médecine, ingénierie, budget",
    description: "Étudier en Russie depuis la Tunisie: médecine, ingénierie, admission, budget, visa étudiant et accompagnement pour étudiants tunisiens.",
    h1: "Étudier en Russie depuis la Tunisie",
    tuition: "Souvent compétitif selon ville, université et langue d’enseignement",
    visa: "Visa étudiant après admission et invitation officielle",
    timeline: ["Choix de la spécialité", "Préparation du dossier", "Admission et invitation", "Visa et installation"],
    highlights: [
      "Destination recherchée pour médecine, ingénierie et sciences",
      "Budget souvent plus accessible que plusieurs pays occidentaux",
      "Vérifier langue d’enseignement, reconnaissance et qualité du programme",
      "Préparer l’adaptation culturelle et climatique",
    ],
    budget: [
      "Frais de scolarité selon programme",
      "Logement universitaire ou location",
      "Assurance, traduction et légalisation",
      "Billet, installation et dépenses courantes",
    ],
    programs: ['Médecine', 'Dentisterie', 'Pharmacie', 'Ingénierie', 'IT', 'Aviation', 'Bachelor', 'Master'],
    faq: [
      { q: "La Russie est-elle adaptée aux Tunisiens ?", a: "Oui pour certains profils, surtout si le budget, la spécialité et la reconnaissance du diplôme sont bien vérifiés avant la candidature." },
      { q: "Peut-on étudier en anglais ?", a: "Certains programmes existent en anglais, mais il faut vérifier précisément l’université et le niveau demandé." },
      { q: "Le visa est-il difficile ?", a: "Le visa dépend d’une admission valide, de l’invitation officielle et d’un dossier complet." },
    ],
    relatedLinks: [
      { to: "/abroad-zone", label: "Voir Abroad Zone" },
      { to: "/study-in-north-cyprus", label: "Comparer avec Chypre du Nord" },
      { to: "/blog/top-pays-pour-etudier", label: "Comparer les destinations" },
      { to: "/book-consultation", label: "Réserver une consultation" },
    ],
  },
  '/etudier-en-italie-depuis-tunisie': {
    country: 'Italie',
    title: "Étudier en Italie depuis la Tunisie | Admission, bourses, visa",
    description: "Étudier en Italie depuis la Tunisie: universités, admissions, bourses régionales, budget, visa étudiant et accompagnement pour Tunisiens.",
    h1: "Étudier en Italie depuis la Tunisie",
    tuition: "Frais variables avec possibilités de bourses selon région et profil",
    visa: "Visa étudiant avec admission, hébergement et preuves financières",
    timeline: ["Choix université et programme", "Préinscription", "Bourse et admission", "Visa puis installation"],
    highlights: [
      "Destination européenne attractive pour coût, culture et qualité académique",
      "Bourses régionales possibles selon critères sociaux et académiques",
      "Bien choisir la langue du programme: italien ou anglais",
      "Anticiper logement, délais administratifs et visa",
    ],
    budget: [
      "Frais universitaires selon revenu et université",
      "Logement plus cher dans les grandes villes",
      "Assurance et frais administratifs",
      "Traductions, légalisation et voyage",
    ],
    programs: ['Architecture', 'Design', 'Business', 'Ingénierie', 'Mode', 'Arts', 'Bachelor', 'Master'],
    faq: [
      { q: "L’Italie propose-t-elle des bourses ?", a: "Oui, certaines régions proposent des bourses, mais les critères et délais doivent être vérifiés tôt." },
      { q: "Faut-il parler italien ?", a: "Pas toujours pour les programmes en anglais, mais l’italien aide fortement pour la vie quotidienne." },
      { q: "Le visa étudiant Italie est-il accessible ?", a: "Il est accessible avec admission, preuves financières, logement et dossier complet." },
    ],
    relatedLinks: [
      { to: "/etudier-en-france-depuis-tunisie", label: "Comparer avec France" },
      { to: "/alternance-france", label: "Voir alternance France" },
      { to: "/abroad-zone", label: "Voir Abroad Zone" },
      { to: "/book-consultation", label: "Réserver une consultation" },
    ],
  },
  '/etudier-au-maroc-depuis-tunisie': {
    country: 'Maroc',
    title: "Étudier au Maroc depuis la Tunisie | Universités et écoles privées",
    description: "Étudier au Maroc depuis la Tunisie: écoles privées, universités, admissions, budget, logement et choix de spécialité pour étudiants tunisiens.",
    h1: "Étudier au Maroc depuis la Tunisie",
    tuition: "Budget variable selon école privée, ville et spécialité",
    visa: "Procédures administratives plus simples que plusieurs destinations lointaines",
    timeline: ["Choix école et ville", "Dossier admission", "Inscription", "Logement et installation"],
    highlights: [
      "Proximité culturelle et linguistique intéressante pour les Tunisiens",
      "Choix important en business, santé, ingénierie et écoles privées",
      "Budget souvent plus prévisible que les destinations lointaines",
      "Comparer la reconnaissance et le sérieux de chaque école",
    ],
    budget: [
      "Frais de scolarité selon établissement",
      "Logement étudiant ou colocation",
      "Transport et vie quotidienne",
      "Frais d’inscription et documents",
    ],
    programs: ['Business', 'Médecine privée', 'Dentisterie', 'Ingénierie', 'Architecture', 'Management', 'Bachelor', 'Master'],
    faq: [
      { q: "Pourquoi choisir le Maroc ?", a: "Pour la proximité, la langue, la diversité des écoles et un budget parfois plus maîtrisable." },
      { q: "Les diplômes sont-ils reconnus ?", a: "Il faut vérifier l’école, le programme et l’objectif professionnel avant de s’inscrire." },
      { q: "Abroad Zone peut aider ?", a: "Oui, pour filtrer les établissements, préparer le dossier et organiser l’installation." },
    ],
    relatedLinks: [
      { to: "/abroad-zone", label: "Voir Abroad Zone" },
      { to: "/etudier-en-turquie-depuis-tunisie", label: "Comparer avec Turquie" },
      { to: "/study-in-north-cyprus", label: "Comparer avec Chypre du Nord" },
      { to: "/book-consultation", label: "Réserver une consultation" },
    ],
  },
  '/etudier-au-royaume-uni-depuis-tunisie': {
    country: 'Royaume-Uni',
    title: "Étudier au Royaume-Uni depuis la Tunisie | UK universities",
    description: "Étudier au Royaume-Uni depuis la Tunisie: admissions UK, IELTS, budget, visa étudiant, Bachelor, Master et accompagnement pour Tunisiens.",
    h1: "Étudier au Royaume-Uni depuis la Tunisie",
    tuition: "Frais souvent élevés, à comparer avec bourses et durée du programme",
    visa: "Student visa avec CAS, preuve financière et niveau de langue",
    timeline: ["Choix universités", "Dossier et IELTS", "Offre et CAS", "Visa étudiant UK"],
    highlights: [
      "Destination très reconnue pour Bachelor, Master et MBA",
      "Les délais, le budget et l’anglais doivent être cadrés tôt",
      "Le choix de la ville influence fortement le coût de vie",
      "Les bourses existent mais restent compétitives",
    ],
    budget: [
      "Frais de scolarité élevés selon université",
      "Logement important dans le budget",
      "Visa, santé et assurance",
      "IELTS, traductions et voyage",
    ],
    programs: ['Business', 'MBA', 'Engineering', 'IT', 'Law', 'Finance', 'Bachelor', 'Master'],
    faq: [
      { q: "Faut-il IELTS ?", a: "Souvent oui, ou une preuve équivalente selon l’université et le programme." },
      { q: "Le Royaume-Uni est-il cher ?", a: "Oui, c’est une destination premium. Il faut valider budget et preuves financières avant de se lancer." },
      { q: "Peut-on avoir une bourse ?", a: "Oui pour certains profils, mais elles sont compétitives et doivent être préparées tôt." },
    ],
    relatedLinks: [
      { to: "/etudier-au-canada-depuis-tunisie", label: "Comparer avec Canada" },
      { to: "/etudier-en-france-depuis-tunisie", label: "Comparer avec France" },
      { to: "/abroad-zone", label: "Voir Abroad Zone" },
      { to: "/book-consultation", label: "Réserver une consultation" },
    ],
  },
  '/etudier-aux-usa-depuis-tunisie': {
    country: 'USA',
    title: "Étudier aux USA depuis la Tunisie | Admissions et visa F-1",
    description: "Étudier aux États-Unis depuis la Tunisie: admissions, bourses, visa F-1, budget, universités et préparation du dossier pour Tunisiens.",
    h1: "Étudier aux USA depuis la Tunisie",
    tuition: "Très variable selon université, scholarship et programme",
    visa: "Visa F-1 avec I-20, preuves financières et entretien consulaire",
    timeline: ["Choix universités", "Tests et dossier", "Admission et I-20", "Visa F-1"],
    highlights: [
      "Destination forte pour innovation, business, STEM et recherche",
      "Les bourses peuvent réduire le coût mais demandent un dossier solide",
      "Préparation longue: anglais, essais, documents et délais",
      "Entretien visa à préparer sérieusement",
    ],
    budget: [
      "Frais de scolarité très variables",
      "Logement et assurance santé",
      "Tests, frais d’application et visa",
      "Billet et installation",
    ],
    programs: ['Computer Science', 'Business', 'Engineering', 'Data', 'Finance', 'MBA', 'Bachelor', 'Master'],
    faq: [
      { q: "Peut-on obtenir une bourse aux USA ?", a: "Oui, selon le profil académique, le niveau d’anglais, le sport, le mérite ou les besoins financiers." },
      { q: "Quel visa pour étudier aux USA ?", a: "Le visa étudiant principal est le F-1, après admission et émission du formulaire I-20." },
      { q: "Quand commencer ?", a: "Idéalement 12 mois avant la rentrée, surtout pour les bourses et les universités sélectives." },
    ],
    relatedLinks: [
      { to: "/etudier-au-canada-depuis-tunisie", label: "Comparer avec Canada" },
      { to: "/etudier-au-royaume-uni-depuis-tunisie", label: "Comparer avec UK" },
      { to: "/abroad-zone", label: "Voir Abroad Zone" },
      { to: "/book-consultation", label: "Réserver une consultation" },
    ],
  },
};

function QuickApplicationForm({ country }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = `Bonjour Abroad Zone, je veux une évaluation pour ${country}.\nNom: ${formData.get('name')}\nEmail: ${formData.get('email')}\nNiveau: ${formData.get('level')}\nDestination: ${formData.get('destination')}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-2xl font-black">Évaluation gratuite</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <input name="name" required placeholder="Nom" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#005A9C]" />
        <input name="email" required type="email" placeholder="Email" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#005A9C]" />
        <select name="level" required className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#005A9C]">
          <option value="">Niveau</option>
          <option>Bac</option>
          <option>Licence / Bachelor</option>
          <option>Master</option>
          <option>PhD</option>
          <option>Autre</option>
        </select>
        <input name="destination" defaultValue={country} className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#005A9C]" />
      </div>
      <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#005A9C] px-5 py-4 text-sm font-black uppercase tracking-[0.12em] text-white">
        Envoyer ma demande <Send size={16} />
      </button>
    </form>
  );
}

export default function CountryGuidePage() {
  const { toggleLanguage } = useLanguage();
  const lang = 'fr';
  const { pathname } = useLocation();
  const data = countryData[pathname] || countryData['/etudier-en-allemagne-depuis-tunisie'];
  const copy = {
        back: 'Retour à Abroad Zone',
        advisor: 'Conseiller WhatsApp',
        advisorText: `Bonjour EduGrowth, je veux étudier en ${data.country}.`,
        badge: "Guide d'études à l'étranger",
        tuition: 'Estimation des frais',
        visa: 'Parcours visa',
        timeline: 'Timeline recommandée',
        highlights: 'Points clés à vérifier',
        budget: 'Budget à anticiper',
        faqTitle: `FAQ ${data.country}`,
        supportTitle: "Besoin d'un accompagnement personnalisé ?",
        supportText: 'Nos conseillers vous aident à choisir le bon programme, préparer le dossier et sécuriser votre visa.',
        consultation: 'Réserver une consultation gratuite',
        whatsappNow: 'WhatsApp maintenant',
        supportWhatsapp: `Je souhaite un accompagnement pour étudier en ${data.country}.`,
        related: 'Guides liés',
        programs: 'Programmes et domaines populaires',
        decisionTitle: `Ce qu'il faut valider avant de choisir ${data.country}`,
        decisionText: `Avant de lancer une candidature pour ${data.country}, il faut verifier la coherence entre votre niveau, votre budget, votre delai, la langue du programme et les exigences visa. Cette etape evite de perdre du temps sur une destination seduisante mais peu realiste.`,
        decisionChecks: [
          'Budget total: frais, logement, assurance, transport et installation',
          'Delais: admission, documents, rendez-vous visa et rentree',
          'Documents: diplomes, releves, traductions, justificatifs financiers',
          'Projet: coherence entre parcours, formation visee et objectif professionnel',
        ],
        mistakesTitle: `Erreurs frequentes pour ${data.country}`,
        mistakes: [
          'Choisir un pays uniquement parce qu’il semble populaire',
          'Sous-estimer le budget reel de logement et de vie quotidienne',
          'Attendre l’admission pour preparer les preuves financieres',
          'Envoyer un dossier sans verifier la coherence du projet',
        ],
      };

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: data.h1,
        description: data.description,
        author: {
          '@type': 'Organization',
          name: 'EduGrowth Tunisia',
        },
        publisher: {
          '@type': 'Organization',
          name: 'EduGrowth Tunisia',
          logo: {
            '@type': 'ImageObject',
            url: 'https://edugrowth.tn/Submark.webp',
          },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
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

            {data.programs?.length ? (
              <section className="mt-10">
                <h2 className="text-2xl font-black">{copy.programs}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {data.programs.map((program) => (
                    <h3 key={program} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-black text-slate-800">{program}</h3>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-2xl font-black">{copy.decisionTitle}</h2>
              <p className="mt-3 leading-7 text-slate-600">{copy.decisionText}</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {copy.decisionChecks.map((item) => (
                  <p key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={18} className="mt-0.5 text-emerald-600" />
                    <span>{item}</span>
                  </p>
                ))}
              </div>
            </section>

            <section className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-2xl font-black">{copy.highlights}</h2>
                <div className="mt-4 space-y-3">
                  {data.highlights.map((item) => (
                    <p key={item} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle2 size={18} className="mt-0.5 text-emerald-600" />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-2xl font-black">{copy.budget}</h2>
                <div className="mt-4 space-y-3">
                  {data.budget.map((item) => (
                    <p key={item} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle2 size={18} className="mt-0.5 text-blue-600" />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="text-2xl font-black text-amber-950">{copy.mistakesTitle}</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {copy.mistakes.map((item) => (
                  <p key={item} className="rounded-2xl bg-white p-4 text-sm font-bold leading-6 text-amber-950 ring-1 ring-amber-100">{item}</p>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-black">{copy.faqTitle}</h2>
              <div className="mt-4 space-y-4">
                {data.faq.map((item) => (
                  <div key={item.q} className="rounded-2xl border border-slate-200 p-5">
                    <h3 className="text-lg font-black">{item.q}</h3>
                    <p className="mt-2 text-slate-600">{item.a}</p>
                  </div>
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

            <QuickApplicationForm country={data.country} />
          </article>

          <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-black">{copy.related}</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {data.relatedLinks.map((item) => (
                <Link key={item.to} to={item.to} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-bold text-[#005A9C] transition hover:-translate-y-0.5 hover:shadow-sm">
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
