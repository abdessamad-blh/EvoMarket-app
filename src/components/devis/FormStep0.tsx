'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  ShoppingCart, Heart, Home, Utensils, GraduationCap,
  Shirt, HardHat, Scissors, Gem, Plane, Car, Sparkles,
} from 'lucide-react';

export interface Step0Data {
  sectors: string[];
  source: string;
}

interface FormStep0Props {
  data: Step0Data;
  onChange: (data: Step0Data) => void;
  errors: Partial<Record<keyof Step0Data, string>>;
}

const sectorOptions = [
  { key: 'ecommerce',    Icon: ShoppingCart },
  { key: 'health',       Icon: Heart },
  { key: 'realestate',   Icon: Home },
  { key: 'food',         Icon: Utensils },
  { key: 'education',    Icon: GraduationCap },
  { key: 'fashion',      Icon: Shirt },
  { key: 'construction', Icon: HardHat },
  { key: 'beauty',       Icon: Scissors },
  { key: 'artisanat',    Icon: Gem },
  { key: 'travel',       Icon: Plane },
  { key: 'automotive',   Icon: Car },
  { key: 'other',        Icon: Sparkles },
] as const;

const sourceKeys = ['google', 'instagram', 'facebook', 'referral', 'ads', 'other'] as const;

export default function FormStep0({ data, onChange, errors }: FormStep0Props) {
  const t = useTranslations('devis.step0');

  const toggleSector = (key: string) => {
    const next = data.sectors.includes(key)
      ? data.sectors.filter((s) => s !== key)
      : [...data.sectors, key];
    onChange({ ...data, sectors: next });
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

      {/* Sector grid — 3 cols on desktop, 2 on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {sectorOptions.map(({ key, Icon }) => {
          const active = data.sectors.includes(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggleSector(key)}
              className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all duration-200 ${
                active
                  ? 'bg-[#F4B223]/15 border-[#F4B223] text-[#F4B223]'
                  : 'bg-white/5 border-white/10 text-white/60 hover:border-white/25 hover:text-white'
              }`}
            >
              <Icon className="w-6 h-6 shrink-0" />
              <span className="text-xs font-medium text-center leading-tight">
                {t(`sectors.${key}`)}
              </span>
            </button>
          );
        })}
      </div>

      {errors.sectors && (
        <p className="text-red-400 text-xs">{errors.sectors}</p>
      )}

      {/* Source dropdown */}
      <div>
        <label className="text-white/60 text-sm mb-2 block">{t('sourceLabel')}</label>
        <select
          value={data.source}
          onChange={(e) => onChange({ ...data, source: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-[#F4B223]/50 focus:outline-none focus:ring-1 focus:ring-[#F4B223]/30 transition-all"
        >
          <option value="" className="bg-[#0D1230] text-white/50">{t('sourcePlaceholder')}</option>
          {sourceKeys.map((key) => (
            <option key={key} value={key} className="bg-[#0D1230] text-white">
              {t(`sourceOptions.${key}`)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
