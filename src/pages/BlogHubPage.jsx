import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

const topics = [
  'Comment étudier en France depuis la Tunisie',
  'Coût des études à l\'étranger pour un étudiant tunisien',
  'Top pays pour étudier après le bac',
  'Visa étudiant: guide étape par étape',
  'Pourquoi externaliser ses admissions ?',
  'Outsourcing Tunisie: avantages pour les universités',
  'In-house vs outsourcing: calcul du ROI',
  'Comment réussir son dossier Campus France',
  'Étudier en Allemagne: compte bloqué et visa',
  'Étudier au Canada: permis d\'études et budget',
  'Alternance en France: mode d\'emploi',
  'Trouver un logement étudiant à l\'étranger',
  'Erreurs qui causent un refus de visa étudiant',
  'Comment préparer un entretien de visa étudiant',
  'Bourses internationales pour étudiants tunisiens',
  'Checklist départ étudiant international',
  'CRM admissions: KPIs essentiels',
  'Lead qualification pour student recruitment',
  'Externalisation back-office éducatif',
  'Comment scaler une équipe admissions rapidement',
  'Nearshore Tunisie vs Offshore: comparaison',
  'Externalisation multilingue FR-AR-EN',
  'Comment choisir une agence étude à l\'étranger',
  'Étudier à Chypre: coûts et démarches',
  'Étudier en Turquie: admissions et visa',
  'Étudier à Dubai: programmes et débouchés',
  'Master à l\'étranger: stratégie candidature',
  'Étudier sans gros budget: plans réalistes',
  'Assurance santé étudiant international',
  'Jobs étudiants à l\'étranger: ce qu\'il faut savoir',
  'Guide parents: financer les études à l\'étranger',
  'Reconnaissance des diplômes étrangers',
  'Documents à préparer pour une admission internationale',
  'CV étudiant international: modèle efficace',
  'Lettre de motivation université: structure gagnante',
  'IELTS vs TOEFL: lequel choisir ?',
  'Délais de visa par destination',
  'Pourquoi la Tunisie est un hub outsourcing éducatif',
  'Outsourcing pour écoles de langues',
  'Outsourcing pour agences de recrutement étudiant',
  'Outsourcing pour universités privées',
  'SLA admissions: standards recommandés',
  'Construction d\'une équipe conversion étudiante',
  'Pilot outsourcing en 30 jours',
  'Comment réduire les coûts opérationnels admissions',
  'Étude de cas: amélioration du taux de conversion',
  'Guide complet admission université internationale',
  'Externalisation CRM suivi candidats',
  'Support WhatsApp dans le recrutement étudiant',
  'Growth marketing pour agences study abroad',
  'SEO local pour agence étude à l\'étranger en Tunisie',
  'Agence étude à l\'étranger Tunis: checklist',
  'Agence étude à l\'étranger Sousse: checklist',
  'Agence étude à l\'étranger Sfax: checklist',
  'Roadmap 90 jours pour scaler vos admissions',
];

export default function BlogHubPage() {
  const published = [
    { slug: '/blog/comment-etudier-en-france-depuis-la-tunisie', label: 'Comment étudier en France depuis la Tunisie' },
    { slug: '/blog/cout-des-etudes-a-l-etranger', label: "Coût des études à l'étranger" },
    { slug: '/blog/visa-etudiant-guide', label: 'Visa étudiant: guide pratique' },
    { slug: '/blog/pourquoi-externaliser-ses-admissions', label: 'Pourquoi externaliser ses admissions ?' },
    { slug: '/blog/outsourcing-tunisie-avantages', label: 'Outsourcing Tunisie: avantages' },
    { slug: '/blog/top-pays-pour-etudier', label: 'Top pays pour étudier à l’étranger' },
  ];

  return (
    <>
      <SEOHelmet
        title="Blog Étudier à l'Étranger & Outsourcing Tunisie | EduGrowth"
        description="Guides pratiques pour étudier à l'étranger et externaliser admissions/recrutement depuis la Tunisie."
        canonical="https://edugrowth.tn/blog"
      />

      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-black">Blog SEO Hub: Study Abroad + Outsourcing Tunisia</h1>
          <p className="mt-3 text-slate-600">Cluster éditorial pour capter les requêtes transactionnelles et informationnelles FR/EN du marché tunisien.</p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-[#005A9C]">
            <Link to="/abroad-zone">Abroad Zone</Link>
            <Link to="/outsourcing">Outsourcing</Link>
            <Link to="/etudier-en-france-depuis-tunisie">Guide France</Link>
            <Link to="/education-outsourcing-tunisia">Education Outsourcing</Link>
            <Link to="/programmes/alternance-france">Programme Alternance</Link>
            <Link to="/programmes/ausbildung-allemagne">Programme Ausbildung</Link>
          </div>

          <section className="mt-8">
            <h2 className="text-2xl font-black">Articles publiés</h2>
            <div className="mt-4 flex flex-col gap-2 text-sm font-bold text-[#005A9C]">
              {published.map((post) => (
                <Link key={post.slug} to={post.slug}>
                  {post.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-black">50+ idées d'articles</h2>
            <ul className="mt-4 space-y-2 text-slate-700">
              {topics.map((topic) => (
                <li key={topic}>• {topic}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10 rounded-2xl bg-slate-950 p-6 text-white">
            <h2 className="text-2xl font-black">CTA éditorial</h2>
            <p className="mt-2 text-slate-300">Chaque article doit inclure un CTA vers consultation gratuite + lien WhatsApp + lien page service associée.</p>
          </section>
        </div>
      </div>
    </>
  );
}
