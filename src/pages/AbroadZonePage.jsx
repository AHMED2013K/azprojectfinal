import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, MessageSquare, Home as HomeIcon, Globe2, Zap, Mail, Phone, ArrowRight, GraduationCap, Building2 } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import { destinationsData } from '../components/data.js'; // Reuse/add from current
import { trackEvent } from '../utils/tracking';

const WA_NUMBER = '21656590703';

const abroadStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Study Abroad Guidance Tunisia",
      "serviceType": "Student Admissions and Visa Guidance",
      "provider": {
        "@type": "Organization",
        "name": "EduGrowth Outsourcing",
        "url": "https://edugrowth.tn/"
      },
      "areaServed": ["Tunisia", "France", "Germany", "Cyprus", "Turkey", "Canada"],
      "availableLanguage": ["French", "Arabic", "English"],
      "description": "Abroad Zone helps Tunisian students with destination choice, applications, admissions, and student visa preparation."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can you help me choose the best destination based on my budget?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We provide a destination shortlist based on your academic background, budget, and target career path."
          }
        },
        {
          "@type": "Question",
          "name": "Do you support visa preparation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we help with checklist preparation, document validation, and interview preparation."
          }
        }
      ]
    }
  ]
};

const translations = {
  en: {
    stdHeroTitle: "Your Gateway to Global Education",
    stdHeroSubtitle: "Expert guidance for your studies, professional training, and career mobility worldwide. Based in Tunisia, serving the world.",
    stdHeroCTA: "Get Started Now",
    stdHeroSecondary: "View All Services",
    stdServiceTitle: "Our Premium Expertise",
    stdServiceDesc: "Comprehensive support designed to navigate the complexities of international education and career paths with confidence.",
    stdAlternance: "Work-Study in France",
    stdAlternanceDesc: "Complete support for finding your 'alternance' in France: from CV optimization and interview prep to contract signing.",
    stdLogement: "Global Housing Search",
    stdLogementDesc: "Fast and reliable housing search assistance in your destination country, including all administrative and guarantee support.",
    stdEtudes: "University Admissions",
    stdEtudesDesc: "Strategic guidance for university applications in Turkey, Cyprus, Russia, Morocco, Dubai, and beyond.",
    stdAusbildung: "Ausbildung in Germany",
    stdAusbildungDesc: "Dual training programs in Germany & Switzerland: combine high-quality theory with paid practical experience.",
    stdDestTitle: "Strategic Destinations",
    stdDestDesc: "We partner with prestigious international institutions to offer you secure, recognized, and high-quality educational paths.",
    stdOfficeTitle: "Our Global Presence",
    stdOfficeDesc: "Local offices providing reliable, fast, and personalized support in multiple countries.",
    stdAlternanceHeroTitle: "Launch Your Career in France",
    stdAlternanceHeroDesc: "Full-cycle support to secure your work-study contract, backed by our extensive network of partner companies.",
    stdPackTitle: "Complete Alternance Pack",
    stdPackPrice: "400€",
    stdFormTitle: "Start Your Journey",
    stdFormName: "Your Full Name",
    stdFormEmail: "Your Email Address",
    stdFormService: "Interested Service",
    stdFormMessage: "How can we help you?",
    stdFormSubmit: "Connect on WhatsApp",
    stdConsent: "I agree to the processing of my data in accordance with the privacy policy.",
  },
  // Add fr if needed, but default en for now
};

const AbroadZonePage = () => {
  const lang = 'en'; // Fix or use state/context
  const t = translations[lang];

  const handleWA = (e) => {
    e.preventDefault();
    trackEvent('generate_lead', {
      lead_source: 'abroad_zone_form',
      page_location: '/abroad-zone',
      value: 1,
      currency: 'USD',
    });
    const fd = new FormData(e.target);
    const msg = `New contact from Abroad Zone\nName: ${fd.get('name')}\nEmail: ${fd.get('email')}\nService: ${fd.get('service')}\nMessage: ${fd.get('message')}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      <SEOHelmet 
        title="Agence Étude à l'Étranger Tunisie | Abroad Zone by EduGrowth"
        description="Étudier à l'étranger depuis la Tunisie: orientation, admission, visa étudiant et accompagnement complet vers la France, l'Allemagne, le Canada et plus."
        canonical="https://edugrowth.tn/abroad-zone"
        structuredData={abroadStructuredData}
      />
      <div className="min-h-screen bg-white font-sans scroll-smooth text-gray-900">
        {/* Navbar - copy from past, adapt */}
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b px-8 py-5 flex items-center justify-between">
          {/* Logo & title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-sm" style={{backgroundColor: '#175c7d'}}>
              <img src="/abraod.jpeg" alt="Abroad Zone" className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase" style={{color: '#175c7d'}}>Abroad Zone</span>
          </div>
          {/* Links */}
          <div className="hidden lg:flex items-center gap-10 text-sm font-bold text-gray-500">
            <a href="#std-services" className="hover:text-[#175c7d] uppercase">Services</a>
            <a href="#std-destinations" className="hover:text-[#175c7d] uppercase">Destinations</a>
            <a href="#std-bureaux" className="hover:text-[#175c7d] uppercase">Offices</a>
            <a href="#std-contact" className="hover:text-[#175c7d] uppercase">Contact</a>
            <Link to="/book-consultation" className="hover:text-[#175c7d] uppercase">Free Consultation</Link>
            {/* Lang toggle if needed */}
            <Link to="/" className="flex items-center gap-2 hover:text-[#175c7d] border-l pl-8">
              <HomeIcon size={16} /> Back to Portal
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <header className="pt-44 pb-32 px-8 bg-[#175c7d] text-white relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-0">
            <div className="hero-wave-layer" />
            <div className="hero-grid-layer" />
            <div className="hero-beam-layer" />
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
            <div className="hero-orb hero-orb-3" />
          </div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase">{t.stdHeroTitle}</h1>
            <p className="text-2xl opacity-90 mb-12 max-w-2xl mx-auto">{t.stdHeroSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button onClick={() => document.getElementById('std-contact')?.scrollIntoView({behavior: 'smooth'})} 
                className="bg-white text-[#175c7d] px-10 py-6 rounded-[2rem] font-black text-xl shadow-2xl hover:scale-105 transition-all uppercase">
                {t.stdHeroCTA}
              </button>
              <Link to="/book-consultation" className="bg-[#0b3853] border-2 border-white/40 px-10 py-6 rounded-[2rem] font-black text-xl hover:bg-[#0f4668] transition-all uppercase">
                Book Free Consultation
              </Link>
              <button onClick={() => document.getElementById('std-services')?.scrollIntoView({behavior: 'smooth'})} 
                className="bg-transparent border-2 border-white/30 px-10 py-6 rounded-[2rem] font-black text-xl hover:bg-white/10 transition-all uppercase">
                {t.stdHeroSecondary}
              </button>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section className="py-16 px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div><div className="text-5xl font-black mb-2" style={{ color: '#175c7d' }}>7+</div><div className="text-xs font-bold uppercase tracking-widest text-gray-400">International Offices</div></div>
            <div><div className="text-5xl font-black mb-2" style={{ color: '#175c7d' }}>7+</div><div className="text-xs font-bold uppercase tracking-widest text-gray-400">Destinations</div></div>
            <div><div className="text-5xl font-black mb-2" style={{ color: '#175c7d' }}>7+</div><div className="text-xs font-bold uppercase tracking-widest text-gray-400">Support Services</div></div>
            <div><div className="text-5xl font-black mb-2" style={{ color: '#175c7d' }}>24/7</div><div className="text-xs font-bold uppercase tracking-widest text-gray-400">Support</div></div>
          </div>
        </section>

        <section className="pb-16 px-8">
          <div className="max-w-6xl mx-auto rounded-[2rem] border border-slate-200 bg-white p-8">
            <h2 className="text-2xl font-black text-slate-900">Popular Study Abroad Guides</h2>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-bold text-[#175c7d]">
              <Link to="/etudier-en-france-depuis-tunisie">Étudier en France depuis la Tunisie</Link>
              <Link to="/etudier-en-allemagne-depuis-tunisie">Étudier en Allemagne depuis la Tunisie</Link>
              <Link to="/etudier-au-canada-depuis-tunisie">Étudier au Canada depuis la Tunisie</Link>
              <Link to="/etudier-a-chypre-depuis-tunisie">Étudier à Chypre depuis la Tunisie</Link>
              <Link to="/agence-etude-etranger-tunis">Agence à Tunis</Link>
              <Link to="/agence-etude-etranger-sousse">Agence à Sousse</Link>
              <Link to="/agence-etude-etranger-sfax">Agence à Sfax</Link>
              <Link to="/blog">Blog Guides</Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="std-services" className="py-32 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">{t.stdServiceTitle}</h2>
              <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">{t.stdServiceDesc}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { key: 'stdAlternance', icon: MessageSquare, descKey: 'stdAlternanceDesc' },
                { key: 'stdLogement', icon: HomeIcon, descKey: 'stdLogementDesc' },
                { key: 'stdEtudes', icon: Globe2, descKey: 'stdEtudesDesc' },
                { key: 'stdAusbildung', icon: Zap, descKey: 'stdAusbildungDesc' }
              ].map((s, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group cursor-pointer hover:-translate-y-2">
                  <div className="w-12 h-12 bg-[#E3F0FA] text-[#175c7d] rounded-xl flex items-center justify-center mb-6 transition-all group-hover:bg-[#175c7d] group-hover:text-white">
                    <s.icon size={24} />
                  </div>
                  <h3 className="text-xl font-black mb-4 uppercase tracking-tight text-[#175c7d]">{t[s.key]}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">{t[s.descKey]}</p>
                  <div className="h-1 w-12 bg-[#175c7d] group-hover:w-full transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alternance Hero & Process */}
        <section id="std-alternance" className="py-32 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="bg-[#e0f0fa] rounded-[3rem] p-12 md:p-20 relative overflow-hidden mb-20">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight text-[#175c7d]">
                  {t.stdAlternanceHeroTitle}
                </h2>
                <p className="text-xl mb-10 max-w-2xl text-[#175c7d]/70">
                  {t.stdAlternanceHeroDesc}
                </p>
                <button onClick={() => document.getElementById('std-pricing')?.scrollIntoView({behavior: 'smooth'})} 
                  className="bg-[#175c7d] text-white px-8 py-4 rounded-2xl font-black uppercase hover:shadow-xl transition-all">
                  See Pricing
                </button>
              </div>
              <CheckCircle2 className="absolute top-0 right-0 p-10 opacity-5" size={300} style={{ color: '#175c7d' }} />
            </div>
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                <h3 className="text-3xl font-black uppercase tracking-tight">Our 4-Step Process</h3>
                <div className="space-y-6">
                  {[
                    { title: "Profile Analysis", desc: "Study your background and define professional goals." },
                    { title: "Opportunity Search", desc: "Targeted offers from our partner companies." },
                    { title: "Interview Preparation", desc: "Intensive coaching to help you stand out." },
                    { title: "Contract Signing", desc: "Negotiation assistance and contract finalization." }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="w-12 h-12 text-white rounded-full flex items-center justify-center font-black shrink-0 shadow-lg" style={{ backgroundColor: '#175c7d' }}>
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold uppercase text-gray-900">{step.title}</h4>
                        <p className="text-gray-500">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div id="std-pricing" className="bg-gray-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                <h3 className="text-2xl font-black mb-4 uppercase">{t.stdPackTitle}</h3>
                <div className="text-6xl font-black mb-8 text-blue-400">{t.stdPackPrice}</div>
                <div className="space-y-4 mb-10 text-sm font-medium text-gray-400 leading-relaxed">
                  <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-400" /> Personalized application follow-up</p>
                  <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-400" /> Access to 850+ company network</p>
                  <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-400" /> Administrative support</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-xs mb-8 opacity-80">
                  <strong>Payment in 2 stages:</strong> 150€ upfront / 250€ after first salary.
                </div>
                <a href="https://gateway.konnect.network/pay?payment_ref=693042fe7f6493f1d231e7d4" target="_blank" rel="noopener noreferrer" 
                   className="block w-full text-center py-5 rounded-2xl font-black uppercase text-white shadow-lg transition-all" style={{ backgroundColor: '#175c7d' }}>
                  Sign Up Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations */}
        <section id="std-destinations" className="py-32 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">{t.stdDestTitle}</h2>
              <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">{t.stdDestDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {destinationsData.map((d, i) => (
                <div key={i} className="group relative h-96 rounded-[2.5rem] overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-all duration-300">
                  <img src={d.img} alt={d.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 p-10 text-white">
                    <h3 className="text-3xl font-black uppercase mb-2">{d.name}</h3>
                    <p className="text-sm font-medium opacity-80">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Offices */}
        <section id="std-bureaux" className="py-32 px-8 bg-white text-center">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">{t.stdOfficeTitle}</h2>
            <p className="text-xl text-gray-500 mb-16">{t.stdOfficeDesc}</p>
            <div className="flex flex-wrap justify-center gap-6">
              {["Tunisia", "Morocco", "Cyprus", "Russia", "UAE", "Turkey", "Congo"].map((o, i) => (
                <div key={i} className="bg-gray-50 px-8 py-4 rounded-2xl font-black border border-gray-100 hover:shadow-lg transition-all" style={{ color: '#175c7d' }}>
                  {o}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="std-contact" className="py-32 px-8 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-black mb-8 uppercase tracking-tight">{t.stdFormTitle}</h2>
              <p className="text-xl text-gray-400 mb-12 font-medium">Ready to start your project? Fill out the form or send us a WhatsApp message.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-blue-400"><Mail size={20} /></div>
                  <p className="font-bold">contact@edugrowth.tn</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500"><Phone size={20} /></div>
                  <p className="font-bold">+216 56 59 07 03</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleWA} className="bg-white rounded-[3rem] p-12 text-gray-900 space-y-6 shadow-2xl">
              <input type="text" name="name" required placeholder={t.stdFormName} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold" />
              <input type="email" name="email" required placeholder={t.stdFormEmail} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold" />
              <select name="service" required className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold appearance-none">
                <option value="">{t.stdFormService}</option>
                <option value="alternance">Work-study France</option>
                <option value="logement">Housing</option>
                <option value="etudes">Studies</option>
                <option value="ausbildung">Ausbildung</option>
              </select>
              <textarea name="message" rows="4" placeholder={t.stdFormMessage} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none outline-none font-bold resize-none" />
              <div className="flex items-start gap-3 text-sm text-gray-500 font-bold px-2">
                <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                <span>{t.stdConsent}</span>
              </div>
              <button type="submit" className="w-full text-white py-5 rounded-2xl font-black text-xl shadow-xl transition-all" style={{ backgroundColor: '#175c7d' }}>
                {t.stdFormSubmit}
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-8 bg-white border-t text-center text-gray-900">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-3 font-black text-2xl tracking-tighter">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#175c7d' }}>
                <img src="/abraod.jpeg" alt="Abroad Zone" className="w-full h-full object-contain" />
              </div>
              Abroad Zone
            </div>
            <p className="text-xs font-black text-gray-300 uppercase tracking-widest">
              © 2024 Abroadzone Group • Tunisia • UK • UAE
            </p>
          </div>
        </footer>
      </div>
      <style>{`
        .hero-wave-layer {
          position: absolute;
          inset: -35% -10% -10% -10%;
          background:
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.2), transparent 42%),
            radial-gradient(circle at 80% 30%, rgba(56, 189, 248, 0.25), transparent 45%),
            radial-gradient(circle at 45% 80%, rgba(59, 130, 246, 0.25), transparent 48%);
          animation: heroWaveDrift 7s ease-in-out infinite;
          transform-origin: center;
          will-change: transform, filter;
        }

        .hero-grid-layer {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(circle at center, black 30%, transparent 85%);
          opacity: 0.35;
          animation: heroGridShift 6s linear infinite;
          will-change: background-position;
        }

        .hero-beam-layer {
          position: absolute;
          inset: -40% -20%;
          background:
            conic-gradient(from 30deg at 50% 50%, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.02) 20%, rgba(14, 165, 233, 0.2) 44%, rgba(255, 255, 255, 0.03) 65%, rgba(255, 255, 255, 0.22));
          mix-blend-mode: screen;
          opacity: 0.5;
          animation: heroBeamSpin 12s linear infinite;
          will-change: transform;
        }

        .hero-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(3px);
          opacity: 0.55;
          will-change: transform;
        }

        .hero-orb-1 {
          width: 260px;
          height: 260px;
          top: 8%;
          left: 6%;
          background: radial-gradient(circle at 35% 35%, rgba(125, 211, 252, 0.8), rgba(56, 189, 248, 0.05));
          animation: heroOrbFloatA 5s ease-in-out infinite;
        }

        .hero-orb-2 {
          width: 340px;
          height: 340px;
          right: 4%;
          top: 20%;
          background: radial-gradient(circle at 30% 30%, rgba(147, 197, 253, 0.75), rgba(37, 99, 235, 0.06));
          animation: heroOrbFloatB 6s ease-in-out infinite;
        }

        .hero-orb-3 {
          width: 300px;
          height: 300px;
          left: 38%;
          bottom: -14%;
          background: radial-gradient(circle at 40% 40%, rgba(191, 219, 254, 0.7), rgba(29, 78, 216, 0.06));
          animation: heroOrbFloatC 5.5s ease-in-out infinite;
        }

        @keyframes heroWaveDrift {
          0% { transform: translate3d(-8%, -5%, 0) scale(1.02) rotate(-2deg); filter: hue-rotate(0deg); }
          50% { transform: translate3d(5%, 2%, 0) scale(1.09) rotate(1.5deg); filter: hue-rotate(14deg); }
          100% { transform: translate3d(-3%, 6%, 0) scale(1.05) rotate(-1deg); filter: hue-rotate(0deg); }
        }

        @keyframes heroGridShift {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 96px 48px, 48px 96px; }
        }

        @keyframes heroBeamSpin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.04); }
          100% { transform: rotate(360deg) scale(1); }
        }

        @keyframes heroOrbFloatA {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(52px, 34px, 0); }
        }

        @keyframes heroOrbFloatB {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-46px, 28px, 0); }
        }

        @keyframes heroOrbFloatC {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(36px, -36px, 0); }
        }
      `}</style>
    </>
  );
};

export default AbroadZonePage;
