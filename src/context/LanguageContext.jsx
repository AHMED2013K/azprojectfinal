import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'edugrowth-language';
const DEFAULT_LANGUAGE = 'en';
const SUPPORTED_LANGUAGES = ['en', 'fr'];

const LanguageContext = createContext({
  lang: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  toggleLanguage: () => {},
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);

    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      setLang(savedLanguage);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.body.dataset.language = lang;
    document.body.classList.add('eg-language-switching');

    const timeoutId = window.setTimeout(() => {
      document.body.classList.remove('eg-language-switching');
    }, 220);

    return () => window.clearTimeout(timeoutId);
  }, [lang]);

  const setLanguage = (nextLanguage) => {
    if (!SUPPORTED_LANGUAGES.includes(nextLanguage)) return;
    setLang(nextLanguage);
  };

  const toggleLanguage = () => {
    setLanguage(lang === 'en' ? 'fr' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export { DEFAULT_LANGUAGE, STORAGE_KEY, SUPPORTED_LANGUAGES };
