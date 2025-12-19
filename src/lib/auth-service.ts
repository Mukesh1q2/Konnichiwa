// Enhanced authentication and session management
import { createClient } from '@supabase/supabase-js';
import { jwtDecode } from 'jwt-decode';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { DatabaseService } from './database';

// Supabase client for auth
const supabaseAuth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);

// Types
export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  brand_preference?: 'konnichiwa' | 'namaste' | 'both';
  interests?: string[];
  role: 'user' | 'admin' | 'organizer';
  avatar_url?: string;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  brand_preference?: 'konnichiwa' | 'namaste' | 'both';
  interests?: string[];
}

export interface PasswordResetData {
  email: string;
}

export interface PasswordUpdateData {
  current_password: string;
  new_password: string;
}

export class AuthService {
  // User Registration
  static async register(userData: RegisterData): Promise<{
    success: boolean;
    user?: AuthUser;
    session?: AuthSession;
    error?: string;
  }> {
    try {
      // Validate input
      if (!userData.email || !userData.password || !userData.full_name) {
        return { success: false, error: 'Missing required fields' };
      }

      if (userData.password.length < 8) {
        return { success: false, error: 'Password must be at least 8 characters' };
      }

      // Check if user already exists
      const { data: existingUser } = await supabaseAuth.auth.admin.listUsers();
      if (existingUser?.users?.find(u => u.email === userData.email)) {
        return { success: false, error: 'User with this email already exists' };
      }

      // Create user with Supabase Auth
      const { data: authData, error: authError } = await supabaseAuth.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.full_name,
            phone: userData.phone,
            brand_preference: userData.brand_preference,
            interests: userData.interests,
            role: 'user'
          }
        }
      });

      if (authError) {
        return { success: false, error: authError.message };
      }

      if (authData.user) {
        // Create user profile in database
        const userProfile = {
          id: authData.user.id,
          email: userData.email,
          full_name: userData.full_name,
          phone: userData.phone,
          brand_preference: userData.brand_preference,
          interests: userData.interests,
          role: 'user' as const,
          email_verified: authData.user.email_confirmed_at ? true : false
        };

        // Save to database
        try {
          if (typeof window !== 'undefined') {
            await DatabaseService.createUser(userProfile);
          }
        } catch (error) {
          // Continue
        }

        return {
          success: true,
          user: userProfile as AuthUser,
          session: authData.session as unknown as AuthSession
        };
      }

      return { success: false, error: 'Failed to create user' };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  }

  // User Login
  static async login(credentials: LoginCredentials): Promise<{
    success: boolean;
    user?: AuthUser;
    session?: AuthSession;
    error?: string;
  }> {
    try {
      const { data, error } = await supabaseAuth.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user && data.session) {
        // Get user profile from database
        let userProfile;
        try {
          if (typeof window !== 'undefined') {
            userProfile = await DatabaseService.getUserById(data.user.id);
          }
        } catch (error) {
          userProfile = data.user;
        }

        const session = this.createSecureSession(data.session);

        return {
          success: true,
          user: data.user as unknown as AuthUser,
          session
        };
      }

      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  }

  // User Logout
  static async logout(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabaseAuth.auth.signOut();
      if (error) return { success: false, error: error.message };

      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_session');
        sessionStorage.removeItem('auth_session');
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Logout failed' };
    }
  }

  // Current User/Session Helpers
  static async getCurrentSession(): Promise<{
    success: boolean;
    session?: AuthSession;
    user?: AuthUser;
    error?: string;
  }> {
    try {
      const { data, error } = await supabaseAuth.auth.getSession();
      if (error) return { success: false, error: error.message };

      if (data.session) {
        const isValid = this.validateSession(data.session as unknown as AuthSession);
        if (!isValid) return { success: false, error: 'Session expired' };

        return {
          success: true,
          session: this.createSecureSession(data.session),
          user: data.session.user as unknown as AuthUser
        };
      }
      return { success: false, error: 'No active session' };
    } catch (error) {
      return { success: false, error: 'Failed to get session' };
    }
  }

  static async refreshSession(): Promise<{
    success: boolean;
    session?: AuthSession;
    error?: string;
  }> {
    try {
      const { data, error } = await supabaseAuth.auth.refreshSession();
      if (error) return { success: false, error: error.message };
      if (data.session) {
        return {
          success: true,
          session: this.createSecureSession(data.session)
        };
      }
      return { success: false, error: 'Session refresh failed' };
    } catch (error) {
      return { success: false, error: 'Session refresh failed' };
    }
  }

  static async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user } } = await supabaseAuth.auth.getUser();
      return user as unknown as AuthUser;
    } catch {
      return null;
    }
  }

  // Security Helpers
  static createSecureSession(session: any): AuthSession {
    return {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_at: session.expires_at || 0,
      user: session.user as unknown as AuthUser
    };
  }

  static validateSession(session: AuthSession): boolean {
    try {
      const decoded = jwtDecode(session.access_token);
      const now = Math.floor(Date.now() / 1000);
      return !!(decoded.exp && decoded.exp > now);
    } catch {
      return false;
    }
  }

  // Password Helpers
  static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  static verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // Sanitization
  static sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }

  // Update User Profile
  static async updateProfile(updates: Partial<AuthUser>): Promise<{
    success: boolean;
    user?: AuthUser;
    error?: string;
  }> {
    try {
      const { data: { user }, error } = await supabaseAuth.auth.updateUser({
        data: {
          full_name: updates.full_name,
          phone: updates.phone,
          brand_preference: updates.brand_preference,
          interests: updates.interests,
          avatar_url: updates.avatar_url
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (user) {
        // Also update the database profile if available
        try {
          if (typeof window !== 'undefined' && user.id) {
            await DatabaseService.updateUser(user.id, updates);
          }
        } catch (dbError) {
          // Continue even if database update fails
        }

        return {
          success: true,
          user: {
            ...user,
            ...updates
          } as unknown as AuthUser
        };
      }

      return { success: false, error: 'Failed to update profile' };
    } catch (error) {
      return { success: false, error: 'Profile update failed' };
    }
  }
}

export { supabaseAuth };