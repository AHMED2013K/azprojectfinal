import { Link, useLocation } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import { trackEvent } from '../utils/tracking';

const WA_NUMBER = '21656590703';

const posts = {
  '/blog/comment-etudier-en-france-depuis-la-tunisie': {
    title: 'Comment étudier en France depuis la Tunisie: guide complet 2026',
    description: 'Étapes, coûts, dossier Campus France, visa étudiant et erreurs à éviter pour étudier en France depuis la Tunisie.',
    h1: 'Comment étudier en France depuis la Tunisie',
    sections: [
      { h2: '1) Choisir la formation adaptée', text: 'Commencez par définir votre objectif: licence, master, école spécialisée ou alternance. Le bon choix réduit les refus et accélère le visa.' },
      { h2: '2) Préparer le dossier Campus France', text: 'Respectez les dates, préparez des documents propres et cohérents, puis validez votre projet académique avec des preuves solides.' },
      { h2: '3) Anticiper budget et logement', text: 'Préparez les frais de scolarité, de visa et de vie quotidienne. Avoir un plan financier clair renforce votre dossier.' },
      { h2: '4) Finaliser le visa étudiant', text: 'Après admission, constituez le dossier visa sans incohérence et préparez l\'entretien si nécessaire.' },
    ],
    faq: [
      ['Combien de temps faut-il pour préparer un dossier ?', 'En général 3 à 6 mois avec une préparation sérieuse.'],
      ['Peut-on être accompagné de A à Z ?', 'Oui, de l\'orientation initiale jusqu\'au départ.'],
    ],
  },
  '/blog/cout-des-etudes-a-l-etranger': {
    title: 'Coût des études à l\'étranger: budget réaliste pour étudiants tunisiens',
    description: 'Frais de scolarité, logement, visa, assurance et dépenses mensuelles: méthode simple pour budgéter vos études à l\'étranger.',
    h1: 'Coût des études à l\'étranger: le vrai budget à prévoir',
    sections: [
      { h2: '1) Frais académiques', text: 'Ils varient selon pays, université et niveau. Comparez toujours public/privé et frais annexes.' },
      { h2: '2) Dépenses de vie', text: 'Logement, transport, alimentation et assurance représentent souvent le poste le plus élevé.' },
      { h2: '3) Coûts administratifs', text: 'Incluez visa, traductions, attestations, tests linguistiques et billets.' },
      { h2: '4) Plan de financement', text: 'Combinez apport familial, bourse, et plan de paiement réaliste pour sécuriser le projet.' },
    ],
    faq: [
      ['Quel budget mensuel prévoir ?', 'Cela dépend de la destination, mais il faut planifier avec une marge de sécurité.'],
      ['EduGrowth peut-il aider à optimiser le budget ?', 'Oui, via choix destination/programme et stratégie financière.'],
    ],
  },
  '/blog/visa-etudiant-guide': {
    title: 'Visa étudiant: guide pratique étape par étape',
    description: 'Checklist visa étudiant, documents critiques et erreurs fréquentes qui causent les refus.',
    h1: 'Visa étudiant: guide pratique',
    sections: [
      { h2: '1) Comprendre les exigences du pays', text: 'Chaque destination impose des preuves spécifiques: fonds, admission, assurance, hébergement.' },
      { h2: '2) Préparer un dossier cohérent', text: 'Le fond et la forme comptent: cohérence académique, documents clairs et justificatifs complets.' },
      { h2: '3) Préparer l\'entretien', text: 'Soyez capable d\'expliquer votre projet d\'étude, votre financement et votre plan post-diplôme.' },
      { h2: '4) Anticiper les délais', text: 'Déposez le plus tôt possible pour éviter les retards de rentrée.' },
    ],
    faq: [
      ['Pourquoi les visas sont refusés ?', 'Dossier incomplet, incohérences, ou financement insuffisant.'],
      ['Un coaching entretien est-il utile ?', 'Oui, il augmente la clarté et la confiance du candidat.'],
    ],
  },
  '/blog/pourquoi-externaliser-ses-admissions': {
    title: 'Pourquoi externaliser ses admissions: ROI, vitesse et qualité',
    description: 'Comment les institutions réduisent les coûts et améliorent la conversion en externalisant admissions et lead qualification.',
    h1: 'Pourquoi externaliser ses admissions',
    sections: [
      { h2: '1) Réduction des coûts', text: 'L\'externalisation limite les charges fixes tout en conservant un haut niveau d\'exécution.' },
      { h2: '2) Déploiement rapide', text: 'Vous activez une équipe opérationnelle en jours plutôt qu\'en mois.' },
      { h2: '3) Multilingue et conversion', text: 'Des équipes FR/AR/EN améliorent la réactivité et la qualité du suivi candidat.' },
      { h2: '4) Pilotage KPI', text: 'SLA, taux de réponse, taux de conversion et visibilité CRM deviennent pilotables en continu.' },
    ],
    faq: [
      ['À qui cela s\'adresse ?', 'Universités, écoles de langues et agences éducatives.'],
      ['Comment démarrer ?', 'Par un audit gratuit puis un pilote court avec objectifs mesurables.'],
    ],
  },
  '/blog/outsourcing-tunisie-avantages': {
    title: 'Outsourcing Tunisie: les avantages clés pour les institutions éducatives',
    description: 'Tunisie comme hub nearshore: coûts, langue, proximité et qualité opérationnelle pour l\'éducation.',
    h1: 'Outsourcing Tunisie: avantages concrets',
    sections: [
      { h2: '1) Avantage coût / qualité', text: 'La Tunisie offre un excellent ratio coût-compétence pour les opérations éducatives.' },
      { h2: '2) Proximité horaire', text: 'Le fuseau facilite la coordination avec l\'Europe et la région MENA.' },
      { h2: '3) Compétence linguistique', text: 'FR/AR/EN permet une couverture candidate étendue.' },
      { h2: '4) Scalabilité', text: 'Vous augmentez la capacité sans alourdir la structure interne.' },
    ],
    faq: [
      ['Nearshore ou offshore ?', 'Pour ce secteur, le nearshore tunisien est souvent plus agile et plus aligné.'],
      ['Quels services externaliser en premier ?', 'Lead qualification et admissions follow-up sont les plus rapides à rentabiliser.'],
    ],
  },
  '/blog/top-pays-pour-etudier': {
    title: 'Top pays pour étudier à l\'étranger en 2026',
    description: 'France, Allemagne, Canada, Chypre et autres destinations: comment choisir selon budget, visa et objectif carrière.',
    h1: 'Top pays pour étudier à l\'étranger',
    sections: [
      { h2: '1) France', text: 'Écosystème académique fort, nombreuses options et alternance attractive.' },
      { h2: '2) Allemagne', text: 'Opportunités techniques solides et coût souvent compétitif en public.' },
      { h2: '3) Canada', text: 'Environnement international et parcours académiques reconnus.' },
      { h2: '4) Chypre / Turquie / UAE', text: 'Options flexibles pour profils recherchant accessibilité ou spécialisation.' },
    ],
    faq: [
      ['Quel pays choisir ?', 'Celui qui aligne budget, niveau linguistique et objectif professionnel.'],
      ['Faut-il passer par une agence ?', 'Un accompagnement expert réduit les erreurs et les délais.'],
    ],
  },
};

export default function BlogArticlePage() {
  const { pathname } = useLocation();
  const post = posts[pathname] || posts['/blog/comment-etudier-en-france-depuis-la-tunisie'];

  return (
    <>
      <SEOHelmet
        title={`${post.title} | EduGrowth`}
        description={post.description}
        canonical={`https://edugrowth.tn${pathname}`}
      />

      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <article className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-wrap gap-3 text-sm font-bold text-[#005A9C]">
            <Link to="/blog">Back to Blog</Link>
            <Link to="/abroad-zone">Abroad Zone</Link>
            <Link to="/outsourcing">Outsourcing</Link>
          </div>

          <h1 className="mt-4 text-4xl font-black leading-tight">{post.h1}</h1>
          <p className="mt-4 text-slate-600">{post.description}</p>

          <div className="mt-8 space-y-8">
            {post.sections.map((section) => (
              <section key={section.h2}>
                <h2 className="text-2xl font-black">{section.h2}</h2>
                <p className="mt-3 leading-7 text-slate-700">{section.text}</p>
              </section>
            ))}
          </div>

          <section className="mt-10 rounded-2xl bg-slate-950 p-6 text-white">
            <h2 className="text-2xl font-black">Passez à l\'action</h2>
            <p className="mt-2 text-slate-300">Obtenez un plan personnalisé et des prochaines étapes claires.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/book-consultation"
                onClick={() => trackEvent('cta_click', { cta_type: 'blog_article_consultation', article: pathname })}
                className="rounded-xl bg-[#005A9C] px-5 py-3 text-sm font-black"
              >
                Book Free Consultation
              </Link>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Bonjour EduGrowth, je veux un accompagnement personnalisé.')}`}
                onClick={() => trackEvent('cta_click', { cta_type: 'blog_article_whatsapp', article: pathname })}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/30 px-5 py-3 text-sm font-black"
              >
                WhatsApp Advisor
              </a>
            </div>
          </section>

          <section className="mt-10">
            <h3 className="text-xl font-black">FAQ</h3>
            <div className="mt-4 space-y-4">
              {post.faq.map(([q, a]) => (
                <div key={q} className="rounded-2xl border border-slate-200 p-4">
                  <p className="font-black">{q}</p>
                  <p className="mt-1 text-slate-600">{a}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
