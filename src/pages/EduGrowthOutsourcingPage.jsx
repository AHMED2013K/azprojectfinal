import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle2, BarChart3, Users, Globe2, ShieldCheck, LayoutDashboard, Mail, Phone, Home as HomeIcon, Clock, MessageSquare } from 'lucide-react';
import { b2bOutsourcingTestimonials } from '../components/TestimonialsData.js';
import SEOHelmet from '../components/SEOHelmet';
import { trackEvent } from '../utils/tracking';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

function buildB2BMessage(source, lang) {
  return lang === 'fr'
    ? `Bonjour EduGrowth, je souhaite auditer mon acquisition B2B et tester un sprint IA/automatisation. Source: ${source}`
    : `Hello EduGrowth, I want to audit my B2B acquisition and test an AI/automation sprint. Source: ${source}`;
}

const translations = {
  en: {
    heroBadge: "AI GROWTH ENGINEERING FOR EDUCATION & B2B",
    heroTitle: "Scale admissions and prospecting",
    heroTitleSpan: "with AI-powered automation.",
    heroDesc: "We deploy ultra-targeted lead qualification and B2B prospecting systems. Faster than manual teams, lighter than a classic agency, and aligned with performance.",
    heroCTA: "Audit My Pipeline",
    stat1: "Automated Workflows",
    stat2: "Lower Fixed Cost",
    stat3: "LinkedIn + CRM",
    stat4: "Fast Sprint Launch",
    serviceTitle: "AI Growth",
    serviceTitleSpan: "Infrastructure",
    serviceDesc: "We build agile acquisition systems that combine data scraping, LinkedIn outreach, CRM enrichment, AI qualification, and expert supervision.",
    s1Title: "Smart Data Scraping",
    s1Desc: "We build targeted lead lists from LinkedIn, directories, school databases, and niche B2B sources with clean enrichment rules.",
    s2Title: "LinkedIn Prospecting Engine",
    s2Desc: "Connection, messaging, follow-up, and segmentation workflows built to start conversations without burning your brand.",
    s3Title: "AI Lead Qualification",
    s3Desc: "AI-assisted scoring, intent tags, fit analysis, and CRM routing so your team spends time only on qualified opportunities.",
    s4Title: "Admissions Funnel Automation",
    s4Desc: "Automated WhatsApp, email, and CRM sequences for student profiles, documents, reminders, and follow-up priority.",
    s5Title: "CRM Ops & Reporting",
    s5Desc: "HubSpot, Zoho, Airtable, Sheets, Notion, and custom dashboards with weekly KPI reporting and pipeline hygiene.",
    s6Title: "Growth Engineering Sprint",
    s6Desc: "We test hooks, audiences, lead magnets, workflows, and conversion scripts in short cycles focused on ROI.",
    pricingTitle: "Performance Sprint Models",
    pricingFixed: "Pilot Sprint",
    pricingHybrid: "Pay-per-Qualified Lead",
    perfModelTitle: "Pay when the pipeline moves",
    perfModelDesc: "Start with a low-risk sprint, then scale through a hybrid model based on qualified conversations, booked calls, or verified student profiles.",
    savingsTitle: "Classic agency vs AI-assisted growth system",
    savingsLabel1: "Classic agency / hiring stack",
    savingsLabel2: "EduGrowth AI sprint",
    footerText: "EduGrowth builds AI-assisted acquisition infrastructure for education companies, admissions teams, and B2B operators.",
  },
  fr: {
    heroBadge: "GROWTH ENGINEERING IA POUR EDUCATION & B2B",
    heroTitle: "Scalez vos admissions et votre prospection",
    heroTitleSpan: "grâce à l'IA et l'automatisation intelligente.",
    heroDesc: "Nous déployons des systèmes de qualification de leads et de prospection B2B ultra-ciblés. Plus rapide que l'humain, sans les coûts d'une agence classique. Payez au résultat.",
    heroCTA: 'Auditer mon pipeline',
    stat1: 'Workflows automatisés',
    stat2: 'Coûts fixes réduits',
    stat3: 'LinkedIn + CRM',
    stat4: 'Sprint rapide',
    serviceTitle: 'Infrastructure',
    serviceTitleSpan: 'Growth IA',
    serviceDesc: "Nous construisons des systèmes d'acquisition agiles qui combinent scraping de données, prospection LinkedIn, enrichissement CRM, qualification IA et supervision experte.",
    s1Title: 'Scraping & enrichissement data',
    s1Desc: 'Listes de prospects ciblées depuis LinkedIn, annuaires, bases écoles et sources B2B de niche, avec règles de nettoyage et scoring.',
    s2Title: 'Prospection LinkedIn intelligente',
    s2Desc: 'Connexions, messages, relances et segmentation automatisées pour créer des conversations sans abîmer votre marque.',
    s3Title: 'Qualification CRM par IA',
    s3Desc: 'Scoring assisté par IA, tags d’intention, analyse du fit et routage CRM pour prioriser les meilleurs profils.',
    s4Title: 'Automatisation funnel admissions',
    s4Desc: 'Séquences WhatsApp, email et CRM pour profils étudiants, documents, relances, rappels et priorisation commerciale.',
    s5Title: 'CRM Ops & reporting',
    s5Desc: 'HubSpot, Zoho, Airtable, Sheets, Notion et dashboards avec reporting KPI hebdomadaire et hygiène pipeline.',
    s6Title: 'Sprint Growth Engineering',
    s6Desc: 'Tests rapides des audiences, messages, lead magnets, workflows et scripts de conversion avec logique ROI.',
    pricingTitle: 'Modèles sprint & performance',
    pricingFixed: 'Sprint pilote',
    pricingHybrid: 'Coût par lead qualifié',
    perfModelTitle: "Payez quand le pipeline avance",
    perfModelDesc: 'Démarrez avec un sprint à risque limité, puis scalez sur un modèle hybride basé sur conversations qualifiées, rendez-vous bookés ou profils étudiants vérifiés.',
    savingsTitle: 'Agence classique vs système growth assisté par IA',
    savingsLabel1: "Agence classique / recrutement",
    savingsLabel2: 'Sprint IA EduGrowth',
    footerText: "EduGrowth construit des infrastructures d'acquisition assistées par IA pour les acteurs de l'éducation, admissions teams et opérateurs B2B.",
  },
};

const ServiceCard = ({ icon, title, description }) => (
  <div className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
    <div className="w-14 h-14 bg-blue-50 text-[#005A9C] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#005A9C] group-hover:text-white transition-all duration-300">
      {icon ? React.createElement(icon, { size: 28 }) : null}
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-800 tracking-tight">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
  </div>
);

const PricingCard = ({ title, price, system, leads, sla, isFeatured, hybridPrice, isHybrid, onSelect }) => (
  <div className={`relative p-10 rounded-[2.5rem] border transition-all duration-500 ${isFeatured ? 'border-[#2E8B57] shadow-2xl bg-white scale-105 z-10' : 'border-gray-200 bg-white/50'}`}>
    {isFeatured && <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#2E8B57] text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">Recommended</div>}
    <h3 className="text-xl font-bold mb-2 uppercase text-gray-900">{title}</h3>
    <div className="mb-8 text-5xl font-black tracking-tighter text-gray-900">{isHybrid ? (hybridPrice || 'Custom') : price}<span className="text-sm font-medium text-gray-400">/mo</span></div>
    <div className="space-y-5 mb-10 text-sm font-medium text-gray-600">
      <div className="flex items-center gap-4"><div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center"><CheckCircle2 className="text-[#2E8B57] w-4 h-4" /></div><span><strong>{system}</strong></span></div>
      <div className="flex items-center gap-4"><div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center"><CheckCircle2 className="text-[#2E8B57] w-4 h-4" /></div><span><strong>{leads}</strong></span></div>
      <div className="flex items-center gap-4"><div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center"><Clock className="text-[#2E8B57] w-4 h-4" /></div><span>SLA: {sla}</span></div>
    </div>
    <button onClick={onSelect} className={`w-full py-5 rounded-2xl font-bold text-lg transition-all ${isFeatured ? 'bg-[#2E8B57] text-white hover:bg-[#256f45] shadow-xl shadow-green-100' : 'bg-gray-900 text-white hover:bg-black'}`}>
      Demander {title}
    </button>
  </div>
);

const outsourcingStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "AI Growth Engineering and Lead Qualification Systems",
      "serviceType": "AI-assisted B2B prospecting, CRM automation, and lead qualification",
      "provider": {
        "@type": "Organization",
        "name": "EduGrowth Tunisia",
        "url": "https://edugrowth.tn/"
      },
      "areaServed": ["Tunisia", "France", "United Kingdom", "United Arab Emirates", "Africa"],
      "availableLanguage": ["English", "French", "Arabic"],
      "description": "AI-assisted growth infrastructure for education companies and B2B teams: data scraping, LinkedIn prospecting, CRM enrichment, automated qualification, and expert supervision."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How fast can EduGrowth launch an AI-assisted growth sprint?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most pilot sprints can start within a few days after ICP definition, data-source validation, CRM access, and message approval."
          }
        },
        {
          "@type": "Question",
          "name": "Who is the sprint best for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Education companies, admissions teams, agencies, SaaS operators, and B2B teams that need qualified leads without building a full internal outbound team."
          }
        }
      ]
    }
  ]
};

const EduGrowthOutsourcingPage = () => {
  const { lang, toggleLanguage } = useLanguage();
  const [isHybrid, setIsHybrid] = useState(false);
  const t = translations[lang];

  const ui = lang === 'fr'
    ? {
        navServices: 'Services',
        navPricing: 'Tarifs',
        back: 'Retour au portail',
        consultation: 'Consultation gratuite',
        demo: 'Réserver une démo',
        consultationButton: 'Réserver une consultation gratuite',
        betterTitle: 'Mieux qu’une agence',
        betterTitleAccent: 'classique.',
        betterText:
          "Une agence facture du temps. Nous construisons un système mesurable: données ciblées, séquences, qualification IA, routage CRM et supervision humaine là où elle crée vraiment de la valeur.",
        auditBadge: 'Audit growth gratuit',
        auditTitle: 'Recevez votre plan de sprint IA',
        auditText:
          'Partagez votre cible, votre CRM et votre objectif. Nous vous envoyons un plan de prospection/qualification avec KPI, sources data et scénario de test.',
        auditPoints: ['1. ICP et sources de données prioritaires', '2. Séquences LinkedIn/email/WhatsApp à tester', '3. KPI: leads qualifiés, rendez-vous, coût par opportunité'],
        name: 'Nom complet',
        organization: "Nom de l'organisation",
        email: 'Email professionnel',
        volume: 'Objectif mensuel',
        less: 'Moins de 300',
        medium: '300 - 1000',
        more: 'Plus de 1000',
        need: 'Que voulez-vous automatiser ou qualifier en premier ?',
        submit: 'Demander mon sprint IA',
        roiTitle: 'Pourquoi ce modèle convertit mieux',
        roiText:
          "Vous ne payez pas une promesse de main-d'oeuvre. Vous payez un système d'acquisition qui trouve, enrichit, contacte, score et route les bonnes opportunités.",
        roiBlocks: [
          { title: 'ROI traçable', body: 'Coût par lead qualifié, taux de réponse, taux de rendez-vous et pipeline visible chaque semaine.' },
          { title: 'Automation + supervision', body: "L'IA exécute les tâches répétitives; un expert ajuste les audiences, messages, filtres et priorités." },
          { title: 'Stack léger', body: 'Pas de recrutement lourd: data, LinkedIn, CRM, scripts, scoring et reporting livrés en sprint.' },
        ],
        buyerTitle: 'Idéal pour',
        buyerItems: [
          'Écoles, universités privées et équipes admissions',
          "Agences d'éducation qui veulent plus de profils qualifiés",
          'Startups B2B, SaaS, services et équipes sales ops',
        ],
        roiStatsTitle: 'Projection ROI 12 mois',
        roiStats: [
          { label: 'Setup agence classique', value: '€3k - €8k/mois' },
          { label: 'Sprint pilote EduGrowth', value: 'dès €800' },
          { label: 'Délai de mise en route', value: '5 à 10 jours' },
        ],
        pilotBadge: 'Offre pilote - Juin 2026',
        pilotTitle: 'Sprint de Performance IA',
        pilotText: 'Un test court pour prouver le canal avant de scaler: ciblage, scraping, enrichissement, séquences, qualification et reporting.',
        pilotItems: ['1 ICP + 1 source data prioritaire', '100 à 300 prospects enrichis', 'Séquence LinkedIn/email prête à tester', 'Dashboard simple: réponses, leads qualifiés, next actions'],
        pilotPrice: 'À partir de €800 ou coût par lead qualifié',
        pilotCTA: 'Lancer le sprint pilote',
      }
    : {
        navServices: 'Services',
        navPricing: 'Pricing',
        back: 'Back to Portal',
        consultation: 'Free Consultation',
        demo: 'Book Demo',
        consultationButton: 'Book a Free Consultation',
        betterTitle: 'Better than',
        betterTitleAccent: 'a classic agency.',
        betterText:
          'Classic agencies sell hours. We build a measurable system: targeted data, sequences, AI qualification, CRM routing, and expert supervision where it matters.',
        auditBadge: 'Free Growth Audit',
        auditTitle: 'Get Your AI Sprint Plan',
        auditText:
          'Share your ICP, CRM, and growth target. We will send a prospecting and qualification plan with KPIs, data sources, and a test scenario.',
        auditPoints: ['1. ICP and priority data sources', '2. LinkedIn/email/WhatsApp sequences to test', '3. KPI: qualified leads, booked calls, cost per opportunity'],
        name: 'Full name',
        organization: 'Organization name',
        email: 'Work email',
        volume: 'Monthly objective',
        less: 'Less than 300',
        medium: '300 - 1000',
        more: 'More than 1000',
        need: 'What do you want to automate or qualify first?',
        submit: 'Request My AI Sprint',
        roiTitle: 'Why this model converts better',
        roiText:
          'You are not paying for headcount. You are paying for an acquisition system that finds, enriches, contacts, scores, and routes the right opportunities.',
        roiBlocks: [
          { title: 'Trackable ROI', body: 'Cost per qualified lead, reply rate, booked-call rate, and weekly visible pipeline.' },
          { title: 'Automation + supervision', body: 'AI handles repetitive tasks; a growth expert tunes audiences, messaging, filters, and priorities.' },
          { title: 'Lightweight stack', body: 'No heavy hiring: data, LinkedIn, CRM, scripts, scoring, and reporting delivered in a sprint.' },
        ],
        buyerTitle: 'Best fit for',
        buyerItems: [
          'Schools, private universities, and admissions teams',
          'Education agencies that need more qualified profiles',
          'B2B startups, SaaS, services, and sales ops teams',
        ],
        roiStatsTitle: '12-month ROI snapshot',
        roiStats: [
          { label: 'Classic agency setup', value: '€3k - €8k/mo' },
          { label: 'EduGrowth pilot sprint', value: 'from €800' },
          { label: 'Go-live timeline', value: '5 to 10 days' },
        ],
        pilotBadge: 'Pilot offer - June 2026',
        pilotTitle: 'AI Performance Sprint',
        pilotText: 'A short test to prove the channel before scaling: targeting, scraping, enrichment, sequences, qualification, and reporting.',
        pilotItems: ['1 ICP + 1 priority data source', '100 to 300 enriched prospects', 'LinkedIn/email sequence ready to test', 'Simple dashboard: replies, qualified leads, next actions'],
        pilotPrice: 'From €800 or pay-per-qualified-lead',
        pilotCTA: 'Launch the pilot sprint',
      };

  const openDemo = (source = 'outsourcing_page') => {
    // Modal or WA
    trackEvent('cta_click', { cta_type: 'outsourcing_demo_whatsapp', source });
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildB2BMessage(source, lang))}`, '_blank');
  };

  const handleLeadSubmit = (event) => {
    event.preventDefault();
    trackEvent('generate_lead', {
      lead_source: 'outsourcing_lead_form',
      page_location: '/outsourcing',
      value: 1,
      currency: 'USD',
    });
    const formData = new FormData(event.currentTarget);
    const message = [
      'New Outsourcing Consultation Lead',
      `Name: ${formData.get('name')}`,
      `Organization: ${formData.get('organization')}`,
      `Email: ${formData.get('email')}`,
      `Monthly Leads: ${formData.get('volume')}`,
      `Need: ${formData.get('need')}`
    ].join('\n');

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const b2bTestimonials = b2bOutsourcingTestimonials;

  return (
    <>
      <SEOHelmet 
        title="Growth IA Tunisie | Prospection B2B, CRM & Leads Qualifiés"
        description="EduGrowth déploie des systèmes IA de prospection B2B, scraping, qualification CRM et automatisation pour générer des leads qualifiés à la performance."
        canonical="https://edugrowth.tn/outsourcing"
        structuredData={outsourcingStructuredData}
        lang={lang}
      />
      <div className="min-h-screen bg-[#FDFDFF] font-sans text-gray-900 scroll-smooth">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-[#005A9C] rounded-xl flex items-center justify-center overflow-hidden shadow-sm group-hover:rotate-6">
              <img src="/Simplified logo ful.webp" alt="EduGrowth" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-none uppercase">EduGrowth</span>
              <span className="text-[10px] uppercase tracking-widest text-[#005A9C] font-black">AI Growth Systems</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-sm font-semibold text-gray-500">
            <a href="#services" className="hover:text-[#005A9C] uppercase">{ui.navServices}</a>
            <a href="#pricing" className="hover:text-[#005A9C] uppercase">{ui.navPricing}</a>
            <LanguageSwitch lang={lang} onToggle={toggleLanguage} />
            <Link to="/" className="flex items-center gap-2 hover:text-[#005A9C] border-l pl-8">
              <HomeIcon size={16} /> {ui.back}
            </Link>
            <Link to="/book-consultation" className="hover:text-[#005A9C] uppercase">
              {ui.consultation}
            </Link>
            <button onClick={openDemo} className="bg-[#005A9C] text-white px-6 py-2.5 rounded-xl shadow-md">
              {ui.demo}
            </button>
          </div>
        </nav>

        {/* Hero */}
        <header className="relative pt-32 pb-44 px-8 overflow-hidden text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30">
            <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full blur-[120px]" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-green-400 rounded-full blur-[120px]" />
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-100 shadow-sm text-[#005A9C] px-5 py-2.5 rounded-2xl text-sm font-black mb-10">
              <Zap size={18} fill="currentColor" /> {t.heroBadge}
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-none text-gray-900">
              {t.heroTitle} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005A9C] to-[#2E8B57]">{t.heroTitleSpan}</span>
            </h1>
            <p className="text-2xl text-gray-500 mb-14 max-w-3xl mx-auto font-medium leading-relaxed">{t.heroDesc}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button onClick={() => openDemo('hero_demo')} className="bg-[#005A9C] text-white px-10 py-6 rounded-[2rem] font-black text-xl shadow-xl hover:-translate-y-1 transition-all">
                {t.heroCTA}
              </button>
              <Link to="/book-consultation" onClick={() => trackEvent('cta_click', { cta_type: 'outsourcing_consultation_hero', page: '/outsourcing' })} className="rounded-[2rem] border-2 border-[#005A9C] px-10 py-6 text-xl font-black text-[#005A9C] transition hover:bg-blue-50">
                {ui.consultationButton}
              </Link>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section className="pb-32 px-8">
          <div className="max-w-6xl mx-auto bg-gray-900 rounded-[3rem] p-12 md:p-16 text-white grid grid-cols-2 lg:grid-cols-4 gap-12 shadow-2xl">
            {[
              { v: "AI", l: t.stat1 },
              { v: "-50%", l: t.stat2 },
              { v: "CRM", l: t.stat3 },
              { v: "5j", l: t.stat4 }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl font-black mb-2 tracking-tighter">{stat.v}</div>
                <div className="text-sm font-bold text-blue-400 uppercase tracking-widest">{stat.l}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-24 px-8">
          <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2.5rem] bg-white p-10 shadow-sm border border-slate-100">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#005A9C]">{ui.roiTitle}</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-gray-900">{ui.roiTitle}</h2>
              <p className="mt-4 text-lg leading-8 text-gray-500">{ui.roiText}</p>
              <div className="mt-8 space-y-4">
                {ui.roiBlocks.map((block) => (
                  <div key={block.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-gray-900">{block.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600">{block.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-[linear-gradient(135deg,#0f172a_0%,#1e3a5f_55%,#1b7e6d_100%)] p-10 text-white shadow-2xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-100">{ui.buyerTitle}</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight">{ui.buyerTitle}</h2>
              <div className="mt-6 space-y-4">
                {ui.buyerItems.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-semibold text-slate-100">
                    <CheckCircle2 size={18} className="mt-0.5 text-cyan-200" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-black">{ui.roiStatsTitle}</h3>
                <div className="mt-4 space-y-4">
                  {ui.roiStats.map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0">
                      <span className="text-sm text-slate-200">{item.label}</span>
                      <span className="text-base font-black text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => openDemo('roi_section')} className="mt-8 w-full rounded-2xl bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-[#0f172a] transition hover:bg-slate-100">
                {ui.demo}
              </button>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-32 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">{t.serviceTitle} <br /> <span className="text-[#005A9C]">{t.serviceTitleSpan}</span></h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed">{t.serviceDesc}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { icon: MessageSquare, title: t.s1Title, desc: t.s1Desc },
                { icon: BarChart3, title: t.s2Title, desc: t.s2Desc },
                { icon: ShieldCheck, title: t.s3Title, desc: t.s3Desc },
                { icon: Users, title: t.s4Title, desc: t.s4Desc },
                { icon: LayoutDashboard, title: t.s5Title, desc: t.s5Desc },
                { icon: Zap, title: t.s6Title, desc: t.s6Desc }
              ].map((s, i) => (
                <ServiceCard key={i} icon={s.icon} title={s.title} description={s.desc} />
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3 text-sm font-black text-[#005A9C]">
              <Link to="/education-outsourcing-tunisia">Education Outsourcing Tunisia</Link>
              <Link to="/student-recruitment-outsourcing">Student Recruitment Outsourcing</Link>
              <Link to="/externalisation-services-tunisie">Externalisation Services Tunisie</Link>
              <Link to="/blog">Outsourcing Blog</Link>
            </div>
          </div>
        </section>

        <section className="px-8 pb-32 bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 rounded-[2.5rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-10 shadow-sm lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-white">
                {ui.pilotBadge}
              </p>
              <h2 className="mt-6 text-4xl font-black uppercase tracking-tight text-slate-950">
                {ui.pilotTitle}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                {ui.pilotText}
              </p>
              <div className="mt-6 inline-flex rounded-2xl bg-white px-5 py-4 text-lg font-black text-emerald-700 shadow-sm ring-1 ring-emerald-100">
                {ui.pilotPrice}
              </div>
            </div>
            <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <div className="grid gap-4">
                {ui.pilotItems.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => openDemo('pilot_sprint')} className="mt-6 w-full rounded-2xl bg-[#005A9C] px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-blue-700">
                {ui.pilotCTA}
              </button>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-32 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-5xl font-black mb-12 uppercase tracking-tight">{t.pricingTitle}</h2>
            <div className="flex items-center justify-center gap-6 mb-16">
              <span className={`text-lg font-bold ${!isHybrid ? 'text-[#005A9C] scale-110' : 'text-gray-400'}`}>{t.pricingFixed}</span>
              <button onClick={() => setIsHybrid(!isHybrid)} className="w-20 h-10 rounded-full p-1.5 transition-all flex items-center" style={{ backgroundColor: isHybrid ? '#2E8B57' : '#005A9C' }}>
                <div className={`h-full aspect-square bg-white rounded-full transition-transform ${isHybrid ? 'translate-x-10' : ''}`} />
              </button>
              <span className={`text-lg font-bold ${isHybrid ? 'text-[#2E8B57] scale-110' : 'text-gray-400'}`}>{t.pricingHybrid}</span>
            </div>
            <div className="grid lg:grid-cols-3 gap-10 items-end">
              <PricingCard title="Pilot Sprint" price="€800" system="1 workflow IA + CRM" leads="100-300 prospects enrichis" sla="5-10j" isHybrid={isHybrid} hybridPrice="CPL" lang={lang} onSelect={() => openDemo('pricing_pilot')} />
              <PricingCard title="Growth Engine" price="€1500" system="Scraping + LinkedIn + CRM" leads="500+ leads ciblés / mois" sla="hebdo" isFeatured={true} isHybrid={isHybrid} hybridPrice="€900 + CPL" lang={lang} onSelect={() => openDemo('pricing_growth')} />
              <PricingCard title="Scale System" price="€3000+" system="Multi-canal + dashboard" leads="Volume sur mesure" sla="48h" isHybrid={isHybrid} hybridPrice="sur mesure" lang={lang} onSelect={() => openDemo('pricing_scale')} />
            </div>
            {isHybrid && (
              <div className="mt-20 max-w-2xl mx-auto bg-[#2E8B57]/5 border border-[#2E8B57]/20 p-8 rounded-[2rem] flex items-start gap-6 shadow-sm">
                <div className="w-12 h-12 bg-[#2E8B57] text-white rounded-2xl flex items-center justify-center shrink-0">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="font-black text-green-900 text-xl mb-2">{t.perfModelTitle}</h4>
                  <p className="text-green-800/80 font-medium text-sm leading-relaxed">{t.perfModelDesc}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Savings */}
        <section className="py-32 px-8 bg-white">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6 uppercase tracking-tight text-gray-900">{ui.betterTitle} <span className="text-[#005A9C]">{ui.betterTitleAccent}</span></h2>
              <p className="text-gray-500 font-medium leading-relaxed mb-8">{ui.betterText}</p>
            </div>
            <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
              <h3 className="text-2xl font-black mb-8">{t.savingsTitle}</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-2 uppercase text-xs font-black tracking-widest text-gray-400">
                    <span>{t.savingsLabel1}</span><span>€3k-€8k/mo</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 uppercase text-xs font-black tracking-widest text-[#2E8B57]">
                    <span>{t.savingsLabel2}</span><span>€800+</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2E8B57] w-[22%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
<section id="testimonials" className="min-h-screen py-32 px-8 bg-gray-50 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">Études de cas process</h2>
              <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">Pas de faux logos, pas de profils génériques. Voici les systèmes que nous déployons et les KPI que nous cherchons à améliorer.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {b2bTestimonials.map((t, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                    <div>
                      <h3 className="font-black text-gray-900 leading-tight">{t.name}</h3>
                      <p className="text-xs font-bold text-[#005A9C] uppercase tracking-widest">{t.role} • {t.industry}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-8 leading-relaxed">"{t.content}"</p>
                  <div className="mt-auto pt-6 border-t border-gray-50">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-[#2E8B57] rounded-xl text-xs font-black uppercase tracking-widest">
                      <CheckCircle2 size={14} /> {t.result}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="consultation" className="bg-slate-950 px-8 py-24 text-white">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            <div>
              <p className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
                {ui.auditBadge}
              </p>
              <h2 className="mt-6 text-4xl font-black uppercase tracking-tight">
                {ui.auditTitle}
              </h2>
              <p className="mt-5 max-w-xl text-slate-300">
                {ui.auditText}
              </p>
              <div className="mt-8 space-y-3 text-sm text-slate-300">
                {ui.auditPoints.map((point) => <p key={point}>{point}</p>)}
              </div>
            </div>
            <form onSubmit={handleLeadSubmit} className="rounded-3xl bg-white p-8 text-slate-900 shadow-2xl">
              <div className="space-y-4">
                <input name="name" required placeholder={ui.name} className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]" />
                <input name="organization" required placeholder={ui.organization} className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]" />
                <input name="email" type="email" required placeholder={ui.email} className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]" />
                <select name="volume" required className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]">
                  <option value="">{ui.volume}</option>
                  <option value="<300">{ui.less}</option>
                  <option value="300-1000">{ui.medium}</option>
                  <option value="1000+">{ui.more}</option>
                </select>
                <textarea name="need" rows="4" required placeholder={ui.need} className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]" />
              <button type="submit" className="w-full rounded-xl bg-[#005A9C] px-4 py-3 font-black text-white transition hover:bg-blue-700">
                {ui.submit}
              </button>
              </div>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-24 px-8 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-16">
            <div className="max-w-sm">
              <div className="flex items-center gap-3 mb-8 font-black text-2xl tracking-tighter">
                <div className="w-10 h-10 bg-[#005A9C] rounded flex items-center justify-center overflow-hidden shadow-sm">
                  <img src="/Simplified logo ful.webp" alt="EduGrowth" className="w-full h-full object-contain" />
                </div>
                EduGrowth
              </div>
              <p className="text-gray-500 font-medium leading-relaxed mb-8">{t.footerText}</p>
            </div>
            <div className="text-xs font-black text-gray-300 uppercase tracking-widest self-end">© 2024 Abroadzone Group • Tunisia • UK • UAE</div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default EduGrowthOutsourcingPage;
