'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import Image from 'next/image';
import {
  Share2, Video, Globe, Smartphone, TrendingUp,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

const serviceIcons = [Share2, Video, Globe, Smartphone, TrendingUp];
const serviceKeys  = ['socialMedia', 'contentCreation', 'webDev', 'mobileApp', 'digitalMarketing'];
const serviceDevisParams = ['social', 'content', 'web', 'mobile', 'ads'];

const PARTNER_LOGOS = [
  '/images/partners/partner1.png',
  '/images/partners/partner2.png',
  '/images/partners/partner3.png',
  '/images/partners/partner4.png',
  '/images/partners/partner5.png',
  '/images/partners/partner6.png',
];
const LOGOS_LOOP = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

// Arc slots: 0=far-left · 1=near-left · 2=center · 3=near-right · 4=far-right
// x,y = translateX/Y from the container's center point
const ARC_SLOTS = [
  { x: -320, y: 30,  scale: 0.52, opacity: 0.22, zIndex: 1 },
  { x: -170, y: 8,   scale: 0.72, opacity: 0.55, zIndex: 2 },
  { x:    0, y: -28, scale: 1.00, opacity: 1.00, zIndex: 5 },
  { x:  170, y: 8,   scale: 0.72, opacity: 0.55, zIndex: 2 },
  { x:  320, y: 30,  scale: 0.52, opacity: 0.22, zIndex: 1 },
] as const;

// distance from activeIndex → visual arc slot
const DIST_TO_SLOT = [2, 3, 4, 0, 1] as const;

const ICON_SIZE   = 72;
const MOBILE_PEEK = 48; // px of adjacent card visible on mobile
const MOBILE_GAP  = 12;

/* ─────────────────────────────────────────────
   PARTNERS TICKER
───────────────────────────────────────────── */
function PartnersTicker({ label }: { label: string }) {
  return (
    <div className="mt-16 pt-10 border-t border-white/6">
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
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
          >
            {LOGOS_LOOP.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 relative w-24 h-10 opacity-35 hover:opacity-65 transition-opacity duration-300"
              >
                <Image
                  src={src}
                  alt={`Partner ${(i % PARTNER_LOGOS.length) + 1}`}
                  fill
                  sizes="96px"
                  className="object-contain grayscale"
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
   ARC CAROUSEL — Desktop
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

  // Near-icon y offset (+8) → arrow sits on that horizontal level
  // Container center = 90px (height 180 / 2). Arrow center = 90 + 8 = 98. top = 98 - 22 = 76px.
  const ARROW_TOP = 76;

  return (
    <div className="select-none">
      {/* ── Arc icon strip ── */}
      <div className="relative w-full overflow-visible" style={{ height: 180 }}>

        {/* Decorative dashed arc — flat curve */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 180"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 60 160 C 280 80, 720 80, 940 160"
            fill="none"
            stroke="rgba(244,178,35,0.1)"
            strokeWidth="1.5"
            strokeDasharray="6 9"
          />
        </svg>

        {/* Left arrow — sits on the arc line */}
        <button
          onClick={prev}
          aria-label="Previous service"
          style={{ position: 'absolute', top: ARROW_TOP, left: 8, zIndex: 10 }}
          className="w-11 h-11 rounded-full border border-white/10 hover:border-[#F4B223]/50 flex items-center justify-center text-white/40 hover:text-[#F4B223] transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right arrow — sits on the arc line */}
        <button
          onClick={next}
          aria-label="Next service"
          style={{ position: 'absolute', top: ARROW_TOP, right: 8, zIndex: 10 }}
          className="w-11 h-11 rounded-full border border-white/10 hover:border-[#F4B223]/50 flex items-center justify-center text-white/40 hover:text-[#F4B223] transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Icon bubbles */}
        {serviceKeys.map((key, dataIdx) => {
          const dist    = (dataIdx - activeIndex + serviceKeys.length) % serviceKeys.length;
          const slot    = DIST_TO_SLOT[dist];
          const pos     = ARC_SLOTS[slot];
          const Icon    = serviceIcons[dataIdx];
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
                    ? 'bg-[#F4B223]/15 border-2 border-[#F4B223] shadow-[0_0_28px_rgba(244,178,35,0.55),0_0_60px_rgba(244,178,35,0.2)]'
                    : 'bg-[#0D1230] border border-white/12 hover:border-[#F4B223]/30'}
                `}
                style={{ width: ICON_SIZE, height: ICON_SIZE }}
              >
                <Icon className="w-7 h-7 text-[#F4B223]" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Static content box ── */}
      <div
        className="max-w-lg mx-auto mt-4 bg-[#0D1230]/95 border border-white/8 rounded-2xl px-8 py-7 text-center overflow-hidden"
        style={{ minHeight: 192 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.26, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <span className="text-[#F4B223]/40 text-xs font-mono mb-2 block">
              0{activeIndex + 1}
            </span>
            <h3
              className="text-[28px] leading-tight text-white tracking-wide mb-3"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              {t(`${serviceKeys[activeIndex]}.title`)}
            </h3>
            <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-xs">
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

      {/* Dot indicators */}
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
   MOBILE SWIPE CAROUSEL
   Active card is centered; prev/next cards peek
   at screen edges. Framer Motion drag to swipe.
───────────────────────────────────────────── */
function MobileCarousel({
  activeIndex, setActiveIndex, t, locale,
}: {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  t: ReturnType<typeof useTranslations>;
  locale: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(272);

  // x motion value drives the track position
  const x = useMotionValue(MOBILE_PEEK);

  // Measure container → derive card width
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth - 2 * MOBILE_PEEK;
        setCardW(w);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Animate to the active card whenever index or card width changes
  useEffect(() => {
    animate(x, MOBILE_PEEK - activeIndex * (cardW + MOBILE_GAP), {
      type: 'spring', stiffness: 300, damping: 32,
    });
  }, [activeIndex, cardW, x]);

  const clampedNext = () =>
    setActiveIndex(Math.min(activeIndex + 1, serviceKeys.length - 1));
  const clampedPrev = () =>
    setActiveIndex(Math.max(activeIndex - 1, 0));

  return (
    <div ref={containerRef} className="overflow-hidden select-none">
      <motion.div
        className="flex"
        style={{ x, gap: MOBILE_GAP, touchAction: 'pan-y' }}
        drag="x"
        dragConstraints={{
          left:  MOBILE_PEEK - (serviceKeys.length - 1) * (cardW + MOBILE_GAP),
          right: MOBILE_PEEK,
        }}
        dragElastic={0.08}
        onDragEnd={(_, { offset, velocity }) => {
          if (offset.x < -50 || velocity.x < -400) {
            clampedNext();
          } else if (offset.x > 50 || velocity.x > 400) {
            clampedPrev();
          } else {
            // Snap back to current card
            animate(x, MOBILE_PEEK - activeIndex * (cardW + MOBILE_GAP), {
              type: 'spring', stiffness: 300, damping: 32,
            });
          }
        }}
      >
        {serviceKeys.map((key, idx) => {
          const Icon     = serviceIcons[idx];
          const isActive = idx === activeIndex;

          return (
            <div
              key={key}
              className="flex-shrink-0"
              style={{ width: cardW }}
              onClick={() => !isActive && setActiveIndex(idx)}
            >
              <motion.div
                animate={{ opacity: isActive ? 1 : 0.38, scale: isActive ? 1 : 0.94 }}
                transition={{ duration: 0.3 }}
                className={`
                  flex flex-col items-center text-center rounded-2xl p-7
                  bg-[#0D1230]/90 border cursor-pointer
                  ${isActive
                    ? 'border-[#F4B223]/40 shadow-[0_0_36px_rgba(244,178,35,0.1)]'
                    : 'border-white/6'}
                `}
              >
                {/* Icon circle — 64 px (≥ 44 px touch target) */}
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center mb-4
                  ${isActive
                    ? 'bg-[#F4B223]/15 border-2 border-[#F4B223] shadow-[0_0_20px_rgba(244,178,35,0.35)]'
                    : 'bg-white/5 border border-white/12'}
                `}>
                  <Icon className="w-7 h-7 text-[#F4B223]" />
                </div>

                <span className="text-[#F4B223]/40 text-xs font-mono mb-1">
                  0{idx + 1}
                </span>
                <h3
                  className="text-[22px] text-white tracking-wide mb-3"
                  style={{ fontFamily: 'var(--font-bebas)' }}
                >
                  {t(`${key}.title`)}
                </h3>

                {isActive && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col items-center"
                    >
                      <p className="text-white/55 text-sm leading-relaxed mb-4">
                        {t(`${key}.description`)}
                      </p>
                      <Link
                        href={`/${locale}/devis?service=${serviceDevisParams[idx]}`}
                        className="text-[#F4B223] text-sm font-medium hover:underline flex items-center gap-1.5"
                      >
                        {t('requestQuote')}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                )}
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
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
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#0D1230] to-[#0A0E27]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <ScrollAnimationWrapper className="text-center mb-14">
          {/* Badge removed — title takes the spotlight */}
          {/* <span className="inline-block bg-[#F4B223]/10 border border-[#F4B223]/30 text-[#F4B223] text-sm font-medium px-5 py-2 rounded-full mb-4">
            {t('badge')}
          </span> */}
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
            <MobileCarousel
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

        {/* Partners ticker — BOTTOM */}
        <ScrollAnimationWrapper delay={0.1}>
          <PartnersTicker label={trustLabel} />
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
