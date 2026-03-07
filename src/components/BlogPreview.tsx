'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

const blogPosts = [
  {
    slug: 'strategie-marketing-digital',
    title: 'Comment élaborer une stratégie de marketing digital efficace en 2025',
    excerpt: 'Découvrez les étapes clés pour créer une stratégie digitale qui génère des résultats concrets pour votre entreprise.',
    date: '2025-01-15',
    readingTime: '5',
    image: '/images/blog/marketing-strategy.jpg', // 600x400 placeholder
    tags: ['Marketing Digital', 'Stratégie'],
  },
  {
    slug: 'importance-site-web',
    title: "Pourquoi votre entreprise a besoin d'un site web professionnel",
    excerpt: "Un site web n'est plus un luxe mais une nécessité. Voici pourquoi investir dans un site professionnel est crucial.",
    date: '2025-01-10',
    readingTime: '4',
    image: '/images/blog/website-importance.jpg', // 600x400 placeholder
    tags: ['Développement Web', 'Business'],
  },
  {
    slug: 'reseaux-sociaux-entreprise',
    title: 'Les réseaux sociaux : un levier de croissance pour les entreprises marocaines',
    excerpt: 'Apprenez comment les réseaux sociaux peuvent transformer la visibilité et les ventes de votre entreprise au Maroc.',
    date: '2025-01-05',
    readingTime: '6',
    image: '/images/blog/social-media.jpg', // 600x400 placeholder
    tags: ['Réseaux Sociaux', 'Croissance'],
  },
];

export default function BlogPreview() {
  const t = useTranslations('blogSection');
  const locale = useLocale();

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[#0A0E27]" />

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

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="group block bg-[#0D1230] border border-white/5 rounded-2xl overflow-hidden hover:border-[#F4B223]/20 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-[#112258]/30">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${post.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1230] to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[#F4B223]/70 text-xs font-medium bg-[#F4B223]/5 px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#F4B223] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-white/40 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readingTime} {t('minRead')}</span>
                    </div>
                    <span className="text-[#F4B223] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t('readMore')}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-[#F4B223] hover:text-[#E09800] font-medium transition-colors"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
