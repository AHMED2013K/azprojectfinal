import { Link, useLocation } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import { trackEvent } from '../utils/tracking';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

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
  '/blog/why-tunisia-better-than-india-outsourcing': {
    title: 'Why Tunisia is Better Than India for Outsourcing: 2026 Comparison',
    description: 'Tunisia vs India outsourcing: cost, quality, language skills, timezone, and cultural fit. Why European companies choose Tunisia.',
    h1: 'Why Tunisia is Better Than India for Outsourcing',
    sections: [
      { h2: '1) Superior Language Skills', text: 'Native French and Arabic speakers with excellent English proficiency vs Indian accent challenges.' },
      { h2: '2) European Timezone Advantage', text: 'GMT+1 alignment with European business hours vs 4-5 hour difference with India.' },
      { h2: '3) Cultural Alignment', text: 'Western business culture and work ethic vs cultural differences that can impact service quality.' },
      { h2: '4) Cost-Effective Quality', text: 'Competitive rates with higher quality output compared to Indian providers.' },
      { h2: '5) Lower Attrition Rates', text: 'Stable workforce vs high turnover in Indian outsourcing industry.' },
    ],
    faq: [
      ['Is Tunisia really cheaper than India?', 'Yes, with better quality and timezone alignment.'],
      ['What languages do Tunisian agents speak?', 'English, French, and Arabic fluently.'],
      ['How is the internet connectivity?', 'Excellent infrastructure with low latency to Europe.'],
    ],
  },
  '/blog/cost-comparison-outsourcing-tunisia-vs-europe': {
    title: 'Cost Comparison: Outsourcing Tunisia vs Europe - Real Numbers 2026',
    description: 'Detailed cost analysis: Tunisia outsourcing costs vs UK, France, Germany. ROI calculations and hidden savings.',
    h1: 'Cost Comparison: Outsourcing Tunisia vs Europe',
    sections: [
      { h2: '1) Base Salary Costs', text: '€800-1200/month in Tunisia vs €2500-4000/month in Europe for similar roles.' },
      { h2: '2) Training & Onboarding', text: '30-50% lower training costs with faster ramp-up time.' },
      { h2: '3) Infrastructure Savings', text: 'No office space, equipment, or overhead costs.' },
      { h2: '4) Quality Assurance', text: 'Structured QA processes at lower cost than European standards.' },
      { h2: '5) Scalability Benefits', text: 'Easy team expansion without recruitment delays.' },
    ],
    faq: [
      ['What\'s the actual ROI?', 'Typically 40-60% cost reduction with maintained quality.'],
      ['Are there hidden costs?', 'Minimal - mainly technology integration and initial training.'],
      ['How long to see savings?', 'Usually within 1-2 months of implementation.'],
    ],
  },
  '/blog/top-benefits-outsourcing-tunisia': {
    title: 'Top Benefits of Outsourcing to Tunisia: Why Companies Choose Us',
    description: 'Complete guide to Tunisia outsourcing advantages: cost savings, quality, language, location, and business benefits.',
    h1: 'Top Benefits of Outsourcing to Tunisia',
    sections: [
      { h2: '1) Significant Cost Reduction', text: '40-60% savings on operational costs while maintaining quality standards.' },
      { h2: '2) Multilingual Capabilities', text: 'Native proficiency in English, French, and Arabic.' },
      { h2: '3) Strategic Location', text: 'Perfect timezone alignment with European and Middle Eastern markets.' },
      { h2: '4) Skilled Workforce', text: 'Well-educated professionals with strong technical and communication skills.' },
      { h2: '5) Business Process Expertise', text: 'Proven track record in customer service, data processing, and administrative tasks.' },
      { h2: '6) Quality Assurance', text: 'Structured processes with regular monitoring and performance metrics.' },
    ],
    faq: [
      ['Is the quality really as good?', 'Yes, with proper training and supervision.'],
      ['What about data security?', 'GDPR compliant with secure infrastructure.'],
      ['Can I start small?', 'Yes, begin with pilot projects and scale as needed.'],
    ],
  },
  '/blog/french-customer-support-outsourcing': {
    title: 'French Customer Support Outsourcing: Why Tunisia is Perfect',
    description: 'Outsource French customer service to Tunisia. Native French speakers, cultural understanding, and cost-effective solutions.',
    h1: 'French Customer Support Outsourcing to Tunisia',
    sections: [
      { h2: '1) Native French Language Skills', text: 'Tunisian agents speak French as a native or second language with perfect accent.' },
      { h2: '2) Cultural Understanding', text: 'Deep understanding of French business culture and customer expectations.' },
      { h2: '3) Cost Advantages', text: 'Significant savings compared to French or Belgian operations.' },
      { h2: '4) Timezone Compatibility', text: 'Overlapping hours with French business schedules.' },
      { h2: '5) Quality Training', text: 'Specialized training in French customer service protocols.' },
    ],
    faq: [
      ['Do they understand French culture?', 'Yes, extensive cultural training and native understanding.'],
      ['What\'s the accent like?', 'Neutral, professional French pronunciation.'],
      ['Can they handle complex French queries?', 'Yes, with proper training and support tools.'],
    ],
  },
  '/blog/hire-call-center-tunisia': {
    title: 'Hire Call Center Tunisia: Complete Guide for International Companies',
    description: 'How to hire a call center in Tunisia. Process, costs, quality standards, and integration for global businesses.',
    h1: 'Hire Call Center Tunisia: Complete Guide',
    sections: [
      { h2: '1) Understanding Tunisia\'s Call Center Landscape', text: 'Modern facilities, skilled agents, and international certifications.' },
      { h2: '2) Recruitment Process', text: 'Rigorous selection, language testing, and skills assessment.' },
      { h2: '3) Training Programs', text: 'Comprehensive onboarding and product-specific training.' },
      { h2: '4) Technology Integration', text: 'CRM systems, call tracking, and quality monitoring tools.' },
      { h2: '5) Quality Assurance', text: 'Regular monitoring, feedback, and performance improvement.' },
      { h2: '6) Cost Structure', text: 'Transparent pricing with volume discounts available.' },
    ],
    faq: [
      ['How long does setup take?', 'Usually 2-4 weeks for a basic team.'],
      ['What technology do you use?', 'Modern cloud-based systems with real-time monitoring.'],
      ['Can I visit the facilities?', 'Yes, virtual tours available, physical visits welcome.'],
    ],
  },
  '/blog/outsourcing-tunisia-vs-india': {
    title: 'Outsourcing Tunisia vs India: Which is Better for Your Business?',
    description: 'Tunisia vs India outsourcing comparison: costs, quality, language, culture, and business advantages.',
    h1: 'Outsourcing Tunisia vs India: Complete Comparison',
    sections: [
      { h2: '1) Cost Analysis', text: 'Tunisia: $8-12/hour vs India: $6-10/hour, but quality justifies premium.' },
      { h2: '2) Language Capabilities', text: 'Tunisia: EN/FR/AR native vs India: EN with varying accents.' },
      { h2: '3) Timezone Advantages', text: 'Tunisia: GMT+1 (Europe) vs India: GMT+5.5 (4-5 hour difference).' },
      { h2: '4) Cultural Alignment', text: 'Tunisia: Western business culture vs India: Different work styles.' },
      { h2: '5) Infrastructure Quality', text: 'Both excellent, but Tunisia has better European connectivity.' },
      { h2: '6) Business Environment', text: 'Tunisia: Stable, business-friendly vs India: Complex regulations.' },
    ],
    faq: [
      ['Which is cheaper?', 'India on paper, but Tunisia offers better value.'],
      ['For European companies?', 'Tunisia is usually the better choice.'],
      ['Quality differences?', 'Tunisia often provides more consistent quality.'],
    ],
  },
  '/blog/outsourcing-tunisia-vs-philippines': {
    title: 'Outsourcing Tunisia vs Philippines: Which Offers Better Value?',
    description: 'Compare Tunisia and Philippines outsourcing: costs, skills, language, and suitability for different business needs.',
    h1: 'Outsourcing Tunisia vs Philippines: Value Comparison',
    sections: [
      { h2: '1) Cost Structure', text: 'Similar pricing, but Tunisia offers better European alignment.' },
      { h2: '2) Language Skills', text: 'Tunisia: EN/FR/AR vs Philippines: EN/Spanish - depends on market.' },
      { h2: '3) Timezone Coverage', text: 'Tunisia: Europe/MENA vs Philippines: Asia/Pacific.' },
      { h2: '4) Cultural Fit', text: 'Tunisia: Mediterranean business culture vs Philippines: Asian work ethic.' },
      { h2: '5) Education Level', text: 'Both high, but Tunisia has more technical graduates.' },
      { h2: '6) Business Maturity', text: 'Philippines more mature BPO industry vs Tunisia growing rapidly.' },
    ],
    faq: [
      ['For US companies?', 'Philippines might have slight edge in English.'],
      ['For European companies?', 'Tunisia is clearly better.'],
      ['Which has better infrastructure?', 'Both excellent, Philippines slightly more mature.'],
    ],
  },
};

export default function BlogArticlePage() {
  const { lang, toggleLanguage } = useLanguage();
  const { pathname } = useLocation();
  const post = posts[pathname] || posts['/blog/comment-etudier-en-france-depuis-la-tunisie'];
  const copy = lang === 'fr'
    ? {
        back: 'Retour au blog',
        ctaTitle: "Passez à l'action",
        ctaText: 'Obtenez un plan personnalisé et des prochaines étapes claires.',
        consultation: 'Réserver une consultation gratuite',
        whatsapp: 'Conseiller WhatsApp',
        whatsappText: 'Bonjour EduGrowth, je veux un accompagnement personnalisé.',
      }
    : {
        back: 'Back to Blog',
        ctaTitle: 'Take Action',
        ctaText: 'Get a personalized plan and clear next steps.',
        consultation: 'Book Free Consultation',
        whatsapp: 'WhatsApp Advisor',
        whatsappText: 'Hello EduGrowth, I want personalized guidance.',
      };

  return (
    <>
      <SEOHelmet
        title={`${post.title} | EduGrowth`}
        description={post.description}
        canonical={`https://edugrowth.tn${pathname}`}
        lang={lang}
      />

      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <article className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-bold text-[#005A9C]">
            <div className="flex flex-wrap gap-3">
              <Link to="/blog">{copy.back}</Link>
              <Link to="/abroad-zone">Abroad Zone</Link>
              <Link to="/outsourcing">Outsourcing</Link>
            </div>
            <LanguageSwitch lang={lang} onToggle={toggleLanguage} />
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
            <h2 className="text-2xl font-black">{copy.ctaTitle}</h2>
            <p className="mt-2 text-slate-300">{copy.ctaText}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/book-consultation"
                onClick={() => trackEvent('cta_click', { cta_type: 'blog_article_consultation', article: pathname })}
                className="rounded-xl bg-[#005A9C] px-5 py-3 text-sm font-black"
              >
                {copy.consultation}
              </Link>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.whatsappText)}`}
                onClick={() => trackEvent('cta_click', { cta_type: 'blog_article_whatsapp', article: pathname })}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/30 px-5 py-3 text-sm font-black"
              >
                {copy.whatsapp}
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
