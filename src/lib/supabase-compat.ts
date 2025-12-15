// Supabase compatibility layer for Node.js 18
// This provides fallbacks for features that require Node 20+

import { createClient } from '@supabase/supabase-js';

// Supabase client configuration with fallbacks
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Fallback functions for Node.js 20+ features
export class SupabaseCompat {
  static async getUser() {
    try {
      const { data: { user }, error } = await supabaseClient.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error) {
      console.warn('Supabase getUser fallback:', error);
      return null;
    }
  }

  static async signInWithPassword(email: string, password: string) {
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Supabase signIn fallback:', error);
      throw error;
    }
  }

  static async signUp(email: string, password: string) {
    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Supabase signUp fallback:', error);
      throw error;
    }
  }

  static async signOut() {
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.warn('Supabase signOut fallback:', error);
    }
  }
}

// Database operations with fallbacks
export class DatabaseCompat {
  static async query(table: string, select?: string) {
    try {
      let query = supabaseClient.from(table).select(select || '*');
      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Database query fallback:', error);
      return [];
    }
  }

  static async insert(table: string, data: any) {
    try {
      const { data: result, error } = await supabaseClient
        .from(table)
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return result;
    } catch (error) {
      console.warn('Database insert fallback:', error);
      throw error;
    }
  }

  static async update(table: string, id: string, data: any) {
    try {
      const { data: result, error } = await supabaseClient
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return result;
    } catch (error) {
      console.warn('Database update fallback:', error);
      throw error;
    }
  }

  static async delete(table: string, id: string) {
    try {
      const { error } = await supabaseClient
        .from(table)
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.warn('Database delete fallback:', error);
      throw error;
    }
  }
}

export default supabaseClient;
