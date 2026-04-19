import { ArrowUpRight } from "lucide-react";
import { expect } from "storybook/test";
import preview from "#.storybook/preview";
import { Card } from "./Card";

const meta = preview.meta({
  component: Card,
});

/** Primary ledger-row card with eyebrow, title, description */
export const Primary = meta.story({
  args: {
    href: "/posts/why-you-should-be-using-http-2-and-https",
    eyebrow: "Post",
    title: "Why you should be using HTTP/2 and HTTPS",
    description:
      "You should be using h2 (HTTP/2) and HTTPS and compelling reasons to make the switch if you still haven't.",
  },
});

Primary.test("should render title and description", async ({ canvas }) => {
  const heading = await canvas.findByRole("heading", { level: 3 });
  await expect(heading).toHaveTextContent(/HTTP\/2/);

  const description = await canvas.findByText(/switch if you still haven't/);
  await expect(description).toBeInTheDocument();
});

Primary.test("should link to the href", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  await expect(link).toHaveAttribute(
    "href",
    "/posts/why-you-should-be-using-http-2-and-https",
  );
});

/** Card without description */
export const WithoutDescription = Primary.extend({
  args: {
    description: undefined,
  },
});

/** Card with an index on the right column */
export const WithIndex = Primary.extend({
  args: {
    index: 14,
  },
});

WithIndex.test("should render padded index in mono", async ({ canvas }) => {
  const index = await canvas.findByText("14");
  await expect(index).toHaveClass("font-mono", "tabular-nums");
});

/** Card with a trailing icon (external link indicator) */
export const External = meta.story({
  args: {
    href: "https://example.com",
    eyebrow: "Link",
    title: "External resource",
    description: "Opens in a new tab.",
    external: true,
    trailing: (
      <ArrowUpRight
        aria-hidden
        className="h-[0.8em] w-[0.8em] shrink-0 self-center"
        strokeWidth={1.5}
      />
    ),
  },
});

/** Long title wrapping behavior */
export const LongTitle = Primary.extend({
  args: {
    title:
      "This is a long title that demonstrates how the card handles extended headlines across multiple lines",
  },
});
