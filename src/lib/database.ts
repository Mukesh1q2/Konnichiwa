// Enhanced database connection and configuration
import { createClient } from '@supabase/supabase-js';

// This would be your actual Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Database types for type safety
export interface Event {
  id: string;
  title: string;
  description: string;
  short_description: string;
  brand: 'konnichiwa' | 'namaste';
  date: string;
  time: string;
  location: string;
  venue: string;
  category: string;
  image: string;
  gallery?: string[];
  capacity: number;
  available_tickets: number;
  price_general: number;
  price_vip: number;
  price_student: number;
  featured: boolean;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  organizer: {
    name: string;
    bio: string;
    image: string;
    email: string;
    phone: string;
  };
  highlights: string[];
  requirements: string;
  included: string[];
  tags: string[];
  schedule?: EventSchedule[];
  reviews?: EventReview[];
  created_at: string;
  updated_at: string;
}

export interface EventSchedule {
  time: string;
  activity: string;
  description: string;
}

export interface EventReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  brand_preference?: 'konnichiwa' | 'namaste' | 'both';
  interests?: string[];
  role: 'user' | 'admin' | 'organizer';
  avatar_url?: string;
  email_verified?: boolean;
  is_email_verified?: boolean;
  email_verified_at?: string | Date;
  password_hash?: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: string;
  event_id: string;
  user_id: string;
  type: 'general' | 'vip' | 'student';
  quantity: number;
  price: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
  payment_id?: string;
  attendee_info: AttendeeInfo[];
  purchase_date: string;
  created_at: string;
  updated_at: string;
}

export interface AttendeeInfo {
  name: string;
  email: string;
  phone: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  brand: 'konnichiwa' | 'namaste' | 'both';
  interests?: string[];
  status: 'active' | 'unsubscribed';
  subscribed_at: string;
  last_email_sent?: string;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  event_type?: string;
  status: 'new' | 'in-progress' | 'responded' | 'closed';
  submitted_at: string;
  responded_at?: string;
  response?: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  brand: 'konnichiwa' | 'namaste';
  category: string;
  event_id?: string;
  photographer?: string;
  featured: boolean;
  tags?: string[];
  date: string;
  created_at: string;
  updated_at: string;
}

export interface MagazineArticle {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author: {
    name: string;
    bio: string;
    image?: string;
    email?: string;
  };
  brand: 'konnichiwa' | 'namaste' | 'both';
  category: string;
  tags?: string[];
  image_url?: string;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  views: number;
  likes: number;
  shares: number;
  read_time?: number;
  created_at: string;
  updated_at: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo_url?: string;
  tier: 'platinum' | 'gold' | 'silver' | 'community';
  brand: 'konnichiwa' | 'namaste' | 'both';
  description: string;
  website?: string;
  contact_info?: {
    email: string;
    phone: string;
    address: string;
  };
  active: boolean;
  created_at: string;
  updated_at: string;
}

// Database service functions
export class DatabaseService {
  // Events
  static async getEvents(filters?: {
    brand?: string;
    category?: string;
    featured?: boolean;
    status?: string;
    limit?: number;
  }) {
    let query = supabase.from('events').select('*');

    if (filters?.brand) {
      query = query.eq('brand', filters.brand);
    }
    if (filters?.category) {
      query = query.ilike('category', `%${filters.category}%`);
    }
    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query.order('date', { ascending: true });

    if (error) throw error;
    return data;
  }

  static async getEventById(id: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createEvent(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('events')
      .insert([{
        ...event,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateEvent(id: string, updates: Partial<Event>) {
    const { data, error } = await supabase
      .from('events')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteEvent(id: string) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Users
  static async getUserById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async getUserByEmail(email: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateUser(id: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async createUser(user: any) {
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Tickets
  static async getTickets(filters?: {
    userId?: string;
    eventId?: string;
    status?: string;
  }) {
    let query = supabase.from('tickets').select(`
      *,
      events(title, date, location)
    `);

    if (filters?.userId) {
      query = query.eq('user_id', filters.userId);
    }
    if (filters?.eventId) {
      query = query.eq('event_id', filters.eventId);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query.order('purchase_date', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async createTicket(ticket: Omit<Ticket, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('tickets')
      .insert([{
        ...ticket,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateTicket(id: string, updates: Partial<Ticket>) {
    const { data, error } = await supabase
      .from('tickets')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Newsletter
  static async subscribeToNewsletter(subscriber: Omit<NewsletterSubscriber, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{
        ...subscriber,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getNewsletterSubscribers(filters?: {
    brand?: string;
    status?: string;
  }) {
    let query = supabase.from('newsletter_subscribers').select('*');

    if (filters?.brand) {
      query = query.eq('brand', filters.brand);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query.order('subscribed_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Gallery
  static async getGalleryImages(filters?: {
    brand?: string;
    category?: string;
    featured?: boolean;
    eventId?: string;
  }) {
    let query = supabase.from('gallery_images').select('*');

    if (filters?.brand) {
      query = query.eq('brand', filters.brand);
    }
    if (filters?.category) {
      query = query.ilike('category', `%${filters.category}%`);
    }
    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured);
    }
    if (filters?.eventId) {
      query = query.eq('event_id', filters.eventId);
    }

    const { data, error } = await query.order('date', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Magazine
  static async getMagazineArticles(filters?: {
    brand?: string;
    category?: string;
    featured?: boolean;
    status?: string;
    limit?: number;
  }) {
    let query = supabase.from('magazine_articles').select('*');

    if (filters?.brand) {
      query = query.in('brand', [filters.brand, 'both']);
    }
    if (filters?.category) {
      query = query.ilike('category', `%${filters.category}%`);
    }
    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query.order('published_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getMagazineArticleBySlug(slug: string) {
    const { data, error } = await supabase
      .from('magazine_articles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;

    // Increment view count
    await supabase
      .from('magazine_articles')
      .update({ views: data.views + 1 })
      .eq('id', data.id);

    return data;
  }

  // Contacts
  static async createContact(contact: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{
        ...contact,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getContacts(filters?: {
    status?: string;
    eventType?: string;
  }) {
    let query = supabase.from('contact_submissions').select('*');

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.eventType) {
      query = query.eq('event_type', filters.eventType);
    }

    const { data, error } = await query.order('submitted_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Sponsors
  static async getSponsors(filters?: {
    brand?: string;
    tier?: string;
    active?: boolean;
  }) {
    let query = supabase.from('sponsors').select('*');

    if (filters?.brand) {
      query = query.in('brand', [filters.brand, 'both']);
    }
    if (filters?.tier) {
      query = query.eq('tier', filters.tier);
    }
    if (filters?.active !== undefined) {
      query = query.eq('active', filters.active);
    }

    const { data, error } = await query.order('tier', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Search functionality
  static async search(query: string, type: 'events' | 'magazine' | 'gallery' = 'events') {
    let supabaseQuery;

    switch (type) {
      case 'events':
        supabaseQuery = supabase
          .from('events')
          .select('*')
          .or(`title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`);
        break;
      case 'magazine':
        supabaseQuery = supabase
          .from('magazine_articles')
          .select('*')
          .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`);
        break;
      case 'gallery':
        supabaseQuery = supabase
          .from('gallery_images')
          .select('*')
          .or(`title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`);
        break;
    }

    const { data, error } = await supabaseQuery!.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Security (Lockout)
  static async getUserLockout(userId: string): Promise<{
    failed_attempts: number;
    lockout_expires_at: string | Date | null;
    last_attempt: Date | null;
    user_id?: string;
  } | null> {
    // Placeholder implementation
    return null;
  }

  static async updateUserLockout(userId: string, updates: {
    failed_attempts?: number;
    lockout_expires_at?: string | Date | null;
    last_attempt?: Date | null;
  }) {
    // Placeholder implementation
    return null;
  }

  static async createUserLockout(data: {
    user_id: string;
    failed_attempts: number;
    last_attempt: Date;
    lockout_expires_at: Date | string | null;
  }) {
    // Placeholder implementation
    return { ...data, failed_attempts: data.failed_attempts || 0 };
  }

  static async resetUserLockout(userId: string) {
    // Placeholder implementation
    return null;
  }

  static async resetUserAttempts(userId: string) {
    // Placeholder implementation
    return null;
  }

  static async getLockedAccounts(): Promise<Array<{
    user_id: string;
    failed_attempts: number;
    last_attempt: Date | null;
    lockout_expires_at: string | Date;
  }>> {
    return [];
  }

  static async createSecurityLog(log: any) {
    // Placeholder implementation
    return null;
  }

  static async createRateLimitLog(data: any) {
    // Placeholder implementation
    return null;
  }
}