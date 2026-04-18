import { type ReactNode } from "react";
import { Link } from "#components/Link/Link";

interface ArticleProps {
  /** The article title */
  title: string;
  /** The date as a Date object for formatting */
  date: Date;
  /** ISO date string for the datetime attribute */
  dateTime: string;
  /** The article content */
  children: ReactNode;
}

export const Article = ({ title, date, dateTime, children }: ArticleProps) => (
  <article className="article-prose">
    <header>
      <h1 className="layout-container !mb-0 mx-auto text-balance text-title-fluid md:max-w-narrow md:text-center">
        {title}
      </h1>
      <section className="layout-container md:max-w-narrow md:text-center">
        <time dateTime={dateTime} className="mb-12 text-meta">
          {date.toLocaleDateString("en-AU", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <Link href="/" className="mb-12 block text-meta no-underline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="relative -top-px inline h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <title>{"Back"}</title>
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          {"more posts"}
        </Link>
      </section>
    </header>
    <section className="layout-container">{children}</section>
  </article>
);
