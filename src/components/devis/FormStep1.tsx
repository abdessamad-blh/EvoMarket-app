'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { User, Building2, Mail, Phone } from 'lucide-react';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export interface Step1Data {
  nameType: 'person' | 'org';
  fullName: string;
  email: string;
  phone: string; // full E.164 number (e.g., "+212612345678")
  employees: string;
}

interface FormStep1Props {
  data: Step1Data;
  onChange: (data: Step1Data) => void;
  errors: Partial<Record<keyof Step1Data, string>>;
}

// Custom country selector: SVG flag (from library) + calling code + invisible <select> overlay
function CountrySelect(props: {
  value?: string;
  onChange?: (value: string | undefined) => void;
  options?: { value: string | undefined; label: string }[];
  iconComponent?: React.ComponentType<{ country: string; countryName?: string; className?: string }>;
  [key: string]: unknown;
}) {
  const { value, onChange, options = [], iconComponent: FlagIcon } = props;
  const callingCode = value
    ? getCountryCallingCode(value as Parameters<typeof getCountryCallingCode>[0])
    : null;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        paddingLeft: 10,
        paddingRight: 10,
        height: 50,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 12,
        flexShrink: 0,
        minWidth: 90,
        cursor: 'pointer',
        boxSizing: 'border-box',
      }}
    >
      {/* SVG flag from library — renders correctly on Windows */}
      {FlagIcon && value
        ? <FlagIcon country={value} countryName={value} className="rounded-[2px] w-6 h-[17px] object-cover block" />
        : <span style={{ fontSize: 16 }}>🌐</span>
      }
      {callingCode && (
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
          +{callingCode}
        </span>
      )}
      <svg width="10" height="10" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
      <select
        value={value ?? ''}
        onChange={(e) => onChange?.(e.target.value || undefined)}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          opacity: 0, cursor: 'pointer', zIndex: 1,
        }}
      >
        {options.map(({ value: v, label }) => (
          <option
            key={v ?? 'ZZ'}
            value={v ?? ''}
            style={{ background: '#0D1230', color: 'white' }}
          >
            {v
              ? `${label} +${getCountryCallingCode(v as Parameters<typeof getCountryCallingCode>[0])}`
              : label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function FormStep1({ data, onChange, errors }: FormStep1Props) {
  const t = useTranslations('devis.step1');

  const inputClass = (field: keyof Step1Data) =>
    `w-full bg-white/5 border ${
      errors[field] ? 'border-red-500/60' : 'border-white/10'
    } rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:border-[#F4B223]/50 focus:outline-none focus:ring-1 focus:ring-[#F4B223]/30 transition-all text-sm`;

  return (
    <>
      {/* Minimal CSS — CountrySelect renders its own styled container */}
      <style>{`
        .PhoneInput {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .PhoneInputCountry {
          display: contents;
        }
        .PhoneInputInput {
          flex: 1;
          min-width: 0;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 13px 16px;
          color: white;
          font-size: 14px;
          outline: none;
          transition: border 0.2s, box-shadow 0.2s;
          height: 50px;
          box-sizing: border-box;
        }
        .PhoneInputInput::placeholder { color: rgba(255,255,255,0.3); }
        .PhoneInputInput:focus {
          border-color: rgba(244,178,35,0.5);
          box-shadow: 0 0 0 1px rgba(244,178,35,0.3);
        }
        .phone-error .PhoneInputInput {
          border-color: rgba(239,68,68,0.6);
        }
      `}</style>

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
              onClick={() => onChange({ ...data, nameType: 'person', employees: '' })}
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

        {/* Phone with react-phone-number-input */}
        <div>
          <label className="flex items-center gap-2 text-white/60 text-sm mb-2">
            <Phone className="w-4 h-4" />
            {t('phone')} <span className="text-red-400">*</span>
          </label>
          <div className={errors.phone ? 'phone-error' : ''}>
            <PhoneInput
              defaultCountry="MA"
              value={data.phone}
              onChange={(val) => onChange({ ...data, phone: val ?? '' })}
              placeholder={t('phonePlaceholder')}
              countrySelectComponent={CountrySelect}
            />
          </div>
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Employees — commented out for now */}
        {/* {data.nameType === 'org' && (
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
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )} */}
      </div>
    </>
  );
}
