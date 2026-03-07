import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Bebas_Neue, Archivo } from 'next/font/google';
import { routing, Locale } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import React from 'react';
import WhatsAppButton from '@/components/WhatsAppButton';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = messages.meta as Record<string, string>;

  return {
    title: {
      default: meta.title,
      template: `%s | EvoMarket`,
    },
    description: meta.description,
    metadataBase: new URL('https://evomarket.ma'),
    alternates: {
      canonical: `https://evomarket.ma/${locale}`,
      languages: {
        fr: 'https://evomarket.ma/fr',
        en: 'https://evomarket.ma/en',
        ar: 'https://evomarket.ma/ar',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://evomarket.ma/${locale}`,
      siteName: 'EvoMarket',
      locale: locale === 'ar' ? 'ar_MA' : locale === 'en' ? 'en_US' : 'fr_FR',
      type: 'website',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'EvoMarket - Agence Digitale',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/images/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isRTL = locale === 'ar';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EvoMarket',
    url: 'https://evomarket.ma',
    logo: 'https://evomarket.ma/images/evologo.png',
    description: 'Agence digitale à Rabat, Maroc',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rabat',
      addressCountry: 'MA',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+212624458847',
        contactType: 'customer service',
        availableLanguage: ['French', 'English', 'Arabic'],
      },
    ],
    sameAs: [
      'https://www.instagram.com/evomarket.agency/',
    ],
  };

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className={`${bebasNeue.variable} ${archivo.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`min-h-screen bg-[#0A0E27] text-white ${archivo.className}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
