import { highlight, Inline, Pre, type RawCode } from "codehike/code";
import { CopyButton } from "./CopyButton";
import { handlers } from "./codehike-handlers";
import { CodeIcon } from "./Icons";

interface CodeProps {
  codeblock: RawCode;
}

/**
 * Code component using CodeHike
 *
 * This is a React Server Component that renders syntax-highlighted code blocks
 * with annotation support. It replaces the previous rehype-pretty-code setup.
 *
 * Features:
 * - Syntax highlighting via CodeHike
 * - Annotation support (border, highlight, focus, callout, etc.)
 * - Design token integration for theming
 * - Automatic dark mode support
 *
 * Usage in MDX:
 * ```js title="example.js"
 * // !mark(2)
 * const greeting = "Hello"
 * console.log(greeting)
 * ```
 */
export async function Code({ codeblock }: CodeProps) {
  const highlighted = await highlight(codeblock, "github-from-css");

  const displayMeta = highlighted?.meta?.match(/^name="([^"]+)"$/)
    ? highlighted.meta.match(/^name="([^"]+)"$/)![1]
    : highlighted.meta;

  return (
    <div className="relative mb-12! overflow-hidden rounded-lg border border-code-border bg-code-bg text-code-fg leading-normal! lg:mx-(--spacing-breakout) lg:max-w-[calc(100vw-2*var(--layout-container-padding))]">
      {displayMeta ? (
        <div className="flex border-code-border border-b bg-code-title-bg px-4 py-4 text-sm">
          <div className="flex items-center gap-3 text-sm">
            <CodeIcon title={displayMeta} />
            <span>{displayMeta}</span>
          </div>
          <CopyButton text={highlighted.code} className="ml-auto" />
        </div>
      ) : (
        <div className="relative">
          <CopyButton
            text={highlighted.code}
            className="absolute top-4 right-4 my-0"
          />
        </div>
      )}
      <Pre
        code={highlighted}
        handlers={handlers}
        className="group m-0 flex-1 whitespace-pre-wrap rounded-none px-0 py-4 selection:bg-code-highlight selection:text-code-fg"
      />
    </div>
  );
}

export async function InlineCode({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-from-css");
  return (
    <Inline
      code={highlighted}
      style={highlighted.style}
      className="rounded-lg selection:bg-code-highlight selection:text-code-fg"
    />
  );
}
