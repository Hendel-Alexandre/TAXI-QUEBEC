# Taxi Québec - Replit Project Guide

## Overview

Taxi Québec is a Next.js-based taxi booking platform serving the Quebec City area. The application provides a customer-facing website for booking taxi rides, viewing service offerings, and managing user accounts. It features real-time address search using Mapbox, fare calculation based on official Taxi Québec rates, and route visualization on interactive maps.

Key functionality includes:
- Online ride booking with pickup/destination selection
- Real-time distance and fare estimation
- User authentication and dashboard
- Multi-language support (French/English)
- Multiple service types: standard taxi, airport transfers, adapted transport, and roadside assistance

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **Next.js 15** with App Router and TypeScript
- **Turbopack** enabled for faster development builds
- Server-side rendering with React Server Components (RSC) support

### UI Component System
- **shadcn/ui** components built on Radix UI primitives
- **Tailwind CSS** for styling with custom theme variables defined in `globals.css`
- **Framer Motion** for animations
- **Tabler Icons** and **Lucide React** for iconography

### State Management
- React Context for global state (Language, Booking)
- `useBooking` hook manages booking dialog state across the application
- `LanguageProvider` handles i18n with localStorage persistence

### Mapping & Geolocation
- **Mapbox GL JS** for map rendering and route visualization
- **Mapbox Search JS React** for address autocomplete
- Routes calculated via Mapbox Directions API
- Quebec City bounding box enforced for address searches

### Fare Calculation
- Custom fare logic in `src/lib/fare-utils.ts`
- Implements official Taxi Québec rates with day/night pricing
- Base fare + per-km rate + waiting time calculation

### Authentication
- **Supabase Auth** for user authentication
- SSR-compatible session handling via `@supabase/ssr`
- Middleware at `src/middleware.ts` manages session updates
- Protected dashboard routes under `/dashboard`

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication page
│   ├── dashboard/         # Protected user dashboard
│   └── page.tsx           # Homepage
├── components/
│   ├── sections/          # Page sections (hero, navigation, footer, etc.)
│   └── ui/                # Reusable UI components (shadcn/ui)
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities, Supabase client, translations
└── visual-edits/          # Development tooling for visual editing
```

### Key Design Patterns
- Component composition using Radix UI slot pattern
- Dynamic imports for map components (client-side only)
- Centralized translation object for all UI text
- CSS variables for theming (primary blue: #3b66d4)

## External Dependencies

### Third-Party Services
- **Supabase**: Authentication, database, and file storage
  - Auth configured in `src/lib/supabase/`
  - Assets hosted on Supabase Storage
- **Mapbox**: Geocoding, address search, directions API, and map tiles
  - Access token via `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` environment variable

### Required Environment Variables
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` - Mapbox API access
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

### Key NPM Packages
- `@supabase/supabase-js` and `@supabase/ssr` for backend integration
- `@mapbox/search-js-react` for address autocomplete
- `mapbox-gl` for map rendering
- `framer-motion` for animations
- `react-hook-form` with `@hookform/resolvers` for form handling
- `vaul` for drawer components
- `cmdk` for command palette functionality

### Database
- Supabase PostgreSQL with tables for user profiles, bookings, and notifications
- Drizzle ORM dependencies present but schema files not visible in provided contents

### External Media
- Video backgrounds hosted on Cloudflare R2
- Images and SVG assets on Supabase Storage