import React from 'react';

interface Stat {
  value: string;
  label: string;
}

interface PageHeroProps {
  label: string;
  title: string;
  description: string;
  stats?: Stat[];
}

const DEFAULT_STATS: Stat[] = [
  { value: '+6',  label: 'Services' },
  { value: '+30', label: 'Clients' },
];

export default function PageHero({
  label,
  title,
  description,
  stats = DEFAULT_STATS,
}: PageHeroProps) {
  return (
    <div className="relative pt-36 pb-16 overflow-hidden">
      {/* Gold grid background — same as HeroSection */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-[#0A0E27] via-[#0D1230] to-[#112258]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#F4B223 1px, transparent 1px), linear-gradient(90deg, #F4B223 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
      {/* Ambient blurs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#F4B223]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#112258]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start lg:items-end">

          {/* Left — label + title */}
          <div className="flex-1">
            <span className="inline-flex items-center gap-3 text-[#F4B223] text-xs uppercase tracking-[0.22em] font-medium mb-4">
              <span className="w-8 h-px bg-[#F4B223]" />
              {label}
            </span>
            <h1
              className="text-6xl sm:text-7xl lg:text-8xl text-white leading-none"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              {title}
            </h1>
          </div>

          {/* Right — description + stats */}
          <div className="flex-1 lg:max-w-[420px] pb-1">
            <p className="text-white/55 text-base leading-relaxed mb-10">
              {description}
            </p>
            <div className="flex gap-12">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-5xl text-white leading-none mb-1"
                    style={{ fontFamily: 'var(--font-bebas)' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-white/45 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </div>
  );
}
