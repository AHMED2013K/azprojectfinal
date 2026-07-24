import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Home, MessageCircle } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const SITE = 'https://edugrowth.tn';
const WA_NUMBER = '21656590703';

const journeys = [
  {
    stage: '15-17 ans',
    userProblem: "Je commence à penser à l’étranger, mais je ne sais pas quoi préparer avant le bac.",
    answer: "Préparer passeport, niveau de langue, discussion budget avec les parents, filières possibles et premiers pays réalistes.",
    links: [
      ['/apres-bac-etudier-a-l-etranger', 'Après bac'],
      ['/parents-etudes-etranger-tunisie', 'Guide parents'],
    ],
  },
  {
    stage: 'Bac tunisien',
    userProblem: "J’ai le bac ou je passe le bac : quels pays et quelles filières sont réalistes ?",
    answer: "Comparer pays, filière, notes, budget, langue, calendrier de rentrée et risques visa avant de payer une inscription.",
    links: [
      ['/bac-etudes-etranger-tunisie', 'Bac et études à l’étranger'],
      ['/comparatif-pays-etudes-etranger-tunisie', 'Comparatif pays'],
    ],
  },
  {
    stage: 'Sans bac, BTS ou BTP',
    userProblem: "Je n’ai pas un parcours classique et je veux savoir s’il existe une option crédible.",
    answer: "Vérifier les parcours foundation, vocational, BTS/BTP, écoles privées ou formations appliquées selon pays et niveau réel.",
    links: [
      ['/orientation-apres-bts-tunisie', 'Après BTS'],
      ['/orientation-apres-btp-tunisie', 'Après BTP'],
    ],
  },
  {
    stage: 'Licence',
    userProblem: "Je veux continuer en master ou changer de pays après ma licence.",
    answer: "Analyser équivalence, notes, cohérence de spécialité, langue, budget, documents académiques et calendrier master.",
    links: [
      ['/licence-etudes-etranger-tunisie', 'Licence vers étranger'],
      ['/equivalence-diplome-tunisien-etudes-etranger', 'Équivalence diplôme'],
    ],
  },
  {
    stage: 'Master / Doctorat',
    userProblem: "Je cherche un master, un doctorat, un financement ou un projet de recherche à l’étranger.",
    answer: "Préparer CV académique, projet, recommandation, sujet, financement, universités ciblées et preuve linguistique.",
    links: [
      ['/master-etudes-etranger-tunisie', 'Master à l’étranger'],
      ['/doctorat-etranger-tunisie', 'Doctorat à l’étranger'],
    ],
  },
  {
    stage: 'Parents',
    userProblem: "Je veux aider mon enfant, mais je dois comprendre le coût, le logement, le visa et les risques.",
    answer: "Valider le budget total, la fiabilité de l’établissement, les preuves financières, le logement et un plan B.",
    links: [
      ['/parents-etudes-etranger-tunisie', 'Guide parents'],
      ['/budget-etudes-etranger-tunisie', 'Budget études'],
    ],
  },
];

const knowledgeClusters = [
  {
    name: 'Orientation',
    intent: 'Choisir un pays et une filière réalistes selon le profil tunisien.',
    links: [
      ['/orientation-etudiant-tunisie', 'Orientation étudiant Tunisie'],
      ['/agence-orientation-etudiant-tunisie', 'Agence orientation étudiant'],
      ['/fr/etudier-a-l-etranger-depuis-tunisie', 'Étudier à l’étranger depuis la Tunisie'],
    ],
  },
  {
    name: 'Admissions',
    intent: 'Comprendre documents, candidatures, délais, admission conditionnelle et équivalence.',
    links: [
      ['/admission-universite-etranger-tunisie', 'Admission université étranger'],
      ['/documents-etudier-etranger-tunisie', 'Documents pour étudier à l’étranger'],
      ['/blog/documents-admission-internationale-tunisie', 'Documents admission internationale'],
    ],
  },
  {
    name: 'Visa',
    intent: 'Préparer un dossier visa cohérent et réduire les erreurs fréquentes.',
    links: [
      ['/visa-etudiant-tunisie', 'Visa étudiant depuis la Tunisie'],
      ['/visa-etudiant-france-tunisie', 'Visa étudiant France'],
      ['/blog/refus-visa-etudiant-france-erreurs', 'Refus visa France'],
    ],
  },
  {
    name: 'Budget et bourses',
    intent: 'Calculer le coût total et identifier les aides possibles sans fausses promesses.',
    links: [
      ['/budget-etudes-etranger-tunisie', 'Budget études à l’étranger'],
      ['/bourses-etudes-tunisiens', 'Bourses pour Tunisiens'],
      ['/etudier-etranger-petit-budget-tunisie', 'Petit budget'],
    ],
  },
  {
    name: 'Logement et départ',
    intent: 'Anticiper hébergement, assurance, installation, ville et vie quotidienne.',
    links: [
      ['/logement-etudiant-etranger-tunisie', 'Logement étudiant à l’étranger'],
      ['/blog/logement-etudiant-france-depuis-tunisie', 'Logement France'],
      ['/parents-etudiant-etranger-tunisie', 'Parents et départ'],
    ],
  },
  {
    name: 'Comparatifs',
    intent: 'Choisir entre deux ou plusieurs destinations selon critères réels.',
    links: [
      ['/comparer-france-canada-tunisie', 'France ou Canada'],
      ['/comparer-allemagne-autriche-tunisie', 'Allemagne ou Autriche'],
      ['/comparer-roumanie-hongrie-medecine-tunisie', 'Roumanie ou Hongrie médecine'],
    ],
  },
  {
    name: 'Destinations',
    intent: 'Comprendre les pays proposés avec budget, langue, visa, programmes et risques.',
    links: [
      ['/etudier-en-france-depuis-tunisie', 'France'],
      ['/etudier-en-allemagne-depuis-tunisie', 'Allemagne'],
      ['/etudier-au-canada-depuis-tunisie', 'Canada'],
      ['/etudier-en-coree-du-sud-depuis-tunisie', 'Corée du Sud'],
      ['/etudier-au-japon-depuis-tunisie', 'Japon'],
    ],
  },
  {
    name: 'Campus France et alternance',
    intent: 'Gérer les procédures spécifiques France, Campus France, entretien et alternance.',
    links: [
      ['/campus-france-tunisie-guide', 'Campus France Tunisie'],
      ['/campus-france-tunisie-dossier', 'Dossier Campus France'],
      ['/alternance-en-france-pour-tunisiens', 'Alternance France'],
    ],
  },
];

const questionBank = [
  ['Quel pays choisir pour étudier à l’étranger depuis la Tunisie ?', 'Il faut comparer budget total, langue, visa, reconnaissance, niveau académique et projet professionnel. Le meilleur pays n’est pas le même pour un bachelier, un licencié ou un profil santé.'],
  ['Quand commencer un dossier d’études à l’étranger ?', 'Le plus tôt possible : souvent 6 à 12 mois avant la rentrée pour les pays avec visa long séjour, Campus France, bourses ou logement demandé.'],
  ['Quels documents préparer depuis la Tunisie ?', 'Passeport, relevés, diplôme, attestations, traductions, preuve de langue, CV, lettre de motivation, preuves financières, admission et justificatif logement selon le pays.'],
  ['Une agence peut-elle garantir un visa étudiant ?', 'Non. Une agence sérieuse ne garantit pas une décision consulaire. Elle peut aider à rendre le dossier clair, complet et cohérent.'],
  ['Comment savoir si une université étrangère est fiable ?', 'Vérifiez le site officiel, l’accréditation, la langue réelle du programme, les frais, la reconnaissance du diplôme et les conditions de remboursement.'],
  ['Quel budget prévoir pour étudier à l’étranger ?', 'Le budget doit inclure frais académiques, logement, assurance, visa, billet, installation, dépenses mensuelles, traductions et marge de sécurité.'],
  ['Comment les parents peuvent-ils vérifier le sérieux du projet ?', 'Ils doivent voir l’admission, le coût complet, le calendrier, les risques visa, le logement, les preuves financières et les alternatives.'],
  ['Quelle différence entre admission et visa ?', 'L’admission vient de l’établissement. Le visa est une décision consulaire qui vérifie le projet, les ressources, le logement et les documents.'],
  ['Campus France est-il obligatoire pour étudier en France ?', 'Pour beaucoup de parcours France depuis la Tunisie, Campus France est une étape centrale. Les règles exactes doivent être vérifiées selon le programme.'],
  ['Comment éviter un refus de visa étudiant ?', 'Construire un projet cohérent, fournir des documents vérifiables, expliquer le financement, préparer l’entretien et respecter les exigences officielles.'],
  ['Peut-on étudier à l’étranger avec un budget limité ?', 'Oui dans certains cas, mais il faut comparer le coût total. Allemagne publique, Autriche, Roumanie, Hongrie, Espagne, Turquie ou Chypre peuvent être étudiées selon profil.'],
  ['Peut-on étudier à l’étranger sans bac ?', 'Certains parcours foundation, pathway ou formations appliquées existent selon pays et établissement. L’éligibilité doit être vérifiée précisément.'],
  ['Quel pays choisir après une licence en Tunisie ?', 'Le choix dépend des notes, de la spécialité, de la langue, du budget, de l’équivalence et de la cohérence du master visé.'],
  ['Comment choisir entre France et Canada ?', 'La France dépend fortement du parcours Campus France et du projet académique ; le Canada demande souvent un budget plus élevé et une préparation longue du permis d’études.'],
  ['Comment choisir entre Allemagne et Autriche ?', 'Les deux peuvent être attractives en Europe, mais il faut comparer langue allemande, preuves financières, admission, coût de vie et délais visa.'],
  ['La médecine à l’étranger est-elle une bonne option ?', 'Elle peut l’être, mais seulement après vérification de la reconnaissance, de la langue, des stages, du budget et de l’établissement.'],
  ['Comment chercher un logement étudiant ?', 'Commencez tôt, comparez résidence, colocation et logement temporaire, vérifiez caution, contrat, localisation et documents demandés.'],
  ['Les bourses couvrent-elles tout le budget ?', 'Rarement. Même avec bourse, il faut souvent prévoir visa, logement, billet, assurance et frais d’installation.'],
  ['Que faire après un refus de visa ?', 'Comprendre le motif, corriger la faiblesse du dossier, éviter de redéposer sans changement et préparer un plan alternatif crédible.'],
  ['Comment EduGrowth aide-t-il concrètement ?', 'EduGrowth aide à diagnostiquer le profil, comparer les destinations, préparer les documents, clarifier le budget, organiser le visa, le logement et le suivi parents.'],
];

export default function StudyAbroadEncyclopediaPage() {
  const canonical = `${SITE}/encyclopedie-etudes-etranger-tunisie/`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: "Encyclopédie des études à l’étranger pour étudiants tunisiens",
        description: "Hub EduGrowth des intentions, questions et guides pour les étudiants tunisiens et leurs parents.",
        inLanguage: 'fr',
        about: { '@id': `${SITE}/#study-abroad-guidance` },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#clusters`,
        name: 'Clusters de connaissance EduGrowth',
        itemListElement: knowledgeClusters.map((cluster, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: cluster.name,
          description: cluster.intent,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: questionBank.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
      {
        '@type': 'HowTo',
        '@id': `${canonical}#journey`,
        name: "Parcours de décision d'un étudiant tunisien qui veut étudier à l'étranger",
        step: journeys.map((journey, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: journey.stage,
          text: journey.answer,
        })),
      },
    ],
  };

  return (
    <>
      <SEOHelmet
        title="Encyclopédie études à l’étranger Tunisie | EduGrowth"
        description="Base de connaissances EduGrowth: orientation, admission, visa, logement, budget, parents, Campus France, alternance, bourses et comparatifs pour Tunisiens."
        canonical={canonical}
        lang="fr"
        structuredData={structuredData}
      />
      <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 sm:px-6">
        <article className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-10">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-black text-[#005A9C]">
              <Home size={16} /> Accueil EduGrowth
            </Link>
            <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-[#176b87]">Wikipédia EduGrowth · Intentions · GEO · EEAT</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-[#17324d]">
              Encyclopédie des études à l’étranger pour les étudiants tunisiens
            </h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">
              Cette page organise les questions réelles des étudiants tunisiens et de leurs parents : orientation, admission, visa, budget, logement, Campus France, alternance, bourses, équivalences, métiers et retour en Tunisie.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour EduGrowth, je veux comprendre mon parcours pour étudier à l'étranger.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white"
              >
                <MessageCircle size={16} /> Poser ma question
              </a>
              <Link to="/ai-knowledge-base" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-[#17324d]">
                Base IA <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm sm:p-10">
            <div className="flex items-center gap-3">
              <BookOpen className="text-[#176b87]" />
              <h2 className="text-3xl font-black text-[#17324d]">Parcours étudiant tunisien</h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {journeys.map((journey) => (
                <div key={journey.stage} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-xl font-black text-[#17324d]">{journey.stage}</h3>
                  <p className="mt-3 text-sm font-bold leading-6 text-slate-700">{journey.userProblem}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{journey.answer}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {journey.links.map(([to, label]) => (
                      <Link key={to} to={to} className="rounded-full bg-white px-4 py-2 text-xs font-black text-[#005A9C] ring-1 ring-slate-200">
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm sm:p-10">
            <h2 className="text-3xl font-black text-[#17324d]">Clusters sémantiques EduGrowth</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              Chaque cluster répond à une famille de problèmes. Les liens ci-dessous aident Google et les moteurs IA à comprendre les relations entre questions, guides, destinations et décisions.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {knowledgeClusters.map((cluster) => (
                <div key={cluster.name} className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="text-xl font-black text-[#17324d]">{cluster.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{cluster.intent}</p>
                  <div className="mt-4 grid gap-2">
                    {cluster.links.map(([to, label]) => (
                      <Link key={to} to={to} className="inline-flex items-center gap-2 text-sm font-black text-[#005A9C]">
                        {label} <ArrowRight size={14} />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm sm:p-10">
            <h2 className="text-3xl font-black text-[#17324d]">Questions essentielles</h2>
            <div className="mt-6 grid gap-4">
              {questionBank.map(([question, answer]) => (
                <div key={question} className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="flex items-start gap-3 text-lg font-black text-[#17324d]">
                    <CheckCircle2 size={18} className="mt-1 text-emerald-600" />
                    <span>{question}</span>
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">{answer}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
