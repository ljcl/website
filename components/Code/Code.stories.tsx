import type { RawCode } from "codehike/code";
import preview from "#.storybook/preview";
import { Code, InlineCode } from "./Code";

const meta = preview.meta({
  component: Code,
  subcomponents: { InlineCode },
  parameters: {
    layout: "padded",
  },
});

/** Basic JavaScript code block without annotations */
export const Basic = meta.story({
  args: {
    codeblock: {
      value: `const greeting = "Hello World"
console.log(greeting)`,
      lang: "js",
      meta: "",
    } as RawCode,
  },
});

/** Code block with border annotation highlighting important sections */
export const WithBorder = meta.story({
  args: {
    codeblock: {
      value: `const greeting = "Hello World"
// !border(1:2) #e11d48
const important = true
console.log(greeting)`,
      lang: "js",
      meta: "",
    } as RawCode,
  },
});

/** Code block with inline highlight annotation */
export const WithHighlight = meta.story({
  args: {
    codeblock: {
      value: `// !highlight[greeting]
const greeting = "Hello World"
console.log(greeting)`,
      lang: "js",
      meta: "",
    } as RawCode,
  },
});

/** Code block with focus annotation dimming non-essential lines */
export const WithFocus = meta.story({
  args: {
    codeblock: {
      value: `const setup = true
// !focus(2:3)
const important = "This is focused"
const alsoImportant = true
const cleanup = false`,
      lang: "js",
      meta: "",
    } as RawCode,
  },
});

/** Code block with callout tooltip annotation */
export const WithCallout = meta.story({
  args: {
    codeblock: {
      value: `// !callout[greeting] "This variable stores the greeting message"
const greeting = "Hello World"
console.log(greeting)`,
      lang: "js",
      meta: "",
    } as RawCode,
  },
});

/** Code block with diff markers showing changes */
export const WithDiff = meta.story({
  args: {
    codeblock: {
      value: `function greet(name) {
  // !diff(2) -
  return "Hello " + name
  // !diff(3) +
  return \`Hello \${name}\`
}`,
      lang: "js",
      meta: "",
    } as RawCode,
  },
});

/** Code block with filename metadata */
export const WithFilename = meta.story({
  args: {
    codeblock: {
      value: `const greeting = "Hello World"
console.log(greeting)`,
      lang: "js",
      meta: 'title="example.js"',
    } as RawCode,
  },
});

/** Complex example combining multiple annotations */
export const Complex = meta.story({
  args: {
    codeblock: {
      value: `// !border(1:10) #e11d48
// !highlight(3:5)
function calculateTotal(items) {
  // !callout[reduce] "Array.reduce combines all items into single value"
  return items.reduce((sum, item) => {
    // !mark(6)
    return sum + item.price
  }, 0)
}

// !diff(11) -
const total = calculateTotal(cart.items)
// !diff(12) +
const total = useMemo(() => calculateTotal(cart.items), [cart.items])`,
      lang: "js",
      meta: 'title="cart-utils.js" showLineNumbers',
    } as RawCode,
  },
});

/** TypeScript example with type annotations */
export const TypeScript = meta.story({
  args: {
    codeblock: {
      value: `interface User {
  id: number
  // !highlight[name]
  name: string
  email: string
}

// !border(8:10)
function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`
}`,
      lang: "typescript",
      meta: 'title="types.ts"',
    } as RawCode,
  },
});

/** Python example showing language versatility */
export const Python = meta.story({
  args: {
    codeblock: {
      value: `def calculate_total(items):
    # !highlight(2:4)
    return sum(
        item.price for item in items
    )

# !callout[total] "This uses a generator expression for efficiency"
total = calculate_total(cart_items)`,
      lang: "python",
      meta: "",
    } as RawCode,
  },
});

/** Basic inline code without syntax highlighting */
export const Inline = meta.story({
  component: InlineCode,
  args: {
    codeblock: {
      value: "const x = 5",
      lang: "js",
      meta: "",
    },
  },
});

/** Inline code with CodeHike syntax highlighting (uses codeblock prop) */
export const InlineHighlighted = meta.story({
  component: InlineCode,
  args: {
    codeblock: {
      value: "const greeting = 'Hello'",
      lang: "js",
      meta: "",
    },
  },
});
