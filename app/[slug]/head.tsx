import { getSinglePost } from '@/utils/mdx';

export default async function Head({ params }: { params?: { slug?: string } }) {
  if (!params?.slug) return null;
  const { frontmatter } = await getSinglePost(params.slug);

  const title = frontmatter.title + ' Luke Clark';
  return (
    <>
      <title key="title">{title}</title>
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
    </>
  );
}
