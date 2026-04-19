import { expect } from "storybook/test";
import preview from "#.storybook/preview";
import { CheckIcon, CodeIcon, CopyIcon } from "./Icons";

const meta = preview.meta({
  component: CodeIcon,
  parameters: {
    layout: "centered",
  },
});

/** Seti-icon for a known filename (code.tsx -> TypeScript mark) */
export const TypeScriptFile = meta.story({
  args: {
    title: "code.tsx",
  },
});

TypeScriptFile.test("should render an svg", async ({ canvasElement }) => {
  const svg = canvasElement.querySelector("svg");
  await expect(svg).toBeInTheDocument();
});

/** Unknown filename falls back to the default seti glyph */
export const UnknownFile = meta.story({
  args: {
    title: "notes.xyz",
  },
});

/** Mdx files are normalised to md before lookup */
export const MdxFile = meta.story({
  args: {
    title: "post.mdx",
  },
});

MdxFile.test("should render an svg", async ({ canvasElement }) => {
  const svg = canvasElement.querySelector("svg");
  await expect(svg).toBeInTheDocument();
});

/** The copy glyph used by CopyButton */
export const CopyGlyph = meta.story({
  render: () => <CopyIcon />,
});

CopyGlyph.test("should render the copy title", async ({ canvasElement }) => {
  const title = canvasElement.querySelector("title");
  await expect(title).toHaveTextContent("Copy");
});

/** The check glyph shown after a successful copy */
export const CheckGlyph = meta.story({
  render: () => <CheckIcon />,
});

CheckGlyph.test("should render the check title", async ({ canvasElement }) => {
  const title = canvasElement.querySelector("title");
  await expect(title).toHaveTextContent("Check");
});
