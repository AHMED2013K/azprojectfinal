import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { trackEvent } from '../utils/tracking';

const WA_NUMBER = '21656590703';

function extractUtm(search) {
  const params = new URLSearchParams(search);
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    utm_term: params.get('utm_term') || '',
    gclid: params.get('gclid') || '',
    fbclid: params.get('fbclid') || '',
  };
}

export default function LeadCaptureForm({
  segment = 'general',
  sourcePage = 'unknown',
  heading = 'Get Your Free Consultation',
  buttonLabel = 'Get My Free Consultation',
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const utm = useMemo(() => extractUtm(location.search), [location.search]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const lead = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      organization: String(formData.get('organization') || ''),
      objective: String(formData.get('objective') || ''),
      segment,
      sourcePage,
      referrer: document.referrer || '',
      createdAt: new Date().toISOString(),
      ...utm,
    };

    const currentLeads = JSON.parse(localStorage.getItem('eg_leads') || '[]');
    localStorage.setItem('eg_leads', JSON.stringify([lead, ...currentLeads].slice(0, 200)));

    trackEvent('generate_lead', {
      lead_source: sourcePage,
      lead_segment: segment,
      page_location: location.pathname,
      campaign: utm.utm_campaign || undefined,
      value: 1,
      currency: 'USD',
    });

    const message = [
      'New Funnel Lead',
      `Segment: ${segment}`,
      `Source page: ${sourcePage}`,
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone}`,
      `Organization: ${lead.organization}`,
      `Objective: ${lead.objective}`,
      `UTM Source: ${lead.utm_source}`,
      `UTM Medium: ${lead.utm_medium}`,
      `UTM Campaign: ${lead.utm_campaign}`,
      `UTM Content: ${lead.utm_content}`,
      `UTM Term: ${lead.utm_term}`,
      `GCLID: ${lead.gclid}`,
      `FBCLID: ${lead.fbclid}`,
    ].join('\n');

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');

    navigate('/thank-you', { state: { segment, name: lead.name || 'there' } });
    setIsSubmitting(false);
  };

  return (
    <div className="rounded-3xl bg-white p-7 shadow-xl">
      <h2 className="text-2xl font-black text-slate-900">{heading}</h2>
      <p className="mt-2 text-sm text-slate-600">30-second form. Our team replies quickly on WhatsApp.</p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <input
          name="name"
          required
          placeholder="Full Name"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]"
        />
        <input
          name="phone"
          required
          placeholder="Phone / WhatsApp"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]"
        />
        <input
          name="organization"
          placeholder="School / Agency / University (optional)"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]"
        />
        <textarea
          name="objective"
          rows="3"
          required
          placeholder="What is your goal?"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-[#005A9C]"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-[#005A9C] px-4 py-3 font-black text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting...' : buttonLabel}
        </button>
      </form>
    </div>
  );
}
