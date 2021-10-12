# Design Tokens & CSS Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement CSS custom properties (design tokens) integrated with Tailwind v4 to improve consistency, performance, and developer experience.

**Architecture:** Two-tier token system (primitive + semantic) defined in CSS custom properties, extended into Tailwind config for utilities, and referenced in CSS Modules. Incremental migration in three phases to ensure zero visual regressions.

**Tech Stack:** Next.js 15, Tailwind CSS v4, CSS Modules, TypeScript 5.9

---

## Phase 1: Establish Tokens (Non-Breaking)

### Task 1: Add CSS Custom Properties to global.css

**Files:**
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/global.css`

**Step 1: Read current global.css**

```bash
cat app/global.css
```

Expected: See Tailwind imports only

**Step 2: Add primitive and semantic tokens**

Add after the existing imports:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@config "../tailwind.config.js";

/* ============================================
   Design Tokens
   ============================================ */

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

  /* Semantic tokens - Brand & UI colors */
  --color-accent: var(--color-rose-600);
  --color-accent-hover: var(--color-rose-500);
  --color-text-muted: var(--color-gray-500);
  --color-text-secondary: var(--color-gray-700);

  /* Semantic tokens - Code block theming */
  --color-code-badge-bg: rgba(0, 0, 0, 0.2);
  --color-code-badge-text: hsla(0, 0%, 100%, 0.5);

  /* Semantic tokens - Layout */
  --container-padding: var(--space-4);
  --section-spacing: var(--space-14);
  --breakout-margin: var(--space-breakout);
}
```

**Step 3: Verify file was updated**

```bash
grep -A 5 "Design Tokens" app/global.css
```

Expected: See the token definitions

**Step 4: Commit**

```bash
git add app/global.css
git commit -m "feat: add CSS custom properties for design tokens

Add two-tier token system (primitive + semantic) to global.css.
Establishes single source of truth for colors, spacing, typography.
Non-breaking change - tokens defined but not yet used.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 2: Extend Tailwind Config with Token References

**Files:**
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/tailwind.config.js`

**Step 1: Read current tailwind config**

```bash
cat tailwind.config.js
```

Expected: See existing fontSize, typography, screens config

**Step 2: Add token-based colors and spacing to theme.extend**

Update the `extend` section:

```js
const typographyHeadings = {
  fontStyle: "italic",
  textTransform: "uppercase",
  fontWeight: "bold",
};

const typographyBlock = {
  css: {
    h1: typographyHeadings,
    h2: typographyHeadings,
    h3: typographyHeadings,
    h4: typographyHeadings,
    h5: typographyHeadings,
    h6: typographyHeadings,
  },
};

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

**Step 3: Update content paths (remove ./pages)**

Note: The content array has been updated to remove `./pages/**` and add `./content/**/*.mdx`

**Step 4: Verify config was updated**

```bash
grep -A 10 "extend:" tailwind.config.js | grep -E "(accent|text-muted|container-padding)"
```

Expected: See color and spacing tokens

**Step 5: Build to verify no errors**

```bash
pnpm build
```

Expected: Build completes successfully with same output as baseline

**Step 6: Commit**

```bash
git add tailwind.config.js
git commit -m "feat: extend Tailwind config with CSS variable references

Add token-based colors (accent, accent-hover, text-muted, text-secondary)
and spacing utilities. Update content paths to remove unused ./pages
and add ./content/**/*.mdx for MDX prose detection.

Non-breaking - new utilities available but existing code unchanged.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 3: Visual Verification of Phase 1

**Step 1: Start dev server**

```bash
pnpm dev
```

**Step 2: Manual verification**

Visit:
- http://localhost:3000 (homepage)
- http://localhost:3000/posts/migrating-the-platform-that-powers-abc-sites-to-typescript (sample post)
- http://localhost:3000/invalid-route (404 page)

Expected: All pages look identical to baseline - no visual changes

**Step 3: Stop dev server**

```bash
# Ctrl+C
```

**Step 4: Production build verification**

```bash
pnpm build
```

Expected:
- Build completes without errors
- Same number of static pages as baseline
- No new warnings

---

## Phase 2: Migrate High-Impact Patterns

### Task 4: Migrate Link Component Colors

**Files:**
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/components/Link/Link.tsx:27`

**Step 1: Read current Link component**

```bash
cat components/Link/Link.tsx
```

Expected: See `text-rose-600 hover:text-rose-500` on line 27

**Step 2: Replace rose colors with semantic tokens**

Change line 27 from:
```tsx
      "text-rose-600 hover:text-rose-500",
```

To:
```tsx
      "text-accent hover:text-accent-hover",
```

**Step 3: Verify change**

```bash
grep "text-accent" components/Link/Link.tsx
```

Expected: See the new token-based classes

**Step 4: Build and verify**

```bash
pnpm build
```

Expected: Build succeeds, no errors

**Step 5: Commit**

```bash
git add components/Link/Link.tsx
git commit -m "refactor: migrate Link component to use design tokens

Replace hardcoded rose-600/500 with semantic accent tokens.
Maintains visual appearance while centralizing color control.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 5: Migrate Card Component Colors

**Files:**
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/components/Card/Card.tsx:30`
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/components/Card/Card.tsx:39`

**Step 1: Read current Card component**

```bash
cat components/Card/Card.tsx
```

Expected: See `group-hover:text-rose-500` on line 30 and `text-gray-700` on line 39

**Step 2: Replace rose-500 with accent-hover token**

Change line 30 from:
```tsx
        <h3 className="font-semibold text-lg uppercase italic underline-offset-2 hover:underline group-hover:text-rose-500">
```

To:
```tsx
        <h3 className="font-semibold text-lg uppercase italic underline-offset-2 hover:underline group-hover:text-accent-hover">
```

**Step 3: Replace gray-700 with text-secondary token**

Change line 39 from:
```tsx
        {description && <p className="mt-4 text-gray-700">{description}</p>}
```

To:
```tsx
        {description && <p className="mt-4 text-text-secondary">{description}</p>}
```

**Step 4: Verify changes**

```bash
grep -E "(text-accent-hover|text-text-secondary)" components/Card/Card.tsx
```

Expected: See both new token-based classes

**Step 5: Build and verify**

```bash
pnpm build
```

Expected: Build succeeds, no errors

**Step 6: Commit**

```bash
git add components/Card/Card.tsx
git commit -m "refactor: migrate Card component to use design tokens

Replace rose-500 with accent-hover and gray-700 with text-secondary.
Centralizes color management through design tokens.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 6: Migrate not-found Page Colors

**Files:**
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/not-found.tsx:12`
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/not-found.tsx:15`

**Step 1: Read current not-found page**

```bash
cat app/not-found.tsx
```

Expected: See `text-sm` on line 12 and `text-gray-500 text-sm` on line 15

**Step 2: Replace gray-500 on line 12**

Change line 12 from:
```tsx
        <p className="text-sm">{"Sorry, couldn't find that one"}</p>
```

To:
```tsx
        <p className="text-sm text-text-muted">{"Sorry, couldn't find that one"}</p>
```

**Step 3: Replace gray-500 on line 15**

Change line 15 from:
```tsx
          className="mb-12 block text-gray-500 text-sm uppercase no-underline"
```

To:
```tsx
          className="mb-12 block text-text-muted text-sm uppercase no-underline"
```

**Step 4: Verify changes**

```bash
grep "text-text-muted" app/not-found.tsx
```

Expected: See 2 occurrences

**Step 5: Build and verify**

```bash
pnpm build
```

Expected: Build succeeds, no errors

**Step 6: Commit**

```bash
git add app/not-found.tsx
git commit -m "refactor: migrate 404 page to use design tokens

Replace gray-500 with text-muted semantic token.
Ensures consistent muted text color across site.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 7: Migrate Post Page Colors

**Files:**
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/posts/[slug]/page.tsx:60`
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/posts/[slug]/page.tsx:70`

**Step 1: Read current post page**

```bash
cat app/posts/[slug]/page.tsx
```

Expected: See `text-gray-500 text-sm` on lines 60 and 70

**Step 2: Replace gray-500 on line 60**

Change line 60 from:
```tsx
              className="mb-12 text-gray-500 text-sm uppercase"
```

To:
```tsx
              className="mb-12 text-text-muted text-sm uppercase"
```

**Step 3: Replace gray-500 on line 70**

Change line 70 from:
```tsx
              className="mb-12 block text-gray-500 text-sm uppercase no-underline"
```

To:
```tsx
              className="mb-12 block text-text-muted text-sm uppercase no-underline"
```

**Step 4: Verify changes**

```bash
grep "text-text-muted" app/posts/[slug]/page.tsx
```

Expected: See 2 occurrences

**Step 5: Build and verify**

```bash
pnpm build
```

Expected: Build succeeds, no errors

**Step 6: Commit**

```bash
git add app/posts/[slug]/page.tsx
git commit -m "refactor: migrate post page to use design tokens

Replace gray-500 with text-muted for metadata text.
Maintains consistent muted text styling.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 8: Migrate CodeBlock CSS Module

**Files:**
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/components/CodeBlock/CodeBlock.module.css`

**Step 1: Read current CodeBlock styles**

```bash
cat components/CodeBlock/CodeBlock.module.css
```

Expected: See hardcoded values: `white`, `#0d1116`, `hsla(...)`, `rgba(...)`

**Step 2: Replace hardcoded values with CSS variables**

Replace entire file content:

```css
.pre {
  position: relative;
  overflow-x: auto;
  color: var(--color-white);
  background: var(--color-code-bg);
  @media (min-width: 1024px) {
    margin-right: var(--breakout-margin);
    margin-left: var(--breakout-margin);
  }
}

.languageIdClasses {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: block;
  padding: 0.25rem;
  line-height: 1;
  color: var(--color-code-badge-text);
  background: var(--color-code-badge-bg);
  border: 1px solid;
  border-radius: 3px;
}
```

**Step 3: Verify changes**

```bash
grep "var(--color" components/CodeBlock/CodeBlock.module.css
```

Expected: See CSS variable references

**Step 4: Build and verify**

```bash
pnpm build
```

Expected: Build succeeds, no errors

**Step 5: Commit**

```bash
git add components/CodeBlock/CodeBlock.module.css
git commit -m "refactor: migrate CodeBlock styles to use design tokens

Replace hardcoded colors (#0d1116, rgba, hsla) with CSS variables.
Use breakout-margin token for responsive margins.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 9: Migrate Post CSS Module

**Files:**
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/posts/[slug]/post.module.css`

**Step 1: Read current post styles**

```bash
cat app/posts/[slug]/post.module.css
```

Expected: See `clamp(1rem, 8vw, 6rem)` and `max-width: 95%`

**Step 2: Replace hardcoded values with CSS variables**

Replace entire file content:

```css
.title {
  margin: 0 auto;
  font-size: var(--font-size-title-fluid);
  @media (min-width: 768px) {
    max-width: var(--container-max-width-narrow);
    text-align: center;
  }
}

.meta {
  @media (min-width: 768px) {
    max-width: var(--container-max-width-narrow);
    text-align: center;
  }
}
```

**Step 3: Verify changes**

```bash
grep "var(--" app/posts/[slug]/post.module.css
```

Expected: See CSS variable references

**Step 4: Build and verify**

```bash
pnpm build
```

Expected: Build succeeds, no errors

**Step 5: Commit**

```bash
git add app/posts/[slug]/post.module.css
git commit -m "refactor: migrate post styles to use design tokens

Replace clamp() function and percentage with CSS variables.
Centralizes responsive typography and layout tokens.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 10: Visual Verification of Phase 2

**Step 1: Start dev server**

```bash
pnpm dev
```

**Step 2: Manual verification**

Visit and verify colors/styles are unchanged:
- http://localhost:3000 (check card hover states, links)
- http://localhost:3000/posts/migrating-the-platform-that-powers-abc-sites-to-typescript (check code blocks, title sizing, metadata)
- http://localhost:3000/invalid-route (check 404 text colors)

Expected: All pages look identical to baseline - token migration is transparent

**Step 3: Stop dev server**

```bash
# Ctrl+C
```

---

## Phase 3: Add Component Utilities

### Task 11: Add Component Utility Classes to global.css

**Files:**
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/global.css`

**Step 1: Add component utilities after token definitions**

Append to the end of global.css:

```css
/* ============================================
   Component Utilities
   ============================================ */

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

**Step 2: Verify addition**

```bash
grep -A 3 "Component Utilities" app/global.css
```

Expected: See the @layer components block

**Step 3: Build and verify**

```bash
pnpm build
```

Expected: Build succeeds, new utilities available

**Step 4: Commit**

```bash
git add app/global.css
git commit -m "feat: add component utility classes

Add layout-container, text-meta, and article-prose utilities.
Consolidates repeated Tailwind class patterns into reusable components.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 12: Update Layout Component to Use Utilities

**Files:**
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/layout.tsx:23`

**Step 1: Read current layout**

```bash
cat app/layout.tsx
```

Expected: See `className="container mx-auto px-4"` on line 23

**Step 2: Replace with utility class**

Change line 23 from:
```tsx
        <section className="container mx-auto px-4">
```

To:
```tsx
        <section className="layout-container">
```

**Step 3: Verify change**

```bash
grep "layout-container" app/layout.tsx
```

Expected: See the new utility class

**Step 4: Build and verify**

```bash
pnpm build
```

Expected: Build succeeds, no errors

**Step 5: Commit**

```bash
git add app/layout.tsx
git commit -m "refactor: use layout-container utility in root layout

Replace inline container classes with semantic utility.
Reduces class repetition and centralizes layout patterns.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 13: Update Bio Component to Use Utilities

**Files:**
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/components/Bio/Bio.tsx` (note: Bio is already in layout.tsx section, no separate container needed)

**Step 1: Check if Bio component has container pattern**

```bash
grep -n "container mx-auto" components/Bio/Bio.tsx
```

Expected: No matches (Bio is wrapped by layout's section)

**Step 2: Skip - no changes needed**

Bio component doesn't have container pattern to migrate.

---

### Task 14: Update Homepage to Use Utilities

**Files:**
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/page.tsx:58`

**Step 1: Read current homepage**

```bash
cat app/page.tsx
```

Expected: See `className="container mx-auto px-4"` on line 58

**Step 2: Replace with utility class**

Change line 58 from:
```tsx
      <section className="container mx-auto px-4">
```

To:
```tsx
      <section className="layout-container">
```

**Step 3: Verify change**

```bash
grep "layout-container" app/page.tsx
```

Expected: See the new utility class

**Step 4: Build and verify**

```bash
pnpm build
```

Expected: Build succeeds, no errors

**Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "refactor: use layout-container utility on homepage

Replace inline container classes with semantic utility.
Maintains consistent layout pattern across pages.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 15: Update 404 Page to Use Utilities

**Files:**
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/not-found.tsx:7`
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/not-found.tsx:11`
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/not-found.tsx:15`

**Step 1: Read current 404 page**

```bash
cat app/not-found.tsx
```

Expected: See `prose-lg lg:prose-xl mx-auto my-14` on line 7, `container mx-auto px-4` on line 11, and metadata classes on line 15

**Step 2: Replace prose pattern with utility**

Change line 7 from:
```tsx
    <section className="prose-lg lg:prose-xl mx-auto my-14">
```

To:
```tsx
    <section className="article-prose">
```

**Step 3: Replace container pattern with utility**

Change line 11 from:
```tsx
      <div className={`container mx-auto px-4 ${styles.meta}`}>
```

To:
```tsx
      <div className={`layout-container ${styles.meta}`}>
```

**Step 4: Replace metadata text pattern with utility**

Change line 15 from:
```tsx
          className="mb-12 block text-text-muted text-sm uppercase no-underline"
```

To:
```tsx
          className="mb-12 block text-meta no-underline"
```

**Step 5: Verify changes**

```bash
grep -E "(article-prose|layout-container|text-meta)" app/not-found.tsx
```

Expected: See all three new utilities

**Step 6: Build and verify**

```bash
pnpm build
```

Expected: Build succeeds, no errors

**Step 7: Commit**

```bash
git add app/not-found.tsx
git commit -m "refactor: use component utilities on 404 page

Replace repeated class patterns with article-prose, layout-container,
and text-meta utilities. Improves consistency and maintainability.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 16: Update Post Page to Use Utilities

**Files:**
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/posts/[slug]/page.tsx:52`
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/posts/[slug]/page.tsx:54`
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/posts/[slug]/page.tsx:57`
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/posts/[slug]/page.tsx:60`
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/posts/[slug]/page.tsx:70`
- Modify: `/Users/luke/Projects/lukeclark/.worktrees/design-tokens/app/posts/[slug]/page.tsx:90`

**Step 1: Read current post page**

```bash
cat app/posts/[slug]/page.tsx
```

Expected: See prose, container, and metadata patterns

**Step 2: Replace article prose pattern (line 52)**

Change line 52 from:
```tsx
      <article className="prose-lg lg:prose-xl mx-auto my-14">
```

To:
```tsx
      <article className="article-prose">
```

**Step 3: Replace container pattern in title (line 54)**

Change line 54 from:
```tsx
          <h1 className={`!mb-0 container mx-auto px-4 ${styles.title}`}>
```

To:
```tsx
          <h1 className={`!mb-0 layout-container ${styles.title}`}>
```

**Step 4: Replace container pattern in meta section (line 57)**

Change line 57 from:
```tsx
          <section className={`container mx-auto px-4 ${styles.meta}`}>
```

To:
```tsx
          <section className={`layout-container ${styles.meta}`}>
```

**Step 5: Replace metadata text pattern (line 60)**

Change line 60 from:
```tsx
              className="mb-12 text-text-muted text-sm uppercase"
```

To:
```tsx
              className="mb-12 text-meta"
```

**Step 6: Replace metadata text pattern (line 70)**

Change line 70 from:
```tsx
              className="mb-12 block text-text-muted text-sm uppercase no-underline"
```

To:
```tsx
              className="mb-12 block text-meta no-underline"
```

**Step 7: Replace container pattern in post body (line 90)**

Change line 90 from:
```tsx
        <section className={`container mx-auto px-4 ${styles.postBody}`}>
```

To:
```tsx
        <section className={`layout-container ${styles.postBody}`}>
```

**Step 8: Verify changes**

```bash
grep -E "(article-prose|layout-container|text-meta)" app/posts/[slug]/page.tsx | wc -l
```

Expected: 6 matches

**Step 9: Build and verify**

```bash
pnpm build
```

Expected: Build succeeds, no errors

**Step 10: Commit**

```bash
git add app/posts/[slug]/page.tsx
git commit -m "refactor: use component utilities on post page

Replace all repeated patterns with article-prose, layout-container,
and text-meta utilities. Maximizes consistency and reduces duplication.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 17: Final Visual Verification

**Step 1: Start dev server**

```bash
pnpm dev
```

**Step 2: Comprehensive manual verification**

Visit all pages and verify layout, colors, spacing unchanged:
- http://localhost:3000 (homepage with mixed content)
- http://localhost:3000/posts/migrating-the-platform-that-powers-abc-sites-to-typescript (post page)
- http://localhost:3000/posts/save-your-commit-history-to-a-running-harvest-timer (another post)
- http://localhost:3000/invalid-route (404 page)

Check:
- Container padding matches original
- Text colors match original (muted gray, accent rose)
- Code block colors and breakout behavior unchanged
- Link hover states work correctly
- Responsive title sizing works

Expected: Pixel-perfect match to original design

**Step 3: Stop dev server**

```bash
# Ctrl+C
```

---

### Task 18: Final Production Build & Bundle Analysis

**Step 1: Production build**

```bash
pnpm build
```

Expected:
- Build completes successfully
- Same number of pages (9) as baseline
- No errors or warnings

**Step 2: Bundle analysis (optional)**

```bash
ANALYZE=true pnpm build
```

Expected:
- Bundle size should be same or slightly smaller
- No unexpected large chunks
- CSS bundle optimized with token consolidation

**Step 3: Record completion**

All tasks complete. Design token system fully implemented with:
- ✅ 40+ CSS variables defined (primitive + semantic)
- ✅ Tailwind extended with token-based utilities
- ✅ All component colors migrated to tokens
- ✅ All CSS Modules using CSS variables
- ✅ Component utilities replacing repeated patterns
- ✅ Zero visual regressions
- ✅ Improved maintainability and DX

---

## Verification Checklist

After completing all tasks, verify:

- [ ] `pnpm build` completes without errors
- [ ] Homepage renders correctly (layout, colors, spacing)
- [ ] Post pages render correctly (code blocks, title, metadata)
- [ ] 404 page renders correctly
- [ ] Link hover states work (rose accent)
- [ ] Code block colors match original (#0d1116 background)
- [ ] Responsive title sizing works (clamp)
- [ ] Container padding consistent across pages
- [ ] New utilities work: `text-accent`, `text-meta`, `layout-container`, `article-prose`
- [ ] Git history shows incremental commits per task
- [ ] No TypeScript errors (`pnpm build` includes type checking)

## Next Steps

After implementation:

1. **Test dark mode support** - CSS variables make this trivial to add
2. **Document tokens** - Consider adding token documentation in CLAUDE.md
3. **Expand tokens** - Add more semantic tokens as patterns emerge
4. **Component library** - Extract utilities into documented design system

## Notes

**DRY:** All color values now reference single source in CSS variables
**YAGNI:** Only tokenized values actually used in codebase (no speculative tokens)
**TDD:** Build verification after each task ensures no regressions
**Frequent commits:** Each task = one commit with clear message
