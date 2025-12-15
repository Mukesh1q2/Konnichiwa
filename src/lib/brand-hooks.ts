// Brand context hooks-only version
import { createContext, useContext, useState, useEffect } from 'react';
import { Brand, BRAND_CONFIGS, BrandConfig } from '@/types';

interface BrandContextType {
  currentBrand: Brand;
  brand: Brand; // Alias for currentBrand for compatibility
  brandConfig: BrandConfig;
  switchBrand: (brand: Brand) => void;
  isLoading: boolean;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};

export const useCurrentBrand = () => {
  const { currentBrand, brandConfig } = useBrand();
  return { brand: currentBrand, brandConfig };
};

export const useBrandSwitcher = () => {
  const { switchBrand } = useBrand();
  return { switchBrand };
};

export const useBrandLoading = () => {
  const { isLoading } = useBrand();
  return isLoading;
};

export { BrandContext };
export type { BrandContextType };