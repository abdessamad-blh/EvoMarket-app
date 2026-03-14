import { setRequestLocale, getTranslations } from 'next-intl/server';
import NavBar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    // title: t('badge'),
    description: t('description'),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <main className="relative bg-[#0A0E27]">
      <NavBar />
      <PageHero
        label={t('heroLabel')}
        title={t('badge')}
        description={t('description')}
      />
      <ContactSection standalone />
      <Footer />
    </main>
  );
}
