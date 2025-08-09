# Luke Clark Personal Site - AI Coding Instructions

This is a Next.js 13+ personal blog using the App Router, MDX content, and Pinboard integration for link aggregation.

## Architecture Overview

- **Mixed Content System**: Merges blog posts (`app/posts/*/page.mdx`) with Pinboard links (`lib/pinboard.ts`) on homepage, sorted chronologically
- **File-based Routing**: Blog posts live in `app/posts/[slug]/page.mdx` with metadata exports
- **Component Library**: Modular components in `app/components/` with co-located CSS modules
- **MDX Processing**: Custom components via `mdx-components.tsx` with syntax highlighting (rehype-pretty-code, Shiki)

## Key Patterns

### Blog Posts Structure

```tsx
// app/posts/my-post/page.mdx
export const metadata = {
  title: 'Post Title',
  date: '2023-01-01',
  description: 'Optional description',
};
```

### Component Organization

- Components live in `app/components/[ComponentName]/ComponentName.tsx`
- CSS modules: `ComponentName.module.css`
- Use `clsx` for conditional classes, combine with Tailwind utilities

### Content Aggregation

The homepage (`app/page.tsx`) merges:

- Blog posts from `lib/posts.ts` (MDX metadata parsing)
- Pinboard links from `lib/pinboard.ts` (API integration with `site-feed` tag)

### Styling Approach

- **Tailwind**: Utility-first with custom config in `tailwind.config.js`
- **Typography**: Custom headings (italic, uppercase, bold) via `@tailwindcss/typography`
- **Font sizing**: Custom scale (18px base, up to 26px xl)
- **CSS Modules**: For component-specific styles alongside Tailwind

## Development Workflows

### Local Development

```bash
pnpm dev              # Development server with Node inspector
pnpm build            # Production build
ANALYZE=true pnpm build  # Bundle analysis
```

### Adding New Posts

1. Create `app/posts/[slug]/page.mdx`
2. Add metadata export with title, date, description
3. Posts auto-appear on homepage (sorted by date)
4. Add redirects in `next.config.mjs` if migrating existing URLs

### Environment Variables

- `PINBOARD_AUTH`: Required for Pinboard API integration (format: `username:token`)

## Integration Points

- **Vercel Analytics**: Integrated via `@vercel/analytics/react`
- **Google Analytics**: Custom script in `app/layout.tsx`
- **Pinboard API**: Fetches recent posts with `site-feed` tag
- **Middleware**: Adds pathname header for post metadata resolution

## Critical Files

- `lib/posts.ts`: Blog post discovery and metadata extraction
- `mdx-components.tsx`: Custom MDX component mappings
- `next.config.mjs`: MDX processing, redirects, bundle analysis
- `middleware.ts`: Pathname injection for post layout metadata
