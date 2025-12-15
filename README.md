# 🎌🇮🇳 Konnichiwa Japan & Namaste India Website

A dual-brand cultural festival website showcasing both **Konnichiwa Japan** (Japanese culture in India) and **Namaste India** (Indian culture in Japan) festivals.

## 🌟 Features

- **Dual-Brand System**: Seamless switching between Japanese and Indian cultural themes
- **Event Management**: Comprehensive event listings with filtering and search
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Framer Motion**: Smooth animations and transitions
- **Modern Architecture**: Next.js 14 with App Router
- **Cultural Content**: Rich festival content and multimedia galleries

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 8+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd konnichiwa-namaste-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your environment variables:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
konnichiwa-namaste-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Homepage
│   │   ├── events/             # Events pages
│   │   ├── tickets/            # Ticketing pages
│   │   ├── magazine/           # Magazine pages
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   ├── layout/             # Layout components
│   │   └── brand/              # Brand-specific components
│   ├── lib/                    # Utility functions
│   │   ├── brand-context.tsx   # Brand switching logic
│   │   └── utils.ts            # Helper functions
│   ├── types/                  # TypeScript definitions
│   │   └── index.ts            # Main type definitions
│   └── hooks/                  # Custom React hooks
├── public/                     # Static assets
│   ├── images/                 # Festival images
│   └── icons/                  # SVG icons
├── tailwind.config.js          # Tailwind configuration
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🎨 Brand System

### Theme Switching

The website features a sophisticated dual-brand system that allows instant switching between:

- **Konnichiwa Japan** (Japan in India)
  - Colors: Crimson (#DC2626) & Ink (#1F2937)
  - Currency: INR (Indian Rupees)
  - Region: India
  
- **Namaste India** (India in Japan)
  - Colors: Marigold (#EA580C) & Indigo (#1E3A8A)
  - Currency: JPY (Japanese Yen)
  - Region: Japan

### Implementation

The brand system is implemented using:
- React Context for state management
- CSS custom properties for theme variables
- Smooth animations with Framer Motion
- URL persistence for sharing

## 🛠️ Technical Stack

### Core Technologies
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

### Performance Optimizations
- **Next.js Image Optimization** - Automatic image optimization
- **Code Splitting** - Automatic code splitting
- **Tree Shaking** - Unused code elimination
- **Static Generation** - Pre-rendered pages where possible

## 📱 Responsive Design

The website is built mobile-first with responsive breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Key responsive features:
- Collapsible navigation menu
- Flexible grid layouts
- Touch-friendly interface elements
- Optimized images for all screen sizes

## 🎭 Event System

### Event Categories
- **Traditional Arts**: Sumo, Taiko, Classical Dance
- **Modern Culture**: Cosplay, Anime, Bollywood
- **Workshops**: Calligraphy, Yoga, Cooking
- **Performances**: Music, Dance, Martial Arts
- **Food**: Japanese/Indian cuisine experiences

### Features
- Advanced filtering and search
- Event details with schedules
- Performer profiles
- Ticket integration
- Real-time availability

## 🖼️ Media Management

### Image Handling
- **Next.js Image Component** - Automatic optimization
- **WebP Format** - Modern image format with fallbacks
- **Responsive Images** - Different sizes for different devices
- **Alt Text** - Accessibility compliance

### Festival Images
The project includes high-quality festival images:
- Event photography from actual festivals
- Cultural performance images
- Traditional arts demonstrations
- Audience and crowd shots

## 🎯 SEO & Accessibility

### SEO Features
- **Structured Data** - Schema.org markup for events
- **Meta Tags** - Dynamic meta descriptions and titles
- **Open Graph** - Social media sharing optimization
- **Sitemap** - Automatic XML sitemap generation
- **Canonical URLs** - Duplicate content prevention

### Accessibility
- **WCAG 2.1 AA Compliance** - Web accessibility standards
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader Support** - ARIA labels and roles
- **Color Contrast** - High contrast ratios
- **Focus Management** - Clear focus indicators

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Static site deployment
- **AWS Amplify**: Full-stack deployment
- **DigitalOcean**: Custom server deployment

### Environment Variables
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
STRIPE_PUBLISHABLE_KEY=pk_test_...
RAZORPAY_KEY_ID=rzp_test_...
SENDGRID_API_KEY=SG....
```

## 📊 Analytics & Tracking

### Google Analytics 4
- Event tracking for user interactions
- Conversion tracking for ticket sales
- Custom events for festival-specific metrics
- Real-time user monitoring

### Social Media Integration
- Facebook Pixel integration
- Twitter Cards optimization
- Open Graph meta tags
- Social sharing buttons

## 🔧 Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Type checking
npm run type-check

# Format code
npm run format
```

## 🧪 Testing

### Testing Strategy
- **Unit Tests** - Component and utility testing
- **Integration Tests** - Page and feature testing
- **E2E Tests** - Full user flow testing
- **Accessibility Tests** - WCAG compliance testing

### Testing Tools
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **Cypress** - E2E testing
- **axe-core** - Accessibility testing

## 📝 Content Management

### CMS Integration
The project is designed to work with headless CMS platforms:

- **Sanity** - Recommended for its flexibility
- **Strapi** - Open-source headless CMS
- **Contentful** - Enterprise content management
- **Ghost** - Publishing-focused CMS

### Content Types
- Events and schedules
- Performer and guest profiles
- Magazine articles and issues
- Media galleries
- Sponsors and partners

## 🔐 Security

### Security Measures
- **HTTPS** - SSL/TLS encryption
- **Content Security Policy** - XSS protection
- **Input Validation** - Form and API security
- **Authentication** - Secure user management
- **Payment Security** - PCI DSS compliance

## 📈 Performance

### Performance Targets
- **Lighthouse Score**: 90+ (Mobile & Desktop)
- **Core Web Vitals**: All metrics in "Good" range
- **Loading Time**: <3 seconds on 3G
- **Time to Interactive**: <5 seconds

### Optimization Techniques
- **Image Optimization** - Automatic compression and format conversion
- **Code Splitting** - Load only necessary code
- **Caching** - Static asset caching
- **CDN** - Content delivery network
- **Bundle Analysis** - Optimize bundle size

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run linting and type checking
6. Submit a pull request

### Code Standards
- **TypeScript** - Strict type checking
- **ESLint** - Code quality rules
- **Prettier** - Code formatting
- **Conventional Commits** - Commit message format

## 📞 Support

### Documentation
- **Component Library** - Storybook documentation
- **API Reference** - Endpoint documentation
- **User Guide** - CMS usage instructions
- **Developer Guide** - Technical documentation

### Community
- **GitHub Issues** - Bug reports and feature requests
- **Discord** - Real-time community chat
- **Email Support** - Direct contact with developers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Festival organizers and participants
- Cultural consultants from Japan and India
- Open source community
- Beta testers and feedback providers

---

**Built with ❤️ by MiniMax Agent**

For more information, visit our website or contact us at info@konnichiwajapan.com