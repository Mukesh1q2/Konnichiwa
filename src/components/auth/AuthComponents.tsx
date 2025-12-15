// Auth context components and provider
import React, { useState, useEffect } from 'react';
import { AuthUser } from '@/lib/auth-service';
import { AuthService } from '@/lib/auth-service';
import { AuthContext, useAuth } from '@/lib/auth-hooks';

// Auth Provider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { success, user: currentUser } = await AuthService.getCurrentSession();
      if (success && currentUser) {
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await AuthService.login({ email, password });
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (userData: any) => {
    try {
      const result = await AuthService.register(userData);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateProfile = async (updates: Partial<AuthUser>) => {
    try {
      if (!user) return { success: false, error: 'No user logged in' };

      const result = await AuthService.updateProfile(updates);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } catch (error) {
      console.error('Profile update failed:', error);
      return { success: false, error: 'Profile update failed' };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Convenience components and hooks
export const useRequireAuth = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login or show login modal
      window.location.href = '/auth';
    }
  }, [user, loading]);

  return { user, loading };
};

export const useOptionalAuth = () => {
  const { user, loading } = useAuth();
  return { user, loading, isLoggedIn: !!user };
};

// Auth guard component
export const AuthGuard = ({
  children,
  fallback = null
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return fallback;
  }

  return <>{children}</>;
};