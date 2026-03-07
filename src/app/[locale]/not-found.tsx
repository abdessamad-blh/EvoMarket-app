'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('notFound');
  const locale = useLocale();

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0A0E27]">
      <div className="text-center px-4">
        <h1
          className="text-8xl sm:text-9xl text-gradient-gold mb-4"
          style={{ fontFamily: 'var(--font-bebas)' }}
        >
          404
        </h1>
        <h2
          className="text-3xl sm:text-4xl text-white mb-4"
          style={{ fontFamily: 'var(--font-bebas)' }}
        >
          {t('title')}
        </h2>
        <p className="text-white/50 mb-8 max-w-md mx-auto">
          {t('description')}
        </p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 bg-[#F4B223] hover:bg-[#E09800] text-[#0A0E27] font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('backHome')}
        </Link>
      </div>
    </main>
  );
}
