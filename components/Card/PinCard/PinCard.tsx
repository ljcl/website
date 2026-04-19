import { ArrowUpRight } from "lucide-react";
import { Card } from "#components/Card/Card";
import { hostFromUrl } from "#util/hostFromUrl";

interface PinCardProps {
  title: string;
  date: string;
  href: string;
  description?: string;
  index?: number;
  className?: string;
}

export const PinCard = ({
  title,
  date,
  href,
  description,
  index,
  className,
}: PinCardProps) => (
  <Card
    href={href}
    eyebrow="Link"
    title={title}
    date={date}
    description={description}
    hostTag={hostFromUrl(href)}
    trailing={
      <ArrowUpRight
        aria-hidden
        className="h-[0.8em] w-[0.8em] shrink-0 self-center"
        strokeWidth={1.5}
      />
    }
    external
    index={index}
    className={className}
  />
);
