'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import Lottie from 'lottie-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import socialMediaAnim from '../../public/images/serviceicons/social-media-influencer.json';
import videoAnim      from '../../public/images/serviceicons/video-marketing.json';
import webAnim        from '../../public/images/serviceicons/web-address-registration.json';
import mobileAnim     from '../../public/images/serviceicons/mobile-development.json';
import emailAnim      from '../../public/images/serviceicons/email-marketing.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const serviceAnimations: any[] = [socialMediaAnim, videoAnim, webAnim, mobileAnim, emailAnim];
const serviceKeys  = ['socialMedia', 'contentCreation', 'webDev', 'mobileApp', 'digitalMarketing'];
const serviceDevisParams = ['social', 'content', 'web', 'mobile', 'ads'];

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

// Desktop arc — ~90 % screen width
// Slots: 0=far-left · 1=near-left · 2=center · 3=near-right · 4=far-right
// x,y = translateX/Y from container center
const ARC_SLOTS = [
  { x: -480, y: 30,  scale: 0.52, opacity: 0.22, zIndex: 1 },
  { x: -260, y: 8,   scale: 0.72, opacity: 0.55, zIndex: 2 },
  { x:    0, y: -28, scale: 1.00, opacity: 1.00, zIndex: 5 },
  { x:  260, y: 8,   scale: 0.72, opacity: 0.55, zIndex: 2 },
  { x:  480, y: 30,  scale: 0.52, opacity: 0.22, zIndex: 1 },
] as const;

// distance from activeIndex → visual slot
const DIST_TO_SLOT = [2, 3, 4, 0, 1] as const;

const ICON_SIZE = 132; // base icon circle diameter (px)

/* ─────────────────────────────────────────────
   PARTNERS TICKER
───────────────────────────────────────────── */
function PartnersTicker({ label }: { label: string }) {
  return (
    <div className="pb-6 border-b border-white/6">
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
              <div key={i} className="flex-shrink-0 relative w-36 h-15 opacity-55 hover:opacity-85 transition-opacity duration-300">
                <Image
                  src={src}
                  alt={`Partner ${(i % PARTNER_LOGOS.length) + 1}`}
                  fill sizes="96px"
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

/* ─────────────────────────────────────────────
   DESKTOP ARC CAROUSEL
───────────────────────────────────────────── */
function ArcCarousel({
  activeIndex, setActiveIndex, t, locale,
}: {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  t: ReturnType<typeof useTranslations>;
  locale: string;
}) {
  const prev = () => setActiveIndex((activeIndex - 1 + serviceKeys.length) % serviceKeys.length);
  const next = () => setActiveIndex((activeIndex + 1) % serviceKeys.length);

  return (
    <div className="select-none">
      {/* Arc icon strip — full-width, overflow visible so icons can bleed to section edge */}
      <div className="relative w-full overflow-visible" style={{ height: 180 }}>
        {/* Dashed arc spanning ~full container width */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 180"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 175 C 300 60, 700 60, 1000 175"
            fill="none"
            stroke="rgba(244,178,35,0.1)"
            strokeWidth="1.5"
            strokeDasharray="6 9"
          />
        </svg>

        {/* Icon bubbles */}
        {serviceKeys.map((key, dataIdx) => {
          const dist     = (dataIdx - activeIndex + serviceKeys.length) % serviceKeys.length;
          const slot     = DIST_TO_SLOT[dist];
          const pos      = ARC_SLOTS[slot];
          const anim     = serviceAnimations[dataIdx];
          const isCenter = slot === 2;

          return (
            <motion.div
              key={key}
              className="absolute"
              style={{
                left: `calc(50% - ${ICON_SIZE / 2}px)`,
                top:  `calc(50% - ${ICON_SIZE / 2}px)`,
                zIndex: pos.zIndex,
                cursor: isCenter ? 'default' : 'pointer',
              }}
              animate={{ x: pos.x, y: pos.y, scale: pos.scale, opacity: pos.opacity }}
              transition={{ type: 'spring', stiffness: 270, damping: 30 }}
              onClick={() => !isCenter && setActiveIndex(dataIdx)}
            >
              <div
                className={`
                  rounded-full flex items-center justify-center transition-colors duration-300
                  ${isCenter
                    ? 'bg-[#F4B223]/15 border-2 border-[#F4B223] shadow-[0_0_14px_rgba(244,178,35,0.22),0_0_32px_rgba(244,178,35,0.08)]'
                    : 'bg-[#0D1230] border border-white/12 hover:border-[#F4B223]/30'}
                `}
                style={{ width: ICON_SIZE, height: ICON_SIZE }}
              >
                {anim
                  ? <Lottie animationData={anim} loop style={{ width: 82, height: 82 }} />
                  : <Code2 className="w-10 h-10 text-[#F4B223]" />
                }
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Text content + arrows, centered below the active icon ── */}
      <div className="relative flex items-start justify-center gap-4 mt-4 max-w-lg mx-auto">
        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Previous service"
          className="flex-shrink-0 mt-2 w-10 h-10 rounded-full border border-white/10 hover:border-[#F4B223]/50 flex items-center justify-center text-white/40 hover:text-[#F4B223] transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Inline text — no card, just content */}
        <div className="flex-1 text-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <h3
                className="text-[36px] leading-tight text-white tracking-wide mb-2"
                style={{ fontFamily: 'var(--font-bebas)' }}
              >
                {t(`${serviceKeys[activeIndex]}.title`)}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-4 max-w-xs">
                {t(`${serviceKeys[activeIndex]}.description`)}
              </p>
              <Link
                href={`/${locale}/services`}
                className="text-[#F4B223] text-sm font-medium hover:underline flex items-center gap-1.5"
              >
                {t('seeAllServices')}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Next service"
          className="flex-shrink-0 mt-2 w-10 h-10 rounded-full border border-white/10 hover:border-[#F4B223]/50 flex items-center justify-center text-white/40 hover:text-[#F4B223] transition-all duration-200"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {serviceKeys.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-6 h-2 bg-[#F4B223]' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MOBILE ARC CAROUSEL
   • 3 icons on the arc: left-peek · center · right-peek
   • Arc spans full phone width (overflow:hidden clips side icons)
   • Touch-swipe to navigate — no arrows
   • Content box below (same as desktop)
───────────────────────────────────────────── */
function MobileArcCarousel({
  activeIndex, setActiveIndex, t, locale,
}: {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  t: ReturnType<typeof useTranslations>;
  locale: string;
}) {
  // Measure container half-width to compute exact peek offset
  const [halfW, setHalfW] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth / 2 :187.5
  );
  const arcRef      = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    const measure = () => {
      if (arcRef.current) setHalfW(arcRef.current.offsetWidth / 2);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const go = (dir: 1 | -1) =>
    setActiveIndex((activeIndex + dir + serviceKeys.length) % serviceKeys.length);

  // Side icon peek:  PEEK_PX of the visual icon is visible at the edge
  const PEEK_PX    = 32;
  const SCALE_SIDE = 0.75;
  const VISUAL_R   = (ICON_SIZE * SCALE_SIDE) / 2; // 27 px
  // sideX positions icon CENTER just beyond the container edge so only PEEK_PX is visible
  const sideX = halfW + VISUAL_R - PEEK_PX; // ≈ halfW + 5

  // 5 mobile slots (same DIST_TO_SLOT mapping as desktop)
  const MOBILE_SLOTS = [
    { x: -sideX, y: 12, scale: SCALE_SIDE, opacity: 0,   zIndex: 0 }, // 0 hidden-left
    { x: -sideX, y: 12, scale: SCALE_SIDE, opacity: 0.5, zIndex: 2 }, // 1 left-peek
    { x: 0,      y:-18, scale: 1.00,       opacity: 1.0, zIndex: 5 }, // 2 center
    { x: sideX,  y: 12, scale: SCALE_SIDE, opacity: 0.5, zIndex: 2 }, // 3 right-peek
    { x: sideX,  y: 12, scale: SCALE_SIDE, opacity: 0,   zIndex: 0 }, // 4 hidden-right
  ];

  return (
    <div className="select-none relative">
      {/* Arc strip */}
      <div
        ref={arcRef}
        className="relative overflow-hidden w-full"
        style={{ height: 175 }}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (dx < -50) go(1);
          else if (dx > 50) go(-1);
        }}
      >
        {/* Dashed arc — spans full width via preserveAspectRatio="none" */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 175"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 165 C 300 55, 700 55, 1000 165"
            fill="none"
            stroke="rgba(244,178,35,0.1)"
            strokeWidth="2"
            strokeDasharray="6 9"
          />
        </svg>

        {/* Icons */}
        {serviceKeys.map((key, dataIdx) => {
          const dist     = (dataIdx - activeIndex + serviceKeys.length) % serviceKeys.length;
          const slot     = DIST_TO_SLOT[dist];
          const pos      = MOBILE_SLOTS[slot];
          const anim     = serviceAnimations[dataIdx];
          const isCenter = slot === 2;

          return (
            <motion.div
              key={key}
              className="absolute"
              style={{
                left: `calc(50% - ${ICON_SIZE / 2}px)`,
                top:  `calc(50% - ${ICON_SIZE / 2}px)`,
                zIndex: pos.zIndex,
              }}
              animate={{ x: pos.x, y: pos.y, scale: pos.scale, opacity: pos.opacity }}
              transition={{ type: 'spring', stiffness: 270, damping: 30 }}
            >
              <div
                className={`
                  rounded-full flex items-center justify-center
                  ${isCenter
                    ? 'bg-[#F4B223]/15 border-2 border-[#F4B223] shadow-[0_0_14px_rgba(244,178,35,0.22),0_0_32px_rgba(244,178,35,0.08)]'
                    : 'bg-[#0D1230] border border-white/12'}
                `}
                style={{ width: ICON_SIZE, height: ICON_SIZE }}
              >
                {anim
                  ? <Lottie animationData={anim} loop style={{ width: 82, height: 82 }} />
                  : <Code2 className="w-10 h-10 text-[#F4B223]" />
                }
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Left arrow — absolutely positioned at arc endpoint, ~60% visible */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous service"
        className="absolute z-10 w-8 h-8 rounded-full border border-white/10 hover:border-[#F4B223]/40
                   flex items-center justify-center text-white/35 hover:text-[#F4B223] transition-all duration-200"
        style={{ top: 149, left: -13 }}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Right arrow — same */}
      <button
        onClick={() => go(1)}
        aria-label="Next service"
        className="absolute z-10 w-8 h-8 rounded-full border border-white/10 hover:border-[#F4B223]/40
                   flex items-center justify-center text-white/35 hover:text-[#F4B223] transition-all duration-200"
        style={{ top: 149, right: -13 }}
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Inline text content — no card */}
      <div className="mt-4 px-4 text-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <h3
              className="text-[34px] leading-tight text-white tracking-wide mb-2"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              {t(`${serviceKeys[activeIndex]}.title`)}
            </h3>
            <p className="text-white/55 text-sm leading-relaxed mb-4 max-w-[280px]">
              {t(`${serviceKeys[activeIndex]}.description`)}
            </p>
            <Link
              href={`/${locale}/devis?service=${serviceDevisParams[activeIndex]}`}
              className="text-[#F4B223] text-sm font-medium hover:underline flex items-center gap-1.5"
            >
              {t('requestQuote')}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {serviceKeys.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-6 h-2 bg-[#F4B223]' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function ServicesSection() {
  const t      = useTranslations('services');
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile]       = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const trustLabel =
    locale === 'fr' ? 'Ils nous font confiance' :
    locale === 'ar' ? 'يثقون بنا' :
    'They trust us';

  return (
    <section id="services" className="pt-6 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#0D1230] to-[#0A0E27]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partners ticker — very top, just below HeroSection */}
        <ScrollAnimationWrapper>
          <PartnersTicker label={trustLabel} />
        </ScrollAnimationWrapper>

        {/* Section header */}
        <ScrollAnimationWrapper className="text-center mb-14 mt-28">
          {/* Badge removed — gold title replaces it */}
          {/* <span className="...">{t('badge')}</span> */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl text-[#F4B223] mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            {t('title')}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </ScrollAnimationWrapper>

        {/* Carousel */}
        <ScrollAnimationWrapper>
          {isMobile ? (
            <MobileArcCarousel
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              t={t}
              locale={locale}
            />
          ) : (
            <ArcCarousel
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              t={t}
              locale={locale}
            />
          )}
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
