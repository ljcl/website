import type { MDXComponents } from "mdx/types";
import { Code, InlineCode } from "#components/Code/Code";
import { Link } from "#components/Link/Link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: ({ href, ...props }) => <Link href={href as string} {...props} />,
    // @ts-expect-error: Async function
    Code,
    // @ts-expect-error: Async function
    InlineCode,
  };
}
