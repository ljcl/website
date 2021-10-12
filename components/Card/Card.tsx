import * as React from "react";
import { Link } from "#components/Link/Link";
import { VisuallyHidden } from "#components/VisuallyHidden/VisuallyHidden";

interface CardProps {
  href: string;
  title: string;
  description?: string;
  icon?: React.ReactElement;
  iconText?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  href,
  description,
  icon = null,
  iconText,
}) => {
  const iconWithClasses = icon
    ? React.cloneElement(icon, {
        className: "h-6 w-6 inline-block va-middle relative",
        "aria-hidden": true,
        style: { top: "-2px", paddingRight: "2px" },
      } as React.HTMLAttributes<HTMLElement>)
    : null;
  return (
    <article className="group mt-12 first:mt-0">
      <Link href={`${href}`} underline={false}>
        <h3 className="font-semibold text-lg uppercase italic underline-offset-2 hover:underline group-hover:text-accent-hover">
          {iconWithClasses && (
            <div className="inline-block">
              {iconWithClasses}
              {iconText && <VisuallyHidden>{iconText}</VisuallyHidden>}
            </div>
          )}
          {title}
        </h3>
        {description && (
          <p className="mt-4 text-text-secondary">{description}</p>
        )}
      </Link>
    </article>
  );
};
