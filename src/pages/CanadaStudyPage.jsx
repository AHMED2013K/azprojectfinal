import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, MessageSquare, Home as HomeIcon, Globe2, Zap, Mail, Phone, ArrowRight, GraduationCap, Building2, Clock, DollarSign, MapPin, BookOpen } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { trackEvent } from '../utils/tracking';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

const canadaStudyStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Étudier au Canada pour les Tunisiens",
      "serviceType": "Accompagnement études Canada",
      "provider": {
        "@type": "Organization",
        "name": "EduGrowth Outsourcing",
        "url": "https://edugrowth.tn/"
      },
      "areaServed": ["Tunisia", "Canada"],
      "availableLanguage": ["French", "Arabic", "English"],
      "description": "Guide complet pour étudier au Canada depuis la Tunisie: permis d'études, admissions, financement et installation."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Comment étudier au Canada depuis la Tunisie ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Obtenez une admission d'un établissement canadien, prouvez vos fonds et demandez votre permis d'études."
          }
        },
        {
          "@type": "Question",
          "name": "Quel est le coût des études au Canada pour un Tunisien ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "15 000-30 000 CAD/an selon la province et le programme. Coûts de vie: 800-1200 CAD/mois."
          }
        },
        {
          "@type": "Question",
          "name": "Comment obtenir un permis d'études Canada depuis la Tunisie ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Admission préalable, preuve de fonds (10 000 CAD minimum), assurance santé et biométrie."
          }
        }
      ]
    }
  ]
};

const translations = {
  fr: {
    heroTitle: "Étudier au Canada pour les Tunisiens : Guide Complet 2026",
    heroSubtitle: "Accompagnement expert pour votre projet d'études au Canada. De l'admission à l'installation, nous vous guidons.",
    heroCTA: "Commencer ma demande de permis d'études",
    heroSecondary: "Estimer mon budget",

    processTitle: "Process en 4 étapes pour étudier au Canada",
    processStep1: "Choix de la province et programme",
    processStep1Desc: "Analyse de votre profil, sélection des provinces (Québec, Ontario, etc.) et programmes adaptés",
    processStep2: "Admission établissement",
    processStep2Desc: "Préparation et dépôt des dossiers d'admission, suivi des réponses",
    processStep3: "Permis d'études",
    processStep3Desc: "Constitution du dossier IRCC, biométrie et obtention du permis",
    processStep4: "Installation au Canada",
    processStep4Desc: "Logement, assurance santé, ouverture compte bancaire",

    benefitsTitle: "Pourquoi étudier au Canada depuis la Tunisie ?",
    benefit1Title: "Qualité d'enseignement",
    benefit1Desc: "Universités et collèges parmi les meilleurs au monde",
    benefit2Title: "Opportunités d'immigration",
    benefit2Desc: "Voie vers la résidence permanente après les études",
    benefit3Title: "Coûts abordables",
    benefit3Desc: "Frais de scolarité compétitifs comparés aux USA/UK",
    benefit4Title: "Environnement bilingue",
    benefit4Desc: "Possibilité d'étudier en français (Québec) ou anglais",

    costsTitle: "Budget études au Canada : Prévision réaliste",
    costCategory1: "Frais de scolarité",
    costCategory1Desc: "15 000-30 000 CAD/an selon province et programme",
    costCategory2: "Logement",
    costCategory2Desc: "400-800 CAD/mois en résidence, 600-1200 CAD en appartement",
    costCategory3: "Alimentation & Transport",
    costCategory3Desc: "300-500 CAD/mois selon le mode de vie",
    costCategory4: "Assurance & Divers",
    costCategory4Desc: "600 CAD/an assurance santé + frais administratifs",

    provincesTitle: "Top provinces pour étudiants tunisiens",
    quebecTitle: "Québec",
    quebecDesc: "Études en français, frais modérés, forte communauté tunisienne",
    ontarioTitle: "Ontario",
    ontarioDesc: "Toronto: opportunités professionnelles, études en anglais",
    britishColumbiaTitle: "Colombie-Britannique",
    britishColumbiaDesc: "Vancouver: qualité de vie exceptionnelle, nature",

    ctaTitle: "Prêt à étudier au Canada ?",
    ctaText: "Notre équipe vous accompagne pour maximiser vos chances d'admission et faciliter votre installation.",
    ctaPrimary: "Commencer maintenant",
    ctaSecondary: "WhatsApp direct"
  }
};

const CanadaStudyPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;

  const handleCTA = () => {
    trackEvent('generate_lead', {
      lead_source: 'canada_study_page',
      page_location: '/etudier-au-canada-tunisie',
      value: 1,
      currency: 'CAD',
    });
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite étudier au Canada depuis la Tunisie. Pouvez-vous m'aider ?")}`, '_blank');
  };

  return (
    <>
      <SEOHelmet
        title="Étudier au Canada pour les Tunisiens | Guide Complet Permis d'Études 2026"
        description="Étudier au Canada depuis la Tunisie : admissions, permis d'études, financement et installation. Guide complet pour étudiants tunisiens."
        canonical="https://edugrowth.tn/etudier-au-canada-tunisie"
        structuredData={canadaStudyStructuredData}
        lang="fr"
      />

      <div className="min-h-screen bg-white font-sans text-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-50 to-blue-100 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCTA}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                {t.heroCTA}
              </button>
              <button className="border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                {t.heroSecondary}
              </button>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-black text-center mb-12">{t.processTitle}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-600">1</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{t.processStep1}</h3>
                <p className="text-gray-600">{t.processStep1Desc}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-600">2</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{t.processStep2}</h3>
                <p className="text-gray-600">{t.processStep2Desc}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-600">3</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{t.processStep3}</h3>
                <p className="text-gray-600">{t.processStep3Desc}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-red-600">4</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{t.processStep4}</h3>
                <p className="text-gray-600">{t.processStep4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-black text-center mb-12">{t.benefitsTitle}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <GraduationCap className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">{t.benefit1Title}</h3>
                <p className="text-gray-600">{t.benefit1Desc}</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <MapPin className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">{t.benefit2Title}</h3>
                <p className="text-gray-600">{t.benefit2Desc}</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <DollarSign className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">{t.benefit3Title}</h3>
                <p className="text-gray-600">{t.benefit3Desc}</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <BookOpen className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">{t.benefit4Title}</h3>
                <p className="text-gray-600">{t.benefit4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Provinces Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-black text-center mb-12">{t.provincesTitle}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
                <h3 className="font-bold text-2xl mb-4 text-blue-800">{t.quebecTitle}</h3>
                <p className="text-blue-700">{t.quebecDesc}</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-lg">
                <h3 className="font-bold text-2xl mb-4 text-red-800">{t.ontarioTitle}</h3>
                <p className="text-red-700">{t.ontarioDesc}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg">
                <h3 className="font-bold text-2xl mb-4 text-green-800">{t.britishColumbiaTitle}</h3>
                <p className="text-green-700">{t.britishColumbiaDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Costs Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-black text-center mb-12">{t.costsTitle}</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="font-bold text-lg mb-2">{t.costCategory1}</h3>
                <p className="text-gray-600">{t.costCategory1Desc}</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="font-bold text-lg mb-2">{t.costCategory2}</h3>
                <p className="text-gray-600">{t.costCategory2Desc}</p>
              </div>
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="font-bold text-lg mb-2">{t.costCategory3}</h3>
                <p className="text-gray-600">{t.costCategory3Desc}</p>
              </div>
              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="font-bold text-lg mb-2">{t.costCategory4}</h3>
                <p className="text-gray-600">{t.costCategory4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-red-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black mb-6">{t.ctaTitle}</h2>
            <p className="text-xl mb-8 opacity-90">{t.ctaText}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCTA}
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                {t.ctaPrimary}
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                {t.ctaSecondary}
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CanadaStudyPage;