'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

const testimonials = [
  {
    id: 1,
    quote: "EvoMarket a complètement transformé notre présence digitale. Leur expertise et professionnalisme sont remarquables.",
    name: "Ahmed Bennani",
    company: "CEO, TechStart Maroc",
    rating: 5,
  },
  {
    id: 2,
    quote: "Une équipe créative et réactive. Notre site web a vu une augmentation de 60% du trafic en seulement 3 mois.",
    name: "Fatima Zahra El Idrissi",
    company: "Directrice Marketing, MedPlus",
    rating: 5,
  },
  {
    id: 3,
    quote: "Le meilleur investissement digital que nous ayons fait. EvoMarket comprend parfaitement le marché marocain.",
    name: "Karim Alaoui",
    company: "Fondateur, Casa Gourmet",
    rating: 5,
  },
  {
    id: 4,
    quote: "Leur application mobile a révolutionné notre service client. Professionnels et toujours à l'écoute.",
    name: "Sara Mouline",
    company: "COO, Express Delivery",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] to-[#0D1230]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimationWrapper className="text-center mb-16">
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#0D1230]/80 border border-white/5 rounded-2xl p-8 hover:border-[#F4B223]/20 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#F4B223]/30 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#F4B223] fill-[#F4B223]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/70 leading-relaxed mb-6 text-[15px] italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F4B223]/20 rounded-full flex items-center justify-center">
                  <span className="text-[#F4B223] font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{testimonial.name}</p>
                  <p className="text-white/40 text-xs">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
