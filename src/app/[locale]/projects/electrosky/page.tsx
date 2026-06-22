import { setRequestLocale } from 'next-intl/server';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ElectroskyPage from '@/components/ElectroskyPage';

export default async function ElectroskyRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <NavBar />
      <ElectroskyPage />
      <Footer />
    </main>
  );
}
