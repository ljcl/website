import { expect } from "storybook/test";
import preview from "#.storybook/preview";
import { Link } from "./Link";

const meta = preview.meta({
  component: Link,
});

/** Default link with underline on hover */
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

Primary.test("should have accent color classes", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  await expect(link).toHaveClass("text-accent");
  await expect(link).toHaveClass("hover:text-accent-hover");
});

Primary.test("should have underline classes", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  await expect(link).toHaveClass("hover:underline");
  await expect(link).toHaveClass("no-underline");
  await expect(link).toHaveClass("underline-offset-2");
});

/** Link without underline */
export const NoUnderline = Primary.extend({
  args: {
    underline: false,
  },
});

NoUnderline.test("should not have underline classes", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  await expect(link).not.toHaveClass("hover:underline");
  await expect(link).not.toHaveClass("no-underline");
});

/** External link with target and rel */
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

/** Link with custom className */
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

CustomClass.test("should preserve default classes", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  await expect(link).toHaveClass("text-accent");
});

/** Link with complex children (icon + text) */
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

/** Link with all props combined */
export const AllProps = meta.story({
  args: {
    href: "https://github.com/example/repo",
    children: "GitHub Repository",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "font-semibold",
    underline: true,
  },
});

AllProps.test("should have all link attributes", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  await expect(link).toHaveAttribute("href", "https://github.com/example/repo");
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", "noopener noreferrer");
});

AllProps.test("should combine all classes", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  await expect(link).toHaveClass("font-semibold");
  await expect(link).toHaveClass("text-accent");
  await expect(link).toHaveClass("hover:underline");
});
