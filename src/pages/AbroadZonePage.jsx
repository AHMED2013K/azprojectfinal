import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, MessageSquare, Home as HomeIcon, Globe2, Zap, Mail, Phone, ArrowRight, GraduationCap, Building2, Star } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { destinationsData } from '../components/data.js'; // Reuse/add from current
import { studentAbroadTestimonials } from '../components/TestimonialsData.js';
import { trackEvent } from '../utils/tracking';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

function buildApplyUrl(source, lang) {
  const params = new URLSearchParams({
    utm_source: 'website',
    utm_medium: 'student_funnel',
    utm_campaign: source,
    utm_content: lang,
  });

  return `https://app.edugrowth.tn/apply?${params.toString()}`;
}

const abroadStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Study Abroad Guidance Tunisia",
      "serviceType": "Student Admissions and Visa Guidance",
      "provider": {
        "@type": "Organization",
        "name": "EduGrowth Tunisia",
        "url": "https://edugrowth.tn/"
      },
      "areaServed": ["Tunisia", "France", "Germany", "Cyprus", "Turkey", "Canada"],
      "availableLanguage": ["French", "Arabic", "English"],
      "description": "Abroad Zone helps Tunisian students with destination choice, applications, admissions, and student visa preparation."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can you help me choose the best destination based on my budget?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We provide a destination shortlist based on your academic background, budget, and target career path."
          }
        },
        {
          "@type": "Question",
          "name": "Do you support visa preparation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we help with checklist preparation, document validation, and interview preparation."
          }
        }
      ]
    }
  ]
};

const translations = {
  en: {
    stdHeroTitle: "Your Gateway to Global Education",
    stdHeroSubtitle: "Expert guidance for your studies, professional training, and career mobility worldwide. Based in Tunisia, serving the world.",
    stdHeroCTA: "Get Started Now",
    stdHeroSecondary: "View All Services",
    stdServiceTitle: "Our Premium Expertise",
    stdServiceDesc: "Comprehensive support designed to navigate the complexities of international education and career paths with confidence.",
    stdAlternance: "Work-Study in France",
    stdAlternanceDesc: "Complete support for finding your 'alternance' in France: from CV optimization and interview prep to contract signing.",
    stdLogement: "Global Housing Search",
    stdLogementDesc: "Fast and reliable housing search assistance in your destination country, including all administrative and guarantee support.",
    stdEtudes: "University Admissions",
    stdEtudesDesc: "Strategic guidance for university applications in Turkey, Cyprus, Russia, Morocco, Dubai, and beyond.",
    stdAusbildung: "Ausbildung in Germany",
    stdAusbildungDesc: "Dual training programs in Germany & Switzerland: combine high-quality theory with paid practical experience.",
    stdDestTitle: "Strategic Destinations",
    stdDestDesc: "We partner with prestigious international institutions to offer you secure, recognized, and high-quality educational paths.",
    stdOfficeTitle: "Our Global Presence",
    stdOfficeDesc: "Local offices providing reliable, fast, and personalized support in multiple countries.",
    stdAlternanceHeroTitle: "Launch Your Career in France",
    stdAlternanceHeroDesc: "Full-cycle support to secure your work-study contract, backed by our extensive network of partner companies.",
    stdPackTitle: "Complete Alternance Pack",
    stdPackPrice: "400€",
    stdFormTitle: "Start Your Journey",
    stdFormName: "Your Full Name",
    stdFormEmail: "Your Email Address",
    stdFormService: "Interested Service",
    stdFormMessage: "How can we help you?",
    stdFormSubmit: "Connect on WhatsApp",
    stdConsent: "I agree to the processing of my data in accordance with the privacy policy.",
  },
  fr: {
    stdHeroTitle: "Votre passerelle vers l'éducation internationale",
    stdHeroSubtitle: "Un accompagnement expert pour vos études, formations professionnelles et projets de mobilité depuis la Tunisie.",
    stdHeroCTA: 'Commencer maintenant',
    stdHeroSecondary: 'Voir tous les services',
    stdServiceTitle: 'Notre expertise premium',
    stdServiceDesc: "Un accompagnement complet pour naviguer avec confiance dans la complexité des études et carrières à l'international.",
    stdAlternance: 'Alternance en France',
    stdAlternanceDesc: "Accompagnement complet pour trouver votre alternance en France : optimisation du CV, préparation des entretiens et signature du contrat.",
    stdLogement: 'Recherche de logement',
    stdLogementDesc: "Aide rapide et fiable pour trouver un logement dans votre pays de destination, avec support administratif et garanties.",
    stdEtudes: 'Admissions universitaires',
    stdEtudesDesc: 'Accompagnement stratégique pour les candidatures universitaires en Turquie, à Chypre, en Russie, au Maroc, à Dubai et au-delà.',
    stdAusbildung: 'Ausbildung en Allemagne',
    stdAusbildungDesc: "Programmes de formation duale en Allemagne et en Suisse, mêlant théorie de qualité et expérience pratique rémunérée.",
    stdDestTitle: 'Destinations stratégiques',
    stdDestDesc: "Nous travaillons avec des institutions internationales reconnues pour vous proposer des parcours fiables, reconnus et de haute qualité.",
    stdOfficeTitle: 'Notre présence internationale',
    stdOfficeDesc: 'Des bureaux locaux pour un support fiable, rapide et personnalisé dans plusieurs pays.',
    stdAlternanceHeroTitle: 'Lancez votre carrière en France',
    stdAlternanceHeroDesc: "Un accompagnement complet pour décrocher votre contrat d'alternance grâce à notre réseau étendu d'entreprises partenaires.",
    stdPackTitle: 'Pack alternance complet',
    stdPackPrice: '400€',
    stdFormTitle: 'Commencez votre parcours',
    stdFormName: 'Nom complet',
    stdFormEmail: 'Adresse email',
    stdFormService: 'Service souhaité',
    stdFormMessage: 'Comment pouvons-nous vous aider ?',
    stdFormSubmit: 'Nous contacter sur WhatsApp',
    stdConsent: 'J’accepte le traitement de mes données conformément à la politique de confidentialité.',
  },
};

const AbroadZonePage = () => {
  const { lang, toggleLanguage } = useLanguage();
  const t = translations[lang];
  const ui = lang === 'fr'
    ? {
        navServices: 'Services',
        navDestinations: 'Destinations',
        navOffices: 'Bureaux',
        navContact: 'Contact',
        consultation: 'Consultation gratuite',
        back: 'Retour au portail',
        stats: ['Bureaux internationaux', 'Destinations', 'Services support', 'Support'],
        guides: "Guides populaires pour étudier à l'étranger",
        pricing: 'Voir les tarifs',
        process: 'Notre process en 4 étapes',
        processSteps: [
          { title: 'Analyse du profil', desc: 'Étude de votre parcours et définition de vos objectifs professionnels.' },
          { title: 'Recherche d’opportunités', desc: 'Offres ciblées issues de notre réseau d’entreprises partenaires.' },
          { title: 'Préparation entretien', desc: 'Coaching intensif pour vous aider à vous démarquer.' },
          { title: 'Signature du contrat', desc: 'Aide à la négociation et finalisation du contrat.' },
        ],
        packPoints: ['Suivi personnalisé des candidatures', 'Accès à un réseau de 850+ entreprises', 'Support administratif'],
        payment: 'Paiement en 2 étapes : 150€ au départ / 250€ après le premier salaire.',
        signup: "S'inscrire maintenant",
        contactText: 'Prêt à démarrer votre projet ? Remplissez le formulaire ou envoyez-nous un message WhatsApp.',
        serviceOptions: ['Alternance en France', 'Logement', 'Études', 'Ausbildung'],
        applyTitle: 'Postulez directement dans notre CRM',
        applyText:
          "Si vous êtes prêt(e) à avancer, le formulaire apply est le chemin le plus rapide pour envoyer votre profil, être qualifié(e) et être suivi(e) par notre équipe.",
        applyPoints: [
          'Candidature centralisée et structurée',
          'Suivi plus rapide que WhatsApp seul',
          'Attribution de la source pour notre équipe admissions',
        ],
        applyPrimary: 'Remplir le formulaire apply',
        applySecondary: 'Parler à un conseiller',
      }
    : {
        navServices: 'Services',
        navDestinations: 'Destinations',
        navOffices: 'Offices',
        navContact: 'Contact',
        consultation: 'Free Consultation',
        back: 'Back to Portal',
        stats: ['International Offices', 'Destinations', 'Support Services', 'Support'],
        guides: 'Popular Study Abroad Guides',
        pricing: 'See Pricing',
        process: 'Our 4-Step Process',
        processSteps: [
          { title: 'Profile Analysis', desc: 'Study your background and define professional goals.' },
          { title: 'Opportunity Search', desc: 'Targeted offers from our partner companies.' },
          { title: 'Interview Preparation', desc: 'Intensive coaching to help you stand out.' },
          { title: 'Contract Signing', desc: 'Negotiation assistance and contract finalization.' },
        ],
        packPoints: ['Personalized application follow-up', 'Access to 850+ company network', 'Administrative support'],
        payment: 'Payment in 2 stages: 150€ upfront / 250€ after first salary.',
        signup: 'Sign Up Now',
        contactText: 'Ready to start your project? Fill out the form or send us a WhatsApp message.',
        serviceOptions: ['Work-study France', 'Housing', 'Studies', 'Ausbildung'],
        applyTitle: 'Apply directly into our CRM',
        applyText:
          'If you are ready to move, the apply form is the fastest path to send your profile, get qualified, and be followed up by our admissions team.',
        applyPoints: [
          'Structured application intake',
          'Faster follow-up than WhatsApp alone',
          'Clear source attribution for our admissions team',
        ],
        applyPrimary: 'Open the apply form',
        applySecondary: 'Talk to an advisor',
      };

  const handleWA = (e) => {
    e.preventDefault();
    trackEvent('generate_lead', {
      lead_source: 'abroad_zone_form',
      page_location: '/abroad-zone',
      value: 1,
      currency: 'USD',
    });
    const fd = new FormData(e.target);
    const msg = `New contact from Abroad Zone\nName: ${fd.get('name')}\nEmail: ${fd.get('email')}\nService: ${fd.get('service')}\nMessage: ${fd.get('message')}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const studentTestimonials = studentAbroadTestimonials;
  const applyUrl = buildApplyUrl('abroad_zone', lang);

  return (
    <>
      <SEOHelmet 
        title="Agence Étude à l'Étranger Tunisie | Abroad Zone by EduGrowth"
        description="Étudier à l'étranger depuis la Tunisie: orientation, admission, visa étudiant et accompagnement complet vers la France, l'Allemagne, le Canada et plus."
        canonical="https://edugrowth.tn/abroad-zone"
        structuredData={abroadStructuredData}
        lang={lang}
      />
      <div className="min-h-screen bg-white font-sans scroll-smooth text-gray-900">
        {/* Navbar - copy from past, adapt */}
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b px-4 py-4 sm:px-8 sm:py-5 flex items-center justify-between">
          {/* Logo & title */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="h-10 w-10 flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center shadow-sm ring-1 ring-slate-200" style={{ backgroundColor: '#175c7d' }}>
              <img
                src="/abroad.webp"
                alt="Abroad Zone"
                width="40"
                height="40"
                className="block h-10 w-10 scale-[1.8] object-cover"
              />
            </div>
            <span className="truncate text-lg font-black tracking-tight uppercase sm:text-2xl" style={{color: '#175c7d'}}>Abroad Zone</span>
          </div>
          {/* Links */}
          <div className="hidden lg:flex items-center gap-10 text-sm font-bold text-gray-500">
            <a href="#std-services" className="hover:text-[#175c7d] uppercase">{ui.navServices}</a>
            <a href="#std-destinations" className="hover:text-[#175c7d] uppercase">{ui.navDestinations}</a>
            <a href="#std-bureaux" className="hover:text-[#175c7d] uppercase">{ui.navOffices}</a>
            <a href="#std-contact" className="hover:text-[#175c7d] uppercase">{ui.navContact}</a>
            <Link to="/book-consultation" className="hover:text-[#175c7d] uppercase">{ui.consultation}</Link>
            <LanguageSwitch lang={lang} onToggle={toggleLanguage} />
            <Link to="/" className="flex items-center gap-2 hover:text-[#175c7d] border-l pl-8">
              <HomeIcon size={16} /> {ui.back}
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <header className="pt-44 pb-32 px-8 bg-[#175c7d] text-white relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="hero-wave-layer" />
            <div className="hero-grid-layer" />
            <div className="hero-beam-layer" />
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
            <div className="hero-orb hero-orb-3" />
          </div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase">{t.stdHeroTitle}</h1>
            <p className="text-2xl opacity-90 mb-12 max-w-2xl mx-auto">{t.stdHeroSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href={applyUrl}
                onClick={() => trackEvent('cta_click', { cta_type: 'abroad_zone_apply_hero', page: '/abroad-zone' })}
                className="bg-white text-[#175c7d] px-10 py-6 rounded-[2rem] font-black text-xl shadow-2xl hover:scale-105 transition-all uppercase"
              >
                {t.stdHeroCTA}
              </a>
              <Link to="/book-consultation" className="bg-[#0b3853] border-2 border-white/40 px-10 py-6 rounded-[2rem] font-black text-xl hover:bg-[#0f4668] transition-all uppercase">
                {ui.consultation}
              </Link>
              <button onClick={() => document.getElementById('std-services')?.scrollIntoView({behavior: 'smooth'})} 
                className="bg-transparent border-2 border-white/30 px-10 py-6 rounded-[2rem] font-black text-xl hover:bg-white/10 transition-all uppercase">
                {t.stdHeroSecondary}
              </button>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section className="py-16 px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div><div className="text-5xl font-black mb-2" style={{ color: '#175c7d' }}>7+</div><div className="text-xs font-bold uppercase tracking-widest text-gray-400">{ui.stats[0]}</div></div>
            <div><div className="text-5xl font-black mb-2" style={{ color: '#175c7d' }}>7+</div><div className="text-xs font-bold uppercase tracking-widest text-gray-400">{ui.stats[1]}</div></div>
            <div><div className="text-5xl font-black mb-2" style={{ color: '#175c7d' }}>7+</div><div className="text-xs font-bold uppercase tracking-widest text-gray-400">{ui.stats[2]}</div></div>
            <div><div className="text-5xl font-black mb-2" style={{ color: '#175c7d' }}>24/7</div><div className="text-xs font-bold uppercase tracking-widest text-gray-400">{ui.stats[3]}</div></div>
          </div>
        </section>

        <section className="pb-16 px-8">
          <div className="max-w-6xl mx-auto rounded-[2rem] border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-black text-slate-900">{ui.guides}</h2>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-bold text-[#175c7d]">
              <Link to="/etudier-en-france-depuis-tunisie">Étudier en France depuis la Tunisie</Link>
              <Link to="/alternance-france">Alternance en France pour étudiants tunisiens</Link>
              <Link to="/study-in-north-cyprus">Étudier à Chypre du Nord depuis la Tunisie</Link>
              <Link to="/etudier-en-allemagne-depuis-tunisie">Étudier en Allemagne depuis la Tunisie</Link>
              <Link to="/etudier-au-canada-depuis-tunisie">Étudier au Canada depuis la Tunisie</Link>
              <Link to="/etudier-en-turquie-depuis-tunisie">Étudier en Turquie depuis la Tunisie</Link>
              <Link to="/etudier-a-dubai-depuis-tunisie">Étudier à Dubai depuis la Tunisie</Link>
              <Link to="/etudier-en-russie-depuis-tunisie">Étudier en Russie depuis la Tunisie</Link>
              <Link to="/etudier-en-italie-depuis-tunisie">Étudier en Italie depuis la Tunisie</Link>
              <Link to="/etudier-au-maroc-depuis-tunisie">Étudier au Maroc depuis la Tunisie</Link>
              <Link to="/etudier-au-royaume-uni-depuis-tunisie">Étudier au Royaume-Uni depuis la Tunisie</Link>
              <Link to="/etudier-aux-usa-depuis-tunisie">Étudier aux USA depuis la Tunisie</Link>
              <Link to="/agence-etude-etranger-tunis">Agence à Tunis</Link>
              <Link to="/agence-etude-etranger-sousse">Agence à Sousse</Link>
              <Link to="/agence-etude-etranger-sfax">Agence à Sfax</Link>
              <Link to="/blog">Blog Guides</Link>
            </div>
          </div>
        </section>

        <section className="pb-16 px-8">
          <div className="max-w-6xl mx-auto rounded-[2.5rem] bg-[linear-gradient(135deg,#175c7d_0%,#0f4668_55%,#082b43_100%)] p-8 text-white shadow-2xl md:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-100">
                  <GraduationCap size={14} />
                  CRM Apply Funnel
                </div>
                <h2 className="mt-5 text-4xl font-black uppercase tracking-tight">{ui.applyTitle}</h2>
                <p className="mt-4 max-w-2xl text-lg text-cyan-50/90">{ui.applyText}</p>
                <div className="mt-6 space-y-3">
                  {ui.applyPoints.map((point) => (
                    <div key={point} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white/90">
                      <CheckCircle2 size={18} className="mt-0.5 text-cyan-200" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <div className="text-3xl font-black">2 min</div>
                    <div className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100/80">form fill</div>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <div className="text-3xl font-black">CRM</div>
                    <div className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100/80">direct intake</div>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <div className="text-3xl font-black">2026</div>
                    <div className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100/80">alternance funnel</div>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={applyUrl}
                    onClick={() => trackEvent('cta_click', { cta_type: 'abroad_zone_apply_section', page: '/abroad-zone' })}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-[#175c7d] transition hover:bg-slate-100"
                  >
                    {ui.applyPrimary}
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lang === 'fr' ? "Bonjour EduGrowth, je veux de l'aide pour l'alternance en France." : 'Hello EduGrowth, I want help with alternance in France.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('cta_click', { cta_type: 'abroad_zone_apply_whatsapp', page: '/abroad-zone' })}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-white/15"
                  >
                    {ui.applySecondary}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="std-services" className="py-32 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">{t.stdServiceTitle}</h2>
              <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">{t.stdServiceDesc}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { key: 'stdAlternance', icon: MessageSquare, descKey: 'stdAlternanceDesc' },
                { key: 'stdLogement', icon: HomeIcon, descKey: 'stdLogementDesc' },
                { key: 'stdEtudes', icon: Globe2, descKey: 'stdEtudesDesc' },
                { key: 'stdAusbildung', icon: Zap, descKey: 'stdAusbildungDesc' }
              ].map((s, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group cursor-pointer hover:-translate-y-2">
                  <div className="w-12 h-12 bg-[#E3F0FA] text-[#175c7d] rounded-xl flex items-center justify-center mb-6 transition-all group-hover:bg-[#175c7d] group-hover:text-white">
                    <s.icon size={24} />
                  </div>
                  <h3 className="text-xl font-black mb-4 uppercase tracking-tight text-[#175c7d]">{t[s.key]}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">{t[s.descKey]}</p>
                  <div className="h-1 w-12 bg-[#175c7d] group-hover:w-full transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alternance Hero & Process */}
        <section id="std-alternance" className="py-32 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="bg-[#e0f0fa] rounded-[3rem] p-12 md:p-20 relative overflow-hidden mb-20">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight text-[#175c7d]">
                  {t.stdAlternanceHeroTitle}
                </h2>
                <p className="text-xl mb-10 max-w-2xl text-[#175c7d]/70">
                  {t.stdAlternanceHeroDesc}
                </p>
                <button onClick={() => document.getElementById('std-pricing')?.scrollIntoView({behavior: 'smooth'})}
                  className="bg-[#175c7d] text-white px-8 py-4 rounded-2xl font-black uppercase hover:shadow-xl transition-all">
                  {ui.pricing}
                </button>
              </div>
              <CheckCircle2 className="absolute top-0 right-0 p-10 opacity-5" size={300} style={{ color: '#175c7d' }} />
            </div>
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                <h3 className="text-3xl font-black uppercase tracking-tight">{ui.process}</h3>
                <div className="space-y-6">
                  {ui.processSteps.map((step, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="w-12 h-12 text-white rounded-full flex items-center justify-center font-black shrink-0 shadow-lg" style={{ backgroundColor: '#175c7d' }}>
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold uppercase text-gray-900">{step.title}</h4>
                        <p className="text-gray-500">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div id="std-pricing" className="bg-gray-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                <h3 className="text-2xl font-black mb-4 uppercase">{t.stdPackTitle}</h3>
                <div className="text-6xl font-black mb-8" style={{ color: '#175c7d' }}>{t.stdPackPrice}</div>
                <div className="space-y-4 mb-10 text-sm font-medium text-gray-400 leading-relaxed">
                  {ui.packPoints.map((point) => (
                    <p key={point} className="flex items-center gap-2"><CheckCircle2 size={16} style={{ color: '#175c7d' }} /> {point}</p>
                  ))}
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-xs mb-8 opacity-80">
                  <strong>{ui.payment}</strong>
                </div>
                <a href="https://gateway.konnect.network/pay?payment_ref=693042fe7f6493f1d231e7d4" target="_blank" rel="noopener noreferrer" 
                   className="block w-full text-center py-5 rounded-2xl font-black uppercase text-white shadow-lg transition-all" style={{ backgroundColor: '#175c7d' }}>
                  {ui.signup}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations */}
        <section id="std-destinations" className="py-32 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">{t.stdDestTitle}</h2>
              <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">{t.stdDestDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {destinationsData.map((d, i) => {
                const CardTag = d.path ? Link : 'div';
                const cardProps = d.path ? { to: d.path } : {};
                return (
                <CardTag key={i} {...cardProps} className="group relative h-96 rounded-[2.5rem] overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-all duration-300">
                  <img src={d.img} alt={d.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 p-10 text-white">
                    <h3 className="text-3xl font-black uppercase mb-2">{d.overlayTitle || d.name}</h3>
                    <p className="text-sm font-medium opacity-80">{d.desc}</p>
                    {d.path && (
                      <div className="mt-5 flex flex-wrap gap-3">
                        <span className="rounded-xl bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#175c7d]">Découvrir</span>
                        <span className="rounded-xl border border-white/40 bg-white/10 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-white">Postuler</span>
                      </div>
                    )}
                  </div>
                </CardTag>
              );
              })}
            </div>
          </div>
        </section>

        {/* Offices */}
        <section id="std-bureaux" className="py-32 px-8 bg-white text-center">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">{t.stdOfficeTitle}</h2>
            <p className="text-xl text-gray-500 mb-16">{t.stdOfficeDesc}</p>
            <div className="flex flex-wrap justify-center gap-6">
              {["Tunisia", "Morocco", "Cyprus", "Russia", "UAE", "Turkey", "Congo"].map((o, i) => (
                <div key={i} className="bg-gray-50 px-8 py-4 rounded-2xl font-black border border-gray-100 hover:shadow-lg transition-all" style={{ color: '#175c7d' }}>
                  {o}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
<section id="testimonials" className="min-h-screen py-32 px-8 bg-gray-50 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tight">Student Testimonials</h2>
              <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">Real stories from Tunisian students who successfully studied abroad with our guidance.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              {studentTestimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-lg">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.program} in {testimonial.destination}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="std-contact" className="py-32 px-8 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-black mb-8 uppercase tracking-tight">{t.stdFormTitle}</h2>
              <p className="text-xl text-gray-400 mb-12 font-medium">{ui.contactText}</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-blue-400"><Mail size={20} /></div>
                  <p className="font-bold">contact@edugrowth.tn</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500"><Phone size={20} /></div>
                  <p className="font-bold">+216 56 59 07 03</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleWA} className="bg-white rounded-[3rem] p-12 text-gray-900 space-y-6 shadow-2xl">
              <input type="text" name="name" required placeholder={t.stdFormName} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold" />
              <input type="email" name="email" required placeholder={t.stdFormEmail} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold" />
              <select name="service" required className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold appearance-none">
                <option value="">{t.stdFormService}</option>
                <option value="alternance">{ui.serviceOptions[0]}</option>
                <option value="logement">{ui.serviceOptions[1]}</option>
                <option value="etudes">{ui.serviceOptions[2]}</option>
                <option value="ausbildung">Ausbildung</option>
              </select>
              <textarea name="message" rows="4" placeholder={t.stdFormMessage} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold resize-none" />
              <div className="flex items-start gap-3 text-sm text-gray-500 font-bold px-2">
                <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                <span>{t.stdConsent}</span>
              </div>
              <button type="submit" className="w-full text-white py-5 rounded-2xl font-black text-xl shadow-xl transition-all" style={{ backgroundColor: '#175c7d' }}>
                {t.stdFormSubmit}
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-8 bg-white border-t text-center text-gray-900">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-3 font-black text-2xl tracking-tighter">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#175c7d' }}>
                <img src="/abroad.webp" alt="Abroad Zone" className="w-full h-full object-contain" />
              </div>
              Abroad Zone
            </div>
            <p className="text-xs font-black text-gray-300 uppercase tracking-widest">
              © 2024 Abroadzone Group • Tunisia • UK • UAE
            </p>
          </div>
        </footer>
      </div>
      <style>{`
        .hero-wave-layer {
          position: absolute;
          inset: -35% -10% -10% -10%;
          background:
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.2), transparent 42%),
            radial-gradient(circle at 80% 30%, rgba(56, 189, 248, 0.25), transparent 45%),
            radial-gradient(circle at 45% 80%, rgba(59, 130, 246, 0.25), transparent 48%);
          animation: heroWaveDrift 7s ease-in-out infinite;
          transform-origin: center;
          will-change: transform, filter;
        }

        .hero-grid-layer {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(circle at center, black 30%, transparent 85%);
          opacity: 0.35;
          animation: heroGridShift 6s linear infinite;
          will-change: background-position;
        }

        .hero-beam-layer {
          position: absolute;
          inset: -40% -20%;
          background:
            conic-gradient(from 30deg at 50% 50%, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.02) 20%, rgba(14, 165, 233, 0.2) 44%, rgba(255, 255, 255, 0.03) 65%, rgba(255, 255, 255, 0.22));
          mix-blend-mode: screen;
          opacity: 0.5;
          animation: heroBeamSpin 12s linear infinite;
          will-change: transform;
        }

        .hero-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(3px);
          opacity: 0.55;
          will-change: transform;
        }

        .hero-orb-1 {
          width: 260px;
          height: 260px;
          top: 8%;
          left: 6%;
          background: radial-gradient(circle at 35% 35%, rgba(125, 211, 252, 0.8), rgba(56, 189, 248, 0.05));
          animation: heroOrbFloatA 5s ease-in-out infinite;
        }

        .hero-orb-2 {
          width: 340px;
          height: 340px;
          right: 4%;
          top: 20%;
          background: radial-gradient(circle at 30% 30%, rgba(147, 197, 253, 0.75), rgba(37, 99, 235, 0.06));
          animation: heroOrbFloatB 6s ease-in-out infinite;
        }

        .hero-orb-3 {
          width: 300px;
          height: 300px;
          left: 38%;
          bottom: -14%;
          background: radial-gradient(circle at 40% 40%, rgba(191, 219, 254, 0.7), rgba(29, 78, 216, 0.06));
          animation: heroOrbFloatC 5.5s ease-in-out infinite;
        }

        @keyframes heroWaveDrift {
          0% { transform: translate3d(-8%, -5%, 0) scale(1.02) rotate(-2deg); filter: hue-rotate(0deg); }
          50% { transform: translate3d(5%, 2%, 0) scale(1.09) rotate(1.5deg); filter: hue-rotate(14deg); }
          100% { transform: translate3d(-3%, 6%, 0) scale(1.05) rotate(-1deg); filter: hue-rotate(0deg); }
        }

        @keyframes heroGridShift {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 96px 48px, 48px 96px; }
        }

        @keyframes heroBeamSpin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.04); }
          100% { transform: rotate(360deg) scale(1); }
        }

        @keyframes heroOrbFloatA {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(52px, 34px, 0); }
        }

        @keyframes heroOrbFloatB {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-46px, 28px, 0); }
        }

        @keyframes heroOrbFloatC {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(36px, -36px, 0); }
        }
      `}</style>
    </>
  );
};

export default AbroadZonePage;
