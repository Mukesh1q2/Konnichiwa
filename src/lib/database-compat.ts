// Database service with Node.js 18 compatibility
import { DatabaseCompat } from './supabase-compat';

export class DatabaseService {
  // Generic database operations with fallbacks
  static async getUserByEmail(email: string) {
    try {
      const users = await DatabaseCompat.query('users', '*');
      return users.find((user: any) => user.email === email) || null;
    } catch (error) {
      console.error('getUserByEmail error:', error);
      return null;
    }
  }

  static async getUserById(id: string) {
    try {
      const users = await DatabaseCompat.query('users', '*');
      return users.find((user: any) => user.id === id) || null;
    } catch (error) {
      console.error('getUserById error:', error);
      return null;
    }
  }

  static async createUser(userData: any) {
    try {
      return await DatabaseCompat.insert('users', userData);
    } catch (error) {
      console.error('createUser error:', error);
      throw error;
    }
  }

  static async updateUser(id: string, data: any) {
    try {
      return await DatabaseCompat.update('users', id, data);
    } catch (error) {
      console.error('updateUser error:', error);
      throw error;
    }
  }

  // Event operations
  static async getEvents(): Promise<any[]> {
    try {
      return await DatabaseCompat.query('events');
    } catch (error) {
      console.error('getEvents error:', error);
      return [];
    }
  }

  static async getEventById(id: string): Promise<any> {
    try {
      const events = await DatabaseCompat.query('events');
      return events.find((event: any) => event.id === id) || null;
    } catch (error) {
      console.error('getEventById error:', error);
      return null;
    }
  }

  static async updateEvent(id: string, data: any) {
    try {
      return await DatabaseCompat.update('events', id, data);
    } catch (error) {
      console.error('updateEvent error:', error);
      throw error;
    }
  }

  // Ticket operations
  static async createTicket(ticketData: any) {
    try {
      return await DatabaseCompat.insert('tickets', ticketData);
    } catch (error) {
      console.error('createTicket error:', error);
      throw error;
    }
  }

  static async getTickets(filters: any = {}): Promise<any[]> {
    try {
      let tickets = await DatabaseCompat.query('tickets');

      // Apply filters
      if (filters.status) {
        tickets = tickets.filter((ticket: any) => ticket.status === filters.status);
      }
      if (filters.user_id) {
        tickets = tickets.filter((ticket: any) => ticket.user_id === filters.user_id);
      }

      return tickets;
    } catch (error) {
      console.error('getTickets error:', error);
      return [];
    }
  }

  static async updateTicket(id: string, data: any) {
    try {
      return await DatabaseCompat.update('tickets', id, data);
    } catch (error) {
      console.error('updateTicket error:', error);
      throw error;
    }
  }

  // Security operations
  static async createUserLockout(data: any) {
    try {
      return await DatabaseCompat.insert('user_lockouts', data);
    } catch (error) {
      console.error('createUserLockout error:', error);
      throw error;
    }
  }

  static async getUserLockout(userId: string) {
    try {
      const lockouts = await DatabaseCompat.query('user_lockouts');
      return lockouts.find((lockout: any) => lockout.user_id === userId) || null;
    } catch (error) {
      console.error('getUserLockout error:', error);
      return null;
    }
  }

  static async updateUserLockout(userId: string, data: any) {
    try {
      return await DatabaseCompat.update('user_lockouts', userId, data);
    } catch (error) {
      console.error('updateUserLockout error:', error);
      throw error;
    }
  }

  static async resetUserLockout(userId: string) {
    try {
      const lockout = await this.getUserLockout(userId);
      if (lockout) {
        await this.updateUserLockout(userId, {
          failed_attempts: 0,
          lockout_expires_at: null,
          last_attempt: new Date()
        });
      }
    } catch (error) {
      console.error('resetUserLockout error:', error);
    }
  }

  static async resetUserAttempts(userId: string) {
    try {
      const lockout = await this.getUserLockout(userId);
      if (lockout) {
        await this.updateUserLockout(userId, {
          failed_attempts: 0,
          last_attempt: new Date()
        });
      }
    } catch (error) {
      console.error('resetUserAttempts error:', error);
    }
  }

  // Rate limiting operations
  static async createRateLimitLog(data: any) {
    try {
      return await DatabaseCompat.insert('rate_limit_logs', data);
    } catch (error) {
      console.error('createRateLimitLog error:', error);
    }
  }

  static async getLockedAccounts() {
    try {
      const lockouts = await DatabaseCompat.query('user_lockouts');
      const now = new Date();
      return lockouts.filter((lockout: any) =>
        lockout.lockout_expires_at && new Date(lockout.lockout_expires_at) > now
      );
    } catch (error) {
      console.error('getLockedAccounts error:', error);
      return [];
    }
  }
}
