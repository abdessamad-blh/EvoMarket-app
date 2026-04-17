'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Film, Code2, Smartphone, TrendingUp, Search } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

const SERVICES = [
  { key: 'socialMedia',      param: 'social',  Icon: Share2 },
  { key: 'contentCreation',  param: 'content', Icon: Film },
  { key: 'webDev',           param: 'web',     Icon: Code2 },
  { key: 'mobileApp',        param: 'mobile',  Icon: Smartphone },
  { key: 'digitalMarketing', param: 'ads',     Icon: TrendingUp },
  { key: 'seoPerf',          param: 'seo',     Icon: Search },
] as const;

/* ─────────────────────────────────────────────
   THE MIX — Numbered accordion  (active design)
   Option A (numbers + lines) + click-to-expand
───────────────────────────────────────────── */

export default function ServicesSection() {
  const t      = useTranslations('services');
  const locale = useLocale();
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="services" className="pt-20 pb-10 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#0D1230] to-[#0A0E27]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <ScrollAnimationWrapper className="text-center mb-14">
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

        {/* GIF + Accordion */}
        <ScrollAnimationWrapper>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

            {/* Video — top on mobile, sticky left on desktop */}
            <div className="w-full lg:w-[38%] lg:sticky lg:top-28 flex justify-center lg:justify-start">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="rounded-2xl shadow-2xl shadow-black/40 w-full max-w-[300px] sm:max-w-[360px] lg:max-w-none"
                style={{ maxHeight: '80vh', objectFit: 'contain' }}
              >
                <source src="/Mockup.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Accordion */}
            <div className="w-full lg:w-[62%]">
          <div className="divide-y divide-white/8">
            {SERVICES.map(({ key, param, Icon }, i) => {
              const isOpen = open === i;
              return (
                <div key={key}>
                  {/* ── Row header (always visible) ── */}
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full group relative flex items-center gap-6 sm:gap-10 py-6 px-2 sm:px-4 text-left"
                  >
                    {/* Subtle gold bg when open */}
                    <div
                      className="absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, rgba(244,178,35,0.05) 0%, transparent 100%)',
                        opacity: isOpen ? 1 : 0,
                      }}
                    />

                    {/* Number */}
                    <span
                      className="relative flex-shrink-0 text-5xl sm:text-6xl md:text-7xl leading-none select-none transition-colors duration-300"
                      style={{
                        fontFamily: 'var(--font-bebas)',
                        color: isOpen ? 'rgba(244,178,35,0.95)' : 'rgba(244,178,35,0.15)',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Title */}
                    <span
                      className="relative flex-1 text-2xl sm:text-3xl md:text-4xl leading-tight transition-colors duration-300"
                      style={{
                        fontFamily: 'var(--font-bebas)',
                        color: isOpen ? '#ffffff' : 'rgba(255,255,255,0.65)',
                      }}
                    >
                      {t(`${key}.title`)}
                    </span>

                    {/* Right side: icon + toggle */}
                    <div className="relative flex-shrink-0 flex items-center gap-3 sm:gap-5">
                      {/* Icon circle — opacity layers avoid non-composited border-color animation */}
                      <div className="relative w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="absolute inset-0 rounded-full border border-white/10" />
                        <div className={`absolute inset-0 rounded-full border border-[#F4B223]/50 bg-[#F4B223]/10 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
                        <Icon
                          className={`relative w-5 h-5 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                          style={{ color: 'rgba(255,255,255,0.3)' }}
                          strokeWidth={1.5}
                        />
                        <Icon
                          className={`absolute w-5 h-5 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                          style={{ color: '#F4B223' }}
                          strokeWidth={1.5}
                        />
                      </div>

                      {/* +/- toggle — gold ring via opacity, rotate via transform (both composited) */}
                      <div className="relative w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="absolute inset-0 rounded-full border border-white/15" />
                        <div className={`absolute inset-0 rounded-full border border-[#F4B223] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
                        <motion.svg
                          className="relative w-3 h-3"
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          style={{ color: isOpen ? '#F4B223' : 'rgba(255,255,255,0.3)' }}
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v14M5 12h14" />
                        </motion.svg>
                      </div>
                    </div>
                  </button>

                  {/* ── Expandable content ── */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 px-2 sm:px-4 flex flex-col sm:flex-row items-start gap-6"
                             style={{ paddingLeft: 'calc(0.5rem + 64px + 1.5rem)' }}>
                          <p className="text-white/55 text-sm sm:text-base leading-relaxed flex-1 max-w-2xl">
                            {(() => { const d = t(`${key}.description`); return d.length > 120 ? d.slice(0, 120).trimEnd() + '…' : d; })()}
                          </p>
                          <Link
                            href={`/${locale}/services`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                                       border border-[#F4B223]/40 text-[#F4B223] text-sm font-medium
                                       hover:bg-[#F4B223]/10 transition-colors duration-200 whitespace-nowrap"
                          >
                            {t('seeAllServices')}
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
            </div>{/* end accordion wrapper */}

          </div>{/* end flex row */}
        </ScrollAnimationWrapper>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   OPTION A — NUMBERED LIST hover only (commented out)
───────────────────────────────────────────── */

/*
function ServicesSection_NumberedHover() {
  const t = useTranslations('services'); const locale = useLocale();
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section id="services" className="pt-20 pb-10 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#0D1230] to-[#0A0E27]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimationWrapper className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-[#F4B223] mb-4 tracking-tight" style={{ fontFamily: 'var(--font-bebas)' }}>{t('title')}</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">{t('description')}</p>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <div className="divide-y divide-white/8">
            {SERVICES.map(({ key, param, Icon }, i) => {
              const isHovered = hovered === i;
              return (
                <motion.div key={key} onHoverStart={() => setHovered(i)} onHoverEnd={() => setHovered(null)} className="group relative">
                  <motion.div className="absolute inset-0 bg-[#F4B223]/[0.04] rounded-xl pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.2 }} />
                  <div className="relative flex items-center gap-6 sm:gap-10 py-7 px-2 sm:px-4">
                    <span className="flex-shrink-0 text-5xl sm:text-6xl md:text-7xl leading-none select-none transition-colors duration-300" style={{ fontFamily: 'var(--font-bebas)', color: isHovered ? 'rgba(244,178,35,0.9)' : 'rgba(244,178,35,0.15)' }}>{String(i + 1).padStart(2, '0')}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl leading-tight transition-colors duration-300" style={{ fontFamily: 'var(--font-bebas)', color: isHovered ? '#ffffff' : 'rgba(255,255,255,0.75)' }}>{t(`${key}.title`)}</h3>
                      <AnimatePresence>{isHovered && (<motion.p initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 6 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} transition={{ duration: 0.22 }} className="text-white/50 text-sm leading-relaxed max-w-xl overflow-hidden">{t(`${key}.description`)}</motion.p>)}</AnimatePresence>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-4 sm:gap-6">
                      <motion.div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center" animate={{ borderColor: isHovered ? 'rgba(244,178,35,0.5)' : 'rgba(255,255,255,0.1)', backgroundColor: isHovered ? 'rgba(244,178,35,0.1)' : 'transparent' }} transition={{ duration: 0.2 }}><Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300" style={{ color: isHovered ? '#F4B223' : 'rgba(255,255,255,0.35)' }} strokeWidth={1.5} /></motion.div>
                      <Link href={`/${locale}/devis?service=${param}`} onClick={(e) => e.stopPropagation()} className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 whitespace-nowrap" style={{ color: isHovered ? '#F4B223' : 'rgba(255,255,255,0.2)' }}>{t('seeAllServices')} <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
*/

/* ─────────────────────────────────────────────
   OPTION C — TAB SWITCHER  (commented out)
───────────────────────────────────────────── */

/*
function ServicesSection_TabSwitcher() {
  const t = useTranslations('services'); const locale = useLocale();
  const [active, setActive] = useState(0);
  const { Icon } = SERVICES[active];
  return (
    <section id="services" className="pt-20 pb-10 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#0D1230] to-[#0A0E27]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimationWrapper className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-[#F4B223] mb-4 tracking-tight" style={{ fontFamily: 'var(--font-bebas)' }}>{t('title')}</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">{t('description')}</p>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <div className="relative flex overflow-x-auto scrollbar-hide border-b border-white/8 mb-10 gap-0">
            {SERVICES.map(({ key }, i) => (<button key={key} onClick={() => setActive(i)} className={`relative flex-shrink-0 px-5 py-3 text-sm sm:text-base uppercase tracking-widest transition-colors duration-200 whitespace-nowrap ${active === i ? 'text-[#F4B223]' : 'text-white/40 hover:text-white/70'}`} style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.12em' }}>{t(`${key}.title`)}{active === i && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F4B223]" transition={{ type: 'spring', stiffness: 400, damping: 35 }} />}</button>))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.22 }} className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
              <div className="flex-shrink-0 w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-[#F4B223]/8 border border-[#F4B223]/20 flex items-center justify-center shadow-[0_0_40px_rgba(244,178,35,0.08)]"><Icon className="w-12 h-12 md:w-16 md:h-16 text-[#F4B223]" strokeWidth={1.25} /></div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-4xl sm:text-5xl text-white mb-4 leading-tight" style={{ fontFamily: 'var(--font-bebas)' }}>{t(`${SERVICES[active].key}.title`)}</h3>
                <p className="text-white/55 text-base leading-relaxed mb-6 max-w-xl">{t(`${SERVICES[active].key}.description`)}</p>
                <Link href={`/${locale}/devis?service=${SERVICES[active].param}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#F4B223]/40 text-[#F4B223] text-sm font-medium hover:bg-[#F4B223]/10 transition-colors duration-200">{t('seeAllServices')} <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
*/

/* ─────────────────────────────────────────────
   ORIGINAL — ARC CAROUSEL + LOTTIE  (commented out)
   Heavy: lottie-react ~150KB + 5 JSON files ~400KB
   Full code preserved in git history (commit fbf54a5)
───────────────────────────────────────────── */
