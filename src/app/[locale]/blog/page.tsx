import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getAllPosts } from '@/lib/blog';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
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
  const t = await getTranslations({ locale, namespace: 'blog' });

  const posts = getAllPosts(locale);

  return (
    <main className="relative bg-[#0A0E27]">
      <NavBar />
      <PageHero
        label={t('heroLabel')}
        title={t('title')}
        description={t('description')}
        stats={[
          { value: '+10', label: locale === 'ar' ? 'مقالات' : locale === 'fr' ? 'Articles' : 'Articles' },
          { value: '+1k', label: locale === 'ar' ? 'قراء' : locale === 'fr' ? 'Lecteurs' : 'Readers' },
        ]}
      />
      <BlogListClient posts={posts} />
      <Footer />
    </main>
  );
}
