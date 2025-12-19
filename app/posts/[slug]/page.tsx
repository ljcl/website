import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Article } from "#components/Article/Article";
import { getAllPosts, getSinglePost } from "#lib/posts";

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

  const title = `${meta.title} - Luke Clark`;

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
      <Article title={meta.title} date={meta.date} dateTime={meta.dateTime}>
        <Content />
      </Article>
    );
  } catch {
    notFound();
  }
}
