import Link from "next/link";
import { cn } from "#util/cn";
import { formatLedgerDate } from "#util/formatDate";

interface PostCardProps {
  title: string;
  date: string;
  slug: string;
  description?: string;
  index?: number;
  className?: string;
}

export const PostCard = ({
  title,
  date,
  slug,
  description,
  index,
  className,
}: PostCardProps) => (
  <Link href={`/posts/${slug}`} className={cn("ledger-row group", className)}>
    <div className="flex flex-col gap-1">
      <span className="eyebrow">{"Post"}</span>
      <time
        className="font-mono text-caption text-page-text-muted"
        dateTime={date}
      >
        {formatLedgerDate(date)}
      </time>
    </div>
    <div className="flex flex-col gap-2">
      <h3 className="display-m line-clamp-2 transition-colors duration-fast ease-ritual group-hover:text-brand-primary-hover">
        {title}
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
