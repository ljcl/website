import { expect } from "storybook/test";
import preview from "#.storybook/preview";
import { VisuallyHidden } from "./VisuallyHidden";

const meta = preview.meta({
  component: VisuallyHidden,
});

/** Primary story showing hidden text for screen readers */
export const Primary = meta.story({
  args: {
    children: "This text is visually hidden but available to screen readers",
  },
});

Primary.test("should render children in the DOM", async ({ canvas }) => {
  const element = canvas.getByText(/visually hidden but available/i);
  await expect(element).toBeInTheDocument();
});

Primary.test("should have accessibility styles applied", async ({ canvas }) => {
  const element = canvas.getByText(/visually hidden but available/i);
  const styles = window.getComputedStyle(element);

  // Verify key visually-hidden properties
  await expect(styles.position).toBe("absolute");
  await expect(styles.overflow).toBe("hidden");
});

/** Example showing typical use case with icon */
export const WithIcon = meta.story({
  args: {
    children: "Information icon",
  },
  decorators: [
    (Story) => (
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          role="img"
          style={{
            width: "20px",
            height: "20px",
            display: "inline-block",
            marginRight: "4px",
          }}
        >
          <title>{"icon"}</title>
          <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
        </svg>
        <Story />
      </div>
    ),
  ],
});

WithIcon.test("should work alongside decorative icons", async ({ canvas }) => {
  const hiddenText = canvas.getByText("Information icon");
  await expect(hiddenText).toBeInTheDocument();

  const svg = canvas.getByRole("img", { hidden: true });
  await expect(svg).toHaveAttribute("aria-hidden", "true");
});
