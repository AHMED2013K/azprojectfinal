import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, MessageSquare, Home as HomeIcon, Globe2, Zap, Mail, Phone, ArrowRight, Users, Building2, Clock, DollarSign, MapPin, Headphones, Shield, BarChart3 } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { trackEvent } from '../utils/tracking';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

const customerServiceStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Outsource Customer Service to Tunisia",
      "serviceType": "Customer Support Outsourcing",
      "provider": {
        "@type": "Organization",
        "name": "EduGrowth Outsourcing",
        "url": "https://edugrowth.tn/"
      },
      "areaServed": ["US", "UK", "EU", "UAE", "Canada"],
      "availableLanguage": ["English", "French", "Arabic"],
      "description": "Outsource your customer service operations to Tunisia. Professional multilingual support with 24/7 availability and cost-effective solutions."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why outsource customer service to Tunisia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tunisia offers skilled multilingual agents, competitive costs, and timezone advantages for European and North American businesses."
          }
        },
        {
          "@type": "Question",
          "name": "What languages do you support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "English, French, and Arabic with native speakers and professional fluency in all three languages."
          }
        },
        {
          "@type": "Question",
          "name": "How much does it cost to outsource customer service?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Starting from $8-12/hour depending on volume and complexity, significantly lower than US/European costs."
          }
        }
      ]
    }
  ]
};

const translations = {
  en: {
    heroTitle: "Outsource Customer Service to Tunisia: Professional Multilingual Support",
    heroSubtitle: "Scale your customer operations with Tunisia's skilled agents. 24/7 support in English, French, and Arabic at competitive rates.",
    heroCTA: "Get Free Cost Analysis",
    heroSecondary: "Book Strategy Call",

    processTitle: "How We Set Up Your Customer Service Outsourcing",
    processStep1: "Requirements Analysis",
    processStep1Desc: "Audit your current operations, define KPIs, and map customer journeys",
    processStep2: "Team Recruitment & Training",
    processStep2Desc: "Hire and train native-speaking agents on your products and processes",
    processStep3: "Technology Integration",
    processStep3Desc: "Connect your CRM, helpdesk, and communication tools",
    processStep4: "Go-Live & Optimization",
    processStep4Desc: "Launch operations with continuous monitoring and improvement",

    benefitsTitle: "Why Businesses Outsource Customer Service to Tunisia",
    benefit1Title: "Multilingual Excellence",
    benefit1Desc: "Native English, French, and Arabic speakers with professional communication skills",
    benefit2Title: "Cost Efficiency",
    benefit2Desc: "40-60% cost savings compared to US/European operations",
    benefit3Title: "24/7 Availability",
    benefit3Desc: "Round-the-clock support with timezone overlap for global businesses",
    benefit4Title: "Quality Assurance",
    benefit4Desc: "Structured processes, call monitoring, and continuous training programs",

    servicesTitle: "Customer Service Solutions We Provide",
    service1Title: "Inbound Call Center",
    service1Desc: "Professional phone support for customer inquiries, complaints, and sales",
    service2Title: "Live Chat Support",
    service2Desc: "Real-time chat assistance across websites and mobile apps",
    service3Title: "Email & Ticket Management",
    service3Desc: "Comprehensive email handling and helpdesk ticket resolution",
    service4Title: "Social Media Management",
    service4Desc: "Monitor and respond to customer messages across all platforms",

    statsTitle: "Proven Results from Our Clients",
    stat1: "40-60% cost reduction",
    stat2: "99%+ service quality",
    stat3: "24/7 availability",
    stat4: "Multi-language support",

    ctaTitle: "Ready to Transform Your Customer Service?",
    ctaText: "Get a free cost analysis and see how Tunisia can support your customer operations.",
    ctaPrimary: "Get Free Quote",
    ctaSecondary: "Schedule Call"
  }
};

const CustomerServiceOutsourcingPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;

  const handleCTA = () => {
    trackEvent('generate_lead', {
      lead_source: 'customer_service_outsourcing_page',
      page_location: '/outsource-customer-service-tunisia',
      value: 1,
      currency: 'USD',
    });
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello, I want to outsource customer service to Tunisia. Can you provide a free cost analysis?")}`, '_blank');
  };

  return (
    <>
      <SEOHelmet
        title="Outsource Customer Service to Tunisia | Professional Multilingual Support"
        description="Outsource customer service to Tunisia. Skilled multilingual agents providing 24/7 support in English, French, Arabic. Cost-effective solutions for global businesses."
        canonical="https://edugrowth.tn/outsource-customer-service-tunisia"
        structuredData={customerServiceStructuredData}
        lang="en"
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
                <Globe2 className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">{t.benefit1Title}</h3>
                <p className="text-gray-600">{t.benefit1Desc}</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <DollarSign className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">{t.benefit2Title}</h3>
                <p className="text-gray-600">{t.benefit2Desc}</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <Clock className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">{t.benefit3Title}</h3>
                <p className="text-gray-600">{t.benefit3Desc}</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <Shield className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">{t.benefit4Title}</h3>
                <p className="text-gray-600">{t.benefit4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-black text-center mb-12">{t.servicesTitle}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-gray-200 p-8 rounded-lg hover:shadow-lg transition-shadow">
                <Headphones className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">{t.service1Title}</h3>
                <p className="text-gray-600">{t.service1Desc}</p>
              </div>
              <div className="border border-gray-200 p-8 rounded-lg hover:shadow-lg transition-shadow">
                <MessageSquare className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">{t.service2Title}</h3>
                <p className="text-gray-600">{t.service2Desc}</p>
              </div>
              <div className="border border-gray-200 p-8 rounded-lg hover:shadow-lg transition-shadow">
                <Mail className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">{t.service3Title}</h3>
                <p className="text-gray-600">{t.service3Desc}</p>
              </div>
              <div className="border border-gray-200 p-8 rounded-lg hover:shadow-lg transition-shadow">
                <Users className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="font-bold text-xl mb-2">{t.service4Title}</h3>
                <p className="text-gray-600">{t.service4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-black text-center mb-12">{t.statsTitle}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">{t.stat1}</div>
              </div>
              <div>
                <Shield className="w-12 h-12 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">{t.stat2}</div>
              </div>
              <div>
                <Clock className="w-12 h-12 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">{t.stat3}</div>
              </div>
              <div>
                <Globe2 className="w-12 h-12 mx-auto mb-4" />
                <div className="text-2xl font-bold mb-2">{t.stat4}</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black mb-6">{t.ctaTitle}</h2>
            <p className="text-xl mb-8 opacity-90">{t.ctaText}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCTA}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                {t.ctaPrimary}
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                {t.ctaSecondary}
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CustomerServiceOutsourcingPage;