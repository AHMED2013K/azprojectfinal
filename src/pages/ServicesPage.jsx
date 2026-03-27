import React from 'react';
import SEOHelmet from '../components/SEOHelmet';
import { destinationsData, services, testimonials, partnerLogos } from '../components/data';

const ServicesPage = () => (
  <>
    <SEOHelmet 
      title="Services EduGrowth | BPO Recrutement Étudiant Tunisie UAE UK Europe" 
      description="Externalisation complète recrutement étudiant : lead generation, qualification, conversion, conformité visa et onboarding. Équipe bilingue 24/7." 
      canonical="https://edugrowth.tn/services"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Student Recruitment BPO Outsourcing",
        "provider": {
          "@type": "Organization",
          "name": "EduGrowth Outsourcing",
          "url": "https://edugrowth.tn"
        },
        "areaServed": ["UAE", "UK", "Europe", "Tunisia"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Recruitment Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Lead Generation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Admissions Sales"
              }
            }
          ]
        }
      }}
    />
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <header className="relative bg-[#005A9C] text-white py-24 px-6 md:px-16 text-center overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-6">EduGrowth B2B Outsourcing</h1>
          <p className="text-lg md:text-2xl max-w-3xl mx-auto opacity-90">Externalisez votre recrutement étudiant depuis la Tunisie vers UAE, UK et Europe avec un partenaire certifié lead generation, qualification, conversions et conformité.</p>
          <a href="/contact" className="inline-block mt-8 bg-white text-[#005A9C] px-10 py-4 rounded-3xl font-black shadow-lg hover:shadow-2xl transition">Demander un audit gratuit</a>
        </div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.35),_rgba(0,0,0,0))]" />
      </header>

    <main className="max-w-7xl mx-auto px-6 py-16">
      <section aria-labelledby="services-title" className="mb-20">
        <h2 id="services-title" className="text-3xl md:text-4xl font-black mb-4">Nos Services Principaux</h2>
        <p className="text-gray-600 mb-8">Une approche full-stack 360° pour vos campagnes de recrutement étudiant : acquisition, qualification, validation de dossier, suivi, onboarding et reporting KPI.</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition">
              <h3 className="text-xl font-black mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-black mb-4">Chiffres Clés & Bénéfices</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-[#f0f8ff] rounded-2xl border border-blue-100">
            <p className="text-4xl font-black text-[#005A9C]">7+</p>
            <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">Bureaux</p>
          </div>
          <div className="p-6 bg-[#f0f8ff] rounded-2xl border border-blue-100">
            <p className="text-4xl font-black text-[#005A9C]">300+</p>
            <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">Étudiants / mois</p>
          </div>
          <div className="p-6 bg-[#f0f8ff] rounded-2xl border border-blue-100">
            <p className="text-4xl font-black text-[#005A9C]">85%</p>
            <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">Taux de conversion</p>
          </div>
          <div className="p-6 bg-[#f0f8ff] rounded-2xl border border-blue-100">
            <p className="text-4xl font-black text-[#005A9C]">72h</p>
            <p className="text-sm uppercase tracking-widest text-gray-500 mt-2">Time-to-live setup</p>
          </div>
        </div>
      </section>

      <section className="mb-20" aria-label="Partner testimonials" itemScope itemType="https://schema.org/Review">
        <h2 className="text-3xl md:text-4xl font-black mb-6">Témoignages Clients</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-700 mb-4">“{t.text}”</p>
              <footer className="text-gray-500 font-semibold">{t.name}, {t.role}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <h2 className="text-3xl md:text-4xl font-black mb-4">Destinations & marchés servis</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {destinationsData.map((destination) => (
            <article key={destination.name} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <img src={destination.img} alt={destination.name} loading="lazy" className="w-full h-44 object-cover" />
              <div className="p-5">
                <h3 className="font-black text-lg">{destination.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{destination.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl md:text-4xl font-black mb-5">Partenaires & Établissements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {partnerLogos.map((logo) => (
            <div key={logo.name} className="border border-gray-100 rounded-2xl p-4 flex items-center justify-center bg-white shadow-sm">
              <img src={logo.img} alt={logo.name} className="max-h-12 object-contain" />
            </div>
          ))}
        </div>
      </section>
    </main>

    <section className="bg-[#e6f4ff] py-16 px-6 text-center">
      <h3 className="text-2xl md:text-3xl font-black mb-3">Prêt à démarrer votre campagne d'acquisition ?</h3>
      <p className="text-gray-700 mb-6">Contactez-nous pour un plan personnalisé et un prototype de funnel étudiant dans les 24h.</p>
      <a href="/contact" className="inline-block bg-[#005A9C] text-white px-8 py-4 rounded-3xl font-black hover:bg-[#003e75] transition">Parler à un expert</a>
    </section>
  </div>

  </div>
);
  </>);
export default ServicesPage;
