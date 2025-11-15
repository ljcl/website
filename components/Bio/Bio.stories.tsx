import { expect } from "storybook/test";
import preview from "#.storybook/preview";
import { Bio } from "./Bio";

const meta = preview.meta({
  component: Bio,
});

/** Primary bio component as it appears on the site */
export const Primary = meta.story();

Primary.test("should render profile image", async ({ canvas }) => {
  const img = canvas.queryByRole("img");
  await expect(img).toBeInTheDocument();
  await expect(img).toHaveAttribute("alt", "Luke Clark");
});

Primary.test("should render bio text", async ({ canvas }) => {
  const bioText = await canvas.findByText(/Personal site of Luke Clark/i);
  await expect(bioText).toBeInTheDocument();
});

Primary.test("should render social links", async ({ canvas }) => {
  const githubLink = await canvas.findByRole("link", { name: /github/i });
  const instagramLink = await canvas.findByRole("link", { name: /gram/i });

  await expect(githubLink).toHaveAttribute("href", "https://github.com/ljcl");
  await expect(instagramLink).toHaveAttribute(
    "href",
    "https://instagram.com/ljcl",
  );
});

Primary.test("should have proper link attributes", async ({ canvas }) => {
  const links = canvas.getAllByRole("link");

  for (const link of links) {
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
});

Primary.test("should render as aside element", async ({ canvas }) => {
  const aside = canvas.queryByRole("complementary");
  await expect(aside).toBeInTheDocument();
});

Primary.test("should have avatar styling", async ({ canvas }) => {
  const figure = canvas.queryByRole("figure");
  await expect(figure).toBeInTheDocument();
  // Avatar should be square with specific dimensions
  await expect(figure).toHaveClass("h-24", "w-24");
});
