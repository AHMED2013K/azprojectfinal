import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Handshake, Home, ShieldCheck, Users } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const PartnersPage = () => (
  <>
    <SEOHelmet
      title="Partenaires EduGrowth | Universités, agences et institutions"
      description="Découvrez les universités, sous-agents et agences partenaires EduGrowth pour accompagner les étudiants tunisiens vers l’étranger."
      canonical="https://edugrowth.tn/partners"
      lang="fr"
    />
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            <Home size={16} /> Accueil
          </Link>
        </div>

        <section className="rounded-[2rem] bg-gradient-to-br from-[#17324d] via-[#0f4d6b] to-[#176b87] p-8 text-white shadow-xl sm:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">
            <Handshake size={15} /> Partenaires & institutions
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            EduGrowth regroupe désormais les universités, agences et partenaires qui peuvent accompagner les étudiants vers l’étranger.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100">
            La page est pensée pour rendre le réseau EduGrowth visible pour les étudiants, les familles, les sous-agents et les agences de voyages qui cherchent un partenaire sérieux.
          </p>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <Link to="/partenaires-universites" className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <Building2 size={24} className="text-[#176b87]" />
            <h2 className="mt-5 text-xl font-black text-[#17324d]">Universités partenaires</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">France, Dubai, Maroc, Allemagne, Chypre du Nord, Roumanie, Turquie, Albanie, Russie, Royaume-Uni.</p>
          </Link>
          <Link to="/devenir-partenaire" className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <Users size={24} className="text-[#176b87]" />
            <h2 className="mt-5 text-xl font-black text-[#17324d]">Devenir partenaire</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">Pour les universités, sous-agents, agences de conseil et agences de voyages qui veulent collaborer avec EduGrowth.</p>
          </Link>
          <a href="https://share.google/CQnH7g1VhKplOtzGs" target="_blank" rel="noreferrer" className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <ShieldCheck size={24} className="text-[#176b87]" />
            <h2 className="mt-5 text-xl font-black text-[#17324d]">Avis Google & preuve</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">Laissez un avis Google et consultez les preuves de réussite partagées par EduGrowth.</p>
          </a>
        </section>

        <section className="mt-10 rounded-[1.75rem] border border-slate-200 bg-[#f8fbfd] p-8 shadow-sm">
          <h2 className="text-3xl font-black text-[#17324d]">Ce que cette page apporte au référencement</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              'Des URLs dédiées aux universités partenaires pour améliorer la visibilité SEO/GEO.',
              'Des pages de partenariat et de sous-agents pour attirer des acteurs qualifiés.',
              'Des liens vers les preuves de réussite et les avis Google pour renforcer la confiance.',
              'Des mots-clés à forte intention comme universités partenaires Tunisie, agences de voyages, sous-agent et étude à l’étranger.',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#17324d] px-6 py-3 text-sm font-black text-white hover:bg-[#10263b]">
            Demander un partenariat
            <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </div>
  </>
);

export default PartnersPage;
