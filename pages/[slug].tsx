import { useMemo } from 'react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { getMDXComponent } from 'mdx-bundler/client';
import { getAllPosts, getSinglePost, PostFrontmatter } from '@/utils/mdx';
import { Link } from '@/components/Link/Link';
import { CodeBlock } from '@/components/CodeBlock/CodeBlock';
import { Code } from '@/components/Code/Code';
import { Layout } from '@/components/Layout/Layout';
import { Bio } from '@/components/Bio/Bio';

const componentMap = {
  a: Link,
  code: Code,
  pre: CodeBlock,
} as any;

interface PostType {
  code: string;
  frontmatter: PostFrontmatter;
  datetime: string;
}

const Post = ({ code, frontmatter, datetime }: PostType) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <>
      <Head>
        <title>{frontmatter.title} - Luke Clark</title>
        <meta property="og:title" content={frontmatter.title} />
        <meta property="twitter:title" content={frontmatter.title} />
        {frontmatter.description && (
          <>
            <meta name="description" content={frontmatter.description} />
            <meta property="og:description" content={frontmatter.description} />
            <meta
              property="twitter:description"
              content={frontmatter.description}
            />
          </>
        )}
      </Head>
      <Layout className="prose lg:prose-lg mx-auto my-14">
        <header>
          <h1 className="!mb-0">{frontmatter.title}</h1>
          <time
            dateTime={datetime}
            className="uppercase text-sm text-gray-500 mb-12"
          >
            {frontmatter.date}
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
        </header>
        <Component components={componentMap} />
      </Layout>
      <Bio />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;
  if (typeof slug !== 'string') {
    return {
      notFound: true,
    };
  }
  const post = await getSinglePost(slug);
  return {
    props: {
      ...post,
      frontmatter: {
        ...post.frontmatter,
        date: new Date(post.frontmatter.date as string).toLocaleDateString(
          'en-AU',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }
        ),
      },
      datetime: new Date(post.frontmatter.date as string)
        .toISOString()
        .split('T')[0],
    },
  };
};

export const getStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export default Post;
