"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import en from "@/locales/en.json";
import hi from "@/locales/hi.json";
import te from "@/locales/te.json";

type Language = "en" | "hi" | "te";

type Translations = { [key: string]: string };

interface LanguageContextType {
  language: Language;
  translations: Translations;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translationsMap: { [key in Language]: Translations } = {
  en,
  hi,
  te,
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [translations, setTranslations] = useState<Translations>(translationsMap.en);

  useEffect(() => {
    // You could persist the language preference in localStorage here
    setTranslations(translationsMap[language]);
  }, [language]);

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
