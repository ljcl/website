import { getSinglePost } from '@/utils/mdx';
import { Post } from '@/components/Post/Post.client';

export default async function Page({ params }: { params?: { slug?: string } }) {
  if (!params?.slug) return null;
  const post = await getSinglePost(params.slug);
  const frontmatter = {
    ...post.frontmatter,
    date: new Date(post.frontmatter.date as string).toLocaleDateString(
      'en-AU',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    ),
  };
  const datetime = new Date(post.frontmatter.date as string)
    .toISOString()
    .split('T')[0];
  return (
    <Post code={post.code} frontmatter={frontmatter} datetime={datetime} />
  );
}
