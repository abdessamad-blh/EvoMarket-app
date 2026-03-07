import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import DevisForm from '@/components/devis/DevisForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'devis.meta' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function DevisPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'devis' });

  return (
    <main className="relative">
      <NavBar />

      <section className="py-16 sm:py-24 relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#0D1230] to-[#112258]" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#F4B223]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#112258]/40 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-[#F4B223]/10 border border-[#F4B223]/30 text-[#F4B223] text-sm font-medium px-5 py-2 rounded-full mb-4">
              EvoMarket
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              {t('title')}
            </h1>
            <p className="text-lg text-white/60 max-w-xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Form */}
          <Suspense fallback={
            <div className="max-w-2xl mx-auto bg-white/[0.03] border border-white/10 rounded-3xl p-10 flex items-center justify-center min-h-[400px]">
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
