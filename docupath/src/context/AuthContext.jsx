import { createContext, useContext, useState, useCallback } from 'react';
import { saveAuth, loadAuth, clearAuth } from '../services/storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadAuth());

  const login = useCallback((userData) => {
    setUser(userData);
    saveAuth(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    clearAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
