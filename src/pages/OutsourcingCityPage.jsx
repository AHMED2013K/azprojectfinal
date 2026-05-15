import { Link, useLocation } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';
import { Star } from 'lucide-react';
import { b2bOutsourcingTestimonials } from '../components/TestimonialsData.js';

const WA_NUMBER = '21656590703';

function normalizeContentPath(pathname) {
  if (pathname === '/') return pathname;
  return pathname.replace(/\/+$/, '');
}

const cityData = {
  '/outsourcing-tunis': {
    city: 'Tunis',
    title: 'Outsourcing Tunis | Education Operations by EduGrowth',
    h1: 'Outsourcing services in Tunis for education institutions',
  },
  '/outsourcing-sousse': {
    city: 'Sousse',
    title: 'Outsourcing Sousse | Education Operations by EduGrowth',
    h1: 'Outsourcing services in Sousse for education institutions',
  },
  '/outsourcing-sfax': {
    city: 'Sfax',
    title: 'Outsourcing Sfax | Education Operations by EduGrowth',
    h1: 'Outsourcing services in Sfax for education institutions',
  },
};

export default function OutsourcingCityPage() {
  const { lang, toggleLanguage } = useLanguage();
  const { pathname } = useLocation();
  const contentPath = normalizeContentPath(pathname);
  const data = cityData[contentPath] || cityData['/outsourcing-tunis'];
  const copy = lang === 'fr'
    ? {
        description: `Équipes dédiées à ${data.city} pour la qualification des leads, le suivi des admissions et les opérations CRM.`,
        speed: 'Vitesse',
        speedText: 'Déploiement rapide et workflows de réponse pilotés par SLA.',
        quality: 'Qualité',
        qualityText: 'Contrôles qualité et reporting KPI clair pour les équipes admissions.',
        savings: 'Économies',
        savingsText: "Réduisez vos coûts opérationnels tout en augmentant la capacité de l'équipe.",
        consultation: 'Réserver une consultation gratuite',
        whatsappText: `Bonjour EduGrowth, j’ai besoin d’une proposition d’outsourcing pour des opérations à ${data.city}.`,
      }
    : {
        description: `Dedicated teams in ${data.city} for lead qualification, admissions follow-up, and CRM operations.`,
        speed: 'Speed',
        speedText: 'Fast deployment and SLA-driven response workflows.',
        quality: 'Quality',
        qualityText: 'Quality controls and clear KPI reporting for admissions teams.',
        savings: 'Savings',
        savingsText: 'Reduce operating cost while scaling team capacity.',
        consultation: 'Book Free Consultation',
        whatsappText: `Hello EduGrowth, I need an outsourcing proposal for operations in ${data.city}.`,
      };

  return (
    <>
      <SEOHelmet
        title={data.title}
        description={lang === 'fr'
          ? `Externalisation multilingue des admissions et du recrutement étudiant à ${data.city}, Tunisie.`
          : `Multilingual admissions and student recruitment outsourcing in ${data.city}, Tunisia.`}
        canonical={`https://edugrowth.tn${contentPath}`}
        lang={lang}
      />
      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-bold text-[#005A9C]">
            <div className="flex flex-wrap gap-3">
              <Link to="/outsourcing">Outsourcing</Link>
              <Link to="/education-outsourcing-tunisia">Education Outsourcing Tunisia</Link>
              <Link to="/book-consultation">Book Consultation</Link>
            </div>
            <LanguageSwitch lang={lang} onToggle={toggleLanguage} />
          </div>
          <h1 className="mt-4 text-4xl font-black">{data.h1}</h1>
          <p className="mt-3 text-slate-600">{copy.description}</p>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-4">
              <h2 className="text-sm font-black uppercase text-slate-500">{copy.speed}</h2>
              <p className="mt-2 text-sm">{copy.speedText}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <h2 className="text-sm font-black uppercase text-slate-500">{copy.quality}</h2>
              <p className="mt-2 text-sm">{copy.qualityText}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <h2 className="text-sm font-black uppercase text-slate-500">{copy.savings}</h2>
              <p className="mt-2 text-sm">{copy.savingsText}</p>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="mt-12 py-12 bg-gray-50 rounded-2xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                What Real CEOs Say About Outsourcing to {data.city}
              </h2>
              <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
                Trusted by global businesses who switched to Tunisia for superior results.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {b2bOutsourcingTestimonials.slice(0, 6).map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-lg">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-2xl mr-4" />
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                      <div className="text-xs font-bold text-green-600 mt-1">{testimonial.result}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book-consultation" className="rounded-xl bg-[#005A9C] px-5 py-3 text-sm font-black text-white">
              {copy.consultation}
            </Link>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.whatsappText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
