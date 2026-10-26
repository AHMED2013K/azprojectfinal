import { ArrowRight, BookOpen, CheckCircle2, Globe2, MessageCircle, Plane, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';

const whatsapp = '21656590703';

const stays = {
  portugal: {
    country: 'Portugal', language: 'portugais', cityExamples: 'Lisbonne, Porto ou Coimbra',
    title: 'Séjour linguistique au Portugal',
    description: 'Préparez un séjour au Portugal pour apprendre le portugais en immersion. EduGrowth vous aide à clarifier votre objectif, comparer les options et préparer votre projet depuis la Tunisie.',
    image: '/abroad.webp',
  },
  espagne: {
    country: 'Espagne', language: 'espagnol', cityExamples: 'Madrid, Barcelone ou Valence',
    title: 'Séjour linguistique en Espagne',
    description: 'Découvrez comment préparer un séjour en Espagne pour progresser en espagnol. Nous vous aidons à préciser la durée, le budget et les critères de votre projet depuis la Tunisie.',
    image: '/abroad.webp',
  },
  malte: {
    country: 'Malte', language: 'anglais', cityExamples: 'La Valette, Sliema ou St Julian’s',
    title: 'Séjour linguistique à Malte',
    description: 'Envisagez un séjour à Malte pour pratiquer l’anglais dans un environnement international. EduGrowth vous accompagne dans la préparation et la comparaison des options selon votre profil.',
    image: '/abroad.webp',
  },
};

const benefits = [
  ['Un objectif clair', 'Définissez la langue à apprendre, votre niveau actuel et le résultat recherché.'],
  ['Un séjour adapté', 'Comparez la durée, le calendrier, le budget et les possibilités de cours et d’hébergement.'],
  ['Une préparation suivie', 'Préparez les étapes administratives et les questions pratiques avant le départ.'],
];

function ContactButton({ country }) {
  const message = `Bonjour EduGrowth, je souhaite préparer un séjour linguistique${country ? ` en ${country}` : ''} depuis la Tunisie.`;
  return <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#075985] px-6 py-3.5 font-bold text-white shadow-lg shadow-sky-900/15 transition hover:bg-[#064a6e]"><MessageCircle size={18} /> Parler à un conseiller</a>;
}

function StayCard({ slug, stay }) {
  return <Link to={`/sejour-linguistique-${slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-800"><Globe2 /></div>
    <p className="text-sm font-bold uppercase tracking-widest text-sky-800">{stay.country}</p>
    <h3 className="mt-2 text-xl font-black text-slate-900">{stay.title}</h3>
    <p className="mt-3 text-sm leading-6 text-slate-600">Apprendre le {stay.language} et préparer votre projet en immersion.</p>
    <span className="mt-5 inline-flex items-center gap-2 font-bold text-sky-800">Découvrir <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
  </Link>;
}

export default function LanguageStayPage({ country: countryProp }) {
  const { pathname } = useLocation();
  const slug = countryProp || pathname.split('/').filter(Boolean).at(-1)?.replace('sejour-linguistique-', '');
  const stay = stays[slug];
  const isHub = !stay;
  const title = stay?.title || 'Séjours linguistiques à l’étranger';
  const description = stay?.description || 'Apprenez une langue en immersion à l’étranger. Découvrez nos séjours linguistiques et préparez votre projet depuis la Tunisie avec EduGrowth.';
  const canonical = `https://edugrowth.tn${isHub ? '/sejours-linguistiques' : `/sejour-linguistique-${slug}`}`;

  return <>
    <SEOHelmet title={`${title} | EduGrowth`} description={description} canonical={canonical} lang="fr" />
    <main className="min-h-screen bg-white text-slate-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <Link to="/" className="flex items-center gap-3 font-black text-[#17324d]"><img src="/Submark.webp" alt="" className="h-9 w-9 rounded-lg" /> EduGrowth</Link>
        <Link to="/" className="text-sm font-bold text-slate-600 hover:text-sky-800">Accueil</Link>
      </nav>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#082f49] via-[#075985] to-[#0e7490] px-5 py-20 text-white sm:py-28">
        <div className="absolute -right-20 -top-28 h-96 w-96 rounded-full border-[48px] border-white/5" />
        <div className="relative mx-auto max-w-7xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold"><Sparkles size={16} /> {isHub ? 'Nouvelle offre EduGrowth' : `Séjour linguistique · ${stay.country}`}</p>
          <div className="mt-9 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">{isHub ? <>Une langue. Une immersion.<br />Un nouveau départ.</> : stay.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-sky-50">{isHub ? 'Améliorez votre niveau de langue en vivant une expérience à l’étranger. EduGrowth vous accompagne pour étudier les possibilités et préparer un séjour adapté à votre objectif.' : stay.description}</p>
              <div className="mt-8 flex flex-wrap gap-3"><ContactButton country={stay?.country} />{isHub && <a href="#destinations" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-bold text-white transition hover:bg-white/10">Voir les destinations <ArrowRight size={18} /></a>}</div>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15"><Plane size={28} /></div>
              <h2 className="mt-6 text-2xl font-black">Votre projet, étape par étape</h2>
              <p className="mt-3 leading-7 text-sky-50">Un conseiller échange avec vous sur votre niveau, vos dates et votre budget afin d’identifier les options à étudier. Les programmes et disponibilités sont confirmés individuellement avant toute décision.</p>
            </div>
          </div>
        </div>
      </section>
      {isHub ? <section id="destinations" className="mx-auto max-w-7xl px-5 py-20">
        <div className="max-w-2xl"><p className="text-sm font-black uppercase tracking-[.2em] text-sky-800">Nos destinations</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">Choisissez la langue qui vous ouvre des portes</h2><p className="mt-4 leading-7 text-slate-600">Commencez par une destination et échangez avec notre équipe pour vérifier les possibilités correspondant à votre projet.</p></div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">{Object.entries(stays).map(([key, item]) => <StayCard key={key} slug={key} stay={item} />)}</div>
      </section> : <>
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1fr_0.8fr]">
          <div><p className="text-sm font-black uppercase tracking-[.2em] text-sky-800">Préparer votre immersion</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">Apprendre le {stay.language} au quotidien</h2><p className="mt-5 leading-8 text-slate-600">Un séjour linguistique se prépare selon votre niveau, vos dates, votre budget et le type de cours recherché. Les villes possibles — {stay.cityExamples} — peuvent être comparées selon les disponibilités et les options confirmées au moment de votre demande.</p><p className="mt-4 leading-8 text-slate-600">Nous faisons le point avec vous sur les cours, l’hébergement, les documents de voyage et les démarches applicables à votre situation. Les conditions exactes dépendent du programme retenu et sont vérifiées avant l’inscription.</p></div>
          <div className="rounded-3xl bg-slate-50 p-7"><h3 className="text-xl font-black">Les points à clarifier</h3><ul className="mt-5 space-y-4">{['Votre niveau et vos objectifs de langue', 'La durée et la période souhaitées', 'Le budget et les options d’hébergement', 'Les documents et formalités à prévoir'].map((item) => <li key={item} className="flex gap-3 text-slate-700"><CheckCircle2 className="shrink-0 text-emerald-600" size={20} />{item}</li>)}</ul></div>
        </section>
        <section className="bg-slate-50 px-5 py-16"><div className="mx-auto max-w-7xl"><h2 className="text-3xl font-black">Comment EduGrowth vous accompagne</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{benefits.map(([heading, text], i) => <article key={heading} className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 font-black text-sky-800">0{i + 1}</div><h3 className="mt-4 text-lg font-black">{heading}</h3><p className="mt-2 leading-7 text-slate-600">{text}</p></article>)}</div><div className="mt-9 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-[#082f49] p-7 text-white"><div><BookOpen className="mb-3" /><h3 className="text-2xl font-black">Parlons de votre séjour en {stay.country}</h3><p className="mt-2 text-sky-100">Partagez vos dates et votre objectif avec notre équipe.</p></div><ContactButton country={stay.country} /></div></div></section>
        <section className="mx-auto max-w-7xl px-5 py-16"><h2 className="text-2xl font-black">Autres séjours linguistiques</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{Object.entries(stays).filter(([key]) => key !== slug).map(([key, item]) => <StayCard key={key} slug={key} stay={item} />)}</div><Link to="/sejours-linguistiques" className="mt-7 inline-flex items-center gap-2 font-bold text-sky-800">Toutes les destinations <ArrowRight size={17} /></Link></section>
      </>}
      <footer className="border-t border-slate-200 px-5 py-8 text-center text-sm text-slate-500">© EduGrowth · Accompagnement depuis la Tunisie · <Link to="/" className="font-bold text-sky-800">Retour à l’accueil</Link></footer>
    </main>
  </>;
}
