'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export interface Step0Data {
  sectors: string[];
}

interface FormStep0Props {
  data: Step0Data;
  onChange: (data: Step0Data) => void;
  errors: Partial<Record<keyof Step0Data, string>>;
}

const sectorKeys = [
  'ecommerce',
  'health',
  'entertainment',
  'education',
  'realestate',
  'food',
  'travel',
  'tech',
  'ngo',
  'other',
] as const;

export default function FormStep0({ data, onChange, errors }: FormStep0Props) {
  const t = useTranslations('devis.step0');

  const toggle = (key: string) => {
    const next = data.sectors.includes(key)
      ? data.sectors.filter((s) => s !== key)
      : [...data.sectors, key];
    onChange({ sectors: next });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3
          className="text-2xl sm:text-3xl text-white mb-1"
          style={{ fontFamily: 'var(--font-bebas)' }}
        >
          {t('title')}
        </h3>
        <p className="text-white/40 text-sm">{t('subtitle')}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {sectorKeys.map((key) => {
          const active = data.sectors.includes(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggle(key)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                active
                  ? 'bg-[#F4B223]/15 border-[#F4B223] text-[#F4B223]'
                  : 'bg-white/5 border-white/15 text-white/60 hover:border-white/30 hover:text-white'
              }`}
            >
              {t(`sectors.${key}`)}
            </button>
          );
        })}
      </div>

      {errors.sectors && (
        <p className="text-red-400 text-xs">{errors.sectors}</p>
      )}
    </div>
  );
}
