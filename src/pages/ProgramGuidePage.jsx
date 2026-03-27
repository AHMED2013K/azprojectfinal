import { Link, useLocation } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

const WA_NUMBER = '21656590703';

const programData = {
  '/programmes/alternance-france': {
    title: 'Alternance en France depuis la Tunisie | Guide 2026',
    description:
      "Tout savoir pour trouver une alternance en France: candidature, entreprise, contrat et visa.",
    h1: 'Alternance en France depuis la Tunisie',
  },
  '/programmes/ausbildung-allemagne': {
    title: 'Ausbildung en Allemagne depuis la Tunisie | EduGrowth',
    description:
      "Guide complet Ausbildung: conditions, langue, dossier, contrat et installation en Allemagne.",
    h1: 'Ausbildung en Allemagne depuis la Tunisie',
  },
};

export default function ProgramGuidePage() {
  const { pathname } = useLocation();
  const data = programData[pathname] || programData['/programmes/alternance-france'];

  return (
    <>
      <SEOHelmet title={data.title} description={data.description} canonical={`https://edugrowth.tn${pathname}`} />
      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-wrap gap-3 text-sm font-bold text-[#005A9C]">
            <Link to="/abroad-zone">Abroad Zone</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/book-consultation">Book Consultation</Link>
          </div>
          <h1 className="mt-4 text-4xl font-black">{data.h1}</h1>
          <p className="mt-3 text-slate-600">{data.description}</p>

          <section className="mt-8 space-y-4">
            <h2 className="text-2xl font-black">Roadmap recommandée</h2>
            <p>1. Validation profil et niveau linguistique.</p>
            <p>2. Sélection des établissements/entreprises ciblés.</p>
            <p>3. Candidatures et préparation entretiens.</p>
            <p>4. Signature contrat + dossier visa.</p>
          </section>

          <section className="mt-8 rounded-2xl bg-slate-950 p-6 text-white">
            <h2 className="text-2xl font-black">Besoin d'un accompagnement personnalisé ?</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/book-consultation" className="rounded-xl bg-[#005A9C] px-5 py-3 text-sm font-black">
                Book Free Consultation
              </Link>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                  "Bonjour EduGrowth, je veux un accompagnement pour ce programme."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/30 px-5 py-3 text-sm font-black"
              >
                WhatsApp Advisor
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
