'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { Languages } from 'lucide-react';

const localeLabels: Record<string, string> = {
  fr: 'FR',
  en: 'EN',
  ar: 'AR',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLocale(newLocale: string) {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 hover:border-[#F4B223]/50 text-white text-sm font-medium transition-all duration-200 hover:bg-white/5"
      >
        <Languages className="w-3.5 h-3.5 text-white/60" />
        <span className="text-[#F4B223]">{localeLabels[locale]}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-[#0D1230] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50 min-w-[80px]">
          {Object.entries(localeLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => switchLocale(key)}
              className={`block w-full text-left px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${
                key === locale
                  ? 'text-[#F4B223] bg-white/5'
                  : 'text-white hover:text-[#F4B223] hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
