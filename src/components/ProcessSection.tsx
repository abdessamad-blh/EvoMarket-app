'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Search, Palette, Code2, Rocket } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

const stepIcons = [Search, Palette, Code2, Rocket];
const stepKeys = ['step1', 'step2', 'step3', 'step4'];

export default function ProcessSection() {
  const t = useTranslations('process');

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0E27]" />
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F4B223]/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimationWrapper className="text-center mb-20">
          <span className="inline-block bg-[#F4B223]/10 border border-[#F4B223]/30 text-[#F4B223] text-sm font-medium px-5 py-2 rounded-full mb-4">
            {t('badge')}
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl text-white mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            {t('title')}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </ScrollAnimationWrapper>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F4B223]/20 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stepKeys.map((key, index) => {
              const Icon = stepIcons[index];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative text-center group"
                >
                  {/* Step number circle */}
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#0D1230] border-2 border-[#F4B223]/20 group-hover:border-[#F4B223]/60 transition-all duration-500 mb-6">
                    <Icon className="w-8 h-8 text-[#F4B223]" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-[#F4B223] text-[#0A0E27] rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>

                  {/* Duration badge */}
                  <div className="mb-4">
                    <span className="text-xs text-[#F4B223]/60 font-mono bg-[#F4B223]/5 px-3 py-1 rounded-full">
                      {t(`${key}.duration`)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl text-white mb-3 tracking-wide"
                    style={{ fontFamily: 'var(--font-bebas)' }}
                  >
                    {t(`${key}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                    {t(`${key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
