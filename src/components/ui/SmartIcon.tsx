import React from 'react';
import * as LucideIcons from 'lucide-react';
import { IconFallbacks } from './IconFallbacks';

interface SmartIconProps {
  name: keyof typeof LucideIcons;
  size?: number;
  className?: string;
  color?: string;
  fallback?: keyof typeof IconFallbacks;
  [key: string]: any;
}

export function SmartIcon({
  name,
  size = 24,
  className = '',
  color = 'currentColor',
  fallback,
  ...props
}: SmartIconProps) {
  // Try to get the original lucide icon
  const OriginalIcon = LucideIcons[name] as any;

  if (OriginalIcon) {
    return <OriginalIcon size={size} className={className} color={color} {...props} />;
  }

  // If original icon doesn't exist, try fallback
  const FallbackIcon = fallback ? IconFallbacks[fallback] : undefined;

  if (FallbackIcon) {
    return <FallbackIcon size={size} className={className} color={color} {...props} />;
  }

  // If no fallback available, return a simple square placeholder
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...props}
    >
      <rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="12" y="16" textAnchor="middle" fill="currentColor" fontSize="8">{name}</text>
    </svg>
  );
}

// Convenience component for specific problematic icons
export const SafeInstagram = (props: any) => (
  <SmartIcon name="Instagram" fallback="Instagram" {...props} />
);

export const SafeTwitter = (props: any) => (
  <SmartIcon name="Twitter" fallback="Twitter" {...props} />
);

export const SafeFacebook = (props: any) => (
  <SmartIcon name="Facebook" fallback="Facebook" {...props} />
);

export const SafeYoutube = (props: any) => (
  <SmartIcon name="Youtube" fallback="Youtube" {...props} />
);

export const SafeBuilding2 = (props: any) => (
  <SmartIcon name="Building2" fallback="Building2" {...props} />
);

export const SafeSmartphone = (props: any) => (
  <SmartIcon name="Smartphone" fallback="Smartphone" {...props} />
);

export const SafeCrown = (props: any) => (
  <SmartIcon name="Crown" fallback="Crown" {...props} />
);

export const SafeGift = (props: any) => (
  <SmartIcon name="Gift" fallback="Gift" {...props} />
);

export const SafeZap = (props: any) => (
  <SmartIcon name="Zap" fallback="Zap" {...props} />
);

export const SafeQrCode = (props: any) => (
  <SmartIcon name="QrCode" fallback="QrCode" {...props} />
);
