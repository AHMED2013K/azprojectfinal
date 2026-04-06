import React, { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import PortalSelector from '../components/PortalSelector';
import SEOHelmet from '../components/SEOHelmet';
import { useLanguage } from '../context/LanguageContext.jsx';
import { testimonials } from '../components/data.js';

const WA_NUMBER = '21656590703';

const gateSEOData = {
  title: "EduGrowth Tunisia | Étudier à l'étranger & Outsourcing Services",
  description: "EduGrowth combine agence étude à l'étranger en Tunisie et services d'outsourcing éducatif. Accompagnement étudiants + externalisation admissions pour institutions.",
  canonical: 'https://edugrowth.tn/',
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

const HomePage = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState(null);

  if (selectedView === null) {
    return (
      <HelmetProvider>
        <SEOHelmet {...gateSEOData} lang={lang} />
        <PortalSelector
          isOpen={true}
          onClose={() => setSelectedView('student')} // Default to student or something
          onSelect={(view) => setSelectedView(view)}
          translations={translations}
          lang={lang}
        />
      </HelmetProvider>
    );
  }

  if (selectedView === 'student') {
    navigate('/abroad-zone');
    return null;
  }

  if (selectedView === 'b2b') {
    const t = translations[lang];
    return (
      <HelmetProvider>
        <SEOHelmet {...gateSEOData} lang={lang} />
        <div>
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <div className="mb-6">
                <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  {t.heroEyebrow}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                {t.heroTitleLine1}<br />
                <span className="text-blue-600">{t.heroTitleLine2}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {t.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  {t.heroPrimary}
                </button>
                <button className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  {t.heroSecondary}
                </button>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-black text-gray-900 mb-2">{t.stats1Label}</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-gray-900 mb-2">{t.stats2Label}</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-gray-900 mb-2">{t.stats3Label}</div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">{t.whyTitle}</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.whyIntro}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t.whyPoint1Title}</h3>
                  <p className="text-gray-600">{t.whyPoint1Desc}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t.whyPoint2Title}</h3>
                  <p className="text-gray-600">{t.whyPoint2Desc}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{t.whyPoint3Title}</h3>
                  <p className="text-gray-600">{t.whyPoint3Desc}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">{t.servicesTitle}</h2>
              <p className="text-xl text-gray-600">Services content here...</p>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">What Our Clients Say</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-blue-600 text-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-6">{t.ctaTitle}</h2>
              <p className="text-xl mb-8">{t.ctaText}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {t.ctaPrimary}
                </button>
                <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  {t.ctaSecondary}
                </button>
              </div>
            </div>
          </section>
        </div>
      </HelmetProvider>
    );
  }

  return null;
};

export default HomePage;

