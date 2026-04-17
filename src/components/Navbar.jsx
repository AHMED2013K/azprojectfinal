import { Grid, Menu, X } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import LanguageSwitch from './LanguageSwitch';

const Navbar = ({ onOpenPortalSelector, onOpenDemo, lang, setLang, translations }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[lang];

  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 py-4 bg-white/90 backdrop-blur-md border-b sticky top-0 z-50">
      <div>
        <RouterLink to="/" className="flex items-center">
          <img
            src="/Simplified logo ful.webp"
            alt="EduGrowth Logo"
            className="h-8 w-auto"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <span className="text-lg font-bold text-[#005A9C] hidden">EduGrowth</span>
        </RouterLink>
      </div>

      {/* Desktop menu */}
<div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-500">
        <RouterLink to="/abroad-zone" className="hover:text-[#005A9C] uppercase transition-colors">Abroad Zone</RouterLink>
        <RouterLink to="/outsourcing" className="hover:text-[#005A9C] uppercase transition-colors">Outsourcing</RouterLink>
        <a href="#services" className="hover:text-[#005A9C] uppercase transition-colors">{t.navServices}</a>
        <a href="#pricing" className="hover:text-[#005A9C] uppercase transition-colors">{t.navPricing}</a>
        <LanguageSwitch lang={lang} onToggle={() => setLang(lang === 'en' ? 'fr' : 'en')} />
        <div className="h-4 w-px bg-gray-200"></div>
        <button onClick={onOpenPortalSelector} className="flex items-center gap-2 hover:text-[#005A9C] transition-colors"><Grid size={16} /> {t.navPortal}</button>
        <button onClick={onOpenDemo} className="bg-[#005A9C] text-white px-6 py-2.5 rounded-xl shadow-md hover:shadow-xl transition-all hover:scale-105">{t.navDemo}</button>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 lg:hidden">
          <div className="flex flex-col p-4 space-y-4">
            <a href="#services" className="text-gray-700 hover:text-[#005A9C] uppercase font-semibold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t.navServices}</a>
            <a href="#pricing" className="text-gray-700 hover:text-[#005A9C] uppercase font-semibold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t.navPricing}</a>
            <LanguageSwitch lang={lang} onToggle={() => setLang(lang === 'en' ? 'fr' : 'en')} />
            <div className="border-t border-gray-200 pt-4">
              <button onClick={() => { onOpenPortalSelector(); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 text-gray-700 hover:text-[#005A9C] transition-colors w-full"><Grid size={16} /> {t.navPortal}</button>
            </div>
            <button onClick={() => { onOpenDemo(); setIsMobileMenuOpen(false); }} className="bg-[#005A9C] text-white px-6 py-3 rounded-xl shadow-md hover:shadow-xl transition-all w-full">{t.navDemo}</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
