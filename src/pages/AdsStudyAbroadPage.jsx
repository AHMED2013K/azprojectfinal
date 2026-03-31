import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import LeadCaptureForm from '../components/LeadCaptureForm';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function AdsStudyAbroadPage() {
  const { lang, toggleLanguage } = useLanguage();
  const copy = lang === 'fr'
    ? {
        title: 'Étudier à l’étranger depuis la Tunisie | Consultation gratuite | EduGrowth',
        description: "Recevez un accompagnement personnalisé depuis la Tunisie : destination, admission, visa et stratégie de candidature.",
        badge: 'Consultation étudiante gratuite',
        heading: 'Étudier à l’étranger sans improviser',
        text:
          "Nous vous guidons du choix de la destination jusqu'à l'obtention du visa. Support rapide, étapes claires et suivi pratique sur WhatsApp.",
        points: [
          '1. Stratégie destination selon votre budget',
          "2. Préparation du dossier d'admission et du calendrier",
          "3. Checklist visa et préparation à l'entretien",
        ],
        abroad: 'Découvrir Abroad Zone',
        guide: 'Lire le guide France',
        formHeading: "Recevez votre plan d'études gratuit",
        formButton: 'Envoyer mon plan gratuit',
      }
    : {
        title: 'Study Abroad from Tunisia | Free Consultation | EduGrowth',
        description: 'Get personalized study abroad guidance from Tunisia: destination, admission, visa, and application strategy.',
        badge: 'Free Student Consultation',
        heading: 'Study Abroad Without Guesswork',
        text:
          'We guide you from destination choice to visa approval. Fast support, clear steps, and practical WhatsApp follow-up.',
        points: [
          '1. Destination strategy based on your budget',
          '2. Admission file preparation and timeline',
          '3. Visa checklist and interview readiness',
        ],
        abroad: 'Explore Abroad Zone',
        guide: 'Read France Guide',
        formHeading: 'Get Your Free Study Abroad Plan',
        formButton: 'Send My Free Plan',
      };
  return (
    <>
      <SEOHelmet
        title={copy.title}
        description={copy.description}
        canonical="https://edugrowth.tn/lp/study-abroad"
        robotsContent="noindex, nofollow"
        lang={lang}
      />
      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <section className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
              <div className="mb-4 flex justify-end">
                <LanguageSwitch lang={lang} onToggle={toggleLanguage} />
              </div>
              <p className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
                {copy.badge}
              </p>
              <h1 className="mt-5 text-5xl font-black leading-tight">{copy.heading}</h1>
              <p className="mt-4 text-lg text-slate-300">{copy.text}</p>
              <div className="mt-7 space-y-3 text-sm text-slate-200">
                {copy.points.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-black">
                <Link to="/abroad-zone" className="rounded-xl border border-white/30 px-4 py-2 hover:bg-white/10">
                  {copy.abroad}
                </Link>
                <Link to="/blog/comment-etudier-en-france-depuis-la-tunisie" className="rounded-xl border border-white/30 px-4 py-2 hover:bg-white/10">
                  {copy.guide}
                </Link>
              </div>
            </section>

            <LeadCaptureForm
              segment="b2c_student"
              sourcePage="lp_study_abroad"
              heading={copy.formHeading}
              buttonLabel={copy.formButton}
            />
          </div>
        </div>
      </div>
    </>
  );
}
