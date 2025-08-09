import type { MDXComponents } from 'mdx/types';
import { Link } from '#components/Link/Link';
import { CodeBlock } from '#components/CodeBlock/CodeBlock';
import { Code } from '#components/Code/Code';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, ...props }) => <Link href={href as string} {...props} />,
    code: Code,
    pre: CodeBlock,
    ...components,
  };
}
