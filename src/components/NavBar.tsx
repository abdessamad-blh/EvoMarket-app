'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';

export default function NavBar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    // { name: t('home'), path: `/${locale}` },
    { name: t('services'), path: `/${locale}#services` },
    { name: t('portfolio'), path: `/${locale}#portfolio` },
    { name: t('blog'), path: `/${locale}/blog` },
    { name: t('contact'), path: `/${locale}/contact` },
    { name: t('academy'), path: 'https://academy.evomarket.ma' }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0E27]/95 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center shrink-0">
              <Image
                src="/images/evologo.png"
                alt="EvoMarket Logo"
                width={120}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-8 md:gap-16">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="gold-underline text-white/90 hover:text-white transition-colors duration-200 font-medium text-[15px]"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side: Language Switcher + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageSwitcher />
              <Link
                href={`/${locale}/devis`}
                className="bg-[#F4B223] hover:bg-[#E09800] text-[#0A0E27] font-semibold py-2.5 px-6 rounded-full transition-all duration-200 text-sm shadow-lg shadow-[#F4B223]/20 hover:shadow-[#F4B223]/40 hover:scale-105"
              >
                {t('cta')}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-[#0A0E27]/98 backdrop-blur-md border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.path}
                      className="block text-white/90 hover:text-[#F4B223] py-3 px-4 rounded-lg hover:bg-white/5 transition-all duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 flex items-center gap-4 px-4">
                  <LanguageSwitcher />
                  <Link
                    href={`/${locale}#contact`}
                    className="bg-[#F4B223] hover:bg-[#E09800] text-[#0A0E27] font-semibold py-2.5 px-6 rounded-full transition-all duration-200 text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('cta')}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

    </>
  );
}
