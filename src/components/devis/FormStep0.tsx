'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ShoppingCart, Heart, Film, GraduationCap, Home, Utensils, Plane, Sparkles } from 'lucide-react';

export interface Step0Data {
  sectors: string[];
}

interface FormStep0Props {
  data: Step0Data;
  onChange: (data: Step0Data) => void;
  errors: Partial<Record<keyof Step0Data, string>>;
}

const sectorOptions = [
  { key: 'ecommerce', Icon: ShoppingCart },
  { key: 'health', Icon: Heart },
  { key: 'entertainment', Icon: Film },
  { key: 'education', Icon: GraduationCap },
  { key: 'realestate', Icon: Home },
  { key: 'food', Icon: Utensils },
  { key: 'travel', Icon: Plane },
  { key: 'other', Icon: Sparkles },
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {sectorOptions.map(({ key, Icon }) => {
          const active = data.sectors.includes(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggle(key)}
              className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all duration-200 ${
                active
                  ? 'bg-[#F4B223]/15 border-[#F4B223] text-[#F4B223]'
                  : 'bg-white/5 border-white/10 text-white/60 hover:border-white/25 hover:text-white'
              }`}
            >
              <Icon className="w-6 h-6 shrink-0" />
              <span className="text-xs font-medium text-center leading-tight">{t(`sectors.${key}`)}</span>
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
