import {
  default as NextLink,
  type LinkProps as NextLinkProps,
} from "next/link";
import { cn } from "#util/cn";

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
      "text-accent hover:text-accent-hover",
      underline && "no-underline underline-offset-2 hover:underline",
      className,
    )}
    {...linkProps}
  >
    {children}
  </NextLink>
);
