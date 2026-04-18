import { expect } from "storybook/test";
import preview from "#.storybook/preview";
import { PostCard } from "./PostCard";

const meta = preview.meta({
  component: PostCard,
});

/** Primary ledger row for an essay */
export const Primary = meta.story({
  args: {
    title: "Why you should be using HTTP/2 and HTTPS",
    date: "2015-10-17",
    slug: "why-you-should-be-using-http-2-and-https",
  },
});

Primary.test(
  "should render eyebrow, title, and formatted date",
  async ({ canvas }) => {
    const eyebrow = await canvas.findByText("Post");
    await expect(eyebrow).toBeInTheDocument();

    const heading = await canvas.findByRole("heading", { level: 3 });
    await expect(heading).toHaveTextContent(
      "Why you should be using HTTP/2 and HTTPS",
    );

    const time = canvas.getByText(/2015/);
    await expect(time).toHaveAttribute("datetime", "2015-10-17");
  },
);

Primary.test("should link to the post", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  await expect(link).toHaveAttribute(
    "href",
    "/posts/why-you-should-be-using-http-2-and-https",
  );
});

Primary.test(
  "should apply hover colour shift to title",
  async ({ canvas, userEvent }) => {
    const link = await canvas.findByRole("link");
    const heading = await canvas.findByRole("heading", { level: 3 });
    await userEvent.hover(link);
    await expect(heading).toHaveClass(/group-hover:text-brand-primary-hover/);
  },
);

/** Ledger row with a dek paragraph */
export const WithDescription = Primary.extend({
  args: {
    description:
      "Compelling reasons to make the switch to HTTPS if you still haven't.",
  },
});

WithDescription.test("should render the description", async ({ canvas }) => {
  const description = canvas.getByText(/Compelling reasons/);
  await expect(description).toBeInTheDocument();
});

/** Ledger row with a zero-padded mono index in the right column */
export const IndexedPrimary = WithDescription.extend({
  args: {
    index: 4,
  },
});

IndexedPrimary.test(
  "should render the index zero-padded to two digits",
  async ({ canvas }) => {
    const index = await canvas.findByText("04");
    await expect(index).toBeInTheDocument();
    await expect(index).toHaveClass("font-mono", "tabular-nums");
  },
);

/** Larger index value to confirm two-digit rendering still works */
export const IndexedLarge = IndexedPrimary.extend({
  args: {
    index: 17,
  },
});

IndexedLarge.test(
  "should render larger index without padding",
  async ({ canvas }) => {
    const index = await canvas.findByText("17");
    await expect(index).toBeInTheDocument();
  },
);
