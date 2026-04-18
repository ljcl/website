import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "#util/cn";

interface CardProps {
  href: string;
  title: string;
  eyebrow?: string;
  description?: string;
  icon?: ReactNode;
  index?: number;
  className?: string;
}

export const Card = ({
  title,
  href,
  eyebrow = "Item",
  description,
  icon,
  index,
  className,
}: CardProps) => (
  <Link href={href} className={cn("ledger-row group", className)}>
    <div className="flex flex-col gap-1">
      <span className="eyebrow">{eyebrow}</span>
    </div>
    <div className="flex flex-col gap-2">
      <h3 className="display-m inline-flex items-baseline gap-2 transition-colors duration-fast ease-ritual group-hover:text-brand-primary-hover">
        {title}
        {icon}
      </h3>
      {description && (
        <p className="max-w-prose text-page-text-muted">{description}</p>
      )}
    </div>
    {index !== undefined && (
      <span className="text-right font-mono text-caption text-page-text-muted tabular-nums">
        {String(index).padStart(2, "0")}
      </span>
    )}
  </Link>
);
