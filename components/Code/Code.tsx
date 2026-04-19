import {
  type HighlightedCode,
  highlight,
  Inline,
  Pre,
  type RawCode,
} from "codehike/code";
import { cacheLife } from "next/cache";
import { CopyButton } from "./CopyButton";
import { handlers } from "./codehike-handlers";
import { CodeIcon } from "./Icons";

interface CodeProps {
  codeblock: RawCode;
}

export function CodeView({ highlighted }: { highlighted: HighlightedCode }) {
  const nameMatch = highlighted?.meta
    ? /^name="([^"]+)"$/.exec(highlighted.meta)
    : null;
  const displayMeta = nameMatch ? nameMatch[1] : highlighted.meta;

  return (
    <div className="ch-code relative mb-12! overflow-hidden rounded-lg border border-code-border bg-code-bg text-code-text leading-normal! lg:mx-(--spacing-breakout) lg:max-w-[calc(100vw-2*var(--layout-container-padding))]">
      {displayMeta ? (
        <div className="flex border-code-border border-b bg-code-bg px-4 py-4 text-sm">
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
        className="group m-0 flex-1 overflow-x-auto whitespace-pre rounded-none px-0 py-4 selection:bg-code-highlight selection:text-code-text"
      />
    </div>
  );
}

export async function Code({ codeblock }: CodeProps) {
  "use cache";
  cacheLife("max");
  const highlighted = await highlight(codeblock, "github-from-css");
  return <CodeView highlighted={highlighted} />;
}

export function InlineCodeView({
  highlighted,
}: {
  highlighted: HighlightedCode;
}) {
  return (
    <Inline
      code={highlighted}
      style={highlighted.style}
      className="ch-code-inline rounded-lg selection:bg-code-highlight selection:text-code-text"
    />
  );
}

export async function InlineCode({ codeblock }: { codeblock: RawCode }) {
  "use cache";
  cacheLife("max");
  const highlighted = await highlight(codeblock, "github-from-css");
  return <InlineCodeView highlighted={highlighted} />;
}
