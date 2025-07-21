# replit.md

## Overview

This is a full-stack juice bar e-commerce application called "Pulpe" built with a modern TypeScript stack. The application features a React frontend with a Node.js/Express backend, showcasing organic juices, smoothies, and wellness products. It uses a PostgreSQL database with Drizzle ORM for data persistence and includes a complete UI component system built with Radix UI and styled with Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Development**: TSX for TypeScript execution in development
- **Production Build**: ESBuild for server bundling

### Database Architecture
- **Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Schema Location**: `shared/schema.ts` for type-safe sharing between client and server
- **Connection**: Uses `@neondatabase/serverless` for serverless PostgreSQL connections

## Key Components

### Shared Schema (`shared/schema.ts`)
- **Products**: Main product catalog with categories (juices, smoothies, cleanses, shots)
- **Contacts**: Customer contact form submissions
- **Users**: Basic user authentication structure
- **Validation**: Zod schemas for type-safe data validation

### API Layer (`server/routes.ts`)
- RESTful API endpoints for product management
- Product filtering by category and slug-based routing
- Featured products endpoint
- Contact form submission handling

### Storage Layer (`server/storage.ts`)
- Abstract storage interface (`IStorage`) for database operations
- In-memory storage implementation for development/testing
- Prepared for database storage implementation
- Pre-populated with sample juice/smoothie products

### Frontend Pages
- **Home**: Hero section with featured products and company branding
- **Products**: Product catalog with category filtering and search
- **Product Detail**: Individual product pages with full descriptions
- **About**: Company story and values
- **Contact**: Contact form with validation
- **404**: Custom not-found page

### UI Component System
- Complete shadcn/ui component library implementation
- Custom branding with green/orange color scheme
- Responsive design with mobile-first approach
- Accessibility-focused components using Radix UI primitives

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **API Processing**: Express server handles requests through route handlers
3. **Storage Operations**: Storage layer abstracts database operations
4. **Response Handling**: JSON responses with proper error handling
5. **Client Updates**: TanStack Query manages client-side caching and updates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless connection
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe database ORM
- **wouter**: Lightweight React routing

### UI Dependencies
- **@radix-ui/***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Frontend build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Production server bundling

## Deployment Strategy

### Development
- Vite dev server for frontend with HMR
- TSX execution for backend development
- Integrated development experience with proxying

### Production Build
- Frontend: Vite builds React app to `dist/public`
- Backend: ESBuild bundles server to `dist/index.js`
- Static file serving from Express server
- Environment variable configuration for database connections

### Database Management
- Drizzle Kit for schema migrations
- `db:push` command for development schema updates
- PostgreSQL dialect with connection string configuration

The application follows a clean separation of concerns with shared TypeScript types between client and server, ensuring type safety across the full stack. The architecture supports both development flexibility and production deployment requirements.