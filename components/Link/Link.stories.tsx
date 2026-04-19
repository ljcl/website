import { expect } from "storybook/test";
import preview from "#.storybook/preview";
import { Link } from "./Link";

const meta = preview.meta({
  component: Link,
});

/** Internal link rendered via next/link. Hover underline comes from global a rules. */
export const Primary = meta.story({
  args: {
    href: "/example",
    children: "Example Link",
  },
});

Primary.test("should render link with correct href", async ({ canvas }) => {
  const link = await canvas.findByRole("link", { name: /example link/i });
  await expect(link).toHaveAttribute("href", "/example");
});

Primary.test(
  "should not render external glyph for internal href",
  async ({ canvas }) => {
    const link = await canvas.findByRole("link");
    const svg = link.querySelector("svg");
    await expect(svg).not.toBeInTheDocument();
  },
);

/** External link renders a plain anchor with an ArrowUpRight glyph suffix. */
export const External = meta.story({
  args: {
    href: "https://example.com",
    children: "External Website",
    target: "_blank",
    rel: "noopener noreferrer",
  },
});

External.test(
  "should have correct external link attributes",
  async ({ canvas }) => {
    const link = await canvas.findByRole("link", { name: /external website/i });
    await expect(link).toHaveAttribute("href", "https://example.com");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  },
);

External.test(
  "should have noopener and noreferrer in rel",
  async ({ canvas }) => {
    const link = await canvas.findByRole("link");
    const rel = link.getAttribute("rel");
    await expect(rel).toContain("noopener");
    await expect(rel).toContain("noreferrer");
  },
);

External.test("should render external glyph", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  const svg = link.querySelector("svg");
  await expect(svg).toBeInTheDocument();
  await expect(svg).toHaveAttribute("aria-hidden", "true");
});

External.test(
  "should use inline-flex with baseline items for glyph alignment",
  async ({ canvas }) => {
    const link = await canvas.findByRole("link");
    await expect(link).toHaveClass("inline-flex");
    await expect(link).toHaveClass("items-baseline");
    await expect(link).toHaveClass("gap-1");
  },
);

/** Link with custom className merged onto the anchor. */
export const CustomClass = meta.story({
  args: {
    href: "/custom",
    children: "Custom Styled Link",
    className: "font-bold text-lg",
  },
});

CustomClass.test("should have custom classes", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  await expect(link).toHaveClass("font-bold");
  await expect(link).toHaveClass("text-lg");
});

/** Link with complex children (icon + text) - internal variant */
export const WithIcon = meta.story({
  args: {
    href: "/icon-link",
    children: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          style={{
            width: "16px",
            height: "16px",
            display: "inline-block",
            marginRight: "4px",
          }}
          aria-hidden="true"
        >
          <title>{"arrow"}</title>
          <path
            fillRule="evenodd"
            d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
            clipRule="evenodd"
          />
        </svg>
        {"Link with Icon"}
      </>
    ),
  },
});

WithIcon.test("should render svg icon", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  const svg = link.querySelector("svg");
  await expect(svg).toBeInTheDocument();
});

WithIcon.test("should have aria-hidden on icon", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  const svg = link.querySelector("svg");
  await expect(svg).toHaveAttribute("aria-hidden", "true");
});

/** Long link text */
export const LongText = meta.story({
  args: {
    href: "/long",
    children:
      "This is a very long link text that demonstrates how the component handles extended content and text wrapping behavior",
  },
});

LongText.test("should handle long text content", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  await expect(link.textContent?.length || 0).toBeGreaterThan(50);
});

/** External link combining all props */
export const AllProps = meta.story({
  args: {
    href: "https://github.com/example/repo",
    children: "GitHub Repository",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "font-semibold",
  },
});

AllProps.test("should have all link attributes", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  await expect(link).toHaveAttribute("href", "https://github.com/example/repo");
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", "noopener noreferrer");
});

AllProps.test("should include custom className", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  await expect(link).toHaveClass("font-semibold");
});

AllProps.test("should render the external glyph", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  const svgs = link.querySelectorAll("svg");
  await expect(svgs.length).toBeGreaterThanOrEqual(1);
});
