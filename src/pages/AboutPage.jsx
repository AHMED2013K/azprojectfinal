import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  HeartHandshake,
  Languages,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Users,
} from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import LanguageSwitch from '../components/LanguageSwitch';
import { useLanguage } from '../context/LanguageContext.jsx';
import { trackEvent } from '../utils/tracking';

const WA_NUMBER = '21656590703';

const copy = {
  fr: {
    title: 'A propos EduGrowth | Confiance, equipe et accompagnement etudiant',
    description:
      "Decouvrez EduGrowth Tunisie, notre methode d'accompagnement pour les etudiants tunisiens, nos engagements de transparence et notre approche avec les familles.",
    badge: 'A propos',
    heroTitle: 'Une equipe tunisienne pour rendre les projets d’etudes internationales plus clairs',
    heroText:
      "EduGrowth accompagne les etudiants et leurs familles avec une approche simple : analyser le profil, expliquer les options, structurer le dossier et avancer sans promesses irrealisables.",
    cta: 'Tester mon eligibilite',
    whatsapp: 'Parler a un conseiller',
    missionTitle: 'Notre mission',
    missionText:
      "Aider chaque etudiant a comprendre les destinations realistes, les conditions d'admission, les risques administratifs et les etapes avant de s'engager.",
    architectureTitle: 'Architecture de marque',
    architectureText:
      "EduGrowth doit rester la marque principale. Les sous-marques aident a organiser les offres, mais ne doivent jamais rendre le parcours etudiant confus.",
    architecture: [
      { title: 'EduGrowth', text: "Marque mere : confiance, orientation, accompagnement international depuis la Tunisie." },
      { title: 'Abroad Zone by EduGrowth', text: "Programme B2C etudiant : guides pays, admission, visa, logement et alternance." },
      { title: 'EduGrowth Partners', text: "Offre B2B separee pour ecoles, universites et partenaires de recrutement." },
    ],
    premiumTitle: 'Direction premium',
    premiumItems: [
      'Ton institutionnel, humain et prudent',
      'Photos reelles plutot que visuels stock',
      'Moins de gradients, plus de blanc et de bleu profond',
      'Preuves visibles : avis, admissions floutees, equipe, evenements',
    ],
    principlesTitle: 'Nos principes de confiance',
    principles: [
      'Transparence sur les couts, les delais et les risques',
      'Aucune promesse de visa garanti',
      'Documents et preuves toujours floutes avant publication',
      'Parents bienvenus dans les echanges importants',
      'Suivi en francais, arabe et anglais selon le besoin',
      'Orientation basee sur le profil, pas sur une destination imposee',
    ],
    processTitle: 'Comment nous travaillons',
    process: [
      { title: 'Diagnostic', text: 'Nous analysons niveau, budget, objectif, langue et contraintes familiales.' },
      { title: 'Orientation', text: 'Nous proposons des destinations et programmes coherents avec la situation.' },
      { title: 'Dossier', text: 'Nous aidons a organiser les documents, le calendrier et la presentation du projet.' },
      { title: 'Suivi', text: 'Nous accompagnons les prochaines etapes : admission, visa, logement et depart.' },
    ],
    proofTitle: 'Les preuves a integrer avec accord',
    proofText:
      "Pour renforcer la confiance, EduGrowth doit documenter progressivement les resultats reels : avis, lettres d'admission floutees, photos equipe, evenements, partenariats et retours familles.",
    proofItems: [
      "Lettres d'admission floutees",
      'Avis Google et temoignages video',
      'Photos bureau, equipe et salons etudiants',
      'Accords ou contacts partenaires verifies',
      'Checklists de documents par destination',
      'Retours WhatsApp anonymises avec accord',
    ],
    parentsTitle: 'Pour les parents',
    parentsText:
      "Un projet d'etudes a l'etranger engage souvent toute la famille. Nous expliquons le budget, les delais, les risques, le logement et les etapes administratives avec un ton clair et prudent.",
    footerCta: 'Commencer par un diagnostic gratuit',
  },
  en: {
    title: 'About EduGrowth | Trust, team, and student guidance',
    description:
      'Learn about EduGrowth Tunisia, our student guidance method, transparency commitments, and family-centered approach.',
    badge: 'About',
    heroTitle: 'A Tunisia-based team making international study projects clearer',
    heroText:
      'EduGrowth supports students and families with a simple approach: analyze the profile, explain realistic options, structure the application, and move forward without unrealistic promises.',
    cta: 'Check my eligibility',
    whatsapp: 'Talk to an advisor',
    missionTitle: 'Our mission',
    missionText:
      'Help each student understand realistic destinations, admission requirements, administrative risks, and the steps required before committing.',
    architectureTitle: 'Brand architecture',
    architectureText:
      'EduGrowth should remain the main brand. Sub-brands can organize offers, but they should never make the student journey confusing.',
    architecture: [
      { title: 'EduGrowth', text: 'Master brand: trust, guidance, and international education support from Tunisia.' },
      { title: 'Abroad Zone by EduGrowth', text: 'B2C student program: country guides, admissions, visa steps, housing, and work-study.' },
      { title: 'EduGrowth Partners', text: 'Separate B2B offer for schools, universities, and recruitment partners.' },
    ],
    premiumTitle: 'Premium direction',
    premiumItems: [
      'Institutional, human, and careful tone',
      'Real photos instead of stock-style visuals',
      'Fewer gradients, more white space and deep blue',
      'Visible proof: reviews, blurred admissions, team, events',
    ],
    principlesTitle: 'Our trust principles',
    principles: [
      'Transparency on costs, timelines, and risks',
      'No guaranteed visa promise',
      'Documents and proof always blurred before publication',
      'Parents welcome in important discussions',
      'Support in French, Arabic, and English when needed',
      'Guidance based on the profile, not on a forced destination',
    ],
    processTitle: 'How we work',
    process: [
      { title: 'Diagnosis', text: 'We review level, budget, objective, language, and family constraints.' },
      { title: 'Guidance', text: 'We suggest destinations and programs that fit the situation.' },
      { title: 'Application', text: 'We help organize documents, timeline, and project presentation.' },
      { title: 'Follow-up', text: 'We support next steps: admission, visa, housing, and departure.' },
    ],
    proofTitle: 'Proof to integrate with consent',
    proofText:
      'To strengthen trust, EduGrowth should progressively document real outcomes: reviews, blurred admission letters, team photos, events, partnerships, and family feedback.',
    proofItems: [
      'Blurred admission letters',
      'Google reviews and video stories',
      'Office, team, and student fair photos',
      'Verified partner contacts or agreements',
      'Document checklists by destination',
      'Anonymized WhatsApp feedback with consent',
    ],
    parentsTitle: 'For parents',
    parentsText:
      'A study abroad project often involves the whole family. We explain budget, timelines, risks, housing, and administrative steps with clear and careful language.',
    footerCta: 'Start with a free diagnosis',
  },
};

function buildApplyUrl(lang) {
  const params = new URLSearchParams({
    utm_source: 'website',
    utm_medium: 'about_page',
    utm_campaign: 'trust',
    utm_content: lang,
  });

  return `https://app.edugrowth.tn/apply?${params.toString()}`;
}

export default function AboutPage() {
  const { lang, toggleLanguage } = useLanguage();
  const t = copy[lang] || copy.en;
  const applyUrl = buildApplyUrl(lang);
  const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    lang === 'fr'
      ? "Bonjour EduGrowth, je veux mieux comprendre l'accompagnement avant de commencer."
      : 'Hello EduGrowth, I want to understand the guidance process before starting.'
  )}`;

  return (
    <>
      <SEOHelmet
        title={t.title}
        description={t.description}
        canonical="https://edugrowth.tn/about"
        lang={lang}
      />
      <div className="min-h-screen bg-[#f7fafc] text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <Link to="/" className="flex items-center gap-3">
              <img src="/Submark.webp" alt="EduGrowth" className="h-10 w-10 rounded-xl ring-1 ring-slate-200" />
              <span className="font-black text-[#17324d]">EduGrowth</span>
            </Link>
            <div className="flex items-center gap-2">
              <LanguageSwitch lang={lang} onToggle={toggleLanguage} />
              <Link to="/" className="hidden text-sm font-bold text-slate-600 hover:text-[#176b87] sm:inline">Home</Link>
            </div>
          </div>
        </header>

        <main>
          <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#176b87]/20 bg-[#eef8fb] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#176b87]">
                  <ShieldCheck size={15} />
                  {t.badge}
                </div>
                <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight text-[#17324d] sm:text-6xl">{t.heroTitle}</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{t.heroText}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={applyUrl} onClick={() => trackEvent('cta_click', { cta_type: 'about_eligibility' })} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17324d] px-7 py-4 text-sm font-black text-white hover:bg-[#10263b]">
                    <FileCheck2 size={18} />
                    {t.cta}
                  </a>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('cta_click', { cta_type: 'about_whatsapp' })} className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-7 py-4 text-sm font-black text-emerald-700 hover:bg-emerald-100">
                    <MessageCircle size={18} />
                    {t.whatsapp}
                  </a>
                </div>
              </div>
              <div className="grid gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                  <MapPin className="mt-1 text-[#176b87]" size={21} />
                  <div><strong>Tunisia</strong><p className="text-sm text-slate-600">Local guidance for Tunisian students and families.</p></div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                  <Languages className="mt-1 text-[#176b87]" size={21} />
                  <div><strong>FR / AR / EN</strong><p className="text-sm text-slate-600">Clear communication for students and parents.</p></div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                  <Users className="mt-1 text-[#176b87]" size={21} />
                  <div><strong>Family-first</strong><p className="text-sm text-slate-600">Parents can join important decisions and calls.</p></div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-7xl rounded-[1.75rem] bg-[#17324d] p-8 text-white md:p-10">
              <GraduationCap size={34} className="text-cyan-200" />
              <h2 className="mt-5 text-3xl font-black">{t.missionTitle}</h2>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-200">{t.missionText}</p>
            </div>
          </section>

          <section className="bg-white px-4 py-20 sm:px-6">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#176b87]">Master brand</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#17324d] sm:text-5xl">{t.architectureTitle}</h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">{t.architectureText}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {t.architecture.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-lg font-black text-[#17324d]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-6">
            <div className="mx-auto grid max-w-7xl gap-8 rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#176b87]">Identite premium</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#17324d] sm:text-5xl">{t.premiumTitle}</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {t.premiumItems.map((item) => (
                  <div key={item} className="rounded-2xl bg-[#eef8fb] p-5">
                    <CheckCircle2 size={20} className="text-[#176b87]" />
                    <p className="mt-3 font-bold leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white px-4 py-20 sm:px-6">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#176b87]">Credibilite</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#17324d] sm:text-5xl">{t.principlesTitle}</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {t.principles.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <CheckCircle2 size={20} className="text-[#176b87]" />
                    <p className="mt-3 font-bold text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-3xl font-black tracking-tight text-[#17324d] sm:text-5xl">{t.processTitle}</h2>
              <div className="mt-10 grid gap-5 md:grid-cols-4">
                {t.process.map((step, index) => (
                  <article key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef8fb] font-black text-[#176b87]">{index + 1}</div>
                    <h3 className="mt-5 text-xl font-black text-[#17324d]">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{step.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white px-4 py-20 sm:px-6">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#176b87]">Preuves</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#17324d] sm:text-5xl">{t.proofTitle}</h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">{t.proofText}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {t.proofItems.map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <BadgeCheck size={21} className="text-[#176b87]" />
                    <p className="mt-3 font-black text-[#17324d]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-20 sm:px-6">
            <div className="mx-auto grid max-w-7xl gap-8 rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <HeartHandshake size={34} className="text-[#176b87]" />
                <h2 className="mt-5 text-3xl font-black tracking-tight text-[#17324d] sm:text-5xl">{t.parentsTitle}</h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">{t.parentsText}</p>
              </div>
              <div className="grid gap-3">
                <a href={applyUrl} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17324d] px-6 py-4 text-sm font-black text-white hover:bg-[#10263b]">
                  {t.footerCta}
                  <ArrowRight size={17} />
                </a>
                <Link to="/partners" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-6 py-4 text-sm font-black text-slate-700 hover:bg-slate-100">
                  <Building2 size={17} />
                  Partner information
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
