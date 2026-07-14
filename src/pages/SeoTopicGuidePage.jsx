import { Link, useLocation, useParams } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

const SOURCES = {
  france: [
    { label: 'Campus France Tunisie — informations officielles', url: 'https://www.tunisie.campusfrance.org/' },
    { label: 'France-Visas — portail officiel', url: 'https://france-visas.gouv.fr/' },
  ],
  germany: [
    { label: 'Ambassade d’Allemagne à Tunis — visas nationaux', url: 'https://tunis.diplo.de/tn-fr/service/05-visaeinreise/1672716-1672716?isLocal=false&isPreview=false' },
    { label: 'DAAD — informations sur les études en Allemagne', url: 'https://www.daad.de/en/studying-in-germany/' },
  ],
  spain: [
    { label: 'Ministère espagnol des Affaires étrangères — visas', url: 'https://www.exteriores.gob.es/en/ServicesToCitizens/Pages/Visas.aspx' },
    { label: 'Study in Spain — portail officiel', url: 'https://www.universidades.gob.es/' },
  ],
  med: [
    { label: 'Study in Romania — portail officiel', url: 'https://studyinromania.gov.ro/' },
    { label: 'Autorité roumaine de reconnaissance des diplômes', url: 'https://www.cnred.edu.ro/' },
  ],
  cyprus: [
    { label: 'YÖDAK — organisme d’enseignement supérieur de Chypre du Nord', url: 'https://yodak.gov.ct.tr/en/' },
    { label: 'Réglementation des admissions internationales YÖDAK', url: 'https://www.yodak.gov.ct.tr/en/legislation/regulations.html?download=178%3Aregulation-on-the-principles-of-admission-registration-and-transfer-of-foreign-students-who-are-not-citizens-of-the-trnc-or-the-republic-of-turkey-to-undergraduate-associate-and-graduate-programs-of-higher-education-institutions' },
  ],
  russia: [
    { label: 'Study in Russia — universités et informations internationales', url: 'https://studyinrussia.ru/en/university?lang=en' },
    { label: 'Ambassade de Russie en Tunisie', url: 'https://tunisia.mid.ru/' },
  ],
};

const rawGuides = [
  ['etudes-medecine-etranger-tunisie', 'Étudier médecine à l’étranger depuis la Tunisie', 'med', 'choisir une destination médicale selon le niveau, le budget et le projet professionnel'],
  ['etudier-medecine-roumanie-tunisie', 'Étudier médecine en Roumanie depuis la Tunisie', 'med', 'préparer une candidature auprès d’une université roumaine'],
  ['etudier-medecine-hongrie-tunisie', 'Étudier médecine en Hongrie depuis la Tunisie', 'med', 'comparer programme, langue d’enseignement et coût total'],
  ['etudier-medecine-bulgarie-tunisie', 'Étudier médecine en Bulgarie depuis la Tunisie', 'med', 'vérifier université, admission et reconnaissance'],
  ['etudier-medecine-pologne-tunisie', 'Étudier médecine en Pologne depuis la Tunisie', 'med', 'structurer un projet médical réaliste'],
  ['etudier-medecine-turquie-tunisie', 'Étudier médecine en Turquie depuis la Tunisie', 'med', 'sélectionner un cursus et anticiper les démarches'],
  ['etudier-medecine-chypre-nord-tunisie', 'Étudier médecine à Chypre du Nord depuis la Tunisie', 'med', 'vérifier le cursus, les autorisations et la reconnaissance future'],
  ['etudier-medecine-russie-tunisie', 'Étudier médecine en Russie depuis la Tunisie', 'med', 'évaluer langue, université et conditions de départ'],
  ['etudier-dentaire-roumanie-tunisie', 'Étudier dentisterie en Roumanie depuis la Tunisie', 'med', 'préparer un dossier santé et contrôler la reconnaissance'],
  ['etudier-pharmacie-hongrie-tunisie', 'Étudier pharmacie en Hongrie depuis la Tunisie', 'med', 'comparer les programmes internationaux de pharmacie'],
  ['medecine-anglais-europe-tunisie', 'Études de médecine en anglais en Europe pour Tunisiens', 'med', 'identifier les programmes réellement adaptés au profil linguistique'],
  ['cout-etudes-medecine-etranger-tunisie', 'Coût des études de médecine à l’étranger pour Tunisiens', 'med', 'budgéter scolarité, logement, assurance et visa'],
  ['admission-medecine-apres-bac-tunisie', 'Admission médecine à l’étranger après le bac tunisien', 'med', 'organiser les documents académiques et le calendrier'],
  ['visa-etudiant-medecine-europe-tunisie', 'Visa étudiant médecine Europe depuis la Tunisie', 'med', 'préparer un dossier de visa cohérent et vérifiable'],
  ['reconnaissance-diplome-medecine-etranger-tunisie', 'Reconnaissance d’un diplôme de médecine étranger en Tunisie', 'med', 'vérifier les règles compétentes avant toute inscription'],
  ['universites-medecine-internationales-tunisiens', 'Universités de médecine internationales pour Tunisiens', 'med', 'comparer une université sur des critères académiques réels'],
  ['comparer-medecine-roumanie-hongrie-chypre', 'Médecine : Roumanie, Hongrie ou Chypre du Nord ?', 'med', 'choisir entre trois options sans se limiter au prix affiché'],
  ['documents-candidature-medecine-etranger', 'Documents pour candidater en médecine à l’étranger', 'med', 'sécuriser les pièces académiques, traductions et échéances'],
  ['etudier-chypre-nord-tunisie', 'Étudier à Chypre du Nord depuis la Tunisie', 'cyprus', 'évaluer la destination avant de lancer une candidature'],
  ['universites-chypre-nord-etudiants-tunisiens', 'Universités à Chypre du Nord pour étudiants tunisiens', 'cyprus', 'vérifier établissement, programme et reconnaissance'],
  ['admission-chypre-nord-tunisie', 'Admission universitaire à Chypre du Nord depuis la Tunisie', 'cyprus', 'préparer un dossier clair et respecter le calendrier'],
  ['visa-etudiant-chypre-nord-tunisie', 'Visa étudiant Chypre du Nord depuis la Tunisie', 'cyprus', 'contrôler les exigences applicables avant le départ'],
  ['cout-etudier-chypre-nord-tunisie', 'Coût des études à Chypre du Nord pour un Tunisien', 'cyprus', 'calculer le budget complet et non les seuls frais de scolarité'],
  ['bourses-chypre-nord-etudiants-tunisiens', 'Bourses d’études à Chypre du Nord pour Tunisiens', 'cyprus', 'différencier réduction, bourse et coût réellement restant'],
  ['etudier-medecine-chypre-nord', 'Médecine à Chypre du Nord : guide pour Tunisiens', 'cyprus', 'contrôler programme, pratique clinique et reconnaissance'],
  ['etudier-dentaire-chypre-nord', 'Dentisterie à Chypre du Nord depuis la Tunisie', 'cyprus', 'vérifier les conditions du cursus avant de s’engager'],
  ['etudier-pharmacie-chypre-nord', 'Pharmacie à Chypre du Nord depuis la Tunisie', 'cyprus', 'comparer formation, langue et projet professionnel'],
  ['etudier-ingenierie-chypre-nord', 'Ingénierie à Chypre du Nord depuis la Tunisie', 'cyprus', 'choisir un programme cohérent avec le projet de carrière'],
  ['etudier-business-chypre-nord', 'Business à Chypre du Nord depuis la Tunisie', 'cyprus', 'évaluer programme, budget et débouchés'],
  ['programmes-anglais-chypre-nord', 'Programmes en anglais à Chypre du Nord pour Tunisiens', 'cyprus', 'vérifier la langue effective du cursus et l’admission'],
  ['logement-etudiant-chypre-nord', 'Logement étudiant à Chypre du Nord : budget et options', 'cyprus', 'préparer l’installation avec un budget réaliste'],
  ['vie-etudiante-chypre-nord-tunisiens', 'Vie étudiante à Chypre du Nord pour les Tunisiens', 'cyprus', 'anticiper logement, langue, santé et intégration'],
  ['reconnaissance-diplome-chypre-nord', 'Reconnaissance d’un diplôme de Chypre du Nord', 'cyprus', 'contrôler l’usage du diplôme dans le pays de projet'],
  ['etudier-chypre-nord-apres-bac', 'Étudier à Chypre du Nord après le bac tunisien', 'cyprus', 'construire un parcours d’admission réaliste'],
  ['etudier-russie-tunisie', 'Étudier en Russie depuis la Tunisie', 'russia', 'évaluer la destination avec des informations à jour'],
  ['universites-russie-etudiants-tunisiens', 'Universités russes pour étudiants tunisiens', 'russia', 'comparer université, ville, langue et programme'],
  ['admission-universite-russie-tunisie', 'Admission universitaire en Russie depuis la Tunisie', 'russia', 'préparer les documents et vérifier la procédure universitaire'],
  ['visa-etudiant-russie-tunisie', 'Visa étudiant Russie depuis la Tunisie', 'russia', 'suivre les exigences officielles applicables au dossier'],
  ['cout-etudier-russie-tunisie', 'Coût des études en Russie pour un étudiant tunisien', 'russia', 'prévoir scolarité, logement, assurance et installation'],
  ['etudier-medecine-russie', 'Étudier médecine en Russie depuis la Tunisie', 'russia', 'vérifier programme, langue clinique et reconnaissance'],
  ['etudier-dentaire-russie', 'Étudier dentisterie en Russie depuis la Tunisie', 'russia', 'contrôler le parcours académique avant l’inscription'],
  ['etudier-pharmacie-russie', 'Étudier pharmacie en Russie depuis la Tunisie', 'russia', 'analyser programme, langue et projet professionnel'],
  ['etudier-ingenierie-russie', 'Étudier ingénierie en Russie depuis la Tunisie', 'russia', 'choisir une spécialité et une université pertinentes'],
  ['etudier-informatique-russie', 'Étudier informatique en Russie depuis la Tunisie', 'russia', 'comparer les formations et conditions linguistiques'],
  ['programmes-anglais-russie-tunisie', 'Programmes en anglais en Russie pour étudiants tunisiens', 'russia', 'vérifier la langue réelle de toutes les années du cursus'],
  ['langue-russe-etudes-tunisiens', 'Langue russe pour étudier en Russie : guide Tunisien', 'russia', 'anticiper la préparation linguistique et la vie quotidienne'],
  ['logement-etudiant-russie-tunisie', 'Logement étudiant en Russie depuis la Tunisie', 'russia', 'préparer les options d’hébergement avant le départ'],
  ['bourses-russie-etudiants-tunisiens', 'Bourses d’études en Russie pour Tunisiens', 'russia', 'vérifier les opportunités directement auprès des organismes compétents'],
  ['reconnaissance-diplome-russie-tunisie', 'Reconnaissance d’un diplôme russe en Tunisie', 'russia', 'contrôler les démarches avant de choisir un cursus'],
  ['etudier-russie-apres-bac-tunisien', 'Étudier en Russie après le bac tunisien', 'russia', 'planifier admission, langue et financement'],
];

export const seoGuides = rawGuides.map(([slug, title, cluster, angle]) => ({ slug, title, cluster, angle }));

export const priorityGuides = [
  { path: '/cout-etudier-france-depuis-tunisie', slug: 'cout-etudier-france-depuis-tunisie', title: 'Coût des études en France depuis la Tunisie', cluster: 'france', angle: 'budgéter études, logement, visa, assurance et installation en France' },
  { path: '/campus-france-tunisie-calendrier-2026-2027', slug: 'campus-france-tunisie-calendrier-2026-2027', title: 'Campus France Tunisie : calendrier 2026-2027', cluster: 'france', angle: 'organiser les étapes Campus France et les échéances de candidature' },
  { path: '/alternance-france-tunisiens-conditions-visa', slug: 'alternance-france-tunisiens-conditions-visa', title: 'Alternance en France pour Tunisiens : conditions et visa', cluster: 'france', angle: 'vérifier l’éligibilité, le contrat et les étapes administratives' },
  { path: '/universites-allemagne-etudiants-tunisiens', slug: 'universites-allemagne-etudiants-tunisiens', title: 'Universités allemandes pour étudiants tunisiens', cluster: 'germany', angle: 'comparer université, programme, langue et admission en Allemagne' },
  { path: '/visa-etudiant-espagne-tunisie', slug: 'visa-etudiant-espagne-tunisie', title: 'Visa étudiant Espagne depuis la Tunisie', cluster: 'spain', angle: 'préparer un dossier de visa étudiant Espagne cohérent' },
  { path: '/cout-etudier-espagne-etudiant-tunisien', slug: 'cout-etudier-espagne-etudiant-tunisien', title: 'Coût des études en Espagne pour un étudiant tunisien', cluster: 'spain', angle: 'calculer le budget études, logement et installation en Espagne' },
  { path: '/etudier-medecine-hongrie-depuis-tunisie', slug: 'etudier-medecine-hongrie-depuis-tunisie', title: 'Étudier médecine en Hongrie depuis la Tunisie', cluster: 'med', angle: 'comparer un cursus médical, l’admission et la reconnaissance future' },
  { path: '/bourses-france-etudiants-tunisiens', slug: 'bourses-france-etudiants-tunisiens', title: 'Bourses d’études en France pour étudiants tunisiens', cluster: 'france', angle: 'chercher des bourses et préparer un financement réaliste' },
  { path: '/logement-etudiant-allemagne-depuis-tunisie', slug: 'logement-etudiant-allemagne-depuis-tunisie', title: 'Logement étudiant en Allemagne depuis la Tunisie', cluster: 'germany', angle: 'anticiper le logement, le budget et l’installation en Allemagne' },
  { path: '/equivalence-diplome-tunisien-etudes-etranger', slug: 'equivalence-diplome-tunisien-etudes-etranger', title: 'Équivalence du diplôme tunisien pour étudier à l’étranger', cluster: 'general', angle: 'vérifier la reconnaissance des études et les documents académiques' },
];

function destinationLabel(cluster) {
  if (cluster === 'france') return 'la France';
  if (cluster === 'germany') return 'l’Allemagne';
  if (cluster === 'spain') return 'l’Espagne';
  if (cluster === 'cyprus') return 'Chypre du Nord';
  if (cluster === 'russia') return 'Russie';
  if (cluster === 'med') return 'les études de médecine à l’étranger';
  return 'les études à l’étranger';
}

export default function SeoTopicGuidePage() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const guide = seoGuides.find((item) => item.slug === slug) || priorityGuides.find((item) => item.path === pathname.replace(/\/$/, '')) || seoGuides[0];
  const destination = destinationLabel(guide.cluster);
  const sources = SOURCES[guide.cluster] || [];
  const healthStudy = guide.cluster === 'med' || /médecine|dentisterie|pharmacie/i.test(guide.title);
  const canonical = guide.path ? `https://edugrowth.tn${guide.path}/` : `https://edugrowth.tn/guides/${guide.slug}/`;
  const related = guide.cluster === 'france'
    ? [{ to: '/etudier-en-france-depuis-tunisie', label: 'Étudier en France depuis la Tunisie' }, { to: '/campus-france-tunisie-guide', label: 'Guide Campus France Tunisie' }]
    : guide.cluster === 'germany'
      ? [{ to: '/etudier-en-allemagne-depuis-tunisie', label: 'Étudier en Allemagne depuis la Tunisie' }, { to: '/programmes/ausbildung-allemagne', label: 'Programme Ausbildung Allemagne' }]
      : guide.cluster === 'spain'
        ? [{ to: '/etudier-en-espagne-depuis-tunisie', label: 'Étudier en Espagne depuis la Tunisie' }, { to: '/comparatif-pays-etudes-etranger-tunisie', label: 'Comparer les destinations' }]
    : guide.cluster === 'cyprus'
    ? [{ to: '/etudier-a-chypre-depuis-tunisie', label: 'Guide Chypre du Nord' }, { to: '/fr/etudier-medecine-pharmacie-etranger', label: 'Médecine à l’étranger' }]
    : guide.cluster === 'russia'
      ? [{ to: '/etudier-en-russie-depuis-tunisie', label: 'Guide Russie' }, { to: '/blog/etudier-medecine-roumanie-tunisie', label: 'Médecine : autre option européenne' }]
      : [{ to: '/fr/etudier-medecine-pharmacie-etranger', label: 'Pilier médecine et pharmacie' }, { to: '/comparatif-pays-etudes-etranger-tunisie', label: 'Comparer les destinations' }];
  const faq = [
    { q: `Cette page convient-elle à tous les profils pour ${destination} ?`, a: `Non. Elle sert à préparer la décision ; l’admission, la langue, le financement, le visa et la reconnaissance doivent être vérifiés selon votre situation.` },
    { q: 'Quelles informations vérifier avant toute inscription ?', a: 'Le programme exact, l’établissement, la langue de toutes les années d’études, le coût complet, les documents, le visa et la reconnaissance dans le pays de projet.' },
    { q: 'Pourquoi consulter les sources officielles ?', a: 'Les règles d’admission, de visa et de reconnaissance évoluent. Les sites officiels et l’université concernée restent la référence avant tout paiement.' },
  ];
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', '@id': `${canonical}#article`, headline: guide.title, description: `Guide EduGrowth pour ${guide.angle}.`, dateModified: '2026-07-14', author: { '@type': 'Organization', name: 'EduGrowth Tunisia' }, publisher: { '@type': 'Organization', name: 'EduGrowth Tunisia', logo: { '@type': 'ImageObject', url: 'https://edugrowth.tn/Submark.webp' } } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://edugrowth.tn/' }, { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://edugrowth.tn/blog/' }, { '@type': 'ListItem', position: 3, name: guide.title, item: canonical }] },
    { '@type': 'FAQPage', mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
  ] };

  return <><SEOHelmet title={`${guide.title} | EduGrowth`} description={`Guide pratique : ${guide.angle}. Étapes, budget, documents et vérifications pour les étudiants tunisiens.`} canonical={canonical} lang="fr" structuredData={schema} />
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900"><article className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
      <nav className="text-sm font-bold text-[#005A9C]"><Link to="/">Accueil</Link> <span className="px-2">/</span><Link to="/blog">Guides études à l’étranger</Link></nav>
      <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#176b87]">Guide vérifié · 14 juillet 2026</p><h1 className="mt-3 text-4xl font-black leading-tight">{guide.title}</h1>
      <p className="mt-5 text-lg leading-8 text-slate-700">Ce guide aide les étudiants tunisiens à {guide.angle}. Il ne remplace pas les exigences de l’université, de l’ambassade ou de l’autorité de reconnaissance compétente.</p>
      <section className="mt-9"><h2 className="text-2xl font-black">1. Commencer par un projet vérifiable</h2><p className="mt-3 leading-7 text-slate-700">Avant de candidater, définissez le niveau d’études, la spécialité, la langue et le pays où vous souhaitez ensuite exercer. Pour {destination}, le choix doit reposer sur le programme précis et non sur une promesse générale.</p></section>
      <section className="mt-8"><h2 className="text-2xl font-black">2. Contrôler l’établissement et le programme</h2><p className="mt-3 leading-7 text-slate-700">Consultez la page officielle de l’université : accréditation, durée, langue d’enseignement, frais et conditions d’admission. {healthStudy ? 'Pour les filières santé, vérifiez aussi les conditions de pratique clinique et les règles de reconnaissance du diplôme.' : 'Vérifiez également la reconnaissance du programme et les prérequis académiques applicables à votre projet.'}</p></section>
      <section className="mt-8"><h2 className="text-2xl font-black">3. Calculer le budget complet</h2><p className="mt-3 leading-7 text-slate-700">Additionnez scolarité, logement, assurance, visa, transport, traductions, installation et une marge de sécurité. Un projet finançable est plus important qu’un prix d’inscription attractif isolé.</p></section>
      <section className="mt-8"><h2 className="text-2xl font-black">4. Préparer un dossier et un calendrier</h2><p className="mt-3 leading-7 text-slate-700">Préparez passeport, relevés, diplôme, traductions, preuve linguistique et financement selon la checklist officielle. Les délais d’admission et de visa imposent de commencer assez tôt et de conserver les preuves de chaque démarche.</p></section>
      <section className="mt-8"><h2 className="text-2xl font-black">5. Vérifier avant de payer</h2><p className="mt-3 leading-7 text-slate-700">Ne versez pas de somme importante uniquement sur la base d’un intermédiaire. Confirmez l’offre directement auprès de l’établissement, vérifiez les conditions de remboursement et contrôlez la procédure officielle de visa.</p></section>
      {sources.length ? <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5"><h2 className="text-xl font-black">Sources à consulter avant toute décision</h2><ul className="mt-3 space-y-2 text-sm font-semibold text-[#005A9C]">{sources.map((source) => <li key={source.url}><a className="underline" href={source.url} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ul></section> : null}
      <section className="mt-10"><h2 className="text-2xl font-black">Questions fréquentes</h2>{faq.map((item) => <div className="mt-4 rounded-2xl border border-slate-200 p-4" key={item.q}><h3 className="font-black">{item.q}</h3><p className="mt-2 text-slate-700">{item.a}</p></div>)}</section>
      <section className="mt-10 grid gap-3 md:grid-cols-2">{related.map((item) => <Link key={item.to} to={item.to} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-bold text-[#005A9C]">{item.label}</Link>)}<Link to="/book-consultation" className="rounded-2xl bg-[#005A9C] px-4 py-4 font-bold text-white">Évaluer mon projet avec EduGrowth</Link></section>
    </article></main></>;
}
