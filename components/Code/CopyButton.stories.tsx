import { expect, fn, userEvent } from "storybook/test";
import preview from "#.storybook/preview";
import { CopyButton } from "./CopyButton";

const meta = preview.meta({
  component: CopyButton,
  parameters: {
    layout: "centered",
  },
});

/** Primary copy button in the code-block chrome */
export const Primary = meta.story({
  args: {
    text: "console.log('hello')",
  },
});

Primary.test("should render a labelled button", async ({ canvas }) => {
  const button = await canvas.findByRole("button", {
    name: /copy to clipboard/i,
  });
  await expect(button).toBeInTheDocument();
});

Primary.test("should show the copy icon by default", async ({ canvas }) => {
  const button = await canvas.findByRole("button");
  const svgTitle = button.querySelector("title");
  await expect(svgTitle).toHaveTextContent("Copy");
});

Primary.test(
  "should swap to the check icon after click",
  async ({ canvas }) => {
    const writeText = fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    const button = await canvas.findByRole("button");
    await userEvent.click(button);
    await expect(writeText).toHaveBeenCalledWith("console.log('hello')");
    const title = button.querySelector("title");
    await expect(title).toHaveTextContent("Check");
  },
);

/** With a custom class merged onto the button */
export const CustomClass = Primary.extend({
  args: {
    className: "bg-red-500",
  },
});

CustomClass.test("should merge the custom class", async ({ canvas }) => {
  const button = await canvas.findByRole("button");
  await expect(button).toHaveClass("bg-red-500");
});
