'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, ArrowRight, Search } from 'lucide-react';
import type { BlogPostMeta } from '@/lib/types';

export default function BlogListClient({ posts }: { posts: BlogPostMeta[] }) {
  const t = useTranslations('blog');
  const tSection = useTranslations('blogSection');
  const locale = useLocale();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags.includes(selectedTag))
    : posts;

  return (
    <section className="py-24 min-h-screen relative">
      <div className="absolute inset-0 bg-[#0A0E27]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#F4B223]/10 border border-[#F4B223]/30 text-[#F4B223] text-sm font-medium px-5 py-2 rounded-full mb-4">
            {t('subtitle')}
          </span>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl text-white mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            {t('title')}
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Category Filters */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !selectedTag
                  ? 'bg-[#F4B223] text-[#0A0E27]'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:border-[#F4B223]/30 hover:text-white'
              }`}
            >
              {t('allCategories')}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTag === tag
                    ? 'bg-[#F4B223] text-[#0A0E27]'
                    : 'bg-white/5 text-white/50 border border-white/10 hover:border-[#F4B223]/30 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">{t('noArticles')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
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

                    <h2 className="text-white font-semibold text-lg mb-2 group-hover:text-[#F4B223] transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-1.5 text-white/40 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readingTime} {tSection('minRead')}</span>
                      </div>
                      <span className="text-[#F4B223] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        {tSection('readMore')}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
