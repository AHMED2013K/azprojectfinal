import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Globe2, Handshake, Home, MapPinned, Search, Users } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const regions = [
  'Tunisie',
  'Algérie',
  'Maroc',
  'Afrique francophone',
  'Afrique du Nord',
  'Étudiants maghrébins',
];

const services = [
  'Qualification des profils étudiants et parents',
  'Orientation destination, budget, langue et filière',
  'Collecte et vérification des documents',
  'Suivi admission, relance et reporting partenaire',
  'Préparation visa, logement et départ',
  'Activation locale via agences de voyages et sous-agents',
];

export default function UniversityRecruitmentAgencyPage() {
  return (
    <>
      <SEOHelmet
        title="Agence recrutement étudiants Afrique du Nord | Partenaire universités | EduGrowth"
        description="EduGrowth aide les universités internationales qui cherchent une agence d’orientation et de recrutement d’étudiants en Tunisie, Algérie, Maroc et Afrique francophone."
        canonical="https://edugrowth.tn/agence-recrutement-etudiants-afrique-du-nord"
        lang="fr"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Agence de recrutement étudiants en Afrique du Nord',
          serviceType: 'International student recruitment agency',
          provider: { '@id': 'https://edugrowth.tn/#organization' },
          areaServed: ['TN', 'DZ', 'MA', 'Africa'],
          audience: { '@type': 'Audience', audienceType: 'Universités et écoles internationales' },
        }}
      />
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              <Home size={16} /> Accueil
            </Link>
            <Link to="/devenir-partenaire" className="inline-flex items-center gap-2 rounded-full bg-[#17324d] px-4 py-2 text-sm font-black text-white hover:bg-[#10263b]">
              Devenir partenaire <ArrowRight size={16} />
            </Link>
          </div>

          <section className="rounded-[1.75rem] bg-[#17324d] p-8 text-white shadow-xl sm:p-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
              <Globe2 size={16} /> Student recruitment North Africa
            </div>
            <h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight sm:text-5xl">
              EduGrowth représente les universités qui cherchent des étudiants qualifiés en Tunisie, Algérie, Maroc et Afrique.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100">
              Notre rôle est de connecter les établissements internationaux à des candidats sérieux, avec un suivi humain, une qualification du dossier et un réseau terrain d’agences partenaires.
            </p>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-3">
            {[
              ['B2B universités', 'Pour écoles et universités qui veulent recruter en Afrique du Nord.'],
              ['Sous-agents', 'Pour agences d’orientation qui souhaitent opérer avec EduGrowth.'],
              ['Agences de voyages', 'Pour opérateurs locaux qui reçoivent des demandes d’études à l’étranger.'],
            ].map(([title, text]) => (
              <article key={title} className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm">
                <Building2 className="text-[#176b87]" size={24} />
                <h2 className="mt-4 text-xl font-black text-[#17324d]">{title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[#176b87]">
                <MapPinned size={16} /> Zones couvertes
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {regions.map((region) => (
                  <span key={region} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700">
                    {region}
                  </span>
                ))}
              </div>
            </article>
            <article className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[#176b87]">
                <Users size={16} /> Ce que EduGrowth gère
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <div key={service} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700">
                    {service}
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="mt-8 rounded-[1.5rem] border border-cyan-100 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[#176b87]">
                  <Search size={16} /> Intentions SEO ciblées
                </div>
                <p className="mt-3 max-w-3xl leading-8 text-slate-600">
                  Cette page cible les recherches comme “student recruitment agency Tunisia”, “university partner North Africa”, “agence orientation étudiant Tunisie Algérie Maroc” et “sub-agent education Africa”.
                </p>
              </div>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17324d] px-6 py-3 text-sm font-black text-white hover:bg-[#10263b]">
                <Handshake size={16} /> Discuter partenariat
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
