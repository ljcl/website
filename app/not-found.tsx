import Balancer from "react-wrap-balancer";
import { Link } from "#components/Link/Link";
import styles from "./notFound.module.css";

export default function NotFound() {
  return (
    <section className="article-prose">
      <h1 className={`!mb-0 ${styles.title}`}>
        <Balancer>{"Not found"}</Balancer>
      </h1>
      <div className={`layout-container ${styles.meta}`}>
        <p className="text-sm text-text-muted">
          {"Sorry, couldn't find that one"}
        </p>
        <Link href="/" className="mb-12 block text-meta no-underline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="-top-px relative inline h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <title>{"Back"}</title>
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          {"Head on back home"}
        </Link>
      </div>
    </section>
  );
}
