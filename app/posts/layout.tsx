import { headers } from 'next/headers';
import { getSinglePost } from 'lib/posts';
import Balancer from 'react-wrap-balancer';
import { Link } from 'app/components/Link/Link';
import type { Metadata } from 'next';
import styles from './post.module.css';

/**
 * Nasty little hack to fetch the pathname from the headers
 */
async function getPost() {
  const pathname = headers().get('x-pathname') || '';
  const strippedPath = /[^/]*$/.exec(pathname)?.[0] || '';

  return getSinglePost('/' + strippedPath);
}

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await getPost();

  const singlePostTitle = meta.title;
  const singlePostDescription = meta.description;

  const title = singlePostTitle + ' Luke Clark';

  return {
    title,
    description: singlePostDescription,
    openGraph: {
      title: singlePostTitle,
      description: singlePostDescription,
    },
    twitter: {
      title: singlePostTitle,
      description: singlePostDescription,
    },
  };
}

export default async function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { meta } = await getPost();

  const date = new Date(meta.date);
  const dateTime = new Date(meta.date as string).toISOString().split('T')[0];

  return (
    <>
      <article className="prose-lg lg:prose-xl mx-auto my-14">
        <header>
          <h1 className={`!mb-0 mx-auto container px-4 ${styles.title}`}>
            <Balancer>{meta.title}</Balancer>
          </h1>
          <section className={`mx-auto container px-4 ${styles.meta}`}>
            <time
              dateTime={dateTime}
              className="uppercase text-sm text-gray-500 mb-12"
            >
              {date.toLocaleDateString('en-AU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
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
              more posts
            </Link>
          </section>
        </header>
        <section className={`mx-auto container px-4 ${styles.postBody}`}>
          {children}
        </section>
      </article>
    </>
  );
}
