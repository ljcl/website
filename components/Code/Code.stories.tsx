import { highlight, type RawCode } from "codehike/code";
import { Suspense, use } from "react";
import { expect } from "storybook/test";
import preview from "#.storybook/preview";
import { CodeView, InlineCodeView } from "./Code";

const highlightCache = new Map<string, ReturnType<typeof highlight>>();
const getHighlighted = (codeblock: RawCode) => {
  const key = JSON.stringify(codeblock);
  let cached = highlightCache.get(key);
  if (!cached) {
    cached = highlight(codeblock, "github-from-css");
    highlightCache.set(key, cached);
  }
  return cached;
};

const SuspendingCode = ({ codeblock }: { codeblock: RawCode }) => (
  <CodeView highlighted={use(getHighlighted(codeblock))} />
);

const SuspendingInline = ({ codeblock }: { codeblock: RawCode }) => (
  <InlineCodeView highlighted={use(getHighlighted(codeblock))} />
);

const block = (value: string, lang = "ts", metaStr = ""): RawCode => ({
  value,
  lang,
  meta: metaStr,
});

const meta = preview.meta({
  component: SuspendingCode,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Suspense fallback={<div>{"Loading…"}</div>}>
        <div className="layout-container py-10">
          <div className="article-prose">
            <Story />
          </div>
        </div>
      </Suspense>
    ),
  ],
});

/** Plain code block with syntax highlighting and a floating copy button */
export const Primary = meta.story({
  args: {
    codeblock: block(`const greeting = "Hello"\nconsole.log(greeting)`, "ts"),
  },
});

Primary.test("should render a copy button", async ({ canvas }) => {
  const button = await canvas.findByRole("button", {
    name: /copy to clipboard/i,
  });
  await expect(button).toBeInTheDocument();
});

/** Code block with a filename shown in the chrome bar */
export const WithFilename = meta.story({
  args: {
    codeblock: block(
      `export const add = (a: number, b: number) => a + b`,
      "ts",
      'name="math.ts"',
    ),
  },
});

WithFilename.test("should render the filename", async ({ canvas }) => {
  const name = await canvas.findByText("math.ts");
  await expect(name).toBeInTheDocument();
});

/** Focus annotation dims non-focused lines. Dimmed opacity is intentional for tutorial UX; fails strict contrast checks. */
export const FocusAnnotation = meta.story({
  parameters: { a11y: { test: "todo" } },
  args: {
    codeblock: block(
      `// !focus(2:3)\nconst setup = true\nconst important = 5\nconst cleanup = 0`,
      "ts",
    ),
  },
});

/** Mark annotation highlights a line with a coloured left border */
export const MarkAnnotation = meta.story({
  args: {
    codeblock: block(
      `// !mark(2) gold\nconst a = 1\nconst b = 2\nconst c = 3`,
      "ts",
    ),
  },
});

/** Callout annotation attaches a tooltip to a range within a line */
export const CalloutAnnotation = meta.story({
  args: {
    codeblock: block(
      `// !callout[/greeting/] "The greeting variable"\nconst greeting = "Hello"`,
      "ts",
    ),
  },
});

/** Line numbers annotation */
export const LineNumbersAnnotation = meta.story({
  args: {
    codeblock: block(
      `// !line-numbers\nconst a = 1\nconst b = 2\nconst c = 3`,
      "ts",
    ),
  },
});

/** Inline code variant for use inside prose */
export const Inline = meta.story({
  args: {
    codeblock: block("const x = 1", "ts"),
  },
  render: (args) => (
    <p>
      {"Wrap a small token like "}
      <SuspendingInline {...args} />
      {" inside running text."}
    </p>
  ),
});

Inline.test("should render inline code", async ({ canvasElement }) => {
  const codeEl = canvasElement.querySelector("code, span");
  await expect(codeEl).toBeInTheDocument();
});
