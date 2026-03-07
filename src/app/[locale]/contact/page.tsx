import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import NavBar from '@/components/NavBar';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: t('badge'),
    description: t('description'),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative bg-[#0A0E27]">
      <NavBar />
      <ContactSection standalone />
      <Footer />
    </main>
  );
}
