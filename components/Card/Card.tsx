import * as React from 'react';
import { Link } from '../Link/Link';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
interface CardProps {
  href: string;
  title: string;
  description?: string;
  icon?: JSX.Element;
  iconText?: string;
}

export const Card: React.VFC<CardProps> = ({
  title,
  href,
  description,
  icon = null,
  iconText,
}) => {
  const iconWithClasses =
    icon &&
    React.cloneElement(icon, {
      className: 'h-6 w-6 inline-block va-middle relative',
      'aria-hidden': true,
      style: { top: '-2px' },
    });
  return (
    <article className="group first:mt-0 mt-12">
      <Link href={`${href}`} underline={false}>
        <h3 className="uppercase italic font-semibold text-lg group-hover:text-rose-500 hover:underline underline-offset-2">
          {iconWithClasses && (
            <div className="inline-block">
              {iconWithClasses}
              {iconText && (
                <VisuallyHidden>
                  <>{iconText}:&nbsp;</>
                </VisuallyHidden>
              )}
            </div>
          )}
          {title}
        </h3>
        {description && <p className="mt-4 text-gray-700">{description}</p>}
      </Link>
    </article>
  );
};
