import { expect } from "storybook/test";
import preview from "#.storybook/preview";
import { posts } from "./__fixtures__/posts";
import { Card } from "./Card";

const meta = preview.meta({
  component: Card,
});

const postData = posts[0];
const linkData = posts[1];

/** Post story with all props */
export const Post = meta.story({
  args: postData,
});

Post.test("should render title and description", async ({ canvas }) => {
  const heading = await canvas.findByRole("heading", { level: 3 });
  await expect(heading).toHaveTextContent(postData.title);

  const description = await canvas.findByText(postData.description);
  await expect(description).toBeInTheDocument();
});

Post.test(
  "should apply hover styles on interaction",
  async ({ canvas, userEvent }) => {
    const link = await canvas.findByRole("link");
    const heading = await canvas.findByRole("heading", { level: 3 });

    await userEvent.hover(link);
    // Heading should have hover classes applied
    await expect(heading).toHaveClass(/group-hover:text-accent-hover/);
  },
);

/** Card without description */
export const WithoutDescription = Post.extend({
  args: {
    description: undefined,
  },
});

WithoutDescription.test(
  "should render without description",
  async ({ canvas }) => {
    const heading = await canvas.findByRole("heading", { level: 3 });
    await expect(heading).toBeInTheDocument();

    // Description paragraph should not exist
    const article = await canvas.findByRole("article");
    const paragraphs = article.querySelectorAll("p");
    await expect(paragraphs.length).toBe(0);
  },
);

/** Card with icon */
export const Link = meta.story({
  args: linkData,
});

Link.test("should render icon with accessible text", async ({ canvas }) => {
  const heading = await canvas.findByRole("heading", { level: 3 });

  // Icon should be aria-hidden
  const svg = heading.querySelector("svg");
  await expect(svg).toHaveAttribute("aria-hidden", "true");

  // Should have visually hidden text for screen readers
  const visuallyHiddenText = heading.textContent;
  await expect(visuallyHiddenText).toContain("External link");
});

Link.test("should have proper icon styling", async ({ canvas }) => {
  const heading = await canvas.findByRole("heading", { level: 3 });
  const svg = heading.querySelector("svg");

  await expect(svg).toHaveClass("h-6", "w-6", "inline-block");
});

/** Card with icon but no icon text */
export const LinkNoText = Link.extend({
  args: {
    iconText: undefined,
  },
});

LinkNoText.test(
  "should render icon without accessible text",
  async ({ canvas }) => {
    const heading = await canvas.findByRole("heading", { level: 3 });
    const svg = heading.querySelector("svg");

    await expect(svg).toBeInTheDocument();
    await expect(svg).toHaveAttribute("aria-hidden", "true");

    // Should not have visually hidden text
    const visuallyHidden = heading.querySelector(".sr-only, .visually-hidden");
    await expect(visuallyHidden).toBeNull();
  },
);

/** Long content example */
export const LongContent = Post.extend({
  args: {
    title:
      "This is a Very Long Title That Demonstrates How the Card Component Handles Extended Text Content",
    description:
      "This is a much longer description that demonstrates how the card component handles extended content. It includes multiple sentences to show text wrapping and layout behavior. The description should wrap naturally and maintain proper spacing and readability even with a significant amount of content.",
  },
});

LongContent.test(
  "should handle long content gracefully",
  async ({ canvas }) => {
    const heading = await canvas.findByRole("heading", { level: 3 });
    const description = canvas.getByText(/much longer description/i);

    await expect(heading).toBeInTheDocument();
    await expect(description).toBeInTheDocument();
  },
);

/** Minimum required props */
export const MinimalCard = meta.story({
  args: {
    href: "/minimal",
    title: "Minimal Card",
  },
});

MinimalCard.test(
  "should render with only required props",
  async ({ canvas }) => {
    const heading = await canvas.findByRole("heading", { level: 3 });
    const link = await canvas.findByRole("link");

    await expect(heading).toHaveTextContent("Minimal Card");
    await expect(link).toHaveAttribute("href", "/minimal");
  },
);

/** Special characters in title */
export const SpecialCharacters = Post.extend({
  args: {
    href: "/special",
    title: "Code & Design: A Developer's Journey <2024>",
    description:
      "Testing \"quotes\" and 'apostrophes' & other special characters.",
  },
});

SpecialCharacters.test(
  "should handle special characters",
  async ({ canvas }) => {
    const heading = await canvas.findByRole("heading", { level: 3 });
    await expect(heading).toHaveTextContent(
      "Code & Design: A Developer's Journey <2024>",
    );

    const description = canvas.getByText(/Testing "quotes"/i);
    await expect(description).toBeInTheDocument();
  },
);
