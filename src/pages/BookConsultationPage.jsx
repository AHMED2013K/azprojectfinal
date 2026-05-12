import { Link } from 'react-router-dom';
import { CalendarDays, CheckCircle2, Home, MessageCircle } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { trackEvent } from '../utils/tracking';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

export default function BookConsultationPage() {
  const { lang, toggleLanguage } = useLanguage();

  const copy = {
    en: {
      title: 'Book Free Consultation | EduGrowth Study Abroad Tunisia',
      description: 'Book a free consultation with EduGrowth for study abroad guidance from Tunisia.',
      back: 'Back Home',
      whatsappDirect: 'WhatsApp Direct',
      whatsappText: 'Hello EduGrowth, I want to book a free study abroad consultation.',
      badge: 'Free Consultation',
      heading: 'Book Your Study Abroad Call',
      intro:
        'Share your destination, budget, and current stage. The goal is to give you clear next steps without unrealistic promises.',
      points: [
        'Profile review based on destination, budget, and timeline',
        'Clear next steps in less than 30 minutes',
        'Fast WhatsApp follow-up from our team',
      ],
      name: 'Full name',
      phone: 'Phone / WhatsApp',
      destinationPlaceholder: 'Target destination',
      budgetPlaceholder: 'Estimated monthly budget',
      stagePlaceholder: 'Current stage',
      destinations: ['France', 'Germany', 'Canada', 'North Cyprus', 'Turkey', 'Dubai', 'Not sure yet'],
      budgets: ['Under EUR 500', 'EUR 500 - 800', 'EUR 800 - 1200', 'Over EUR 1200', 'To define with my parents'],
      stages: ['Comparing countries', 'Preparing application', 'Looking for work-study', 'Visa preparation', 'Parent discussion'],
      need: 'Optional details',
      submit: 'Send Request on WhatsApp',
      leadTitle: 'New Study Abroad Consultation Request',
    },
    fr: {
      title: 'Réserver une consultation gratuite | EduGrowth Tunisie',
      description: "Réservez une consultation gratuite avec EduGrowth pour vos études à l'étranger depuis la Tunisie.",
      back: 'Retour accueil',
      whatsappDirect: 'WhatsApp direct',
      whatsappText: "Bonjour EduGrowth, je veux reserver une consultation gratuite pour etudier a l'etranger.",
      badge: 'Consultation gratuite',
      heading: 'Réservez votre appel études à l’étranger',
      intro:
        "Indiquez votre destination, votre budget et votre etape actuelle. L'objectif est de vous donner des prochaines etapes claires, sans promesse irrealisable.",
      points: [
        'Analyse du profil selon destination, budget et calendrier',
        'Étapes suivantes claires en moins de 30 minutes',
        'Suivi rapide de notre équipe sur WhatsApp',
      ],
      name: 'Nom complet',
      phone: 'Téléphone / WhatsApp',
      destinationPlaceholder: 'Destination visee',
      budgetPlaceholder: 'Budget mensuel estime',
      stagePlaceholder: 'Etape actuelle',
      destinations: ['France', 'Allemagne', 'Canada', 'Chypre du Nord', 'Turquie', 'Dubai', 'Je ne sais pas encore'],
      budgets: ['Moins de 500 EUR', '500 - 800 EUR', '800 - 1200 EUR', 'Plus de 1200 EUR', 'A definir avec mes parents'],
      stages: ['Je compare les pays', 'Je prepare mon dossier', 'Je cherche une alternance', 'Je prepare le visa', 'Discussion avec mes parents'],
      need: 'Details optionnels',
      submit: 'Envoyer la demande sur WhatsApp',
      leadTitle: 'Nouvelle demande de consultation etudes a l’etranger',
    },
  }[lang];

  const handleSubmit = (event) => {
    event.preventDefault();
    trackEvent('generate_lead', {
      lead_source: 'book_consultation_form',
      page_location: '/book-consultation',
      value: 1,
      currency: 'USD',
    });
    const formData = new FormData(event.currentTarget);

    const message = [
      copy.leadTitle,
      `Name: ${formData.get('name')}`,
      `Phone: ${formData.get('phone')}`,
      `Destination: ${formData.get('destination')}`,
      `Budget: ${formData.get('budget')}`,
      `Stage: ${formData.get('stage')}`,
      `Need: ${formData.get('need')}`,
    ].join('\n');

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <SEOHelmet
        title={copy.title}
        description={copy.description}
        canonical="https://edugrowth.tn/book-consultation"
        lang={lang}
      />
      <div className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link to="/" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">
              <Home size={16} /> {copy.back}
            </Link>
            <div className="flex items-center gap-3">
              <LanguageSwitch lang={lang} onToggle={toggleLanguage} />
              <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.whatsappText)}`}
              onClick={() => trackEvent('cta_click', { cta_type: 'book_consultation_whatsapp_direct' })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700"
              >
                <MessageCircle size={16} /> {copy.whatsappDirect}
              </a>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#005A9C]">
                <CalendarDays size={14} /> {copy.badge}
              </p>
              <h1 className="text-4xl font-black leading-tight" data-i18n="book_consultation.heading">{copy.heading}</h1>
              <p className="mt-4 text-slate-600" data-i18n="book_consultation.intro">{copy.intro}</p>

              <div className="mt-8 space-y-4 text-sm text-slate-700">
                {copy.points.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 text-emerald-600" size={18} />
                    <p>{point}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
                {lang === 'fr'
                  ? 'Aucun visa ne peut etre garanti. La consultation sert a clarifier les options realistes.'
                  : 'No visa can be guaranteed. The consultation helps clarify realistic options.'}
              </div>
            </section>

            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" required placeholder={copy.name} data-i18n-placeholder="book_consultation.name" className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]" />
                <input name="phone" required placeholder={copy.phone} data-i18n-placeholder="book_consultation.phone" className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]" />
                <select name="destination" required className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]">
                  <option value="">{copy.destinationPlaceholder}</option>
                  {copy.destinations.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
                <select name="budget" required className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]">
                  <option value="">{copy.budgetPlaceholder}</option>
                  {copy.budgets.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
                <select name="stage" required className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]">
                  <option value="">{copy.stagePlaceholder}</option>
                  {copy.stages.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
                <textarea name="need" rows="3" placeholder={copy.need} data-i18n-placeholder="book_consultation.need" className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]" />
                <button type="submit" className="w-full rounded-xl bg-[#005A9C] px-4 py-3 font-black text-white hover:bg-blue-700">
                  {copy.submit}
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
