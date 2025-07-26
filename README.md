# PulpeHealth - Fresh Juice & Wellness Platform

A modern, full-stack web application for a premium juice and wellness business, built with React, TypeScript, and Node.js. Features a PWA-enabled frontend, serverless API, and PostgreSQL database.

## 🌟 Features

- **Progressive Web App (PWA)** - Installable on mobile devices with offline support
- **E-commerce Cart System** - Persistent shopping cart with Zustand state management
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Serverless API** - Vercel serverless functions for backend operations
- **Database Integration** - PostgreSQL with Drizzle ORM
- **Static Product Data** - Optimized for performance with embedded product data
- **Modern UI Components** - Built with Radix UI and custom components

## 🏗️ Architecture

### Frontend Architecture
```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Radix UI components
│   │   ├── cart.tsx        # Shopping cart component
│   │   ├── header.tsx      # Navigation header
│   │   ├── hero.tsx        # Landing page hero
│   │   └── product-card.tsx # Product display card
│   ├── pages/              # Route components
│   │   ├── home.tsx        # Landing page
│   │   ├── products.tsx    # Product listing
│   │   ├── product.tsx     # Individual product
│   │   ├── about.tsx       # About page
│   │   ├── contact.tsx     # Contact form
│   │   └── not-found.tsx   # 404 page
│   ├── lib/                # Utility libraries
│   │   ├── api.ts          # API client functions
│   │   ├── store.ts        # Zustand cart store
│   │   ├── utils.ts        # Utility functions
│   │   └── queryClient.ts  # React Query configuration
│   ├── hooks/              # Custom React hooks
│   └── data/               # Static data files
│       └── products.json   # Embedded product data
```

### Backend Architecture
```
├── api/                    # Vercel serverless functions
│   ├── products.ts         # Product listing API
│   ├── products/
│   │   ├── [slug].ts       # Individual product API
│   │   ├── featured.ts     # Featured products API
│   │   └── category/
│   │       └── [category].ts # Category products API
│   └── contact.ts          # Contact form API
├── server/                 # Express server (development)
│   ├── index.ts           # Server entry point
│   ├── db.ts              # Database connection
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage utilities
├── shared/                 # Shared code
│   └── schema.ts          # Database schema definitions
└── scripts/               # Build and data scripts
    ├── seed-products.ts   # Database seeding
    └── export_products_static.ts # Static data export
```

## 🚀 Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Zustand** - State management for cart
- **React Query** - Data fetching and caching
- **Wouter** - Lightweight routing
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework (development)
- **Vercel Serverless** - Production API functions
- **PostgreSQL** - Database
- **Drizzle ORM** - Database toolkit
- **Supabase** - Database hosting

### Development Tools
- **TypeScript** - Type checking
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vite PWA Plugin** - PWA generation

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Supabase recommended)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/PulpeHealth.git
   cd PulpeHealth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your database URL:
   ```env
   DATABASE_URL="postgresql://username:password@host:port/database"
   ```

4. **Set up the database**
   ```bash
   # Push schema to database
   npm run db:push
   
   # Seed with initial data
   npx tsx scripts/seed-products.ts
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5001`

### Production Deployment

1. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

2. **Environment Variables**
   Set the following in Vercel dashboard:
   - `DATABASE_URL` - Your PostgreSQL connection string

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run build:client     # Build frontend only
npm run build:server     # Build backend only

# Database
npm run db:push          # Push schema to database
npm run generate:products # Export products to static JSON

# Type checking
npm run check            # TypeScript type checking
```

## 🗄️ Database Schema

### Products Table
```typescript
interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  originalPrice: string | null;
  calories: number | null;
  category: 'juices' | 'smoothies' | 'shots' | 'cleanses';
  imageUrl: string;
  ingredients: string[];
  featured: boolean;
  inStock: boolean;
}
```

### Categories
- **Juices** - Cold-pressed fruit and vegetable juices
- **Smoothies** - Blended drinks with almond milk base
- **Shots** - Concentrated wellness shots
- **Cleanses** - Multi-day juice cleanse programs

## 🛒 Cart System

The application uses Zustand for cart state management with the following features:

- **Persistent Storage** - Cart data saved to localStorage
- **Add/Remove Items** - Add products and remove them
- **Quantity Management** - Increase/decrease item quantities
- **Total Calculation** - Automatic price calculation
- **Real-time Updates** - UI updates immediately

### Cart Store API
```typescript
interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}
```

## 📱 PWA Features

### Web App Manifest
- App name: "PulpE"
- Theme color: Green (#16a34a)
- Display mode: Standalone
- Icons: 192x192 and 512x512 PNG

### Service Worker
- Caches static assets for offline access
- Automatic updates when new versions are available
- Precache strategy for critical resources

### Installation
Users can install the app on their mobile devices:
1. Visit the website on mobile browser
2. Tap "Add to Home Screen"
3. App appears with custom icon and branding

## 🎨 UI Components

### Design System
- **Colors**: Green primary (#16a34a), Orange accent (#f97316)
- **Typography**: Inter font family
- **Spacing**: Tailwind CSS spacing scale
- **Components**: Radix UI primitives with custom styling

### Key Components
- **ProductCard** - Displays product information with add to cart
- **Cart** - Slide-out cart panel with quantity controls
- **Header** - Navigation with cart icon and mobile menu
- **Hero** - Landing page hero section with call-to-action

## 🔧 Configuration Files

### Vite Configuration (`vite.config.ts`)
- React plugin for JSX support
- PWA plugin for service worker generation
- Path aliases for clean imports
- Build output configuration

### Vercel Configuration (`vercel.json`)
- Build command and output directory
- API route rewrites
- Function configuration for serverless API

### Tailwind Configuration (`tailwind.config.ts`)
- Custom color palette
- Component styling
- Animation utilities

## 🚀 Performance Optimizations

### Frontend
- **Code Splitting** - Automatic route-based code splitting
- **Image Optimization** - Optimized product images
- **Static Data** - Embedded product data for fast loading
- **Caching** - Service worker caching for offline access

### Backend
- **Serverless Functions** - Scalable API endpoints
- **Database Indexing** - Optimized queries with proper indexes
- **Connection Pooling** - Efficient database connections

## 🔒 Security

### Frontend
- **Input Validation** - Form validation with Zod
- **XSS Prevention** - React's built-in XSS protection
- **HTTPS Only** - Secure connections in production

### Backend
- **Environment Variables** - Sensitive data in environment variables
- **Input Sanitization** - Validated API inputs
- **CORS Configuration** - Proper cross-origin settings

## 📊 Monitoring & Analytics

### Error Tracking
- Console error logging
- API error handling
- User-friendly error messages

### Performance Monitoring
- Vite build analytics
- Bundle size optimization
- Loading time metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation in this README

## 🔄 Version History

- **v1.0.0** - Initial release with PWA support and cart functionality
- **v1.1.0** - Added static product data and performance optimizations
- **v1.2.0** - Migrated to Supabase and updated UI components

---

Built with ❤️ for fresh, healthy living 