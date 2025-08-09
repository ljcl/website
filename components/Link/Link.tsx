import { cn } from '#util/cn';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';

interface LinkProps extends NextLinkProps {
  children?: React.ReactNode;
  className?: string;
  underline?: boolean;
  target?: string;
  rel?: string;
}

export const Link = ({
  children,
  className,
  target,
  rel,
  underline = true,
  ...linkProps
}: LinkProps) => (
  <NextLink
    target={target}
    rel={rel}
    className={cn(
      'text-rose-600 hover:text-rose-500',
      underline && 'no-underline hover:underline underline-offset-2',
      className
    )}
    {...linkProps}
  >
    {children}
  </NextLink>
);
