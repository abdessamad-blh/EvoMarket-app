import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import NavBar from '@/components/NavBar';
import PageHero from '@/components/PageHero';
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
    <main className="relative overflow-x-hidden">
      <NavBar />

      <PageHero
        label={t('heroLabel')}
        title={t('title')}
        description={t('subtitle')}
        stats={[
          { value: '24h', label: locale === 'fr' ? 'Réponse garantie' : locale === 'ar' ? 'رد مضمون' : 'Guaranteed reply' },
          { value: '100%', label: locale === 'fr' ? 'Gratuit' : locale === 'ar' ? 'مجاني' : 'Free' },
        ]}
      />

      <section className="py-16 sm:py-20 relative">
        <div className="absolute inset-0 bg-[#0A0E27]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
