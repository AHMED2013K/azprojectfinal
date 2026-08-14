import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, FileCheck2, GraduationCap, Home, MessageCircle, ShieldCheck } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const DeferredAdmissionPage = () => {
  const highlights = [
    {
      title: 'Rentrée Novembre 2026 — Russie',
      badge: 'Pour les profils qui ont raté la rentrée Septembre 2026',
      text: 'Nous accompagnons les étudiants qui souhaitent rejoindre la Russie en fin d’année 2026 avec un parcours d’admission clair, des universités partenaires et une préparation visa adaptée.',
      link: '/rentree-novembre-2026-russie-tunisie',
      cta: 'Page Russie Novembre 2026',
    },
    {
      title: 'Rentrée décalée Janvier–Février 2027 — Chypre du Nord',
      badge: 'Pour les profils qui ont manqué l’orientation principale',
      text: 'Le Chypre du Nord propose une fenêtre d’admission très intéressante pour les étudiants qui veulent une rentrée plus tardive, avec un cadre académique international et des admissions plus flexibles.',
      link: '/rentree-decalee-janvier-fevrier-2027-chypre-nord',
      cta: 'Page Janvier-Février 2027',
    },
  ];

  return (
    <>
      <SEOHelmet
        title="Rentrée décalée 2026-2027 | Russie et Chypre du Nord | EduGrowth"
        description="Rentrée Novembre 2026 pour la Russie et rentrée décalée Janvier-Février 2027 pour le Chypre du Nord. Accompagnement EduGrowth pour étudiants tunisiens."
        canonical="https://edugrowth.tn/rentree-decalee-2026-2027"
        lang="fr"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Rentrée décalée 2026-2027 pour études à l’étranger',
          description: 'Accompagnement pour la rentrée Novembre 2026 en Russie et la rentrée décalée Janvier-Février 2027 au Chypre du Nord.',
          provider: { '@id': 'https://edugrowth.tn/#organization' },
          areaServed: ['TN'],
          audience: { '@type': 'Audience', audienceType: 'Tunisian students' },
        }}
      />
      <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              <Home size={16} /> Accueil
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#17324d] px-4 py-2 text-sm font-black text-white hover:bg-[#10263b]">
              Demander un diagnostic
              <ArrowRight size={16} />
            </Link>
          </div>

          <section className="rounded-[2rem] bg-gradient-to-br from-[#17324d] via-[#0f4d6b] to-[#176b87] p-8 text-white shadow-xl sm:p-12 lg:p-16">
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">
              <CalendarDays size={16} /> Rentrées décalées 2026 - 2027
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Si vous avez raté la rentrée principale, EduGrowth vous ouvre une nouvelle route vers la Russie et le Chypre du Nord.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100">
              Nous proposons des options concrètes pour les étudiants tunisiens qui veulent continuer leur projet même après la rentrée Septembre 2026. La priorité est de retrouver une offre réaliste, avec admission, dossier et préparation de visa.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {['Russie Novembre 2026', 'Chypre du Nord Janvier-Février 2027', 'Diagnostic dossier sous 24h'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-sm font-black text-cyan-50">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-6 lg:grid-cols-2">
            {highlights.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#eef8fb] px-3 py-2 text-sm font-semibold text-[#176b87]">
                  <GraduationCap size={16} /> {item.badge}
                </div>
                <h2 className="mt-5 text-2xl font-black text-[#17324d]">{item.title}</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">{item.text}</p>
                <Link to={item.link} className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#176b87]">
                  {item.cta}
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </section>

          <section className="mt-10 rounded-[1.75rem] border border-amber-200 bg-amber-50 p-8 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-black text-amber-900 ring-1 ring-amber-200">
                  <FileCheck2 size={16} /> Orientation urgente
                </div>
                <h2 className="mt-4 text-3xl font-black text-[#17324d]">Pour qui cette rentrée décalée est prioritaire ?</h2>
                <p className="mt-4 text-base leading-8 text-slate-700">
                  Cette page cible les étudiants tunisiens qui ont raté Campus France, une orientation tardive, une admission principale ou les délais de Septembre 2026. L’objectif n’est pas de promettre une solution magique, mais de trouver un calendrier encore réaliste.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  'Bachelier 2026 sans inscription claire',
                  'Étudiant qui a raté la rentrée Septembre',
                  'Famille qui veut éviter une année blanche',
                  'Profil médecine, ingénierie ou business',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-amber-200 bg-white p-4 text-sm font-bold text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-[1.75rem] border border-slate-200 bg-[#f8fbfd] p-8 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#176b87]">Pourquoi cette offre est utile</p>
                <h2 className="mt-3 text-3xl font-black text-[#17324d]">Une solution crédible pour ceux qui ont perdu du temps ou qui ont raté l’orientation.</h2>
                <ul className="mt-6 space-y-4 text-base leading-8 text-slate-700">
                  <li className="flex gap-3"><ShieldCheck size={18} className="mt-1 text-[#176b87]" /><span>Orientation rapide selon le niveau, le budget et le délai disponible.</span></li>
                  <li className="flex gap-3"><ShieldCheck size={18} className="mt-1 text-[#176b87]" /><span>Préparation de dossier et vérification des documents essentiels avant toute candidature.</span></li>
                  <li className="flex gap-3"><ShieldCheck size={18} className="mt-1 text-[#176b87]" /><span>Accompagnement pour les étudiants qui veulent une rentrée plus tardive sans perdre l’année académique.</span></li>
                </ul>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6">
                <h3 className="text-xl font-black text-[#17324d]">Prêt à agir maintenant ?</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">Envoyez-nous votre profil et on vous orientera vers la destination la plus réaliste pour votre rentrée décalée.</p>
                <Link to="/contact" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#17324d] px-6 py-3 text-sm font-black text-white hover:bg-[#10263b]">
                  Prendre un rendez-vous
                  <ArrowRight size={16} />
                </Link>
                <div className="mt-4 grid gap-2 text-sm font-bold text-[#176b87]">
                  <Link to="/etudier-en-russie-depuis-tunisie">Guide général Russie</Link>
                  <Link to="/study-in-north-cyprus">Guide général Chypre du Nord</Link>
                </div>
                <a href="https://wa.me/21656590703?text=Bonjour%20EduGrowth%2C%20je%20veux%20une%20orientation%20pour%20la%20rentree%20decalee%202026-2027" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-black text-emerald-700 hover:bg-emerald-100">
                  <MessageCircle size={16} />
                  WhatsApp immédiat
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default DeferredAdmissionPage;
