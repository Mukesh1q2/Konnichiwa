// Auth context hooks-only version (moved from lib to lib/hooks pattern)
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthUser } from './auth-service';
import { AuthService } from './auth-service';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<AuthUser>) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const { user, loading } = useAuth();
  return { user, loading };
};

export const useAuthActions = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthActions must be used within an AuthProvider');
  }
  return {
    login: context.login,
    register: context.register,
    logout: context.logout,
    updateProfile: context.updateProfile
  };
};

export const useAuthUser = () => {
  const { user } = useAuth();
  return user;
};

export const useAuthLoading = () => {
  const { loading } = useAuth();
  return loading;
};

export { AuthContext };
export type { AuthContextType };