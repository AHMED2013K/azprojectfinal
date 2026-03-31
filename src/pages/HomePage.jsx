import React, { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import PortalSelector from '../components/PortalSelector';
import SEOHelmet from '../components/SEOHelmet';
import { useLanguage } from '../context/LanguageContext.jsx';

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
  const [showPortalSelector, setShowPortalSelector] = useState(true);

  if (showPortalSelector) {
    return (
      <HelmetProvider>
        <SEOHelmet {...gateSEOData} lang={lang} />
        <PortalSelector
          isOpen={true}
          onClose={() => setShowPortalSelector(false)}
          onSelect={(view) => {
            if (view === 'student') {
              navigate('/abroad-zone');
            } else {
              navigate('/outsourcing');
            }
          }}
          translations={translations}
          lang={lang}
        />
      </HelmetProvider>
    );
  }

  // This should not be reached since we navigate away
  return null;
};

export default HomePage;

