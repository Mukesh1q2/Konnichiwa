import { DatabaseService } from './database';

export interface AccountLockoutConfig {
  maxAttempts: number; // Maximum failed attempts before lockout
  lockoutDuration: number; // Lockout duration in milliseconds
  increasingLockout: boolean; // Whether to increase lockout duration with repeated attempts
  resetAttemptsAfter: number; // Reset failed attempts after this time (milliseconds)
}

export interface LockoutInfo {
  isLocked: boolean;
  attemptsLeft: number;
  lockoutExpiresAt?: Date;
  nextResetTime?: Date;
}

export class AccountLockoutService {
  private static readonly DEFAULT_CONFIG: AccountLockoutConfig = {
    maxAttempts: 5,
    lockoutDuration: 30 * 60 * 1000, // 30 minutes
    increasingLockout: true,
    resetAttemptsAfter: 60 * 60 * 1000, // 1 hour
  };

  static async checkAccountStatus(
    userId: string,
    config: Partial<AccountLockoutConfig> = {}
  ): Promise<LockoutInfo> {
    const finalConfig = { ...this.DEFAULT_CONFIG, ...config };
    const now = new Date();

    try {
      // Get current lockout status from database
      const lockoutRecord = await DatabaseService.getUserLockout(userId);
      
      if (!lockoutRecord) {
        return {
          isLocked: false,
          attemptsLeft: finalConfig.maxAttempts
        };
      }

      // Check if lockout has expired
      if (lockoutRecord.lockout_expires_at && new Date(lockoutRecord.lockout_expires_at) <= now) {
        // Lockout has expired, reset attempts
        await DatabaseService.resetUserLockout(userId);
        return {
          isLocked: false,
          attemptsLeft: finalConfig.maxAttempts
        };
      }

      // Check if attempts should be reset
      if (lockoutRecord.last_attempt && 
          new Date(lockoutRecord.last_attempt) < new Date(now.getTime() - finalConfig.resetAttemptsAfter)) {
        await DatabaseService.resetUserAttempts(userId);
        return {
          isLocked: false,
          attemptsLeft: finalConfig.maxAttempts
        };
      }

      const attemptsLeft = Math.max(0, finalConfig.maxAttempts - (lockoutRecord.failed_attempts || 0));
      const lockoutExpiresAt = lockoutRecord.lockout_expires_at ? new Date(lockoutRecord.lockout_expires_at) : undefined;

      return {
        isLocked: !!lockoutRecord.lockout_expires_at && new Date(lockoutRecord.lockout_expires_at) > now,
        attemptsLeft,
        lockoutExpiresAt,
        nextResetTime: new Date((lockoutRecord.last_attempt || new Date()).getTime() + finalConfig.resetAttemptsAfter)
      };

    } catch (error) {
      console.error('Failed to check account lockout status:', error);
      // Return safe default - allow access if check fails
      return {
        isLocked: false,
        attemptsLeft: finalConfig.maxAttempts
      };
    }
  }

  static async recordFailedAttempt(
    userId: string,
    config: Partial<AccountLockoutConfig> = {}
  ): Promise<LockoutInfo> {
    const finalConfig = { ...this.DEFAULT_CONFIG, ...config };
    const now = new Date();

    try {
      const currentStatus = await this.checkAccountStatus(userId, config);
      
      if (currentStatus.isLocked) {
        return currentStatus; // Don't process if already locked
      }

      // Get or create lockout record
      let lockoutRecord = await DatabaseService.getUserLockout(userId);
      
      if (!lockoutRecord) {
        lockoutRecord = await DatabaseService.createUserLockout({
          user_id: userId,
          failed_attempts: 1,
          last_attempt: now,
          lockout_expires_at: null
        });
      } else {
        // Update existing record
        const newFailedAttempts = (lockoutRecord.failed_attempts || 0) + 1;
        let lockoutExpiresAt = null;

        // Check if we should lock the account
        if (newFailedAttempts >= finalConfig.maxAttempts) {
          const lockoutDuration = finalConfig.increasingLockout 
            ? finalConfig.lockoutDuration * Math.pow(2, Math.floor(newFailedAttempts / finalConfig.maxAttempts))
            : finalConfig.lockoutDuration;
          
          lockoutExpiresAt = new Date(now.getTime() + lockoutDuration);
        }

        await DatabaseService.updateUserLockout(userId, {
          failed_attempts: newFailedAttempts,
          last_attempt: now,
          lockout_expires_at: lockoutExpiresAt
        });

        lockoutRecord.failed_attempts = newFailedAttempts;
        lockoutRecord.lockout_expires_at = lockoutExpiresAt;
      }

      const attemptsLeft = Math.max(0, finalConfig.maxAttempts - (lockoutRecord.failed_attempts || 0));

      return {
        isLocked: !!lockoutRecord.lockout_expires_at && new Date(lockoutRecord.lockout_expires_at) > now,
        attemptsLeft,
        lockoutExpiresAt: lockoutRecord.lockout_expires_at ? new Date(lockoutRecord.lockout_expires_at) : undefined
      };

    } catch (error) {
      console.error('Failed to record failed attempt:', error);
      return {
        isLocked: false,
        attemptsLeft: finalConfig.maxAttempts
      };
    }
  }

  static async recordSuccessfulAttempt(
    userId: string,
    config: Partial<AccountLockoutConfig> = {}
  ): Promise<void> {
    try {
      // Reset failed attempts on successful login
      await DatabaseService.resetUserAttempts(userId);
    } catch (error) {
      console.error('Failed to record successful attempt:', error);
    }
  }

  static async unlockAccount(
    userId: string,
    adminUserId?: string
  ): Promise<boolean> {
    try {
      await DatabaseService.resetUserLockout(userId);
      
      // Log the unlock action if admin user ID provided
      if (adminUserId) {
        await DatabaseService.createSecurityLog({
          user_id: userId,
          admin_user_id: adminUserId,
          action: 'account_unlocked',
          details: 'Account manually unlocked by administrator',
          ip_address: '',
          user_agent: ''
        });
      }
      
      return true;
    } catch (error) {
      console.error('Failed to unlock account:', error);
      return false;
    }
  }

  static async getLockoutStats(): Promise<{
    totalLocked: number;
    recentLockouts: Array<{
      userId: string;
      attempts: number;
      lockedAt: Date;
      expiresAt: Date;
    }>;
  }> {
    try {
      const lockedAccounts = await DatabaseService.getLockedAccounts();
      const recentLockouts = lockedAccounts
        .filter(account => account.lockout_expires_at && new Date(account.lockout_expires_at) > new Date())
        .map(account => ({
          userId: account.user_id,
          attempts: account.failed_attempts || 0,
          lockedAt: account.last_attempt ? new Date(account.last_attempt) : new Date(),
          expiresAt: new Date(account.lockout_expires_at)
        }))
        .sort((a, b) => b.lockedAt.getTime() - a.lockedAt.getTime())
        .slice(0, 10); // Last 10 lockouts

      return {
        totalLocked: lockedAccounts.length,
        recentLockouts
      };
    } catch (error) {
      console.error('Failed to get lockout stats:', error);
      return {
        totalLocked: 0,
        recentLockouts: []
      };
    }
  }

  // Middleware for Express/Next.js API routes
  static createLockoutMiddleware(config: Partial<AccountLockoutConfig> = {}) {
    return async (req: any, res: any, next: any) => {
      try {
        const userId = req.body?.email || req.query?.userId || req.params?.userId;
        
        if (!userId) {
          return next(); // Skip if no user ID
        }

        const status = await this.checkAccountStatus(userId, config);
        
        if (status.isLocked) {
          const retryAfter = status.lockoutExpiresAt 
            ? Math.ceil((status.lockoutExpiresAt.getTime() - Date.now()) / 1000)
            : 3600; // Default 1 hour if no expiry

          res.status(423).json({
            error: 'Account locked',
            message: 'Too many failed login attempts. Please try again later.',
            retryAfter,
            lockoutExpiresAt: status.lockoutExpiresAt
          });
          return;
        }

        // Add status to request for later use
        req.lockoutStatus = status;
        next();
      } catch (error) {
        console.error('Account lockout middleware error:', error);
        next(); // Allow request to proceed if check fails
      }
    };
  }
}