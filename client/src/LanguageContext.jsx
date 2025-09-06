import React, { createContext, useContext, useState, useEffect } from 'react';
import seFlag from './assets/SE.png';
import gbFlag from './assets/GB.png';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Get initial language from localStorage or browser locale
  const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && ['en', 'sv'].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Try to detect from browser locale
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('sv')) {
      return 'sv';
    }
    
    return 'en'; // Default to English
  };

  const [language, setLanguage] = useState(getInitialLanguage);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
    // Update document language attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sv' : 'en');
  };

  const setLanguageExplicit = (lang) => {
    if (['en', 'sv'].includes(lang)) {
      setLanguage(lang);
    }
  };

  // Get language display name
  const getLanguageName = (lang) => {
    return lang === 'en' ? 'English' : 'Svenska';
  };

  // Get flag URL
  const getFlagUrl = (lang) => {
    return lang === 'en' 
      ? gbFlag
      : seFlag;
  };

  const value = {
    language,
    setLanguage: setLanguageExplicit,
    toggleLanguage,
    getLanguageName,
    getFlagUrl,
    isEnglish: language === 'en',
    isSwedish: language === 'sv'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
