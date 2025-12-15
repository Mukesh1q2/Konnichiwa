import React from 'react';

// Fallback icon components for icons that might not exist in older lucide-react versions
// These provide basic SVG implementations that match the expected interfaces

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
  [key: string]: any;
}

export const IconFallbacks: Record<string, React.FC<IconProps>> = {
  Instagram: ({ size = 24, className = '', color = 'currentColor', ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill={color}/>
    </svg>
  ),

  Twitter: ({ size = 24, className = '', color = 'currentColor', ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" 
            stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Facebook: ({ size = 24, className = '', color = 'currentColor', ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" 
            stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  Youtube: ({ size = 24, className = '', color = 'currentColor', ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" 
            stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill={color}/>
    </svg>
  ),

  Building2: ({ size = 24, className = '', color = 'currentColor', ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18z" stroke={color} strokeWidth="2" fill="none"/>
      <path d="M6 12H4a2 2 0 00-2 2v8a2 2 0 002 2h2" stroke={color} strokeWidth="2" fill="none"/>
      <path d="M18 9h2a2 2 0 012 2v11a2 2 0 01-2 2h-2" stroke={color} strokeWidth="2" fill="none"/>
      <path d="M10 6h4" stroke={color} strokeWidth="2"/>
      <path d="M10 10h4" stroke={color} strokeWidth="2"/>
      <path d="M10 14h4" stroke={color} strokeWidth="2"/>
      <path d="M10 18h4" stroke={color} strokeWidth="2"/>
    </svg>
  ),

  Smartphone: ({ size = 24, className = '', color = 'currentColor', ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="7" y="2" width="10" height="20" rx="2" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="12" cy="18" r="1" fill={color}/>
      <line x1="12" y1="14" x2="12" y2="16" stroke={color} strokeWidth="2"/>
    </svg>
  ),

  Crown: ({ size = 24, className = '', color = 'currentColor', ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 18h12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 15h8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  Gift: ({ size = 24, className = '', color = 'currentColor', ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path d="M20 12v10H4V12" stroke={color} strokeWidth="2" fill="none"/>
      <path d="M2 7h20v5H2z" stroke={color} strokeWidth="2" fill="none"/>
      <path d="M12 7V3h0v4z" stroke={color} strokeWidth="2" fill="none"/>
      <path d="M8 13.5c1 1 7 1 8 0" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 16.5c1 1 7 1 8 0" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  Zap: ({ size = 24, className = '', color = 'currentColor', ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" fill={color}/>
    </svg>
  ),

  QrCode: ({ size = 24, className = '', color = 'currentColor', ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <rect x="3" y="3" width="7" height="7" stroke={color} strokeWidth="2" fill="none"/>
      <rect x="14" y="3" width="7" height="7" stroke={color} strokeWidth="2" fill="none"/>
      <rect x="14" y="14" width="7" height="7" stroke={color} strokeWidth="2" fill="none"/>
      <rect x="5" y="5" width="3" height="3" fill={color}/>
      <rect x="16" y="5" width="3" height="3" fill={color}/>
      <rect x="16" y="16" width="3" height="3" fill={color}/>
    </svg>
  )
};

// Higher-order component to safely use lucide icons with fallbacks
export function withIconFallback<T extends Record<string, any>>(
  OriginalIcon: React.ComponentType<T> | undefined,
  FallbackIcon: React.ComponentType<T>
) {
  return function SafeIcon(props: T) {
    if (OriginalIcon) {
      return <OriginalIcon {...props} />;
    }
    return <FallbackIcon {...props} />;
  };
}
