import { expect } from "storybook/test";
import preview from "#.storybook/preview";
import { Article } from "./Article";

const meta = preview.meta({
  component: Article,
  parameters: {
    layout: "fullscreen",
  },
});

const sampleDate = new Date("2024-03-15");
const sampleDateTime = "2024-03-15";

/** Primary article with sample content */
export const Primary = meta.story({
  args: {
    title: "Building a Design System with Style Dictionary",
    date: sampleDate,
    dateTime: sampleDateTime,
    children: (
      <div>
        <p>
          {
            "This is a sample article body. It demonstrates how the Article component renders content within the proper layout constraints."
          }
        </p>
        <p>
          {
            "The component handles the header with title, date, and back link, then renders children in the post body section."
          }
        </p>
      </div>
    ),
  },
});

Primary.test("should render title", async ({ canvas }) => {
  const heading = await canvas.findByRole("heading", { level: 1 });
  await expect(heading).toHaveTextContent(
    "Building a Design System with Style Dictionary",
  );
});

Primary.test("should render formatted date", async ({ canvas }) => {
  const time = await canvas.findByText("15 March 2024");
  await expect(time).toBeInTheDocument();
  await expect(time).toHaveAttribute("datetime", "2024-03-15");
});

Primary.test("should render children content", async ({ canvas }) => {
  const content = await canvas.findByText(/sample article body/i);
  await expect(content).toBeInTheDocument();
});

/** Article with a long title that demonstrates text balancing */
export const LongTitle = Primary.extend({
  args: {
    title:
      "This is a Much Longer Title That Demonstrates How the Balancer Component Handles Extended Headlines Across Multiple Lines",
  },
});

LongTitle.test("should render long title with balancer", async ({ canvas }) => {
  const heading = await canvas.findByRole("heading", { level: 1 });
  await expect(heading).toHaveTextContent(/Much Longer Title/i);
});

/** Article with minimal content */
export const MinimalContent = meta.story({
  args: {
    title: "Short Post",
    date: new Date("2023-01-01"),
    dateTime: "2023-01-01",
    children: <p>{"A brief note."}</p>,
  },
});

MinimalContent.test(
  "should render with minimal content",
  async ({ canvas }) => {
    const heading = await canvas.findByRole("heading", { level: 1 });
    await expect(heading).toHaveTextContent("Short Post");

    const content = await canvas.findByText("A brief note.");
    await expect(content).toBeInTheDocument();
  },
);

/** Article with rich MDX-like content */
export const RichContent = meta.story({
  args: {
    title: "Advanced TypeScript Patterns",
    date: new Date("2024-06-20"),
    dateTime: "2024-06-20",
    children: (
      <div>
        <h2>{"Introduction"}</h2>
        <p>
          {
            "TypeScript offers powerful type inference capabilities that can help catch errors at compile time."
          }
        </p>
        <h2>{"Generic Constraints"}</h2>
        <p>
          {
            "Using generic constraints allows you to write more flexible and type-safe code."
          }
        </p>
        <pre>
          <code>{`function identity<T extends string>(arg: T): T {
  return arg;
}`}</code>
        </pre>
      </div>
    ),
  },
});

RichContent.test("should render nested headings", async ({ canvas }) => {
  const h1 = await canvas.findByRole("heading", { level: 1 });
  await expect(h1).toHaveTextContent("Advanced TypeScript Patterns");

  const h2s = await canvas.findAllByRole("heading", { level: 2 });
  await expect(h2s).toHaveLength(2);
});
