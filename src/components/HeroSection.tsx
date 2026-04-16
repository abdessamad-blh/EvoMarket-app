'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import React from 'react';

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

function PartnersTicker({ label }: { label: string }) {
  return (
    <div className="pt-4 border-t border-white/6">
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        <div className="flex-shrink-0 text-center sm:text-left">
          <p className="text-white/45 text-xs uppercase tracking-[0.18em] font-medium whitespace-nowrap">
            {label}
          </p>
          <div className="w-8 h-px bg-[#F4B223]/50 mt-1.5 mx-auto sm:mx-0" />
        </div>
        <div className="relative flex-1 w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#0A0E27] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#0A0E27] to-transparent z-10 pointer-events-none" />
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
                  sizes="96px"
                  className="object-contain grayscale invert brightness-125"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Desktop floating cloud items — centered, full width
const floatingItems = [
  {
    key: 'service1',
    top: '35%', left: '32%',
    z: 0, scale: 1, opacity: 1,
    blur: '0px', zIndex: 50,
    color: 'text-gradient-gold',
    size: 'text-5xl lg:text-6xl',
  },
  {
    key: 'service5',
    top: '5%', left: '18%',
    z: -50, scale: 0.86, opacity: 0.72,
    blur: '0.8px', zIndex: 30,
    color: 'text-white',
    size: 'text-4xl lg:text-5xl',
  },
  {
    key: 'service3',
    top: '65%', left: '12%',
    z: -100, scale: 0.80, opacity: 0.55,
    blur: '1.2px', zIndex: 10,
    color: 'text-white',
    size: 'text-4xl lg:text-5xl',
  },
  {
    key: 'service4',
    top: '60%', left: '52%',
    z: -70, scale: 0.83, opacity: 0.65,
    blur: '1px', zIndex: 20,
    color: 'text-white',
    size: 'text-4xl lg:text-5xl',
  },
  {
    key: 'service2',
    top: '10%', left: '62%',
    z: -85, scale: 0.81, opacity: 0.52,
    blur: '1.1px', zIndex: 15,
    color: 'text-white',
    size: 'text-3xl lg:text-4xl',
  },
] as const;

// Mobile depth items — 2D only, scattered horizontally
const mobileFloatingItems = [
  { key: 'service5', top: '10%', left: '75%', translateX: '-50%', opacity: 0.72, blur: '0px',   size: 'text-4xl sm:text-5xl', color: 'text-white/80' },
  { key: 'service2', top: '13%', left: '0%',  translateX: '0%',   opacity: 0.45, blur: '0.8px', size: 'text-2xl sm:text-3xl', color: 'text-white/55' },
  { key: 'service1', top: '31%', left: '50%', translateX: '-50%', opacity: 1,    blur: '0px',   size: 'text-5xl sm:text-6xl', color: 'text-gradient-gold' },
  { key: 'service4', top: '55%', left: '4%',  translateX: '0%',   opacity: 0.60, blur: '0.5px', size: 'text-3xl sm:text-4xl', color: 'text-white/70' },
  { key: 'service3', top: '70%', left: '52%', translateX: '0%',   opacity: 0.45, blur: '1px',   size: 'text-2xl sm:text-3xl', color: 'text-white/55' },
] as const;

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const trustLabel =
    locale === 'fr' ? 'Ils nous font confiance' :
    locale === 'ar' ? 'يثقون بنا' :
    'They trust us';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-[#0A0E27] via-[#0D1230] to-[#112258]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#F4B223 1px, transparent 1px), linear-gradient(90deg, #F4B223 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Decorative blur */}
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#112258]/40 rounded-full blur-3xl animate-float-delayed" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Single-column centered layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
                      flex flex-col items-center
                      pt-20 pb-20 md:pt-20 md:pb-24 md:min-h-screen justify-center">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-[1.2rem] sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-5 md:mb-10 tracking-tight overflow-visible text-center md:text-left w-full"
        >
          <span className="block whitespace-nowrap">
            <span className="text-white">{t('title1')} </span>
            <span className="text-gradient-gold">{t('title2')}</span>
            <span className="text-white"> {t('title3')}</span>
          </span>
          <span className="text-white">{t('title4')}</span>
        </motion.h1>

        {/* ── Floating service labels ── */}

        {/* MOBILE */}
        <div className="block md:hidden relative w-full h-[250px] mb-1">
          {mobileFloatingItems.map((item, index) => (
            <motion.div
              key={`mobile-${item.key}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: item.opacity }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`absolute whitespace-nowrap font-medium uppercase tracking-tighter ${item.size} ${item.color}`}
              style={{
                fontFamily: 'var(--font-bebas)',
                top: item.top,
                left: item.left,
                filter: `blur(${item.blur})`,
                transform: `translateX(${item.translateX})`,
              }}
            >
              {t(`floating.${item.key}`)}
            </motion.div>
          ))}
        </div>

        {/* DESKTOP: layered 3D cloud */}
        <div
          className="hidden md:block relative w-full h-[200px] lg:h-[240px] mb-1 mt-5"
          style={{ perspective: '1000px' }}
        >
          {floatingItems.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: item.opacity, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{
                opacity: 1,
                scale: item.scale + 0.05,
                filter: 'blur(0px)',
                transition: { duration: 0.2 },
              }}
              className={`absolute whitespace-nowrap cursor-default ${item.size} uppercase tracking-tighter ${item.color} transition-all duration-300`}
              style={{
                fontFamily: 'var(--font-bebas)',
                top: item.top,
                left: item.left,
                filter: `blur(${item.blur})`,
                transform: `scale(${item.scale}) translateZ(${item.z}px)`,
                transformStyle: 'preserve-3d',
                zIndex: item.zIndex,
              }}
            >
              {t(`floating.${item.key}`)}
            </motion.div>
          ))}
        </div>

      </div>

      {/* Partners ticker — bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8 pb-4">
        <PartnersTicker label={trustLabel} />
      </div>
    </section>
  );
}
