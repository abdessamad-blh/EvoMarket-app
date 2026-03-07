import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPostMeta, BlogPost } from './types';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function getAllPosts(locale?: string): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.mdx', '');
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      date: data.date || '',
      author: data.author || 'EvoMarket',
      tags: data.tags || [],
      image: data.image || '/images/blog/default.jpg',
      readingTime: data.readingTime || '5',
      locale: data.locale || 'fr',
    } as BlogPostMeta;
  });

  const filtered = locale ? posts.filter((p) => p.locale === locale) : posts;
  return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || '',
    excerpt: data.excerpt || '',
    date: data.date || '',
    author: data.author || 'EvoMarket',
    tags: data.tags || [],
    image: data.image || '/images/blog/default.jpg',
    readingTime: data.readingTime || '5',
    locale: data.locale || 'fr',
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}
