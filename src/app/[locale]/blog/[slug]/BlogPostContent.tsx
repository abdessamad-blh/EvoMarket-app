'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/lib/types';

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const t = useTranslations('blog');
  const locale = useLocale();

  const formattedDate = new Date(post.date).toLocaleDateString(
    locale === 'ar' ? 'ar-MA' : locale === 'en' ? 'en-US' : 'fr-FR',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <section className="py-24 min-h-screen relative">
      <div className="absolute inset-0 bg-[#0A0E27]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#F4B223] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backToBlog')}
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Tags */}
          <div className="flex gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[#F4B223] text-xs font-medium bg-[#F4B223]/10 border border-[#F4B223]/20 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl text-white mb-6 tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-white/10">
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} min</span>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-10 bg-[#112258]/30">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${post.image}')` }}
            />
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-semibold prose-headings:text-white prose-p:text-white/70 prose-p:leading-relaxed prose-strong:text-white prose-li:text-white/70 prose-a:text-[#F4B223] prose-a:no-underline hover:prose-a:underline prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-ul:my-4 prose-li:my-1">
            {/* Render MDX content as HTML-like sections */}
            {post.content.split('\n').map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return null;
              if (trimmed.startsWith('## ')) {
                return <h2 key={i}>{trimmed.replace('## ', '')}</h2>;
              }
              if (trimmed.startsWith('### ')) {
                return <h3 key={i}>{trimmed.replace('### ', '')}</h3>;
              }
              if (trimmed.startsWith('- ')) {
                const content = trimmed.replace('- ', '');
                return (
                  <div key={i} className="flex items-start gap-2 my-1 text-white/70">
                    <span className="w-1.5 h-1.5 bg-[#F4B223] rounded-full mt-2.5 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                  </div>
                );
              }
              return (
                <p key={i} dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
              );
            })}
          </div>
        </motion.article>
      </div>
    </section>
  );
}
