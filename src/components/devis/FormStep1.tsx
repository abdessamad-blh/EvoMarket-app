'use client';

import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { User, Building2, Mail, Phone, Users } from 'lucide-react';

export interface Step1Data {
  nameType: 'person' | 'org';
  fullName: string;
  email: string;
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
  // North Africa
  { code: '+212', label: 'Morocco' },
  { code: '+213', label: 'Algeria' },
  { code: '+216', label: 'Tunisia' },
  { code: '+218', label: 'Libya' },
  { code: '+20',  label: 'Egypt' },
  { code: '+249', label: 'Sudan' },
  { code: '+222', label: 'Mauritania' },
  // West Africa
  { code: '+221', label: 'Senegal' },
  { code: '+225', label: "Côte d'Ivoire" },
  { code: '+233', label: 'Ghana' },
  { code: '+234', label: 'Nigeria' },
  { code: '+226', label: 'Burkina Faso' },
  { code: '+223', label: 'Mali' },
  { code: '+227', label: 'Niger' },
  { code: '+229', label: 'Benin' },
  { code: '+228', label: 'Togo' },
  { code: '+224', label: 'Guinea' },
  { code: '+232', label: 'Sierra Leone' },
  { code: '+220', label: 'Gambia' },
  { code: '+245', label: 'Guinea-Bissau' },
  { code: '+231', label: 'Liberia' },
  { code: '+238', label: 'Cape Verde' },
  // Europe & Middle East
  { code: '+33',  label: 'France' },
  { code: '+1',   label: 'United States' },
  { code: '+44',  label: 'United Kingdom' },
  { code: '+971', label: 'United Arab Emirates' },
  { code: '+966', label: 'Saudi Arabia' },
  // Custom
  { code: 'other', label: 'Other' },
];

const employeeOptions = ['1-10', '11-50', '51-100', '101-500', '500+'] as const;

export default function FormStep1({ data, onChange, errors }: FormStep1Props) {
  const t = useTranslations('devis.step1');
  const [isCustom, setIsCustom] = useState(false);
  const [customCode, setCustomCode] = useState('');
  const phoneRef = useRef<HTMLInputElement>(null);

  const inputClass = (field: keyof Step1Data) =>
    `w-full bg-white/5 border ${
      errors[field] ? 'border-red-500/60' : 'border-white/10'
    } rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:border-[#F4B223]/50 focus:outline-none focus:ring-1 focus:ring-[#F4B223]/30 transition-all text-sm`;

  const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'other') {
      setIsCustom(true);
      setCustomCode('+');
      onChange({ ...data, phoneCode: '' });
    } else {
      setIsCustom(false);
      setCustomCode('');
      onChange({ ...data, phoneCode: e.target.value });
    }
  };

  const handleCustomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+')) val = '+' + val.replace(/^\+*/, '');
    const digits = val.slice(1).replace(/\D/g, '');
    if (digits.length <= 3) {
      const newCode = '+' + digits;
      setCustomCode(newCode);
      onChange({ ...data, phoneCode: newCode });
    } else {
      const newCode = '+' + digits.slice(0, 3);
      const spill = digits.slice(3);
      setCustomCode(newCode);
      onChange({ ...data, phoneCode: newCode, phone: spill });
      phoneRef.current?.focus();
    }
  };

  return (
    <div className="space-y-5">
      <h3
        className="text-2xl sm:text-3xl text-white mb-6"
        style={{ fontFamily: 'var(--font-bebas)' }}
      >
        {t('title')}
      </h3>

      {/* Name type toggle + input */}
      <div>
        <label className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <User className="w-4 h-4" />
          {data.nameType === 'person' ? t('personName') : t('orgName')}
          <span className="text-red-400">*</span>
        </label>
        <div className="flex rounded-xl overflow-hidden border border-white/10 mb-2">
          <button
            type="button"
            onClick={() => onChange({ ...data, nameType: 'person' })}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors ${
              data.nameType === 'person'
                ? 'bg-[#F4B223]/20 text-[#F4B223]'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            {t('typePersonal')}
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...data, nameType: 'org' })}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors border-l border-white/10 ${
              data.nameType === 'org'
                ? 'bg-[#F4B223]/20 text-[#F4B223]'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            {t('typeOrg')}
          </button>
        </div>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => onChange({ ...data, fullName: e.target.value })}
          placeholder={data.nameType === 'person' ? t('personNamePlaceholder') : t('orgNamePlaceholder')}
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

      {/* Phone with country code */}
      <div>
        <label className="flex items-center gap-2 text-white/60 text-sm mb-2">
          <Phone className="w-4 h-4" />
          {t('phone')} <span className="text-red-400">*</span>
        </label>
        <div className="flex gap-2">
          <select
            value={isCustom ? 'other' : data.phoneCode}
            onChange={handleCodeChange}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-3.5 text-white text-sm focus:border-[#F4B223]/50 focus:outline-none focus:ring-1 focus:ring-[#F4B223]/30 transition-all w-[160px] shrink-0"
          >
            {countryCodes.map((cc) => (
              <option key={cc.code} value={cc.code} className="bg-[#0D1230] text-white">
                {cc.label}
              </option>
            ))}
          </select>
          {isCustom && (
            <input
              type="text"
              value={customCode}
              onChange={handleCustomCodeChange}
              maxLength={4}
              placeholder="+xxx"
              className="w-[60px] shrink-0 bg-white/5 border border-white/10 rounded-xl px-2 py-3.5 text-white placeholder-white/30 focus:border-[#F4B223]/50 focus:outline-none focus:ring-1 focus:ring-[#F4B223]/30 transition-all text-sm text-center"
            />
          )}
          <input
            ref={phoneRef}
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
