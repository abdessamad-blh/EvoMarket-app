import { Suspense } from 'react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import NavBar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import DevisForm from '@/components/devis/DevisForm';
import Footer from '@/components/Footer';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('devisSection');

  return (
    <main className="relative">
      <NavBar />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />

      {/* Quick Quote Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#0D1230] to-[#112258]" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#F4B223]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#112258]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl text-[#F4B223] mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              {t('title')}
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              {t('description')}
            </p>
          </div>
          <Suspense fallback={
            <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[400px]">
              <div className="w-8 h-8 border-2 border-[#F4B223]/30 border-t-[#F4B223] rounded-full animate-spin" />
            </div>
          }>
            <DevisForm />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  );
}
