import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BrandProvider } from '@/lib/brand-context';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Konnichiwa Japan & Namaste India - Cultural Festival Website',
    template: '%s | Cultural Festival',
  },
  description: 'Experience the vibrant cultural bridge between India and Japan through two of the largest community-driven festivals. From traditional arts to modern pop culture, our festivals bring people together across borders.',
  keywords: [
    'cultural festival',
    'Japan',
    'India',
    'Konnichiwa Japan',
    'Namaste India',
    'anime',
    'cosplay',
    'bollywood',
    'yoga',
    'traditional arts',
  ],
  authors: [{ name: 'MiniMax Agent' }],
  creator: 'MiniMax Agent',
  publisher: 'Cultural Festival Organizers',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://konnichiwajapan.com',
    siteName: 'Konnichiwa Japan & Namaste India',
    title: 'Konnichiwa Japan & Namaste India - Cultural Festival Website',
    description: 'Experience the vibrant cultural bridge between India and Japan through two of the largest community-driven festivals.',
    images: [
      {
        url: '/images/konnichiwa_japan_event_images_0.jpg',
        width: 1200,
        height: 630,
        alt: 'Konnichiwa Japan Festival',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Konnichiwa Japan & Namaste India - Cultural Festival Website',
    description: 'Experience the vibrant cultural bridge between India and Japan through two of the largest community-driven festivals.',
    images: ['/images/konnichiwa_japan_event_images_0.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <BrandProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </BrandProvider>
      </body>
    </html>
  );
}