import { ArrowUpRight } from "lucide-react";
import { cn } from "#util/cn";
import { formatLedgerDate } from "#util/formatDate";

interface PinCardProps {
  title: string;
  date: string;
  href: string;
  description?: string;
  index?: number;
  className?: string;
}

const hostFromUrl = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toUpperCase();
  } catch {
    return "";
  }
};

export const PinCard = ({
  title,
  date,
  href,
  description,
  index,
  className,
}: PinCardProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn("ledger-row group", className)}
  >
    <div className="flex flex-col gap-1">
      <span className="eyebrow">{"Link"}</span>
      <time
        className="font-mono text-caption text-page-text-muted"
        dateTime={date}
      >
        {formatLedgerDate(date)}
      </time>
    </div>
    <div className="flex flex-col gap-2">
      <h3 className="display-m inline-flex items-baseline gap-2 transition-colors duration-fast ease-ritual group-hover:text-brand-primary-hover">
        {title}
        <ArrowUpRight
          aria-hidden
          className="h-[0.8em] w-[0.8em] shrink-0 self-center"
          strokeWidth={1.5}
        />
      </h3>
      <span className="font-mono text-caption text-page-text-muted">
        {hostFromUrl(href)}
      </span>
      {description && (
        <p className="max-w-prose text-page-text-muted">{description}</p>
      )}
    </div>
    {index !== undefined && (
      <span className="text-right font-mono text-caption text-page-text-muted tabular-nums">
        {String(index).padStart(2, "0")}
      </span>
    )}
  </a>
);
