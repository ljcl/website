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
  index?: number;
  className?: string;
}

const LedgerIndex = ({ value }: { value: number }) => (
  <span className="text-right font-mono text-caption text-page-text-muted tabular-nums">
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
  index,
  className,
}: CardProps) => {
  const body = (
    <>
      <div className="flex flex-col gap-1">
        <span className="eyebrow">{eyebrow}</span>
        {date ? (
          <time
            className="font-mono text-caption text-page-text-muted"
            dateTime={date}
          >
            {formatLedgerDate(date)}
          </time>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <h3
          className={cn(
            "display-m transition-colors duration-fast ease-ritual group-hover:text-brand-primary-hover",
            trailing && "inline-flex items-baseline gap-2",
          )}
        >
          {title}
          {trailing}
        </h3>
        {hostTag ? (
          <span className="font-mono text-caption text-page-text-muted">
            {hostTag}
          </span>
        ) : null}
        {description ? (
          <p className="max-w-prose text-page-text-muted">{description}</p>
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
    <Link href={href} className={wrapperClassName}>
      {body}
    </Link>
  );
};
