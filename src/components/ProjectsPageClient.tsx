'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, ExternalLink, BookOpen, Monitor } from 'lucide-react';
import PageHero from './PageHero';

/* ─── Types ──────────────────────────────────────────────────────────────── */

// const CATEGORIES = ['all', 'web', 'mobile', 'marketing'] as const;
// type Category = (typeof CATEGORIES)[number];

// const CATEGORY_STYLE: Record<string, string> = {
//   web:       'bg-blue-500/15 text-blue-300 border-blue-400/20',
//   mobile:    'bg-purple-500/15 text-purple-300 border-purple-400/20',
//   marketing: 'bg-green-500/15 text-green-300 border-green-400/20',
//   branding:  'bg-pink-500/15 text-pink-300 border-pink-400/20',
// };

interface Project {
  id: number;
  key: string;
  image: string;
  // category: 'web' | 'mobile' | 'marketing' | 'branding';
  tags: string[];
  year: string;
  link?: string;   // live site URL (external)
  href?: string;   // case study path (internal, without locale prefix)
  featured?: boolean;
  complex?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    key: 'electrosky',
    image: '/images/projects/electrosky-hero3.jpg',
    // category: 'web',
    tags: ['Next.js 15', 'Fastify', 'PostgreSQL', 'Redis', 'Socket.io'],
    year: '2026',
    link: 'https://electrosky.ma',
    href: '/projects/electrosky',
    featured: true,
    complex: true,
  },
  {
    id: 2,
    key: 'saidibay',
    image: '/images/projects/saidiabay-hero.jpg',
    // category: 'web',
    tags: ['Next.js 14', 'Express.js', 'PostgreSQL', 'Leaflet', 'GSAP'],
    year: '2026',
    link: 'https://saidibay.ma',
    href: '/projects/saidibay',
    complex: true,
  },
  {
    id: 3,
    key: 'contentCreation',
    image: '/images/projects/7.jpg',
    // category: 'marketing',
    tags: ['Social Media', 'Content Creation', 'Branding'],
    year: '2026',
  },
  {
    id: 4,
    key: 'healthcare',
    image: '/images/projects/5.jpg',
    // category: 'web',
    tags: ['React.js', 'Tailwind CSS', 'Express.js', 'MySQL'],
    year: '2025',
  },
  {
    id: 5,
    key: 'fifap',
    image: '/projects/fifap.jpg',
    tags: ['React', 'JavaScript', 'Responsive Design'],
    year: '2025',
    link: 'https://fifap.info',
  },
  {
    id: 6,
    key: 'drcherkaouiabir',
    image: '/projects/drcherkaouiabir.jpg',
    tags: ['React', 'JavaScript', 'Responsive Design'],
    year: '2025',
    link: 'https://drcherkaouiabir.com',
  },
];

/* ─── Image with placeholder fallback ───────────────────────────────────── */

function ProjectImage({ src, alt, fill = true, className = '' }: { src: string; alt: string; fill?: boolean; className?: string }) {
  const [err, setErr] = useState(false);

  if (err) {
    return (
      <div className={`absolute inset-0 bg-[#0D1230] flex flex-col items-center justify-center gap-2 ${className}`}>
        <Monitor className="w-8 h-8 text-white/10" />
        <p className="text-white/10 text-[10px] font-mono text-center px-4">{src.split('/').pop()}</p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes="(max-width: 768px) 100vw, 60vw"
      className={`object-cover transition-transform duration-700 group-hover:scale-[1.04] ${className}`}
      onError={() => setErr(true)}
    />
  );
}

/* ─── Featured card (full-width side-by-side) ────────────────────────────── */

function FeaturedCard({ project }: { project: Project }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t      = useTranslations('projectsPage');
  const locale = useLocale();
  const isRTL  = locale === 'ar';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const title       = t(`projects.${project.key}.title` as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const description = t(`projects.${project.key}.description` as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const features    = (t(`projects.${project.key}.features` as any) as string)
    .split('·').map((s) => s.trim());

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden border border-white/8 hover:border-[#F4B223]/20 transition-all duration-500 bg-[#0D1230] flex flex-col lg:flex-row ${
        isRTL ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden lg:w-[58%] min-h-[260px] lg:min-h-[500px]">
        <ProjectImage src={project.image} alt={title} />
        <div className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-transparent to-[#0D1230]/65`} />

        {/* Number */}
        <div className="absolute top-5 left-5 w-10 h-10 rounded-xl bg-[#0A0E27]/80 backdrop-blur-sm border border-[#F4B223]/20 flex items-center justify-center">
          <span className="text-[#F4B223] text-xs font-mono font-bold">{String(project.id).padStart(2, '0')}</span>
        </div>

        {/* Case study badge */}
        {project.complex && (
          <div className="absolute bottom-5 left-5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-[#F4B223] text-[#0A0E27] px-3 py-1 rounded-full">
              <BookOpen className="w-3 h-3" />
              {t('caseStudy')}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={`lg:w-[42%] p-7 lg:p-10 xl:p-14 flex flex-col justify-center ${
          isRTL ? 'items-end text-right' : ''
        }`}
      >
        {/* Category + year */}
        <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* <span className={`text-xs font-medium px-3 py-1 rounded-full border ${CATEGORY_STYLE[project.category]}`}>
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span> */}
          <span className="text-white/30 text-xs font-mono">{project.year}</span>
        </div>

        {/* Title */}
        <h3
          className="text-4xl lg:text-5xl xl:text-[3.5rem] text-white leading-none mb-4"
          style={{ fontFamily: 'var(--font-bebas)' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">{description}</p>

        {/* Feature checklist */}
        <ul className="space-y-2 mb-7">
          {features.map((f) => (
            <li key={f} className={`flex items-center gap-2.5 text-sm text-white/55 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#F4B223] shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="h-px bg-white/8 mb-7 w-full" />

        {/* Tech tags */}
        <div className={`flex flex-wrap gap-2 mb-7 ${isRTL ? 'justify-end' : ''}`}>
          {project.tags.map((tag) => (
            <span key={tag} className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-white/40 border border-white/8 font-mono">
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className={`flex flex-wrap items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {project.href && (
            <Link
              href={`/${locale}${project.href}`}
              className="inline-flex items-center gap-2 bg-[#F4B223] hover:bg-[#E09800] text-[#0A0E27] text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-[#F4B223]/15"
            >
              {t('viewCaseStudy')}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/35 hover:text-white/70 text-sm transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {project.link.replace('https://', '')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Regular project card ───────────────────────────────────────────────── */

function ProjectCard({ project }: { project: Project }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t       = useTranslations('projectsPage');
  const locale  = useLocale();
  const isRTL   = locale === 'ar';
  const compact = !isRTL; // smaller cards on desktop for fr/en

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const title       = t(`projects.${project.key}.title` as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const description = t(`projects.${project.key}.description` as any);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const features    = (t(`projects.${project.key}.features` as any) as string)
    .split('·').map((s) => s.trim());

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/8 hover:border-[#F4B223]/20 transition-all duration-500 bg-[#0D1230] flex flex-col h-full">

      {/* Image */}
      <div className={`relative overflow-hidden shrink-0 ${compact ? 'aspect-[16/10] lg:aspect-[2/1]' : 'aspect-[16/10]'}`}>
        <ProjectImage src={project.image} alt={title} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1230]/70 via-transparent to-transparent" />

        {/* Number */}
        <div className={`absolute ${compact ? 'top-4 left-4 lg:top-3 lg:left-3 w-9 h-9 lg:w-7 lg:h-7' : 'top-4 left-4 w-9 h-9'} rounded-lg bg-[#0A0E27]/80 backdrop-blur-sm border border-[#F4B223]/20 flex items-center justify-center`}>
          <span className="text-[#F4B223] text-xs font-mono font-bold">{String(project.id).padStart(2, '0')}</span>
        </div>

        {/* Category + case study badge */}
        <div className={`absolute ${compact ? 'top-4 lg:top-3' : 'top-4'} ${isRTL ? 'left-4' : 'right-4'} ${compact && !isRTL ? 'lg:right-3' : ''} flex items-center gap-2`}>
          {project.complex && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-[#F4B223] text-[#0A0E27] px-2 py-0.5 rounded-full">
              <BookOpen className="w-2.5 h-2.5" />
              {t('caseStudy')}
            </span>
          )}
          {/* <span className={`text-xs font-medium px-2.5 py-1 rounded-full border backdrop-blur-sm ${CATEGORY_STYLE[project.category]}`}>
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span> */}
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 ${compact ? 'p-5 sm:p-6 lg:p-4' : 'p-5 sm:p-6'} ${isRTL ? 'items-end text-right' : ''}`}>
        <span className="text-white/25 text-[11px] font-mono mb-2">{project.year}</span>

        <h3
          className={`text-white leading-none ${compact ? 'text-2xl sm:text-3xl lg:text-xl mb-3 lg:mb-2' : 'text-2xl sm:text-3xl mb-3'}`}
          style={{ fontFamily: 'var(--font-bebas)' }}
        >
          {title}
        </h3>

        <p className={`text-white/50 text-sm leading-relaxed flex-1 ${compact ? 'mb-5 lg:mb-3' : 'mb-5'}`}>{description}</p>

        {/* Feature chips */}
        <div className={`flex flex-wrap gap-1.5 ${compact ? 'mb-5 lg:mb-3' : 'mb-5'} ${isRTL ? 'justify-end' : ''}`}>
          {features.map((f) => (
            <span key={f} className="text-xs px-2.5 py-1 rounded-full bg-[#F4B223]/8 text-[#F4B223]/65 border border-[#F4B223]/15">
              {f}
            </span>
          ))}
        </div>

        <div className={`h-px bg-white/6 ${compact ? 'mb-4 lg:mb-2' : 'mb-4'}`} />

        {/* Tech tags + CTA row */}
        <div className={`flex items-end justify-between gap-3 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex flex-wrap gap-1.5 ${isRTL ? 'justify-end' : ''}`}>
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/30 border border-white/8 font-mono">
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          {project.href ? (
            <Link
              href={`/${locale}${project.href}`}
              className="inline-flex items-center gap-1.5 text-[#F4B223] text-xs font-semibold hover:gap-2.5 transition-all shrink-0"
            >
              {t('caseStudy')}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          ) : project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/35 hover:text-white/70 text-xs transition-colors shrink-0"
            >
              <ExternalLink className="w-3 h-3" />
              {t('viewProject')}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */

export default function ProjectsPageClient() {
  const t      = useTranslations('projectsPage');
  const locale = useLocale();
  const isRTL  = locale === 'ar';
  const stats = [
    { value: '+30', label: t('statProjects') },
    { value: '+30', label: t('statClients') },
  ];

  const featuredProject = PROJECTS.find((p) => p.featured);
  const gridProjects    = PROJECTS.filter((p) => !p.featured);

  return (
    <>
      <PageHero
        label={t('label')}
        title={t('title')}
        description={t('subtitle')}
        stats={stats}
      />

      <section className="pb-24 bg-gradient-to-b from-[#0A0E27] via-[#0D1230] to-[#0A0E27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">

          {/* Category filter */}
          <div className={`flex flex-wrap gap-2 mb-12 ${isRTL ? 'justify-end' : 'justify-start'}`}>
            {/* {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-[#F4B223] text-[#0A0E27] shadow-lg shadow-[#F4B223]/20'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {filterLabels[cat]}
              </button>
            ))} */}
          </div>

          {/* Projects */}
          <AnimatePresence mode="wait">
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="space-y-6"
            >
              {featuredProject && <FeaturedCard project={featuredProject} />}

              {gridProjects.length > 0 && (
                <div className={`grid grid-cols-1 md:grid-cols-2 ${!isRTL ? 'gap-6 lg:gap-4' : 'gap-6'}`}>
                  {gridProjects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex"
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#0D1230]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(#F4B223 1px, transparent 1px), linear-gradient(90deg, #F4B223 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#F4B223]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-3 text-[#F4B223] text-xs uppercase tracking-[0.22em] font-medium mb-6">
            <span className="w-8 h-px bg-[#F4B223]" />
            EvoMarket
            <span className="w-8 h-px bg-[#F4B223]" />
          </span>
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl text-white leading-none mb-5"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            {t('ctaTitle')}
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-9 max-w-md mx-auto">
            {t('ctaDesc')}
          </p>
          <Link
            href={`/${locale}/devis`}
            className="inline-flex items-center gap-2 bg-[#F4B223] hover:bg-[#E09800] text-[#0A0E27] font-semibold px-8 py-3.5 rounded-full transition-all duration-200 text-sm shadow-lg shadow-[#F4B223]/20 hover:shadow-[#F4B223]/40 hover:scale-105"
          >
            {t('ctaButton')}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
