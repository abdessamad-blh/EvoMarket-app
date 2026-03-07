'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

const stats = [
  { value: '50+', key: 'projects' },
  { value: '98%', key: 'satisfaction' },
  { value: '12+', key: 'team' },
  { value: '3+', key: 'experience' },
];

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-[#0A0E27]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F4B223]/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <ScrollAnimationWrapper>
              <span className="inline-block bg-[#F4B223]/10 border border-[#F4B223]/30 text-[#F4B223] text-sm font-medium px-5 py-2 rounded-full mb-6">
                {t('badge')}
              </span>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl text-white mb-6 tracking-tight"
                style={{ fontFamily: 'var(--font-bebas)' }}
              >
                {t('title')}
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                {t('description')}
              </p>
              <p className="text-[#F4B223]/80 text-base italic border-l-2 border-[#F4B223]/40 pl-4">
                {t('mission')}
              </p>
            </ScrollAnimationWrapper>
          </div>

          {/* Right: Stats */}
          <div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#0D1230] border border-white/5 rounded-2xl p-8 text-center hover:border-[#F4B223]/20 transition-all duration-300 card-glow"
                >
                  <div
                    className="text-4xl sm:text-5xl text-gradient-gold mb-2"
                    style={{ fontFamily: 'var(--font-bebas)' }}
                  >
                    {stat.value}
                  </div>
                  <p className="text-white/50 text-sm">
                    {t(`stats.${stat.key}`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
