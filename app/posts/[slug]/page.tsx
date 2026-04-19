import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "#components/Article/Article";
import { PostCard } from "#components/Card/PostCard/PostCard";
import { getAdjacentPosts, getAllPosts, getSinglePost } from "#lib/posts";

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

  return {
    title: meta.title,
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
  const [post, adjacent] = await Promise.all([
    getSinglePost(slug).catch(() => null),
    getAdjacentPosts(slug),
  ]);

  if (!post) notFound();

  const { meta, Content } = post;
  const { prev, next } = adjacent;

  return (
    <>
      <Article title={meta.title} date={meta.date} dateTime={meta.dateTime}>
        <Content />
      </Article>
      {(prev || next) && (
        <section className="layout-container pb-16">
          <hr className="rule rule--strong" />
          <nav
            aria-label="Post navigation"
            className="grid grid-cols-1 md:grid-cols-2"
          >
            {prev && (
              <div className="grid grid-rows-[auto_1fr]">
                <span className="eyebrow mt-6 mb-2 block">{"Older"}</span>
                <PostCard
                  className="h-full"
                  title={prev.meta.title}
                  date={prev.meta.date}
                  description={prev.meta.description}
                  slug={prev.slug}
                />
              </div>
            )}
            {next && (
              <div className="grid grid-rows-[auto_1fr] md:col-start-2">
                <span className="eyebrow mt-6 mb-2 block">{"Newer"}</span>
                <PostCard
                  className="h-full"
                  title={next.meta.title}
                  date={next.meta.date}
                  description={next.meta.description}
                  slug={next.slug}
                />
              </div>
            )}
          </nav>
        </section>
      )}
    </>
  );
}
