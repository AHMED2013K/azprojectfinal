import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';

// Lazy loading all pages for better initial loading performance
const AbroadZonePage = lazy(() => import('./pages/AbroadZonePage.jsx'));
const EduGrowthOutsourcingPage = lazy(() => import('./pages/EduGrowthOutsourcingPage.jsx'));
const BookConsultationPage = lazy(() => import('./pages/BookConsultationPage.jsx'));
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
const CanadaStudyPage = lazy(() => import('./pages/CanadaStudyPage.jsx'));
const CustomerServiceOutsourcingPage = lazy(() => import('./pages/CustomerServiceOutsourcingPage.jsx'));
const CostCalculatorPage = lazy(() => import('./pages/CostCalculatorPage.jsx'));
const OutsourcingTunisiaPage = lazy(() => import('./pages/OutsourcingTunisiaPage.jsx'));

const StickyCTA = lazy(() => import('./components/StickyCTA.jsx'));
const ExitIntentPopup = lazy(() => import('./components/ExitIntentPopup.jsx'));

// Simple loading fallback
const LoadingFallback = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500/30 border-t-blue-400"></div>
      <div className="text-white/60 text-sm font-medium">Loading EduGrowth...</div>
    </div>
  </div>
);

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<LoadingFallback />}>
            <HomePage />
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<LoadingFallback />}>
            <HomePage />
          </Suspense>
        } />
        
        <Route path="/abroad-zone" element={<Suspense fallback={<LoadingFallback />}><AbroadZonePage /></Suspense>} />
        <Route path="/outsourcing" element={<Suspense fallback={<LoadingFallback />}><EduGrowthOutsourcingPage /></Suspense>} />
        <Route path="/book-consultation" element={<Suspense fallback={<LoadingFallback />}><BookConsultationPage /></Suspense>} />

        <Route path="/etudier-en-france-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><FranceStudyPage /></Suspense>} />
        <Route path="/etudier-en-allemagne-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-au-canada-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CanadaStudyPage /></Suspense>} />
        <Route path="/etudier-a-chypre-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-en-turquie-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />
        <Route path="/etudier-a-dubai-depuis-tunisie" element={<Suspense fallback={<LoadingFallback />}><CountryGuidePage /></Suspense>} />

        <Route path="/agence-etude-etranger-tunis" element={<Suspense fallback={<LoadingFallback />}><CityLandingPage /></Suspense>} />
        <Route path="/agence-etude-etranger-sousse" element={<Suspense fallback={<LoadingFallback />}><CityLandingPage /></Suspense>} />
        <Route path="/agence-etude-etranger-sfax" element={<Suspense fallback={<LoadingFallback />}><CityLandingPage /></Suspense>} />

        <Route path="/outsourcing-tunis" element={<Suspense fallback={<LoadingFallback />}><OutsourcingCityPage /></Suspense>} />
        <Route path="/outsourcing-sousse" element={<Suspense fallback={<LoadingFallback />}><OutsourcingCityPage /></Suspense>} />
        <Route path="/outsourcing-sfax" element={<Suspense fallback={<LoadingFallback />}><OutsourcingCityPage /></Suspense>} />

        <Route path="/programmes/alternance-france" element={<Suspense fallback={<LoadingFallback />}><ProgramGuidePage /></Suspense>} />
        <Route path="/programmes/ausbildung-allemagne" element={<Suspense fallback={<LoadingFallback />}><ProgramGuidePage /></Suspense>} />

        <Route path="/education-outsourcing-tunisia" element={<Suspense fallback={<LoadingFallback />}><OutsourcingServicePage /></Suspense>} />
        <Route path="/student-recruitment-outsourcing" element={<Suspense fallback={<LoadingFallback />}><OutsourcingServicePage /></Suspense>} />
        <Route path="/externalisation-services-tunisie" element={<Suspense fallback={<LoadingFallback />}><OutsourcingServicePage /></Suspense>} />

        <Route path="/outsource-customer-service-tunisia" element={<Suspense fallback={<LoadingFallback />}><CustomerServiceOutsourcingPage /></Suspense>} />

        <Route path="/outsourcing-cost-calculator" element={<Suspense fallback={<LoadingFallback />}><CostCalculatorPage /></Suspense>} />

        <Route path="/outsourcing-tunisia" element={<Suspense fallback={<LoadingFallback />}><OutsourcingTunisiaPage /></Suspense>} />

        <Route path="/blog" element={<Suspense fallback={<LoadingFallback />}><BlogHubPage /></Suspense>} />
        <Route path="/blog/comment-etudier-en-france-depuis-la-tunisie" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/cout-des-etudes-a-l-etranger" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
        <Route path="/blog/visa-etudiant-guide" element={<Suspense fallback={<LoadingFallback />}><BlogArticlePage /></Suspense>} />
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
