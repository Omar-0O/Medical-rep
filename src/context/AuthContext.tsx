// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../api/mockApi.js';

interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'medical_rep';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('🚀 AuthProvider initializing...');
    api.initializeData();
    
    const sessionUser = api.getSession();
    console.log('👤 Session user:', sessionUser);
    
    if (sessionUser) {
      console.log('✅ Restoring user session');
      setUser(sessionUser);
    } else {
      console.log('ℹ️ No existing session found');
    }
    
    setIsLoading(false);
    console.log('✅ AuthProvider initialization complete');
  }, []);

  const login = async (email: string, password: string) => {
    console.log('🔐 AuthContext login called');
    const result = await api.apiLogin(email, password);
    console.log('🔐 Login result:', result);
    
    if (result.success && result.user) {
      console.log('✅ Setting user in AuthContext:', result.user);
      setUser(result.user);
      api.saveSession(result.user);
    } else {
      console.log('❌ Login failed in AuthContext:', result.message);
    }
    return result;
  };

  const logout = () => {
    api.apiLogout();
    setUser(null);
    window.location.href = '/login'; // Force redirect to login on logout
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};