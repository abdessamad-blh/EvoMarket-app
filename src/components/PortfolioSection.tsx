'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

const projects = [
  {
    id: 1,
    title: 'Health Care Website',
    image: '/images/projects/5.jpg',
    // category: 'Health',
    tags: ['React.js', 'Tailwind CSS', 'Express.js', 'My SQL'],
    // year: '2024',
  },
  {
    id: 2,
    title: 'Real Estate Website',
    image: '/images/projects/6.jpg',
    // category: 'Real Estate',
    tags: ['Next.js', 'TypeScript', 'Express.js', 'Tailwind CSS', 'PostgreSQL'],
    // year: '2024',
  },
  {
    id: 3,
    title: 'Content creation',
    image: '/images/projects/7.jpg',
    tags: ['Social Media', 'Content creation'],
  },
  // {
  //   id: 4,
  //   title: 'Construction Website',
  //   image: '/images/projects/4.jpg',
  //   tags: ['React.js', 'Next.js', 'Node.js'],
  // }
];

export default function PortfolioSection() {
  const t = useTranslations('portfolio');
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % projects.length);
    }, 2000);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + projects.length) % projects.length);
    resetTimer();
  }, [resetTimer]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % projects.length);
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#0D1230]/50 to-[#0A0E27]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <ScrollAnimationWrapper className="text-center mb-16">
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

        {/* Slider — extra side padding to fit the nav arrows */}
        <div className="relative px-0 sm:px-14">

          {/* ← Prev */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20
                       w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center
                       bg-[#0D1230]/25 border border-white/10 rounded-full
                       text-white/50 hover:text-[#F4B223] hover:border-[#F4B223]/50
                       transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Slide */}
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="relative group rounded-2xl overflow-hidden
                           border border-white/5 hover:border-[#F4B223]/20
                           transition-colors duration-500 sm:max-w-[100%] mx-auto"
              >
                {/* Image — aspect matches 1600×1000 */}
                <div className="relative w-full aspect-[16/10]">
                  <img
                    src={projects[current].image}
                    alt={projects[current].title}
                    className="w-full h-full object-cover
                               transition-transform duration-700 group-hover:scale-[1.03]"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27]/90 via-[#0A0E27]/20 to-transparent" />

                  {/* Bottom info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-4">

                      {/* Title + category */}
                      <div>
                        {/* <span className="text-[#F4B223]/70 text-xs font-mono uppercase tracking-widest mb-1 block">
                          {projects[current].category} · {projects[current].year}
                        </span> */}
                        <h3
                          className="text-2xl sm:text-2xl md:text-5xl text-white tracking-wide leading-none"
                          style={{ fontFamily: 'var(--font-bebas)' }}
                        >
                          {projects[current].title}
                        </h3>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-1 sm:max-w-[240px] sm:justify-end">
                        {projects[current].tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-white/10 backdrop-blur-sm text-white/70
                                       px-2.5 py-1 sm:px-1.5 sm:py-0.5 rounded-full text-[11px] sm:text-xs
                                       border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* → Next */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20
                       w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center
                       bg-[#0D1230]/25 border border-white/10 rounded-full
                       text-white/50 hover:text-[#F4B223] hover:border-[#F4B223]/50
                       transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Next project"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

        </div>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-2 mt-5">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); resetTimer(); }}
              className={`rounded-full transition-all duration-300 ${i === current
                  ? 'w-7 h-2 bg-[#F4B223]'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
