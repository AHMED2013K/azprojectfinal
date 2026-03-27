import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, MessageCircle } from 'lucide-react';
import { trackEvent } from '../utils/tracking';

const WA_NUMBER = '21656590703';

export default function StickyCTA() {
  const { pathname } = useLocation();

  if (pathname === '/book-consultation') return null;

  const whatsappText =
    pathname === '/outsourcing'
      ? 'Hello EduGrowth, I want a free outsourcing consultation.'
      : 'Bonjour EduGrowth, je souhaite une consultation gratuite.';

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-3 py-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur sm:left-auto sm:right-4 sm:bottom-4 sm:inset-x-auto sm:w-auto sm:rounded-2xl sm:border sm:px-4 sm:py-4">
      <div className="mx-auto flex max-w-6xl items-center gap-2 sm:gap-3">
        <Link
          to="/book-consultation"
          onClick={() => trackEvent('cta_click', { cta_type: 'sticky_book_consultation', page: pathname })}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#005A9C] px-4 py-3 text-sm font-black text-white transition hover:bg-blue-700 sm:min-w-[210px]"
        >
          <CalendarDays size={16} /> Book Free Consultation
        </Link>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(whatsappText)}`}
          onClick={() => trackEvent('cta_click', { cta_type: 'sticky_whatsapp', page: pathname })}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700 transition hover:bg-emerald-100 sm:min-w-[180px]"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>
    </div>
  );
}
