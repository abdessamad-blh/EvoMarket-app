import { setRequestLocale } from 'next-intl/server';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import PortfolioSection from '@/components/PortfolioSection';
import AboutSection from '@/components/AboutSection';
import BlogPreview from '@/components/BlogPreview';
import Footer from '@/components/Footer';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative">
      <NavBar />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <ProcessSection />
      {/* <AboutSection /> */}
      <BlogPreview />
      <Footer />
    </main>
  );
}
