import { createContext, useContext, useState, useEffect } from 'react';
import { loadPreferences, savePreferences } from '../services/storage';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const prefs = loadPreferences();
    return prefs.theme || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const prefs = loadPreferences();
    savePreferences({ ...prefs, theme });
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
