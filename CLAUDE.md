# Luke Clark Personal Site - Project Documentation

This is a Next.js 15 personal blog using the App Router, MDX content, and Pinboard integration for link aggregation.

## Architecture Overview

**Framework**: Next.js 15 with App Router (not Pages Router)
**Language**: TypeScript 5.9 (strict mode enabled)
**Styling**: Tailwind CSS v4 + CSS Modules + Style Dictionary v5
**Design Tokens**: Three-tier system (Options → Decisions → Components)
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
│   ├── InlineCode/
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

- Use JSDoc to describe stories, as it appears in VSCode and Storybook
- Don't use `React.FC<Props>` for functional components, prefer typing the component directly.
- Always use **named exports** (not default exports)
- Props interfaces should be defined above the component
- Co-locate CSS modules with components
- **All components MUST have Storybook stories, and tests using Storybook** (see Storybook Stories section below)

**Example:**

```tsx
interface CardProps {
  title: string;
  href: string;
  description?: string;
}

export const Card = ({ title, href, description }: CardProps) => {
  return <article className={cn("...")}>...</article>;
};
```

### Storybook Stories

**MANDATORY**: All components must have accompanying Storybook stories co-located in the component directory.

**Format**: CSF (Next) - Component Story Format using factory functions
**Location**: `components/[ComponentName]/[ComponentName].stories.tsx` (use `.tsx` for JSX, `.ts` for plain TypeScript)

**Structure Pattern:**

```
components/[ComponentName]/
├── ComponentName.tsx
├── ComponentName.stories.tsx   # Required for all components (.tsx if using JSX)
└── ComponentName.module.css    # Optional
```

**Story File Template:**

```typescript
import preview from "#.storybook/preview";
import { ComponentName } from "./ComponentName";

const meta = preview.meta({
  component: ComponentName,
  // Optional: Add parameters, decorators, tags
  // parameters: { layout: 'centered' },
});

/** Primary story, use JSDoc here */
export const Primary = meta.story({
  args: {
    // Component props here
    title: "Example Title",
    description: "Example description",
  },
});

/** Additional variants using .extend(), use JSDoc here */
export const WithoutDescription = Primary.extend({
  args: {
    description: undefined,
  },
});
```

**Key Conventions:**

- Import `preview` from `.storybook/preview` (not `.storybook/preview.ts`)
- Use `preview.meta()` to create component metadata (provides type safety)
- Use `meta.story()` to define individual stories (not default exports)
- Story names use PascalCase (e.g., `Primary`, `WithoutDescription`)
- Create variants with `.extend()` for related story variations
- All stories auto-generate documentation via `autodocs` tag

**Story Composition:**

```typescript
// Extend existing stories to create variants
export const Disabled = Primary.extend({
  args: {
    disabled: true,
  },
});

// Access composed properties (merged from story + meta + preview)
// Use Primary.composed.args instead of Primary.args
```

**Configuration:**

- **Framework**: `@storybook/nextjs-vite` (Vite-based Next.js integration)
- **Addons**: Docs, A11y (accessibility testing), Vitest
- **Global Styles**: Automatically imported via `app/global.css` in preview
- **Accessibility**: Set to `"todo"` mode (shows violations in UI, doesn't fail CI)

**Component Testing:**

All component tests are written using Storybook's test framework, which integrates seamlessly with stories.

**Testing Philosophy:**

- Stories serve as both documentation and smoke tests
- Tests use real browser rendering with user interaction simulation
- Tests are co-located with stories in the same file
- Automatic Vitest integration for CI/CD

**Test Syntax (CSF Next):**

```typescript
export const InteractiveExample = meta.story({
  args: {
    onClick: fn(), // Use fn() from storybook/test for spies
    disabled: false,
  },
});

// Attach tests directly to stories using .test()
InteractiveExample.test(
  "should handle click events",
  async ({ canvas, userEvent, args }) => {
    const button = await canvas.findByRole("button");
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
);

InteractiveExample.test("should be accessible", async ({ canvas }) => {
  const button = await canvas.findByRole("button");
  await expect(button).toHaveAccessibleName();
});
```

**Test Function Parameters:**

- `canvas` - Query methods for the rendered story (e.g., `canvas.findByRole()`, `canvas.getByText()`)
- `userEvent` - User interaction simulation (e.g., `userEvent.click()`, `userEvent.type()`)
- `args` - Access to story arguments for assertions

**Testing Patterns:**

```typescript
import { fn, expect } from "storybook/test";

// 1. Render Tests - Verify component renders in various states
export const EmptyState = meta.story({
  args: { items: [] },
});

// 2. Interaction Tests - Simulate user behavior
export const WithInteraction = meta.story({
  args: { onSubmit: fn() },
});

WithInteraction.test(
  "should submit form",
  async ({ canvas, userEvent, args }) => {
    const input = await canvas.findByRole("textbox");
    await userEvent.type(input, "Hello");

    const submit = await canvas.findByRole("button", { name: /submit/i });
    await userEvent.click(submit);

    await expect(args.onSubmit).toHaveBeenCalledWith("Hello");
  },
);

// 3. Accessibility Tests - Ensure WCAG compliance (automatic via addon-a11y)
// 4. Visual Tests - Compare snapshots (handled by Chromatic/other tools)
```

**Key Testing Utilities:**

- `fn()` from `storybook/test` - Creates spy functions for callbacks
- `expect()` from `storybook/test` - Assertion library
- `canvas.findBy*()` - Async queries that wait for elements
- `canvas.getBy*()` - Sync queries that throw if not found
- `userEvent.*` - Simulates user interactions (click, type, hover, etc.)

**Watch Mode & TDD:**

```bash
pnpm test-storybook --watch  # Run tests in watch mode for TDD workflow
```

**CI/CD Integration:**
Stories automatically transform into Vitest tests. The addon-vitest integration means tests run in CI without additional configuration.

**Running Storybook:**

```bash
pnpm storybook          # Start Storybook dev server
pnpm build-storybook    # Build static Storybook
pnpm test-storybook     # Run all component tests
```

**Reference Example:**
See [components/Card/Card.stories.tsx](components/Card/Card.stories.tsx) for a comprehensive working example with multiple stories and tests.

### Import Patterns

**Path Aliases** (defined in `package.json` and `tsconfig.json`):

```typescript
import { cn } from "#util/cn";
import { Bio } from "#components/Bio/Bio";
import { getAllPosts } from "#lib/posts";
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
import { cn } from "#util/cn";

// Combines clsx with tailwind-merge to prevent Tailwind conflicts
<div className={cn("text-base", isActive && "text-rose-600")} />;
```

Always use the `cn` **named export** from `#util/cn` for conditional classes.

### Design Tokens - Three-Tier System

**Powered by Style Dictionary v5**

The project uses a three-tier token architecture inspired by [Sam Iam's approach](https://samiamdesigns.substack.com/p/a-new-approach-to-naming-design-tokens):

**Tier 1: Options** (`tokens/options/`)

- Raw design values: colors, spacing, typography, layout
- Examples: `colors.rose.600`, `spacing.4`, `typography.fontSize.title.fluid`

**Tier 2: Decisions** (`tokens/decisions/`)

- Purpose-based tokens with clear semantic meaning
- Front-loaded context for readability
- Examples: `brand-color.primary`, `content.text.body`, `layout.container.padding`

**Tier 3: Components** (Future)

- Component-specific tokens (not yet implemented)
- Would reference Tier 2 decisions
- Examples: `button.primary.bg-color`

**Token Naming Philosophy:**

```json
// Tier 1: Options (raw values)
{
  "colors": {
    "rose": {
      "600": { "value": "#e11d48" }
    }
  }
}

// Tier 2: Decisions (semantic intent with default/inverse)
{
  "brand-color": {
    "primary": {
      "default": { "value": "{colors.rose.600}" },
      "inverse": { "value": "{colors.rose.500}" }
    }
  }
}
```

**Generated CSS Variables:**

```css
/* Light mode (default) */
:root {
  --colors-rose-600: #e11d48;
  --brand-color-primary: var(--colors-rose-600);
  --content-text-body: var(--colors-base-black);
  --layout-container-padding: var(--spacing-4);
}

/* Dark mode (inverse - auto-generated) */
@media (prefers-color-scheme: dark) {
  :root {
    --brand-color-primary: var(--colors-rose-500);
    --content-text-body: var(--colors-gray-200);
    --content-bg-page: var(--colors-dark-bg);
  }
}
```

**Dark Mode Strategy:**

Single source with `default/inverse` variants instead of separate light/dark files:

- One token file defines both themes
- Build process automatically generates light and dark CSS
- Dark mode wraps inverse variants in `@media (prefers-color-scheme: dark)`
- No JavaScript - pure CSS solution

**Building Tokens:**

```bash
pnpm tokens          # Manual build
pnpm dev            # Auto-builds tokens first
pnpm build          # Auto-builds tokens first
```

**Generated Outputs:**

- `generated/tokens/variables-light.css` - Light mode CSS custom properties
- `generated/tokens/variables-dark.css` - Dark mode overrides with media query
- `generated/tokens/tokens.ts` - TypeScript constants
- `generated/tokens/tokens.d.ts` - TypeScript type definitions
- `generated/tokens/tokens-metadata.json` - Storybook documentation

**Tailwind Integration:**

Tokens are extended into Tailwind config for utility classes:

```javascript
colors: {
  accent: 'var(--brand-color-primary)',
  'accent-hover': 'var(--brand-color-primary-hover)',
  'text-primary': 'var(--content-text-body)',
  'text-muted': 'var(--content-text-muted)',
  'bg-page': 'var(--content-bg-page)',
}
```

This enables both CSS variables AND Tailwind utilities: `text-accent`, `bg-bg-page`, etc.

**Component Utilities:**

Reusable utility classes for common patterns:

```css
.layout-container {
  @apply container mx-auto;
  padding-inline: var(--layout-container-padding);
}

.text-meta {
  @apply text-sm uppercase;
  color: var(--content-text-muted);
}

.article-prose {
  @apply prose-lg lg:prose-xl mx-auto my-14;
}
```

**Documentation:**

- See `tokens/README.md` for complete token system documentation
- See `DESIGN-TOKENS-MIGRATION.md` for migration guide and architecture details
- View tokens in Storybook under "Design Tokens" section

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
    Code,
    ...components,
  };
}
```

**Processing Chain:**

- `remark-gfm`: GitHub-flavored markdown support
- `remarkCodeHike`: CodeHike MDX processing
- `recmaCodeHike`: CodeHike recma transformations

### CodeHike Integration

**Code Highlighting**: CodeHike v1 (replaces rehype-pretty-code/Shiki)

**Features:**

- Syntax highlighting with annotation support
- Custom React Server Components for code enhancements
- Design token integration for theming
- Interactive code features (callouts, diffs, focus, etc.)

**Annotation Syntax:**

Annotations use comments to mark code for special rendering:

```js
// !border(1:3) #e11d48
// !highlight[greeting]
const greeting = "Hello";
console.log(greeting);
```

**Available Annotations:**

- `border(lines) color` - Colored border around lines (e.g., `// !border(1:3) #e11d48`)
- `highlight(lines)` or `highlight[range]` - Background highlight (e.g., `// !highlight(2:4)`)
- `focus(lines)` - Dim non-focused lines (e.g., `// !focus(2:3)`)
- `mark(line)` - Left-side marker for important lines (e.g., `// !mark(5)`)
- `callout[range] "message"` - Tooltip on hover (e.g., `// !callout[greeting] "The greeting variable"`)
- `diff(line) +/-` - Show added/removed lines (e.g., `// !diff(1) +`)
- `collapse(lines) "label"` - Collapsible code sections

**Metadata Attributes:**

Add metadata after the language identifier:

````markdown
```js title="example.js" showLineNumbers
const greeting = "Hello";
```
````

**Component Architecture:**

```
components/Code/Code.tsx   # Main code block component (Pre wrapper)
components/InlineCode/InlineCode.tsx              # Inline code component
lib/codehike-handlers.ts              # Annotation handlers
lib/codehike-theme.ts                 # Theme mapping to design tokens
```

**Theme System:**

CodeHike integrates with design tokens via CSS custom properties:

- `--ch-bg` → `--colors-code-bg`
- `--ch-fg` → `--colors-base-white`
- `--ch-border-color` → `--brand-color-primary`
- `--ch-highlight-bg` → `--brand-color-primary`

All CodeHike colors automatically support dark mode via design tokens.

**Creating Custom Handlers:**

Add new handlers to `lib/codehike-handlers.ts`:

```typescript
export const myHandler: AnnotationHandler = {
  name: "myAnnotation",
  Block: ({ annotation, children }) => (
    <div className="...">{children}</div>
  ),
};

// Add to handlers array
export const handlers = [...existingHandlers, myHandler];
```

**Testing:**

All annotation handlers must have Storybook stories demonstrating:

- Basic usage
- With query parameters
- Combined with other annotations
- Accessibility compliance

See `components/Code/Code.stories.tsx` for examples.

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
