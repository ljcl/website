import { getAllPosts, PostMetadata } from 'lib/posts';
import { getAllPins, PinboardPostPrepared } from 'lib/pinboard';
import { PostCard } from 'app/components/Card/PostCard/PostCard';
import { PinCard } from 'app/components/Card/PinCard/PinCard';
import { VisuallyHidden } from 'app/components/VisuallyHidden/VisuallyHidden';
import { Bio } from 'app/components/Bio/Bio';

import type { Metadata } from 'next';

const title = 'Luke Clark';
const description = 'Sydney based Software Engineer';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
};

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
): item is PostMetadata => 'meta' in item;

const getContentDate = (content: PostMetadata | PinboardPostPrepared) => {
  if (isPost(content)) {
    return content.meta.date;
  }
  return content.time;
};

export default async function Page() {
  const posts = await getAllPosts();
  const pins = await getAllPins({ AUTH_TOKEN: process.env.PINBOARD_AUTH });
  const content = mergePostsAndPins(posts, pins);

  return (
    <>
      <VisuallyHidden>
        <h1>Luke Clark</h1>
      </VisuallyHidden>
      <section className="mx-auto container px-4">
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
      </section>
    </>
  );
}
