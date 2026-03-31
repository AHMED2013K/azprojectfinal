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
      title: 'Book Free Consultation | EduGrowth Outsourcing Tunisia',
      description: 'Book a free consultation with EduGrowth for study abroad guidance or education outsourcing in Tunisia.',
      back: 'Back to Portal',
      whatsappDirect: 'WhatsApp Direct',
      whatsappText: 'Hello EduGrowth, I want to book a free consultation.',
      badge: 'Free Consultation',
      heading: 'Book Your Strategy Call',
      intro:
        'We help students study abroad and institutions outsource admissions, recruitment, and back-office operations from Tunisia.',
      points: [
        'Custom roadmap based on your objective',
        'Clear next steps in less than 30 minutes',
        'Fast WhatsApp follow-up from our team',
      ],
      name: 'Full name',
      email: 'Professional email',
      phone: 'Phone / WhatsApp',
      profilePlaceholder: 'I am...',
      student: 'Student',
      university: 'University / School',
      agency: 'Education Agency',
      need: 'Tell us what you need help with',
      submit: 'Send Request on WhatsApp',
      leadTitle: 'New Free Consultation Request',
    },
    fr: {
      title: 'Réserver une consultation gratuite | EduGrowth Tunisie',
      description: "Réservez une consultation gratuite avec EduGrowth pour vos études à l'étranger ou vos besoins d'outsourcing éducatif en Tunisie.",
      back: 'Retour au portail',
      whatsappDirect: 'WhatsApp direct',
      whatsappText: 'Bonjour EduGrowth, je veux réserver une consultation gratuite.',
      badge: 'Consultation gratuite',
      heading: 'Réservez votre appel stratégique',
      intro:
        "Nous accompagnons les étudiants pour leurs études à l'étranger et les institutions pour l'externalisation des admissions, du recrutement et du back-office depuis la Tunisie.",
      points: [
        'Feuille de route personnalisée selon votre objectif',
        'Étapes suivantes claires en moins de 30 minutes',
        'Suivi rapide de notre équipe sur WhatsApp',
      ],
      name: 'Nom complet',
      email: 'Email professionnel',
      phone: 'Téléphone / WhatsApp',
      profilePlaceholder: 'Je suis...',
      student: 'Étudiant',
      university: 'Université / école',
      agency: "Agence d'éducation",
      need: "Expliquez-nous votre besoin",
      submit: 'Envoyer la demande sur WhatsApp',
      leadTitle: 'Nouvelle demande de consultation gratuite',
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
      `Email: ${formData.get('email')}`,
      `Phone: ${formData.get('phone')}`,
      `Profile: ${formData.get('profile')}`,
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
            </section>

            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" required placeholder={copy.name} data-i18n-placeholder="book_consultation.name" className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]" />
                <input name="email" type="email" required placeholder={copy.email} data-i18n-placeholder="book_consultation.email" className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]" />
                <input name="phone" required placeholder={copy.phone} data-i18n-placeholder="book_consultation.phone" className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]" />
                <select name="profile" required className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]">
                  <option value="">{copy.profilePlaceholder}</option>
                  <option value="student">{copy.student}</option>
                  <option value="university">{copy.university}</option>
                  <option value="agency">{copy.agency}</option>
                </select>
                <textarea name="need" rows="4" required placeholder={copy.need} data-i18n-placeholder="book_consultation.need" className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]" />
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
