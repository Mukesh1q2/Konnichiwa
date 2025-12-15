import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DatabaseService } from './database';
import { RateLimiter } from './rate-limit';
import { AccountLockoutService } from './account-lockout';
import { FormValidator } from './form-validation';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: Date;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  token?: string;
  error?: string;
  requiresEmailVerification?: boolean;
}

export class EnhancedAuthService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET!;
  private static readonly JWT_EXPIRY = '7d';
  private static readonly EMAIL_VERIFICATION_EXPIRY = '24h';

  static async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<AuthResult> {
    try {
      // Validate input
      const validation = FormValidator.validate(userData, FormValidator.SCHEMAS.REGISTER);
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Invalid input data',
        };
      }

      // Check rate limiting
      const rateLimitResult = await RateLimiter.checkAndRecord(
        userData.email,
        RateLimiter.CONFIGS.AUTH
      );

      if (!rateLimitResult.allowed) {
        return {
          success: false,
          error: 'Too many registration attempts. Please try again later.',
        };
      }

      // Check if user already exists
      const existingUser = await DatabaseService.getUserByEmail(userData.email);
      if (existingUser) {
        return {
          success: false,
          error: 'User with this email already exists',
        };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 12);

      // Create user
      const user = await DatabaseService.createUser({
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email.toLowerCase(),
        password_hash: hashedPassword,
        role: userData.role || 'user',
        is_email_verified: false,
        created_at: new Date(),
      });

      // Generate email verification token
      const verificationToken = jwt.sign(
        { userId: user.id, email: user.email, type: 'email_verification' },
        this.JWT_SECRET,
        { expiresIn: this.EMAIL_VERIFICATION_EXPIRY }
      );

      // TODO: Send verification email
      // await EmailService.sendVerificationEmail(user.email, verificationToken);

      return {
        success: true,
        requiresEmailVerification: true,
      };

    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: 'Registration failed. Please try again.',
      };
    }
  }

  static async login(credentials: {
    email: string;
    password: string;
  }): Promise<AuthResult> {
    try {
      // Validate input
      const validation = FormValidator.validate(credentials, FormValidator.SCHEMAS.LOGIN);
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Invalid input data',
        };
      }

      // Check account lockout status
      const lockoutStatus = await AccountLockoutService.checkAccountStatus(credentials.email);
      if (lockoutStatus.isLocked) {
        return {
          success: false,
          error: 'Account is locked due to multiple failed login attempts. Please try again later.',
        };
      }

      // Check rate limiting
      const rateLimitResult = await RateLimiter.checkAndRecord(
        credentials.email,
        RateLimiter.CONFIGS.AUTH
      );

      if (!rateLimitResult.allowed) {
        return {
          success: false,
          error: 'Too many login attempts. Please try again later.',
        };
      }

      // Get user
      const user = await DatabaseService.getUserByEmail(credentials.email.toLowerCase());
      if (!user) {
        await AccountLockoutService.recordFailedAttempt(credentials.email);
        return {
          success: false,
          error: 'Invalid email or password',
        };
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(credentials.password, user.password_hash);
      if (!isPasswordValid) {
        await AccountLockoutService.recordFailedAttempt(credentials.email);
        return {
          success: false,
          error: 'Invalid email or password',
        };
      }

      // Check if email is verified
      if (!user.is_email_verified) {
        return {
          success: false,
          error: 'Please verify your email address before logging in',
          requiresEmailVerification: true,
        };
      }

      // Record successful attempt and reset lockout
      await AccountLockoutService.recordSuccessfulAttempt(credentials.email);

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
        },
        this.JWT_SECRET,
        { expiresIn: this.JWT_EXPIRY }
      );

      const authUser: AuthUser = {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        isEmailVerified: user.is_email_verified,
        createdAt: user.created_at,
      };

      return {
        success: true,
        user: authUser,
        token,
      };

    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Login failed. Please try again.',
      };
    }
  }

  static async verifyEmail(token: string): Promise<AuthResult> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as any;
      
      if (decoded.type !== 'email_verification') {
        return {
          success: false,
          error: 'Invalid verification token',
        };
      }

      // Update user as verified
      await DatabaseService.updateUser(decoded.userId, {
        is_email_verified: true,
        email_verified_at: new Date(),
      });

      return {
        success: true,
      };

    } catch (error) {
      return {
        success: false,
        error: 'Invalid or expired verification token',
      };
    }
  }

  static async forgotPassword(email: string): Promise<AuthResult> {
    try {
      // Check if user exists
      const user = await DatabaseService.getUserByEmail(email.toLowerCase());
      if (!user) {
        // Don't reveal if email exists - return success anyway
        return {
          success: true,
        };
      }

      // Check rate limiting for password reset
      const rateLimitResult = await RateLimiter.checkAndRecord(
        email,
        RateLimiter.CONFIGS.PASSWORD_RESET
      );

      if (!rateLimitResult.allowed) {
        return {
          success: false,
          error: 'Too many password reset attempts. Please try again later.',
        };
      }

      // Generate reset token
      const resetToken = jwt.sign(
        { userId: user.id, email: user.email, type: 'password_reset' },
        this.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // TODO: Send password reset email
      // await EmailService.sendPasswordResetEmail(user.email, resetToken);

      return {
        success: true,
      };

    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        error: 'Password reset failed. Please try again.',
      };
    }
  }

  static async resetPassword(token: string, newPassword: string): Promise<AuthResult> {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as any;
      
      if (decoded.type !== 'password_reset') {
        return {
          success: false,
          error: 'Invalid reset token',
        };
      }

      // Validate password strength
      const validation = FormValidator.validate(
        { password: newPassword },
        { password: FormValidator.SCHEMAS.REGISTER.password }
      );
      
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Password does not meet security requirements',
        };
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);

      // Update user password
      await DatabaseService.updateUser(decoded.userId, {
        password_hash: hashedPassword,
      });

      return {
        success: true,
      };

    } catch (error) {
      return {
        success: false,
        error: 'Invalid or expired reset token',
      };
    }
  }

  static verifyToken(token: string): AuthUser | null {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as any;
      
      return {
        id: decoded.userId,
        email: decoded.email,
        firstName: '', // Will be populated from database if needed
        lastName: '',
        role: decoded.role,
        isEmailVerified: true,
        createdAt: new Date(),
      };
    } catch (error) {
      return null;
    }
  }

  static async getUserById(userId: string): Promise<AuthUser | null> {
    try {
      const user = await DatabaseService.getUserById(userId);
      if (!user) return null;

      return {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        isEmailVerified: user.is_email_verified,
        createdAt: user.created_at,
      };
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }
}
