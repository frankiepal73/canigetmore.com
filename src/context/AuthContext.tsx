import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User, AuthContextType } from '../types';
import * as authService from '../services/auth';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    return token && savedUser ? JSON.parse(savedUser) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { user, token } = await authService.login(email, password);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const useToken = useCallback(async () => {
    if (!user) return false;
    
    try {
      const updatedUser = await authService.useToken(user.id);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Failed to use token:', error);
      return false;
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      useToken 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}