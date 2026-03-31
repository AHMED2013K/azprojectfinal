import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, MessageSquare, Home as HomeIcon, Globe2, Zap, Mail, Phone, ArrowRight, Calculator, Users, Building2, Clock, DollarSign, MapPin } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { trackEvent } from '../utils/tracking';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

const calculatorStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Free Outsourcing Cost Calculator Tunisia",
      "serviceType": "Cost Analysis Tool",
      "provider": {
        "@type": "Organization",
        "name": "EduGrowth Outsourcing",
        "url": "https://edugrowth.tn/"
      },
      "description": "Calculate your potential savings by outsourcing to Tunisia. Free cost comparison tool for customer service and business process outsourcing."
    }
  ]
};

const translations = {
  en: {
    heroTitle: "Free Outsourcing Cost Calculator: Tunisia vs Your Current Costs",
    heroSubtitle: "Discover how much you can save by outsourcing to Tunisia. Get instant cost comparisons and ROI projections.",
    heroCTA: "Start Free Calculator",

    calculatorTitle: "Calculate Your Outsourcing Savings",
    monthlyVolume: "Monthly Customer Interactions",
    volumePlaceholder: "e.g., 1000",
    currentCost: "Current Cost per Interaction ($)",
    currentCostPlaceholder: "e.g., 15",
    serviceType: "Service Type",
    customerService: "Customer Service",
    dataEntry: "Data Entry",
    salesSupport: "Sales Support",

    resultsTitle: "Your Potential Savings",
    monthlySavings: "Monthly Savings",
    yearlySavings: "Yearly Savings",
    roiPercentage: "ROI Percentage",
    tunisiaCost: "Tunisia Cost per Interaction",

    benefitsTitle: "Why Choose Tunisia for Outsourcing",
    benefit1: "Up to 60% cost reduction",
    benefit2: "Multilingual support (EN/FR/AR)",
    benefit3: "European timezone alignment",
    benefit4: "High-quality, trained professionals",

    ctaTitle: "Ready to Start Saving?",
    ctaText: "Get a detailed cost analysis and implementation plan for your business.",
    ctaPrimary: "Get Free Analysis",
    ctaSecondary: "Schedule Consultation"
  }
};

const CostCalculatorPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;

  const [formData, setFormData] = useState({
    monthlyVolume: '',
    currentCost: '',
    serviceType: 'customer-service'
  });

  const [results, setResults] = useState(null);

  const tunisiaRates = {
    'customer-service': 8,
    'data-entry': 6,
    'sales-support': 10
  };

  const calculateSavings = () => {
    const volume = parseFloat(formData.monthlyVolume) || 0;
    const current = parseFloat(formData.currentCost) || 0;
    const tunisia = tunisiaRates[formData.serviceType];

    const monthlyCurrent = volume * current;
    const monthlyTunisia = volume * tunisia;
    const monthlySavings = monthlyCurrent - monthlyTunisia;
    const yearlySavings = monthlySavings * 12;
    const roi = monthlyCurrent > 0 ? ((monthlySavings / monthlyCurrent) * 100) : 0;

    setResults({
      monthlySavings: monthlySavings.toFixed(2),
      yearlySavings: yearlySavings.toFixed(2),
      roiPercentage: roi.toFixed(1),
      tunisiaCost: tunisia.toFixed(2)
    });

    trackEvent('calculator_used', {
      monthly_volume: volume,
      service_type: formData.serviceType,
      potential_savings: yearlySavings
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCTA = () => {
    trackEvent('generate_lead', {
      lead_source: 'cost_calculator_page',
      page_location: '/outsourcing-cost-calculator',
      value: 1,
      currency: 'USD',
    });
    const msg = `Hello, I used your cost calculator and found potential savings of $${results?.yearlySavings || 'X'} per year. Can you provide a detailed analysis?`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      <SEOHelmet
        title="Free Outsourcing Cost Calculator Tunisia | Calculate Your Savings"
        description="Free outsourcing cost calculator. Compare Tunisia outsourcing costs vs current expenses. Get instant ROI projections for customer service and BPO."
        canonical="https://edugrowth.tn/outsourcing-cost-calculator"
        structuredData={calculatorStructuredData}
        lang="en"
      />

      <div className="min-h-screen bg-white font-sans text-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-blue-100 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Calculator className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t.heroSubtitle}
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
              {t.heroCTA}
            </button>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-black text-center mb-12">{t.calculatorTitle}</h2>

            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.monthlyVolume}
                  </label>
                  <input
                    type="number"
                    name="monthlyVolume"
                    value={formData.monthlyVolume}
                    onChange={handleInputChange}
                    placeholder={t.volumePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.currentCost}
                  </label>
                  <input
                    type="number"
                    name="currentCost"
                    value={formData.currentCost}
                    onChange={handleInputChange}
                    placeholder={t.currentCostPlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.serviceType}
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="customer-service">{t.customerService}</option>
                    <option value="data-entry">{t.dataEntry}</option>
                    <option value="sales-support">{t.salesSupport}</option>
                  </select>
                </div>
              </div>

              <button
                onClick={calculateSavings}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                Calculate Savings
              </button>
            </div>

            {/* Results Section */}
            {results && (
              <div className="mt-12 bg-green-50 border border-green-200 p-8 rounded-lg">
                <h3 className="text-2xl font-black text-center mb-8 text-green-800">{t.resultsTitle}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-800">${results.monthlySavings}</div>
                    <div className="text-sm text-green-600">{t.monthlySavings}</div>
                  </div>
                  <div className="text-center">
                    <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-800">${results.yearlySavings}</div>
                    <div className="text-sm text-green-600">{t.yearlySavings}</div>
                  </div>
                  <div className="text-center">
                    <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-800">{results.roiPercentage}%</div>
                    <div className="text-sm text-green-600">{t.roiPercentage}</div>
                  </div>
                  <div className="text-center">
                    <Calculator className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-800">${results.tunisiaCost}</div>
                    <div className="text-sm text-green-600">{t.tunisiaCost}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-black text-center mb-12">{t.benefitsTitle}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{t.benefit1}</span>
              </div>
              <div className="flex items-center space-x-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{t.benefit2}</span>
              </div>
              <div className="flex items-center space-x-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{t.benefit3}</span>
              </div>
              <div className="flex items-center space-x-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{t.benefit4}</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-green-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-black mb-6">{t.ctaTitle}</h2>
            <p className="text-xl mb-8 opacity-90">{t.ctaText}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleCTA}
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                {t.ctaPrimary}
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                {t.ctaSecondary}
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CostCalculatorPage;