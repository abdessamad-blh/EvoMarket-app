'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Monitor, ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLocale } from 'next-intl';

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface ArchRow    { layer: string; stack: string }
export interface Feature    { icon: LucideIcon; title: string; desc: string }
export interface TechGroup  { label: string; tags: string[] }
export interface Stat       { value: string; label: string }
export interface Shot       { src: string; alt: string }

/* ─── Screenshot with placeholder fallback ──────────────────────────────── */

export function Screenshot({
  src,
  alt,
  className = '',
  objectPosition = 'top',
}: {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
}) {
  const [err, setErr] = useState(false);

  if (err) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl border border-dashed border-white/12 bg-[#0D1230] flex flex-col items-center justify-center gap-3 ${className}`}
      >
        <Monitor className="w-10 h-10 text-white/10" />
        <div className="text-center px-6">
          <p className="text-white/15 text-[11px] font-mono">{src.split('/').pop()}</p>
          <p className="text-white/10 text-[10px] mt-1">public{src}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/8 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        style={{ objectPosition }}
        onError={() => setErr(true)}
      />
    </div>
  );
}

/* ─── Hero screenshot with gradient overlays ────────────────────────────── */

export function HeroShot({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
}) {
  const [err, setErr] = useState(false);

  return (
    <div className="relative overflow-hidden" style={{ height: 'max(62vh, 420px)' }}>
      {/* Image or placeholder */}
      {!err ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
          onError={() => setErr(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-[#0D1230]">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(#F4B223 1px, transparent 1px), linear-gradient(90deg, #F4B223 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <Monitor className="w-16 h-16 text-white/8" />
            <p className="text-white/10 text-xs font-mono">{src.split('/').pop()}</p>
          </div>
        </div>
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27] via-[#0A0E27]/45 to-[#0A0E27]/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E27]/55 to-transparent" />

      {/* Slot for hero info */}
      <div className="absolute inset-0 flex flex-col justify-end">
        {children}
      </div>
    </div>
  );
}

/* ─── Stats bar ─────────────────────────────────────────────────────────── */

export function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-white/8 bg-[#0D1230] px-5 py-5 text-center"
        >
          <p
            className="text-4xl lg:text-5xl text-[#F4B223] leading-none"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            {s.value}
          </p>
          <p className="text-white/40 text-xs mt-2 leading-snug">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Section heading ───────────────────────────────────────────────────── */

export function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="w-8 h-px bg-[#F4B223] shrink-0" />
      <h2
        className="text-3xl sm:text-4xl text-white"
        style={{ fontFamily: 'var(--font-bebas)' }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ─── Architecture table ────────────────────────────────────────────────── */

export function ArchitectureTable({ rows }: { rows: ArchRow[] }) {
  return (
    <div className="rounded-2xl border border-white/8 overflow-hidden">
      {rows.map((row, i) => (
        <div
          key={row.layer}
          className={`flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0 px-5 sm:px-6 py-4 ${
            i !== rows.length - 1 ? 'border-b border-white/6' : ''
          } ${i % 2 === 0 ? 'bg-[#0D1230]' : 'bg-[#0A0E27]'}`}
        >
          <div className="sm:w-52 text-[#F4B223]/75 text-sm font-medium shrink-0 pt-0.5">
            {row.layer}
          </div>
          <div className="sm:flex-1 text-white/55 text-sm font-mono leading-relaxed">
            {row.stack}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Features grid ─────────────────────────────────────────────────────── */

export function FeaturesGrid({ features }: { features: Feature[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {features.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="rounded-2xl border border-white/8 bg-[#0D1230] p-6 hover:border-[#F4B223]/20 transition-colors duration-300"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F4B223]/10 flex items-center justify-center mb-4 shrink-0">
            <Icon className="w-5 h-5 text-[#F4B223]" />
          </div>
          <h3 className="text-white text-[15px] font-semibold mb-2 leading-snug">{title}</h3>
          <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Screenshots grid ──────────────────────────────────────────────────── */

export function ScreenshotsGrid({ shots }: { shots: Shot[] }) {
  if (shots.length === 0) return null;

  const [first, ...rest] = shots;

  return (
    <div className="space-y-5">
      {/* First screenshot always full width */}
      <div className="aspect-[16/9]">
        <Screenshot src={first.src} alt={first.alt} className="h-full" />
      </div>

      {/* Rest in 2-col grid */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rest.map((s) => (
            <div key={s.src} className="aspect-[4/3]">
              <Screenshot src={s.src} alt={s.alt} className="h-full" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Tech stack grid ───────────────────────────────────────────────────── */

export function TechStackGrid({ groups }: { groups: TechGroup[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {groups.map(({ label, tags }) => (
        <div key={label} className="rounded-2xl border border-white/8 bg-[#0D1230] p-5">
          <p className="text-[#F4B223] text-[11px] font-bold uppercase tracking-widest mb-4">
            {label}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-white/50 border border-white/8 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Bottom CTA ─────────────────────────────────────────────────────────── */

export function CaseStudyCTA({
  title,
  desc,
  cta,
}: {
  title: string;
  desc: string;
  cta: string;
}) {
  const locale = useLocale();

  return (
    <div className="relative rounded-2xl overflow-hidden py-16 px-8 text-center">
      <div className="absolute inset-0 bg-[#0D1230]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#F4B223 1px, transparent 1px), linear-gradient(90deg, #F4B223 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-[#F4B223]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative z-10 max-w-md mx-auto">
        <h2
          className="text-4xl sm:text-5xl text-white mb-4 leading-none"
          style={{ fontFamily: 'var(--font-bebas)' }}
        >
          {title}
        </h2>
        <p className="text-white/45 text-sm mb-8 leading-relaxed">{desc}</p>
        <Link
          href={`/${locale}/devis`}
          className="inline-flex items-center gap-2 bg-[#F4B223] hover:bg-[#E09800] text-[#0A0E27] font-semibold px-7 py-3 rounded-full transition-all duration-200 text-sm shadow-lg shadow-[#F4B223]/20 hover:scale-105"
        >
          {cta}
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
