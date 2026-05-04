import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Euro, FileCheck2, MessageCircle, Send } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const WA_NUMBER = '21656590703';

const faqItems = [
  {
    question: "Qu'est-ce que l'alternance en France ?",
    answer:
      "L'alternance combine une formation diplômante et une expérience en entreprise. L'étudiant partage son temps entre l'école et le travail selon le rythme du programme.",
  },
  {
    question: 'Est-ce adapté aux étudiants tunisiens ?',
    answer:
      "Oui, si le dossier académique, le niveau linguistique, le projet professionnel et les conditions administratives sont cohérents. Abroad Zone qualifie le profil depuis la Tunisie avant la candidature.",
  },
  {
    question: 'Est-ce rémunéré ?',
    answer:
      "Un contrat d'alternance prévoit une rémunération encadrée selon l'âge, le niveau et le type de contrat. Les montants exacts doivent être vérifiés au moment de la candidature.",
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://edugrowth.tn/#organization',
      name: 'Abroad Zone',
      url: 'https://edugrowth.tn/',
      logo: 'https://edugrowth.tn/Submark.png',
      telephone: '+21656590703',
      areaServed: ['TN', 'FR'],
    },
    {
      '@type': 'Service',
      name: 'Alternance en France pour les Tunisiens',
      serviceType: 'Work-study application support',
      provider: { '@id': 'https://edugrowth.tn/#organization' },
      areaServed: ['Tunisie', 'France'],
      audience: {
        '@type': 'Audience',
        audienceType: 'Étudiants tunisiens',
      },
      description:
        "Accompagnement pour candidater en alternance en France depuis la Tunisie: orientation, dossier, CV, entretiens et suivi.",
    },
  ],
};

function AlternanceForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Bonjour Abroad Zone, je veux candidater en alternance en France.\nNom: ${data.get('name')}\nEmail: ${data.get('email')}\nNiveau: ${data.get('level')}\nDestination: ${data.get('destination')}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-xl font-black text-slate-950">Candidature rapide</h3>
      <input name="name" required placeholder="Nom" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#175c7d]" />
      <input name="email" required type="email" placeholder="Email" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#175c7d]" />
      <select name="level" required className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#175c7d]">
        <option value="">Niveau</option>
        <option>Bac</option>
        <option>Bac +2</option>
        <option>Licence</option>
        <option>Master</option>
      </select>
      <select name="destination" defaultValue="France alternance" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#175c7d]">
        <option>France alternance</option>
        <option>Chypre du Nord</option>
      </select>
      <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#175c7d] px-5 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#0f4668]">
        Candidater maintenant
        <Send size={16} />
      </button>
    </form>
  );
}

export default function AlternanceFrancePage() {
  return (
    <>
      <SEOHelmet
        title="Alternance France Tunisie 2026 | Étudier et travailler en France"
        description="Alternance en France pour les Tunisiens en 2026: étudier et travailler, gagner un salaire, préparer son dossier et candidater depuis la Tunisie."
        canonical="https://edugrowth.tn/alternance-france"
        lang="fr"
        structuredData={structuredData}
        faqItems={faqItems}
      />
      <main className="min-h-screen bg-white text-slate-900">
        <section className="bg-[#175c7d] px-5 pb-20 pt-10 text-white md:px-8">
          <nav className="mx-auto flex max-w-6xl items-center justify-between py-4">
            <Link to="/abroad-zone" className="text-lg font-black uppercase tracking-tight">Abroad Zone</Link>
            <a href={`https://wa.me/${WA_NUMBER}`} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-[#175c7d]">
              <MessageCircle size={17} /> WhatsApp
            </a>
          </nav>
          <div className="mx-auto grid max-w-6xl gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-cyan-100">Alternance France Tunisie 2026 • Étudiants tunisiens</p>
              <h1 className="max-w-4xl text-4xl font-black uppercase leading-tight md:text-6xl">Étudier en alternance en France</h1>
              <p className="mt-6 max-w-2xl text-lg font-medium text-cyan-50/90">
                Un parcours pour étudier et travailler en France, gagner de l’expérience, préparer un diplôme reconnu et construire un profil professionnel solide depuis la Tunisie.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#formulaire" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-[#175c7d]">
                  Candidater maintenant <ArrowRight size={17} />
                </a>
                <Link to="/study-in-north-cyprus" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white">
                  Voir Chypre du Nord
                </Link>
              </div>
            </div>
            <div id="formulaire">
              <AlternanceForm />
            </div>
          </div>
        </section>

        <section className="px-5 py-16 md:px-8">
          <div className="mx-auto max-w-6xl">
              <h2 className="text-3xl font-black uppercase md:text-4xl">Définition de l’alternance</h2>
              <p className="mt-5 max-w-3xl text-lg text-slate-600">
              La formation en alternance en France associe des cours dans une école et des périodes en entreprise. Pour les étudiants tunisiens, c’est une voie concrète pour étudier et travailler en France avec un projet professionnel clair depuis la Tunisie.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                { icon: Euro, title: 'Salaire', text: 'Rémunération prévue dans le cadre du contrat selon les règles applicables.' },
                { icon: BriefcaseBusiness, title: 'Expérience', text: 'Missions en entreprise pour construire un CV plus fort.' },
                { icon: FileCheck2, title: 'Diplôme', text: 'Formation diplômante avec rythme école + entreprise.' },
              ].map((item) => (
                <article key={item.title} className="rounded-2xl border border-slate-200 p-6">
                  <item.icon className="mb-4 text-[#175c7d]" />
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-3 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-5 py-16 md:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black uppercase md:text-4xl">Conditions d’accès</h2>
              <p className="mt-4 text-slate-600">Chaque école et chaque entreprise peut demander des critères précis. Abroad Zone qualifie le dossier avant de lancer les candidatures.</p>
            </div>
            <div className="grid gap-4">
              {['Niveau académique compatible avec la formation', 'Projet professionnel cohérent', 'CV et motivation adaptés au marché français', 'Dossier administratif complet depuis la Tunisie'].map((condition) => (
                <h3 key={condition} className="flex gap-3 rounded-2xl bg-white p-5 font-bold shadow-sm">
                  <CheckCircle2 className="shrink-0 text-[#175c7d]" />
                  {condition}
                </h3>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 md:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-black uppercase md:text-4xl">Processus</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-4">
              {['Évaluation du profil', 'Choix des formations', 'Préparation CV et dossier', 'Candidature via notre plateforme'].map((step, index) => (
                <article key={step} className="rounded-2xl border border-slate-200 p-6">
                  <div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-[#175c7d]">Étape {index + 1}</div>
                  <h3 className="text-xl font-black">{step}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0f4668] px-5 py-16 text-white md:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-black uppercase md:text-4xl">Candidater via Abroad Zone</h2>
              <p className="mt-4 text-cyan-50/90">Notre équipe accompagne les étudiants tunisiens depuis la Tunisie pour cibler les formations, préparer le dossier et avancer vers l’alternance en France.</p>
              <div className="mt-6 flex gap-3 text-sm font-black text-cyan-100">
                <Link to="/study-in-north-cyprus">Étudier à Chypre du Nord</Link>
                <Link to="/abroad-zone">Abroad Zone</Link>
              </div>
            </div>
            <AlternanceForm />
          </div>
        </section>

        <section className="px-5 py-16 md:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-black uppercase md:text-4xl">FAQ</h2>
            <div className="mt-8 grid gap-5">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-2xl border border-slate-200 p-6">
                  <h3 className="text-xl font-black">{item.question}</h3>
                  <p className="mt-3 text-slate-600">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <a href={`https://wa.me/${WA_NUMBER}`} className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl" aria-label="Contacter Abroad Zone sur WhatsApp">
        <MessageCircle />
      </a>
    </>
  );
}
