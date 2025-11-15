import { expect } from "storybook/test";
import preview from "#.storybook/preview";
import { CodeBlock } from "./CodeBlock";

const meta = preview.meta({
  component: CodeBlock,
});

/** Basic code block with syntax-highlighted content */
export const Primary = meta.story({
  args: {
    children: (
      <code>
        {`function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');`}
      </code>
    ),
  },
});

Primary.test("should render pre element", async ({ canvas }) => {
  const pre = canvas.queryByTestId("CodeBlock");
  await expect(pre).toBeInTheDocument();
});

Primary.test("should wrap children in code-container", async ({ canvas }) => {
  const container = canvas.queryByTestId("CodeBlockContainer");
  await expect(container).toBeInTheDocument();
});

Primary.test("should apply default styling classes", async ({ canvas }) => {
  const pre = canvas.queryByTestId("CodeBlock");
  await expect(pre).toHaveClass("not-prose");
});

/** Code block with custom className */
export const WithCustomClass = Primary.extend({
  args: {
    className: "custom-highlight-theme",
  },
});

WithCustomClass.test(
  "should merge custom className with defaults",
  async ({ canvas }) => {
    const pre = canvas.queryByTestId("CodeBlock");
    await expect(pre).toHaveClass("custom-highlight-theme");
    await expect(pre).toHaveClass("not-prose");
  },
);

/** Long code block to test scrolling */
export const LongCode = meta.story({
  args: {
    children: (
      <code>
        {`// This is a long code example to demonstrate scrolling behavior
const data = [
  { id: 1, name: 'Alice', age: 30, email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 25, email: 'bob@example.com' },
  { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' },
  { id: 4, name: 'Diana', age: 28, email: 'diana@example.com' },
  { id: 5, name: 'Eve', age: 32, email: 'eve@example.com' },
];

function processData(data) {
  return data
    .filter(person => person.age > 25)
    .map(person => ({
      ...person,
      displayName: \`\${person.name} (\${person.age})\`,
    }))
    .sort((a, b) => a.age - b.age);
}

const result = processData(data);
console.log(result);`}
      </code>
    ),
  },
});

LongCode.test("should handle long content", async ({ canvas }) => {
  const pre = canvas.queryByTestId("CodeBlock");
  const code = pre?.querySelector("code");
  await expect(code?.textContent?.length || 0).toBeGreaterThan(200);
});

/** Minimal code block */
export const Minimal = meta.story({
  args: {
    children: <code>{`console.log('hi');`}</code>,
  },
});

Minimal.test("should render minimal code", async ({ canvas }) => {
  const code = await canvas.findByText(/console\.log/i);
  await expect(code).toBeInTheDocument();
});
