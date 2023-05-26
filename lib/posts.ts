import { readdir } from 'fs/promises';
import path from 'path';

export interface PostMeta {
  title: string;
  date: string;
  description?: string;
}

export interface PostMetadata {
  meta: PostMeta;
  slug: string;
}

async function* getMdxFiles(dir: string): any {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getMdxFiles(res);
    } else if (/\.mdx?$/.test(res)) {
      const relativePath = res.split(POSTS_PATH).pop() ?? '';
      // console.log(relativePath);
      const slug = relativePath.replace(/(\/page)?\.mdx?$/, '');
      yield getMdxMetadata(slug);
    }
  }
}

/** Strips out the posts path (and index.mdx if it exists), returning a slug */
async function getMdxMetadata(fileName: string) {
  const relativePath = fileName.split(POSTS_PATH).pop() ?? '';
  const slug = relativePath.replace(/(\/page)?\.mdx?$/, '');
  const meta = await getMetaOfFile(slug);

  return {
    meta,
    slug: path.join('posts', slug),
  };
}

export const POSTS_PATH = path.join(process.cwd(), 'app', 'posts');

const getMetaOfFile = async (slug: string) => {
  try {
    // Restrict the directory with a hard-coded string to avoid traversal of all directories.
    const { metadata } = await import(`../app/posts${slug}/page.mdx`);
    return metadata;
  } catch (e) {
    console.error('Failed to fetch metadata for', slug);
  }
};

export const getAllPosts = async () => {
  const posts: PostMetadata[] = [];
  for await (const post of getMdxFiles(POSTS_PATH)) {
    posts.push(post);
  }
  const sorted = posts.sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );
  return sorted;
};

export const getSinglePost = async (slug: string) => {
  const meta = await getMetaOfFile(slug);

  return {
    meta,
  };
};
