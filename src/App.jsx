import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AbroadZonePage from './pages/AbroadZonePage.jsx';
import EduGrowthOutsourcingPage from './pages/EduGrowthOutsourcingPage.jsx';
import BookConsultationPage from './pages/BookConsultationPage.jsx';
import CountryGuidePage from './pages/CountryGuidePage.jsx';
import CityLandingPage from './pages/CityLandingPage.jsx';
import BlogHubPage from './pages/BlogHubPage.jsx';
import BlogArticlePage from './pages/BlogArticlePage.jsx';
import OutsourcingServicePage from './pages/OutsourcingServicePage.jsx';
import ProgramGuidePage from './pages/ProgramGuidePage.jsx';
import OutsourcingCityPage from './pages/OutsourcingCityPage.jsx';
import AdsStudyAbroadPage from './pages/AdsStudyAbroadPage.jsx';
import AdsOutsourcingPage from './pages/AdsOutsourcingPage.jsx';
import ThankYouPage from './pages/ThankYouPage.jsx';
import StickyCTA from './components/StickyCTA.jsx';
import ExitIntentPopup from './components/ExitIntentPopup.jsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/abroad-zone" element={<AbroadZonePage />} />
        <Route path="/outsourcing" element={<EduGrowthOutsourcingPage />} />
        <Route path="/book-consultation" element={<BookConsultationPage />} />

        <Route path="/etudier-en-france-depuis-tunisie" element={<CountryGuidePage />} />
        <Route path="/etudier-en-allemagne-depuis-tunisie" element={<CountryGuidePage />} />
        <Route path="/etudier-au-canada-depuis-tunisie" element={<CountryGuidePage />} />
        <Route path="/etudier-a-chypre-depuis-tunisie" element={<CountryGuidePage />} />
        <Route path="/etudier-en-turquie-depuis-tunisie" element={<CountryGuidePage />} />
        <Route path="/etudier-a-dubai-depuis-tunisie" element={<CountryGuidePage />} />

        <Route path="/agence-etude-etranger-tunis" element={<CityLandingPage />} />
        <Route path="/agence-etude-etranger-sousse" element={<CityLandingPage />} />
        <Route path="/agence-etude-etranger-sfax" element={<CityLandingPage />} />

        <Route path="/outsourcing-tunis" element={<OutsourcingCityPage />} />
        <Route path="/outsourcing-sousse" element={<OutsourcingCityPage />} />
        <Route path="/outsourcing-sfax" element={<OutsourcingCityPage />} />

        <Route path="/programmes/alternance-france" element={<ProgramGuidePage />} />
        <Route path="/programmes/ausbildung-allemagne" element={<ProgramGuidePage />} />

        <Route path="/education-outsourcing-tunisia" element={<OutsourcingServicePage />} />
        <Route path="/student-recruitment-outsourcing" element={<OutsourcingServicePage />} />
        <Route path="/externalisation-services-tunisie" element={<OutsourcingServicePage />} />

        <Route path="/blog" element={<BlogHubPage />} />
        <Route path="/blog/comment-etudier-en-france-depuis-la-tunisie" element={<BlogArticlePage />} />
        <Route path="/blog/cout-des-etudes-a-l-etranger" element={<BlogArticlePage />} />
        <Route path="/blog/visa-etudiant-guide" element={<BlogArticlePage />} />
        <Route path="/blog/pourquoi-externaliser-ses-admissions" element={<BlogArticlePage />} />
        <Route path="/blog/outsourcing-tunisie-avantages" element={<BlogArticlePage />} />
        <Route path="/blog/top-pays-pour-etudier" element={<BlogArticlePage />} />

        <Route path="/lp/study-abroad" element={<AdsStudyAbroadPage />} />
        <Route path="/lp/outsourcing" element={<AdsOutsourcingPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />

        <Route path="*" element={<HomePage />} />
      </Routes>
      <StickyCTA />
      <ExitIntentPopup />
    </>
  );
}
