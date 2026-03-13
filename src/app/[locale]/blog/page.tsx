import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getAllPosts } from '@/lib/blog';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogListClient from './BlogListClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts(locale);

  return (
    <main className="relative">
      <NavBar />
      <BlogListClient posts={posts} />
      <Footer />
    </main>
  );
}
