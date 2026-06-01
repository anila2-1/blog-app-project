# Blog Application - Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Supported Languages](#supported-languages)
4. [How to Change Language](#how-to-change-language)
5. [Project Structure](#project-structure)
6. [Features](#features)
7. [Installation & Setup](#installation--setup)
8. [Deployment](#deployment)

---

## Project Overview

This is a full-featured **Blog Application** built with modern web technologies. It includes a content management system (CMS) for managing blog posts, categories, and media, along with a responsive frontend for displaying content to visitors.

**Current Version:** 1.0.0

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.0.10 | React framework for frontend & SSR |
| **React** | 19.1.0 | UI library |
| **Tailwind CSS** | 4.1.15 | Styling framework |
| **MUI (Material UI)** | 7.3.5 | UI component library |
| **Radix UI** | Various | Accessible UI primitives |

### Backend / CMS
| Technology | Version | Purpose |
|------------|---------|---------|
| **Payload CMS** | 3.68.5 | Headless CMS & API |
| **MongoDB** | Via Mongoose | Database |
| **Node.js** | 24.x | Runtime environment |

### Development Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| **TypeScript** | 5.7.3 | Type-safe JavaScript |
| **pnpm** | 10.x | Package manager |
| **Playwright** | 1.54.1 | End-to-end testing |
| **Vitest** | 3.2.3 | Unit & integration testing |
| **ESLint** | 9.16.0 | Code linting |
| **Prettier** | 3.4.2 | Code formatting |

### Additional Plugins & Libraries
- `@payloadcms/richtext-lexical` - Rich text editor
- `@payloadcms/plugin-seo` - SEO management
- `@payloadcms/storage-vercel-blob` - Cloud storage
- `lucide-react` - Icon library
- `react-hook-form` - Form handling
- `graphql` - API queries

---

## Supported Languages

The application supports **4 languages** with full localization:

| Code | Language | Direction | Font | Locale |
|------|----------|-----------|------|--------|
| `en` | English | LTR (Left-to-Right) | Outfit | en-US |
| `he` | Hebrew | **RTL** (Right-to-Left) | DavidLibre-Bold | he-IL |
| `hr` | Croatian | LTR | Roboto | hr-HR |
| `tr` | Turkish | LTR | Outfit | tr-TR |

### Language Files Location
- CSS files: `public/lang/` directory
  - `public/lang/en.css` - English styles
  - `public/lang/he.css` - Hebrew styles
  - `public/lang/hr.css` - Croatian styles
  - `public/lang/tr.css` - Turkish styles
- Configuration: [`src/config/languages.ts`](src/config/languages.ts)

---

## How to Change Language

### Changing Default Language (Frontend & Backend)

The default language is controlled by an environment variable. To change the language:

#### Step 1: Update Environment Variable
Edit your `.env` file and set:

```bash
# For English
NEXT_PUBLIC_DEFAULT_LANG=en

# For Hebrew (RTL)
NEXT_PUBLIC_DEFAULT_LANG=he

# For Croatian
NEXT_PUBLIC_DEFAULT_LANG=hr

# For Turkish
NEXT_PUBLIC_DEFAULT_LANG=tr
```

#### Step 2: Restart Development Server
```bash
pnpm dev
```

### Adding a New Language

To add a new language to the system:

#### Step 1: Update Language Configuration
Edit [`src/config/languages.ts`](src/config/languages.ts):

```typescript
export type LanguageCode = 'en' | 'he' | 'hr' | 'tr' | 'NEW_CODE'

export const languages: LanguageConfig[] = [
  // ... existing languages
  {
    name: 'Your Language',
    code: 'NEW_CODE',
    direction: 'ltr', // or 'rtl' for RTL languages
    font: 'Your Font, sans-serif',
    locale: 'your-LOCALE',
    css: '/lang/your-lang.css',
  },
]
```

#### Step 2: Create Language CSS File
Create `public/lang/your-lang.css`:

```css
/* public/lang/your-lang.css */
body {
  font-family: var(--font-body);
}

h1, h2, h3 {
  font-family: var(--font-heading);
}
```

#### Step 3: Add to Payload CMS
Update [`src/payload.config.ts`](src/payload.config.ts) to include the new locale in the localization config:

```typescript
localization: {
  locales: [
    {
      label: 'Your Language',
      code: 'NEW_CODE',
      rtl: false, // true for RTL languages
    },
  ],
  defaultLocale: 'NEW_CODE',
  fallback: true,
},
```

#### Step 4: Update Translations
Add translations in [`Navbar1.tsx`](src/app/(frontend)/components/Navbar/Navbar1.tsx):

```typescript
const translations = {
  // ... existing
  NEW_CODE: {
    home: 'Home Translation',
    search: 'Search Translation',
    siteName: 'Site Name Translation',
    // ... more translations
  },
}
```

---

## Project Structure

```
blog-app/
├── public/
│   ├── lang/              # Language-specific CSS files
│   │   ├── en.css
│   │   ├── he.css
│   │   ├── hr.css
│   │   └── tr.css
│   ├── media/             # Static media files
│   └── fonts/             # Custom fonts
├── src/
│   ├── app/
│   │   ├── (frontend)/    # Frontend pages
│   │   │   ├── components/
│   │   │   │   ├── Navbar/
│   │   │   │   ├── Footer/
│   │   │   │   ├── CategoryCards/
│   │   │   │   ├── FeaturedPost/
│   │   │   │   ├── LatestPosts/
│   │   │   │   └── ...
│   │   │   ├── Home/
│   │   │   ├── posts/
│   │   │   ├── categories/
│   │   │   ├── [slug]/    # Dynamic post pages
│   │   │   └── ...
│   │   ├── (payload)/     # CMS Admin area
│   │   │   ├── admin/     # Payload admin panel
│   │   │   └── api/       # API routes
│   │   └── api/           # Custom API routes
│   ├── blocks/            # Custom Payload blocks
│   │   ├── Banner/
│   │   ├── CallToAction/
│   │   ├── Code/
│   │   ├── Content/
│   │   ├── MediaBlock/
│   │   └── VideoBlock/
│   ├── collections/       # CMS Collections
│   │   ├── Posts/
│   │   ├── Categories/
│   │   ├── Media/
│   │   └── Users/
│   ├── components/        # Shared React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── RichText/
│   │   └── Link/
│   ├── config/            # Configuration files
│   │   └── languages.ts   # Language configuration
│   ├── fields/            # Custom Payload fields
│   ├── globals/           # CMS Global settings
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript types
├── tests/                 # Test files
│   ├── e2e/               # Playwright tests
│   └── int/               # Vitest tests
├── package.json
├── next.config.mjs
├── payload.config.ts      # CMS configuration
├── tailwind.config.js
└── tsconfig.json
```

---

## Features

### Content Management
- **Posts Collection** - Create, edit, and manage blog posts
- **Categories** - Organize posts by category
- **Media Library** - Upload and manage images/videos
- **Users** - Admin user management
- **Draft/Version Control** - Save drafts before publishing

### SEO Features
- Auto-generated meta titles and descriptions
- Custom SEO settings per post
- Sitemap generation (`/sitemap.xml`)
- News sitemap (`/news-sitemap.xml`)

### Analytics & Monetization
- **Google Analytics 4** integration
- **Google AdSense** support

### Frontend Features
- Responsive design (mobile-friendly)
- RTL support for Hebrew
- Dynamic post pages with categories
- Search functionality
- Featured and pinned posts
- Related posts suggestions
- Most viewed posts
- Latest posts display

### Developer Features
- TypeScript support
- Hot reload development
- Docker support
- E2E and unit testing

---

## Installation & Setup

### Prerequisites
- Node.js 24.x
- pnpm 9.x or 10.x
- MongoDB (local or Atlas)

### Quick Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd blog-app

# 2. Copy environment file
cp .env.example .env

# 3. Install dependencies
pnpm install

# 4. Start development server
pnpm dev
```

### Environment Variables

Create a `.env` file with:

```bash
# Required
NEXT_PUBLIC_DEFAULT_LANG=en
DATABASE_URI=mongodb://localhost:27017/blog-app
PAYLOAD_SECRET=your-secret-key

# Optional - Google Analytics
GA_ENABLED=true
GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional - AdSense
ADSENSE_ENABLED=true
ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXX
```

### Docker Setup (Optional)

```bash
docker-compose up -d
```

This will start MongoDB locally on port 27017.

---

## Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run all tests |
| `pnpm test:e2e` | Run E2E tests only |
| `pnpm test:int` | Run integration tests |

---

## Deployment

### Vercel (Recommended)
1. Connect repository to Vercel
2. Configure environment variables
3. Deploy with automatic builds

### Docker
```bash
# Build Docker image
docker build -t blog-app .

# Run container
docker run -p 3000:3000 blog-app
```

### Build for Production
```bash
pnpm build
pnpm start
```

---

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/[...slug]` | Dynamic API route |
| `/api/graphql` | GraphQL API |
| `/api/increment-view` | Track post views |
| `/sitemap.xml` | SEO sitemap |
| `/news-sitemap.xml` | Google News sitemap |

---

## License

MIT License

---

*This documentation was generated for the Blog Application project. For support, refer to the project repository.*
