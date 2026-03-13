'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Share2, Film, Code2, Smartphone, TrendingUp, GraduationCap, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from './PageHero';

const SERVICES = [
  { key: 'socialMedia',      param: 'social',    Icon: Share2 },
  { key: 'contentCreation',  param: 'content',   Icon: Film },
  { key: 'webDev',           param: 'web',        Icon: Code2 },
  { key: 'mobileApp',        param: 'mobile',     Icon: Smartphone },
  { key: 'digitalMarketing', param: 'ads',        Icon: TrendingUp },
  { key: 'training',         param: 'training',   Icon: GraduationCap },
] as const;

export default function ServicesPageClient() {
  const t  = useTranslations('services');
  const tp = useTranslations('servicesPage');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [openService, setOpenService] = useState<number | null>(0);

  return (
    <>
      <PageHero
        label={tp('label')}
        title={tp('title')}
        description={tp('subtitle')}
      />

    <section className="pb-20 bg-gradient-to-b from-[#0A0E27] via-[#0D1230] to-[#0A0E27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className={`flex flex-col lg:flex-row gap-10 lg:gap-16 items-start ${isRTL ? 'lg:flex-row-reverse' : ''}`}>

          {/* ── LEFT: Mockup GIF ── */}
          <div className="w-full lg:w-[38%] lg:sticky lg:top-28 flex justify-center lg:justify-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/projects/Mockup.gif"
              alt="EvoMarket projects mockup"
              width={720}
              height={1000}
              className="rounded-2xl shadow-2xl shadow-black/40 w-full max-w-[320px] lg:max-w-none object-cover"
              style={{ maxHeight: '72vh', objectFit: 'cover' }}
            />
          </div>

          {/* ── RIGHT: Services Accordion ── */}
          <div className={`w-full lg:w-[62%] pt-2 ${isRTL ? 'text-right' : ''}`}>

            {/* Accordion */}
            <div className="divide-y divide-white/8">
              {SERVICES.map(({ key, param, Icon }, idx) => {
                const isOpen = openService === idx;
                const rawTags = key === 'training' ? t('training.tags') : '';
                const tags = rawTags ? rawTags.split('·').map((s) => s.trim()) : [];

                return (
                  <div key={key} className="py-5">
                    {/* Row toggle */}
                    <button
                      onClick={() => setOpenService(isOpen ? null : idx)}
                      className={`w-full flex items-center gap-4 group ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <div
                        className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                          isOpen ? 'bg-[#F4B223]/20' : 'bg-white/5 group-hover:bg-[#F4B223]/10'
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 transition-colors ${
                            isOpen ? 'text-[#F4B223]' : 'text-white/50 group-hover:text-[#F4B223]/70'
                          }`}
                        />
                      </div>

                      <span
                        className={`flex-1 text-[22px] transition-colors duration-200 leading-tight ${
                          isOpen ? 'text-[#F4B223]' : 'text-white/80 group-hover:text-white'
                        } ${isRTL ? 'text-right' : 'text-left'}`}
                        style={{ fontFamily: 'var(--font-bebas)' }}
                      >
                        {t(`${key}.title`)}
                      </span>

                      <div
                        className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${
                          isOpen
                            ? 'border-[#F4B223] text-[#F4B223]'
                            : 'border-white/20 text-white/40 group-hover:border-[#F4B223]/40 group-hover:text-[#F4B223]/60'
                        }`}
                      >
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div
                            className="pt-3 pb-1"
                            style={{ paddingLeft: isRTL ? 0 : 60, paddingRight: isRTL ? 60 : 0 }}
                          >
                            <p className="text-white/55 text-sm leading-relaxed mb-4 max-w-sm">
                              {t(`${key}.description`)}
                            </p>

                            {tags.length > 0 && (
                              <div className={`flex flex-wrap gap-2 mb-4 ${isRTL ? 'justify-end' : ''}`}>
                                {tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-xs px-2.5 py-1 rounded-full bg-[#F4B223]/10 text-[#F4B223]/80 border border-[#F4B223]/20"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            <Link
                              href={`/${locale}/devis?service=${param}`}
                              className={`inline-flex items-center gap-1.5 text-[#F4B223] text-sm font-medium hover:underline ${isRTL ? 'flex-row-reverse' : ''}`}
                            >
                              {tp('requestQuote')}
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRTL ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
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
          </div>

        </div>
      </div>
    </section>
    </>
  );
}
