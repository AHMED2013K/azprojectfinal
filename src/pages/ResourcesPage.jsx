import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Download,
  FileCheck2,
  MessageCircle,
  PlayCircle,
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackEvent } from '../utils/tracking';

const WA_NUMBER = '21656590703';

const resources = [
  {
    key: 'france',
    titleFr: 'Checklist Campus France Tunisie',
    titleEn: 'Campus France Tunisia Checklist',
    type: 'PDF',
    destination: 'France',
    descriptionFr: 'Les documents, delais et erreurs a eviter avant de deposer votre dossier.',
    descriptionEn: 'Documents, timelines, and mistakes to avoid before submitting your file.',
    path: '/campus-france-tunisie-guide',
  },
  {
    key: 'budget',
    titleFr: 'Guide budget etudes a l’etranger',
    titleEn: 'Study Abroad Budget Guide',
    type: 'Guide',
    destination: 'Multi-pays',
    descriptionFr: 'Comparer France, Allemagne, Canada, Chypre, Turquie et Dubai selon votre budget.',
    descriptionEn: 'Compare France, Germany, Canada, Cyprus, Turkey, and Dubai by budget.',
    path: '/blog/quel-pays-etudier-petit-budget',
  },
  {
    key: 'visa',
    titleFr: 'Anti-refus visa etudiant',
    titleEn: 'Student Visa Refusal Prevention',
    type: 'Checklist',
    destination: 'Visa',
    descriptionFr: 'Les signaux faibles qui fragilisent un dossier et comment les preparer.',
    descriptionEn: 'Weak signals that hurt a file and how to prepare them.',
    path: '/blog/refus-visa-etudiant-france-erreurs',
  },
  {
    key: 'alternance',
    titleFr: 'Profil alternance France',
    titleEn: 'France Work-study Profile',
    type: 'Quiz',
    destination: 'France',
    descriptionFr: 'Verifier si votre profil est coherent pour une alternance en France.',
    descriptionEn: 'Check whether your profile fits a France work-study path.',
    path: '/programmes/alternance-france',
  },
];

const contentSeries = [
  {
    title: 'Pays en 60 secondes',
    hook: 'Tu veux etudier au Canada mais ton budget est limite ? Regarde ceci avant de deposer ton dossier.',
    format: 'TikTok/Reel',
  },
  {
    title: 'Parents rassures',
    hook: 'Parents : voici les 4 questions a poser avant de payer une agence etudes a l’etranger.',
    format: 'Reel/Live',
  },
  {
    title: 'Erreur dossier',
    hook: 'Cette erreur simple peut bloquer ton dossier Campus France.',
    format: 'Short FAQ',
  },
  {
    title: 'Budget reel',
    hook: 'France, Allemagne, Chypre : quel pays choisir avec moins de 800 EUR par mois ?',
    format: 'Carousel',
  },
];

const copy = {
  fr: {
    title: 'Ressources gratuites etudes a l’etranger Tunisie | EduGrowth',
    description:
      'Checklists, guides et quiz gratuits pour choisir votre destination, preparer votre dossier et parler a un conseiller EduGrowth.',
    badge: 'Ressources gratuites',
    heading: 'Commencez par le bon guide avant de contacter une agence',
    intro:
      'Ces ressources transforment les visiteurs TikTok, Instagram et Google en leads qualifies : budget, visa, Campus France, alternance et choix de destination.',
    download: 'Ouvrir la ressource',
    whatsapp: 'Recevoir par WhatsApp',
    quiz: 'Tester mon profil',
    seriesTitle: 'Series de contenu a produire chaque semaine',
    funnelTitle: 'Funnel acquisition recommande',
    funnel: ['TikTok / Reel / SEO', 'Ressource ou quiz', 'WhatsApp segmente', 'Consultation', 'Candidature'],
    ctaTitle: 'Vous voulez une orientation personnalisee ?',
    ctaText: 'Envoyez votre destination, budget et niveau. Un conseiller vous indiquera la prochaine etape realiste.',
    whatsappText: 'Bonjour EduGrowth, je veux recevoir une ressource gratuite et verifier mon profil.',
  },
  en: {
    title: 'Free Study Abroad Resources Tunisia | EduGrowth',
    description:
      'Free checklists, guides, and quizzes to choose your destination, prepare your file, and talk to an EduGrowth advisor.',
    badge: 'Free resources',
    heading: 'Start with the right guide before contacting an agency',
    intro:
      'These resources turn TikTok, Instagram, and Google visitors into qualified leads: budget, visa, Campus France, work-study, and destination choice.',
    download: 'Open resource',
    whatsapp: 'Receive on WhatsApp',
    quiz: 'Check my profile',
    seriesTitle: 'Content series to produce every week',
    funnelTitle: 'Recommended acquisition funnel',
    funnel: ['TikTok / Reel / SEO', 'Resource or quiz', 'Segmented WhatsApp', 'Consultation', 'Application'],
    ctaTitle: 'Need personalized guidance?',
    ctaText: 'Send your destination, budget, and level. An advisor will suggest the next realistic step.',
    whatsappText: 'Hello EduGrowth, I want a free resource and to check my profile.',
  },
};

export default function ResourcesPage() {
  const { lang, toggleLanguage } = useLanguage();
  const t = copy[lang] || copy.en;
  const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.whatsappText)}`;

  return (
    <>
      <SEOHelmet title={t.title} description={t.description} canonical="https://edugrowth.tn/resources" lang={lang} />
      <div className="min-h-screen bg-[#f7fafc] text-slate-900">
        <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <Link to="/" className="font-black text-[#17324d]">EduGrowth</Link>
            <LanguageSwitch lang={lang} onToggle={toggleLanguage} />
          </div>
        </header>

        <main>
          <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#eef8fb] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#176b87]">
                  <Download size={15} />
                  {t.badge}
                </div>
                <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight text-[#17324d] sm:text-6xl">{t.heading}</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{t.intro}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('generate_lead', { lead_source: 'resources_whatsapp' })} className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-4 text-sm font-black text-white hover:bg-emerald-700">
                    <MessageCircle size={18} />
                    {t.whatsapp}
                  </a>
                  <Link to="/#eligibility-quiz" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black text-[#17324d] hover:bg-slate-50">
                    <FileCheck2 size={18} />
                    {t.quiz}
                  </Link>
                </div>
              </div>

              <div className="rounded-[1.75rem] bg-[#17324d] p-6 text-white shadow-xl shadow-slate-900/10">
                <h2 className="text-2xl font-black">{t.funnelTitle}</h2>
                <div className="mt-6 grid gap-3">
                  {t.funnel.map((step, index) => (
                    <div key={step} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-black text-[#17324d]">{index + 1}</div>
                      <span className="font-bold">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-6">
            <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-4">
              {resources.map((resource) => (
                <article key={resource.key} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#eef8fb] px-3 py-1 text-xs font-black text-[#176b87]">{resource.type}</span>
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{resource.destination}</span>
                  </div>
                  <h2 className="mt-5 text-xl font-black text-[#17324d]">{lang === 'fr' ? resource.titleFr : resource.titleEn}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{lang === 'fr' ? resource.descriptionFr : resource.descriptionEn}</p>
                  <Link
                    to={resource.path}
                    onClick={() => trackEvent('resource_click', { resource_key: resource.key, destination: resource.destination })}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#176b87]"
                  >
                    {t.download}
                    <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="bg-white px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#176b87]">TikTok / Instagram / SEO</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#17324d] sm:text-5xl">{t.seriesTitle}</h2>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {contentSeries.map((series) => (
                  <article key={series.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <PlayCircle size={26} className="text-[#176b87]" />
                    <h3 className="mt-5 text-xl font-black text-[#17324d]">{series.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">"{series.hook}"</p>
                    <div className="mt-4 inline-flex rounded-full bg-white px-3 py-1 text-xs font-black text-slate-500 ring-1 ring-slate-200">{series.format}</div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-6">
            <div className="mx-auto grid max-w-6xl gap-6 rounded-[1.75rem] bg-[#17324d] p-8 text-white shadow-xl shadow-slate-900/10 lg:grid-cols-[1fr_0.7fr] lg:items-center">
              <div>
                <BookOpen size={34} className="text-cyan-200" />
                <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">{t.ctaTitle}</h2>
                <p className="mt-4 text-lg leading-8 text-slate-200">{t.ctaText}</p>
              </div>
              <div className="grid gap-3">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('generate_lead', { lead_source: 'resources_final_whatsapp' })} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-[#17324d] hover:bg-slate-100">
                  <MessageCircle size={18} />
                  {t.whatsapp}
                </a>
                <Link to="/book-consultation" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-black text-white hover:bg-white/15">
                  <CalendarDays size={18} />
                  Consultation
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
