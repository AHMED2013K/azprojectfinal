import React, { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  X,
  Send,
  Users,
  FileText,
  BarChart3,
  Phone,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Clock3,
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import ServiceCard from '../components/ServiceCard';
import PricingCard from '../components/PricingCard';
import PortalSelector from '../components/PortalSelector';
import { destinationsData, services } from '../components/data.js';

const WA_NUMBER = '21656590703';

const gateSEOData = {
  title: "EduGrowth Tunisia | Étudier à l'étranger & Outsourcing Services",
  description: "EduGrowth combine agence étude à l'étranger en Tunisie et services d'outsourcing éducatif. Accompagnement étudiants + externalisation admissions pour institutions.",
  canonical: 'https://edugrowth.tn/',
  lang: 'en',
};

const studentSEOData = {
  title: "Agence Étude à l'Étranger Tunisie | Abroad Zone by EduGrowth",
  description: "Étudier à l'étranger depuis la Tunisie: orientation, admission, visa étudiant et accompagnement personnalisé pour les meilleures destinations.",
  canonical: 'https://edugrowth.tn/abroad-zone',
  lang: 'en',
};

const b2bSEOData = {
  title: 'Outsourcing Tunisie | Externalisation Services Éducation | EduGrowth',
  description: "Externalisation services Tunisie pour universités, écoles de langue et agences: admissions, lead qualification, student recruitment et CRM support.",
  canonical: 'https://edugrowth.tn/outsourcing',
  lang: 'en',
};

const translations = {
  en: {
    gateTitle: 'Choose your portal',
    gateSubtitle: 'Access Abroad Zone for student guidance or EduGrowth for education outsourcing services from Tunisia.',
    gateStudent: 'Abroad Zone',
    gateB2B: 'EduGrowth B2B',
    navServices: 'Services',
    navPricing: 'Pricing',
    navPortal: 'Portal',
    navDemo: 'Book Demo',
    navResults: 'Why Tunisia',
    studentEyebrow: 'Abroad Zone',
    studentTitle: 'Guided study-abroad support for ambitious students.',
    studentDescription: 'Discover international programmes, compare destinations, and get practical WhatsApp guidance for applications, alternance, Ausbildung, and university planning.',
    studentButton: 'Apply via WhatsApp',
    heroEyebrow: 'Education outsourcing from Tunisia',
    heroTitleLine1: 'Outsource your student',
    heroTitleLine2: 'recruitment operations',
    heroDescription: 'We help universities, language centres, and education agencies scale lead response, admissions follow-up, applicant qualification, and multilingual conversion teams from Tunisia.',
    heroPrimary: 'Book a strategy demo',
    heroSecondary: 'Get a WhatsApp audit',
    stats1Label: 'English, French & Arabic support',
    stats2Label: 'Cost-efficient offshore delivery',
    stats3Label: 'Fast response-time workflows',
    whyTitle: 'Why education teams outsource to Tunisia',
    whyIntro: 'Build a dedicated extension of your admissions or agency team without the hiring delays, salary load, or management overhead of recruiting locally.',
    whyPoint1Title: 'Multilingual front-line teams',
    whyPoint1Desc: 'Support prospects and applicants in English, French, and Arabic across WhatsApp, calls, email, and CRM workflows.',
    whyPoint2Title: 'Compliance-minded delivery',
    whyPoint2Desc: 'Structured follow-up, documented processes, and quality assurance aligned with education recruitment operations.',
    whyPoint3Title: 'Timezone and cost advantage',
    whyPoint3Desc: 'Operate near Europe and the Gulf with significantly lower staffing costs than building the same capability in-house.',
    servicesTitle: 'What we can outsource for your institution',
    pricingTitle: 'Flexible engagement models',
    ctaTitle: 'Need a Tunisia-based admissions and conversion team?',
    ctaText: 'Book a live walkthrough to see how EduGrowth can support universities, language centres, and agencies with scalable student recruitment operations.',
    ctaPrimary: 'Book Demo',
    ctaSecondary: 'WhatsApp Now',
  },
  fr: {
    gateTitle: 'Choisissez votre portail',
    gateSubtitle: "Accédez à Abroad Zone pour l'accompagnement étudiant ou à EduGrowth pour l'externalisation éducative depuis la Tunisie.",
    gateStudent: 'Abroad Zone',
    gateB2B: 'EduGrowth B2B',
    navServices: 'Services',
    navPricing: 'Tarifs',
    navPortal: 'Portail',
    navDemo: 'Réserver une démo',
    navResults: 'Pourquoi la Tunisie',
    studentEyebrow: 'Abroad Zone',
    studentTitle: "Un accompagnement study abroad simple et guidé pour les étudiants.",
    studentDescription: "Découvrez les destinations, comparez les programmes et recevez un accompagnement pratique sur WhatsApp pour les candidatures, l'alternance, l'Ausbildung et les études à l'étranger.",
    studentButton: 'Postuler via WhatsApp',
    heroEyebrow: 'Externalisation éducative depuis la Tunisie',
    heroTitleLine1: 'Externalisez vos opérations de',
    heroTitleLine2: 'recrutement étudiant',
    heroDescription: "Nous aidons les universités, centres de langue et agences d'éducation à développer la réponse aux leads, le suivi admissions, la qualification des candidats et la conversion multilingue depuis la Tunisie.",
    heroPrimary: 'Réserver une démo stratégique',
    heroSecondary: 'Recevoir un audit WhatsApp',
    stats1Label: 'Support en anglais, français et arabe',
    stats2Label: 'Livraison offshore rentable',
    stats3Label: 'Workflows de réponse rapides',
    whyTitle: 'Pourquoi externaliser en Tunisie',
    whyIntro: "Créez une extension dédiée de votre équipe admissions ou agency sans les délais de recrutement, la masse salariale et la complexité d'une équipe interne.",
    whyPoint1Title: 'Équipes multilingues en première ligne',
    whyPoint1Desc: 'Accompagnement des prospects et candidats en anglais, français et arabe sur WhatsApp, appels, email et CRM.',
    whyPoint2Title: 'Exécution structurée et conforme',
    whyPoint2Desc: 'Suivis organisés, processus documentés et assurance qualité adaptés aux opérations de recrutement éducatif.',
    whyPoint3Title: 'Avantage fuseau horaire et coûts',
    whyPoint3Desc: "Servez l'Europe et le Golfe avec des coûts nettement inférieurs à ceux d'un recrutement local interne.",
    servicesTitle: 'Ce que nous pouvons externaliser pour votre établissement',
    pricingTitle: 'Modèles de collaboration flexibles',
    ctaTitle: "Besoin d'une équipe admissions et conversion basée en Tunisie ?",
    ctaText: "Réservez une démonstration pour voir comment EduGrowth accompagne les universités, centres de langue et agences avec des opérations de recrutement étudiant évolutives.",
    ctaPrimary: 'Réserver une démo',
    ctaSecondary: 'WhatsApp',
  },
};

const modalBodyCopy = {
  en: 'See how our Tunisia-based team manages inquiry response times, lead qualification, CRM follow-up, and admissions coordination for partner institutions.',
  fr: "Découvrez comment notre équipe basée en Tunisie gère la rapidité de réponse, la qualification des leads, le suivi CRM et la coordination des admissions pour les établissements partenaires.",
};

const resultsCards = {
  en: [
    {
      icon: Globe2,
      title: 'Multilingual outreach',
      desc: 'Run student conversations in English, French, and Arabic across WhatsApp, phone, and email.',
    },
    {
      icon: ShieldCheck,
      title: 'Structured admissions workflows',
      desc: 'Keep every enquiry, application, and follow-up tracked with documented processes and QA checkpoints.',
    },
    {
      icon: Clock3,
      title: 'Faster team deployment',
      desc: 'Launch a trained outsourced team faster than hiring, onboarding, and managing in-house recruiters.',
    },
  ],
  fr: [
    {
      icon: Globe2,
      title: 'Prospection multilingue',
      desc: 'Gérez les conversations étudiantes en anglais, français et arabe via WhatsApp, téléphone et email.',
    },
    {
      icon: ShieldCheck,
      title: "Workflows d'admission structurés",
      desc: 'Suivez chaque lead, candidature et relance avec des process documentés et des contrôles qualité.',
    },
    {
      icon: Clock3,
      title: 'Déploiement plus rapide',
      desc: "Lancez une équipe externalisée formée plus vite qu'un recrutement interne complet.",
    },
  ],
};

const Modal = ({ isOpen, onClose, title, lang }) => {
  if (!isOpen) return null;

  const whatsappText =
    lang === 'fr'
      ? "Bonjour, je souhaite réserver une démonstration EduGrowth."
      : 'Hello, I would like to book an EduGrowth demo.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[28px] border border-slate-200 bg-white p-7 shadow-2xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#005A9C]">
              Live walkthrough
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-900">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close demo modal"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-6 text-sm leading-7 text-slate-600">{modalBodyCopy[lang]}</p>

        <div className="mb-6 grid gap-3 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700 sm:grid-cols-3">
          <div>
            <div className="font-black text-slate-900">{'< 5 min'}</div>
            <div>lead response flow</div>
          </div>
          <div>
            <div className="font-black text-slate-900">3 languages</div>
            <div>EN · FR · AR</div>
          </div>
          <div>
            <div className="font-black text-slate-900">CRM ready</div>
            <div>pipeline visibility</div>
          </div>
        </div>

        <button
          onClick={() =>
            window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(whatsappText)}`, '_blank')
          }
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#005A9C] px-6 py-3.5 font-black text-white transition hover:bg-blue-700"
        >
          <Send size={18} /> WhatsApp demo request
        </button>
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState(null);
  const [lang, setLang] = useState('en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [showPortalSelector, setShowPortalSelector] = useState(true);

  useEffect(() => {
    const savedView = localStorage.getItem('currentView');
    const savedLang = localStorage.getItem('lang');

    setLang(savedLang || 'en');
  }, []);

  useEffect(() => {
    localStorage.setItem('currentView', currentView);
    localStorage.setItem('lang', lang);
  }, [currentView, lang]);

  const openDemo = (title) => {
    setModalTitle(`Live Demo - ${title}`);
    setIsModalOpen(true);
  };

  const t = translations[lang];
  const whyCards = resultsCards[lang];

  if (showPortalSelector || !currentView) {
    return (
      <HelmetProvider>
        <SEOHelmet {...gateSEOData} />
        <PortalSelector
          isOpen={true}
          onClose={() => setShowPortalSelector(false)}
          onSelect={(view) => {
            navigate(view === 'student' ? '/abroad-zone' : '/outsourcing');
          }}
          translations={translations}
          lang={lang}
        />
      </HelmetProvider>
    );
  }

  if (currentView === 'student') {
    return (
      <HelmetProvider>
        <SEOHelmet {...studentSEOData} />
        <div className="min-h-screen scroll-smooth bg-white font-sans text-gray-900">
          <Navbar
            lang={lang}
            setLang={setLang}
            translations={translations}
            onOpenPortalSelector={() => setShowPortalSelector(true)}
          />
          <div className="mx-auto max-w-6xl px-6 py-12">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <span className="inline-flex rounded-full bg-blue-50 px-4 py-1 text-xs font-black uppercase tracking-[0.24em] text-[#005A9C]">
                {t.studentEyebrow}
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
                {t.studentTitle}
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">{t.studentDescription}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {destinationsData.map((dest, i) => (
                <div
                  key={i}
                  className="group cursor-pointer rounded-3xl border border-slate-100 bg-white p-8 transition-all hover:-translate-y-2 hover:shadow-2xl"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Interested in ${dest.name}`)}`,
                      '_blank'
                    )
                  }
                >
                  <img
                    src={dest.img}
                    alt={dest.name}
                    className="mb-6 h-48 w-full rounded-2xl object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <h3 className="mb-3 text-2xl font-black">{dest.name}</h3>
                  <p className="mb-6 text-slate-600">{dest.desc}</p>
                  <button className="w-full rounded-2xl bg-[#005A9C] px-6 py-3 font-black text-white transition hover:bg-blue-700">
                    {t.studentButton}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <SEOHelmet {...b2bSEOData} />
      <div className="min-h-screen scroll-smooth bg-[#FDFDFF] font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
        <Navbar
          onOpenDemo={() => openDemo(t.navDemo)}
          lang={lang}
          setLang={setLang}
          translations={translations}
          onOpenPortalSelector={() => setShowPortalSelector(true)}
        />

        {/* full b2b JSX same as App.jsx */}
        <section className="bg-gradient-to-r from-[#005A9C]/5 via-sky-50 to-emerald-500/5 pb-24 pt-24">
          {/* ... full hero */}
        </section>

        <section id="results" className="bg-slate-950 py-24 text-white">
          {/* ... full why */}
        </section>

        <section id="services" className="bg-white py-24">
          {/* ... full services */}
        </section>

        <section id="pricing" className="bg-gray-50 py-24">
          {/* ... full pricing */}
        </section>

        <section className="bg-gradient-to-r from-[#005A9C] to-blue-900 py-24 text-white">
          {/* ... full CTA */}
        </section>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalTitle} lang={lang} />
      </div>
    </HelmetProvider>
  );
};

export default HomePage;
