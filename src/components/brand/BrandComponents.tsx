// Brand context components and provider
import React, { useState, useEffect } from 'react';
import { Brand, BRAND_CONFIGS, BrandConfig } from '../../types';
import { BrandContext, useBrand } from '../../lib/brand-hooks';

// Brand Provider Component
export const BrandProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentBrand, setCurrentBrand] = useState<Brand>('konnichiwa');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check URL params first
    const urlParams = new URLSearchParams(window.location.search);
    const brandParam = urlParams.get('brand') as Brand;

    if (brandParam && BRAND_CONFIGS[brandParam]) {
      setCurrentBrand(brandParam);
      setIsLoading(false);
      return;
    }

    // Check localStorage
    const stored = localStorage.getItem('festival-brand') as Brand;
    if (stored && BRAND_CONFIGS[stored]) {
      setCurrentBrand(stored);
    }

    setIsLoading(false);
  }, []);

  const switchBrand = (brand: Brand) => {
    if (BRAND_CONFIGS[brand]) {
      setCurrentBrand(brand);
      localStorage.setItem('festival-brand', brand);

      // Update URL without page reload
      const url = new URL(window.location.href);
      url.searchParams.set('brand', brand);
      window.history.replaceState({}, '', url.toString());

      // Trigger custom event for other components
      window.dispatchEvent(new CustomEvent('brandChanged', { detail: brand }));
    }
  };

  const brandConfig = BRAND_CONFIGS[currentBrand];

  return (
    <BrandContext.Provider value={{
      currentBrand,
      brand: currentBrand, // Alias for compatibility
      brandConfig,
      switchBrand,
      isLoading
    }}>
      {children}
    </BrandContext.Provider>
  );
};

// Brand selector component
export const BrandSelector = ({
  className = '',
  showLabels = true
}: {
  className?: string;
  showLabels?: boolean;
}) => {
  const { currentBrand, switchBrand } = useBrand();

  return (
    <div className={`brand-selector ${className}`}>
      {Object.entries(BRAND_CONFIGS).map(([brand, config]) => (
        <button
          key={brand}
          onClick={() => switchBrand(brand as Brand)}
          className={`brand-button ${currentBrand === brand ? 'active' : ''}`}
          style={{
            backgroundColor: currentBrand === brand ? config.colors.primary : 'transparent',
            color: currentBrand === brand ? ((config.colors as any).onPrimary || 'white') : config.colors.primary,
            border: `1px solid ${config.colors.primary}`
          }}
        >
          {showLabels && (
            <span className="brand-label">
              {config.displayName}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

// Brand banner component
export const BrandBanner = ({ className = '' }: { className?: string }) => {
  const { brandConfig } = useCurrentBrand();

  return (
    <div
      className={`brand-banner ${className}`}
      style={{
        background: `linear-gradient(135deg, ${brandConfig.colors.primary}, ${brandConfig.colors.secondary})`,
        color: (brandConfig.colors as any).onPrimary || 'white'
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">{brandConfig.displayName}</h1>
        <p className="banner-subtitle">{(brandConfig as any).description || ''}</p>
      </div>
    </div>
  );
};

// Brand theme wrapper
export const BrandThemeWrapper = ({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { brandConfig } = useCurrentBrand();

  return (
    <div
      className={`brand-theme-wrapper ${className}`}
      style={{
        '--brand-primary': brandConfig.colors.primary,
        '--brand-secondary': brandConfig.colors.secondary,
        '--brand-accent': brandConfig.colors.accent,
        '--brand-on-primary': (brandConfig.colors as any).onPrimary || 'white',
        '--brand-on-secondary': (brandConfig.colors as any).onSecondary || 'white',
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

// Hook for brand-specific styling
export const useBrandStyles = () => {
  const { brandConfig } = useCurrentBrand();

  return {
    primary: brandConfig.colors.primary,
    secondary: brandConfig.colors.secondary,
    accent: brandConfig.colors.accent,
    onPrimary: (brandConfig.colors as any).onPrimary || 'white',
    onSecondary: (brandConfig.colors as any).onSecondary || 'white',

    // Common style combinations
    primaryButton: {
      backgroundColor: brandConfig.colors.primary,
      color: (brandConfig.colors as any).onPrimary || 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 16px',
      fontWeight: 600
    },

    secondaryButton: {
      backgroundColor: 'transparent',
      color: brandConfig.colors.primary,
      border: `1px solid ${brandConfig.colors.primary}`,
      borderRadius: '8px',
      padding: '8px 16px',
      fontWeight: 600
    }
  };
};

// Convenience hooks
export const useCurrentBrand = () => {
  const { currentBrand, brandConfig } = useBrand();
  return { brand: currentBrand, brandConfig };
};