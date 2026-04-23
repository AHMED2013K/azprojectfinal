import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, MessageSquare, Home as HomeIcon, Globe2, Zap, Mail, Phone, ArrowRight, GraduationCap, Building2, Clock, DollarSign, MapPin } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { trackEvent } from '../utils/tracking';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

const franceStudyStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Étudier en France depuis la Tunisie",
      "serviceType": "Accompagnement études France",
      "provider": {
        "@type": "Organization",
        "name": "EduGrowth Outsourcing",
        "url": "https://edugrowth.tn/"
      },
      "areaServed": ["Tunisia", "France"],
      "availableLanguage": ["French", "Arabic", "English"],
      "description": "Accompagnement complet pour étudier en France depuis la Tunisie: Campus France, visa étudiant, admissions et financement."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Comment étudier en France depuis la Tunisie ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Commencez par Campus France, choisissez votre formation, préparez votre dossier et obtenez votre visa étudiant."
          }
        },
        {
          "@type": "Question",
          "name": "Quel est le coût des études en France pour un Tunisien ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les frais de scolarité sont gratuits dans le public, comptez 500-1000€/mois pour vivre à Paris, moins en province."
          }
        },
        {
          "@type": "Question",
          "name": "Comment obtenir un visa étudiant France depuis la Tunisie ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Admission préalable, dossier Campus France, puis demande de visa avec justificatifs financiers et d'hébergement."
          }
        }
      ]
    }
  ]
};

const translations = {
  fr: {
    heroTitle: "Étudier en France depuis la Tunisie : Guide Complet 2026",
    heroSubtitle: "Accompagnement expert pour votre projet d'études en France. De l'orientation Campus France à l'obtention du visa étudiant.",
    heroCTA: "Commencer mon dossier Campus France",
    heroSecondary: "Estimer mon budget",

    processTitle: "Process en 4 étapes pour étudier en France",
    processStep1: "Orientation & Choix de formation",
    processStep1Desc: "Analyse de votre profil, sélection des programmes adaptés (licence, master, alternance)",
    processStep2: "Préparation Campus France",
    processStep2Desc: "Constitution du dossier, préparation aux entretiens, validation du projet",
    processStep3: "Admission & Visa",
    processStep3Desc: "Suivi des admissions, préparation du dossier visa étudiant",
    processStep4: "Installation en France",
    processStep4Desc: "Logement, ouverture compte bancaire, assurance santé",

    benefitsTitle: "Pourquoi étudier en France depuis la Tunisie ?",
    benefit1Title: "Formation d'excellence",
    benefit1Desc: "Universités et grandes écoles reconnues mondialement",
    benefit2Title: "Coûts accessibles",
    benefit2Desc: "Frais de scolarité gratuits dans le public, bourses disponibles",
    benefit3Title: "Alternance attractive",
    benefit3Desc: "Contrats en alternance rémunérés pour financer vos études",
    benefit4Title: "Proximité culturelle",
    benefit4Desc: "Facilité d'adaptation grâce à la langue et culture communes",

    costsTitle: "Budget études en France : Prévision réaliste",
    costCategory1: "Frais de scolarité",
    costCategory1Desc: "Gratuits en université publique, 2000-10000€/an en écoles privées",
    costCategory2: "Logement",
    costCategory2Desc: "300-600€/mois en résidence universitaire, 400-800€ en location",
    costCategory3: "Alimentation & Transport",
    costCategory3Desc: "200-300€/mois selon le mode de vie",
    costCategory4: "Assurance & Divers",
    costCategory4Desc: "60€/mois assurance santé + frais administratifs",

    checklistTitle: "Checklist étudiant tunisien pour la France",
    checklistItems: [
      "Choisir 3 à 5 formations cohérentes avec votre niveau et votre projet",
      "Préparer les relevés, diplômes, traductions et justificatifs financiers",
      "Structurer un calendrier Campus France, admission, logement et visa",
      "Prévoir un budget réaliste pour la province ou Paris",
    ],

    faqTitle: "FAQ études en France depuis la Tunisie",
    faq: [
      {
        q: "Quand commencer Campus France depuis la Tunisie ?",
        a: "L’idéal est de commencer 8 à 10 mois avant la rentrée pour éviter les retards sur le dossier, le financement et le visa.",
      },
      {
        q: "Combien coûte la vie étudiante en France ?",
        a: "En province, beaucoup d’étudiants visent un budget de 700 à 1000€ par mois. Paris demande souvent davantage.",
      },
      {
        q: "L’alternance est-elle possible pour un étudiant tunisien ?",
        a: "Oui, selon le programme, le niveau d’études et la capacité à décrocher un contrat avec une entreprise.",
      },
      {
        q: "EduGrowth peut-il aider pour Campus France et le visa ?",
        a: "Oui, l’accompagnement couvre l’orientation, le dossier, la préparation des étapes visa et le suivi global.",
      },
    ],

    relatedTitle: "Ressources utiles pour continuer",
    relatedLinks: [
      { to: "/campus-france-tunisie-guide", label: "Campus France Tunisie guide" },
      { to: "/alternance-en-france-pour-tunisiens", label: "Alternance en France pour Tunisiens" },
      { to: "/programmes/alternance-france", label: "Guide alternance France" },
      { to: "/blog/comment-etudier-en-france-depuis-la-tunisie", label: "Article complet études en France" },
      { to: "/blog/campus-france-tunisie-etapes", label: "Campus France Tunisie : étapes" },
      { to: "/blog/refus-visa-etudiant-france-erreurs", label: "Erreurs de refus visa étudiant" },
    ],

    ctaTitle: "Prêt à étudier en France ?",
    ctaText: "Notre équipe vous accompagne de A à Z pour maximiser vos chances de réussite.",
    ctaPrimary: "Commencer maintenant",
    ctaSecondary: "WhatsApp direct"
  }
};

const FranceStudyPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;

  const handleCTA = () => {
    trackEvent('generate_lead', {
      lead_source: 'france_study_page',
      page_location: '/etudier-en-france-depuis-tunisie',
      value: 1,
      currency: 'EUR',
    });
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite étudier en France depuis la Tunisie. Pouvez-vous m'aider ?")}`, '_blank');
  };

  return (
    <>
      <SEOHelmet
        title="Étudier en France depuis la Tunisie | Guide Complet Campus France 2026"
        description="Étudier en France depuis la Tunisie : accompagnement Campus France, visa étudiant, admissions et financement. Guide complet pour étudiants tunisiens."
        canonical="https://edugrowth.tn/etudier-en-france-depuis-tunisie"
        structuredData={franceStudyStructuredData}
        lang="fr"
      />

      <div className="min-h-screen bg-white font-sans text-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                {t.heroCTA}
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
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
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{t.processStep1}</h3>
                <p className="text-gray-600">{t.processStep1Desc}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{t.processStep2}</h3>
                <p className="text-gray-600">{t.processStep2Desc}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{t.processStep3}</h3>
                <p className="text-gray-600">{t.processStep3Desc}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">4</span>
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
                <GraduationCap className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">{t.benefit1Title}</h3>
                <p className="text-gray-600">{t.benefit1Desc}</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <DollarSign className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">{t.benefit2Title}</h3>
                <p className="text-gray-600">{t.benefit2Desc}</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <Building2 className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">{t.benefit3Title}</h3>
                <p className="text-gray-600">{t.benefit3Desc}</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <Globe2 className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">{t.benefit4Title}</h3>
                <p className="text-gray-600">{t.benefit4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Costs Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-black text-center mb-12">{t.costsTitle}</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="font-bold text-lg mb-2">{t.costCategory1}</h3>
                <p className="text-gray-600">{t.costCategory1Desc}</p>
              </div>
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="font-bold text-lg mb-2">{t.costCategory2}</h3>
                <p className="text-gray-600">{t.costCategory2Desc}</p>
              </div>
              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="font-bold text-lg mb-2">{t.costCategory3}</h3>
                <p className="text-gray-600">{t.costCategory3Desc}</p>
              </div>
              <div className="border-l-4 border-orange-600 pl-6">
                <h3 className="font-bold text-lg mb-2">{t.costCategory4}</h3>
                <p className="text-gray-600">{t.costCategory4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-black text-center mb-12">{t.checklistTitle}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {t.checklistItems.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 size={18} className="mt-0.5 text-emerald-600" />
                    <span>{item}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-black text-center mb-12">{t.faqTitle}</h2>
            <div className="space-y-4">
              {t.faq.map((item) => (
                <div key={item.q} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-xl font-black">{item.q}</h3>
                  <p className="mt-3 text-gray-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-black text-center mb-10">{t.relatedTitle}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {t.relatedLinks.map((item) => (
                <Link key={item.to} to={item.to} className="rounded-2xl border border-slate-200 bg-white p-5 text-lg font-bold text-[#005A9C] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black mb-6">{t.ctaTitle}</h2>
            <p className="text-xl mb-8 opacity-90">{t.ctaText}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCTA}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                {t.ctaPrimary}
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                {t.ctaSecondary}
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FranceStudyPage;
