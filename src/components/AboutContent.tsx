'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, Zap, BarChart3, Heart, ArrowRight } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

const PARTNER_LOGOS = [
  '/images/partners/partner9.png',
  '/images/partners/partner7.png',
  '/images/partners/partner10.png',
  '/images/partners/partner11.png',
  '/images/partners/partner1.png',
  '/images/partners/partner2.png',
  '/images/partners/partner3.png',
  '/images/partners/partner4.png',
  '/images/partners/partner5.png',
  '/images/partners/partner6.png',
  '/images/partners/partner8.png',
];
const LOGOS_LOOP = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

const VALUE_ICONS = [Globe, Zap, BarChart3, Heart];

export default function AboutContent() {
  const t = useTranslations('aboutPage');
  const locale = useLocale();

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
    { value: t('stat4Value'), label: t('stat4Label') },
  ];

  const values = [
    { icon: VALUE_ICONS[0], title: t('value1Title'), desc: t('value1Desc') },
    { icon: VALUE_ICONS[1], title: t('value2Title'), desc: t('value2Desc') },
    { icon: VALUE_ICONS[2], title: t('value3Title'), desc: t('value3Desc') },
    { icon: VALUE_ICONS[3], title: t('value4Title'), desc: t('value4Desc') },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0E27]" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#F4B223]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#112258]/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-[#F4B223]/10 border border-[#F4B223]/30 text-[#F4B223] text-sm font-medium px-5 py-2 rounded-full mb-6">
              {t('heroBadge')}
            </span>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              {t('heroTitle')}
            </h1>
            <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
              {t('heroDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Story + Stats ── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#0D1230] to-[#0A0E27]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Story text */}
            <ScrollAnimationWrapper>
              <span className="inline-block bg-[#F4B223]/10 border border-[#F4B223]/30 text-[#F4B223] text-sm font-medium px-5 py-2 rounded-full mb-6">
                {t('storyBadge')}
              </span>
              <h2
                className="text-4xl sm:text-5xl text-white mb-6 tracking-tight"
                style={{ fontFamily: 'var(--font-bebas)' }}
              >
                {t('storyTitle')}
              </h2>
              <p className="text-white/60 leading-relaxed mb-5 text-base">
                {t('storyP1')}
              </p>
              <p className="text-white/60 leading-relaxed text-base">
                {t('storyP2')}
              </p>
            </ScrollAnimationWrapper>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#0D1230] border border-white/5 rounded-2xl p-8 text-center hover:border-[#F4B223]/20 transition-colors duration-300"
                >
                  <div
                    className="text-5xl sm:text-6xl text-[#F4B223] mb-2 leading-none"
                    style={{ fontFamily: 'var(--font-bebas)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#0A0E27]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimationWrapper className="text-center mb-14">
            <span className="inline-block bg-[#F4B223]/10 border border-[#F4B223]/30 text-[#F4B223] text-sm font-medium px-5 py-2 rounded-full mb-4">
              {t('valuesBadge')}
            </span>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl text-white mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              {t('valuesTitle')}
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              {t('valuesDescription')}
            </p>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-[#0D1230] border border-white/5 rounded-2xl p-6 hover:border-[#F4B223]/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F4B223]/10 border border-[#F4B223]/20 flex items-center justify-center mb-4 group-hover:bg-[#F4B223]/15 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-[#F4B223]" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{val.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Partners ticker ── */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#0D1230] to-[#0A0E27]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimationWrapper>
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
              <div className="flex-shrink-0 text-center sm:text-left">
                <p className="text-white/45 text-xs uppercase tracking-[0.18em] font-medium whitespace-nowrap">
                  {t('partnersLabel')}
                </p>
                <div className="w-8 h-px bg-[#F4B223]/50 mt-1.5 mx-auto sm:mx-0" />
              </div>
              <div className="relative flex-1 w-full overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#0D1230] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#0D1230] to-transparent z-10 pointer-events-none" />
                <motion.div
                  className="flex gap-10 items-center"
                  style={{ width: 'max-content' }}
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
                >
                  {LOGOS_LOOP.map((src, i) => (
                    <div key={i} className="flex-shrink-0 relative w-36 h-12 opacity-55 hover:opacity-85 transition-opacity duration-300">
                      <Image
                        src={src}
                        alt={`Partner ${(i % PARTNER_LOGOS.length) + 1}`}
                        fill
                        sizes="144px"
                        className="object-contain grayscale invert brightness-125"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#0D1230] to-[#112258]" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#F4B223]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#112258]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimationWrapper>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl text-[#F4B223] mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              {t('ctaTitle')}
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
              {t('ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/devis`}
                className="bg-[#F4B223] hover:bg-[#E09800] text-[#0A0E27] font-semibold py-3 px-8 rounded-full transition-all duration-200 text-sm shadow-lg shadow-[#F4B223]/20 hover:shadow-[#F4B223]/40 hover:scale-105 inline-flex items-center gap-2 justify-center"
              >
                {t('ctaButton')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}/services`}
                className="border border-white/20 hover:border-[#F4B223]/40 text-white hover:text-[#F4B223] font-medium py-3 px-8 rounded-full transition-all duration-200 text-sm"
              >
                {t('ctaSecondary')}
              </Link>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </>
  );
}
