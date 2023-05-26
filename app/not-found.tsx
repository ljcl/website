import Balancer from 'react-wrap-balancer';
import { Link } from './components/Link/Link';
import styles from './notFound.module.css';

export default function NotFound() {
  return (
    <section className="prose-lg lg:prose-xl mx-auto my-14">
      <h1 className={`!mb-0  ${styles.title}`}>
        <Balancer>Not found</Balancer>
      </h1>
      <div className={`mx-auto container px-4 ${styles.meta}`}>
        <p className="text-sm">Sorry, couldn&apos;t find that one</p>
        <Link
          href="/"
          className="block uppercase text-sm text-gray-500 mb-12 no-underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline relative -top-px"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Head on back home
        </Link>
      </div>
    </section>
  );
}
