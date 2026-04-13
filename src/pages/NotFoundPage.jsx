import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

export default function NotFoundPage() {
  return (
    <>
      <SEOHelmet
        title="Page introuvable | EduGrowth"
        description="Cette page n'existe plus ou a été déplacée."
        canonical="https://edugrowth.tn/404"
        robotsContent="noindex, nofollow"
        lang="fr"
      />
      <div className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-slate-500">404</p>
          <h1 className="mt-4 text-4xl font-black">Page introuvable</h1>
          <p className="mt-4 text-slate-600">
            L’URL demandee n’existe pas ou a ete deplacee. Reprenez depuis une page utile pour Google et pour vos visiteurs.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-black">
            <Link to="/" className="rounded-xl bg-[#005A9C] px-5 py-3 text-white">Accueil</Link>
            <Link to="/abroad-zone" className="rounded-xl border border-slate-300 px-5 py-3 text-slate-700">Abroad Zone</Link>
            <Link to="/blog" className="rounded-xl border border-slate-300 px-5 py-3 text-slate-700">Blog</Link>
          </div>
        </div>
      </div>
    </>
  );
}
