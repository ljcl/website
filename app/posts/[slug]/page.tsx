import { notFound } from 'next/navigation';
import { getAllPosts, getSinglePost } from '#lib/posts';
import Balancer from 'react-wrap-balancer';
import { Link } from '#components/Link/Link';
import type { Metadata } from 'next';
import styles from './post.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await getSinglePost(slug);

  if (!meta) {
    return {};
  }

  const title = meta.title + ' - Luke Clark';

  return {
    title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const { meta, Content } = await getSinglePost(slug);

    return (
      <>
        <article className="prose-lg lg:prose-xl mx-auto my-14">
          <header>
            <h1 className={`!mb-0 mx-auto container px-4 ${styles.title}`}>
              <Balancer>{meta.title}</Balancer>
            </h1>
            <section className={`mx-auto container px-4 ${styles.meta}`}>
              <time
                dateTime={meta.dateTime}
                className="uppercase text-sm text-gray-500 mb-12"
              >
                {meta.date.toLocaleDateString('en-AU', {
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
            <Content />
          </section>
        </article>
      </>
    );
  } catch (error) {
    notFound();
  }
}
