import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, GraduationCap, MessageCircle } from 'lucide-react';
import { trackEvent } from '../utils/tracking';
import { useLanguage } from '../context/LanguageContext.jsx';

const WA_NUMBER = '21656590703';

function buildApplyUrl(pathname, lang) {
  const params = new URLSearchParams({
    utm_source: 'website',
    utm_medium: 'sticky_cta',
    utm_campaign: pathname.replace(/\//g, '_') || 'homepage',
    utm_content: lang,
  });

  return `https://app.edugrowth.tn/apply?${params.toString()}`;
}

function getWhatsAppText(pathname, lang) {
  const isFr = lang === 'fr';

  if (pathname.includes('canada')) {
    return isFr
      ? 'Bonjour EduGrowth, je souhaite verifier mon eligibilite pour etudier au Canada.'
      : 'Hello EduGrowth, I want to check my eligibility to study in Canada.';
  }

  if (pathname.includes('allemagne') || pathname.includes('ausbildung')) {
    return isFr
      ? "Bonjour EduGrowth, je souhaite verifier mon profil pour l'Allemagne ou l'Ausbildung."
      : 'Hello EduGrowth, I want to check my profile for Germany or Ausbildung.';
  }

  if (pathname.includes('alternance')) {
    return isFr
      ? 'Bonjour EduGrowth, je souhaite etudier en France en alternance et verifier mon profil.'
      : 'Hello EduGrowth, I want to study in France through work-study and check my profile.';
  }

  if (pathname.includes('france') || pathname.includes('campus-france')) {
    return isFr
      ? 'Bonjour EduGrowth, je souhaite etudier en France et preparer mon dossier Campus France.'
      : 'Hello EduGrowth, I want to study in France and prepare my Campus France file.';
  }

  if (pathname.includes('chypre') || pathname.includes('cyprus')) {
    return isFr
      ? 'Bonjour EduGrowth, je souhaite verifier mon eligibilite pour Chypre du Nord.'
      : 'Hello EduGrowth, I want to check my eligibility for North Cyprus.';
  }

  if (pathname.includes('turquie') || pathname.includes('turkey')) {
    return isFr
      ? 'Bonjour EduGrowth, je souhaite verifier mon eligibilite pour etudier en Turquie.'
      : 'Hello EduGrowth, I want to check my eligibility to study in Turkey.';
  }

  if (pathname.includes('dubai') || pathname.includes('uae')) {
    return isFr
      ? 'Bonjour EduGrowth, je souhaite verifier mon eligibilite pour etudier a Dubai.'
      : 'Hello EduGrowth, I want to check my eligibility to study in Dubai.';
  }

  if (pathname.includes('outsourcing')) {
    return isFr
      ? 'Bonjour EduGrowth, je souhaite parler de vos services partenaires.'
      : 'Hello EduGrowth, I want to discuss your partner services.';
  }

  return isFr
    ? "Bonjour EduGrowth, je souhaite tester mon eligibilite pour etudier a l'etranger."
    : 'Hello EduGrowth, I want to check my eligibility to study abroad.';
}

export default function StickyCTA() {
  const { lang } = useLanguage();
  const { pathname } = useLocation();

  if (pathname === '/book-consultation') return null;

  const isStudentJourney =
    pathname === '/' ||
    pathname === '/abroad-zone' ||
    pathname.includes('etudier') ||
    pathname.includes('programmes') ||
    pathname.includes('blog');

  const whatsappText = getWhatsAppText(pathname, lang);

  const copy = lang === 'fr'
      ? {
        consultation: 'Consultation gratuite',
        whatsapp: 'WhatsApp',
        apply: 'Éligibilité',
      }
    : {
        consultation: 'Free Consultation',
        whatsapp: 'WhatsApp',
        apply: 'Eligibility',
      };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-3 py-3 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur supports-[backdrop-filter]:bg-white/80 sm:left-auto sm:right-4 sm:bottom-4 sm:inset-x-auto sm:w-auto sm:rounded-2xl sm:border sm:px-4 sm:py-4 sm:shadow-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-2 sm:gap-3">
        {isStudentJourney ? (
          <a
            href={buildApplyUrl(pathname, lang)}
            onClick={() => trackEvent('cta_click', { cta_type: 'sticky_apply', page: pathname })}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#17324d] px-3 py-3 text-sm font-black text-white transition-all duration-200 hover:bg-[#10263b] active:scale-95 touch-manipulation sm:min-w-[210px] sm:px-4 sm:py-3"
          >
            <GraduationCap size={16} className="flex-shrink-0" />
            <span className="truncate">{copy.apply}</span>
          </a>
        ) : (
          <Link
            to="/book-consultation"
            onClick={() => trackEvent('cta_click', { cta_type: 'sticky_book_consultation', page: pathname })}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#17324d] px-3 py-3 text-sm font-black text-white transition-all duration-200 hover:bg-[#10263b] active:scale-95 touch-manipulation sm:min-w-[210px] sm:px-4 sm:py-3"
          >
            <CalendarDays size={16} className="flex-shrink-0" />
            <span className="truncate">{copy.consultation}</span>
          </Link>
        )}
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
