import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Home, MessageCircle } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

const countryData = {
  '/etudier-en-allemagne-depuis-tunisie': {
    country: 'Allemagne',
    title: "Étudier en Allemagne depuis la Tunisie",
    description: "Comment étudier en Allemagne depuis la Tunisie: admission, compte bloqué, visa, budget, logement et opportunités Ausbildung.",
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
    country: 'Chypre',
    title: "Étudier à Chypre depuis la Tunisie",
    description: "Admissions, budget, logement et visa pour étudier à Chypre depuis la Tunisie.",
    h1: "Étudier à Chypre depuis la Tunisie",
    tuition: "Souvent plus accessible que d’autres destinations privées",
    visa: "Visa étudiant selon établissement et pièces justificatives",
    timeline: ["Sélection université", "Dépôt dossier", "Admission", "Visa et arrivée"],
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
    faq: [
      { q: "Chypre est-elle une destination abordable ?", a: "Elle peut l’être selon l’établissement choisi, mais il faut regarder le coût global et pas seulement les frais d’inscription." },
      { q: "Faut-il passer par une agence ?", a: "Un accompagnement réduit les erreurs sur le choix de l’école, le dossier et la préparation du départ." },
    ],
    relatedLinks: [
      { to: "/abroad-zone", label: "Voir Abroad Zone" },
      { to: "/blog/top-pays-pour-etudier", label: "Comparer les destinations" },
      { to: "/book-consultation", label: "Réserver une consultation" },
      { to: "/etudier-en-turquie-depuis-tunisie", label: "Voir aussi Turquie" },
    ],
  },
  '/etudier-en-turquie-depuis-tunisie': {
    country: 'Turquie',
    title: "Étudier en Turquie depuis la Tunisie",
    description: "Guide admission et visa pour étudier en Turquie depuis la Tunisie.",
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
    title: "Étudier à Dubai depuis la Tunisie",
    description: "Guide pratique pour admissions, budget et visa étudiant à Dubai.",
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
};

export default function CountryGuidePage() {
  const { lang, toggleLanguage } = useLanguage();
  const { pathname } = useLocation();
  const data = countryData[pathname] || countryData['/etudier-en-allemagne-depuis-tunisie'];
  const copy = lang === 'fr'
    ? {
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
      }
    : {
        back: 'Back to Abroad Zone',
        advisor: 'WhatsApp Advisor',
        advisorText: `Hello EduGrowth, I want to study in ${data.country}.`,
        badge: 'Study Abroad Guide',
        tuition: 'Tuition Estimate',
        visa: 'Visa Path',
        timeline: 'Recommended Timeline',
        highlights: 'Key points to verify',
        budget: 'Budget planning',
        faqTitle: `${data.country} FAQ`,
        supportTitle: 'Need personalized guidance?',
        supportText: 'Our advisors help you choose the right program, prepare your application, and secure your visa.',
        consultation: 'Book Free Consultation',
        whatsappNow: 'WhatsApp Now',
        supportWhatsapp: `I want personalized guidance to study in ${data.country}.`,
        related: 'Related Guides',
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
          name: 'EduGrowth Outsourcing',
        },
        publisher: {
          '@type': 'Organization',
          name: 'EduGrowth Outsourcing',
          logo: {
            '@type': 'ImageObject',
            url: 'https://edugrowth.tn/Submark.png',
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
