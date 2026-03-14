import { setRequestLocale, getTranslations } from 'next-intl/server';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PortfolioSection from '@/components/PortfolioSection';
import AboutContent from '@/components/AboutContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative">
      <NavBar />
      <AboutContent />
      <PortfolioSection />
      <Footer />
    </main>
  );
}
