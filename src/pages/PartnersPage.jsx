import { Link } from 'react-router-dom';
import { Building2, CheckCircle2, Handshake, Home, ShieldCheck } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const PartnersPage = () => (
  <>
    <SEOHelmet
      title="Partenaires EduGrowth | Universites, ecoles et institutions"
      description="Espace institutionnel EduGrowth pour presenter les partenariats, accords, salons et collaborations a verifier."
      canonical="https://edugrowth.tn/partners"
      lang="fr"
    />
    <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100">
            <Home size={16} /> Accueil
          </Link>
        </div>

        <section className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#eef8fb] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#176b87]">
            <Handshake size={15} /> Partenaires & institutions
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-[#17324d] sm:text-6xl">
            Une page dediee aux preuves institutionnelles EduGrowth
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Cette page doit devenir l'espace de confiance pour les accords universites, ecoles, salons et collaborations. Les logos ne doivent etre ajoutes qu'apres validation reelle.
          </p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Building2,
              title: 'Accords verifies',
              text: 'Ajouter uniquement les universites, ecoles ou organismes avec relation confirmee.',
            },
            {
              icon: ShieldCheck,
              title: 'Preuves floutees',
              text: 'Presenter lettres, invitations ou documents en masquant toutes les donnees personnelles.',
            },
            {
              icon: CheckCircle2,
              title: 'Evenements reels',
              text: 'Publier photos de salons, reunions, webinaires et sessions parents avec dates.',
            },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <item.icon size={28} className="text-[#176b87]" />
              <h2 className="mt-5 text-xl font-black text-[#17324d]">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] bg-[#17324d] p-8 text-white md:p-10">
          <h2 className="text-3xl font-black">Elements a publier en priorite</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              'Logos partenaires avec accord ecrit',
              'Photos de l’equipe et du bureau',
              'Avis Google et temoignages video',
              'Exemples de lettres d’admission floutees',
              'Participation a des salons et evenements etudiants',
              'Checklists officielles par destination',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-semibold">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  </>
);

export default PartnersPage;
