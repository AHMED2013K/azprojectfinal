import { Link, useLocation } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

const WA_NUMBER = '21656590703';

export default function ThankYouPage() {
  const { state } = useLocation();
  const name = state?.name || 'there';
  const segment = state?.segment || 'general';

  const whatsappMessage =
    segment === 'b2b_outsourcing'
      ? 'Hello EduGrowth, I submitted the form and I want a quick B2B call slot.'
      : 'Bonjour EduGrowth, j’ai soumis le formulaire et je veux avancer rapidement.';

  return (
    <>
      <SEOHelmet
        title="Thank You | EduGrowth"
        description="Your request has been received. Book your next step with EduGrowth."
        canonical="https://edugrowth.tn/thank-you"
        robotsContent="noindex, nofollow"
      />
      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <p className="inline-flex rounded-full bg-emerald-50 px-4 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
            Request Received
          </p>
          <h1 className="mt-5 text-4xl font-black">Thanks, {name}.</h1>
          <p className="mt-3 text-slate-600">
            We received your request. Next step: confirm your priority on WhatsApp so our team can
            reply faster.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white hover:bg-emerald-700"
            >
              Confirm on WhatsApp
            </a>
            <Link to="/book-consultation" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-100">
              Book Consultation Page
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-bold text-[#005A9C]">
            <Link to="/">Portal</Link>
            <Link to="/abroad-zone">Abroad Zone</Link>
            <Link to="/outsourcing">Outsourcing</Link>
          </div>
        </div>
      </div>
    </>
  );
}
