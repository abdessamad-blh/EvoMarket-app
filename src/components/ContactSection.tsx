'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Instagram, Facebook, Linkedin } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

export default function ContactSection({ standalone = false }: { standalone?: boolean }) {
  const t = useTranslations('contact');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    const mailtoLink = `mailto:evomarketagency@gmail.com?subject=Nouveau projet - ${formState.name}&body=${encodeURIComponent(
      `Nom: ${formState.name}\nEmail: ${formState.email}\nTéléphone: ${formState.phone}\n\nMessage:\n${formState.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className={`relative ${standalone ? 'py-16 min-h-screen' : 'py-24'}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1230] to-[#0A0E27]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F4B223]/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimationWrapper className="text-center mb-16">
          {/* <span className="inline-block bg-[#F4B223]/10 border border-[#F4B223]/30 text-[#F4B223] text-sm font-medium px-5 py-2 rounded-full mb-4">
            {t('badge')}
          </span> */}
          <h2
            className="text-lg sm:text-4xl md:text-6xl text-[#F4B223] mb-4 mt-6 tracking-tight"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            {t('title')}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/50 text-sm mb-2">{t('form.name')}</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-[#0D1230] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#F4B223]/50 focus:outline-none focus:ring-1 focus:ring-[#F4B223]/30 transition-all"
                    placeholder={t('form.name')}
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-sm mb-2">{t('form.email')}</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-[#0D1230] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#F4B223]/50 focus:outline-none focus:ring-1 focus:ring-[#F4B223]/30 transition-all"
                    placeholder={t('form.email')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/50 text-sm mb-2">{t('form.phone')}</label>
                <input
                  type="tel"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full bg-[#0D1230] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#F4B223]/50 focus:outline-none focus:ring-1 focus:ring-[#F4B223]/30 transition-all"
                  placeholder={t('form.phone')}
                />
              </div>

              <div>
                <label className="block text-white/50 text-sm mb-2">{t('form.message')}</label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-[#0D1230] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-[#F4B223]/50 focus:outline-none focus:ring-1 focus:ring-[#F4B223]/30 transition-all resize-none"
                  placeholder={t('form.message')}
                />
              </div>

              <button
                type="submit"
                className="bg-[#F4B223] hover:bg-[#E09800] text-[#0A0E27] font-semibold py-3.5 px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-[#F4B223]/20 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {t('form.send')}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Phone */}
            <div className="bg-[#0D1230] border border-white/5 rounded-2xl p-6 hover:border-[#F4B223]/20 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F4B223]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#F4B223]" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">{t('info.phone')}</h4>
                  <p className="text-white/50 text-sm">06 24 45 88 47</p>
                  <p className="text-white/50 text-sm">05 37 70 59 11</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-[#0D1230] border border-white/5 rounded-2xl p-6 hover:border-[#F4B223]/20 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F4B223]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#F4B223]" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">{t('info.email')}</h4>
                  <a href="mailto:evomarketagency@gmail.com" className="text-white/50 text-sm hover:text-[#F4B223] transition-colors">
                    evomarketagency@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-[#0D1230] border border-white/5 rounded-2xl p-6 hover:border-[#F4B223]/20 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F4B223]/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#F4B223]" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">{t('info.address')}</h4>
                  <p className="text-white/50 text-sm">{t('info.addressValue')}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-[#0D1230] border border-white/5 rounded-2xl p-6">
              <h4 className="text-white font-medium mb-4">{t('info.social')}</h4>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, href: 'https://www.instagram.com/evomarket.agency/', label: 'Instagram' },
                  { icon: Facebook, href: 'https://www.facebook.com/people/EvoMarket/61577177497761/', label: 'Facebook' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/company/evomarket/', label: 'LinkedIn' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#F4B223]/10 hover:border-[#F4B223]/30 hover:text-[#F4B223] text-white/50 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4.5 h-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-2xl overflow-hidden border border-white/10"
          style={{ height: 360 }}
        >
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-6.857072%2C34.00981%2C-6.817072%2C34.02981&layer=mapnik&marker=34.01981%2C-6.837072"
            width="100%"
            height="100%"
            style={{ border: 'none', filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)' }}
            loading="lazy"
            title="EvoMarket location"
          />
        </motion.div>
      </div>
    </section>
  );
}
