import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Home, MessageCircle } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

const pageConfig = {
  '/education-outsourcing-tunisia': {
    title: 'Education Outsourcing Tunisia | EduGrowth',
    h1: 'Education Outsourcing in Tunisia for Universities and Agencies',
    description: 'Deploy multilingual admissions and student recruitment teams from Tunisia to lower costs and improve conversion speed.',
  },
  '/student-recruitment-outsourcing': {
    title: 'Student Recruitment Outsourcing | EduGrowth Tunisia',
    h1: 'Student Recruitment Outsourcing That Scales Enrollment',
    description: 'Lead qualification, follow-up, CRM execution, and multilingual conversion operations from Tunisia.',
  },
  '/externalisation-services-tunisie': {
    title: 'Externalisation Services Tunisie | EduGrowth',
    h1: 'Externalisation des services éducatifs en Tunisie',
    description: 'Externalisez admissions, qualification des leads et suivi CRM avec une équipe dédiée en Tunisie.',
  },
};

export default function OutsourcingServicePage() {
  const { lang, toggleLanguage } = useLanguage();
  const { pathname } = useLocation();
  const cfg = pageConfig[pathname] || pageConfig['/education-outsourcing-tunisia'];
  const copy = lang === 'fr'
    ? {
        back: "Retour à l'outsourcing",
        whatsapp: 'WhatsApp',
        whatsappText: 'Bonjour EduGrowth, je veux une proposition outsourcing.',
        points: [
          "Jusqu'à 60% d'économies sur les coûts opérationnels",
          'Lancement de votre équipe en quelques jours, pas en quelques mois',
          'Support multilingue FR/AR/EN',
        ],
        auditTitle: 'Recevez un audit outsourcing gratuit',
        auditText:
          "Nous cartographions votre processus d'admission actuel et vous livrons un plan d'implémentation clair avec KPI.",
        consultation: 'Réserver une consultation gratuite',
        leadForm: 'Aller au formulaire',
        related: 'Pages liées',
      }
    : {
        back: 'Back to Outsourcing',
        whatsapp: 'WhatsApp',
        whatsappText: 'Hello EduGrowth, I want an outsourcing proposal.',
        points: [
          'Save up to 60% on operating cost',
          'Launch your team in days, not months',
          'Multilingual FR/AR/EN support',
        ],
        auditTitle: 'Get a Free Outsourcing Audit',
        auditText:
          'We map your current admissions process and return a clear implementation plan with KPIs.',
        consultation: 'Book a Free Consultation',
        leadForm: 'Go to Lead Form',
        related: 'Related pages',
      };

  return (
    <>
      <SEOHelmet title={cfg.title} description={cfg.description} canonical={`https://edugrowth.tn${pathname}`} lang={lang} />
      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-3">
            <Link to="/outsourcing" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">
              <Home size={16} /> {copy.back}
            </Link>
            <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.whatsappText)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700">
              <MessageCircle size={16} /> {copy.whatsapp}
            </a>
            </div>
            <LanguageSwitch lang={lang} onToggle={toggleLanguage} />
          </div>

          <h1 className="mt-6 text-4xl font-black leading-tight">{cfg.h1}</h1>
          <p className="mt-3 max-w-3xl text-slate-600">{cfg.description}</p>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            {copy.points.map((point) => (
              <div key={point} className="rounded-2xl border border-slate-200 p-5">
                <p className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="mt-0.5 text-emerald-600" size={16} /> {point}
                </p>
              </div>
            ))}
          </section>

          <section className="mt-8 rounded-2xl bg-slate-950 p-6 text-white">
            <h2 className="text-2xl font-black">{copy.auditTitle}</h2>
            <p className="mt-2 text-slate-300">{copy.auditText}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/book-consultation" className="rounded-xl bg-[#005A9C] px-5 py-3 text-sm font-black">{copy.consultation}</Link>
              <Link to="/outsourcing#consultation" className="rounded-xl border border-white/30 px-5 py-3 text-sm font-black">{copy.leadForm}</Link>
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-lg font-black">{copy.related}</h3>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-bold text-[#005A9C]">
              <Link to="/outsourcing">Outsourcing Main Page</Link>
              <Link to="/student-recruitment-outsourcing">Student Recruitment Outsourcing</Link>
              <Link to="/externalisation-services-tunisie">Externalisation Services Tunisie</Link>
              <Link to="/blog">Blog</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
