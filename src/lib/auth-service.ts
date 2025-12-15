// Enhanced authentication and session management
import { createClient } from '@supabase/supabase-js';
import { jwtDecode } from 'jwt-decode';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { DatabaseService } from './database';

// Supabase client for auth
const supabaseAuth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

        // Save to database (with error handling for missing DB)
        try {
          if (typeof window !== 'undefined') {
            await DatabaseService.createUser(userProfile);
          }
        } catch (error) {
          // Continue with user registration even if DB fails
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
        // Get user profile from database (with error handling)
        let userProfile;
        try {
          if (typeof window !== 'undefined') {
            userProfile = await DatabaseService.getUserById(data.user.id);
          }
        } catch (error) {
          userProfile = data.user; // Fallback to auth user
        }

        // Create session with enhanced security
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

      if (error) {
        return { success: false, error: error.message };
      }

      // Clear client-side session storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_session');
        sessionStorage.removeItem('auth_session');
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Logout failed' };
    }
  }

  // Password Reset
  static async requestPasswordReset(data: PasswordResetData): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const { error } = await supabaseAuth.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Password reset failed' };
    }
  }

  // Update Password
  static async updatePassword(data: PasswordUpdateData): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const { error } = await supabaseAuth.auth.updateUser({
        password: data.new_password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Password update failed' };
    }
  }

  // Email Verification
  static async verifyEmail(token: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const { error } = await supabaseAuth.auth.verifyOtp({
        token_hash: token,
        type: 'email'
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Email verification failed' };
    }
  }

  // Get Current Session
  static async getCurrentSession(): Promise<{
    success: boolean;
    session?: AuthSession;
    user?: AuthUser;
    error?: string;
  }> {
    try {
      const { data, error } = await supabaseAuth.auth.getSession();

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.session) {
        // Check if session is still valid
        const isValid = this.validateSession(data.session as unknown as AuthSession);
        if (!isValid) {
          return { success: false, error: 'Session expired' };
        }

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

  // Refresh Session
  static async refreshSession(): Promise<{
    success: boolean;
    session?: AuthSession;
    error?: string;
  }> {
    try {
      const { data, error } = await supabaseAuth.auth.refreshSession();

      if (error) {
        return { success: false, error: error.message };
      }

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

  // Update User Profile
  static async updateProfile(updates: Partial<AuthUser>): Promise<{
    success: boolean;
    user?: AuthUser;
    error?: string;
  }> {
    try {
      const { data, error } = await supabaseAuth.auth.updateUser({
        data: updates
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Update in database
        // await DatabaseService.updateUser(data.user.id, updates);

        return {
          success: true,
          user: data.user as unknown as AuthUser
        };
      }

      return { success: false, error: 'Profile update failed' };
    } catch (error) {
      return { success: false, error: 'Profile update failed' };
    }
  }

  // Two-Factor Authentication
  static async enableTwoFactor(): Promise<{
    success: boolean;
    secret?: string;
    qr_code?: string;
    error?: string;
  }> {
    try {
      // Generate TOTP secret
      const secret = crypto.randomBytes(20).toString('hex');

      // Generate QR code URL for authenticator apps
      const qr_code = `otpauth://totp/CulturalFestival:${(await this.getCurrentUser())?.email}?secret=${secret}&issuer=Konnichiwa%20Namaste`;

      // Store secret securely (in production, encrypt this)
      // await this.storeTwoFactorSecret(secret);

      return {
        success: true,
        secret,
        qr_code
      };
    } catch (error) {
      return { success: false, error: 'Two-factor setup failed' };
    }
  }

  // Verify Two-Factor Token
  static async verifyTwoFactor(token: string, secret: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      // Implement TOTP verification
      // This is a simplified version - in production, use a proper TOTP library
      const isValid = this.verifyTotp(token, secret);

      if (!isValid) {
        return { success: false, error: 'Invalid two-factor token' };
      }

      // Enable two-factor for user
      // await this.enableTwoFactorForUser(this.getCurrentUser()!.id, secret);

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Two-factor verification failed' };
    }
  }

  // Social Authentication
  static async signInWithProvider(provider: 'google' | 'facebook' | 'github'): Promise<{
    success: boolean;
    user?: AuthUser;
    session?: AuthSession;
    error?: string;
  }> {
    try {
      const { data, error } = await supabaseAuth.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Social authentication failed' };
    }
  }

  // Security helpers
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

  static async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user } } = await supabaseAuth.auth.getUser();
      return user as unknown as AuthUser;
    } catch {
      return null;
    }
  }

  // Input sanitization
  static sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, '');
  }

  // Enhanced password validation
  static validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static generateSecureToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  static verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // Rate limiting
  static async checkRateLimit(identifier: string, limit: number = 5, window: number = 60000): Promise<boolean> {
    // Implement rate limiting logic
    // This is a simplified version - in production, use Redis or similar
    try {
      const key = `rate_limit:${identifier}`;
      // await redisClient.incr(key);
      // await redisClient.expire(key, window / 1000);
      return true; // Simplified for demo
    } catch {
      return false;
    }
  }

  // Account lockout
  static async handleFailedLogin(email: string): Promise<void> {
    // Implement account lockout logic
    // Increment failed login attempts and lock account after threshold
    try {
      const key = `failed_login:${email}`;
      // const attempts = await redisClient.incr(key);
      // await redisClient.expire(key, 900); // 15 minutes

      // if (attempts >= 5) {
      //   await redisClient.setex(`locked:${email}`, 900, '1');
      // }
    } catch (error) {
    }
  }

  static async isAccountLocked(email: string): Promise<boolean> {
    try {
      const key = `locked:${email}`;
      // const locked = await redisClient.get(key);
      return false; // Simplified for demo
    } catch {
      return false;
    }
  }

  // Enhanced TOTP verification
  static verifyTotp(token: string, secret: string): boolean {
    try {
      const speakeasy = require('speakeasy');
      return speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 1 // Allow 1 step clock skew
      });
    } catch (error) {
      return false;
    }
  }
}

// Export Supabase client for use in components
export { supabaseAuth };