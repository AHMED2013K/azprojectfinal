import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarClock, CheckCircle2, ClipboardList, FileCheck2, MessageSquareText, ShieldCheck } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { trackEvent } from '../utils/tracking';

const APPLY_URL = 'https://app.edugrowth.tn/apply?utm_source=website&utm_medium=seo_page&utm_campaign=campus_france_tunisie_guide';
const WA_NUMBER = '21656590703';

const faqItems = [
  {
    question: 'Comment préparer Campus France depuis la Tunisie ?',
    answer: 'Il faut commencer tôt, clarifier le projet académique, réunir les documents, préparer les candidatures et garder une logique cohérente entre études, financement et visa.',
  },
  {
    question: 'Quand commencer les démarches Campus France Tunisie ?',
    answer: 'Le plus sûr est de démarrer plusieurs mois avant la rentrée visée afin d’éviter le stress sur les admissions, le budget, le logement et le visa.',
  },
  {
    question: 'Pourquoi cette page Campus France Tunisie est utile pour Google ?',
    answer: 'Parce qu’elle répond à une intention de recherche claire, apporte du contenu utile et redirige ensuite vers les pages de conversion du site et le formulaire apply.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Campus France Tunisie Guide',
      url: 'https://edugrowth.tn/campus-france-tunisie-guide',
      description: 'Guide pratique Campus France Tunisie 2026 : calendrier, documents, entretien, visa étudiant et CTA vers apply EduGrowth.',
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

export default function CampusFranceTunisieGuidePage() {
  const handleApplyClick = () => {
    trackEvent('cta_click', {
      cta_type: 'campus_france_guide_apply',
      page: '/campus-france-tunisie-guide',
    });
  };

  return (
    <>
      <SEOHelmet
        title="Campus France Tunisie Guide | Démarches 2026"
        description="Campus France Tunisie : guide clair pour préparer son dossier, son calendrier, son entretien et avancer vers la France avec EduGrowth."
        canonical="https://edugrowth.tn/campus-france-tunisie-guide"
        structuredData={structuredData}
        lang="fr"
      />

      <div className="min-h-screen bg-slate-50 text-slate-900">
        <section className="bg-gradient-to-br from-sky-50 via-white to-blue-100 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="inline-flex rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-sky-700">
                  Campus France Tunisie
                </div>
                <h1 className="mt-6 text-4xl font-black leading-tight md:text-5xl">
                  Campus France Tunisie : guide simple pour structurer le dossier, le calendrier et la suite
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                  Cette page vise les recherches autour de <strong>Campus France Tunisie</strong>, du calendrier de candidature, des documents, de l’entretien et du visa étudiant.
                  Le but est d’attirer une demande Google plus large, puis de l’orienter vers les pages les plus convertissantes de ton site.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={APPLY_URL}
                    onClick={handleApplyClick}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#005A9C] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#00497f]"
                  >
                    Remplir le formulaire apply
                    <ArrowRight size={18} />
                  </a>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour EduGrowth, je veux avancer sur mon dossier Campus France depuis la Tunisie.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-4 text-sm font-black text-slate-900 transition hover:-translate-y-0.5"
                  >
                    WhatsApp direct
                  </a>
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
                <h2 className="text-2xl font-black">Pourquoi cette page est utile</h2>
                <div className="mt-6 space-y-4">
                  {[
                    'Elle capte une intention de recherche précise liée à Campus France Tunisie.',
                    'Elle renforce le cluster France déjà présent sur edugrowth.tn.',
                    'Elle envoie ensuite vers apply, le blog et les pages programme.',
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

        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-black">Les 4 blocs à sécuriser pour un dossier Campus France Tunisie</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: CalendarClock,
                  title: 'Le calendrier',
                  text: 'Le timing compte énormément. Commencer tard peut coûter des opportunités de programme, du temps de préparation et de la sérénité sur le visa.',
                },
                {
                  icon: ClipboardList,
                  title: 'Les documents',
                  text: 'Relevés, diplômes, justificatifs, projet académique et pièces d’identité doivent raconter une histoire cohérente et propre.',
                },
                {
                  icon: MessageSquareText,
                  title: 'L’entretien',
                  text: 'L’entretien Campus France teste surtout la clarté du projet, la logique du parcours et la crédibilité globale du candidat.',
                },
                {
                  icon: FileCheck2,
                  title: 'La suite après admission',
                  text: 'Une fois l’admission avancée, il faut déjà penser financement, logement, visa étudiant et installation en France.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
                      <item.icon size={22} />
                    </div>
                    <h3 className="text-xl font-black">{item.title}</h3>
                  </div>
                  <p className="mt-4 leading-7 text-slate-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
              <div className="flex items-center gap-3 text-[#005A9C]">
                <ShieldCheck size={20} />
                <span className="text-sm font-black uppercase tracking-[0.24em]">Preuve de sérieux</span>
              </div>
              <h2 className="mt-4 text-3xl font-black">Ce que cherche vraiment un candidat tunisien</h2>
              <p className="mt-4 leading-7 text-slate-700">
                En pratique, la plupart des visiteurs qui tapent “Campus France Tunisie” cherchent à être rassurés, cadrés et guidés.
                Ils veulent savoir quoi préparer, quand le faire et comment éviter les erreurs. Cette page répond à cette intention sans casser ton design principal.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-black">FAQ Campus France Tunisie</h2>
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
            <h2 className="text-3xl font-black">Pages liées à pousser aussi</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                { to: '/blog/campus-france-tunisie-etapes', label: 'Article Campus France Tunisie : étapes' },
                { to: '/etudier-en-france-depuis-tunisie', label: 'Étudier en France depuis la Tunisie' },
                { to: '/programmes/alternance-france', label: 'Programme alternance France' },
                { to: '/alternance-en-france-pour-tunisiens', label: 'Alternance en France pour Tunisiens' },
              ].map((item) => (
                <Link key={item.to} to={item.to} className="rounded-2xl border border-slate-200 bg-white p-5 font-black text-[#005A9C] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
