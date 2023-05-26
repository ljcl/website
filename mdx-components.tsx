import type { MDXComponents } from 'mdx/types';
import { Link } from 'app/components/Link/Link';
import { CodeBlock } from 'app/components/CodeBlock/CodeBlock';
import { Code } from 'app/components/Code/Code';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, ...props }) => <Link href={href as string} {...props} />,
    code: Code,
    pre: CodeBlock,
    ...components,
  };
}
