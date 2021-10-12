import fs from 'fs';
import { readdir } from 'fs/promises';
import withShiki from './rehype-shiki';
import * as shiki from 'shiki';
import remarkGfm from 'remark-gfm';
import path from 'path';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';

export interface PostFrontmatter {
  title: string;
  date: string;
  description?: string;
}

export interface PostMetadata {
  frontmatter: PostFrontmatter;
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
      const slug = relativePath.replace(/(\/index)?\.mdx?$/, '');
      yield getMdxMetadata(slug);
    }
  }
}

/** Strips out the posts path (and index.mdx if it exists), returning a slug */
function getMdxMetadata(fileName: string) {
  const source = getSourceOfFile([POSTS_PATH, fileName]);
  const relativePath = fileName.split(POSTS_PATH).pop() ?? '';
  const slug = relativePath.replace(/(\/index)?\.mdx?$/, '');

  const { data: frontmatter } = matter(source);

  return {
    frontmatter: serialiseFrontmatter(frontmatter as PostFrontmatter),
    slug: slug,
  };
}

export const POSTS_PATH = path.join(process.cwd(), 'content/blog/');

export const getSourceOfFile = (paths: [string, string]) => {
  try {
    return fs.readFileSync(path.join(...paths) + '.mdx', 'utf8');
  } catch {
    // We assume that the file is inside a directory
    return fs.readFileSync(path.join(...paths, 'index.mdx'), 'utf8');
  }
};

export const serialiseFrontmatter = (frontmatter: PostFrontmatter) => ({
  ...frontmatter,
  date: frontmatter?.date?.toString() || null,
});

export const getAllPosts = async () => {
  const posts: PostMetadata[] = [];
  for await (const post of getMdxFiles(POSTS_PATH)) {
    posts.push(post);
  }
  const sorted = posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
  return sorted;
};

export const getSinglePost = async (slug: string) => {
  const mdxSource = getSourceOfFile([POSTS_PATH, slug]);
  const highlighter = await shiki.getHighlighter({
    theme: 'github-dark',
  });

  const { code, frontmatter } = await bundleMDX({
    source: mdxSource,
    cwd: POSTS_PATH + slug,
    xdmOptions(options) {
      options.rehypePlugins = [[withShiki, { highlighter }]];
      options.remarkPlugins = [remarkGfm, ...(options.remarkPlugins ?? [])];
      return options;
    },
  });

  return {
    frontmatter: serialiseFrontmatter(frontmatter as PostFrontmatter),
    code,
  };
};
