// Brand types
export type Brand = 'konnichiwa' | 'namaste';

export interface BrandConfig {
  name: string;
  displayName: string;
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
    accent: string;
  };
  images: {
    hero: string;
    logo: string;
    favicon: string;
  };
  locale: {
    default: string;
    currency: string;
    region: string;
  };
  content: {
    tagline: string;
    heroTitle: string;
    heroSubtitle: string;
  };
}

export const BRAND_CONFIGS: Record<Brand, BrandConfig> = {
  konnichiwa: {
    name: 'konnichiwa',
    displayName: 'Konnichiwa Japan',
    colors: {
      primary: '#DC2626',
      primaryDark: '#991B1B',
      secondary: '#1F2937',
      accent: '#FEF2F2',
    },
    images: {
      hero: '/images/konnichiwa_japan_event_images_0.jpg',
      logo: '/images/logos/konnichiwa-logo.svg',
      favicon: '/images/logos/konnichiwa-favicon.svg',
    },
    locale: {
      default: 'en',
      currency: 'INR',
      region: 'India',
    },
    content: {
      tagline: 'Experience Japan in India',
      heroTitle: 'India’s Largest Japanese Cultural Festival',
      heroSubtitle: 'A celebration of culture, cuisine, anime, tradition, and friendship.',
    },
  },
  namaste: {
    name: 'namaste',
    displayName: 'Namaste India',
    colors: {
      primary: '#EA580C',
      primaryDark: '#C2410C',
      secondary: '#1E3A8A',
      accent: '#FFF7ED',
    },
    images: {
      hero: '/images/namaste_india_event_images_1.webp',
      logo: '/images/logos/namaste-logo.svg',
      favicon: '/images/logos/namaste-favicon.svg',
    },
    locale: {
      default: 'en',
      currency: 'JPY',
      region: 'Japan',
    },
    content: {
      tagline: 'India Comes Alive in Japan',
      heroTitle: 'Japan’s Largest Indian Cultural Festival',
      heroSubtitle: 'Music, dance, food, yoga, art — discover the heart of India in Tokyo.',
    },
  },
};

// Event types
export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  brand: Brand;
  category: EventCategory;
  startDate: string;
  endDate: string;
  venue: string;
  stage: string;
  capacity: number;
  ticketRequired: boolean;
  ticketTypes: TicketType[];
  performers: Guest[];
  image: string;
  featured: boolean;
  tags: string[];
  ageRestriction?: string;
}

export type EventCategory =
  | 'sumo'
  | 'cosplay'
  | 'taiko'
  | 'martial-arts'
  | 'food'
  | 'workshop'
  | 'performance'
  | 'classical-dance'
  | 'bollywood'
  | 'yoga'
  | 'handicrafts'
  | 'music';

export interface Guest {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  country: string;
  socialLinks: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    website?: string;
  };
  brand: Brand;
  sessions: Event[];
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  currency: string;
  accessLevel: 'general' | 'workshop' | 'vip' | 'family' | 'student';
  features: string[];
  maxQuantity: number;
  available: boolean;
}

// Magazine types
export interface MagazineIssue {
  id: string;
  issueNumber: string;
  title: string;
  coverImage: string;
  description: string;
  publishDate: string;
  articles: MagazineArticle[];
  featured: boolean;
}

export interface MagazineArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  coverImage: string;
  publishDate: string;
  readTime: number;
  tags: string[];
  issueId: string;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  tickets: Ticket[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  brand: Brand;
  language: string;
  currency: string;
  newsletter: boolean;
}

export interface Ticket {
  id: string;
  type: TicketType;
  quantity: number;
  qrCode: string;
  status: 'pending' | 'confirmed' | 'used' | 'cancelled';
  purchaseDate: string;
  eventId: string;
  userId: string;
}

// Page types
export interface PageProps {
  brand: Brand;
  searchParams?: { [key: string]: string | string[] | undefined };
}