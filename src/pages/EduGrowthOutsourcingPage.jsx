import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle2, BarChart3, Users, Globe2, ShieldCheck, LayoutDashboard, Mail, Phone, Home as HomeIcon, Clock, MessageSquare } from 'lucide-react';
import { b2bOutsourcingTestimonials } from '../components/TestimonialsData.js';
import SEOHelmet from '../components/SEOHelmet';
import { trackEvent } from '../utils/tracking';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

const translations = {
  en: {
    heroBadge: "STRATEGIC EDUCATION OUTSOURCING HUB",
    heroTitle: "Scale Your Global Admissions",
    heroTitleSpan: "Effortlessly from Tunisia.",
    heroDesc: "The cost-effective alternative to local hiring. Deploy highly-skilled, multilingual education experts in 72 hours and save up to 60% on operational costs.",
    heroCTA: "Talk to our Experts",
    stat1: "Multilingual Support",
    stat2: "Cost Reduction",
    stat3: "Nearshore Advantage",
    stat4: "Rapid Onboarding",
    serviceTitle: "Global Higher Ed",
    serviceTitleSpan: "Operations Partner",
    serviceDesc: "We act as a seamless extension of your university, language school, or education agency, handling the entire student journey from first inquiry to final enrollment.",
    s1Title: "Student Inquiry Management",
    s1Desc: "Expert qualification and fast response times in English, French, and Arabic to maximize your conversion rates.",
    s2Title: "Global Lead Qualification",
    s2Desc: "Our agents filter and nurture leads, ensuring your admissions team only speaks with highly qualified applicants.",
    s3Title: "Admissions & Compliance",
    s3Desc: "Comprehensive administrative support, document verification, and visa checklist guidance for all major destinations.",
    s4Title: "Partner Relations (B2B)",
    s4Desc: "Managing and expanding your educational agent network and school counselor relations across diverse global markets.",
    s5Title: "CRM & Tech Integration",
    s5Desc: "Deep integration with HubSpot, Salesforce, and Zoho for transparent, real-time reporting and data-driven decisions.",
    s6Title: "Market Research & Strategy",
    s6Desc: "Data-driven insights to help you enter and scale in new student recruitment territories with confidence.",
    pricingTitle: "Flexible Operations Model",
    pricingFixed: "Standard Fixed",
    pricingHybrid: "Hybrid Performance",
    perfModelTitle: "Performance Alignment Model",
    perfModelDesc: "Lower your monthly fixed costs by up to 33% with our hybrid success-based model. We win when you enroll students.",
    savingsTitle: "Tunisia vs. In-house (EU/UK)",
    savingsLabel1: "Internal Team Costs",
    savingsLabel2: "EduGrowth Managed Operations",
    footerText: "Your nearshore partner for scalable student recruitment and education BPO. Headquartered in Tunisia, serving the global Higher Ed community.",
  },
  fr: {
    heroBadge: "HUB STRATÉGIQUE D'OUTSOURCING ÉDUCATIF",
    heroTitle: "Développez vos admissions",
    heroTitleSpan: "depuis la Tunisie.",
    heroDesc: "L'alternative rentable au recrutement local. Déployez des experts éducatifs multilingues en 72 heures et réduisez jusqu'à 60% vos coûts opérationnels.",
    heroCTA: 'Parler à nos experts',
    stat1: 'Support multilingue',
    stat2: 'Réduction des coûts',
    stat3: 'Avantage nearshore',
    stat4: 'Onboarding rapide',
    serviceTitle: 'Partenaire opérationnel',
    serviceTitleSpan: 'Higher Ed',
    serviceDesc: "Nous agissons comme une extension fluide de votre université, école de langue ou agence éducative, en gérant tout le parcours étudiant du premier contact jusqu'à l'inscription.",
    s1Title: 'Gestion des demandes étudiantes',
    s1Desc: 'Qualification experte et temps de réponse rapides en anglais, français et arabe pour maximiser vos conversions.',
    s2Title: 'Qualification globale des leads',
    s2Desc: "Nos agents filtrent et nourrissent les leads afin que votre équipe admissions parle uniquement à des candidats qualifiés.",
    s3Title: 'Admissions & conformité',
    s3Desc: 'Support administratif complet, vérification documentaire et guidance visa pour les principales destinations.',
    s4Title: 'Relations partenaires (B2B)',
    s4Desc: "Gestion et développement de votre réseau d'agents éducatifs et de conseillers scolaires sur plusieurs marchés.",
    s5Title: 'CRM & intégration tech',
    s5Desc: 'Intégration poussée avec HubSpot, Salesforce et Zoho pour un reporting temps réel et des décisions pilotées par la donnée.',
    s6Title: 'Recherche marché & stratégie',
    s6Desc: 'Des insights data pour entrer et grandir sur de nouveaux territoires de recrutement étudiant avec confiance.',
    pricingTitle: 'Modèle opérationnel flexible',
    pricingFixed: 'Fixe standard',
    pricingHybrid: 'Performance hybride',
    perfModelTitle: "Modèle aligné sur la performance",
    perfModelDesc: 'Réduisez vos coûts fixes mensuels jusqu’à 33% avec notre modèle hybride basé sur le succès. Nous gagnons quand vous inscrivez des étudiants.',
    savingsTitle: 'Tunisie vs équipe interne (UE/RU)',
    savingsLabel1: "Coûts de l'équipe interne",
    savingsLabel2: 'Opérations gérées par EduGrowth',
    footerText: "Votre partenaire nearshore pour un recrutement étudiant scalable et un BPO éducatif structuré, basé en Tunisie au service du Higher Ed mondial.",
  },
};

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
    <div className="w-14 h-14 bg-blue-50 text-[#005A9C] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#005A9C] group-hover:text-white transition-all duration-300">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-800 tracking-tight">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
  </div>
);

const PricingCard = ({ title, price, agents, leads, sla, isFeatured, hybridPrice, isHybrid, lang, onSelect }) => (
  <div className={`relative p-10 rounded-[2.5rem] border transition-all duration-500 ${isFeatured ? 'border-[#2E8B57] shadow-2xl bg-white scale-105 z-10' : 'border-gray-200 bg-white/50'}`}>
    {isFeatured && <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#2E8B57] text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">Recommended</div>}
    <h3 className="text-xl font-bold mb-2 uppercase text-gray-900">{title}</h3>
    <div className="mb-8 text-5xl font-black tracking-tighter text-gray-900">{isHybrid ? (hybridPrice || 'Custom') : price}<span className="text-sm font-medium text-gray-400">/mo</span></div>
    <div className="space-y-5 mb-10 text-sm font-medium text-gray-600">
      <div className="flex items-center gap-4"><div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center"><CheckCircle2 className="text-[#2E8B57] w-4 h-4" /></div><span><strong>{agents}</strong> Dedicated Agents</span></div>
      <div className="flex items-center gap-4"><div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center"><CheckCircle2 className="text-[#2E8B57] w-4 h-4" /></div><span><strong>{leads}</strong> Leads Processed</span></div>
      <div className="flex items-center gap-4"><div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center"><Clock className="text-[#2E8B57] w-4 h-4" /></div><span>SLA: {sla}</span></div>
    </div>
    <button onClick={onSelect} className={`w-full py-5 rounded-2xl font-bold text-lg transition-all ${isFeatured ? 'bg-[#2E8B57] text-white hover:bg-[#256f45] shadow-xl shadow-green-100' : 'bg-gray-900 text-white hover:bg-black'}`}>
      Select {title}
    </button>
  </div>
);

const outsourcingStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Education Outsourcing Tunisia",
      "serviceType": "Student Recruitment and Admissions Outsourcing",
      "provider": {
        "@type": "Organization",
        "name": "EduGrowth Outsourcing",
        "url": "https://edugrowth.tn/"
      },
      "areaServed": ["Tunisia", "France", "United Kingdom", "United Arab Emirates", "Africa"],
      "availableLanguage": ["English", "French", "Arabic"],
      "description": "Outsourcing services for universities, language schools, and agencies: admissions follow-up, lead qualification, and multilingual conversion teams from Tunisia."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How fast can EduGrowth launch an outsourced admissions team?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most partner operations are launched in a few days after process alignment, scripts validation, and KPI setup."
          }
        },
        {
          "@type": "Question",
          "name": "Who is outsourcing best for?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Universities, language schools, and education agencies that want to scale admissions and student recruitment without expanding in-house hiring costs."
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
        betterTitle: 'Mieux qu’un recrutement',
        betterTitleAccent: 'interne.',
        betterText:
          "Déployer une équipe interne coûte bien plus que le salaire. Nous vous offrons jusqu'à 60% d'économie sur les frais fixes avec de meilleurs résultats.",
        auditBadge: 'Audit B2B gratuit',
        auditTitle: 'Recevez votre plan d’économie outsourcing',
        auditText:
          'Partagez votre volume mensuel de leads et votre organisation actuelle. Nous vous enverrons un plan de transition réaliste avec KPI opérationnels.',
        auditPoints: ['1. Diagnostic des temps de réponse', '2. Estimation des coûts interne vs externalisé', '3. Scénario de lancement en 30 jours'],
        name: 'Nom complet',
        organization: "Nom de l'organisation",
        email: 'Email professionnel',
        volume: 'Volume mensuel de leads',
        less: 'Moins de 300',
        medium: '300 - 1000',
        more: 'Plus de 1000',
        need: 'Que souhaitez-vous externaliser en premier ?',
        submit: 'Demander ma consultation gratuite',
      }
    : {
        navServices: 'Services',
        navPricing: 'Pricing',
        back: 'Back to Portal',
        consultation: 'Free Consultation',
        demo: 'Book Demo',
        consultationButton: 'Book a Free Consultation',
        betterTitle: 'Better than',
        betterTitleAccent: 'Internal Hiring.',
        betterText:
          'Deploying an internal team costs more than just salary. We offer a 60% saving on overhead with better results.',
        auditBadge: 'Free B2B Audit',
        auditTitle: 'Get Your Outsourcing Cost-Saving Plan',
        auditText:
          'Share your monthly lead volume and current team setup. We will send a realistic transition plan with operational KPIs.',
        auditPoints: ['1. Response-time diagnosis', '2. In-house vs outsourced cost estimate', '3. 30-day launch scenario'],
        name: 'Full name',
        organization: 'Organization name',
        email: 'Work email',
        volume: 'Monthly lead volume',
        less: 'Less than 300',
        medium: '300 - 1000',
        more: 'More than 1000',
        need: 'What do you want to outsource first?',
        submit: 'Request My Free Consultation',
      };

  const openDemo = () => {
    // Modal or WA
    trackEvent('cta_click', { cta_type: 'outsourcing_demo_whatsapp' });
    window.open(`https://wa.me/${WA_NUMBER}?text=Demo request from Outsourcing page`, '_blank');
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
        title="Outsourcing Tunisie | Externalisation Admissions & Student Recruitment"
        description="Externalisez vos admissions et opérations de recrutement étudiant en Tunisie. Réduisez vos coûts, déployez en quelques jours et scalez votre conversion."
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
              <span className="text-[10px] uppercase tracking-widest text-[#005A9C] font-black">Outsourcing</span>
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
              <button onClick={openDemo} className="bg-[#005A9C] text-white px-10 py-6 rounded-[2rem] font-black text-xl shadow-xl hover:-translate-y-1 transition-all">
                {t.heroCTA}
              </button>
              <Link to="/book-consultation" className="rounded-[2rem] border-2 border-[#005A9C] px-10 py-6 text-xl font-black text-[#005A9C] transition hover:bg-blue-50">
                {ui.consultationButton}
              </Link>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section className="pb-32 px-8">
          <div className="max-w-6xl mx-auto bg-gray-900 rounded-[3rem] p-12 md:p-16 text-white grid grid-cols-2 lg:grid-cols-4 gap-12 shadow-2xl">
            {[
              { v: "24/7", l: t.stat1 },
              { v: "60%", l: t.stat2 },
              { v: "UK/EU", l: t.stat3 },
              { v: "4h", l: t.stat4 }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl font-black mb-2 tracking-tighter">{stat.v}</div>
                <div className="text-sm font-bold text-blue-400 uppercase tracking-widest">{stat.l}</div>
              </div>
            ))}
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
              <PricingCard title="Starter" price="€800" agents="1" leads="350" sla="24h" isHybrid={isHybrid} hybridPrice="" lang={lang} onSelect={openDemo} />
              <PricingCard title="Growth Engine" price="€1500" agents="2" leads="800" sla="12h" isFeatured={true} isHybrid={isHybrid} hybridPrice="€1200" lang={lang} onSelect={openDemo} />
              <PricingCard title="Elite Enterprise" price="€3000+" agents="3-5+" leads="Unlimited" sla="4h" isHybrid={isHybrid} hybridPrice="€2500" lang={lang} onSelect={openDemo} />
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
                    <span>{t.savingsLabel1}</span><span>€75,000/yr</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 uppercase text-xs font-black tracking-widest text-[#2E8B57]">
                    <span>{t.savingsLabel2}</span><span>€36,000/yr</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2E8B57] w-[48%]" />
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
              <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">Client Testimonials</h2>
              <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">See how we've helped agencies and companies scale their operations with high-performing outsourced teams.</p>
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
