import { Link, useLocation } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

export default function ThankYouPage() {
  const { lang, toggleLanguage } = useLanguage();
  const { state } = useLocation();
  const name = state?.name || 'there';
  const segment = state?.segment || 'general';

  const whatsappMessage =
    lang === 'fr'
      ? "Bonjour EduGrowth, j’ai soumis le formulaire et je veux avancer rapidement."
      : segment === 'b2b_outsourcing'
        ? 'Hello EduGrowth, I submitted the form and I want a quick B2B call slot.'
        : 'Hello EduGrowth, I submitted the form and I want to move forward quickly.';

  const copy = lang === 'fr'
    ? {
        title: 'Merci | EduGrowth',
        description: 'Votre demande a bien été reçue. Réservez la prochaine étape avec EduGrowth.',
        badge: 'Demande reçue',
        heading: `Merci, ${name}.`,
        text:
          "Nous avons bien reçu votre demande. Prochaine étape : confirmez votre priorité sur WhatsApp afin que notre équipe vous réponde plus vite.",
        confirm: 'Confirmer sur WhatsApp',
        consultation: 'Page consultation',
        portal: 'Portail',
      }
    : {
        title: 'Thank You | EduGrowth',
        description: 'Your request has been received. Book your next step with EduGrowth.',
        badge: 'Request Received',
        heading: `Thanks, ${name}.`,
        text:
          'We received your request. Next step: confirm your priority on WhatsApp so our team can reply faster.',
        confirm: 'Confirm on WhatsApp',
        consultation: 'Book Consultation Page',
        portal: 'Portal',
      };

  return (
    <>
      <SEOHelmet
        title={copy.title}
        description={copy.description}
        canonical="https://edugrowth.tn/thank-you"
        robotsContent="noindex, nofollow"
        lang={lang}
      />
      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mb-4 flex justify-end">
            <LanguageSwitch lang={lang} onToggle={toggleLanguage} />
          </div>
          <p className="inline-flex rounded-full bg-emerald-50 px-4 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
            {copy.badge}
          </p>
          <h1 className="mt-5 text-4xl font-black">{copy.heading}</h1>
          <p className="mt-3 text-slate-600">{copy.text}</p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white hover:bg-emerald-700"
            >
              {copy.confirm}
            </a>
            <Link to="/book-consultation" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-100">
              {copy.consultation}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-bold text-[#005A9C]">
            <Link to="/">{copy.portal}</Link>
            <Link to="/abroad-zone">Abroad Zone</Link>
            <Link to="/outsourcing">Outsourcing</Link>
          </div>
        </div>
      </div>
    </>
  );
}
