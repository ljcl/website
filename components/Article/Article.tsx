import { type ReactNode } from "react";

interface ArticleProps {
  title: string;
  date: Date;
  dateTime: string;
  children: ReactNode;
}

export const Article = ({ title, date, dateTime, children }: ArticleProps) => (
  <article className="article-prose">
    <header>
      <h1 className="layout-container display-l md:max-w-narrow mx-auto mt-8 mb-6 text-balance md:text-center">
        {title}
      </h1>
      <section className="layout-container md:max-w-narrow mb-12 md:text-center">
        <time dateTime={dateTime} className="text-meta">
          {date.toLocaleDateString("en-AU", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </section>
    </header>
    <section className="layout-container">{children}</section>
  </article>
);
