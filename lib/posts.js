import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content", "posts");

function toDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function readPost(fileName) {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  return { slug, data, content };
}

function mapPost({ slug, data }) {
  const date = toDate(data.date);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? null,
    date: date?.toISOString() ?? null,
    tags: Array.isArray(data.tags) ? data.tags : [],
    coverImage: data.cover_image ?? data.coverImage ?? null,
    canonicalUrl: data.canonical_url ?? data.canonicalUrl ?? null,
    devtoUrl: data.devto_url ?? data.devtoUrl ?? null,
  };
}

export function getSortedPostsData() {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map(readPost)
    .filter(({ data }) => data.published !== false)
    .map(mapPost)
    .filter((post) => post.date !== null)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPostData(slug) {
  const { data, content } = readPost(slug);
  const processed = await remark().use(gfm).use(html).process(content);

  return {
    ...mapPost({ slug, data }),
    contentHtml: processed.toString(),
  };
}

export function getAllPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({ params: { slug: file.replace(/\.md$/, "") } }));
}
