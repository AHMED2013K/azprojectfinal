import { Link, useLocation } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

const WA_NUMBER = '21656590703';

const cityData = {
  '/outsourcing-tunis': {
    city: 'Tunis',
    title: 'Outsourcing Tunis | Education Operations by EduGrowth',
    h1: 'Outsourcing services in Tunis for education institutions',
  },
  '/outsourcing-sousse': {
    city: 'Sousse',
    title: 'Outsourcing Sousse | Education Operations by EduGrowth',
    h1: 'Outsourcing services in Sousse for education institutions',
  },
  '/outsourcing-sfax': {
    city: 'Sfax',
    title: 'Outsourcing Sfax | Education Operations by EduGrowth',
    h1: 'Outsourcing services in Sfax for education institutions',
  },
};

export default function OutsourcingCityPage() {
  const { pathname } = useLocation();
  const data = cityData[pathname] || cityData['/outsourcing-tunis'];

  return (
    <>
      <SEOHelmet
        title={data.title}
        description={`Multilingual admissions and student recruitment outsourcing in ${data.city}, Tunisia.`}
        canonical={`https://edugrowth.tn${pathname}`}
      />
      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-wrap gap-3 text-sm font-bold text-[#005A9C]">
            <Link to="/outsourcing">Outsourcing</Link>
            <Link to="/education-outsourcing-tunisia">Education Outsourcing Tunisia</Link>
            <Link to="/book-consultation">Book Consultation</Link>
          </div>
          <h1 className="mt-4 text-4xl font-black">{data.h1}</h1>
          <p className="mt-3 text-slate-600">
            Dedicated teams in {data.city} for lead qualification, admissions follow-up, and CRM operations.
          </p>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-4">
              <h2 className="text-sm font-black uppercase text-slate-500">Speed</h2>
              <p className="mt-2 text-sm">Fast deployment and SLA-driven response workflows.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <h2 className="text-sm font-black uppercase text-slate-500">Quality</h2>
              <p className="mt-2 text-sm">Quality controls and clear KPI reporting for admissions teams.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <h2 className="text-sm font-black uppercase text-slate-500">Savings</h2>
              <p className="mt-2 text-sm">Reduce operating cost while scaling team capacity.</p>
            </div>
          </section>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book-consultation" className="rounded-xl bg-[#005A9C] px-5 py-3 text-sm font-black text-white">
              Book Free Consultation
            </Link>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                `Hello EduGrowth, I need an outsourcing proposal for operations in ${data.city}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
