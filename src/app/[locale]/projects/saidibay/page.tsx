import { setRequestLocale } from 'next-intl/server';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SaidibayPage from '@/components/SaidibayPage';

export default async function SaidibayRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <NavBar />
      <SaidibayPage />
      <Footer />
    </main>
  );
}
