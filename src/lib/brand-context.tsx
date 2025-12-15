'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Brand, BRAND_CONFIGS, BrandConfig } from '@/types';

interface BrandContextType {
  currentBrand: Brand;
  brand: Brand; // Alias for currentBrand for compatibility
  brandConfig: BrandConfig;
  switchBrand: (brand: Brand) => void;
  isLoading: boolean;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [currentBrand, setCurrentBrand] = useState<Brand>('konnichiwa');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check URL params first
    const urlParams = new URLSearchParams(window.location.search);
    const brandParam = urlParams.get('brand') as Brand;
    
    if (brandParam && BRAND_CONFIGS[brandParam]) {
      setCurrentBrand(brandParam);
    } else {
      // Check localStorage
      const stored = localStorage.getItem('festival-brand') as Brand;
      if (stored && BRAND_CONFIGS[stored]) {
        setCurrentBrand(stored);
      }
    }
    
    setIsLoading(false);
  }, []);

  const switchBrand = (brand: Brand) => {
    setCurrentBrand(brand);
    localStorage.setItem('festival-brand', brand);
    
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('brand', brand);
    window.history.pushState({}, '', url.toString());
  };

  const brandConfig = BRAND_CONFIGS[currentBrand];

  return (
    <BrandContext.Provider value={{ currentBrand, brand: currentBrand, brandConfig, switchBrand, isLoading }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
}