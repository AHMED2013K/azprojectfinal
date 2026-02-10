import React, { useState } from 'react';
import { 
  ChevronRight, 
  CheckCircle2, 
  BarChart3, 
  Users, 
  Globe2, 
  ShieldCheck, 
  Zap, 
  Mail, 
  Phone, 
  ArrowRight,
  TrendingUp,
  Clock,
  LayoutDashboard,
  MessageSquare,
  Home,
  GraduationCap,
  Building2,
  X,
  Sparkles,
  Languages,
  Send
} from 'lucide-react';

// --- CONFIGURATION: PUT YOUR LOGO FILENAMES HERE ---
const STUDENT_LOGO_URL = "abraod.jpeg"; // Logo for the Abroad Zone Student Portal
const B2B_LOGO_URL = "Simplified logo ful.png";         // Logo for the EduGrowth B2B Portal
const WA_NUMBER = '21656590703';
// ---------------------------------------------------

// --- Translation Dictionary ---
const translations = {
  en: {
    // Gate
    gateStudent: "Student Portal",
    gateStudentDesc: "Find your future. Explore universities across the UK, EU, and Middle East.",
    gateStudentBtn: "Start Searching",
    gateInst: "B2B Partner",
    gateInstDesc: "Scale your enrollment. Deploy dedicated offshore recruitment teams.",
    gateInstBtn: "Institutional Access",
    // Common
    navServices: "Services",
    navPricing: "Pricing",
    navPortal: "Switch Portal",
    navDemo: "Book a Demo",
    navContact: "Contact",
    navDestinations: "Destinations",
    navOffices: "Offices",
    select: "Select",
    // Student Specific
    stdHeroTitle: "Your international future starts here",
    stdHeroSubtitle: "Personalized support for studies, work, and mobility.",
    stdHeroCTA: "Contact Us",
    stdHeroSecondary: "See Services",
    stdServiceTitle: "Our Premium Services",
    stdServiceDesc: "Tailored support for students and professionals: work-study, studies, housing, and integration.",
    stdAlternance: "Work-study in France",
    stdAlternanceDesc: "Company search, CV optimization, interview preparation and follow-up until contract signing.",
    stdLogement: "Housing search",
    stdLogementDesc: "Tailored solutions (student housing, shared flats, guarantees) and assistance with housing benefits.",
    stdEtudes: "International studies",
    stdEtudesDesc: "Guidance and support to join universities and schools in Turkey, Cyprus, Russia, Morocco, Dubai.",
    stdAusbildung: "Ausbildung & Professional training",
    stdAusbildungDesc: "Apprenticeship programs in Germany & Switzerland: theory + practical company experience.",
    stdDestTitle: "Our Destinations",
    stdDestDesc: "We work with reliable partners to offer you serious and well-prepared paths.",
    stdOfficeTitle: "Our Offices",
    stdOfficeDesc: "Local presence for reliable and fast support.",
    stdAlternanceHeroTitle: "Work-study search in France",
    stdAlternanceHeroDesc: "Complete support to find your work-study, from opportunity search to hiring.",
    stdPackTitle: "Complete Work-study Pack",
    stdPackPrice: "400€",
    stdFormTitle: "Contact Form",
    stdFormName: "Full Name",
    stdFormEmail: "Email Address",
    stdFormService: "Select a Service",
    stdFormMessage: "Your Message",
    stdFormSubmit: "Send via WhatsApp",
    stdConsent: "I agree that my data will be processed in accordance with privacy policy.",
    // B2B Specific
    heroBadge: "BPO 2.0 FOR HIGHER ED",
    heroTitle: "Global Recruitment",
    heroTitleSpan: "On Autopilot.",
    heroDesc: "Stop losing leads to slow response times. Deploy a dedicated team of education experts in 72 hours.",
    heroCTA: "Scale Your Intake",
    heroSecondary: "Explore Our Hub",
    stat1: "Omnichannel Support",
    stat2: "Cost Savings",
    stat3: "Core Markets",
    stat4: "SLA Response",
    serviceTitle: "A Full Stack",
    serviceTitleSpan: "Recruitment Hub",
    serviceDesc: "We don't just 'outsource.' We integrate directly into your workflows to act as a seamless extension of your university.",
    serviceBtn: "Download Full Catalog",
    s1Title: "Inquiry & Lead Gen",
    s1Desc: "Native-level English and French agents qualifying student inquiries in real-time.",
    s2Title: "Admissions Sales",
    s2Desc: "High-converting sales teams trained specifically in Higher Education.",
    s3Title: "Compliance & Admin",
    s3Desc: "Document verification, visa checklists, and procedural guidance.",
    s4Title: "B2B Development",
    s4Desc: "Growing your partner network. We manage school counselor relations.",
    s5Title: "CRM Integration",
    s5Desc: "Seamless HubSpot, Salesforce, and Zoho management.",
    s6Title: "Automation & BI",
    s6Desc: "Custom automation workflows and executive-level dashboards.",
    pricingTitle: "Scalable Units",
    pricingFixed: "Standard Fixed",
    pricingHybrid: "Hybrid Performance",
    perfModelTitle: "Performance Alignment Model",
    perfModelDesc: "Our hybrid model lowers your fixed monthly overhead by up to 33% and introduces a success-based commission (€300 - €500 per student).",
    savingsTitle: "The Savings Breakdown",
    savingsLabel1: "In-house (London)",
    savingsLabel2: "EduGrowth BPO",
    footerText: "Building the global operating system for international university admissions. Based in Tunisia, serving the world."
  },
  fr: {
    // Gate
    gateStudent: "Portail Étudiant",
    gateStudentDesc: "Trouvez votre avenir. Explorez les universités au Royaume-Uni, en UE et au Moyen-Orient.",
    gateStudentBtn: "Commencer la recherche",
    gateInst: "Partenaire B2B",
    gateInstDesc: "Boostez vos inscriptions. Déployez des équipes de recrutement offshore dédiées.",
    gateInstBtn: "Accès Institutionnel",
    // Common
    navServices: "Nos services",
    navPricing: "Tarifs",
    navPortal: "Changer de Portail",
    navDemo: "Démo",
    navContact: "Contact",
    navDestinations: "Destinations",
    navOffices: "Bureaux",
    select: "Choisir",
    // Student Specific
    stdHeroTitle: "Votre avenir à l'international",
    stdHeroSubtitle: "Accompagnement personnalisé pour études, travail et mobilité.",
    stdHeroCTA: "Contactez-nous",
    stdHeroSecondary: "Voir nos services",
    stdServiceTitle: "Nos Services Premium",
    stdServiceDesc: "Accompagnement sur-mesure pour étudiants et professionnels : alternance, études, logement et intégration.",
    stdAlternance: "Alternance en France",
    stdAlternanceDesc: "Recherche d'entreprise, optimisation CV, préparation aux entretiens et suivi jusqu'à la signature du contrat.",
    stdLogement: "Recherche de logement",
    stdLogementDesc: "Solutions adaptées (logement étudiant, colocations, garanties) et assistance CAF/APL.",
    stdEtudes: "Études à l'international",
    stdEtudesDesc: "Orientation et accompagnement pour intégrer des universités en Turquie, Chypre, Russie, Maroc, Dubaï.",
    stdAusbildung: "Ausbildung & Formations pro",
    stdAusbildungDesc: "Programmes d'apprentissage en Allemagne & Suisse : théorie + pratique en entreprise.",
    stdDestTitle: "Nos Destinations",
    stdDestDesc: "Nous travaillons avec des partenaires fiables pour vous proposer des parcours sérieux et tracés.",
    stdOfficeTitle: "Nos Bureaux",
    stdOfficeDesc: "Présence locale pour un accompagnement fiable et rapide.",
    stdAlternanceHeroTitle: "Recherche d'Alternance en France",
    stdAlternanceHeroDesc: "Accompagnement complet pour décrocher votre alternance, de la recherche d'opportunités jusqu'à votre embauche.",
    stdPackTitle: "Pack Alternance Complet",
    stdPackPrice: "400€",
    stdFormTitle: "Formulaire de contact",
    stdFormName: "Nom Complet",
    stdFormEmail: "Adresse Email",
    stdFormService: "Sélectionnez un Service",
    stdFormMessage: "Votre Message",
    stdFormSubmit: "Envoyer via WhatsApp",
    stdConsent: "J'accepte que mes données soient traitées conformément à la politique de confidentialité.",
    // B2B Specific
    heroBadge: "BPO 2.0 POUR L'ÉDUCATION",
    heroTitle: "Recrutement Mondial",
    heroTitleSpan: "en Pilote Automatique.",
    heroDesc: "Arrêtez de perdre des prospects à cause de temps de réponse lents. Déployez une équipe d'experts en 72h.",
    heroCTA: "Boostez vos Inscriptions",
    heroSecondary: "Explorer notre Hub",
    stat1: "Support Omnicanal",
    stat2: "Économies",
    stat3: "Marchés Cibles",
    stat4: "Réponse SLA",
    serviceTitle: "Un Hub de",
    serviceTitleSpan: "Recrutement Complet",
    serviceDesc: "Nous ne faisons pas que de l'externalisation. Nous nous intégrons à vos flux de travail comme une extension de votre université.",
    serviceBtn: "Télécharger le Catalogue",
    s1Title: "Demandes & Prospects",
    s1Desc: "Agents bilingues qualifiant les demandes des étudiants en temps réel.",
    s2Title: "Ventes Admissions",
    s2Desc: "Équipes de vente performantes formées à l'enseignement supérieur.",
    s3Title: "Conformité & Admin",
    s3Desc: "Vérification des documents et listes de contrôle visa.",
    s4Title: "Développement B2B",
    s4Desc: "Développement de votre réseau de partenaires et conseillers.",
    s5Title: "Intégration CRM",
    s5Desc: "Gestion transparente de HubSpot, Salesforce et Zoho.",
    s6Title: "Automation & BI",
    s6Desc: "Flux d'automatisation et tableaux de bord décisionnels.",
    pricingTitle: "Unités Évolutives",
    pricingFixed: "Fixe Standard",
    pricingHybrid: "Performance Hybride",
    perfModelTitle: "Modèle d'Alignement de Performance",
    perfModelDesc: "Notre modèle hybride réduit vos frais fixes mensuels jusqu'à 33% et introduit une commission au succès (€300 - €500 par étudiant).",
    savingsTitle: "Analyse des Économies",
    savingsLabel1: "Interne (Londres)",
    savingsLabel2: "EduGrowth BPO",
    footerText: "Construire le système d'exploitation mondial pour les admissions universitaires. Basé en Tunisie, au service du monde."
  }
};

const destinationsData = [
  { id: 'fra', name: "France", desc: "Alternance & études supérieures", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=60" },
  { id: 'chy', name: "Chypre du Nord", desc: "Études en anglais avec accompagnement", img: "https://images.unsplash.com/photo-1677023484291-005b9840132f?auto=format&fit=crop&w=800&q=60" },
  { id: 'rus', name: "Russie", desc: "Programmes académiques reconnus", img: "https://images.unsplash.com/photo-1580837119756-563d608dd119?auto=format&fit=crop&w=800&q=60" },
  { id: 'mar', name: "Maroc", desc: "Proximité culturelle et soutien", img: "https://images.unsplash.com/photo-1515386474292-47555758ef2e?auto=format&fit=crop&w=800&q=60" },
  { id: 'dub', name: "Dubaï", desc: "Innovation et opportunités", img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=60" },
  { id: 'ger', name: "Allemagne", desc: "Ausbildung & apprentissage", img: "https://images.unsplash.com/photo-1618259278412-2819cbdea4dc?auto=format&fit=crop&w=800&q=60" }
];

const Modal = ({ isOpen, onClose, title, lang }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X size={20} className="text-gray-400" />
        </button>
        <div className="mb-6 text-gray-900">
          <div className="w-12 h-12 bg-blue-50 text-[#005A9C] rounded-xl flex items-center justify-center mb-4">
            <Sparkles size={24} />
          </div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-gray-500 mt-2">
            {lang === 'en' ? "Enter your details and our team will contact you within 4 hours." : "Entrez vos coordonnées et notre équipe vous contactera sous 4 heures."}
          </p>
        </div>
        <form className="space-y-4 text-gray-900" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <input type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#005A9C] outline-none" placeholder="dean@university.edu" />
          <button type="submit" className="w-full bg-[#005A9C] text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all active:scale-[0.98]">
            {lang === 'en' ? "Schedule Strategy Call" : "Planifier un Appel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState('gate');
  const [lang, setLang] = useState('fr');
  const [isHybrid, setIsHybrid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Book a Strategy Call');

  const t = translations[lang];

  const handleWA = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const msg = encodeURIComponent(`Nouveau contact AbroadZone\nNom: ${fd.get('name')}\nEmail: ${fd.get('email')}\nService: ${fd.get('service')}\nMessage: ${fd.get('message')}`);
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
  };

  const openDemo = (title) => {
    setModalTitle(title || t.navDemo);
    setIsModalOpen(true);
  };

  // --- GATEWAY ---
  if (currentView === 'gate') {
    return (
      <div className="flex flex-col md:flex-row min-h-screen font-sans bg-gray-50 overflow-hidden">
        <div className="flex-1 bg-[#005A9C] flex flex-col items-center justify-center p-12 text-white relative group transition-all duration-700">
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl">
               <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter uppercase">{t.gateStudent}</h1>
            <p className="text-xl text-blue-100 mb-12 max-w-sm font-medium leading-relaxed opacity-80">{t.gateStudentDesc}</p>
            <button onClick={() => setCurrentView('student')} className="group bg-white text-[#005A9C] px-10 py-5 rounded-[2rem] font-black text-xl hover:shadow-2xl transition-all flex items-center gap-3">
              {t.gateStudentBtn} <ArrowRight size={24} />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-white flex flex-col items-center justify-center p-12 text-[#333333] relative group transition-all duration-700 overflow-hidden">
          <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-[#2E8B57]/5 rounded-full blur-3xl group-hover:bg-[#2E8B57]/10 transition-all"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gray-50 border border-gray-100 rounded-[2rem] flex items-center justify-center mb-10 shadow-xl">
               <Building2 className="w-12 h-12 text-[#2E8B57]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter uppercase text-gray-900">{t.gateInst}</h1>
            <p className="text-xl text-gray-500 mb-12 max-w-sm font-medium leading-relaxed">{t.gateInstDesc}</p>
            <button onClick={() => setCurrentView('b2b')} className="group bg-[#2E8B57] text-white px-10 py-5 rounded-[2rem] font-black text-xl hover:shadow-2xl transition-all flex items-center gap-3">
              {t.gateInstBtn} <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- STUDENT PORTAL ---
  if (currentView === 'student') {
    return (
      <div className="min-h-screen bg-white font-sans scroll-smooth text-gray-900">
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-700 rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
                <img src={STUDENT_LOGO_URL} className="w-full h-full object-contain" alt="Student Logo" onError={(e) => e.target.style.display = 'none'} />
                <Globe2 className="text-white absolute pointer-events-none opacity-20" />
             </div>
             <span className="text-2xl font-black tracking-tighter text-blue-700 uppercase">Abroad Zone</span>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-sm font-bold text-gray-500">
            <a href="#std-services" className="hover:text-blue-700 uppercase">{t.navServices}</a>
            <a href="#std-destinations" className="hover:text-blue-700 uppercase">{t.navDestinations}</a>
            <a href="#std-bureaux" className="hover:text-blue-700 uppercase">{t.navOffices}</a>
            <a href="#std-contact" className="hover:text-blue-700 uppercase">{t.navContact}</a>
            <button onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} className="bg-gray-100 px-3 py-1 rounded-lg text-blue-700 border border-blue-100 uppercase font-black">{lang.toUpperCase()}</button>
            <button onClick={() => setCurrentView('gate')} className="flex items-center gap-2 hover:text-blue-700 border-l pl-8"><Home size={16} /> {t.navPortal}</button>
          </div>
        </nav>

        <header className="pt-44 pb-32 px-8 bg-[#175c7d] text-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase">{t.stdHeroTitle}</h1>
            <p className="text-2xl opacity-90 mb-12 max-w-2xl mx-auto">{t.stdHeroSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button onClick={() => document.getElementById('std-contact').scrollIntoView()} className="bg-white text-[#175c7d] px-10 py-6 rounded-[2rem] font-black text-xl shadow-2xl hover:scale-105 transition-all uppercase">{t.stdHeroCTA}</button>
              <button onClick={() => document.getElementById('std-services').scrollIntoView()} className="bg-transparent border-2 border-white/30 px-10 py-6 rounded-[2rem] font-black text-xl hover:bg-white/10 transition-all uppercase">{t.stdHeroSecondary}</button>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section className="py-16 px-8 text-gray-900">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div><div className="text-5xl font-black text-blue-700 mb-2">7+</div><div className="text-xs font-bold uppercase tracking-widest text-gray-400">Bureaux Internationaux</div></div>
            <div><div className="text-5xl font-black text-blue-700 mb-2">8</div><div className="text-xs font-bold uppercase tracking-widest text-gray-400">Destinations</div></div>
            <div><div className="text-5xl font-black text-blue-700 mb-2">100%</div><div className="text-xs font-bold uppercase tracking-widest text-gray-400">Accompagnement</div></div>
            <div><div className="text-5xl font-black text-blue-700 mb-2">24/7</div><div className="text-xs font-bold uppercase tracking-widest text-gray-400">Support</div></div>
          </div>
        </section>

        <section id="std-services" className="py-32 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto text-gray-900">
            <div className="text-center mb-24">
              <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">{t.stdServiceTitle}</h2>
              <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">{t.stdServiceDesc}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { k: 'stdAlternance', icon: MessageSquare },
                { k: 'stdLogement', icon: Home },
                { k: 'stdEtudes', icon: Globe2 },
                { k: 'stdAusbildung', icon: Zap }
              ].map((s, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mb-6 transition-colors group-hover:bg-blue-700 group-hover:text-white"><s.icon size={24}/></div>
                  <h3 className="text-xl font-black mb-4 uppercase tracking-tight text-blue-700">{t[s.k]}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">{t[`${s.k}Desc`]}</p>
                  <div className="h-1 w-12 bg-blue-700 group-hover:w-full transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alternance France Section */}
        <section id="std-alternance" className="py-32 px-8 bg-white">
          <div className="max-w-6xl mx-auto text-gray-900">
            <div className="bg-blue-50 rounded-[3rem] p-12 md:p-20 relative overflow-hidden mb-20">
               <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight text-blue-900">{t.stdAlternanceHeroTitle}</h2>
                  <p className="text-xl text-blue-800/70 mb-10 max-w-2xl">{t.stdAlternanceHeroDesc}</p>
                  <div className="flex gap-4">
                     <button onClick={() => document.getElementById('std-pricing').scrollIntoView()} className="bg-blue-700 text-white px-8 py-4 rounded-2xl font-black uppercase">Voir les tarifs</button>
                  </div>
               </div>
               <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none text-blue-900"><CheckCircle2 size={300}/></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                <h3 className="text-3xl font-black uppercase tracking-tight">Notre processus en 4 étapes</h3>
                <div className="space-y-6">
                  {[
                    { t: "Analyse de profil", d: "Étude du parcours et définition des objectifs professionnels." },
                    { t: "Recherche d'opportunités", d: "Sélection d'offres ciblées parmi nos entreprises partenaires." },
                    { t: "Préparation aux entretiens", d: "Coaching intensif pour vous aider à vous démarquer." },
                    { t: "Accompagnement signature", d: "Aide à la négociation et signature de votre contrat." }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center font-black shrink-0 shadow-lg">{i+1}</div>
                      <div><h4 className="text-xl font-bold uppercase text-gray-900">{step.t}</h4><p className="text-gray-500">{step.d}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <div id="std-pricing" className="bg-gray-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
                 <h3 className="text-2xl font-black mb-4 uppercase">{t.stdPackTitle}</h3>
                 <div className="text-6xl font-black mb-8 text-blue-400">{t.stdPackPrice}</div>
                 <div className="space-y-4 mb-10 text-sm font-medium text-gray-400 leading-relaxed">
                    <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-400"/> Suivi personnalisé candidatures</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-400"/> Accès réseau 850+ entreprises</p>
                    <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-400"/> Accompagnement administratif</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-xs mb-8 opacity-80">
                    <strong>Paiement en 2 étapes :</strong> 150€ upfront / 250€ après premier salaire.
                 </div>
                 <a href="https://gateway.konnect.network/pay?payment_ref=693042fe7f6493f1d231e7d4" target="_blank" rel="noopener noreferrer" className="block w-full bg-blue-600 text-center py-5 rounded-2xl font-black uppercase text-white hover:bg-blue-700 transition-all shadow-lg">S'inscrire maintenant</a>
              </div>
            </div>
          </div>
        </section>

        <section id="std-destinations" className="py-32 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto text-gray-900">
            <div className="text-center mb-24">
               <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">{t.stdDestTitle}</h2>
               <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">{t.stdDestDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {destinationsData.map((d, i) => (
                <div key={i} className="group relative h-96 rounded-[2.5rem] overflow-hidden shadow-lg cursor-pointer">
                  <img src={d.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={d.name}/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 p-10 text-white">
                    <h3 className="text-3xl font-black uppercase mb-2">{d.name}</h3>
                    <p className="text-sm font-medium opacity-80">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bureaux */}
        <section id="std-bureaux" className="py-32 px-8 bg-white text-center">
           <div className="max-w-6xl mx-auto text-gray-900">
              <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">{t.stdOfficeTitle}</h2>
              <p className="text-xl text-gray-500 mb-16">{t.stdOfficeDesc}</p>
              <div className="flex flex-wrap justify-center gap-6">
                 {["Tunisie", "Maroc", "Chypre", "Russie", "Emirates", "Turquie", "Congo"].map(o => (
                   <div key={o} className="bg-gray-50 px-8 py-4 rounded-2xl font-black text-blue-700 border border-gray-100 hover:shadow-lg transition-all">{o}</div>
                 ))}
              </div>
           </div>
        </section>

        {/* Contact Form */}
        <section id="std-contact" className="py-32 px-8 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-black mb-8 uppercase tracking-tight">{t.stdFormTitle}</h2>
              <p className="text-xl text-gray-400 mb-12 font-medium">Prêt à lancer votre projet ? Remplissez le formulaire ou envoyez-nous un message via WhatsApp.</p>
              <div className="space-y-6">
                 <div className="flex items-center gap-4"><div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-blue-400"><Mail size={20}/></div><p className="font-bold">contact@abroadzone.com.tn</p></div>
                 <div className="flex items-center gap-4"><div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500"><Phone size={20}/></div><p className="font-bold">+216 56 59 07 03</p></div>
              </div>
            </div>
            <form onSubmit={handleWA} className="bg-white rounded-[3rem] p-12 text-gray-900 space-y-6 shadow-2xl">
               <input type="text" name="name" required placeholder={t.stdFormName} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold" />
               <input type="email" name="email" required placeholder={t.stdFormEmail} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold" />
               <select name="service" required className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold appearance-none">
                  <option value="">{t.stdFormService}</option>
                  <option value="alternance">Alternance en France</option>
                  <option value="logement">Logement</option>
                  <option value="etudes">Études</option>
                  <option value="ausbildung">Ausbildung</option>
               </select>
               <textarea name="message" rows="4" placeholder={t.stdFormMessage} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold resize-none"></textarea>
               <div className="flex items-start gap-3 text-sm text-gray-500 font-bold px-2">
                 <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                 <span>{t.stdConsent}</span>
               </div>
               <button type="submit" className="w-full bg-blue-700 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-200">{t.stdFormSubmit}</button>
            </form>
          </div>
        </section>

        <footer className="py-20 px-8 bg-white border-t text-center text-gray-900">
           <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-3 font-black text-2xl tracking-tighter">
                <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center overflow-hidden">
                  <img src={STUDENT_LOGO_URL} className="w-full h-full object-contain" alt="Student Logo" onError={(e) => e.target.style.display = 'none'} />
                </div>Abroad Zone
              </div>
              <p className="text-xs font-black text-gray-300 uppercase tracking-widest">© 2024 Abroadzone Group • Tunisia • UK • UAE</p>
           </div>
        </footer>
      </div>
    );
  }

  // --- B2B VIEW (UNTOUCHED AS REQUESTED) ---
  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans text-gray-900 scroll-smooth selection:bg-blue-100 selection:text-blue-900">
      <Navbar onViewChange={setCurrentView} onOpenDemo={() => openDemo()} lang={lang} setLang={setLang} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalTitle} lang={lang} />

      <header className="relative pt-32 pb-44 px-8 overflow-hidden text-center text-gray-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-green-400 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-100 shadow-sm text-[#005A9C] px-5 py-2.5 rounded-2xl text-sm font-black mb-10 animate-bounce">
            <Zap size={18} fill="currentColor" /> {t.heroBadge}
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-none text-gray-900">
            {t.heroTitle} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005A9C] to-[#2E8B57]">{t.heroTitleSpan}</span>
          </h1>
          <p className="text-2xl text-gray-500 mb-14 max-w-3xl mx-auto font-medium leading-relaxed">{t.heroDesc}</p>
          <button onClick={() => openDemo()} className="bg-[#005A9C] text-white px-10 py-6 rounded-[2rem] font-black text-xl shadow-xl hover:-translate-y-1 transition-all">{t.heroCTA}</button>
        </div>
      </header>

      <section className="pb-32 px-8">
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-[3rem] p-12 md:p-16 text-white grid grid-cols-2 lg:grid-cols-4 gap-12 shadow-2xl relative overflow-hidden">
          {[ { v: "24/7", l: t.stat1 }, { v: "60%", l: t.stat2 }, { v: "UK/EU", l: t.stat3 }, { v: "4h", l: t.stat4 } ].map((stat, i) => (
            <div key={i} className="relative z-10">
              <div className="text-5xl font-black mb-2 tracking-tighter">{stat.v}</div>
              <div className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-1">{stat.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="py-32 px-8 bg-white">
        <div className="max-w-6xl mx-auto text-gray-900">
          <div className="mb-20">
            <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">{t.serviceTitle} <br /> <span className="text-[#005A9C]">{t.serviceTitleSpan}</span></h2>
            <p className="text-xl text-gray-500 font-medium leading-relaxed">{t.serviceDesc}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-gray-900">
            <ServiceCard icon={MessageSquare} title={t.s1Title} description={t.s1Desc} />
            <ServiceCard icon={BarChart3} title={t.s2Title} description={t.s2Desc} />
            <ServiceCard icon={ShieldCheck} title={t.s3Title} description={t.s3Desc} />
            <ServiceCard icon={Users} title={t.s4Title} description={t.s4Desc} />
            <ServiceCard icon={LayoutDashboard} title={t.s5Title} description={t.s5Desc} />
            <ServiceCard icon={Zap} title={t.s6Title} description={t.s6Desc} />
          </div>
        </div>
      </section>

      <section id="pricing" className="py-32 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center text-gray-900">
          <h2 className="text-5xl font-black mb-12 uppercase tracking-tight">{t.pricingTitle}</h2>
          <div className="flex items-center justify-center gap-6 mb-16">
            <span className={`text-lg font-bold ${!isHybrid ? 'text-[#005A9C] scale-110' : 'text-gray-400'}`}>{t.pricingFixed}</span>
            <button onClick={() => setIsHybrid(!isHybrid)} className="w-20 h-10 rounded-full p-1.5 transition-all flex items-center" style={{ backgroundColor: isHybrid ? '#2E8B57' : '#005A9C' }}>
              <div className={`h-full aspect-square bg-white rounded-full transition-transform ${isHybrid ? 'translate-x-10' : 'translate-x-0'}`} />
            </button>
            <span className={`text-lg font-bold ${isHybrid ? 'text-[#2E8B57] scale-110' : 'text-gray-400'}`}>{t.pricingHybrid}</span>
          </div>
          <div className="grid lg:grid-cols-3 gap-10 items-end">
            <PricingCard title="Starter" price="€1700" agents="1" leads="350" sla="24h" isHybrid={isHybrid} lang={lang} onSelect={() => openDemo()} />
            <PricingCard title="Growth Engine" price="€3000" hybridPrice="€2000" agents="2" leads="800" sla="12h" isFeatured={true} isHybrid={isHybrid} lang={lang} onSelect={() => openDemo()} />
            <PricingCard title="Elite Enterprise" price="Quote" hybridPrice="€4000" agents="3-5+" leads="Unlimited" sla="4h" isHybrid={isHybrid} lang={lang} onSelect={() => openDemo()} />
          </div>
          {isHybrid && (
            <div className="mt-20 max-w-2xl mx-auto bg-[#2E8B57]/5 border border-[#2E8B57]/20 p-8 rounded-[2rem] flex items-start gap-6 animate-in shadow-sm text-gray-900">
              <div className="w-12 h-12 bg-[#2E8B57] text-white rounded-2xl flex items-center justify-center shrink-0"><Sparkles size={24} /></div>
              <div className="text-left"><h4 className="font-black text-green-900 text-xl mb-2">{t.perfModelTitle}</h4><p className="text-green-800/80 font-medium text-sm leading-relaxed">{t.perfModelDesc}</p></div>
            </div>
          )}
        </div>
      </section>

      <section className="py-32 px-8 bg-white text-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center text-gray-900">
          <div><h2 className="text-4xl font-black mb-6 uppercase tracking-tight text-gray-900">Better than <span className="text-[#005A9C]">Internal Hiring.</span></h2><p className="text-gray-500 font-medium leading-relaxed mb-8">Deploying an internal team costs more than just salary. We offer a 60% saving on overhead with better results.</p></div>
          <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl w-full">
            <h3 className="text-2xl font-black mb-8">{t.savingsTitle}</h3>
            <div className="space-y-8">
              <div><div className="flex justify-between mb-2 uppercase text-xs font-black tracking-widest text-gray-400"><span>{t.savingsLabel1}</span><span>€75,000/yr</span></div><div className="h-2 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-red-500 w-full"></div></div></div>
              <div><div className="flex justify-between mb-2 uppercase text-xs font-black tracking-widest text-[#2E8B57]"><span>{t.savingsLabel2}</span><span>€36,000/yr</span></div><div className="h-2 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-[#2E8B57] w-[48%]"></div></div></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-24 px-8 bg-white border-t border-gray-100 text-gray-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-16">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-8 font-black text-2xl tracking-tighter">
              <div className="w-10 h-10 bg-[#005A9C] rounded flex items-center justify-center overflow-hidden shadow-sm">
                <img src={B2B_LOGO_URL} className="w-full h-full object-contain" alt="B2B Logo" onError={(e) => e.target.style.display = 'none'} />
                <TrendingUp className="text-white w-6 h-6 absolute pointer-events-none opacity-0" />
              </div>EduGrowth
            </div>
            <p className="text-gray-500 font-medium leading-relaxed mb-8">{t.footerText}</p>
          </div>
          <div className="text-xs font-black text-gray-300 uppercase tracking-widest self-end">© 2024 Abroadzone Group • Tunisia • UK • UAE</div>
        </div>
      </footer>
    </div>
  );
}

const Navbar = ({ onViewChange, onOpenDemo, lang, setLang }) => {
  const t = translations[lang];
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onViewChange('gate')}>
        <div className="w-10 h-10 bg-[#005A9C] rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform overflow-hidden shadow-sm">
          <img src={B2B_LOGO_URL} className="w-full h-full object-contain" alt="B2B Logo" onError={(e) => { e.target.style.display = 'none'; }} />
          <TrendingUp className="text-white w-6 h-6 absolute pointer-events-none opacity-0" />
        </div>
        <div className="flex flex-col text-gray-900">
          <span className="text-lg font-bold leading-none uppercase">EduGrowth</span>
          <span className="text-[10px] uppercase tracking-widest text-[#005A9C] font-black">Outsourcing</span>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-10 text-sm font-semibold text-gray-500">
        <a href="#services" className="hover:text-[#005A9C] uppercase">{t.navServices}</a>
        <a href="#pricing" className="hover:text-[#005A9C] uppercase">{t.navPricing}</a>
        <button onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-[#005A9C] border border-blue-100 uppercase font-black">{lang.toUpperCase()}</button>
        <div className="h-4 w-px bg-gray-200"></div>
        <button onClick={() => onViewChange('gate')} className="flex items-center gap-2 hover:text-[#005A9C]"><Home size={16} /> {t.navPortal}</button>
        <button onClick={onOpenDemo} className="bg-[#005A9C] text-white px-6 py-2.5 rounded-xl shadow-md">{t.navDemo}</button>
      </div>
    </nav>
  );
};

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
    <div className="w-14 h-14 bg-blue-50 text-[#005A9C] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#005A9C] group-hover:text-white transition-all duration-300">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-800 tracking-tight">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
  </div>
);

const PricingCard = ({ title, price, agents, leads, sla, isFeatured, hybridPrice, isHybrid, onSelect, lang }) => (
  <div className={`relative p-10 rounded-[2.5rem] border transition-all duration-500 ${isFeatured ? 'border-[#2E8B57] shadow-2xl bg-white scale-105 z-10' : 'border-gray-200 bg-white/50'}`}>
    {isFeatured && <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#2E8B57] text-white px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">Recommended</div>}
    <h3 className="text-xl font-bold mb-2 uppercase text-gray-900">{title}</h3>
    <div className="mb-8 text-5xl font-black tracking-tighter text-gray-900">{isHybrid ? (hybridPrice || 'Custom') : price}<span className="text-sm font-medium text-gray-400">/mo</span></div>
    <div className="space-y-5 mb-10 text-sm font-medium text-gray-600">
      <div className="flex items-center gap-4 group"><div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center"><CheckCircle2 className="text-[#2E8B57] w-4 h-4" /></div><span className="text-sm font-medium text-gray-600"><strong>{agents}</strong> Dedicated Agents</span></div>
      <div className="flex items-center gap-4 group"><div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center"><CheckCircle2 className="text-[#2E8B57] w-4 h-4" /></div><span className="text-sm font-medium text-gray-600"><strong>{leads}</strong> Leads Processed</span></div>
      <div className="flex items-center gap-4"><div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center"><Clock className="text-[#2E8B57] w-4 h-4" /></div><span className="text-sm font-medium text-gray-600">SLA: {sla}</span></div>
    </div>
    <button onClick={onSelect} className={`w-full py-5 rounded-2xl font-bold text-lg transition-all ${isFeatured ? 'bg-[#2E8B57] text-white hover:bg-[#256f45] shadow-xl shadow-green-100' : 'bg-gray-900 text-white hover:bg-black'}`}>Select {title}</button>
  </div>
);