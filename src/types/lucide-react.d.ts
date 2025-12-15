// Comprehensive Lucide React type definitions for v0.294.0 compatibility
// This includes all icons used in the project

import { SVGProps } from 'react';

declare module 'lucide-react' {
  // Basic UI Icons
  export const Menu: React.FC<SVGProps<SVGSVGElement>>;
  export const X: React.FC<SVGProps<SVGSVGElement>>;
  export const Check: React.FC<SVGProps<SVGSVGElement>>;
  export const CheckCircle: React.FC<SVGProps<SVGSVGElement>>;
  export const AlertCircle: React.FC<SVGProps<SVGSVGElement>>;
  export const AlertTriangle: React.FC<SVGProps<SVGSVGElement>>;
  export const Info: React.FC<SVGProps<SVGSVGElement>>;
  export const XCircle: React.FC<SVGProps<SVGSVGElement>>;

  // Arrow Icons
  export const ArrowLeft: React.FC<SVGProps<SVGSVGElement>>;
  export const ArrowRight: React.FC<SVGProps<SVGSVGElement>>;
  export const ArrowUp: React.FC<SVGProps<SVGSVGElement>>;
  export const ArrowDown: React.FC<SVGProps<SVGSVGElement>>;
  export const ChevronLeft: React.FC<SVGProps<SVGSVGElement>>;
  export const ChevronRight: React.FC<SVGProps<SVGSVGElement>>;

  // Navigation & Action Icons
  export const Home: React.FC<SVGProps<SVGSVGElement>>;
  export const ExternalLink: React.FC<SVGProps<SVGSVGElement>>;
  export const Link: React.FC<SVGProps<SVGSVGElement>>;
  export const Copy: React.FC<SVGProps<SVGSVGElement>>;
  export const Edit: React.FC<SVGProps<SVGSVGElement>>;
  export const Trash2: React.FC<SVGProps<SVGSVGElement>>;
  export const Save: React.FC<SVGProps<SVGSVGElement>>;
  export const Settings: React.FC<SVGProps<SVGSVGElement>>;
  export const RefreshCw: React.FC<SVGProps<SVGSVGElement>>;

  // User & Authentication Icons
  export const User: React.FC<SVGProps<SVGSVGElement>>;
  export const LogOut: React.FC<SVGProps<SVGSVGElement>>;
  export const LogIn: React.FC<SVGProps<SVGSVGElement>>;
  export const Eye: React.FC<SVGProps<SVGSVGElement>>;
  export const EyeOff: React.FC<SVGProps<SVGSVGElement>>;
  export const Lock: React.FC<SVGProps<SVGSVGElement>>;
  export const Shield: React.FC<SVGProps<SVGSVGElement>>;

  // Communication Icons
  export const Mail: React.FC<SVGProps<SVGSVGElement>>;
  export const Phone: React.FC<SVGProps<SVGSVGElement>>;
  export const MessageCircle: React.FC<SVGProps<SVGSVGElement>>;
  export const Send: React.FC<SVGProps<SVGSVGElement>>;
  export const Volume2: React.FC<SVGProps<SVGSVGElement>>;
  export const VolumeX: React.FC<SVGProps<SVGSVGElement>>;

  // Social Media Icons
  export const Instagram: React.FC<SVGProps<SVGSVGElement>>;
  export const Twitter: React.FC<SVGProps<SVGSVGElement>>;
  export const Facebook: React.FC<SVGProps<SVGSVGElement>>;
  export const Youtube: React.FC<SVGProps<SVGSVGElement>>;
  export const Share2: React.FC<SVGProps<SVGSVGElement>>;

  // Search & Filter Icons
  export const Search: React.FC<SVGProps<SVGSVGElement>>;
  export const Filter: React.FC<SVGProps<SVGSVGElement>>;

  // Shopping & Payment Icons
  export const ShoppingCart: React.FC<SVGProps<SVGSVGElement>>;
  export const CreditCard: React.FC<SVGProps<SVGSVGElement>>;
  export const Smartphone: React.FC<SVGProps<SVGSVGElement>>;
  export const Building2: React.FC<SVGProps<SVGSVGElement>>;
  export const QrCode: React.FC<SVGProps<SVGSVGElement>>;
  export const Ticket: React.FC<SVGProps<SVGSVGElement>>;

  // Content Icons
  export const Image: React.FC<SVGProps<SVGSVGElement>>;
  export const Video: React.FC<SVGProps<SVGSVGElement>>;
  export const Camera: React.FC<SVGProps<SVGSVGElement>>;
  export const Download: React.FC<SVGProps<SVGSVGElement>>;
  export const Play: React.FC<SVGProps<SVGSVGElement>>;
  export const Pause: React.FC<SVGProps<SVGSVGElement>>;
  export const Loader2: React.FC<SVGProps<SVGSVGElement>>;

  // Event & Location Icons
  export const Calendar: React.FC<SVGProps<SVGSVGElement>>;
  export const Clock: React.FC<SVGProps<SVGSVGElement>>;
  export const MapPin: React.FC<SVGProps<SVGSVGElement>>;
  export const Users: React.FC<SVGProps<SVGSVGElement>>;
  export const Globe: React.FC<SVGProps<SVGSVGElement>>;
  export const Handshake: React.FC<SVGProps<SVGSVGElement>>;

  // Interaction Icons
  export const Plus: React.FC<SVGProps<SVGSVGElement>>;
  export const Minus: React.FC<SVGProps<SVGSVGElement>>;
  export const Heart: React.FC<SVGProps<SVGSVGElement>>;
  export const Star: React.FC<SVGProps<SVGSVGElement>>;
  export const Award: React.FC<SVGProps<SVGSVGElement>>;
  export const Target: React.FC<SVGProps<SVGSVGElement>>;
  export const Trophy: React.FC<SVGProps<SVGSVGElement>>;
  export const Crown: React.FC<SVGProps<SVGSVGElement>>;
  export const Gift: React.FC<SVGProps<SVGSVGElement>>;
  export const Zap: React.FC<SVGProps<SVGSVGElement>>;

  // System Icons
  export const Tag: React.FC<SVGProps<SVGSVGElement>>;
  export const Maximize: React.FC<SVGProps<SVGSVGElement>>;
  export const Minimize: React.FC<SVGProps<SVGSVGElement>>;
  export const Close: React.FC<SVGProps<SVGSVGElement>>;
  export const ZoomIn: React.FC<SVGProps<SVGSVGElement>>;

  // Utility types for backward compatibility
  export const a: React.ComponentType<any>;
}
