import { createContext, useContext, useState, useEffect } from 'react';
import { loadPreferences, savePreferences } from '../services/storage';
import { statesByCountry, countries } from '../data/jurisdictions';

const JurisdictionContext = createContext();

export function JurisdictionProvider({ children }) {
  const [jurisdiction, setJurisdiction] = useState(() => {
    const prefs = loadPreferences();
    return prefs.jurisdiction || { country: 'india', state: 'maharashtra' };
  });

  const [language, setLanguage] = useState(() => {
    const prefs = loadPreferences();
    return prefs.language || 'en';
  });

  useEffect(() => {
    const prefs = loadPreferences();
    savePreferences({ ...prefs, jurisdiction, language });
  }, [jurisdiction, language]);

  const getStates = () => statesByCountry[jurisdiction.country] || statesByCountry.india;
  const getCountryFlag = () => countries.find((c) => c.value === jurisdiction.country)?.flag || '📍';
  const getStateLabel = () => {
    const states = getStates();
    return states.find((s) => s.value === jurisdiction.state)?.label || jurisdiction.state;
  };

  return (
    <JurisdictionContext.Provider
      value={{
        jurisdiction,
        setJurisdiction,
        language,
        setLanguage,
        getStates,
        getCountryFlag,
        getStateLabel,
      }}
    >
      {children}
    </JurisdictionContext.Provider>
  );
}

export function useJurisdiction() {
  const ctx = useContext(JurisdictionContext);
  if (!ctx) throw new Error('useJurisdiction must be used within JurisdictionProvider');
  return ctx;
}
