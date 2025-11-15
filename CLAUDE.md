# Luke Clark Personal Site - Project Documentation

This is a Next.js 15 personal blog using the App Router, MDX content, and Pinboard integration for link aggregation.

## Architecture Overview

**Framework**: Next.js 15 with App Router (not Pages Router)
**Language**: TypeScript 5.9 (strict mode enabled)
**Styling**: Tailwind CSS v4 + CSS Modules
**Content**: MDX with syntax highlighting via Shiki/rehype-pretty-code
**Node Version**: 24.x

### Core Concept: Mixed Content System

The site merges two content sources on the homepage, sorted chronologically:

1. **Blog Posts**: File-based MDX stored in `content/posts/[slug]/page.mdx`
2. **Curated Links**: External Pinboard bookmarks fetched via API (tagged with `site-feed`)

## Directory Structure

```
/Users/luke/Projects/lukeclark/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with analytics
│   ├── page.tsx                 # Homepage merging posts and pinboard links
│   ├── not-found.tsx            # 404 page
│   ├── global.css               # Global Tailwind CSS imports
│   └── posts/
│       └── [slug]/
│           ├── page.tsx         # Dynamic post page
│           └── post.module.css  # Post-specific styles
│
├── components/                   # Modular component library
│   ├── Bio/
│   ├── Card/
│   │   ├── Card.tsx             # Base card component
│   │   ├── PostCard/
│   │   └── PinCard/
│   ├── Code/
│   ├── CodeBlock/
│   ├── Link/
│   ├── VisuallyHidden/
│   └── Image/
│
├── lib/                          # Data fetching and business logic
│   ├── posts.ts                 # MDX post discovery and metadata parsing
│   └── pinboard.ts              # Pinboard API integration
│
├── util/                         # Utility functions
│   └── cn.ts                    # Class name utility (clsx + tailwind-merge)
│
├── content/
│   └── posts/
│       └── [slug]/
│           └── page.mdx         # Blog post content with metadata
│
├── Configuration:
│   ├── next.config.mjs          # MDX integration, bundle analyzer, redirects
│   ├── tailwind.config.js       # Custom typography and font sizing
│   ├── tsconfig.json            # Path aliases and strict mode
│   ├── mdx-components.tsx       # Custom MDX component mappings
│   ├── middleware.ts            # Pathname injection for post layout metadata
│   └── .env.local               # Environment variables (PINBOARD_AUTH)
```

## Key Conventions

### Component Organization

**Structure Pattern:**
```
components/[ComponentName]/
├── ComponentName.tsx
├── ComponentName.module.css (optional)
└── [assets]
```

**Code Conventions:**
- Use `React.FC<Props>` for functional components
- Always use **named exports** (not default exports)
- Props interfaces should be defined above the component
- Co-locate CSS modules with components

**Example:**
```tsx
interface CardProps {
  title: string;
  href: string;
  description?: string;
}

export const Card: React.FC<CardProps> = ({ title, href, description }) => {
  return <article className={cn('...')}>...</article>;
};
```

### Import Patterns

**Path Aliases** (defined in `package.json` and `tsconfig.json`):
```typescript
import { cn } from '#util/cn';
import { Bio } from '#components/Bio/Bio';
import { getAllPosts } from '#lib/posts';
```

**Convention**: Use absolute imports with aliases (avoid relative `./` paths in main files)

### Styling Approach

**Primary: Design Tokens + Tailwind CSS**
- Two-tier CSS custom property system (primitive + semantic tokens)
- Tailwind extended with token-based color/spacing utilities
- Custom font sizes: `sm` (16px/22px) to `xl` (26px/34px)
- Rose/pink accent colors via semantic tokens: `accent`, `accent-hover`
- Custom typography plugin with italic, uppercase, bold headings
- Automatic dark mode via `prefers-color-scheme` media query

**Secondary: CSS Modules**
- Component-specific scoped styles
- Use for complex layouts, masks, and media queries
- Co-locate with component files
- Reference CSS variables for colors, spacing, and typography

**Class Name Utility:**
```tsx
import { cn } from '#util/cn';

// Combines clsx with tailwind-merge to prevent Tailwind conflicts
<div className={cn('text-base', isActive && 'text-rose-600')} />
```

Always use the `cn` **named export** from `#util/cn` for conditional classes.

### Design Tokens & Dark Mode

**Architecture:**
Two-tier token system with CSS custom properties:
- **Primitive tokens**: Raw color values, spacing units, typography scales
- **Semantic tokens**: Purpose-based tokens that reference primitives

**Benefits:**
- Single source of truth for design values
- Easy theme switching (light/dark mode)
- Centralized color management
- Improved maintainability

**Token Structure:**
```css
:root {
  /* Primitives */
  --color-rose-600: #e11d48;
  --color-gray-500: #6b7280;
  --space-4: 1rem;

  /* Semantic tokens reference primitives */
  --color-accent: var(--color-rose-600);
  --color-text-muted: var(--color-gray-500);
  --container-padding: var(--space-4);
}
```

**Dark Mode:**
Automatic dark mode via `@media (prefers-color-scheme: dark)`:
- No toggle switch - respects OS preference
- Overrides semantic tokens only (not primitives)
- Zero JavaScript - pure CSS solution
- Instant theme switching

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-accent: var(--color-rose-500);  /* Brighter in dark mode */
    --color-bg-page: #1a1a1a;               /* Dark gray background */
    --color-text-primary: #e5e5e5;          /* Soft white text */
  }
}
```

**Component Utilities:**
Reusable utility classes for common patterns:
```css
.layout-container {
  @apply container mx-auto;
  padding-inline: var(--container-padding);
}

.text-meta {
  @apply text-sm uppercase;
  color: var(--color-text-muted);
}

.article-prose {
  @apply prose-lg lg:prose-xl mx-auto my-14;
}
```

**Tailwind Integration:**
Tokens are extended into Tailwind config for utility classes:
```javascript
colors: {
  accent: 'var(--color-accent)',
  'accent-hover': 'var(--color-accent-hover)',
  'text-muted': 'var(--color-text-muted)',
  'bg-page': 'var(--color-bg-page)',
}
```

This enables both CSS variables AND Tailwind utilities: `text-accent`, `bg-bg-page`, etc.

### Blog Posts Structure

**Location**: `content/posts/[slug]/page.mdx`

**Format:**
```tsx
export const metadata = {
  title: 'Post Title',
  date: '2023-01-01',
  description: 'Optional description',
};

# Your Post Content

Write your content here using MDX syntax.
```

**Processing:**
- Metadata extracted via dynamic `import()` in `lib/posts.ts`
- Posts auto-appear on homepage sorted by date (newest first)
- Syntax highlighting: Shiki with `github-dark` theme
- Markdown features: GitHub Flavored Markdown (remark-gfm)

### TypeScript Patterns

**Configuration Highlights:**
- Strict mode enabled
- Path aliases: `#components/*`, `#lib/*`, `#util/*`
- JSX preserved for Next.js compilation

**Type Conventions:**
```typescript
// Props extend interfaces
interface PostCardProps extends PostMetadata {}

// Async components in Next.js 15
interface PageProps {
  params: Promise<{ slug: string }>;
}

// Export types from lib files
export interface PostMeta {
  title: string;
  date: string;
  description?: string;
}
```

### MDX Configuration

**Custom Components** (`mdx-components.tsx`):
```typescript
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, ...props }) => <Link href={href as string} {...props} />,
    code: Code,
    pre: CodeBlock,
    ...components,
  };
}
```

**Processing Chain:**
- `remark-gfm`: GitHub-flavored markdown support
- `rehype-pretty-code`: Syntax highlighting with Shiki
- Theme: `github-dark`

## Development Workflows

### Local Development

```bash
pnpm dev              # Development server with Node inspector
pnpm build            # Production build
pnpm start            # Production server
pnpm lint             # ESLint with no cache
ANALYZE=true pnpm build  # Bundle analysis
```

### Adding New Blog Posts

1. Create `content/posts/[slug]/page.mdx`
2. Add metadata export with `title`, `date`, and optional `description`
3. Write content using MDX syntax
4. Posts automatically appear on homepage (sorted by date)
5. Add redirects in `next.config.mjs` if migrating existing URLs

**Static Generation:**
- Posts are pre-rendered at build time via `generateStaticParams()`
- Dynamic metadata generated per post via `generateMetadata()`
- SEO-friendly with Open Graph and Twitter cards

### Environment Variables

**Required** (`.env.local`):
```bash
PINBOARD_AUTH=username:token
```

Format: `username:token` for Pinboard API integration

## Data Flow

```
app/page.tsx
├─→ lib/posts.ts → getAllPosts() → MDX file discovery
├─→ lib/pinboard.ts → getAllPins() → Pinboard API
└─→ Merge + sort by date
    ├─→ PostCard component (blog posts)
    └─→ PinCard component (pinboard links)
```

## Critical Files

### Configuration
- `next.config.mjs`: MDX processing, redirects, bundle analysis
- `tailwind.config.js`: Custom font sizes and typography
- `tsconfig.json`: Path aliases and compiler options
- `mdx-components.tsx`: Custom MDX component mappings
- `middleware.ts`: Pathname injection for post layout metadata

### Libraries
- `lib/posts.ts`: Blog post discovery and metadata extraction
- `lib/pinboard.ts`: Pinboard API integration with `site-feed` tag filter

### Utilities
- `util/cn.ts`: Class name utility combining clsx + tailwind-merge

## Integration Points

- **Vercel Analytics**: Integrated via `@vercel/analytics/react`
- **Google Analytics**: Custom script in `app/layout.tsx` (GA_STRING)
- **Pinboard API**: Fetches recent posts tagged with `site-feed`
- **Middleware**: Adds pathname header for post metadata resolution

## Routing & Rendering

**Routes:**
- `/` → Homepage with merged content
- `/posts/[slug]` → Dynamic blog post pages
- `/*` → 404 page

**Rendering Strategy:**
- **Static Generation**: Blog posts pre-rendered at build time
- **Server Components**: All page components are async Server Components
- **Dynamic Metadata**: Per-page SEO metadata

**Redirects:**
Legacy URLs are redirected in `next.config.mjs` for backward compatibility.

## Notable Dependencies

- `react-wrap-balancer` (v1.1.1): Typography balancer
- `@vercel/analytics` (v1.5.0): Performance monitoring
- `clsx` (v2.1.1): Conditional class names
- `tailwind-merge` (v3.3.1): Prevent Tailwind conflicts
- `remark-gfm` (v4.0.1): GitHub-flavored markdown
- `shiki` (v3.9.2): Code syntax highlighting
- `rehype-pretty-code` (v0.14.1): Code block enhancement

## Project Boundaries

**IMPORTANT**: All work should be confined to the `/Users/luke/Projects/lukeclark/` directory. Never navigate up a level from the directory containing `package.json`.
