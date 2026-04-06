import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, MessageSquare, Home as HomeIcon, Globe2, Zap, Mail, Phone, ArrowRight, Calculator, Users, Building2, Clock, DollarSign, MapPin, Headphones, Shield, BarChart3, Star, Award, TrendingUp, Target, CheckCircle, X } from 'lucide-react';
import { b2bOutsourcingTestimonials } from '../components/TestimonialsData.js';
import SEOHelmet from '../components/SEOHelmet';
import { trackEvent } from '../utils/tracking';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

const outsourcingTunisiaStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Outsourcing Tunisia - Business Process Outsourcing Services",
      "serviceType": "BPO Services",
      "provider": {
        "@type": "Organization",
        "name": "EduGrowth Outsourcing",
        "url": "https://edugrowth.tn/"
      },
      "areaServed": ["US", "UK", "EU", "UAE", "Canada", "France", "Germany"],
      "availableLanguage": ["English", "French", "Arabic"],
      "description": "Professional outsourcing services from Tunisia. Cost-effective alternative to Europe and Asia with skilled multilingual teams, European timezone, and high-quality delivery."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why outsource to Tunisia instead of India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tunisia offers superior language skills (French, English, Arabic), European timezone alignment, cultural compatibility with Western business practices, and competitive costs with higher quality delivery."
          }
        },
        {
          "@type": "Question",
          "name": "How much can I save by outsourcing to Tunisia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Businesses typically save 40-60% on operational costs compared to European operations, with additional savings from reduced training time and higher quality output."
          }
        },
        {
          "@type": "Question",
          "name": "What services can be outsourced to Tunisia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Customer service, data entry, administrative tasks, lead qualification, CRM management, content moderation, and various business process outsourcing services."
          }
        },
        {
          "@type": "Question",
          "name": "Is Tunisia's timezone suitable for European businesses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Tunisia is in GMT+1, perfectly aligned with Central European Time (CET), allowing for real-time collaboration and overlapping business hours."
          }
        },
        {
          "@type": "Question",
          "name": "What languages do Tunisian outsourcing teams speak?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Native proficiency in French, Arabic, and excellent English skills. Many team members have multilingual capabilities suitable for international markets."
          }
        }
      ]
    },
    {
      "@type": "ComparisonTable",
      "name": "Tunisia vs India vs Philippines Outsourcing Comparison",
      "about": [
        {
          "@type": "Place",
          "name": "Tunisia",
          "description": "European timezone, French/English/Arabic, 40-60% cost savings"
        },
        {
          "@type": "Place",
          "name": "India",
          "description": "4-5 hour difference, English focus, lower costs but quality concerns"
        },
        {
          "@type": "Place",
          "name": "Philippines",
          "description": "Asian timezone, English proficient, competitive costs"
        }
      ]
    }
  ]
};

const testimonials = b2bOutsourcingTestimonials;

const caseStudies = [
  {
    title: "French Language School: 300% Lead Conversion Increase",
    challenge: "Struggling with lead response times and conversion rates",
    solution: "24/7 Tunisia-based team with native French speakers",
    results: ["300% increase in qualified leads", "85% faster response time", "€50K monthly savings"],
    image: "/case-study-1.jpg"
  },
  {
    title: "UK E-commerce: Customer Satisfaction 95%",
    challenge: "High customer service costs and inconsistent quality",
    solution: "Dedicated Tunisia team with UK timezone overlap",
    results: ["95% customer satisfaction", "60% cost reduction", "24/7 support coverage"],
    image: "/case-study-2.jpg"
  }
];

const translations = {
  en: {
    heroTitle: "Stop Wasting Money on Expensive Outsourcing – Switch to Tunisia Today",
    heroSubtitle: "Cut your costs by 40-60% while getting BETTER quality than India or Philippines. European timezone, native French/English speakers, and guaranteed results.",
    heroCTA: "Get Your Custom Quote Now",
    heroSecondary: "Calculate Your Savings",

    urgencyBanner: "⚡ Limited spots available for Q2 2024 – Book your free strategy call before we're fully booked",

    valueProps: [
      { icon: DollarSign, title: "Save $50K+ Monthly", desc: "Real companies save thousands outsourcing to Tunisia" },
      { icon: Globe2, title: "Native Language Experts", desc: "French, English, Arabic – no accents, perfect communication" },
      { icon: Clock, title: "Same Timezone as Europe", desc: "Real-time collaboration, no 8-hour delays" },
      { icon: Shield, title: "99.5% Quality Guarantee", desc: "Superior quality or your money back" }
    ],

    painPoints: [
      "Paying $30+/hour for basic customer service?",
      "Dealing with poor English accents and miscommunication?",
      "Losing customers due to slow response times?",
      "Wasting money on 'cheap' Asian outsourcing that costs more in mistakes?"
    ],

    solutionTitle: "Tunisia: The Secret Weapon European Companies Use to Crush Their Competition",
    solutionSubtitle: "While everyone else outsources to India and regrets it, smart companies choose Tunisia for unbeatable quality and massive savings.",

    whyTunisiaTitle: "Why 200+ Companies Switched to Tunisia (And Never Looked Back)",
    whyTunisiaPoints: [
      "Strategic Mediterranean location with European business culture and values",
      "University-educated workforce with proven track record in international business",
      "Stable democracy with business-friendly regulations and tax incentives",
      "Ultra-fast internet infrastructure (faster than most European countries)",
      "Growing outsourcing hub with 15+ years of experience serving Fortune 500 companies"
    ],

    comparisonTitle: "The Truth: Tunisia vs India vs Philippines (Real Data, No BS)",
    comparisonSubtitle: "We compared actual performance data from our clients. Here's what really matters:",
    comparisonTable: {
      headers: ["Reality Check", "Tunisia", "India", "Philippines"],
      rows: [
        ["Cost Savings", "40-60% vs Europe", "50-70% vs Europe", "30-50% vs Europe"],
        ["Timezone", "GMT+1 (Europe)", "GMT+5.5 (4-5h diff)", "GMT+8 (6-7h diff)"],
        ["Languages", "FR/EN/AR Native", "EN (heavy accents)", "EN (understandable)"],
        ["Quality Score", "95/100", "75/100", "85/100"],
        ["Cultural Fit", "Western/European", "Mixed", "Western-influenced"],
        ["Error Rate", "0.5%", "3-5%", "2-3%"],
        ["Client Retention", "95%", "70%", "80%"]
      ]
    },

    costAdvantagesTitle: "Real Numbers: How Much You'll Actually Save",
    costExamples: [
      {
        service: "Customer Service Agent (Full-time)",
        tunisiaCost: "$8-12/hour",
        europeCost: "$25-35/hour",
        savings: "$12,000-15,000/month",
        note: "Per agent, including benefits & training"
      },
      {
        service: "Data Processing Specialist",
        tunisiaCost: "$6-10/hour",
        europeCost: "$20-30/hour",
        savings: "$9,000-12,000/month",
        note: "Per specialist with quality guarantee"
      },
      {
        service: "Lead Qualification Team",
        tunisiaCost: "$10-15/hour",
        europeCost: "$30-45/hour",
        savings: "$15,000-20,000/month",
        note: "Qualified leads with 85% conversion rate"
      }
    ],

    talentTitle: "World-Class Talent That Actually Delivers Results",
    talentPoints: [
      "95%+ English proficiency with native-like fluency (no 'broken English')",
      "Native French speakers who understand European business culture perfectly",
      "Arabic language expertise for seamless Middle Eastern market expansion",
      "Average 5+ years experience in international customer service and B2B sales",
      "Continuous training programs ensuring top 5% performance standards"
    ],

    timezoneTitle: "Same Timezone = Same Productivity (No More Waiting)",
    timezoneBenefits: [
      "Real-time collaboration with your European teams (no 8-hour email delays)",
      "Overlapping business hours: 9 AM - 6 PM CET for instant problem-solving",
      "Immediate response to urgent customer issues and business needs",
      "Seamless integration with your existing workflows and processes",
      "Reduced communication costs and faster project completion times"
    ],

    testimonialsTitle: "What Real CEOs Say About Switching to Tunisia",

    caseStudiesTitle: "Success Stories: Companies That Transformed Their Business",

    guaranteeTitle: "Our 30-Day Money-Back Guarantee",
    guaranteeText: "If you're not completely satisfied with our service quality within the first 30 days, we'll refund 100% of your payment. No questions asked.",

    ctaTitle: "Ready to Stop Wasting Money and Start Saving?",
    ctaText: "Join 200+ companies already saving $50K+ monthly with Tunisia outsourcing. Get your free, no-obligation cost analysis and see exactly how much you'll save.",
    ctaPrimary: "Get Free Cost Analysis",
    ctaSecondary: "Book Strategy Call",

    faqTitle: "Common Questions (And Honest Answers)",

    finalCTA: "Don't let expensive outsourcing drain your profits any longer. Tunisia delivers European-quality service at Asian prices."
  }
};

const OutsourcingTunisiaPage = () => {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;

  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorData, setCalculatorData] = useState({
    currentCost: '',
    hoursPerMonth: '',
    serviceType: 'customer-service'
  });

  const calculateSavings = () => {
    const hourlyRate = calculatorData.serviceType === 'customer-service' ? 10 :
                      calculatorData.serviceType === 'data-entry' ? 8 : 12;
    const currentMonthly = (parseFloat(calculatorData.currentCost) || 0) * (parseFloat(calculatorData.hoursPerMonth) || 0);
    const tunisiaMonthly = hourlyRate * (parseFloat(calculatorData.hoursPerMonth) || 0);
    const savings = currentMonthly - tunisiaMonthly;
    const percentage = currentMonthly > 0 ? ((savings / currentMonthly) * 100).toFixed(0) : 0;

    return { savings: savings.toFixed(2), percentage };
  };

  const handleCTA = (source) => {
    trackEvent('generate_lead', {
      lead_source: `outsourcing_tunisia_page_${source}`,
      page_location: '/outsourcing-tunisia',
      value: 1,
      currency: 'USD',
    });
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello, I'm interested in outsourcing to Tunisia. Can you provide a free cost analysis for my business?")}`, '_blank');
  };

  return (
    <>
      <SEOHelmet
        title="Outsourcing Tunisia – The Smart Alternative to Europe & Asia | Save 40-60%"
        description="Outsource to Tunisia and save 40-60% on business operations. Skilled multilingual teams, European timezone, superior quality vs India & Philippines. Free cost analysis."
        canonical="https://edugrowth.tn/outsourcing-tunisia"
        structuredData={outsourcingTunisiaStructuredData}
        lang="en"
      />

      <div className="min-h-screen bg-white font-sans text-gray-900">
        {/* Urgency Banner */}
        <div className="bg-red-600 text-white text-center py-3 px-4 text-sm font-semibold">
          {t.urgencyBanner}
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                {t.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                {t.heroSubtitle}
              </p>

              {/* Pain Points */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 max-w-3xl mx-auto">
                <h3 className="text-lg font-bold text-red-800 mb-4">Sound Familiar?</h3>
                <div className="grid md:grid-cols-2 gap-3 text-left">
                  {t.painPoints.map((pain, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-red-500">❌</span>
                      <span className="text-red-700">{pain}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={() => handleCTA('hero_primary')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  {t.heroCTA}
                </button>
                <button
                  onClick={() => setShowCalculator(true)}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                >
                  {t.heroSecondary}
                </button>
              </div>
            </div>

            {/* Value Props */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.valueProps.map((prop, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <prop.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="font-bold text-lg mb-2">{prop.title}</h3>
                  <p className="text-gray-600">{prop.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              {t.solutionTitle}
            </h2>
            <p className="text-xl opacity-90 leading-relaxed">
              {t.solutionSubtitle}
            </p>
          </div>
        </section>

        {/* Why Tunisia Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                {t.whyTunisiaTitle}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.whyTunisiaPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                {t.comparisonTitle}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t.comparisonSubtitle}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    {t.comparisonTable.headers.map((header, index) => (
                      <th key={index} className="px-6 py-4 text-left font-bold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.comparisonTable.rows.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className={`px-6 py-4 ${cellIndex === 1 ? 'font-bold text-blue-600' : 'text-gray-700'}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="text-lg font-bold text-green-800 mb-2">The Bottom Line:</h3>
                <p className="text-green-700">
                  Tunisia gives you European quality at Asian prices, with better communication and zero timezone headaches.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Advantages */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                {t.costAdvantagesTitle}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {t.costExamples.map((example, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl border border-gray-100">
                  <h3 className="font-bold text-xl mb-4 text-gray-900">{example.service}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tunisia:</span>
                      <span className="font-bold text-green-600">{example.tunisiaCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Europe:</span>
                      <span className="font-bold text-red-600">{example.europeCost}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <div className="text-center">
                        <div className="text-2xl font-black text-green-600">{example.savings}</div>
                        <div className="text-sm text-gray-600">{example.note}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Talent & Language */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                  {t.talentTitle}
                </h2>
                <div className="space-y-4">
                  {t.talentPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <p className="text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="text-center mb-6">
                  <div className="text-3xl font-black text-blue-600 mb-2">95%+</div>
                  <div className="text-gray-600">English Proficiency</div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">FR</div>
                    <div className="text-sm text-gray-600">Native</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">EN</div>
                    <div className="text-sm text-gray-600">Fluent</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">AR</div>
                    <div className="text-sm text-gray-600">Native</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timezone Benefits */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                {t.timezoneTitle}
              </h2>
              <p className="text-xl opacity-90">Perfect alignment for European business operations</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.timezoneBenefits.map((benefit, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-green-400 mb-4" />
                  <p className="text-white leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full">
                <div className="text-2xl">🇹🇳</div>
                <div className="text-lg font-bold">GMT+1</div>
                <div className="text-gray-300">•</div>
                <div className="text-lg font-bold">🇪🇺</div>
                <div className="text-2xl">CET</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                {t.testimonialsTitle}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-sm text-gray-600">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                {t.caseStudiesTitle}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{study.title}</h3>

                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Challenge:</div>
                      <div className="text-gray-600">{study.challenge}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Solution:</div>
                      <div className="text-gray-600">{study.solution}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Results:</div>
                      <ul className="text-gray-600 space-y-1">
                        {study.results.map((result, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                {t.faqTitle}
              </h2>
            </div>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Why outsource to Tunisia instead of India?</h3>
                <p className="text-gray-600">Tunisia offers superior language skills (French, English, Arabic), European timezone alignment, cultural compatibility with Western business practices, and competitive costs with higher quality delivery.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How much can I save by outsourcing to Tunisia?</h3>
                <p className="text-gray-600">Businesses typically save 40-60% on operational costs compared to European operations, with additional savings from reduced training time and higher quality output.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What services can be outsourced to Tunisia?</h3>
                <p className="text-gray-600">Customer service, data entry, administrative tasks, lead qualification, CRM management, content moderation, and various business process outsourcing services.</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Is Tunisia's timezone suitable for European businesses?</h3>
                <p className="text-gray-600">Yes, Tunisia is in GMT+1, perfectly aligned with Central European Time (CET), allowing for real-time collaboration and overlapping business hours.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Modal */}
        {showCalculator && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Cost Calculator</h3>
                <button onClick={() => setShowCalculator(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current hourly cost ($)</label>
                  <input
                    type="number"
                    value={calculatorData.currentCost}
                    onChange={(e) => setCalculatorData({...calculatorData, currentCost: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hours per month</label>
                  <input
                    type="number"
                    value={calculatorData.hoursPerMonth}
                    onChange={(e) => setCalculatorData({...calculatorData, hoursPerMonth: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="160"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service type</label>
                  <select
                    value={calculatorData.serviceType}
                    onChange={(e) => setCalculatorData({...calculatorData, serviceType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="customer-service">Customer Service</option>
                    <option value="data-entry">Data Entry</option>
                    <option value="lead-qualification">Lead Qualification</option>
                  </select>
                </div>
              </div>

              {calculatorData.currentCost && calculatorData.hoursPerMonth && (
                <div className="bg-green-50 p-4 rounded-lg mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">${calculateSavings().savings}</div>
                    <div className="text-green-700">Monthly savings ({calculateSavings().percentage}%)</div>
                  </div>
                </div>
              )}

              <button
                onClick={() => handleCTA('calculator')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold"
              >
                Get Detailed Analysis
              </button>
            </div>
          </div>
        )}

        {/* Guarantee Section */}
        <section className="py-16 bg-yellow-50 border-t border-yellow-200">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-yellow-200">
              <Shield className="w-16 h-16 text-yellow-600 mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                {t.guaranteeTitle}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t.guaranteeText}
              </p>
              <div className="mt-6">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">100% Risk-Free</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              {t.ctaTitle}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {t.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleCTA('final_primary')}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                {t.ctaPrimary}
              </button>
              <button
                onClick={() => handleCTA('final_secondary')}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                {t.ctaSecondary}
              </button>
            </div>
            <p className="mt-6 text-lg opacity-75">
              {t.finalCTA}
            </p>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-900">Explore More Outsourcing Solutions</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/outsource-customer-service-tunisia" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-blue-600 mb-2">Customer Service Outsourcing</h4>
                <p className="text-gray-600 text-sm">Professional multilingual customer support from Tunisia</p>
              </Link>
              <Link to="/outsourcing-cost-calculator" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-green-600 mb-2">Cost Calculator</h4>
                <p className="text-gray-600 text-sm">Calculate your potential savings with Tunisia outsourcing</p>
              </Link>
              <Link to="/blog/why-tunisia-better-than-india-outsourcing" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-purple-600 mb-2">Tunisia vs India</h4>
                <p className="text-gray-600 text-sm">Complete comparison of outsourcing destinations</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default OutsourcingTunisiaPage;