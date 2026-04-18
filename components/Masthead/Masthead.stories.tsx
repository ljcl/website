import { expect } from "storybook/test";
import preview from "#.storybook/preview";
import { Masthead } from "./Masthead";

const meta = preview.meta({
  component: Masthead,
});

/** Primary masthead as it appears atop every page */
export const Primary = meta.story();

Primary.test("should render home link", async ({ canvas }) => {
  const link = await canvas.findByRole("link");
  await expect(link).toHaveAttribute("href", "/");
  await expect(link).toHaveTextContent(/Luke Clark/i);
});

Primary.test("should render within a banner landmark", async ({ canvas }) => {
  const banner = await canvas.findByRole("banner");
  await expect(banner).toBeInTheDocument();
});
