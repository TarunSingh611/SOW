import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { locales } from '../locale';
import seFlag from '../assets/SE.png';
import gbFlag from '../assets/GB.png';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Create translation function that updates when language changes
  const t = useMemo(() => {
    return (key) => {
      const keys = key.split('.');
      let value = locales[language];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.warn(`Translation key not found: ${key} for language: ${language}`);
          return key; // Return the key if translation not found
        }
      }
      
      return value || key;
    };
  }, [language]); // Recreate function when language changes

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'sv' : 'en');
  };

  const getLanguageName = (lang) => {
    return lang === 'sv' ? 'Svenska' : 'English';
  };

  const getFlagUrl = (lang) => {
    return lang === 'sv' 
      ? seFlag
      : gbFlag;
  };

  // Detect browser language on mount
  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'sv' || browserLang === 'en') {
      setLanguage(browserLang);
    }
  }, []);

  // Update document language attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Store language preference in localStorage
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'sv')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    getLanguageName,
    getFlagUrl,
    t // Translation function
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
