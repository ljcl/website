import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "#util/cn";
import { formatLedgerDate } from "#util/formatDate";

export interface CardProps {
  href: string;
  title: string;
  eyebrow: string;
  date?: string;
  description?: string;
  hostTag?: string;
  trailing?: ReactNode;
  external?: boolean;
  /** Per-link prefetch of the destination's URL-specific content */
  prefetch?: boolean;
  index?: number;
  className?: string;
}

const LedgerIndex = ({ value }: { value: number }) => (
  <span className="text-caption text-page-text-muted text-right font-mono tabular-nums">
    {String(value).padStart(2, "0")}
  </span>
);

export const Card = ({
  href,
  title,
  eyebrow,
  date,
  description,
  hostTag,
  trailing,
  external,
  prefetch,
  index,
  className,
}: CardProps) => {
  const body = (
    <>
      <div className="flex flex-col gap-1">
        <span className="eyebrow">{eyebrow}</span>
        {date ? (
          <time
            className="text-caption text-page-text-muted font-mono"
            dateTime={date}
          >
            {formatLedgerDate(date)}
          </time>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <h3
          className={cn(
            "display-m duration-fast ease-ritual group-hover:text-brand-primary-hover transition-colors",
            trailing && "inline-flex items-baseline gap-2",
          )}
        >
          {title}
          {trailing}
        </h3>
        {hostTag ? (
          <span className="text-caption text-page-text-muted font-mono">
            {hostTag}
          </span>
        ) : null}
        {description ? (
          <p className="text-page-text-muted max-w-prose">{description}</p>
        ) : null}
      </div>
      {index !== undefined && <LedgerIndex value={index} />}
    </>
  );

  const wrapperClassName = cn("ledger-row group", className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={wrapperClassName}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={href} prefetch={prefetch} className={wrapperClassName}>
      {body}
    </Link>
  );
};
