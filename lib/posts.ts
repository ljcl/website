import { readdir } from "node:fs/promises";
import path from "node:path";

export interface PostMeta {
  title: string;
  date: string;
  description?: string;
}

export interface PostMetadata {
  meta: PostMeta;
  slug: string;
}

async function* getMdxFiles(
  dir: string,
): AsyncGenerator<PostMetadata, void, unknown> {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getMdxFiles(res);
    } else if (/\.mdx?$/.test(res)) {
      yield getMdxMetadata(res);
    }
  }
}

/** Strips out the posts path (and index.mdx if it exists), returning a slug */
async function getMdxMetadata(fileName: string) {
  const relativePath = fileName.split(POSTS_PATH).pop() ?? "";
  const slug = relativePath.replace(/(\/page)?\.mdx?$/, "").replace("/", "");
  const meta = await getMetaOfFile(slug);

  return {
    meta,
    slug,
  };
}

export const POSTS_PATH = path.join(process.cwd(), "content", "posts");

const getMetaOfFile = async (slug: string) => {
  try {
    const { metadata } = await import(`../content/posts/${slug}/page.mdx`);
    return metadata;
  } catch {
    console.error("Failed to fetch metadata for", slug);
  }
};

export const getAllPosts = async () => {
  const posts: PostMetadata[] = [];
  for await (const post of getMdxFiles(POSTS_PATH)) {
    posts.push(post);
  }
  const sorted = posts.sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
  );
  return sorted;
};

function augmentMetadata(meta: PostMeta) {
  const date = new Date(meta.date);
  return {
    ...meta,
    date,
    dateTime: date.toISOString().split("T")[0],
  };
}

export const getSinglePost = async (slug: string) => {
  const post = await import(`../content/posts/${slug}/page.mdx`);

  return {
    meta: augmentMetadata(post.metadata),
    slug,
    Content: post.default,
  };
};
