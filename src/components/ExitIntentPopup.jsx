import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { trackEvent } from '../utils/tracking';

const WA_NUMBER = '21656590703';
const STORAGE_KEY = 'eg_exit_popup_seen';

export default function ExitIntentPopup() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/book-consultation' || pathname === '/thank-you' || pathname.startsWith('/lp/')) return;
    if (localStorage.getItem(STORAGE_KEY) === '1') return;

    const handleMouseLeave = (event) => {
      if (event.clientY <= 0) {
        setOpen(true);
        localStorage.setItem(STORAGE_KEY, '1');
        trackEvent('popup_view', { popup_type: 'exit_intent', page: pathname });
      }
    };

    document.addEventListener('mouseout', handleMouseLeave);
    return () => document.removeEventListener('mouseout', handleMouseLeave);
  }, [pathname]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900">Before You Leave</h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-sm leading-7 text-slate-600">
          Get our free case study + action checklist to study abroad or scale admissions with
          outsourcing in Tunisia.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href="/case-study-lp.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent('cta_click', { cta_type: 'exit_popup_download_case_study', page: pathname })
            }
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-black text-white hover:bg-black"
          >
            Download Free PDF
          </a>
          <Link
            to="/book-consultation"
            onClick={() =>
              trackEvent('cta_click', { cta_type: 'exit_popup_book_consultation', page: pathname })
            }
            className="inline-flex items-center justify-center rounded-xl bg-[#005A9C] px-4 py-3 text-sm font-black text-white hover:bg-blue-700"
          >
            Book Free Consultation
          </Link>
        </div>

        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
            'Hello EduGrowth, I want the checklist and a quick consultation.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('cta_click', { cta_type: 'exit_popup_whatsapp', page: pathname })}
          className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700 hover:bg-emerald-100"
        >
          WhatsApp Me The Checklist
        </a>
      </div>
    </div>
  );
}
