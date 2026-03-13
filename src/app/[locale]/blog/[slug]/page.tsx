import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { getPostBySlug, getAllSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPostContent from './BlogPostContent';

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: 'Article non trouvé' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'blog' });

  const blogPostSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `https://evomarket.ma${post.image}`,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'EvoMarket',
      logo: {
        '@type': 'ImageObject',
        url: 'https://evomarket.ma/images/evologo.png',
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('title'),
        item: `https://evomarket.ma/${locale}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: post.title,
        item: `https://evomarket.ma/${locale}/blog/${slug}`,
      },
    ],
  };

  return (
    <main className="relative">
      <NavBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPostContent post={post} />
      <Footer />
    </main>
  );
}
