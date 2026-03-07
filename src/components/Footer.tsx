'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Linkedin, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tServices = useTranslations('services');
  const locale = useLocale();

  const serviceLinks = [
    { label: tServices('socialMedia.title'), href: `/${locale}#services` },
    { label: tServices('contentCreation.title'), href: `/${locale}#services` },
    { label: tServices('webDev.title'), href: `/${locale}#services` },
    { label: tServices('mobileApp.title'), href: `/${locale}#services` },
    { label: tServices('digitalMarketing.title'), href: `/${locale}#services` },
  ];

  const usefulLinks = [
    { label: tNav('home'), href: `/${locale}` },
    { label: tNav('portfolio'), href: `/${locale}#portfolio` },
    { label: tNav('blog'), href: `/${locale}/blog` },
    { label: tNav('contact'), href: `/${locale}#contact` },
    { label: tNav('academy'), href: 'https://academy.evomarket.ma' },
  ];

  return (
    <footer className="bg-[#060916] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo + Description */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="inline-block mb-4">
              <Image
                src="/images/evologo.png"
                alt="EvoMarket Logo"
                width={100}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              {t('description')}
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/evomarket.agency/', label: 'Instagram' },
                { icon: Facebook, href: 'https://www.facebook.com/people/EvoMarket/61577177497761/', label: 'Facebook' },
                { icon: Linkedin, href: 'https://www.linkedin.com/company/evomarket/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:evomarketagency@gmail.com', label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-[#F4B223]/10 hover:border-[#F4B223]/30 hover:text-[#F4B223] text-white/40 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3
              className="text-[#F4B223] text-lg mb-5 tracking-wide"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              {t('services')}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3
              className="text-[#F4B223] text-lg mb-5 tracking-wide"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              {t('links')}
            </h3>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    className="text-white/40 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              className="text-[#F4B223] text-lg mb-5 tracking-wide"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              {t('newsletter')}
            </h3>
            <p className="text-white/40 text-sm mb-4">
              {t('newsletterDesc')}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 focus:border-[#F4B223]/50 focus:outline-none transition-all"
              />
              <button className="bg-[#F4B223] hover:bg-[#E09800] text-[#0A0E27] px-3 py-2.5 rounded-lg transition-colors shrink-0">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <h4
                className="text-[#F4B223] text-base mb-3 tracking-wide"
                style={{ fontFamily: 'var(--font-bebas)' }}
              >
                {t('contactTitle')}
              </h4>
              <p className="text-white/40 text-sm">06 24 45 88 47</p>
              <p className="text-white/40 text-sm">05 37 70 59 11</p>
              <p className="text-white/40 text-sm">evomarketagency@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} EvoMarket. {t('rights')}
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-white/30 hover:text-white/50 text-sm transition-colors">
                {t('privacy')}
              </Link>
              <Link href="#" className="text-white/30 hover:text-white/50 text-sm transition-colors">
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
