import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, GraduationCap, MessageCircle, Send, ShieldCheck, Star } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const WA_NUMBER = '21656590703';

const faqItems = [
  {
    question: 'Est-ce reconnu ?',
    answer:
      "Les universités de Chypre du Nord proposent des diplômes structurés selon des standards internationaux. La reconnaissance dépend du pays, du programme et de l'organisme concerné; Abroad Zone vérifie le parcours avant la candidature.",
  },
  {
    question: 'Combien ça coûte ?',
    answer:
      "Le budget dépend de la spécialité et du niveau d'étude. Les bourses peuvent aller jusqu'à 70%, ce qui rend Chypre du Nord accessible pour de nombreux étudiants tunisiens depuis la Tunisie.",
  },
  {
    question: 'Peut-on travailler ?',
    answer:
      "Des possibilités existent selon les règles locales et le profil de l'étudiant. Abroad Zone explique les conditions réelles avant le départ afin d'éviter les attentes irréalistes.",
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
      areaServed: ['TN', 'CY'],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+21656590703',
        contactType: 'admissions',
        availableLanguage: ['French', 'Arabic', 'English'],
        areaServed: 'TN',
      },
    },
    {
      '@type': 'Service',
      name: 'Admission universitaire à Chypre du Nord depuis la Tunisie',
      serviceType: 'Student admissions consulting',
      provider: { '@id': 'https://edugrowth.tn/#organization' },
      areaServed: ['Tunisie', 'Chypre du Nord'],
      audience: {
        '@type': 'Audience',
        audienceType: 'Étudiants tunisiens',
      },
      description:
        "Accompagnement pour étudier à Chypre du Nord depuis la Tunisie avec bourses jusqu'à 70%, admission simple et préparation du dossier.",
    },
  ],
};

function LandingForm({ destination = 'Chypre du Nord' }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Bonjour Abroad Zone, je veux une évaluation gratuite.\nNom: ${data.get('name')}\nEmail: ${data.get('email')}\nNiveau: ${data.get('level')}\nDestination: ${data.get('destination')}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-xl font-black text-slate-950">Évaluation gratuite</h3>
      <input name="name" required placeholder="Nom" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#175c7d]" />
      <input name="email" required type="email" placeholder="Email" className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#175c7d]" />
      <select name="level" required className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#175c7d]">
        <option value="">Niveau</option>
        <option>Licence / Bachelor</option>
        <option>Master</option>
        <option>PhD</option>
        <option>Autre</option>
      </select>
      <select name="destination" defaultValue={destination} className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#175c7d]">
        <option>Chypre du Nord</option>
        <option>France alternance</option>
      </select>
      <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#175c7d] px-5 py-4 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-[#0f4668]">
        Demander une évaluation gratuite
        <Send size={16} />
      </button>
    </form>
  );
}

export default function StudyInNorthCyprusPage() {
  return (
    <>
      <SEOHelmet
        title="Étudier à Chypre du Nord depuis la Tunisie | Bourses jusqu’à 70%"
        description="Étudier à Chypre du Nord depuis la Tunisie avec des bourses jusqu’à 70%. Admission simple, plusieurs spécialités disponibles."
        canonical="https://edugrowth.tn/study-in-north-cyprus"
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
              <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-cyan-100">Tunisie • étudiants tunisiens • depuis la Tunisie</p>
              <h1 className="max-w-4xl text-4xl font-black uppercase leading-tight md:text-6xl">Étudier à Chypre du Nord depuis la Tunisie</h1>
              <p className="mt-6 max-w-2xl text-lg font-medium text-cyan-50/90">
                Admission universitaire simple, bourses jusqu’à 70%, filières variées et accompagnement complet pour les étudiants tunisiens qui veulent construire un parcours international accessible.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#formulaire" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-[#175c7d]">
                  Postuler maintenant <ArrowRight size={17} />
                </a>
                <a href="#formulaire" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white">
                  Demander une évaluation gratuite
                </a>
              </div>
            </div>
            <div id="formulaire">
              <LandingForm />
            </div>
          </div>
        </section>

        <section className="px-5 py-16 md:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-black uppercase md:text-4xl">Pourquoi choisir Chypre du Nord ?</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {['Coût accessible pour les familles depuis la Tunisie', 'Bourses jusqu’à 70% selon le dossier', 'Large choix de filières: IT, Business, Génie, Dentaire…'].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 p-6">
                  <CheckCircle2 className="mb-4 text-[#175c7d]" />
                  <h3 className="text-lg font-black">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-5 py-16 md:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black uppercase md:text-4xl">Programmes disponibles</h2>
              <p className="mt-4 text-slate-600">Abroad Zone accompagne les étudiants tunisiens vers des parcours adaptés au niveau académique, au budget et au projet professionnel.</p>
            </div>
            <div className="grid gap-4">
              {['Licence (Bachelor)', 'Master', 'PhD'].map((program) => (
                <h3 key={program} className="rounded-2xl bg-white p-5 text-xl font-black shadow-sm"><GraduationCap className="mr-3 inline text-[#175c7d]" />{program}</h3>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 md:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-black uppercase md:text-4xl">Avantages pour les étudiants tunisiens</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                'Procédure simple et lisible',
                'Accompagnement complet depuis la Tunisie',
                'Pas de compte bloqué lorsque cette condition ne s’applique pas au programme choisi',
                'Procédure de visa facilitée avec préparation du dossier, sans promettre une exemption automatique',
              ].map((item) => (
                <div key={item} className="flex gap-4 rounded-2xl bg-slate-50 p-6">
                  <ShieldCheck className="shrink-0 text-[#175c7d]" />
                  <h3 className="font-bold">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0f4668] px-5 py-16 text-white md:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-black uppercase md:text-4xl">Comment postuler ?</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {['Remplir le formulaire', 'Étude du dossier', 'Admission'].map((step, index) => (
                <div key={step} className="rounded-2xl bg-white/10 p-6">
                  <div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-cyan-100">Step {index + 1}</div>
                  <h3 className="text-2xl font-black">{step}</h3>
                </div>
              ))}
            </div>
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

        <section className="bg-slate-50 px-5 py-16 md:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-black uppercase md:text-4xl">Abroad Zone, votre référence en Tunisie</h2>
              <p className="mt-4 text-slate-600">Étudiants tunisiens déjà placés, suivi personnalisé et conseils transparents pour choisir entre Chypre du Nord et l’alternance en France.</p>
              <div className="mt-6 flex gap-3 text-sm font-black text-[#175c7d]">
                <Link to="/alternance-france">Voir alternance en France</Link>
                <Link to="/abroad-zone">Retour Abroad Zone</Link>
              </div>
              <div className="mt-6 flex items-center gap-2 text-yellow-500">
                {[1, 2, 3, 4, 5].map((star) => <Star key={star} className="fill-current" size={18} />)}
                <span className="ml-2 text-sm font-bold text-slate-700">Témoignages étudiants disponibles sur demande</span>
              </div>
            </div>
            <LandingForm />
          </div>
        </section>
      </main>
      <a href={`https://wa.me/${WA_NUMBER}`} className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl" aria-label="Contacter Abroad Zone sur WhatsApp">
        <MessageCircle />
      </a>
    </>
  );
}
