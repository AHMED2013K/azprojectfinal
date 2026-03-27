import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import LeadCaptureForm from '../components/LeadCaptureForm';

export default function AdsStudyAbroadPage() {
  return (
    <>
      <SEOHelmet
        title="Study Abroad from Tunisia | Free Consultation | EduGrowth"
        description="Get personalized study abroad guidance from Tunisia: destination, admission, visa, and application strategy."
        canonical="https://edugrowth.tn/lp/study-abroad"
        robotsContent="noindex, nofollow"
      />
      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <section className="rounded-3xl bg-slate-950 p-8 text-white shadow-xl">
              <p className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-black uppercase tracking-[0.2em] text-blue-200">
                Free Student Consultation
              </p>
              <h1 className="mt-5 text-5xl font-black leading-tight">
                Study Abroad Without Guesswork
              </h1>
              <p className="mt-4 text-lg text-slate-300">
                We guide you from destination choice to visa approval. Fast support, clear steps, and
                practical WhatsApp follow-up.
              </p>
              <div className="mt-7 space-y-3 text-sm text-slate-200">
                <p>1. Destination strategy based on your budget</p>
                <p>2. Admission file preparation and timeline</p>
                <p>3. Visa checklist and interview readiness</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-black">
                <Link to="/abroad-zone" className="rounded-xl border border-white/30 px-4 py-2 hover:bg-white/10">
                  Explore Abroad Zone
                </Link>
                <Link to="/blog/comment-etudier-en-france-depuis-la-tunisie" className="rounded-xl border border-white/30 px-4 py-2 hover:bg-white/10">
                  Read France Guide
                </Link>
              </div>
            </section>

            <LeadCaptureForm
              segment="b2c_student"
              sourcePage="lp_study_abroad"
              heading="Get Your Free Study Abroad Plan"
              buttonLabel="Send My Free Plan"
            />
          </div>
        </div>
      </div>
    </>
  );
}
