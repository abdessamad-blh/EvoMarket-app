'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { User, Mail, Building, Phone, Users } from 'lucide-react';

export interface Step1Data {
  fullName: string;
  email: string;
  company: string;
  phoneCode: string;
  phone: string;
  employees: string;
}

interface FormStep1Props {
  data: Step1Data;
  onChange: (data: Step1Data) => void;
  errors: Partial<Record<keyof Step1Data, string>>;
}

const countryCodes = [
  { code: '+212', label: '🇲🇦 +212' },
  { code: '+33', label: '🇫🇷 +33' },
  { code: '+1', label: '🇺🇸 +1' },
  { code: '+44', label: '🇬🇧 +44' },
  { code: '+971', label: '🇦🇪 +971' },
  { code: '+966', label: '🇸🇦 +966' },
];

const employeeOptions = ['1-10', '11-50', '51-100', '101-500', '500+'] as const;

export default function FormStep1({ data, onChange, errors }: FormStep1Props) {
  const t = useTranslations('devis.step1');

  const inputClass = (field: keyof Step1Data) =>
    `w-full bg-white/5 border ${
      errors[field] ? 'border-red-500/60' : 'border-white/10'
    } rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:border-[#F4B223]/50 focus:outline-none focus:ring-1 focus:ring-[#F4B223]/30 transition-all text-sm`;

  return (
    <div className="space-y-5">
      <h3
        className="text-2xl sm:text-3xl text-white mb-6"
        style={{ fontFamily: 'var(--font-bebas)' }}
      >
        {t('title')}
      </h3>

      {/* Full name */}
      <div>
        <label className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <User className="w-4 h-4" />
          {t('fullName')} <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => onChange({ ...data, fullName: e.target.value })}
          placeholder={t('fullNamePlaceholder')}
          className={inputClass('fullName')}
        />
        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <Mail className="w-4 h-4" />
          {t('email')} <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          placeholder={t('emailPlaceholder')}
          className={inputClass('email')}
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Company */}
      <div>
        <label className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <Building className="w-4 h-4" />
          {t('company')}
        </label>
        <input
          type="text"
          value={data.company}
          onChange={(e) => onChange({ ...data, company: e.target.value })}
          placeholder={t('companyPlaceholder')}
          className={inputClass('company')}
        />
      </div>

      {/* Phone with country code */}
      <div>
        <label className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <Phone className="w-4 h-4" />
          {t('phone')} <span className="text-red-400">*</span>
        </label>
        <div className="flex gap-2">
          <select
            value={data.phoneCode}
            onChange={(e) => onChange({ ...data, phoneCode: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-3.5 text-white text-sm focus:border-[#F4B223]/50 focus:outline-none focus:ring-1 focus:ring-[#F4B223]/30 transition-all w-[120px] shrink-0"
          >
            {countryCodes.map((cc) => (
              <option key={cc.code} value={cc.code} className="bg-[#0D1230] text-white">
                {cc.label}
              </option>
            ))}
          </select>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder={t('phonePlaceholder')}
            className={`flex-1 ${inputClass('phone')}`}
          />
        </div>
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
      </div>

      {/* Employees */}
      <div>
        <label className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <Users className="w-4 h-4" />
          {t('employees')}
        </label>
        <select
          value={data.employees}
          onChange={(e) => onChange({ ...data, employees: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-[#F4B223]/50 focus:outline-none focus:ring-1 focus:ring-[#F4B223]/30 transition-all"
        >
          <option value="" className="bg-[#0D1230] text-white/50">{t('employeesPlaceholder')}</option>
          {employeeOptions.map((opt) => (
            <option key={opt} value={opt} className="bg-[#0D1230] text-white">
              {t(`employeesOptions.${opt}`)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
