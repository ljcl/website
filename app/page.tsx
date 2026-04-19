import { type Metadata } from "next";
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

const isPost = (
  item: PostMetadata | PinboardPostPrepared,
): item is PostMetadata => "meta" in item;

const getContentDate = (item: PostMetadata | PinboardPostPrepared) =>
  isPost(item) ? item.meta.date : item.time;

const mergeAndSort = (posts: PostMetadata[], pins: PinboardPostPrepared[]) =>
  [...posts, ...pins].sort(
    (a, b) =>
      new Date(getContentDate(b)).getTime() -
      new Date(getContentDate(a)).getTime(),
  );

export default async function Page() {
  const [posts, pins] = await Promise.all([
    getAllPosts(),
    getAllPins({ AUTH_TOKEN: process.env.PINBOARD_AUTH }),
  ]);
  const content = mergeAndSort(posts, pins);

  return (
    <section className="layout-container pt-8">
      <VisuallyHidden>
        <h1>{"Luke Clark"}</h1>
      </VisuallyHidden>
      <ol className="m-0 list-none p-0">
        {content.map((item) => (
          <li key={isPost(item) ? item.slug : item.href}>
            {isPost(item) ? (
              <PostCard
                title={item.meta.title}
                date={item.meta.date}
                description={item.meta.description}
                slug={item.slug}
              />
            ) : (
              <PinCard
                title={item.description}
                date={item.time}
                href={item.href}
                description={item.extended}
              />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
