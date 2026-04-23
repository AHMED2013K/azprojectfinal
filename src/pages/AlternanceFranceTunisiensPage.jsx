import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Globe2, GraduationCap, SearchCheck, ShieldCheck, Star } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { trackEvent } from '../utils/tracking';

const APPLY_URL = 'https://app.edugrowth.tn/apply?utm_source=website&utm_medium=seo_page&utm_campaign=alternance_france_pour_tunisiens';
const WA_NUMBER = '21656590703';

const faqItems = [
  {
    question: "Peut-on faire une alternance en France quand on est tunisien ?",
    answer: "Oui, un étudiant tunisien peut viser une alternance en France selon son programme, son niveau, la réglementation applicable et surtout sa capacité à décrocher une entreprise d’accueil.",
  },
  {
    question: "Une alternance en France est-elle possible dès la première année ?",
    answer: "Dans beaucoup de cas, les étudiants internationaux découvrent que l’alternance devient plus réaliste à partir de la deuxième année. Le bon scénario dépend du programme, de l’école et du dossier.",
  },
  {
    question: "Comment trouver une alternance en France depuis la Tunisie ?",
    answer: "Il faut combiner un projet d’études cohérent, un CV orienté entreprise, un volume de candidatures discipliné, des relances et un bon ciblage des postes et écoles.",
  },
  {
    question: "Le lien apply EduGrowth est-il utile pour un étudiant tunisien ?",
    answer: "Oui. Le formulaire apply permet d’envoyer directement son profil dans le CRM EduGrowth pour qualification, orientation et suivi plus rapide.",
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Alternance en France pour Tunisiens',
      url: 'https://edugrowth.tn/alternance-en-france-pour-tunisiens',
      description: "Guide SEO pour les étudiants tunisiens qui veulent étudier en France en alternance, comprendre les conditions et candidater via EduGrowth.",
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    },
  ],
};

const keywordChips = [
  'alternance en france pour tunisiens',
  'alternance france étudiant tunisien',
  'étudier en france en alternance depuis la tunisie',
  'alternance france tunisie',
  'étudiant international alternance france',
];

const proofCards = [
  {
    stat: '205+',
    label: 'formulaires publics déjà remplis',
    text: 'Des profils étudiants ont déjà utilisé le funnel apply pour envoyer leur dossier.',
  },
  {
    stat: '400+',
    label: 'clics issus de LinkedIn',
    text: 'La demande existe déjà. Le travail SEO sert maintenant à capter aussi la demande Google.',
  },
  {
    stat: '1',
    label: 'funnel direct vers le CRM',
    text: 'Le trafic SEO peut être envoyé sans friction vers un formulaire déjà prêt à convertir.',
  },
];

const steps = [
  {
    title: 'Clarifier le vrai projet',
    text: "Un étudiant tunisien ne doit pas viser “l’alternance” seule. Il faut d’abord cadrer le niveau, la spécialité, le budget et la logique du parcours en France.",
    icon: SearchCheck,
  },
  {
    title: 'Choisir école + programme compatibles',
    text: "Le bon programme doit être compatible avec votre profil, votre calendrier et la réalité du marché de l'alternance pour un étudiant international.",
    icon: GraduationCap,
  },
  {
    title: 'Candidater comme un profil entreprise',
    text: "CV, pitch, messages de candidature et relances doivent parler comme un futur alternant utile à l'entreprise, pas seulement comme un candidat académique.",
    icon: BriefcaseBusiness,
  },
  {
    title: 'Envoyer son profil et se faire qualifier',
    text: "Le lien apply permet de centraliser le profil, qualifier le projet et enclencher un suivi plus structuré avec EduGrowth.",
    icon: ShieldCheck,
  },
];

export default function AlternanceFranceTunisiensPage() {
  const handleApplyClick = () => {
    trackEvent('cta_click', {
      cta_type: 'alternance_france_seo_apply',
      page: '/alternance-en-france-pour-tunisiens',
    });
  };

  const handleWhatsAppClick = () => {
    trackEvent('cta_click', {
      cta_type: 'alternance_france_seo_whatsapp',
      page: '/alternance-en-france-pour-tunisiens',
    });
  };

  return (
    <>
      <SEOHelmet
        title="Alternance en France pour Tunisiens | Guide SEO 2026"
        description="Alternance en France pour Tunisiens : conditions, méthode, programme, candidatures et lien apply EduGrowth pour envoyer votre profil."
        canonical="https://edugrowth.tn/alternance-en-france-pour-tunisiens"
        structuredData={structuredData}
        lang="fr"
      />

      <div className="min-h-screen bg-white text-slate-900">
        <section className="bg-gradient-to-br from-cyan-50 via-white to-sky-100 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <div className="inline-flex rounded-full border border-cyan-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-cyan-700">
                  SEO France x Tunisie
                </div>
                <h1 className="mt-6 text-4xl font-black leading-tight md:text-5xl">
                  Alternance en France pour Tunisiens : comment capter les bonnes opportunités et candidater proprement
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                  Cette page cible la demande Google autour de <strong>l’alternance en France pour les étudiants tunisiens</strong>.
                  Le but est simple : expliquer la réalité du parcours, rassurer l’étudiant international et l’envoyer vers un funnel apply déjà prêt à convertir.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {keywordChips.map((chip) => (
                    <span key={chip} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
                      {chip}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={APPLY_URL}
                    onClick={handleApplyClick}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#005A9C] px-6 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#00497f]"
                  >
                    Remplir le formulaire apply
                    <ArrowRight size={18} />
                  </a>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour EduGrowth, je veux avancer sur mon projet d'alternance en France depuis la Tunisie.")}`}
                    onClick={handleWhatsAppClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-4 text-sm font-black text-slate-900 transition hover:-translate-y-0.5 hover:border-slate-400"
                  >
                    Parler à un conseiller
                  </a>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
                <h2 className="text-2xl font-black">Pourquoi cette page peut ranker avant le formulaire</h2>
                <div className="mt-6 space-y-4">
                  {[
                    "Google préfère généralement une page de contenu claire à un simple formulaire.",
                    "Le contenu répond à l’intention de recherche avant de proposer l’action apply.",
                    "Le maillage interne vers le blog, le programme et la page France renforce tout le cluster SEO.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                      <CheckCircle2 size={18} className="mt-1 text-emerald-600" />
                      <p className="text-sm leading-6 text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-16 text-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-4 md:grid-cols-3">
              {proofCards.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-4xl font-black text-cyan-300">{item.stat}</p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.22em] text-cyan-100">{item.label}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-black">Étudier en France en alternance depuis la Tunisie : la méthode réaliste</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {steps.map((step) => (
                <div key={step.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-700">
                      <step.icon size={22} />
                    </div>
                    <h3 className="text-xl font-black">{step.title}</h3>
                  </div>
                  <p className="mt-4 leading-7 text-slate-700">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 text-[#005A9C]">
                <Star size={20} />
                <span className="text-sm font-black uppercase tracking-[0.24em]">Signaux de confiance</span>
              </div>
              <h2 className="mt-4 text-3xl font-black">Pourquoi les étudiants internationaux passent à l’action</h2>
              <p className="mt-4 leading-7 text-slate-700">
                Un étudiant tunisien ne cherche pas juste une page jolie. Il cherche un chemin clair : savoir si l’alternance en France est adaptée à son profil,
                comprendre les contraintes, puis envoyer son dossier vers une équipe capable de répondre vite. C’est exactement le rôle de cette page et du lien apply.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  'Explication claire des règles et attentes liées à l’alternance France',
                  'Lien direct vers le formulaire apply sur app.edugrowth.tn',
                  'Pont naturel vers les autres ressources France, Tunisie et étudiant international',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium leading-6 text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-black">FAQ alternance France pour Tunisiens</h2>
            <div className="mt-8 space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-black">{item.question}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-black">Pages liées pour renforcer le cluster SEO France</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                { to: '/programmes/alternance-france', label: 'Programme alternance France' },
                { to: '/blog/alternance-france-pour-tunisiens', label: 'Blog alternance France pour les Tunisiens' },
                { to: '/etudier-en-france-depuis-tunisie', label: 'Étudier en France depuis la Tunisie' },
                { to: '/blog/comment-etudier-en-france-depuis-la-tunisie', label: 'Guide complet études en France' },
              ].map((item) => (
                <Link key={item.to} to={item.to} className="rounded-2xl border border-slate-200 bg-white p-5 font-black text-[#005A9C] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#005A9C] py-20 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
              <Globe2 size={30} />
            </div>
            <h2 className="mt-6 text-3xl font-black">Le SEO attire, apply convertit</h2>
            <p className="mt-4 text-lg leading-8 text-cyan-50/90">
              Si votre objectif est de capter plus que LinkedIn, il faut une page capable de ranker sur Google, puis un CTA très visible vers le formulaire apply.
              Cette page joue ce rôle sans toucher au design central du portail.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={APPLY_URL}
                onClick={handleApplyClick}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-black text-[#005A9C] transition hover:-translate-y-0.5"
              >
                Ouvrir le formulaire apply
                <ArrowRight size={18} />
              </a>
              <Link
                to="/abroad-zone"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/30 px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Voir Abroad Zone
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
