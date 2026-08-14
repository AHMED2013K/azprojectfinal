import React, { Suspense, lazy, useEffect } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import StudentHomePage from './pages/StudentHomePage.jsx';
import PortalGatePage from './pages/PortalGatePage.jsx';
import { initMarketing, trackPageView } from './utils/marketing.js';

// Lazy loading all pages for better initial loading performance
const AbroadZonePage = lazy(() => import('./pages/AbroadZonePage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const EduGrowthOutsourcingPage = lazy(() => import('./pages/EduGrowthOutsourcingPage.jsx'));
const BookConsultationPage = lazy(() => import('./pages/BookConsultationPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const PartnersPage = lazy(() => import('./pages/PartnersPage.jsx'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage.jsx'));
const DeferredAdmissionPage = lazy(() => import('./pages/DeferredAdmissionPage.jsx'));
const SeasonalIntakePage = lazy(() => import('./pages/SeasonalIntakePage.jsx'));
const UniversityPartnersPage = lazy(() => import('./pages/UniversityPartnersPage.jsx'));
const UniversityRecruitmentAgencyPage = lazy(() => import('./pages/UniversityRecruitmentAgencyPage.jsx'));
const BecomePartnerPage = lazy(() => import('./pages/BecomePartnerPage.jsx'));
const GoogleReviewPage = lazy(() => import('./pages/GoogleReviewPage.jsx'));
const CountryGuidePage = lazy(() => import('./pages/CountryGuidePage.jsx'));
const CityLandingPage = lazy(() => import('./pages/CityLandingPage.jsx'));
const BlogHubPage = lazy(() => import('./pages/BlogHubPage.jsx'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage.jsx'));
const OutsourcingServicePage = lazy(() => import('./pages/OutsourcingServicePage.jsx'));
const ProgramGuidePage = lazy(() => import('./pages/ProgramGuidePage.jsx'));
const OutsourcingCityPage = lazy(() => import('./pages/OutsourcingCityPage.jsx'));
const AdsStudyAbroadPage = lazy(() => import('./pages/AdsStudyAbroadPage.jsx'));
const AdsOutsourcingPage = lazy(() => import('./pages/AdsOutsourcingPage.jsx'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage.jsx'));
const FranceStudyPage = lazy(() => import('./pages/FranceStudyPage.jsx'));
const AlternanceFranceTunisiensPage = lazy(() => import('./pages/AlternanceFranceTunisiensPage.jsx'));
const AlternanceFrancePage = lazy(() => import('./pages/AlternanceFrancePage.jsx'));
const StudyInNorthCyprusPage = lazy(() => import('./pages/StudyInNorthCyprusPage.jsx'));
const CampusFranceTunisieGuidePage = lazy(() => import('./pages/CampusFranceTunisieGuidePage.jsx'));
const CanadaStudyPage = lazy(() => import('./pages/CanadaStudyPage.jsx'));
const CustomerServiceOutsourcingPage = lazy(() => import('./pages/CustomerServiceOutsourcingPage.jsx'));
const CostCalculatorPage = lazy(() => import('./pages/CostCalculatorPage.jsx'));
const OutsourcingTunisiaPage = lazy(() => import('./pages/OutsourcingTunisiaPage.jsx'));
const SeoPillarPage = lazy(() => import('./pages/SeoPillarPage.jsx'));
const SeoTopicGuidePage = lazy(() => import('./pages/SeoTopicGuidePage.jsx'));
const GeoKnowledgeBasePage = lazy(() => import('./pages/GeoKnowledgeBasePage.jsx'));
const ProgrammaticSeoPage = lazy(() => import('./pages/ProgrammaticSeoPage.jsx'));
const StudyAbroadEncyclopediaPage = lazy(() => import('./pages/StudyAbroadEncyclopediaPage.jsx'));
const ArabicGuidancePage = lazy(() => import('./pages/ArabicGuidancePage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

const StickyCTA = lazy(() => import('./components/StickyCTA.jsx'));
const ExitIntentPopup = lazy(() => import('./components/ExitIntentPopup.jsx'));

// Simple loading fallback
const LoadingFallback = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-400"></div>
      <div className="text-slate-700 text-sm font-medium">Loading EduGrowth...</div>
    </div>
  </div>
);

function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    initMarketing();
  }, []);

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}${location.hash}`);
  }, [location]);

  return null;
}

export default function App() {
  return (
    <>
      <RouteTracker />
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<LoadingFallback />}>
            <StudentHomePage />
          </Suspense>
        } />
        <Route path="/home" element={
          <Suspense fallback={<LoadingFallback />}>
            <StudentHomePage />
          </Suspense>
        } />
        <Route path="/portal" element={
          <Suspense fallback={<LoadingFallback />}>
            <PortalGatePage />
          </Suspense>
        } />
        <Route path="*" element={<Suspense fallback={<LoadingFallback />}><NotFoundPage /></Suspense>} />
        
        <Route path="/abroad-zone" element={<Suspense fallback={<LoadingFallback />}><AbroadZonePage /></Suspense>} />
        <Route path="/about" element={<Suspense fallback={<LoadingFallback />}><AboutPage /></Suspense>} />
        <Route path="/outsourcing" element={<Suspense fallback={<LoadingFallback />}><EduGrowthOutsourcingPage /></Suspense>} />
        <Route path="/ousourcing" element={<Suspense fallback={<LoadingFallback />}><EduGrowthOutsourcingPage /></Suspense>} />
        <Route path="/outourcing" element={<Suspense fallback={<LoadingFallback />}><EduGrowthOutsourcingPage /></Suspense>} />
        <Route path="/book-consultation" element={<Suspense fallback={<LoadingFallback />}><BookConsultationPage /></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<LoadingFallback />}><ContactPage /></Suspense>} />
        <Route path="/partners" element={<Suspense fallback={<LoadingFallback />}><PartnersPage /></Suspense>} />
        <Route path="/resources" element={<Suspense fallback={<LoadingFallback />}><ResourcesPage /></Suspense>} />
        <Route path="/rentree-decalee-2026-2027" element={<Suspense fallback={<LoadingFallback />}><DeferredAdmissionPage /></Suspense>} />
        <Route path="/rentree-novembre-2026-russie-tunisie" element={<Suspense fallback={<LoadingFallback />}><SeasonalIntakePage /></Suspense>} />
        <Route path="/rentree-decalee-janvier-fevrier-2027-chypre-nord" element={<Suspense fallback={<LoadingFallback />}><SeasonalIntakePage /></Suspense>} />
        <Route path="/partenaires-universites" element={<Suspense fallback={<LoadingFallback />}><UniversityPartnersPage /></Suspense>} />
        <Route path="/agence-recrutement-etudiants-afrique-du-nord" element={<Suspense fallback={<LoadingFallback />}><UniversityRecruitmentAgencyPage /></Suspense>} />
        <Route path="/devenir-partenaire" element={<Suspense fallback={<LoadingFallback />}><BecomePartnerPage /></Suspense>} />
        <Route path="/avis-google" element={<Suspense fallback={<LoadingFallback />}><GoogleReviewPage /></Suspense>} />

        <Route path="/fr/etudier-a-l-etranger-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />
        <Route path="/fr/etudier-a-l-etranger-depuis-tunis" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />
        <Route path="/fr/etudier-medecine-pharmacie-etranger" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />
        <Route path="/fr/medecine-privee-tunisie" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />
        <Route path="/fr/licence-privee-tunisie" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />
        <Route path="/fr/mastere-prive-tunisie" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />
        <Route path="/visa-etudiant-tunisie" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />
        <Route path="/bourses-etudes-tunisiens" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />
        <Route path="/comparatif-pays-etudes-etranger-tunisie" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />
        <Route path="/etudier-en-europe-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />
        <Route path="/apres-bac-etudier-a-l-etranger" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />
        <Route path="/parents-etudes-etranger-tunisie" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />
        <Route path="/encyclopedie-etudes-etranger-tunisie" element={<Suspense fallback={<LoadingFallback />}><StudyAbroadEncyclopediaPage /></Suspense>} />
        <Route path="/ar/tawjih-dirasa-kharij-tunisia" element={<Suspense fallback={<LoadingFallback />}><ArabicGuidancePage /></Suspense>} />
        <Route path="/ai-knowledge-base" element={<Suspense fallback={<LoadingFallback />}><GeoKnowledgeBasePage /></Suspense>} />
        <Route path="/orientation-etudiant-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/agence-orientation-etudiant-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/admission-universite-etranger-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/documents-etudier-etranger-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/budget-etudes-etranger-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/logement-etudiant-etranger-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/parents-etudiant-etranger-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/campus-france-tunisie-dossier" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/visa-etudiant-france-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/alternance-france-tunisiens" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/bac-etudes-etranger-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/licence-etudes-etranger-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/master-etudes-etranger-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/doctorat-etranger-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/bourses-etudiants-tunisiens-etranger" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/calendrier-rentree-universitaire-etranger-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/agence-etude-etranger-ariana" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/agence-etude-etranger-nabeul" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/agence-etude-etranger-monastir" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/agence-etude-etranger-bizerte" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/agence-etude-etranger-gabes" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/agence-etude-etranger-kairouan" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/comparer-france-canada-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/comparer-allemagne-autriche-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/comparer-roumanie-hongrie-medecine-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/etudier-etranger-petit-budget-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/orientation-apres-bts-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/orientation-apres-btp-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/orientation-apres-bac-technique-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/orientation-apres-bac-sciences-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/orientation-apres-bac-eco-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/rentre-universitaire-janvier-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgrammaticSeoPage /></Suspense>} />
        <Route path="/guides/etudier-russie-tunisie/guides/admission-universite-russie-tunisie" element={<Navigate to="/guides/admission-universite-russie-tunisie" replace />} />
        <Route path="/guides/etudier-russie-tunisie/guides/visa-etudiant-russie-tunisie" element={<Navigate to="/guides/visa-etudiant-russie-tunisie" replace />} />
        <Route path="/guides/etudier-russie-tunisie/guides/cout-etudier-russie-tunisie" element={<Navigate to="/guides/cout-etudier-russie-tunisie" replace />} />
        <Route path="/guides/:slug" element={<Suspense fallback={<LoadingFallback />}><SeoTopicGuidePage /></Suspense>} />
        <Route path="/cout-etudier-france-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><SeoTopicGuidePage /></Suspense>} />
        <Route path="/campus-france-tunisie-calendrier-2026-2027" element={<Suspense fallback={<LoadingFallback />}><SeoTopicGuidePage /></Suspense>} />
        <Route path="/alternance-france-tunisiens-conditions-visa" element={<Suspense fallback={<LoadingFallback />}><SeoTopicGuidePage /></Suspense>} />
        <Route path="/universites-allemagne-etudiants-tunisiens" element={<Suspense fallback={<LoadingFallback />}><SeoTopicGuidePage /></Suspense>} />
        <Route path="/visa-etudiant-espagne-tunisie" element={<Suspense fallback={<LoadingFallback />}><SeoTopicGuidePage /></Suspense>} />
        <Route path="/cout-etudier-espagne-etudiant-tunisien" element={<Suspense fallback={<LoadingFallback />}><SeoTopicGuidePage /></Suspense>} />
        <Route path="/etudier-medecine-hongrie-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><SeoTopicGuidePage /></Suspense>} />
        <Route path="/bourses-france-etudiants-tunisiens" element={<Suspense fallback={<LoadingFallback />}><SeoTopicGuidePage /></Suspense>} />
        <Route path="/logement-etudiant-allemagne-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><SeoTopicGuidePage /></Suspense>} />
        <Route path="/equivalence-diplome-tunisien-etudes-etranger" element={<Suspense fallback={<LoadingFallback />}><SeoTopicGuidePage /></Suspense>} />
        <Route path="/en/study-abroad-from-tunisia" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />
        <Route path="/en/study-abroad-from-tunis" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />
        <Route path="/en/study-medicine-pharmacy-abroad" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />
        <Route path="/en/private-medicine-tunisia" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />
        <Route path="/en/private-bachelor-tunisia" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />
        <Route path="/en/private-master-tunisia" element={<Suspense fallback={<LoadingFallback />}><SeoPillarPage /></Suspense>} />

        <Route path="/etudier-en-france-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><FranceStudyPage /></Suspense>} />
        <Route path="/study-in-north-cyprus" element={<Suspense fallback={<LoadingFallback />}><StudyInNorthCyprusPage /></Suspense>} />
        <Route path="/alternance-france" element={<Suspense fallback={<LoadingFallback />}><AlternanceFrancePage /></Suspense>} />
        <Route path="/alternance-en-france-pour-tunisiens" element={<Suspense fallback={<LoadingFallback />}><AlternanceFranceTunisiensPage /></Suspense>} />
        <Route path="/campus-france-tunisie-guide" element={<Suspense fallback={<LoadingFallback />}><CampusFranceTunisieGuidePage /></Suspense>} />
        <Route path="/etudier-en-allemagne-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-en-autriche-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-en-hongrie-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-au-canada-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CanadaStudyPage /></Suspense>} />
        <Route path="/etudier-a-chypre-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-en-turquie-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-a-dubai-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-en-roumanie-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-en-france-ecole-privee-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-en-russie-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-en-italie-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-en-espagne-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-en-chine-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-au-maroc-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-au-royaume-uni-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-aux-usa-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-en-albanie-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-en-malaisie-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-en-coree-du-sud-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-au-japon-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />

        <Route path="/agence-etude-etranger-tunis" element={<Suspense fallback={<LoadingFallback />}><CityLandingPage /></Suspense>} />
        <Route path="/agence-etude-etranger-sousse" element={<Suspense fallback={<LoadingFallback />}><CityLandingPage /></Suspense>} />
        <Route path="/agence-etude-etranger-sfax" element={<Suspense fallback={<LoadingFallback />}><CityLandingPage /></Suspense>} />

        <Route path="/outsourcing-tunis" element={<Suspense fallback={<LoadingFallback />}><OutsourcingCityPage /></Suspense>} />
        <Route path="/outsourcing-sousse" element={<Suspense fallback={<LoadingFallback />}><OutsourcingCityPage /></Suspense>} />
        <Route path="/outsourcing-sfax" element={<Suspense fallback={<LoadingFallback />}><OutsourcingCityPage /></Suspense>} />

        <Route path="/programmes/alternance-france" element={<Suspense fallback={<LoadingFallback />}><ProgramGuidePage /></Suspense>} />
        <Route path="/programmes/ausbildung-allemagne" element={<Suspense fallback={<LoadingFallback />}><ProgramGuidePage /></Suspense>} />
        <Route path="/ausbildung-sante-allemagne-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgramGuidePage /></Suspense>} />
        <Route path="/ausbildung-infirmier-allemagne-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgramGuidePage /></Suspense>} />
        <Route path="/ausbildung-aide-soignant-allemagne-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgramGuidePage /></Suspense>} />
        <Route path="/travail-etude-allemagne-tunisie" element={<Suspense fallback={<LoadingFallback />}><ProgramGuidePage /></Suspense>} />

        <Route path="/education-outsourcing-tunisia" element={<Suspense fallback={<LoadingFallback />}><OutsourcingServicePage /></Suspense>} />
        <Route path="/student-recruitment-outsourcing" element={<Suspense fallback={<LoadingFallback />}><OutsourcingServicePage /></Suspense>} />
        <Route path="/externalisation-services-tunisie" element={<Suspense fallback={<LoadingFallback />}><OutsourcingServicePage /></Suspense>} />
        <Route path="/agence-recrutement-etudiants-tunisie" element={<Suspense fallback={<LoadingFallback />}><OutsourcingServicePage /></Suspense>} />

        <Route path="/outsource-customer-service-tunisia" element={<Suspense fallback={<LoadingFallback />}><CustomerServiceOutsourcingPage /></Suspense>} />

        <Route path="/outsourcing-cost-calculator" element={<Suspense fallback={<LoadingFallback />}><CostCalculatorPage /></Suspense>} />

        <Route path="/outsourcing-tunisia" element={<Suspense fallback={<LoadingFallback />}><OutsourcingTunisiaPage /></Suspense>} />

        <Route path="/blog" element={<Suspense fallback={<LoadingFallback />}><BlogHubPage /></Suspense>} />
        <Route path="/blog/comment-etudier-en-france-depuis-la-tunisie" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/campus-france-tunisie-etapes" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/cout-des-etudes-a-l-etranger" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/visa-etudiant-guide" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/refus-visa-etudiant-france-erreurs" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/alternance-france-pour-tunisiens" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/etudier-en-allemagne-depuis-la-tunisie" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/etudier-au-canada-depuis-la-tunisie" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/bourses-etudes-etranger-tunisiens" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/entretien-campus-france-questions-reponses" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/lettre-motivation-campus-france-exemple" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/compte-bloque-allemagne-tunisie" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/quel-pays-etudier-petit-budget" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/logement-etudiant-france-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/master-france-apres-licence-tunisie" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/etudier-a-chypre-depuis-la-tunisie" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/etudier-en-turquie-depuis-la-tunisie" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/etudier-a-dubai-depuis-la-tunisie" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/documents-admission-internationale-tunisie" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/pourquoi-externaliser-ses-admissions" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/outsourcing-tunisie-avantages" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/top-pays-pour-etudier" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />

        <Route path="/blog/why-tunisia-better-than-india-outsourcing" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/cost-comparison-outsourcing-tunisia-vs-europe" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/top-benefits-outsourcing-tunisia" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/french-customer-support-outsourcing" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/hire-call-center-tunisia" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/outsourcing-tunisia-vs-india" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/outsourcing-tunisia-vs-philippines" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/visa-etudiant-france-tunisie-documents" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/ausbildung-allemagne-tunisiens-conditions" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/etudier-medecine-roumanie-tunisie" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />

        <Route path="/lp/study-abroad" element={<Suspense fallback={<LoadingFallback />}><AdsStudyAbroadPage /></Suspense>} />
        <Route path="/lp/outsourcing" element={<Suspense fallback={<LoadingFallback />}><AdsOutsourcingPage /></Suspense>} />
        <Route path="/thank-you" element={<Suspense fallback={<LoadingFallback />}><ThankYouPage /></Suspense>} />
      </Routes>
      <Suspense fallback={null}>
        <StickyCTA />
        <ExitIntentPopup />
      </Suspense>
    </>
  );
}
