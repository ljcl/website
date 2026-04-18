import { expect } from "storybook/test";
import preview from "#.storybook/preview";
import { PinCard } from "./PinCard";

const meta = preview.meta({
  component: PinCard,
});

/** Primary ledger row for a curated link */
export const Primary = meta.story({
  args: {
    title: "A Single Div",
    date: "2024-06-12",
    href: "https://a.singlediv.com/",
  },
});

Primary.test(
  "should render eyebrow, title, and formatted date",
  async ({ canvas }) => {
    const eyebrow = await canvas.findByText("Link");
    await expect(eyebrow).toBeInTheDocument();

    const heading = await canvas.findByRole("heading", { level: 3 });
    await expect(heading).toHaveTextContent("A Single Div");

    const time = canvas.getByText(/2024/);
    await expect(time).toHaveAttribute("datetime", "2024-06-12");
  },
);

Primary.test("should render host tag from the href", async ({ canvas }) => {
  const host = await canvas.findByText("A.SINGLEDIV.COM");
  await expect(host).toBeInTheDocument();
  await expect(host).toHaveClass("font-mono");
});

Primary.test("should link out in a new tab", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  await expect(link).toHaveAttribute("href", "https://a.singlediv.com/");
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", "noopener noreferrer");
});

Primary.test("should render the external glyph", async ({ canvas }) => {
  const heading = await canvas.findByRole("heading", { level: 3 });
  const svg = heading.querySelector("svg");
  await expect(svg).toBeInTheDocument();
  await expect(svg).toHaveAttribute("aria-hidden", "true");
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
      "A Single Div: a CSS drawing project by Lynn Fisher that strips interfaces back to one element.",
  },
});

WithDescription.test("should render the description", async ({ canvas }) => {
  const description = canvas.getByText(/CSS drawing project/);
  await expect(description).toBeInTheDocument();
});

/** Ledger row with a zero-padded mono index in the right column */
export const IndexedPrimary = WithDescription.extend({
  args: {
    index: 7,
  },
});

IndexedPrimary.test(
  "should render the index zero-padded to two digits",
  async ({ canvas }) => {
    const index = await canvas.findByText("07");
    await expect(index).toBeInTheDocument();
    await expect(index).toHaveClass("font-mono", "tabular-nums");
  },
);

/** Host extraction strips the www. prefix */
export const WithWwwHost = Primary.extend({
  args: {
    title: "Some Other Link",
    href: "https://www.example.com/path/to/thing",
  },
});

WithWwwHost.test("should strip www from the host tag", async ({ canvas }) => {
  const host = await canvas.findByText("EXAMPLE.COM");
  await expect(host).toBeInTheDocument();
});
