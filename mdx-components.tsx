import type { MDXComponents } from "mdx/types";
import { Code } from "#components/Code/Code";
import { CodeBlock } from "#components/CodeBlock/CodeBlock";
import { Link } from "#components/Link/Link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, ...props }) => <Link href={href as string} {...props} />,
    code: Code,
    pre: CodeBlock,
    ...components,
  };
}
