import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, MessageCircle } from 'lucide-react';
import { trackEvent } from '../utils/tracking';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

export default function StickyCTA() {
  const { lang } = useLanguage();
  const { pathname } = useLocation();

  if (pathname === '/book-consultation') return null;

  const whatsappText =
    lang === 'fr'
      ? "Bonjour EduGrowth, je souhaite une consultation gratuite."
      : pathname === '/outsourcing'
        ? 'Hello EduGrowth, I want a free outsourcing consultation.'
        : 'Hello EduGrowth, I want a free consultation.';

  const copy = lang === 'fr'
    ? { consultation: 'Réserver une consultation gratuite', whatsapp: 'WhatsApp' }
    : { consultation: 'Book Free Consultation', whatsapp: 'WhatsApp' };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-3 py-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur supports-[backdrop-filter]:bg-white/80 sm:left-auto sm:right-4 sm:bottom-4 sm:inset-x-auto sm:w-auto sm:rounded-2xl sm:border sm:px-4 sm:py-4 sm:shadow-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-2 sm:gap-3">
        <Link
          to="/book-consultation"
          onClick={() => trackEvent('cta_click', { cta_type: 'sticky_book_consultation', page: pathname })}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#005A9C] px-3 py-3 text-sm font-black text-white transition-all duration-200 hover:bg-blue-700 hover:scale-105 active:scale-95 touch-manipulation sm:min-w-[210px] sm:px-4 sm:py-3"
        >
          <CalendarDays size={16} className="flex-shrink-0" />
          <span className="truncate">{copy.consultation}</span>
        </Link>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(whatsappText)}`}
          onClick={() => trackEvent('cta_click', { cta_type: 'sticky_whatsapp', page: pathname })}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-sm font-black text-emerald-700 transition-all duration-200 hover:bg-emerald-100 hover:scale-105 active:scale-95 touch-manipulation sm:min-w-[180px] sm:px-4 sm:py-3"
        >
          <MessageCircle size={16} className="flex-shrink-0" />
          <span className="truncate">{copy.whatsapp}</span>
        </a>
      </div>
    </div>
  );
}
