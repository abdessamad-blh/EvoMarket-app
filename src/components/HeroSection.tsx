'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import React from 'react';

// Desktop floating cloud items
const floatingItems = [
  {
    key: 'service1',
    top: '35%', left: '25%',
    z: 0, scale: 1, opacity: 1,
    blur: '0px', zIndex: 50,
    color: 'text-gradient-gold',
    size: 'text-5xl lg:text-6xl',
  },
  {
    key: 'service2',
    top: '5%', left: '12%',
    z: -50, scale: 0.86, opacity: 0.72,
    blur: '0.8px', zIndex: 30,
    color: 'text-white',
    size: 'text-4xl lg:text-5xl',
  },
  {
    key: 'service3',
    top: '65%', left: '8%',
    z: -100, scale: 0.80, opacity: 0.55,
    blur: '1.2px', zIndex: 10,
    color: 'text-white',
    size: 'text-4xl lg:text-5xl',
  },
  {
    key: 'service4',
    top: '60%', left: '45%',
    z: -70, scale: 0.83, opacity: 0.65,
    blur: '1px', zIndex: 20,
    color: 'text-white',
    size: 'text-4xl lg:text-5xl',
  },
] as const;

// Mobile depth items — 2D only, scattered horizontally
const mobileFloatingItems = [
  { key: 'service2', top: '4%',  left: '75%', translateX: '-50%', opacity: 0.72, blur: '0px',   size: 'text-4xl sm:text-5xl', color: 'text-white/80' },
  { key: 'service1', top: '31%', left: '50%', translateX: '-50%', opacity: 1,    blur: '0px',   size: 'text-5xl sm:text-6xl', color: 'text-gradient-gold' },
  { key: 'service4', top: '63%', left: '4%',  translateX: '0%',   opacity: 0.60, blur: '0.5px', size: 'text-3xl sm:text-4xl', color: 'text-white/70' },
  { key: 'service3', top: '81%', left: '52%', translateX: '0%',   opacity: 0.45, blur: '1px',   size: 'text-2xl sm:text-3xl', color: 'text-white/55' },
] as const;

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();

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

      {/* Main two-column layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
                      flex flex-col md:flex-row items-center
                      gap-10 md:gap-8 lg:gap-16
                      pt-28 pb-20 md:pt-0 md:pb-0 md:min-h-screen">

        {/* ── LEFT: Hero Content ── (first on mobile + desktop) */}
        <div className="w-full md:w-[58%] lg:w-[60%]
                        text-center md:text-left
                        flex flex-col items-center md:items-start
                        order-1 mt-6 lg:mt-20">

          {/* Heading — Archivo for true mixed case */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[1.7rem] sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-[3.6rem] md:mb-18 tracking-tight overflow-visible"
          >
            {/* Line 1: "In EvoMarket Agency" — kept on one line */}
            <span className="block whitespace-nowrap">
              <span className="text-white">{t('title1')} </span>
              <span className="text-gradient-gold">{t('title2')}</span>
              <span className="text-white"> {t('title3')}</span>
            </span>
            {/* Line 2: "we create" */}
            <span className="text-white">{t('title4')}</span>
          </motion.h1>

          {/* ── Floating service labels ── */}

          {/* MOBILE: depth via size + opacity + blur, scattered horizontally */}
          <div className="block md:hidden relative w-full h-[250px] mb-8">
            {mobileFloatingItems.map((item, index) => (
              <motion.div
                key={`mobile-${item.key}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: item.opacity }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`absolute whitespace-nowrap
                            font-medium uppercase tracking-tighter
                            ${item.size} ${item.color}`}
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
                className={`
                  absolute whitespace-nowrap cursor-default
                  ${item.size}
                  uppercase tracking-tighter
                  ${item.color} transition-all duration-300
                `}
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

          {/* CTAs */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center w-full sm:w-auto"
          >
            <Link
              href={`/${locale}/devis`}
              className="w-full sm:w-auto group bg-[#F4B223] hover:bg-[#E09800] text-[#0A0E27] font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 text-base shadow-lg shadow-[#F4B223]/25 hover:shadow-[#F4B223]/40 flex items-center justify-center gap-2"
            >
              {t('cta1')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={`/${locale}#services`}
              className="w-full sm:w-auto group border-2 border-white/20 hover:border-[#F4B223]/50 text-white hover:text-[#F4B223] font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 text-base hover:bg-[#F4B223]/5 flex items-center justify-center"
            >
              {t('cta2')}
            </Link>
          </motion.div> */}
        </div>

        {/* ── RIGHT: Motion Logo ── (second on mobile + desktop) */}
        <div className="w-full md:w-[42%] lg:w-[30%]
                        flex items-center justify-center
                        order-2 mt-6 md:mt-16 lg:mt-20">

          <div className="relative
                          w-[180px] h-[180px]
                          sm:w-[220px] sm:h-[220px]
                          md:w-[300px] md:h-[300px]
                          lg:w-[360px] lg:h-[360px]
                          xl:w-[400px] xl:h-[400px]">

            {/* Image 1 : Reveal then float */}
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
              animate={{
                clipPath: "inset(0% 0% 0% 0%)",
                y: [8, -16]
              }}
              transition={{
                clipPath: { duration: 1.1, ease: "circOut" },
                y: {
                  delay: 2.7,
                  duration: 2.0,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut"
                }
              }}
            >
              <img src="/images/4.png" alt="Base Logo" className="w-full h-auto" />
            </motion.div>

            {/* Image 2 : Fade-in + glow loop */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
            >
              <motion.div
                className="w-full"
                animate={{
                  filter: [
                    "brightness(1) drop-shadow(0 0 0px rgba(244, 178, 35, 0))",
                    "brightness(1.3) drop-shadow(0 0 20px rgba(244, 178, 35, 0.4))"
                  ],
                  y: [8, -16]
                }}
                transition={{
                  delay: 2.7,
                  duration: 2.0,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut"
                }}
              >
                <img src="/images/5.png" alt="Digital Service Icon" className="w-full h-auto" />
              </motion.div>
            </motion.div>

          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
