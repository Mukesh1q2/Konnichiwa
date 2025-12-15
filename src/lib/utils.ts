import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Brand } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBrandColors(brand: Brand) {
  return {
    primary: brand === 'konnichiwa' ? '#DC2626' : '#EA580C',
    primaryDark: brand === 'konnichiwa' ? '#991B1B' : '#C2410C',
    secondary: brand === 'konnichiwa' ? '#1F2937' : '#1E3A8A',
    accent: brand === 'konnichiwa' ? '#FEF2F2' : '#FFF7ED',
  };
}

export function formatPrice(price: number, currency: string): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });
  
  return formatter.format(price);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function getEventImage(eventCategory: string): string {
  const categoryImages: Record<string, string> = {
    sumo: '/images/konnichiwa_japan_event_images_5.jpg',
    cosplay: '/images/cosplay_competition_images_0.jpg',
    taiko: '/images/japanese_traditional_elements_8.jpg',
    'martial-arts': '/images/japanese_traditional_elements_6.jpg',
    food: '/images/konnichiwa_japan_event_images_3.jpeg',
    workshop: '/images/japanese_traditional_elements_1.jpg',
    performance: '/images/namaste_india_event_images_8.jpg',
    'classical-dance': '/images/indian_cultural_elements_3.jpeg',
    bollywood: '/images/indian_cultural_elements_4.jpg',
    yoga: '/images/indian_cultural_elements_5.webp',
    handicrafts: '/images/namaste_india_event_images_3.jpg',
    music: '/images/cosplay_competition_images_2.jpg',
  };
  
  return categoryImages[eventCategory] || '/images/konnichiwa_japan_event_images_0.jpg';
}

export function getBrandRoute(brand: Brand): string {
  return brand === 'konnichiwa' ? '/konichiwa' : '/namaste';
}

export function getEventCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    sumo: 'Sumo Wrestling',
    cosplay: 'Cosplay Competition',
    taiko: 'Taiko Drumming',
    'martial-arts': 'Martial Arts',
    food: 'Food & Cuisine',
    workshop: 'Workshops',
    performance: 'Live Performance',
    'classical-dance': 'Classical Dance',
    bollywood: 'Bollywood Dance',
    yoga: 'Yoga & Wellness',
    handicrafts: 'Handicrafts & Art',
    music: 'Music & Concerts',
  };
  
  return labels[category] || category;
}