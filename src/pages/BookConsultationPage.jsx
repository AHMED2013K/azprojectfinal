import { Link } from 'react-router-dom';
import { CalendarDays, CheckCircle2, Home, MessageCircle } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { trackEvent } from '../utils/tracking';

const WA_NUMBER = '21656590703';

export default function BookConsultationPage() {
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
      'New Free Consultation Request',
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
        title="Book Free Consultation | EduGrowth Outsourcing Tunisia"
        description="Book a free consultation with EduGrowth for study abroad guidance or education outsourcing in Tunisia."
        canonical="https://edugrowth.tn/book-consultation"
      />
      <div className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <Link to="/" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">
              <Home size={16} /> Back to Portal
            </Link>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello EduGrowth, I want to book a free consultation.')}`}
              onClick={() => trackEvent('cta_click', { cta_type: 'book_consultation_whatsapp_direct' })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700"
            >
              <MessageCircle size={16} /> WhatsApp Direct
            </a>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#005A9C]">
                <CalendarDays size={14} /> Free Consultation
              </p>
              <h1 className="text-4xl font-black leading-tight">Book Your Strategy Call</h1>
              <p className="mt-4 text-slate-600">
                We help students study abroad and institutions outsource admissions, recruitment, and back-office operations from Tunisia.
              </p>

              <div className="mt-8 space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-emerald-600" size={18} />
                  <p>Custom roadmap based on your objective</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-emerald-600" size={18} />
                  <p>Clear next steps in less than 30 minutes</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 text-emerald-600" size={18} />
                  <p>Fast WhatsApp follow-up from our team</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" required placeholder="Full name" className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]" />
                <input name="email" type="email" required placeholder="Professional email" className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]" />
                <input name="phone" required placeholder="Phone / WhatsApp" className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]" />
                <select name="profile" required className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]">
                  <option value="">I am...</option>
                  <option value="student">Student</option>
                  <option value="university">University / School</option>
                  <option value="agency">Education Agency</option>
                </select>
                <textarea name="need" rows="4" required placeholder="Tell us what you need help with" className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]" />
                <button type="submit" className="w-full rounded-xl bg-[#005A9C] px-4 py-3 font-black text-white hover:bg-blue-700">
                  Send Request on WhatsApp
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
