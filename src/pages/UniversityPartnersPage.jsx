import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Globe2, Home, Landmark, Search, School } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

const getLogoUrl = (url) => {
  try {
    const { hostname } = new URL(url);
    return `https://logo.clearbit.com/${hostname.replace(/^www\./, '')}`;
  } catch {
    return null;
  }
};

const partnerGroups = [
  {
    title: 'France',
    intro: 'Écoles privées, business schools et établissements internationaux.',
    items: [
      { name: 'GEM Alpine Business School', url: 'https://www.gemalpinebusinessschool.com/' },
    ],
  },
  {
    title: 'Dubai',
    intro: 'Campus internationaux avec programmes anglophones et admission rapide.',
    items: [
      { name: 'Big Education', url: 'https://bigeducation.com/' },
      { name: 'Britts Imperial University College', url: 'https://www.brittsimperial.ac.uk/' },
      { name: 'Nest University', url: 'https://www.nestuniversity.com/' },
      { name: 'RRU University', url: 'https://www.rru.ac.ae/' },
    ],
  },
  {
    title: 'Maroc',
    intro: 'Établissements proches et accessibles pour les étudiants maghrébins.',
    items: [
      { name: 'UIASS', url: 'https://www.uiass.ma/' },
    ],
  },
  {
    title: 'Allemagne',
    intro: 'Université et établissements avec programmes internationaux.',
    items: [
      { name: 'ASB University', url: 'https://www.asb-berlin.de/' },
      { name: 'UMCH University of Applied Sciences', url: 'https://edu.umch.de/en' },
      { name: 'Constructor University', url: 'https://constructor.university/' },
    ],
  },
  {
    title: 'Chypre du Nord',
    intro: 'Options flexibles pour les étudiants qui veulent une rentrée décalée.',
    items: [
      { name: 'European University of Lefke', url: 'https://www.eul.edu.tr/' },
      { name: 'RDU University', url: 'https://rdu.edu.tr/' },
    ],
  },
  {
    title: 'Roumanie',
    intro: 'Destinations européennes populaires pour médecine, business et ingénierie.',
    items: [
      { name: 'Universitatea de Vest „Vasile Goldiș”', url: 'https://www.uvvg.ro/' },
    ],
  },
  {
    title: 'Turquie',
    intro: 'Réseau large de universités privées et publiques avec admission internationale.',
    items: [
      { name: 'AKAD University', url: 'https://www.akad.edu.tr/' },
      { name: 'Altinbas University', url: 'https://www.altinbas.edu.tr/' },
      { name: 'Antalya Bilim University', url: 'https://www.antalyabilim.edu.tr/' },
      { name: 'Asia Pacific University', url: 'https://www.apu.edu.my/' },
      { name: 'Atilim University', url: 'https://www.atilim.edu.tr/' },
      { name: 'Bahcesehir University', url: 'https://www.bahcesehir.edu.tr/' },
      { name: 'Bahçeşehir Cyprus University', url: 'https://www.bahcesehircyprus.edu.tr/' },
      { name: 'Beykoz University', url: 'https://www.beykoz.edu.tr/' },
      { name: 'Biruni University', url: 'https://www.biruni.edu.tr/' },
      { name: 'BSBI', url: 'https://www.bsbi.com/' },
      { name: 'City University', url: 'https://cityu.edu.tr/' },
      { name: 'Constructor University', url: 'https://constructor.university/' },
      { name: 'Cyprus Aydin University', url: 'https://cyprusaydin.edu.tr/' },
      { name: 'EU Business School', url: 'https://www.euruni.edu/' },
      { name: 'Fenerbahce University', url: 'https://www.fenerbahce.edu.tr/' },
      { name: 'Halic University', url: 'https://www.halic.edu.tr/' },
      { name: 'Heriot-Watt University', url: 'https://www.hw.ac.uk/' },
      { name: 'IHMGS University', url: 'https://www.ihmgs.com/' },
      { name: 'INTI University', url: 'https://www.newinti.edu.my/' },
      { name: 'Isik University', url: 'https://www.isikun.edu.tr/' },
      { name: 'Istanbul Arel University', url: 'https://www.arel.edu.tr/' },
      { name: 'Istanbul Atlas University', url: 'https://www.atlas.edu.tr/' },
      { name: 'Istanbul Aydin University', url: 'https://www.aydin.edu.tr/' },
      { name: 'Istanbul Gedik University', url: 'https://www.gedik.edu.tr/' },
      { name: 'Istanbul Gelisim University', url: 'https://www.gelisim.edu.tr/' },
      { name: 'Istanbul Kultur University', url: 'https://www.iku.edu.tr/' },
      { name: 'Istanbul Okan University', url: 'https://www.okan.edu.tr/' },
      { name: 'Istanbul Topkapi University', url: 'https://www.topkapi.edu.tr/' },
      { name: 'Istanbul Yeni Yuzyil University', url: 'https://www.yeniyuzyil.edu.tr/' },
      { name: 'Istinye University', url: 'https://www.istinye.edu.tr/' },
      { name: 'Kadir Has University', url: 'https://www.khas.edu.tr/' },
      { name: 'Mahsa University', url: 'https://mahsa.edu.my/' },
      { name: 'Multimedia University', url: 'https://www.mmu.edu.my/' },
      { name: 'Nottingham University', url: 'https://www.nottingham.edu.my/' },
      { name: 'Ostim Technical University', url: 'https://www.ostimteknik.edu.tr/' },
      { name: 'Ozyegin University', url: 'https://www.ozyegin.edu.tr/' },
      { name: 'Sorbonne University Abu Dhabi', url: 'https://www.sorbonne.ae/' },
      { name: 'Sunway University', url: 'https://sunwayuniversity.edu.my/' },
      { name: "Taylor's University", url: 'https://university.taylors.edu.my/' },
      { name: 'UCSI University', url: 'https://www.ucsiuniversity.edu.my/' },
      { name: 'UniKL University', url: 'https://www.unikl.edu.my/' },
      { name: 'UNITEN University', url: 'https://www.uniten.edu.my/' },
      { name: 'University of Europe for Applied Sciences', url: 'https://www.ue-germany.com/' },
      { name: 'University of Wolverhampton', url: 'https://www.wlv.ac.uk/' },
      { name: 'Uskudar University', url: 'https://uskudar.edu.tr/' },
      { name: 'UTP University', url: 'https://www.utp.edu.my/' },
    ],
  },
  {
    title: 'Albanie',
    intro: 'Présence régionale avec programmes internationaux.',
    items: [
      { name: 'University of Professional Arts', url: 'https://www.upa.al/' },
    ],
  },
  {
    title: 'Russie',
    intro: 'Réseau partenaires via RACUS Group pour médecine, ingénierie et programmes internationaux.',
    items: [
      { name: 'RACUS Group — universités partenaires russes', url: 'https://www.racusgroup.com/' },
    ],
  },
  {
    title: 'Royaume-Uni',
    intro: 'Écoles privées et établissements avec formats flexibles.',
    items: [
      { name: 'British School of Marketing', url: 'https://britishschoolofmarketing.com/' },
    ],
  },
];

const UniversityPartnersPage = () => (
  <>
    <SEOHelmet
      title="Universités partenaires | Étudier à l’étranger depuis la Tunisie | EduGrowth"
      description="Liste des universités partenaires EduGrowth pour la France, Dubai, Maroc, Allemagne, Chypre du Nord, Roumanie, Turquie, Albanie, Russie et Royaume-Uni."
      canonical="https://edugrowth.tn/partenaires-universites"
      lang="fr"
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Universités partenaires EduGrowth',
        description: 'Répertoire des universités partenaires EduGrowth pour étudiants tunisiens à l’étranger.',
        itemListElement: partnerGroups.flatMap((group, index) =>
          group.items.map((item, itemIndex) => ({
            '@type': 'ListItem',
            position: index * 100 + itemIndex + 1,
            name: item.name,
            url: item.url,
          }))
        ),
      }}
    />
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            <Home size={16} /> Accueil
          </Link>
          <Link to="/devenir-partenaire" className="inline-flex items-center gap-2 rounded-full bg-[#17324d] px-4 py-2 text-sm font-black text-white hover:bg-[#10263b]">
            Devenir partenaire
            <ArrowRight size={16} />
          </Link>
        </div>

        <section className="rounded-[2rem] bg-gradient-to-br from-[#17324d] via-[#0f4d6b] to-[#176b87] p-8 text-white shadow-xl sm:p-12">
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">
            <School size={16} /> Universités partenaires
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
            Un réseau de partenaires pour aider les étudiants tunisiens à trouver la bonne université à l’étranger.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100">
            Cette page regroupe les universités et établissements que EduGrowth met en avant pour la France, Dubai, le Maroc, l’Allemagne, le Chypre du Nord, la Roumanie, la Turquie, l’Albanie, la Russie et le Royaume-Uni.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
              <div className="text-3xl font-black">{partnerGroups.reduce((total, group) => total + group.items.length, 0)}+</div>
              <p className="mt-1 text-sm font-semibold text-cyan-100">établissements listés</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
              <div className="text-3xl font-black">10</div>
              <p className="mt-1 text-sm font-semibold text-cyan-100">zones pays</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
              <div className="text-3xl font-black">RACUS</div>
              <p className="mt-1 text-sm font-semibold text-cyan-100">collaboration Russie</p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.5rem] border border-cyan-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#176b87]">SEO partenaires universités</p>
              <h2 className="mt-2 text-2xl font-black text-[#17324d]">Universités qui cherchent une agence d’orientation en Tunisie, Algérie ou Maroc</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                EduGrowth peut représenter des écoles et universités internationales auprès d’étudiants nord-africains, avec qualification de profil, admission, suivi parents et accompagnement jusqu’au départ.
              </p>
            </div>
            <Link to="/devenir-partenaire" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17324d] px-6 py-3 text-sm font-black text-white hover:bg-[#10263b]">
              <Search size={16} />
              Recruter en Afrique du Nord
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-6">
          {partnerGroups.map((group) => (
            <article key={group.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#eef8fb] px-3 py-2 text-sm font-semibold text-[#176b87]">
                    <Landmark size={16} /> {group.title}
                  </div>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">{group.intro}</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                  <Globe2 size={16} /> {group.items.length} établissements
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.items.map((item) => {
                  const logoUrl = getLogoUrl(item.url);
                  return (
                    <a key={item.name} href={item.url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-[#176b87] hover:bg-[#f8fbfd]">
                      <div className="flex items-center gap-3">
                        {logoUrl ? (
                          <img
                            src={logoUrl}
                            alt={`${item.name} logo`}
                            className="h-12 w-12 rounded-full border border-slate-200 object-contain bg-white p-1"
                            onError={(event) => {
                              event.currentTarget.style.display = 'none';
                              event.currentTarget.nextSibling?.classList?.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-[#17324d] text-sm font-black text-white ${logoUrl ? 'hidden' : ''}`}>
                          {item.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-black text-[#17324d]">{item.name}</h3>
                          <p className="text-sm text-slate-500">Site officiel</p>
                        </div>
                      </div>
                      <Building2 size={18} className="text-[#176b87]" />
                    </a>
                  );
                })}
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  </>
);

export default UniversityPartnersPage;
