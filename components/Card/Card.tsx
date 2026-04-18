import { type ReactNode } from "react";
import { Link } from "#components/Link/Link";
import { VisuallyHidden } from "#components/VisuallyHidden/VisuallyHidden";

interface CardProps {
  href: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  iconText?: string;
}

export const Card = ({
  title,
  href,
  description,
  icon,
  iconText,
}: CardProps) => (
  <article className="group mt-12 first:mt-0">
    <Link href={`${href}`} underline={false}>
      <h3 className="font-semibold text-lg uppercase italic underline-offset-2 hover:underline group-hover:text-brand-primary-hover">
        {icon && (
          <span className="inline-block">
            {icon}
            {iconText && <VisuallyHidden>{iconText}</VisuallyHidden>}
          </span>
        )}
        {title}
      </h3>
      {description && (
        <p className="mt-4 text-page-text-secondary">{description}</p>
      )}
    </Link>
  </article>
);
