import Head from 'next/head';
import { getAllPosts, PostMetadata } from '@/utils/mdx';
import { getAllPins, PinboardPostPrepared } from '@/utils/pinboard';
import { Layout } from '@/components/Layout/Layout';
import { PostCard } from '@/components/Card/PostCard/PostCard';
import { PinCard } from '@/components/Card/PinCard/PinCard';
import { VisuallyHidden } from '@/components/VisuallyHidden/VisuallyHidden';
import { Bio } from '@/components/Bio/Bio';

interface BlogListProps {
  content: (PostMetadata | PinboardPostPrepared)[];
}

export default function BlogList({ content }: BlogListProps) {
  const title = 'Luke Clark';
  const description = 'Sydney based Software Engineer';
  return (
    <>
      <Head>
        <title>Luke Clark</title>
        <meta property="og:title" content={title} />
        <meta property="twitter:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="twitter:description" content={description} />
      </Head>
      <Layout>
        <VisuallyHidden>
          <h1>Luke Clark Homepage</h1>
        </VisuallyHidden>
        <Bio />
        <div>
          <VisuallyHidden>
            <h2>All Posts</h2>
          </VisuallyHidden>
          {content.map((item, index) =>
            isPost(item) ? (
              <PostCard key={index} {...item} />
            ) : (
              <PinCard key={index} {...item} />
            )
          )}
        </div>
      </Layout>
    </>
  );
}

const mergePostsAndPins = (
  posts: PostMetadata[],
  pins: PinboardPostPrepared[]
) => {
  const content = [...posts, ...pins];
  const sorted = content.sort(
    (a, b) =>
      new Date(getContentDate(b)).getTime() -
      new Date(getContentDate(a)).getTime()
  );
  return sorted;
};

const isPost = (
  item: PostMetadata | PinboardPostPrepared
): item is PostMetadata => 'frontmatter' in item;

const getContentDate = (content: PostMetadata | PinboardPostPrepared) => {
  if (isPost(content)) {
    return content.frontmatter.date;
  }
  return content.time;
};

export const getStaticProps = async () => {
  const posts = await getAllPosts();
  const pins = await getAllPins({ AUTH_TOKEN: process.env.PINBOARD_AUTH });
  const content = mergePostsAndPins(posts, pins);

  return {
    props: { content },
  };
};
