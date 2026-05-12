import { Link } from 'react-router-dom';
import { CalendarDays, CheckCircle2, Home, Mail, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { useLanguage } from '../context/LanguageContext.jsx';
import LanguageSwitch from '../components/LanguageSwitch';
import { trackEvent } from '../utils/tracking';

const WA_NUMBER = '21656590703';

const ContactPage = () => {
  const { lang, toggleLanguage } = useLanguage();
  const isFr = lang === 'fr';
  const copy = isFr
    ? {
        title: 'Contact EduGrowth | Conseiller etudes a l’etranger Tunisie',
        description: "Contactez EduGrowth pour un diagnostic etudiant, une question parent ou un projet d'etudes a l'etranger depuis la Tunisie.",
        badge: 'Contact',
        heading: 'Parlez a un conseiller EduGrowth',
        intro:
          "Expliquez votre situation, votre budget et votre objectif. L'equipe vous orientera vers les prochaines etapes sans promesse irrealisable.",
        whatsapp: 'WhatsApp direct',
        consultation: 'Reserver une consultation',
        apply: 'Tester mon eligibilite',
        trust: [
          'Parents bienvenus dans les echanges',
          'Aucune promesse de visa garanti',
          'Orientation selon profil et budget',
        ],
        warning:
          "Important : aucun conseiller serieux ne peut garantir un visa. L'objectif est de preparer un dossier coherent et complet.",
        whatsappText: "Bonjour EduGrowth, je veux parler a un conseiller pour mon projet d'etudes a l'etranger.",
      }
    : {
        title: 'Contact EduGrowth | Study abroad advisor Tunisia',
        description: 'Contact EduGrowth for student diagnosis, parent questions, or a study abroad project from Tunisia.',
        badge: 'Contact',
        heading: 'Talk to an EduGrowth advisor',
        intro:
          'Explain your situation, budget, and objective. The team will guide you toward next steps without unrealistic promises.',
        whatsapp: 'WhatsApp Direct',
        consultation: 'Book Consultation',
        apply: 'Check Eligibility',
        trust: [
          'Parents welcome in discussions',
          'No guaranteed visa promise',
          'Guidance based on profile and budget',
        ],
        warning:
          'Important: no serious advisor can guarantee a visa. The goal is to prepare a coherent and complete file.',
        whatsappText: 'Hello EduGrowth, I want to talk to an advisor about my study abroad project.',
      };

  const applyUrl = `https://app.edugrowth.tn/apply?utm_source=website&utm_medium=contact_page&utm_campaign=student_contact&utm_content=${lang}`;
  const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.whatsappText)}`;

  return (
    <>
      <SEOHelmet title={copy.title} description={copy.description} canonical="https://edugrowth.tn/contact" lang={lang} />
      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link to="/" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">
              <Home size={16} /> Home
            </Link>
            <LanguageSwitch lang={lang} onToggle={toggleLanguage} />
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
            <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#eef8fb] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#176b87]">
                <ShieldCheck size={14} /> {copy.badge}
              </p>
              <h1 className="mt-5 text-4xl font-black leading-tight text-[#17324d] sm:text-5xl">{copy.heading}</h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">{copy.intro}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {copy.trust.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700">
                    <CheckCircle2 size={17} className="mb-3 text-[#176b87]" />
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
              <div className="space-y-4">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('cta_click', { cta_type: 'contact_whatsapp' })} className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-4 text-sm font-black text-white hover:bg-emerald-700">
                  <MessageCircle size={18} /> {copy.whatsapp}
                </a>
                <Link to="/book-consultation" onClick={() => trackEvent('cta_click', { cta_type: 'contact_consultation' })} className="flex items-center justify-center gap-2 rounded-2xl bg-[#17324d] px-5 py-4 text-sm font-black text-white hover:bg-[#10263b]">
                  <CalendarDays size={18} /> {copy.consultation}
                </Link>
                <a href={applyUrl} onClick={() => trackEvent('cta_click', { cta_type: 'contact_apply' })} className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-black text-slate-800 hover:bg-slate-100">
                  {copy.apply}
                </a>
              </div>

              <div className="mt-8 space-y-4 text-sm font-semibold text-slate-700">
                <div className="flex items-start gap-3"><Phone className="mt-0.5 text-[#176b87]" size={18} /> +216 56 59 07 03</div>
                <div className="flex items-start gap-3"><Mail className="mt-0.5 text-[#176b87]" size={18} /> contact@edugrowth.tn</div>
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">{copy.warning}</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
