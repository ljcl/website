# Design Tokens & CSS Optimization - Design Document

**Date:** 2025-11-15
**Status:** Approved
**Approach:** CSS Custom Properties + Extended Tailwind

## Overview

This design establishes a design token system using CSS custom properties integrated with Tailwind CSS v4. The goal is to improve consistency, performance, and developer experience across the personal blog site while maintaining the existing Tailwind + CSS Modules architecture.

## Current State Analysis

**Existing Architecture:**
- Next.js 15 App Router with TypeScript
- Tailwind CSS v4 with custom font sizing and typography plugin
- CSS Modules for complex patterns (masks, responsive layouts, code blocks)
- Mixed utility and module approach

**Identified Patterns:**
- Color usage: `rose-500/600` for accents, `gray-500/700` for muted text
- Layout pattern: `container mx-auto px-4` repeated 6+ times
- Typography pattern: `text-gray-500 text-sm uppercase` for metadata (4 occurrences)
- Article wrapper: `prose-lg lg:prose-xl mx-auto my-14`
- Hard-coded values in CSS Modules: `#0d1116`, `clamp(1rem, 8vw, 6rem)`, `-6rem` breakouts

## Design Token System

### Two-Tier Token Structure

**Primitive Tokens** - Raw values in `app/global.css`:
```css
:root {
  /* Color primitives */
  --color-rose-500: #f43f5e;
  --color-rose-600: #e11d48;
  --color-gray-500: #6b7280;
  --color-gray-700: #374151;
  --color-white: #ffffff;
  --color-code-bg: #0d1116;

  /* Spacing primitives */
  --space-4: 1rem;
  --space-12: 3rem;
  --space-14: 3.5rem;
  --space-breakout: -6rem;

  /* Typography primitives */
  --font-size-title-fluid: clamp(1rem, 8vw, 6rem);

  /* Layout primitives */
  --container-max-width-narrow: 95%;
}
```

**Semantic Tokens** - Intent-based tokens:
```css
:root {
  /* Brand & UI colors */
  --color-accent: var(--color-rose-600);
  --color-accent-hover: var(--color-rose-500);
  --color-text-muted: var(--color-gray-500);
  --color-text-secondary: var(--color-gray-700);

  /* Code block theming */
  --color-code-badge-bg: rgba(0, 0, 0, 0.2);
  --color-code-badge-text: hsla(0, 0%, 100%, 0.5);

  /* Layout tokens */
  --container-padding: var(--space-4);
  --section-spacing: var(--space-14);
  --breakout-margin: var(--space-breakout);
}
```

### Tailwind Integration

Extend `tailwind.config.js` to reference CSS variables:

```js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    fontSize: {
      sm: ["16px", "22px"],
      base: ["18px", "26px"],
      lg: ["22px", "30px"],
      xl: ["26px", "34px"],
    },
    extend: {
      colors: {
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'text-muted': 'var(--color-text-muted)',
        'text-secondary': 'var(--color-text-secondary)',
      },
      spacing: {
        'container-padding': 'var(--container-padding)',
        'section': 'var(--section-spacing)',
      },
      typography: {
        xl: typographyBlock,
        lg: typographyBlock,
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
```

### CSS Module Token Usage

CSS Modules reference the same variables:

```css
/* CodeBlock.module.css */
.pre {
  color: var(--color-white);
  background: var(--color-code-bg);
}

.languageIdClasses {
  color: var(--color-code-badge-text);
  background: var(--color-code-badge-bg);
}

/* post.module.css */
.title {
  font-size: var(--font-size-title-fluid);
}

@media (min-width: 768px) {
  .title {
    max-width: var(--container-max-width-narrow);
  }
}
```

## CSS Optimization Strategies

### 1. Component Utility Classes

Create reusable pattern classes in `app/global.css`:

```css
@layer components {
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
}
```

**Usage transformation:**
```tsx
// Before:
<section className="container mx-auto px-4">

// After:
<section className="layout-container">
```

### 2. Tailwind Content Configuration

Remove unused path patterns to improve build performance:

```js
// Before:
content: [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",  // Not using Pages Router
  "./components/**/*.{js,ts,jsx,tsx}",
]

// After:
content: [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./content/**/*.mdx",  // Include MDX for prose detection
]
```

### 3. Color Reference Migration

Update hardcoded color values to semantic tokens:

**Components affected:**
- `components/Link/Link.tsx` - `text-rose-600` → `text-accent`
- `components/Card/Card.tsx` - `group-hover:text-rose-500` → `group-hover:text-accent-hover`
- `app/not-found.tsx` - `text-gray-500` → `text-text-muted`
- `app/posts/[slug]/page.tsx` - `text-gray-500` → `text-text-muted`

**CSS Modules affected:**
- `components/CodeBlock/CodeBlock.module.css` (4 values)
- `app/posts/[slug]/post.module.css` (2 values)

## Migration Strategy

### Phase 1: Establish Tokens (Non-Breaking)

1. Add CSS variables to `app/global.css`
2. Extend `tailwind.config.js` with new color/spacing utilities
3. Build and verify no visual changes
4. Run `pnpm build` to ensure compilation succeeds

**Files modified:**
- `app/global.css` (add CSS variables)
- `tailwind.config.js` (extend theme)

**Success criteria:**
- Build completes without errors
- No visual regressions on homepage, post pages, 404

### Phase 2: Migrate High-Impact Patterns

1. Update color references in components (6-8 files)
2. Migrate CSS Modules to use CSS variables (4 files)
3. Test each file individually after migration

**Files modified:**
- `components/Link/Link.tsx`
- `components/Card/Card.tsx`
- `components/CodeBlock/CodeBlock.tsx`
- `components/CodeBlock/CodeBlock.module.css`
- `app/not-found.tsx`
- `app/posts/[slug]/page.tsx`
- `app/posts/[slug]/post.module.css`

**Success criteria:**
- All color values reference tokens
- CSS Modules use CSS variables
- Visual parity maintained

### Phase 3: Add Component Utilities

1. Create `.layout-container`, `.text-meta`, `.article-prose` utilities
2. Replace inline class chains with component classes
3. Update Tailwind content config to remove `./pages/**`

**Files modified:**
- `app/global.css` (add component utilities)
- `tailwind.config.js` (update content paths)
- `app/layout.tsx` (use `.layout-container`)
- `components/Bio/Bio.tsx` (use `.layout-container`)
- `app/page.tsx` (use `.layout-container`)
- `app/not-found.tsx` (use `.text-meta`, `.article-prose`)
- `app/posts/[slug]/page.tsx` (use `.text-meta`, `.article-prose`)

**Success criteria:**
- Repeated patterns consolidated into utilities
- Build time maintains or improves
- Bundle size maintains or decreases

## Validation Checklist

- [ ] `pnpm build` completes without errors
- [ ] Visual regression test: homepage matches before/after
- [ ] Visual regression test: post page matches before/after
- [ ] Visual regression test: 404 page matches before/after
- [ ] Dev tools show no unused CSS warnings
- [ ] Bundle size comparison (should be ≤ baseline)
- [ ] Developer can use new utilities (`text-accent`, `.layout-container`)

## File Organization

```
/Users/luke/Projects/lukeclark/
├── app/
│   └── global.css           # CSS variables + component utilities
├── tailwind.config.js        # Extended with token references
└── components/
    └── [component]/
        └── *.module.css      # Uses var(--token-name)
```

## Benefits

**Consistency:**
- Single source of truth for colors, spacing, typography
- Semantic naming makes intent clear
- Changes propagate across Tailwind and CSS Modules

**Performance:**
- Native CSS variables (no runtime cost)
- Tailwind tree-shaking still works
- Reduced surface area in content scanning
- Component utilities reduce repeated class chains

**Developer Experience:**
- Semantic utilities easier to remember than specific values
- Tokens work in both Tailwind and CSS Modules
- Incremental migration path (no big-bang rewrite)
- Future theming/dark mode easier to implement

## Future Considerations

- **Dark mode**: CSS variables make theme switching trivial
- **Additional semantic tokens**: Add as patterns emerge
- **Component library**: Utilities can be extracted and documented
- **Design system**: Can evolve into formal design system if needed
