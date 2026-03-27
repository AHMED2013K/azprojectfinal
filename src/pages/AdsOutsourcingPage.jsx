import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import LeadCaptureForm from '../components/LeadCaptureForm';

export default function AdsOutsourcingPage() {
  return (
    <>
      <SEOHelmet
        title="Education Outsourcing Tunisia | Free B2B Audit | EduGrowth"
        description="Reduce admissions costs and scale student recruitment with multilingual outsourcing teams in Tunisia."
        canonical="https://edugrowth.tn/lp/outsourcing"
        robotsContent="noindex, nofollow"
      />
      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <section className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
              <p className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
                Free B2B Outsourcing Audit
              </p>
              <h1 className="mt-5 text-5xl font-black leading-tight">
                Scale Admissions Without Hiring In-House
              </h1>
              <p className="mt-4 text-lg text-slate-300">
                Build a multilingual admissions team in Tunisia and improve conversion speed while
                controlling cost.
              </p>
              <div className="mt-7 space-y-3 text-sm text-slate-200">
                <p>1. Cost comparison: in-house vs outsourced</p>
                <p>2. KPI framework: response, qualification, conversion</p>
                <p>3. 30-day pilot launch roadmap</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-black">
                <Link to="/outsourcing" className="rounded-xl border border-white/30 px-4 py-2 hover:bg-white/10">
                  Explore Outsourcing Page
                </Link>
                <Link to="/education-outsourcing-tunisia" className="rounded-xl border border-white/30 px-4 py-2 hover:bg-white/10">
                  Education Outsourcing Details
                </Link>
              </div>
            </section>

            <LeadCaptureForm
              segment="b2b_outsourcing"
              sourcePage="lp_outsourcing"
              heading="Request Your Free Outsourcing Audit"
              buttonLabel="Get My Free Audit"
            />
          </div>
        </div>
      </div>
    </>
  );
}
