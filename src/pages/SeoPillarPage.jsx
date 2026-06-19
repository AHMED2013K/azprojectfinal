import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Home, MessageCircle } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const WA_NUMBER = '21656590703';
const SITE = 'https://edugrowth.tn';

const pagePairs = [
  {
    fr: '/fr/etudier-a-l-etranger-depuis-tunisie',
    en: '/en/study-abroad-from-tunisia',
  },
  {
    fr: '/fr/etudier-a-l-etranger-depuis-tunis',
    en: '/en/study-abroad-from-tunis',
  },
  {
    fr: '/fr/etudier-medecine-pharmacie-etranger',
    en: '/en/study-medicine-pharmacy-abroad',
  },
  {
    fr: '/fr/medecine-privee-tunisie',
    en: '/en/private-medicine-tunisia',
  },
  {
    fr: '/fr/licence-privee-tunisie',
    en: '/en/private-bachelor-tunisia',
  },
  {
    fr: '/fr/mastere-prive-tunisie',
    en: '/en/private-master-tunisia',
  },
];

const priorityDestinations = [
  { label: 'France', path: '/etudier-en-france-depuis-tunisie', intent: 'Campus France, écoles privées, alternance et visa étudiant' },
  { label: 'Canada', path: '/etudier-au-canada-depuis-tunisie', intent: 'Études, budget, permis et parcours francophone ou anglophone' },
  { label: 'Allemagne', path: '/etudier-en-allemagne-depuis-tunisie', intent: 'Universités publiques, compte bloqué, Ausbildung et allemand' },
  { label: 'Autriche', path: '/etudier-en-autriche-depuis-tunisie', intent: 'Études abordables en Europe, universités publiques et admission' },
  { label: 'Hongrie', path: '/etudier-en-hongrie-depuis-tunisie', intent: 'Médecine, ingénierie, programmes en anglais et coût modéré' },
  { label: 'Roumanie', path: '/etudier-en-roumanie-depuis-tunisie', intent: 'Médecine, pharmacie, ingénierie et admissions européennes' },
  { label: 'Espagne', path: '/etudier-en-espagne-depuis-tunisie', intent: 'Universités européennes accessibles et programmes internationaux' },
  { label: 'Chine', path: '/etudier-en-chine-depuis-tunisie', intent: 'Bourses, médecine, ingénierie et cursus internationaux' },
];

const pages = {
  '/fr/etudier-a-l-etranger-depuis-tunisie': {
    lang: 'fr',
    title: "Étudier à l'étranger Tunisie | EduGrowth",
    description: "Guide pour étudier à l'étranger depuis la Tunisie: visa, budget, équivalence, admission, logement et dossier étudiant.",
    h1: "Étudier à l'étranger depuis la Tunisie",
    eyebrow: 'Guide national',
    intro: "EduGrowth aide les étudiants tunisiens et leurs parents à choisir une destination réaliste, préparer les documents, comprendre les étapes visa et éviter les erreurs de dossier.",
    cta: 'Tester mon profil gratuitement',
    whatsapp: "Bonjour EduGrowth, je veux étudier à l'étranger depuis la Tunisie.",
    sections: [
      {
        h2: 'Les étapes clés depuis la Tunisie',
        body: "Un projet international doit être cadré avant les candidatures: niveau d'études, budget familial, langue, calendrier, pays cible et exigences de visa.",
        h3: ['Orientation pays et programme', 'Admission et documents', 'Visa étudiant et logement'],
      },
      {
        h2: 'Visa, Campus France et pays européens',
        body: "Pour la France, Campus France reste une étape centrale. Pour plusieurs pays européens, il faut anticiper admission, justificatifs financiers, assurance, logement et rendez-vous visa.",
        h3: ['Campus France Tunisie', 'Compte bloqué ou preuves financières', 'Équivalence et traductions'],
      },
      {
        h2: 'Budget et préparation financière',
        body: "Le bon choix dépend du coût global: frais de scolarité, logement, assurance, transport, installation et dépenses mensuelles. Les parents doivent comprendre le budget avant engagement.",
        h3: ['Frais de scolarité', 'Logement étudiant', 'Budget mensuel réaliste'],
      },
    ],
    faq: [
      ['Quand commencer un dossier depuis la Tunisie ?', "Idéalement plusieurs mois avant la rentrée, surtout pour la France, le Canada, l'Allemagne et les pays avec visa long séjour."],
      ['Quel pays choisir avec un budget limité ?', "Il faut comparer le budget total, pas seulement les frais d'inscription. Chypre, Turquie, Roumanie, Dubai ou certaines écoles privées peuvent être étudiées selon profil."],
    ],
  },
  '/en/study-abroad-from-tunisia': {
    lang: 'en',
    title: 'Study Abroad from Tunisia | EduGrowth',
    description: 'Study abroad from Tunisia with guidance for admissions, visa steps, budget, housing, equivalence and student documents.',
    h1: 'Study abroad from Tunisia',
    eyebrow: 'National guide',
    intro: 'EduGrowth helps Tunisian students and families choose realistic destinations, prepare documents, understand visa steps and avoid application mistakes.',
    cta: 'Check my profile for free',
    whatsapp: 'Hello EduGrowth, I want to study abroad from Tunisia.',
    sections: [
      {
        h2: 'Key steps from Tunisia',
        body: 'An international study project must be structured before applications: study level, family budget, language, timeline, destination and visa requirements.',
        h3: ['Destination and program strategy', 'Admissions and documents', 'Student visa and housing'],
      },
      {
        h2: 'Visa, Campus France and European countries',
        body: 'For France, Campus France is a central step. For many European countries, students must prepare admission, financial proof, insurance, housing and visa appointments early.',
        h3: ['Campus France Tunisia', 'Blocked account or financial proof', 'Equivalence and translations'],
      },
      {
        h2: 'Budget and financial preparation',
        body: 'The right choice depends on total cost: tuition, housing, insurance, travel, setup costs and monthly expenses. Parents need a clear budget before committing.',
        h3: ['Tuition fees', 'Student housing', 'Realistic monthly budget'],
      },
    ],
    faq: [
      ['When should I start from Tunisia?', 'Several months before intake, especially for France, Canada, Germany and long-stay visa countries.'],
      ['Which country fits a limited budget?', 'Compare the full budget, not only tuition. North Cyprus, Turkey, Romania, Dubai or private schools may fit depending on the profile.'],
    ],
  },
  '/fr/etudier-a-l-etranger-depuis-tunis': {
    lang: 'fr',
    title: "Étudier à l'étranger depuis Tunis",
    description: "Accompagnement à Tunis pour étudier à l'étranger: orientation, admission, visa et suivi pour étudiants de Lafayette, Lac, Belvédère.",
    h1: "Étudier à l'étranger depuis Tunis",
    eyebrow: 'SEO local Tunis',
    intro: "Pour les étudiants basés à Tunis, l'enjeu est d'avoir un accompagnement clair, proche et réactif pour comparer les pays, préparer le dossier et rassurer la famille.",
    cta: 'Réserver une orientation',
    whatsapp: "Bonjour EduGrowth, je suis à Tunis et je veux étudier à l'étranger.",
    sections: [
      {
        h2: 'Accompagnement local à Tunis',
        body: "Les étudiants de Tunis, Le Belvédère, Lafayette, Berges du Lac, Centre-ville et Ariana recherchent souvent une orientation rapide avec un suivi humain.",
        h3: ['Diagnostic du profil', 'Choix des destinations', 'Suivi WhatsApp et rendez-vous'],
      },
      {
        h2: 'Dossier admission et visa',
        body: "Le dossier doit être cohérent: notes, parcours, motivation, preuves financières, documents traduits et calendrier de dépôt.",
        h3: ['Documents académiques', 'Preuves financières', 'Préparation entretien'],
      },
      {
        h2: 'Parents et décision financière',
        body: "La famille doit comprendre les coûts, les risques, les délais et les alternatives avant de choisir une destination.",
        h3: ['Budget total', 'Risques de refus', 'Plan B par pays'],
      },
    ],
    faq: [
      ['Puis-je être accompagné si je suis à Tunis ?', 'Oui, le suivi peut se faire par WhatsApp, appel et rendez-vous selon les besoins du dossier.'],
      ['Quels quartiers cible EduGrowth à Tunis ?', 'Les recherches locales couvrent notamment Centre-ville, Lafayette, Le Belvédère, Berges du Lac, Ariana et les environs.'],
    ],
  },
  '/en/study-abroad-from-tunis': {
    lang: 'en',
    title: 'Study Abroad from Tunis | EduGrowth',
    description: 'Study abroad support in Tunis: destination guidance, admissions, visa preparation and family support near Lac, Lafayette and Belvedere.',
    h1: 'Study abroad from Tunis',
    eyebrow: 'Local SEO Tunis',
    intro: 'For students based in Tunis, the priority is clear, close and responsive guidance to compare countries, prepare the file and reassure the family.',
    cta: 'Book guidance',
    whatsapp: 'Hello EduGrowth, I am in Tunis and I want to study abroad.',
    sections: [
      {
        h2: 'Local guidance in Tunis',
        body: 'Students from Tunis, Belvedere, Lafayette, Berges du Lac, City Center and Ariana often need fast guidance with human follow-up.',
        h3: ['Profile diagnosis', 'Destination selection', 'WhatsApp and appointment follow-up'],
      },
      {
        h2: 'Admissions and visa file',
        body: 'The file must be coherent: grades, background, motivation, financial proof, translated documents and submission timeline.',
        h3: ['Academic documents', 'Financial proof', 'Interview preparation'],
      },
      {
        h2: 'Parents and financial decision',
        body: 'Families need to understand costs, risks, timelines and alternatives before choosing a destination.',
        h3: ['Total budget', 'Refusal risks', 'Plan B by country'],
      },
    ],
    faq: [
      ['Can I get support if I live in Tunis?', 'Yes, follow-up can be handled by WhatsApp, calls and appointments depending on the file.'],
      ['Which Tunis areas are targeted?', 'Local searches include City Center, Lafayette, Belvedere, Berges du Lac, Ariana and nearby areas.'],
    ],
  },
  '/fr/etudier-medecine-pharmacie-etranger': {
    lang: 'fr',
    title: 'Médecine et pharmacie à l’étranger',
    description: 'Étudier médecine, dentaire ou pharmacie à l’étranger depuis la Tunisie: Roumanie, Espagne, frais, langue, reconnaissance et visa.',
    h1: "Étudier la médecine ou la pharmacie à l'étranger",
    eyebrow: 'Bacheliers santé',
    intro: "Pour les bacheliers tunisiens qui visent médecine, pharmacie ou dentaire, l'étranger peut être une alternative sur dossier selon les pays, les frais et la langue d'enseignement.",
    cta: 'Vérifier mon profil santé',
    whatsapp: 'Bonjour EduGrowth, je veux étudier médecine ou pharmacie à l’étranger.',
    sections: [
      {
        h2: 'Destinations adaptées aux Tunisiens',
        body: "La Roumanie, l'Espagne et certains pays européens peuvent être étudiés selon le niveau, le budget, la langue d'enseignement et la reconnaissance du diplôme.",
        h3: ['Roumanie et Espagne', 'Filières en anglais ou français', 'Admission sur dossier sans concours national tunisien'],
      },
      {
        h2: 'Frais, langue et reconnaissance',
        body: "Il faut vérifier les frais annuels, la langue d'enseignement, les stages cliniques, la reconnaissance européenne/internationale et les conditions d'équivalence en Tunisie.",
        h3: ['Médecine générale', 'Pharmacie', 'Dentaire'],
      },
      {
        h2: 'Dossier après le bac',
        body: "Les notes, relevés, traductions, passeport, motivation et preuves financières doivent être préparés tôt, surtout après les résultats du bac.",
        h3: ['Documents bac', 'Traductions et légalisation', 'Visa étudiant'],
      },
    ],
    faq: [
      ['Peut-on étudier médecine sans concours tunisien ?', "Oui dans certains pays, l'admission peut se faire sur dossier, mais les critères varient selon l'université."],
      ['La reconnaissance est-elle automatique ?', "Non. Il faut vérifier la reconnaissance, les équivalences et les règles applicables avant de s'inscrire."],
    ],
  },
  '/en/study-medicine-pharmacy-abroad': {
    lang: 'en',
    title: 'Study Medicine or Pharmacy Abroad',
    description: 'Study medicine, dentistry or pharmacy abroad from Tunisia: Romania, Spain, tuition, language, recognition and visa guidance.',
    h1: 'Study medicine or pharmacy abroad',
    eyebrow: 'Health studies',
    intro: 'For Tunisian high-school graduates targeting medicine, pharmacy or dentistry, studying abroad can be an application-based alternative depending on country, fees and language.',
    cta: 'Check my health profile',
    whatsapp: 'Hello EduGrowth, I want to study medicine or pharmacy abroad.',
    sections: [
      {
        h2: 'Destinations for Tunisian students',
        body: 'Romania, Spain, selected European countries and international pathways may be considered depending on grades, budget, teaching language and degree recognition.',
        h3: ['Romania and Spain', 'English or French tracks', 'Application-based admission without the Tunisian public exam'],
      },
      {
        h2: 'Fees, language and recognition',
        body: 'Students must check annual tuition, teaching language, clinical internships, European/international recognition and equivalence rules in Tunisia.',
        h3: ['General medicine', 'Pharmacy', 'Dentistry'],
      },
      {
        h2: 'File after the baccalaureate',
        body: 'Grades, transcripts, translations, passport, motivation and financial proof should be prepared early, especially after final exam results.',
        h3: ['Bac documents', 'Translations and legalization', 'Student visa'],
      },
    ],
    faq: [
      ['Can I study medicine without the Tunisian public exam?', 'In some countries, admission can be application-based, but requirements vary by university.'],
      ['Is recognition automatic?', 'No. Recognition, equivalence and local rules must be checked before enrollment.'],
    ],
  },
  '/fr/medecine-privee-tunisie': {
    lang: 'fr',
    title: 'Médecine privée à l’étranger',
    description: 'Médecine privée à l’étranger depuis la Tunisie: pas de faculté privée locale, options Roumanie, Espagne, visa et reconnaissance.',
    h1: 'Étudier la médecine privée à l’étranger',
    eyebrow: 'Clarification importante',
    intro: "À ce jour, il n'existe pas de faculté privée de médecine générale ou de pharmacie agréée en Tunisie comme alternative directe aux facultés publiques. Pour viser médecine, pharmacie ou dentaire en privé, la voie réaliste consiste à étudier à l'étranger.",
    cta: 'Comparer mes options à l’étranger',
    whatsapp: 'Bonjour EduGrowth, je cherche une option pour étudier la médecine privée à l’étranger.',
    sections: [
      {
        h2: "Pourquoi l'étranger est l'alternative réelle",
        body: "La requête médecine privée en Tunisie cache souvent une intention simple: trouver une voie médicale accessible hors concours national. Le site doit donc rediriger clairement vers les facultés privées ou publiques à l'étranger.",
        h3: ['Pas de faculté privée locale de médecine générale', 'Admission étrangère sur dossier', 'Décision familiale informée'],
      },
      {
        h2: 'Facultés privées accessibles aux Tunisiens',
        body: "La Roumanie, l'Espagne et d'autres pays européens peuvent proposer des voies sur dossier selon notes, langue, budget et places disponibles. Chaque faculté doit être vérifiée avant engagement.",
        h3: ['Roumanie', 'Espagne', 'Facultés privées ou publiques internationales'],
      },
      {
        h2: 'Frais, visa et reconnaissance',
        body: "Avant de postuler, il faut comparer les frais de scolarité, le coût de vie, le visa depuis Tunis, les stages cliniques, la langue d'enseignement et les règles d'équivalence au retour.",
        h3: ['Frais annuels', 'Visa étudiant depuis Tunis', 'Reconnaissance internationale et équivalence'],
      },
    ],
    faq: [
      ['Existe-t-il une faculté privée de médecine en Tunisie ?', "Pas comme alternative privée locale classique pour médecine générale ou pharmacie. Toute affirmation doit être vérifiée auprès des autorités compétentes."],
      ['Quelle alternative pour un bachelier tunisien ?', "Comparer les études médicales à l'étranger: Roumanie, Espagne ou autres pays selon budget, notes, langue et reconnaissance."],
    ],
  },
  '/en/private-medicine-tunisia': {
    lang: 'en',
    title: 'Private Medicine Abroad',
    description: 'Private medicine abroad from Tunisia: no local private medical faculty, Romania, Spain, visa process and degree recognition.',
    h1: 'Study private medicine abroad',
    eyebrow: 'Important clarification',
    intro: 'At this stage, Tunisia does not offer a standard accredited private route for general medicine or pharmacy as a direct alternative to public medical faculties. For private medicine, pharmacy or dentistry, the realistic path is studying abroad.',
    cta: 'Compare my abroad options',
    whatsapp: 'Hello EduGrowth, I am looking for private medicine abroad.',
    sections: [
      {
        h2: 'Why abroad is the real alternative',
        body: 'The query private medicine in Tunisia often means one thing: finding a medical pathway outside the national public selection. The page therefore guides students toward verified foreign faculties.',
        h3: ['No local private general medicine faculty', 'Application-based foreign admission', 'Informed family decision'],
      },
      {
        h2: 'Private faculties accessible to Tunisians',
        body: 'Romania, Spain and other European countries may offer application-based routes depending on grades, language, budget and available seats. Each faculty must be checked before commitment.',
        h3: ['Romania', 'Spain', 'Private or public international faculties'],
      },
      {
        h2: 'Fees, visa and recognition',
        body: 'Before applying, students must compare tuition, cost of living, visa from Tunis, clinical internships, teaching language and equivalence rules when returning.',
        h3: ['Annual tuition', 'Student visa from Tunis', 'International recognition and equivalence'],
      },
    ],
    faq: [
      ['Is there a private medical faculty in Tunisia?', 'Not as a standard local private pathway for general medicine or pharmacy. Any claim should be checked with competent authorities.'],
      ['What can a Tunisian high-school graduate do?', 'Compare medical studies abroad: Romania, Spain or other countries depending on budget, grades, language and recognition.'],
    ],
  },
  '/fr/licence-privee-tunisie': {
    lang: 'fr',
    title: 'Licence privée en Tunisie | Guide',
    description: 'Licence privée en Tunisie: système LMD, filières accréditées, admission après bac, coûts moyens et débouchés.',
    h1: 'Licence privée en Tunisie',
    eyebrow: 'Après le bac',
    intro: "La licence privée en Tunisie peut être une alternative aux universités publiques pour les bacheliers qui cherchent un parcours encadré, professionnalisant et parfois plus international.",
    cta: 'Choisir ma licence privée',
    whatsapp: 'Bonjour EduGrowth, je veux choisir une licence privée en Tunisie.',
    sections: [
      {
        h2: 'Comprendre le système LMD privé',
        body: "Les licences privées suivent généralement le système LMD. Il faut vérifier l'accréditation, le programme, les stages, le corps enseignant et la reconnaissance.",
        h3: ['Licence fondamentale', 'Licence appliquée', 'Accréditation ministère'],
      },
      {
        h2: 'Filières demandées après le bac',
        body: "Gestion, informatique, ingénierie, business, santé, design et langues font partie des options recherchées selon le profil et le projet professionnel.",
        h3: ['Gestion et finance', 'Informatique et data', 'Santé et paramédical'],
      },
      {
        h2: 'Coûts, admission et débouchés',
        body: "Les frais varient selon l'établissement. Il faut comparer le coût total, les stages, l'employabilité, les passerelles et les possibilités de poursuite à l'étranger.",
        h3: ['Frais annuels', 'Critères admission', 'Poursuite master'],
      },
    ],
    faq: [
      ['Une licence privée est-elle reconnue ?', "Elle doit être accréditée/reconnue selon les règles applicables. Il faut vérifier l'établissement et le programme."],
      ['Peut-on poursuivre un master à l’étranger ?', "Oui selon la reconnaissance, les notes, le domaine et les exigences des universités étrangères."],
    ],
  },
  '/en/private-bachelor-tunisia': {
    lang: 'en',
    title: 'Private Bachelor in Tunisia | Guide',
    description: 'Private bachelor degree in Tunisia: LMD system, accredited fields, admission after bac, average costs and career options.',
    h1: 'Private bachelor degree in Tunisia',
    eyebrow: 'After high school',
    intro: 'A private bachelor in Tunisia can be an alternative to public universities for students seeking a structured, career-oriented and sometimes more international pathway.',
    cta: 'Choose my private bachelor',
    whatsapp: 'Hello EduGrowth, I want to choose a private bachelor in Tunisia.',
    sections: [
      {
        h2: 'Understanding the private LMD system',
        body: 'Private bachelor programs generally follow the LMD system. Accreditation, curriculum, internships, faculty and recognition must be checked.',
        h3: ['Academic bachelor', 'Applied bachelor', 'Ministry accreditation'],
      },
      {
        h2: 'Popular fields after high school',
        body: 'Management, IT, engineering, business, health, design and languages are common options depending on the profile and career objective.',
        h3: ['Management and finance', 'IT and data', 'Health and paramedical'],
      },
      {
        h2: 'Costs, admission and outcomes',
        body: 'Fees vary by institution. Students should compare total cost, internships, employability, pathways and options for further study abroad.',
        h3: ['Annual fees', 'Admission criteria', 'Master progression'],
      },
    ],
    faq: [
      ['Is a private bachelor recognized?', 'It must be accredited/recognized under applicable rules. The institution and program should be checked.'],
      ['Can I continue a master abroad?', 'Yes, depending on recognition, grades, field and foreign university requirements.'],
    ],
  },
  '/fr/mastere-prive-tunisie': {
    lang: 'fr',
    title: 'Mastère privé en Tunisie | Guide',
    description: 'Mastère privé en Tunisie: mastères professionnels, admission Bac+3, co-tutelles, débouchés et poursuite internationale.',
    h1: 'Mastère privé en Tunisie',
    eyebrow: 'Après Bac+3',
    intro: "Un mastère privé peut aider les étudiants Bac+3 à se spécialiser rapidement, renforcer leur employabilité et préparer une carrière locale ou internationale.",
    cta: 'Comparer les mastères',
    whatsapp: 'Bonjour EduGrowth, je veux choisir un mastère privé en Tunisie.',
    sections: [
      {
        h2: 'Mastère professionnel ou recherche',
        body: "Le choix dépend de l'objectif: emploi rapide, spécialisation métier, poursuite doctorale, mobilité internationale ou évolution vers l'Europe/le Golfe.",
        h3: ['Mastère professionnel', 'Mastère de recherche', 'Spécialisation métier'],
      },
      {
        h2: 'Co-tutelles et dimension internationale',
        body: "Certaines écoles privées proposent des partenariats, doubles diplômes ou co-tutelles. Il faut vérifier la valeur réelle et les conditions.",
        h3: ['Partenariats', 'Double diplôme', 'Reconnaissance'],
      },
      {
        h2: 'Débouchés locaux et export',
        body: "Les filières business, IT, data, finance, marketing, santé et management peuvent ouvrir des opportunités en Tunisie, Europe, Afrique ou Golfe.",
        h3: ['Tunisie', 'Europe', 'Golfe'],
      },
    ],
    faq: [
      ['Qui peut postuler à un mastère privé ?', 'Généralement les titulaires Bac+3 ou équivalent, selon le domaine et les critères de l’établissement.'],
      ['Le mastère privé aide-t-il pour l’international ?', 'Oui si le programme est reconnu, cohérent avec le projet et soutenu par un bon dossier académique/professionnel.'],
    ],
  },
  '/en/private-master-tunisia': {
    lang: 'en',
    title: 'Private Master in Tunisia | Guide',
    description: 'Private master in Tunisia: professional master programs, Bac+3 admission, international partnerships, careers and mobility.',
    h1: 'Private master degree in Tunisia',
    eyebrow: 'After Bac+3',
    intro: 'A private master can help Bac+3 students specialize faster, improve employability and prepare for local or international careers.',
    cta: 'Compare master programs',
    whatsapp: 'Hello EduGrowth, I want to choose a private master in Tunisia.',
    sections: [
      {
        h2: 'Professional or research master',
        body: 'The right choice depends on the goal: fast employment, professional specialization, PhD pathway, international mobility or Europe/Gulf opportunities.',
        h3: ['Professional master', 'Research master', 'Career specialization'],
      },
      {
        h2: 'International partnerships',
        body: 'Some private schools offer partnerships, double degrees or joint programs. Their real value and conditions must be checked.',
        h3: ['Partnerships', 'Double degree', 'Recognition'],
      },
      {
        h2: 'Local and export career outcomes',
        body: 'Business, IT, data, finance, marketing, health and management tracks may open opportunities in Tunisia, Europe, Africa or the Gulf.',
        h3: ['Tunisia', 'Europe', 'Gulf'],
      },
    ],
    faq: [
      ['Who can apply to a private master?', 'Usually Bac+3 or equivalent graduates, depending on the field and institution criteria.'],
      ['Can a private master support international mobility?', 'Yes if the program is recognized, coherent with the project and supported by a strong academic/professional file.'],
    ],
  },
};

function normalizePath(pathname) {
  if (pathname === '/') return pathname;
  return pathname.replace(/\/+$/, '');
}

function getPair(pathname) {
  return pagePairs.find((pair) => pair.fr === pathname || pair.en === pathname);
}

export const seoPillarRoutes = Object.keys(pages);

export default function SeoPillarPage() {
  const { pathname } = useLocation();
  const contentPath = normalizePath(pathname);
  const page = pages[contentPath] || pages['/fr/etudier-a-l-etranger-depuis-tunisie'];
  const pair = getPair(contentPath) || pagePairs[0];
  const canonical = `${SITE}${contentPath}/`;
  const alternates = [
    { hreflang: 'fr-TN', href: `${SITE}${pair.fr}/` },
    { hreflang: 'en-TN', href: `${SITE}${pair.en}/` },
    { hreflang: 'x-default', href: `${SITE}${pair.fr}/` },
  ];
  const otherLang = page.lang === 'fr' ? `${SITE}${pair.en}/` : `${SITE}${pair.fr}/`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['EducationalOrganization', 'LocalBusiness'],
        '@id': `${SITE}/#organization`,
        name: 'EduGrowth Tunisia',
        url: `${SITE}/`,
        logo: `${SITE}/Submark.webp`,
        image: `${SITE}/og-image.png`,
        telephone: '+21656590703',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Tunis',
          addressCountry: 'TN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 36.8065,
          longitude: 10.1815,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '18:00',
          },
        ],
        areaServed: ['Tunisia', 'Tunis', 'Ariana', 'Sousse', 'Sfax'],
        availableLanguage: ['French', 'Arabic', 'English'],
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: page.title,
        description: page.description,
        inLanguage: page.lang,
        isPartOf: { '@id': `${SITE}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: `${SITE}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: page.h1,
            item: canonical,
          },
        ],
      },
      ...(contentPath === '/fr/etudier-a-l-etranger-depuis-tunisie'
        ? [
            {
              '@type': 'ItemList',
              '@id': `${canonical}#destinations`,
              name: "Destinations pour étudier à l'étranger depuis la Tunisie",
              itemListElement: priorityDestinations.map((destination, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: `Étudier en ${destination.label} depuis la Tunisie`,
                url: `${SITE}${destination.path}/`,
              })),
            },
          ]
        : []),
      {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        url: canonical,
        name: `${page.h1} - FAQ`,
        inLanguage: page.lang,
        mainEntity: page.faq.map(([question, answer], index) => ({
          '@type': 'Question',
          '@id': `${canonical}#faq-question-${index + 1}`,
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            '@id': `${canonical}#faq-answer-${index + 1}`,
            text: answer,
          },
        })),
      },
    ],
  };
  const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(page.whatsapp)}`;

  return (
    <>
      <SEOHelmet
        title={page.title}
        description={page.description}
        canonical={canonical}
        alternates={alternates}
        lang={page.lang}
        structuredData={schema}
      />
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white px-4 py-5 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-black text-[#17324d]">
              <Home size={17} /> EduGrowth
            </Link>
            <div className="flex items-center gap-3">
              <a href={otherLang} className="rounded-full border border-slate-200 px-4 py-2 text-xs font-black uppercase text-[#176b87]">
                {page.lang === 'fr' ? 'EN' : 'FR'}
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-black text-white">
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>
        </header>

        <main>
          <section className="bg-white px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-6xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#176b87]">{page.eyebrow}</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-[#17324d] sm:text-6xl">{page.h1}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{page.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#17324d] px-6 py-4 text-sm font-black text-white">
                  {page.cta} <ArrowRight size={17} />
                </a>
                <Link to="/book-consultation" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-black text-[#17324d]">
                  Consultation
                </Link>
              </div>
            </div>
          </section>

          <section className="px-4 py-14 sm:px-6">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
              {page.sections.map((section) => (
                <article key={section.h2} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-2xl font-black text-[#17324d]">{section.h2}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{section.body}</p>
                  <div className="mt-5 space-y-3">
                    {section.h3.map((item) => (
                      <h3 key={item} className="flex items-start gap-3 text-sm font-black text-slate-700">
                        <CheckCircle2 size={17} className="mt-0.5 text-[#176b87]" />
                        <span>{item}</span>
                      </h3>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {page.lang === 'fr' && contentPath === '/fr/etudier-a-l-etranger-depuis-tunisie' ? (
            <section className="bg-white px-4 py-14 sm:px-6">
              <div className="mx-auto max-w-6xl">
                <div className="max-w-3xl">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-[#176b87]">Destinations prioritaires</p>
                  <h2 className="mt-3 text-3xl font-black text-[#17324d]">Comparer les meilleurs pays pour étudier à l’étranger depuis la Tunisie</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Chaque destination doit être comparée selon le budget réel, la langue, les délais d’admission, les preuves financières, le visa étudiant et les débouchés après diplôme.
                  </p>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {priorityDestinations.map((destination) => (
                    <Link key={destination.path} to={destination.path} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-[#176b87] hover:bg-white hover:shadow-sm">
                      <h3 className="text-lg font-black text-[#17324d]">Étudier en {destination.label}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{destination.intent}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#176b87]">
                        Voir le guide <ArrowRight size={15} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <section className="bg-white px-4 py-14 sm:px-6">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-black text-[#17324d]">FAQ</h2>
              <div className="mt-6 space-y-4">
                {page.faq.map(([question, answer]) => (
                  <div key={question} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-[#17324d]">{question}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
