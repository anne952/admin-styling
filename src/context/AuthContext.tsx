import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthService, MeDto } from '../services/auth';

interface AuthContextValue {
  token: string | null;
  user: MeDto | null;
  login: (input: { email?: string; nom?: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('auth_token'));
  const [user, setUser] = useState<MeDto | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('auth_token', token);
      refreshMe();
    } else {
      localStorage.removeItem('auth_token');
      setUser(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login: AuthContextValue['login'] = useCallback(async (input) => {
    const res = await AuthService.login(input);
    setToken(res.token);
  }, []);

  const logout = useCallback(async () => {
    try { await AuthService.logout(); } catch {}
    setToken(null);
  }, []);

  const refreshMe = useCallback(async () => {
    try {
      const me = await AuthService.me();
      setUser(me);
      localStorage.setItem('userId', me.id.toString());
    } catch {
      setUser(null);
      localStorage.removeItem('userId');
    }
  }, []);

  const value = useMemo(() => ({ token, user, login, logout, refreshMe }), [token, user, login, logout, refreshMe]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
