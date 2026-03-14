'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Globe, Smartphone, Search, Share2, Video, Megaphone, Wallet, GraduationCap } from 'lucide-react';

export interface Step2Data {
  services: string[];
  budget: string;
}

interface FormStep2Props {
  data: Step2Data;
  onChange: (data: Step2Data) => void;
  errors: Partial<Record<keyof Step2Data, string>>;
}

const serviceOptions = [
  { key: 'website',     icon: Globe },
  { key: 'mobile',      icon: Smartphone },
  { key: 'seo',         icon: Search },
  { key: 'socialMedia', icon: Share2 },
  { key: 'content',     icon: Video },
  { key: 'ads',         icon: Megaphone },
  { key: 'training',    icon: GraduationCap },
] as const;

const budgetOptions = ['sub500', '500-2000', '2000-6000', '6000plus'] as const;

export default function FormStep2({ data, onChange, errors }: FormStep2Props) {
  const t = useTranslations('devis.step2');

  const toggleService = (key: string) => {
    const updated = data.services.includes(key)
      ? data.services.filter((s) => s !== key)
      : [...data.services, key];
    onChange({ ...data, services: updated });
  };

  return (
    <div className="space-y-6">
      <h3
        className="text-2xl sm:text-3xl text-white mb-6"
        style={{ fontFamily: 'var(--font-bebas)' }}
      >
        {t('title')}
      </h3>

      {/* Services — card grid matching FormStep0 style */}
      <div>
        <label className="text-white/60 text-sm mb-3 block">
          {t('serviceLabel')} <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {serviceOptions.map(({ key, icon: Icon }) => {
            const active = data.services.includes(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleService(key)}
                className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all duration-200 ${
                  active
                    ? 'bg-[#F4B223]/15 border-[#F4B223] text-[#F4B223]'
                    : 'bg-white/5 border-white/10 text-white/60 hover:border-white/25 hover:text-white'
                }`}
              >
                <Icon className="w-6 h-6 shrink-0" />
                <span className="text-xs font-medium text-center leading-tight">
                  {t(`services.${key}`)}
                </span>
              </button>
            );
          })}
        </div>
        {errors.services && <p className="text-red-400 text-xs mt-2">{errors.services}</p>}
      </div>

      {/* Budget dropdown */}
      <div>
        <label className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <Wallet className="w-4 h-4" />
          {t('budget')}
        </label>
        <select
          value={data.budget}
          onChange={(e) => onChange({ ...data, budget: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-[#F4B223]/50 focus:outline-none focus:ring-1 focus:ring-[#F4B223]/30 transition-all"
        >
          <option value="" className="bg-[#0D1230] text-white/50">{t('budgetPlaceholder')}</option>
          {budgetOptions.map((opt) => (
            <option key={opt} value={opt} className="bg-[#0D1230] text-white">
              {t(`budgetOptions.${opt}`)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
