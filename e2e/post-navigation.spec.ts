import { instant } from "@next/playwright";
import { expect, type Page, test } from "@playwright/test";

const expectPostReady = async (page: Page, href: string) => {
  const link = page.locator(`a[href="${href}"]`).first();
  const title = (await link.locator("h3").textContent())?.trim() ?? "";
  await link.click();
  await page.waitForURL((url) => url.pathname === href);
  const article = page.locator("article", {
    has: page.getByRole("heading", { level: 1, name: title }),
  });
  await expect(article.locator("time")).toBeVisible();
  await expect(article.locator("> section p").first()).toBeVisible();
};

test("homepage post link shows the post before the click resolves", async ({
  page,
}) => {
  await page.goto("/");
  const href = await page
    .locator('main a[href^="/posts/"]')
    .first()
    .getAttribute("href");
  if (!href) throw new Error("no post link on homepage");
  await instant(page, () => expectPostReady(page, href));
});

test("older post link shows the post before the click resolves", async ({
  page,
}) => {
  await page.goto("/");
  const first = await page
    .locator('main a[href^="/posts/"]')
    .first()
    .getAttribute("href");
  await page.goto(first ?? "/");
  const href = await page
    .locator('nav[aria-label="Post navigation"] a')
    .first()
    .getAttribute("href");
  if (!href) throw new Error("no adjacent post link");
  await instant(page, () => expectPostReady(page, href));
});
