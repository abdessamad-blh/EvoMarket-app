import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllSlugs } from '@/lib/blog';

const BASE_URL = 'https://evomarket.ma';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const blogSlugs = getAllSlugs();

  const staticPages = ['', '/blog'];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'daily',
        priority: page === '' ? 1.0 : 0.8,
      });
    }
  }

  // Blog posts for each locale
  for (const locale of locales) {
    for (const slug of blogSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
