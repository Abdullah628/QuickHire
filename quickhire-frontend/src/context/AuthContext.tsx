'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { User } from '@/types';
import { authService } from '@/lib/services';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAdmin = user?.role === 'admin';

  // Initialize auth state from cookies
  useEffect(() => {
    const savedToken = Cookies.get('token');
    const savedUser = Cookies.get('user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        Cookies.remove('token');
        Cookies.remove('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authService.login(email, password);
    const { user: userData, token: newToken } = response.data;
    setUser(userData);
    setToken(newToken);
    Cookies.set('token', newToken, { expires: 7 });
    Cookies.set('user', JSON.stringify(userData), { expires: 7 });
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const response = await authService.register(name, email, password);
    const { user: userData, token: newToken } = response.data;
    setUser(userData);
    setToken(newToken);
    Cookies.set('token', newToken, { expires: 7 });
    Cookies.set('user', JSON.stringify(userData), { expires: 7 });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    Cookies.remove('token');
    Cookies.remove('user');
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, isAdmin, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
