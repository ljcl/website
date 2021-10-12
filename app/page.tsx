import type { Metadata } from "next";
import { PinCard } from "#components/Card/PinCard/PinCard";
import { PostCard } from "#components/Card/PostCard/PostCard";
import { VisuallyHidden } from "#components/VisuallyHidden/VisuallyHidden";
import { getAllPins, type PinboardPostPrepared } from "#lib/pinboard";
import { getAllPosts, type PostMetadata } from "#lib/posts";

const title = "Luke Clark";
const description = "Sydney based Software Engineer";

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
  pins: PinboardPostPrepared[],
) => {
  const content = [...posts, ...pins];
  const sorted = content.sort(
    (a, b) =>
      new Date(getContentDate(b)).getTime() -
      new Date(getContentDate(a)).getTime(),
  );
  return sorted;
};

const isPost = (
  item: PostMetadata | PinboardPostPrepared,
): item is PostMetadata => "meta" in item;

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
        <h1>{"Luke Clark"}</h1>
      </VisuallyHidden>
      <section className="layout-container">
        <VisuallyHidden>
          <h2>{"All Posts"}</h2>
        </VisuallyHidden>
        {content.map((item, _index) =>
          isPost(item) ? (
            <PostCard key={item.slug} {...item} />
          ) : (
            <PinCard key={item.href} {...item} />
          ),
        )}
      </section>
    </>
  );
}
