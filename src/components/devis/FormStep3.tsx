'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { MessageSquare, ShieldCheck } from 'lucide-react';

export interface Step3Data {
  description: string;
  privacyAccepted: boolean;
}

interface FormStep3Props {
  data: Step3Data;
  onChange: (data: Step3Data) => void;
  errors: Partial<Record<keyof Step3Data, string>>;
}

export default function FormStep3({ data, onChange, errors }: FormStep3Props) {
  const t = useTranslations('devis.step3');

  return (
    <div className="space-y-5">
      <h3
        className="text-2xl sm:text-3xl text-white mb-6"
        style={{ fontFamily: 'var(--font-bebas)' }}
      >
        {t('title')}
      </h3>

      {/* Message */}
      <div>
        <label className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <MessageSquare className="w-4 h-4" />
          {t('description')}
        </label>
        <textarea
          rows={7}
          value={data.description}
          onChange={(e) => onChange({ ...data, description: e.target.value })}
          placeholder={t('descriptionPlaceholder')}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:border-[#F4B223]/50 focus:outline-none focus:ring-1 focus:ring-[#F4B223]/30 transition-all text-sm resize-none"
        />
      </div>

      {/* Privacy checkbox */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="mt-0.5">
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                data.privacyAccepted
                  ? 'bg-[#F4B223] border-[#F4B223]'
                  : errors.privacyAccepted
                    ? 'border-red-500/60'
                    : 'border-white/20 group-hover:border-white/40'
              }`}
              onClick={() => onChange({ ...data, privacyAccepted: !data.privacyAccepted })}
            >
              {data.privacyAccepted && (
                <ShieldCheck className="w-3.5 h-3.5 text-[#0A0E27]" />
              )}
            </div>
          </div>
          <span
            className="text-white/50 text-sm leading-relaxed"
            onClick={() => onChange({ ...data, privacyAccepted: !data.privacyAccepted })}
          >
            {t('privacy')}
          </span>
        </label>
        {errors.privacyAccepted && <p className="text-red-400 text-xs mt-1">{errors.privacyAccepted}</p>}
      </div>
    </div>
  );
}
