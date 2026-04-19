import { ArrowUpRight } from "lucide-react";
import {
  default as NextLink,
  type LinkProps as NextLinkProps,
} from "next/link";
import { cn } from "#util/cn";

interface LinkProps extends NextLinkProps {
  children?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

const isExternal = (href: NextLinkProps["href"]): boolean => {
  if (typeof href !== "string") return false;
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");
};

export const Link = ({
  children,
  className,
  target,
  rel,
  href,
  ...linkProps
}: LinkProps) => {
  if (isExternal(href)) {
    return (
      <a
        href={typeof href === "string" ? href : undefined}
        target={target}
        rel={rel}
        className={cn("inline-flex items-baseline gap-1", className)}
      >
        {children}
        <ArrowUpRight
          className="h-[0.8em] w-[0.8em] shrink-0"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      target={target}
      rel={rel}
      className={className}
      {...linkProps}
    >
      {children}
    </NextLink>
  );
};
