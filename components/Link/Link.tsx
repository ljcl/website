import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import clsx from 'clsx';

interface LinkProps extends NextLinkProps {
  children: React.ReactNode;
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
  <NextLink passHref {...linkProps}>
    <a
      target={target}
      rel={rel}
      className={clsx(
        'text-rose-600 hover:text-rose-500',
        underline && 'no-underline hover:underline underline-offset-2',
        className
      )}
    >
      {children}
    </a>
  </NextLink>
);
