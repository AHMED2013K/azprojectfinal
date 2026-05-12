import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileCheck2,
  GraduationCap,
  HeartHandshake,
  Home,
  Languages,
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';
import { studentAbroadTestimonials } from '../components/TestimonialsData.js';
import { trackEvent } from '../utils/tracking';

const WA_NUMBER = '21656590703';

function buildEligibilityUrl(source, lang) {
  const params = new URLSearchParams({
    utm_source: 'website',
    utm_medium: 'student_homepage',
    utm_campaign: source,
    utm_content: lang,
  });

  return `https://app.edugrowth.tn/apply?${params.toString()}`;
}

const destinations = [
  {
    name: 'France',
    path: '/etudier-en-france-depuis-tunisie',
    focus: 'Campus France, master, alternance',
    timing: '8 a 10 mois avant la rentree',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Allemagne',
    path: '/etudier-en-allemagne-depuis-tunisie',
    focus: 'Ausbildung, etudes, compte bloque',
    timing: 'Preparation linguistique conseillee',
    image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Canada',
    path: '/etudier-au-canada-depuis-tunisie',
    focus: 'Admission, budget, permis d’etudes',
    timing: 'Dossier a anticiper tot',
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Chypre du Nord',
    path: '/study-in-north-cyprus',
    focus: 'Budget accessible, admission rapide',
    timing: 'Rentrees flexibles selon programme',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Turquie',
    path: '/etudier-en-turquie-depuis-tunisie',
    focus: 'Universites privees, bourses',
    timing: 'Bon choix pour profils varies',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Dubai',
    path: '/etudier-a-dubai-depuis-tunisie',
    focus: 'Programmes internationaux, business',
    timing: 'Admissions selon calendrier ecole',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80',
  },
];

const copy = {
  fr: {
    seoTitle: "EduGrowth Tunisie | Etudier a l'etranger depuis la Tunisie",
    seoDescription:
      "EduGrowth accompagne les etudiants tunisiens dans leur projet d'etudes a l'etranger : orientation, admission, Campus France, visa, logement et alternance.",
    navDestinations: 'Destinations',
    navServices: 'Services',
    navAlternance: 'Alternance France',
    navTestimonials: 'Temoignages',
    navGuides: 'Guides',
    navContact: 'Contact',
    navPartners: 'Espace partenaires',
    primaryCta: 'Tester mon eligibilite gratuitement',
    whatsappCta: 'Parler a un conseiller',
    badge: 'Accompagnement etudiant depuis la Tunisie',
    heroTitle: "Etudier a l'etranger depuis la Tunisie avec un accompagnement fiable de A a Z",
    heroText:
      "EduGrowth aide les etudiants tunisiens et leurs familles a choisir la bonne destination, preparer un dossier solide, obtenir une admission et avancer sereinement vers le visa et le depart.",
    heroProof: ['Diagnostic gratuit', 'Conseillers en Tunisie', 'Suivi en francais, arabe et anglais'],
    trustTitle: 'Un accompagnement pense pour les etudiants et les parents',
    trustItems: [
      { value: 'Profil', label: 'Analyse du niveau, du budget et de l’objectif' },
      { value: 'Pays', label: 'Destination recommandee selon votre situation' },
      { value: 'Dossier', label: 'Documents, admission, motivation et calendrier' },
      { value: 'Depart', label: 'Visa, logement et preparation pratique' },
    ],
    problemTitle: "Etudier a l'etranger devient vite complique quand on est seul",
    problemText:
      "Entre le choix du pays, le budget, les documents, les delais, Campus France, le visa et les attentes de la famille, une erreur peut ralentir tout le projet.",
    problems: [
      'Je ne sais pas quel pays correspond a mon profil',
      'Mon budget est limite et je veux eviter les mauvais choix',
      'J’ai peur du refus visa ou d’un dossier incomplet',
      'Je veux comprendre les etapes avant d’engager ma famille',
    ],
    methodTitle: 'Une methode claire pour construire un dossier solide',
    methodText: 'Chaque projet commence par une analyse simple, puis avance avec un plan concret et des etapes suivies.',
    steps: [
      { title: 'Diagnostic gratuit', text: 'Nous analysons votre niveau, votre budget, votre objectif et vos contraintes.' },
      { title: 'Plan de destination', text: 'Vous recevez une orientation claire vers les pays et programmes les plus realistes.' },
      { title: 'Preparation du dossier', text: 'Nous vous aidons a organiser documents, candidature, motivation et calendrier.' },
      { title: 'Suivi jusqu’au depart', text: 'L’equipe vous accompagne sur admission, visa, logement et prochaines etapes.' },
    ],
    destinationsTitle: 'Choisissez la destination qui correspond a votre projet',
    destinationsText: 'Comparez les options les plus demandees par les etudiants tunisiens et commencez par le guide adapte.',
    destinationCta: 'Voir le guide',
    servicesTitle: 'Ce que nous faisons pour votre projet',
    servicesText: 'Un accompagnement concret, humain et structure pour eviter les erreurs et avancer plus vite.',
    services: [
      'Orientation destination',
      'Admission universite ou ecole',
      'Campus France',
      'Preparation visa',
      'Alternance France',
      'Recherche logement',
      'Preparation entretien',
      'Suivi parents et famille',
    ],
    alternanceTitle: 'Vous visez une alternance en France ?',
    alternanceText:
      'Nous aidons les profils motives a comprendre les conditions, preparer leur CV, organiser les candidatures et se presenter avec plus de clarte aux entreprises.',
    alternanceCta: 'Verifier mon profil alternance',
    proofTitle: 'Des parcours etudiants plus clairs, etapes par etapes',
    proofText:
      'Les meilleurs signaux de confiance restent les resultats reels : admissions, dossiers prepares, destinations choisies et familles rassurees.',
    parentsTitle: 'Un accompagnement qui rassure aussi les parents',
    parentsText:
      'Nous expliquons les couts, les delais, les risques et les etapes administratives avec des mots simples pour aider la famille a prendre une decision informee.',
    parentPoints: ['Budget realiste', 'Etapes administratives', 'Risques visa expliques', 'Logement et depart'],
    faqTitle: 'Questions frequentes',
    faqs: [
      {
        q: 'Quel pays choisir selon mon budget ?',
        a: 'Le diagnostic permet de comparer les destinations selon votre niveau, votre budget, votre langue et votre objectif professionnel.',
      },
      {
        q: 'Quand commencer mon dossier ?',
        a: 'Pour la France et le Canada, il vaut mieux anticiper plusieurs mois avant la rentree. Plus le dossier commence tot, plus les choix restent ouverts.',
      },
      {
        q: 'Est-ce que vous garantissez le visa ?',
        a: 'Non. Aucun acteur serieux ne peut garantir un visa. Notre role est de vous aider a preparer un dossier clair, coherent et complet.',
      },
      {
        q: 'Mes parents peuvent-ils participer ?',
        a: 'Oui. Les parents peuvent participer a l’echange pour comprendre le budget, les delais et les risques avant de decider.',
      },
    ],
    finalTitle: 'Vous ne savez pas par ou commencer ?',
    finalText:
      'Faites analyser votre profil gratuitement et recevez une premiere orientation claire selon votre niveau, votre budget et votre objectif.',
    footerText: "EduGrowth accompagne les etudiants tunisiens dans leurs projets d'etudes internationales.",
    whatsappText: "Bonjour EduGrowth, je veux tester mon eligibilite pour etudier a l'etranger.",
  },
  en: {
    seoTitle: 'EduGrowth Tunisia | Study Abroad Guidance from Tunisia',
    seoDescription:
      'EduGrowth helps Tunisian students study abroad with guidance for destination choice, admissions, visa preparation, housing, and work-study programs.',
    navDestinations: 'Destinations',
    navServices: 'Services',
    navAlternance: 'Work-study France',
    navTestimonials: 'Stories',
    navGuides: 'Guides',
    navContact: 'Contact',
    navPartners: 'Partner area',
    primaryCta: 'Check my eligibility for free',
    whatsappCta: 'Talk to an advisor',
    badge: 'Student guidance from Tunisia',
    heroTitle: 'Study abroad from Tunisia with reliable guidance from start to finish',
    heroText:
      'EduGrowth helps Tunisian students and families choose the right destination, prepare a strong application, secure admission, and move toward visa and departure with clarity.',
    heroProof: ['Free diagnosis', 'Tunisia-based advisors', 'French, Arabic, and English support'],
    trustTitle: 'Guidance designed for students and parents',
    trustItems: [
      { value: 'Profile', label: 'Level, budget, and objective analysis' },
      { value: 'Country', label: 'Destination advice based on your situation' },
      { value: 'File', label: 'Documents, admission, motivation, and timeline' },
      { value: 'Departure', label: 'Visa, housing, and practical preparation' },
    ],
    problemTitle: 'Studying abroad becomes confusing when you are alone',
    problemText:
      'Choosing a country, understanding costs, preparing documents, respecting deadlines, handling visa steps, and reassuring your family all matter.',
    problems: [
      'I do not know which country matches my profile',
      'My budget is limited and I want to avoid bad choices',
      'I am worried about visa refusal or missing documents',
      'I want to understand the steps before involving my family',
    ],
    methodTitle: 'A clear method to build a stronger application',
    methodText: 'Every project starts with a simple analysis, then moves forward with a practical plan and guided steps.',
    steps: [
      { title: 'Free diagnosis', text: 'We review your level, budget, goal, and constraints.' },
      { title: 'Destination plan', text: 'You get clear guidance on the most realistic countries and programs.' },
      { title: 'Application preparation', text: 'We help structure documents, applications, motivation, and timeline.' },
      { title: 'Support until departure', text: 'The team supports admission, visa, housing, and next steps.' },
    ],
    destinationsTitle: 'Choose the destination that fits your project',
    destinationsText: 'Compare popular options for Tunisian students and start with the guide that matches your goal.',
    destinationCta: 'View guide',
    servicesTitle: 'What we do for your project',
    servicesText: 'Concrete, human, structured support to avoid mistakes and move faster.',
    services: [
      'Destination guidance',
      'University or school admission',
      'Campus France',
      'Visa preparation',
      'Work-study France',
      'Housing search',
      'Interview preparation',
      'Family follow-up',
    ],
    alternanceTitle: 'Targeting a work-study program in France?',
    alternanceText:
      'We help motivated students understand requirements, prepare their CV, organize applications, and present themselves more clearly to companies.',
    alternanceCta: 'Check my work-study profile',
    proofTitle: 'Clearer student journeys, step by step',
    proofText:
      'The best trust signals are real outcomes: admissions, prepared files, selected destinations, and reassured families.',
    parentsTitle: 'Guidance that reassures parents too',
    parentsText:
      'We explain costs, timelines, risks, and administrative steps in simple terms so families can make informed decisions.',
    parentPoints: ['Realistic budget', 'Administrative steps', 'Visa risks explained', 'Housing and departure'],
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'Which country should I choose based on my budget?',
        a: 'The diagnosis compares destinations based on your level, budget, language, and career objective.',
      },
      {
        q: 'When should I start my application?',
        a: 'For France and Canada, it is better to start several months before intake. The earlier you start, the more options you keep.',
      },
      {
        q: 'Do you guarantee the visa?',
        a: 'No. No serious advisor can guarantee a visa. Our role is to help you prepare a clear, coherent, and complete file.',
      },
      {
        q: 'Can my parents join the consultation?',
        a: 'Yes. Parents can join to understand costs, timelines, and risks before making a decision.',
      },
    ],
    finalTitle: 'Not sure where to start?',
    finalText: 'Get your profile reviewed for free and receive first guidance based on your level, budget, and objective.',
    footerText: 'EduGrowth guides Tunisian students through international study projects.',
    whatsappText: 'Hello EduGrowth, I want to check my eligibility to study abroad.',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'EduGrowth Tunisia',
      url: 'https://edugrowth.tn/',
      logo: 'https://edugrowth.tn/Submark.png',
      telephone: '+21656590703',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+21656590703',
        contactType: 'student guidance',
        availableLanguage: ['French', 'Arabic', 'English'],
        areaServed: 'TN',
      },
    },
    {
      '@type': 'Service',
      name: 'Study Abroad Guidance from Tunisia',
      serviceType: 'International student guidance',
      provider: { '@type': 'Organization', name: 'EduGrowth Tunisia' },
      areaServed: ['Tunisia', 'France', 'Germany', 'Canada', 'Turkey', 'Cyprus', 'United Arab Emirates'],
      availableLanguage: ['French', 'Arabic', 'English'],
      description:
        'Guidance for Tunisian students choosing a destination, preparing admissions, visa steps, housing, and work-study projects abroad.',
    },
  ],
};

export default function StudentHomePage() {
  const { lang, toggleLanguage } = useLanguage();
  const t = copy[lang] || copy.en;
  const eligibilityUrl = buildEligibilityUrl('eligibility_homepage', lang);
  const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.whatsappText)}`;

  const handleCta = (ctaType) => {
    trackEvent('cta_click', { cta_type: ctaType, page: '/' });
  };

  return (
    <>
      <SEOHelmet
        title={t.seoTitle}
        description={t.seoDescription}
        canonical="https://edugrowth.tn/"
        lang={lang}
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-[#f7fafc] text-slate-900">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Link to="/" className="flex items-center gap-3">
              <img src="/Submark.webp" alt="EduGrowth Tunisia" className="h-11 w-11 rounded-xl object-contain ring-1 ring-slate-200" />
              <div className="leading-tight">
                <div className="text-lg font-black text-[#17324d]">EduGrowth</div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#176b87]">Study Abroad Tunisia</div>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 text-sm font-bold text-slate-600 lg:flex">
              <a href="#destinations" className="hover:text-[#176b87]">{t.navDestinations}</a>
              <a href="#services" className="hover:text-[#176b87]">{t.navServices}</a>
              <Link to="/programmes/alternance-france" className="hover:text-[#176b87]">{t.navAlternance}</Link>
              <a href="#stories" className="hover:text-[#176b87]">{t.navTestimonials}</a>
              <Link to="/blog" className="hover:text-[#176b87]">{t.navGuides}</Link>
              <a href="#contact" className="hover:text-[#176b87]">{t.navContact}</a>
            </nav>

            <div className="flex items-center gap-2">
              <LanguageSwitch lang={lang} onToggle={toggleLanguage} className="hidden border-slate-200 bg-white sm:inline-flex" />
              <a
                href={eligibilityUrl}
                onClick={() => handleCta('homepage_header_eligibility')}
                className="inline-flex items-center justify-center rounded-full bg-[#17324d] px-4 py-3 text-xs font-black text-white shadow-lg shadow-slate-900/10 transition hover:bg-[#10263b] sm:px-5 sm:text-sm"
              >
                {t.primaryCta}
              </a>
            </div>
          </div>
        </header>

        <main>
          <section className="relative overflow-hidden bg-white">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#176b87]/20 bg-[#eef8fb] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#176b87]">
                  <GraduationCap size={15} />
                  {t.badge}
                </div>
                <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-tight text-[#17324d] sm:text-6xl">
                  {t.heroTitle}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-650 sm:text-xl">
                  {t.heroText}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={eligibilityUrl}
                    onClick={() => handleCta('homepage_hero_eligibility')}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17324d] px-7 py-4 text-sm font-black text-white shadow-xl shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-[#10263b]"
                  >
                    <FileCheck2 size={18} />
                    {t.primaryCta}
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleCta('homepage_hero_whatsapp')}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-7 py-4 text-sm font-black text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-100"
                  >
                    <MessageCircle size={18} />
                    {t.whatsappCta}
                  </a>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {t.heroProof.map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                      <CheckCircle2 size={17} className="text-[#176b87]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="overflow-hidden rounded-[1.75rem] bg-slate-100 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200">
                  <img
                    src="/abroad.webp"
                    alt="Accompagnement etudiant EduGrowth"
                    className="h-[420px] w-full object-cover sm:h-[520px]"
                    width="640"
                    height="520"
                  />
                </div>
                <div className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:left-8 sm:right-8">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-1 text-[#176b87]" size={22} />
                    <div>
                      <div className="font-black text-[#17324d]">{t.trustTitle}</div>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        France, Allemagne, Canada, Chypre, Turquie, Dubai et autres destinations selon profil.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 py-16 sm:px-6">
            <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
              {t.trustItems.map((item) => (
                <div key={item.value} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-2xl font-black text-[#176b87]">{item.value}</div>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-[#17324d] px-4 py-16 text-white sm:px-6">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Realite du projet</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">{t.problemTitle}</h2>
                <p className="mt-5 text-lg leading-8 text-slate-200">{t.problemText}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {t.problems.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/8 p-5">
                    <div className="flex items-start gap-3">
                      <BadgeCheck size={18} className="mt-1 text-cyan-200" />
                      <p className="text-sm font-semibold leading-6 text-slate-100">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#176b87]">Methode EduGrowth</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#17324d] sm:text-5xl">{t.methodTitle}</h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">{t.methodText}</p>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {t.steps.map((step, index) => (
                  <article key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef8fb] text-lg font-black text-[#176b87]">
                      {index + 1}
                    </div>
                    <h3 className="mt-5 text-xl font-black text-[#17324d]">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="destinations" className="bg-white px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div className="max-w-3xl">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-[#176b87]">Destinations</p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-[#17324d] sm:text-5xl">{t.destinationsTitle}</h2>
                  <p className="mt-4 text-lg leading-8 text-slate-600">{t.destinationsText}</p>
                </div>
                <a href={eligibilityUrl} onClick={() => handleCta('homepage_destinations_eligibility')} className="inline-flex items-center gap-2 text-sm font-black text-[#176b87]">
                  {t.primaryCta}
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {destinations.map((destination) => (
                  <Link key={destination.name} to={destination.path} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-52 overflow-hidden">
                      <img src={destination.image} alt={destination.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 to-transparent" />
                      <h3 className="absolute bottom-5 left-5 text-3xl font-black text-white">{destination.name}</h3>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                        <BookOpen size={17} className="mt-0.5 text-[#176b87]" />
                        <span>{destination.focus}</span>
                      </div>
                      <div className="mt-3 flex items-start gap-3 text-sm font-semibold text-slate-700">
                        <Clock size={17} className="mt-0.5 text-[#176b87]" />
                        <span>{destination.timing}</span>
                      </div>
                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#176b87]">
                        {t.destinationCta}
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="services" className="px-4 py-20 sm:px-6">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#176b87]">Services</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#17324d] sm:text-5xl">{t.servicesTitle}</h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">{t.servicesText}</p>
                <a href={eligibilityUrl} onClick={() => handleCta('homepage_services_eligibility')} className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#17324d] px-6 py-4 text-sm font-black text-white hover:bg-[#10263b]">
                  {t.primaryCta}
                  <ArrowRight size={16} />
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {t.services.map((service) => (
                  <div key={service} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 size={19} className="mt-1 text-[#176b87]" />
                      <p className="font-bold text-slate-800">{service}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#eaf6f8] px-4 py-20 sm:px-6">
            <div className="mx-auto grid max-w-7xl gap-8 rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#176b87]">Focus programme</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#17324d] sm:text-5xl">{t.alternanceTitle}</h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">{t.alternanceText}</p>
              </div>
              <div className="grid gap-3">
                <Link to="/programmes/alternance-france" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17324d] px-6 py-4 text-sm font-black text-white hover:bg-[#10263b]">
                  {t.alternanceCta}
                  <ArrowRight size={16} />
                </Link>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleCta('homepage_alternance_whatsapp')} className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm font-black text-emerald-700 hover:bg-emerald-100">
                  <MessageCircle size={17} />
                  {t.whatsappCta}
                </a>
              </div>
            </div>
          </section>

          <section id="stories" className="bg-white px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#176b87]">Confiance</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#17324d] sm:text-5xl">{t.proofTitle}</h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">{t.proofText}</p>
              </div>
              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {studentAbroadTestimonials.slice(0, 3).map((story) => (
                  <blockquote key={story.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(story.rating || 5)].map((_, index) => (
                        <Star key={index} size={16} className="fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-700">"{story.content}"</p>
                    <footer className="mt-5 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl ring-1 ring-slate-200">{story.avatar}</div>
                      <div>
                        <div className="font-black text-[#17324d]">{story.name}</div>
                        <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{story.program} - {story.destination}</div>
                      </div>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-6">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="rounded-[1.75rem] bg-[#17324d] p-8 text-white shadow-xl shadow-slate-900/10">
                <Users size={34} className="text-cyan-200" />
                <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">{t.parentsTitle}</h2>
                <p className="mt-5 text-lg leading-8 text-slate-200">{t.parentsText}</p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleCta('homepage_parents_whatsapp')} className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-[#17324d] hover:bg-slate-100">
                  <PhoneCall size={17} />
                  {t.whatsappCta}
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {t.parentPoints.map((point) => (
                  <div key={point} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <HeartHandshake size={24} className="text-[#176b87]" />
                    <p className="mt-4 font-black text-[#17324d]">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-4xl">
              <p className="text-center text-sm font-black uppercase tracking-[0.2em] text-[#176b87]">FAQ</p>
              <h2 className="mt-3 text-center text-3xl font-black tracking-tight text-[#17324d] sm:text-5xl">{t.faqTitle}</h2>
              <div className="mt-10 space-y-4">
                {t.faqs.map((faq) => (
                  <details key={faq.q} className="group rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <summary className="cursor-pointer list-none font-black text-[#17324d]">
                      <span className="inline-flex w-full items-center justify-between gap-4">
                        {faq.q}
                        <ChevronRight size={18} className="transition group-open:rotate-90" />
                      </span>
                    </summary>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-6xl rounded-[2rem] bg-[#17324d] p-8 text-white shadow-2xl shadow-slate-900/10 sm:p-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Prochaine etape</p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">{t.finalTitle}</h2>
                  <p className="mt-5 text-lg leading-8 text-slate-200">{t.finalText}</p>
                </div>
                <div className="grid gap-3">
                  <a href={eligibilityUrl} onClick={() => handleCta('homepage_final_eligibility')} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-[#17324d] hover:bg-slate-100">
                    <FileCheck2 size={18} />
                    {t.primaryCta}
                  </a>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => handleCta('homepage_final_whatsapp')} className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200/30 bg-emerald-400/10 px-6 py-4 text-sm font-black text-white hover:bg-emerald-400/20">
                    <MessageCircle size={18} />
                    {t.whatsappCta}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div>
              <div className="flex items-center gap-3">
                <img src="/Submark.webp" alt="EduGrowth" className="h-10 w-10 rounded-xl ring-1 ring-slate-200" />
                <div className="font-black text-[#17324d]">EduGrowth</div>
              </div>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">{t.footerText}</p>
            </div>
            <div className="space-y-3 text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-2"><MapPin size={16} /> Tunisia</div>
              <div className="flex items-center gap-2"><MessageCircle size={16} /> +216 56 59 07 03</div>
              <div className="flex items-center gap-2"><Languages size={16} /> FR / AR / EN</div>
            </div>
            <div className="space-y-3 text-sm font-semibold text-slate-600">
              <Link to="/book-consultation" className="block hover:text-[#176b87]"><CalendarDays size={16} className="mr-2 inline" /> Consultation</Link>
              <Link to="/outsourcing" className="block hover:text-[#176b87]"><Building2 size={16} className="mr-2 inline" /> {t.navPartners}</Link>
              <Link to="/abroad-zone" className="block hover:text-[#176b87]"><Home size={16} className="mr-2 inline" /> Abroad Zone by EduGrowth</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
