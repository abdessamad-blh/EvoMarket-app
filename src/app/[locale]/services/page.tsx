import { setRequestLocale } from 'next-intl/server';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServicesPageClient from '@/components/ServicesPageClient';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative">
      <NavBar />
      <ServicesPageClient />
      <Footer />
    </main>
  );
}
