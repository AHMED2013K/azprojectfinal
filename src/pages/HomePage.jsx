import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BadgeCheck, BookOpen, Building2, Globe2, GraduationCap, MessageCircle, PhoneCall, Search, ShieldCheck, Sparkles, TrendingUp, Users } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import LanguageSwitch from '../components/LanguageSwitch';
import PortalSelector from '../components/PortalSelector';
import { useLanguage } from '../context/LanguageContext.jsx';
import { testimonials } from '../components/data.js';
import { trackEvent } from '../utils/tracking';

const WA_NUMBER = '21656590703';

function buildApplyUrl(source, lang) {
  const params = new URLSearchParams({
    utm_source: 'website',
    utm_medium: 'organic',
    utm_campaign: source,
    utm_content: lang,
  });

  return `https://app.edugrowth.tn/apply?${params.toString()}`;
}

const translations = {
  en: {
    seoTitle: 'EduGrowth Tunisia | Study Abroad Tunisia, Alternance France & Outsourcing Services',
    seoDescription:
      'EduGrowth helps Tunisian students study abroad and helps international companies outsource customer service, virtual teams, and education operations from Tunisia.',
    badge: 'Tunisia growth platform for students and companies',
    heroTitle: 'Study abroad, alternance, and outsourcing from Tunisia.',
    gateTitle: 'Choose your portal',
    gateSubtitle: 'Access Abroad Zone for student guidance or EduGrowth for outsourcing and B2B services from Tunisia.',
    portalButton: 'Portal',
    heroText:
      'EduGrowth connects Tunisian students with international opportunities and helps companies in Europe, North America, and the Gulf build multilingual offshore teams in Tunisia.',
    heroPrimary: 'Apply Now',
    heroSecondary: 'Get Free Consultation',
    heroTertiary: 'WhatsApp Us',
    trustTitle: 'Built for SEO visibility and fast lead conversion',
    trustItems: [
      'Study abroad guidance for Tunisian students',
      'Alternance France funnel connected to CRM',
      'Outsourcing positioning for Europe, USA, Canada, and UAE',
    ],
    studentBadge: 'Student funnel',
    studentTitle: 'Study abroad Tunisia and alternance France support',
    studentText:
      'Guide students from discovery to application with destination pages, program pages, and a CRM-connected application form.',
    studentPoints: [
      'Study abroad Tunisia guidance',
      'France admissions and alternance support',
      'Direct application funnel on app.edugrowth.tn/apply',
    ],
    studentPrimary: 'Go to Abroad Zone',
    studentSecondary: 'Open Apply Form',
    b2bBadge: 'B2B funnel',
    b2bTitle: 'Outsourcing services Tunisia for global companies',
    b2bText:
      'Position EduGrowth as a Tunisia-based outsourcing bridge for customer service, virtual assistants, admissions support, and multilingual operations.',
    b2bPoints: [
      'Customer service outsourcing Tunisia',
      'Virtual assistants and back-office support',
      'Business process outsourcing for Europe and GCC',
    ],
    b2bPrimary: 'Explore Outsourcing',
    b2bSecondary: 'Book Strategy Call',
    pillarsTitle: 'Core pages designed to rank and convert',
    pillarsText:
      'These landing pages form the backbone of the SEO cluster and route visitors into the right funnel.',
    pillarCards: [
      {
        title: 'Study Abroad Tunisia',
        body: 'Target Tunisian intent around international admissions, destinations, visas, and budgeting.',
        to: '/abroad-zone',
        cta: 'Open page',
      },
      {
        title: 'Alternance France',
        body: 'Capture demand around alternance France Tunisie and route applicants into the CRM application flow.',
        to: '/programmes/alternance-france',
        cta: 'View program',
      },
      {
        title: 'Outsourcing Services',
        body: 'Target international buyers looking for offshore teams, BPO, and multilingual support from Tunisia.',
        to: '/outsourcing',
        cta: 'View services',
      },
      {
        title: 'Customer Service Outsourcing',
        body: 'Rank for customer service outsourcing and call center alternatives with a high-conviction page.',
        to: '/outsource-customer-service-tunisia',
        cta: 'Open page',
      },
    ],
    marketTitle: 'Positioning for Tunisia and international markets',
    marketText:
      'EduGrowth now speaks to two profitable audiences: students in Tunisia and companies hiring offshore support.',
    marketBlocks: [
      {
        title: 'Tunisia SEO domination',
        body: 'Build authority for study abroad Tunisia, études en France Tunisie, and alternance France Tunisie.',
      },
      {
        title: 'International outsourcing reach',
        body: 'Target outsourcing services Tunisia, customer service outsourcing, and virtual assistants Tunisia.',
      },
      {
        title: 'CRM-connected conversion',
        body: 'Send high-intent student leads directly into the CRM with campaign-ready source tracking.',
      },
    ],
    stats: [
      { value: '2', label: 'core funnels' },
      { value: 'FR / EN / AR', label: 'language positioning' },
      { value: '24/7', label: 'conversion mindset' },
      { value: '1', label: 'CRM application endpoint' },
    ],
    blogTitle: 'Blog clusters to support rankings',
    blogText:
      'Use the blog as a growth engine with internal links back to money pages and CTAs on every article.',
    blogItems: [
      'Comment étudier en France depuis la Tunisie',
      'Top 10 universités en France pour étudiants tunisiens',
      'Outsourcing from Tunisia: why companies choose North Africa',
      'Cost comparison: hiring in Europe vs outsourcing in Tunisia',
    ],
    blogPrimary: 'Visit the Blog Hub',
    socialProofTitle: 'Trust signals',
    socialProofText:
      'Use proof, responsiveness, and clarity to reduce hesitation and increase lead submissions across both audiences.',
    finalTitle: 'Turn EduGrowth into a lead generation machine',
    finalText:
      'Drive students to apply, route businesses to strategy calls, and keep both paths measurable with analytics and CRM attribution.',
    finalPrimary: 'Apply on app.edugrowth.tn',
    finalSecondary: 'Book Free Consultation',
    finalWhatsApp: 'Chat on WhatsApp',
  },
  fr: {
    seoTitle: "EduGrowth Tunisie | Étudier à l'étranger, Alternance France & Outsourcing",
    seoDescription:
      "EduGrowth aide les étudiants tunisiens à étudier à l'étranger et accompagne les entreprises internationales avec des services d'outsourcing, customer service et équipes offshore depuis la Tunisie.",
    badge: 'Plateforme de croissance tunisienne pour étudiants et entreprises',
    heroTitle: "Étudier à l'étranger, alternance et outsourcing depuis la Tunisie.",
    gateTitle: 'Choisissez votre portail',
    gateSubtitle: "Accédez à Abroad Zone pour l'accompagnement étudiant ou à EduGrowth pour l'outsourcing et les services B2B depuis la Tunisie.",
    portalButton: 'Portail',
    heroText:
      "EduGrowth relie les étudiants tunisiens aux opportunités internationales et aide les entreprises en Europe, Amérique du Nord et Golfe à déployer des équipes multilingues offshore en Tunisie.",
    heroPrimary: 'Postuler maintenant',
    heroSecondary: 'Consultation gratuite',
    heroTertiary: 'WhatsApp',
    trustTitle: 'Pensé pour le SEO et la conversion rapide',
    trustItems: [
      "Accompagnement étude à l'étranger pour les étudiants tunisiens",
      'Funnel alternance France connecté au CRM',
      "Positionnement outsourcing pour l'Europe, les USA, le Canada et les Émirats",
    ],
    studentBadge: 'Funnel étudiant',
    studentTitle: "Étudier à l'étranger Tunisie et alternance France",
    studentText:
      "Guide les étudiants de la découverte jusqu'à la candidature avec des pages destination, des pages programme et un formulaire connecté au CRM.",
    studentPoints: [
      "Orientation étude à l'étranger Tunisie",
      'Admissions France et accompagnement alternance',
      "Formulaire de candidature direct sur app.edugrowth.tn/apply",
    ],
    studentPrimary: 'Voir Abroad Zone',
    studentSecondary: 'Ouvrir le formulaire',
    b2bBadge: 'Funnel B2B',
    b2bTitle: "Services d'outsourcing en Tunisie pour clients internationaux",
    b2bText:
      "Positionne EduGrowth comme un pont tunisien entre Afrique du Nord, Europe, Amérique du Nord et Golfe pour le customer service, les assistants virtuels et les opérations multilingues.",
    b2bPoints: [
      'Customer service outsourcing Tunisia',
      'Assistants virtuels et support back-office',
      "Business process outsourcing pour l'Europe et le GCC",
    ],
    b2bPrimary: "Découvrir l'outsourcing",
    b2bSecondary: 'Réserver un appel stratégique',
    pillarsTitle: 'Pages clés pour ranker et convertir',
    pillarsText:
      'Ces pages structurent le cluster SEO principal et envoient les visiteurs vers le bon funnel.',
    pillarCards: [
      {
        title: "Étudier à l'étranger Tunisie",
        body: "Cible l'intention tunisienne autour des admissions internationales, destinations, visas et budget.",
        to: '/abroad-zone',
        cta: 'Ouvrir la page',
      },
      {
        title: 'Alternance France',
        body: "Capte la demande autour de l'alternance France Tunisie et envoie les candidats vers le CRM.",
        to: '/programmes/alternance-france',
        cta: 'Voir le programme',
      },
      {
        title: "Services d'outsourcing",
        body: "Cible les entreprises qui cherchent des équipes offshore, du BPO et du support multilingue en Tunisie.",
        to: '/outsourcing',
        cta: 'Voir les services',
      },
      {
        title: 'Customer Service Outsourcing',
        body: 'Travaille les mots-clés customer service outsourcing et call center alternative avec une page forte.',
        to: '/outsource-customer-service-tunisia',
        cta: 'Ouvrir la page',
      },
    ],
    marketTitle: 'Positionnement Tunisie + marchés internationaux',
    marketText:
      'EduGrowth parle maintenant à deux audiences rentables : les étudiants en Tunisie et les entreprises qui recrutent offshore.',
    marketBlocks: [
      {
        title: 'Domination SEO Tunisie',
        body: "Construire l'autorité sur étudier à l'étranger Tunisie, études en France Tunisie et alternance France Tunisie.",
      },
      {
        title: 'Portée outsourcing internationale',
        body: 'Cibler outsourcing services Tunisia, customer service outsourcing et virtual assistants Tunisia.',
      },
      {
        title: 'Conversion connectée au CRM',
        body: 'Envoyer les leads étudiants à forte intention directement dans le CRM avec attribution de source.',
      },
    ],
    stats: [
      { value: '2', label: 'funnels principaux' },
      { value: 'FR / EN / AR', label: 'positionnement langue' },
      { value: '24/7', label: 'mindset conversion' },
      { value: '1', label: 'endpoint apply CRM' },
    ],
    blogTitle: 'Clusters blog pour soutenir les rankings',
    blogText:
      'Utilise le blog comme moteur de croissance avec des liens internes vers les money pages et des CTA sur chaque article.',
    blogItems: [
      "Comment étudier en France depuis la Tunisie",
      'Top 10 universités en France pour étudiants tunisiens',
      'Outsourcing from Tunisia: why companies choose North Africa',
      'Comparatif coût embauche Europe vs outsourcing Tunisie',
    ],
    blogPrimary: 'Voir le Blog Hub',
    socialProofTitle: 'Éléments de confiance',
    socialProofText:
      'Preuve, réactivité et clarté réduisent la friction et augmentent le volume de leads sur les deux audiences.',
    finalTitle: 'Transforme EduGrowth en machine à leads',
    finalText:
      'Envoie les étudiants vers apply, les entreprises vers les appels stratégiques, et mesure les deux parcours avec analytics et CRM.',
    finalPrimary: 'Postuler sur app.edugrowth.tn',
    finalSecondary: 'Réserver une consultation',
    finalWhatsApp: 'WhatsApp direct',
  },
};

const homeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Comment étudier en France depuis la Tunisie avec EduGrowth ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "EduGrowth guide les étudiants tunisiens sur l'orientation, les documents, l'alternance, la candidature et la mise en relation avec le bon parcours.",
          },
        },
        {
          '@type': 'Question',
          name: 'Why outsource operations to Tunisia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tunisia offers multilingual talent, proximity to Europe, competitive costs, and strong alignment for customer service and back-office operations.',
          },
        },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Core EduGrowth funnels',
      itemListElement: [
        { '@type': 'ListItem', position: 1, url: 'https://edugrowth.tn/abroad-zone', name: 'Abroad Zone' },
        { '@type': 'ListItem', position: 2, url: 'https://edugrowth.tn/programmes/alternance-france', name: 'Alternance France' },
        { '@type': 'ListItem', position: 3, url: 'https://edugrowth.tn/outsourcing', name: 'Outsourcing Tunisia' },
        { '@type': 'ListItem', position: 4, url: 'https://app.edugrowth.tn/apply', name: 'CRM Apply Funnel' },
      ],
    },
  ],
};

export default function HomePage() {
  const { lang, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const copy = translations[lang];
  const applyUrl = buildApplyUrl('homepage_apply', lang);
  const whatsappText =
    lang === 'fr'
      ? 'Bonjour EduGrowth, je veux une consultation rapide pour mes études ou mon projet outsourcing.'
      : 'Hello EduGrowth, I want a quick consultation for study abroad or outsourcing.';

  const handleSelectPortal = (view) => {
    trackEvent('portal_select', { portal: view, page: '/' });
    setIsPortalOpen(false);
    navigate(view === 'student' ? '/abroad-zone' : '/outsourcing');
  };

  const handleClosePortal = () => setIsPortalOpen(false);
  const handleOpenPortal = () => {
    trackEvent('portal_open', { page: '/' });
    setIsPortalOpen(true);
  };

  return (
    <>
      <SEOHelmet
        title={copy.seoTitle}
        description={copy.seoDescription}
        canonical="https://edugrowth.tn/home"
        lang={lang}
        structuredData={homeStructuredData}
      />
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,#eef6ff_0%,#ffffff_46%,#ecf7fb_100%)] text-slate-900">
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Link to="/" className="flex items-center gap-3">
              <img src="/Submark.webp" alt="EduGrowth Tunisia logo" className="h-11 w-11 rounded-xl object-contain shadow-sm ring-1 ring-slate-200" />
              <div>
                <div className="text-lg font-black uppercase tracking-tight text-[#1c3450]">EduGrowth</div>
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#175c7d]">Tunisia Growth Bridge</div>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 lg:flex">
              <Link to="/abroad-zone" className="transition hover:text-[#175c7d]">Abroad Zone</Link>
              <Link to="/programmes/alternance-france" className="transition hover:text-[#175c7d]">Alternance France</Link>
              <Link to="/outsourcing" className="transition hover:text-[#175c7d]">Outsourcing</Link>
              <Link to="/blog" className="transition hover:text-[#175c7d]">Blog</Link>
              <Link to="/book-consultation" className="transition hover:text-[#175c7d]">Consultation</Link>
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  trackEvent('cta_click', { cta_type: 'homepage_nav_portal', page: '/home' });
                  handleOpenPortal();
                }}
                className="hidden rounded-full border border-[#175c7d]/20 bg-white/90 px-4 py-2 text-sm font-black text-[#175c7d] shadow-sm transition hover:bg-[#eef7fb] sm:inline-flex"
              >
                {copy.portalButton}
              </button>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-2 py-2 shadow-sm">
                <span className="hidden text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 sm:inline">
                  {lang === 'en' ? 'Version FR' : 'English'}
                </span>
                <LanguageSwitch lang={lang} onToggle={toggleLanguage} className="border-0 bg-transparent px-3 py-1.5 shadow-none hover:bg-blue-50" />
              </div>
              <a
                href={applyUrl}
                onClick={() => trackEvent('cta_click', { cta_type: 'homepage_nav_apply', page: '/' })}
                className="hidden rounded-full bg-[#1c3450] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#1c3450]/15 transition hover:-translate-y-0.5 hover:bg-[#162c43] sm:inline-flex"
              >
                {copy.heroPrimary}
              </a>
            </div>
          </div>
        </header>

        <main>
          <section className="relative overflow-hidden px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-20">
            <div className="absolute inset-0 -z-10 opacity-70">
              <div className="absolute left-[8%] top-10 h-48 w-48 rounded-full bg-[#175c7d]/12 blur-3xl" />
              <div className="absolute right-[10%] top-32 h-56 w-56 rounded-full bg-[#39a0c8]/14 blur-3xl" />
              <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#1c3450]/10 blur-3xl" />
            </div>

            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#175c7d]/20 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#175c7d] shadow-sm">
                  <Sparkles size={14} />
                  {copy.badge}
                </div>
                <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-[#1c3450] sm:text-6xl lg:text-7xl">
                  {copy.heroTitle}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                  {copy.heroText}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={applyUrl}
                    onClick={() => trackEvent('cta_click', { cta_type: 'homepage_hero_apply', page: '/' })}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1c3450] px-7 py-4 text-sm font-black text-white shadow-xl shadow-[#1c3450]/20 transition hover:-translate-y-0.5 hover:bg-[#162c43]"
                  >
                    <GraduationCap size={18} />
                    {copy.heroPrimary}
                  </a>
                  <Link
                    to="/book-consultation"
                    onClick={() => trackEvent('cta_click', { cta_type: 'homepage_hero_consultation', page: '/' })}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#175c7d]/20 bg-white px-7 py-4 text-sm font-black text-[#175c7d] shadow-sm transition hover:-translate-y-0.5 hover:border-[#175c7d]/40 hover:bg-[#eef7fb]"
                  >
                    <PhoneCall size={18} />
                    {copy.heroSecondary}
                  </Link>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('cta_click', { cta_type: 'homepage_hero_whatsapp', page: '/' })}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-7 py-4 text-sm font-black text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-100"
                  >
                    <MessageCircle size={18} />
                    {copy.heroTertiary}
                  </a>
                </div>

                <div className="mt-8">
                  <h2 className="text-sm font-black uppercase tracking-[0.24em] text-slate-500">{copy.trustTitle}</h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                    {copy.trustItems.map((item) => (
                      <li key={item} className="rounded-2xl border border-white/70 bg-white/80 px-4 py-4 text-sm font-semibold text-slate-700 shadow-sm">
                        <div className="flex items-start gap-3">
                          <BadgeCheck className="mt-0.5 text-[#175c7d]" size={18} />
                          <span>{item}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-5">
                <article className="rounded-[2rem] border border-[#175c7d]/10 bg-white/90 p-6 shadow-[0_20px_80px_rgba(28,52,80,0.08)]">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#eef7fb] px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-[#175c7d]">
                    <GraduationCap size={14} />
                    {copy.studentBadge}
                  </div>
                  <h2 className="mt-4 text-3xl font-black text-[#1c3450]">{copy.studentTitle}</h2>
                  <p className="mt-3 text-slate-600">{copy.studentText}</p>
                  <ul className="mt-5 space-y-3 text-sm font-semibold text-slate-700">
                    {copy.studentPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <BadgeCheck className="mt-0.5 text-[#175c7d]" size={17} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link to="/abroad-zone" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#175c7d] px-5 py-3 text-sm font-black text-white hover:bg-[#12445d]">
                      {copy.studentPrimary}
                      <ArrowRight size={16} />
                    </Link>
                    <a
                      href={buildApplyUrl('student_card_apply', lang)}
                      onClick={() => trackEvent('cta_click', { cta_type: 'homepage_student_apply', page: '/' })}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#175c7d]/20 bg-white px-5 py-3 text-sm font-black text-[#175c7d] hover:bg-[#eef7fb]"
                    >
                      {copy.studentSecondary}
                    </a>
                  </div>
                </article>

                <article className="rounded-[2rem] border border-[#1c3450]/10 bg-[#1c3450] p-6 text-white shadow-[0_20px_80px_rgba(23,92,125,0.16)]">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-[#99d6ea]">
                    <Building2 size={14} />
                    {copy.b2bBadge}
                  </div>
                  <h2 className="mt-4 text-3xl font-black">{copy.b2bTitle}</h2>
                  <p className="mt-3 text-slate-200">{copy.b2bText}</p>
                  <ul className="mt-5 space-y-3 text-sm font-semibold text-slate-100">
                    {copy.b2bPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 text-[#7dd3fc]" size={17} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link to="/outsourcing" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#1c3450] hover:bg-slate-100">
                      {copy.b2bPrimary}
                      <ArrowRight size={16} />
                    </Link>
                    <Link
                      to="/book-consultation"
                      onClick={() => trackEvent('cta_click', { cta_type: 'homepage_b2b_consultation', page: '/' })}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-black text-white hover:bg-white/10"
                    >
                      {copy.b2bSecondary}
                    </Link>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section className="px-4 py-8 sm:px-6 sm:py-12">
            <div className="mx-auto grid max-w-7xl gap-4 rounded-[2rem] bg-[#1c3450] p-6 text-white shadow-[0_24px_90px_rgba(28,52,80,0.18)] sm:grid-cols-4 sm:p-8">
              {copy.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-5">
                  <div className="text-3xl font-black">{stat.value}</div>
                  <div className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="text-sm font-black uppercase tracking-[0.24em] text-[#175c7d]">{copy.pillarsTitle}</p>
                <h2 className="mt-3 text-4xl font-black tracking-tight text-[#1c3450]">{copy.pillarsTitle}</h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">{copy.pillarsText}</p>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {copy.pillarCards.map((card) => (
                  <article key={card.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="inline-flex rounded-2xl bg-[#eef7fb] p-3 text-[#175c7d]">
                      {card.to.includes('outsourcing') ? <Building2 size={22} /> : card.to.includes('alternance') ? <TrendingUp size={22} /> : <BookOpen size={22} />}
                    </div>
                    <h3 className="mt-5 text-2xl font-black text-[#1c3450]">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{card.body}</p>
                    <Link to={card.to} className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#175c7d]">
                      {card.cta}
                      <ArrowRight size={15} />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-16 sm:px-6">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm font-black uppercase tracking-[0.24em] text-[#175c7d]">{copy.marketTitle}</p>
                <h2 className="mt-3 text-4xl font-black tracking-tight text-[#1c3450]">{copy.marketTitle}</h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">{copy.marketText}</p>
                <div className="mt-6 space-y-4">
                  {copy.marketBlocks.map((block) => (
                    <div key={block.title} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">
                      <h3 className="text-lg font-black text-[#1c3450]">{block.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{block.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] bg-[linear-gradient(135deg,#175c7d_0%,#1c3450_100%)] p-7 text-white shadow-[0_20px_80px_rgba(28,52,80,0.16)]">
                <p className="text-sm font-black uppercase tracking-[0.24em] text-[#b7e5f3]">{copy.blogTitle}</p>
                <h2 className="mt-3 text-4xl font-black tracking-tight">{copy.blogTitle}</h2>
                <p className="mt-4 text-lg leading-8 text-slate-100">{copy.blogText}</p>
                <div className="mt-6 grid gap-4">
                  {copy.blogItems.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                      <div className="flex items-start gap-3">
                        <Search className="mt-1 text-[#8bd6ee]" size={17} />
                        <span className="text-sm font-semibold">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/blog" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-[#1c3450] hover:bg-slate-100">
                  {copy.blogPrimary}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>

          <section className="px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
              <div className="max-w-3xl">
                <p className="text-sm font-black uppercase tracking-[0.24em] text-[#175c7d]">{copy.socialProofTitle}</p>
                <h2 className="mt-3 text-4xl font-black tracking-tight text-[#1c3450]">{copy.socialProofTitle}</h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">{copy.socialProofText}</p>
              </div>
              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {testimonials.slice(0, 3).map((testimonial) => (
                  <blockquote key={testimonial.name} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
                    <div className="flex items-center gap-2 text-[#175c7d]">
                      <Users size={16} />
                      <span className="text-xs font-black uppercase tracking-[0.2em]">Proof</span>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-700">"{testimonial.text}"</p>
                    <footer className="mt-5">
                      <div className="font-black text-[#1c3450]">{testimonial.name}</div>
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{testimonial.role}</div>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 pb-28 pt-8 sm:px-6">
            <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-[linear-gradient(135deg,#1c3450_0%,#175c7d_55%,#39a0c8_100%)] px-7 py-10 text-white shadow-[0_30px_110px_rgba(28,52,80,0.22)] sm:px-10 sm:py-14">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#d7f2fb]">
                    <Globe2 size={14} />
                    EduGrowth Lead Engine
                  </div>
                  <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">{copy.finalTitle}</h2>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-100">{copy.finalText}</p>
                </div>

                <div className="grid gap-3">
                  <a
                    href={buildApplyUrl('homepage_final_apply', lang)}
                    onClick={() => trackEvent('cta_click', { cta_type: 'homepage_final_apply', page: '/' })}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-[#1c3450] hover:bg-slate-100"
                  >
                    <GraduationCap size={18} />
                    {copy.finalPrimary}
                  </a>
                  <Link
                    to="/book-consultation"
                    onClick={() => trackEvent('cta_click', { cta_type: 'homepage_final_consultation', page: '/' })}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-black text-white hover:bg-white/15"
                  >
                    <PhoneCall size={18} />
                    {copy.finalSecondary}
                  </Link>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('cta_click', { cta_type: 'homepage_final_whatsapp', page: '/' })}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200/30 bg-emerald-400/10 px-6 py-4 text-sm font-black text-white hover:bg-emerald-400/20"
                  >
                    <MessageCircle size={18} />
                    {copy.finalWhatsApp}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <PortalSelector
        isOpen={isPortalOpen}
        onClose={handleClosePortal}
        onSelect={handleSelectPortal}
        onToggleLanguage={toggleLanguage}
        translations={translations}
        lang={lang}
      />
    </>
  );
}
