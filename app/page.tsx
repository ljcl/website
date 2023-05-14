import { getAllPosts, PostMetadata } from '@/utils/mdx';
import { getAllPins, PinboardPostPrepared } from '@/utils/pinboard';
import { PostCard } from '@/components/Card/PostCard/PostCard';
import { PinCard } from '@/components/Card/PinCard/PinCard';
import { VisuallyHidden } from '@/components/VisuallyHidden/VisuallyHidden';
import { Bio } from '@/components/Bio/Bio';

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

export default async function Page() {
  const posts = await getAllPosts();
  const pins = await getAllPins({ AUTH_TOKEN: process.env.PINBOARD_AUTH });
  const content = mergePostsAndPins(posts, pins);

  const title = 'Luke Clark';
  const description = 'Sydney based Software Engineer';
  return (
    <>
      <VisuallyHidden>
        <h1>Luke Clark Homepage</h1>
      </VisuallyHidden>
      <Bio />
      <>
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
      </>
    </>
  );
}
