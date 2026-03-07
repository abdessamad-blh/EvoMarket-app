'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/212624458847?text=Bonjour%20EvoMarket%2C%20je%20souhaite%20discuter%20d%27un%20projet.';

export default function WhatsAppButton() {
  const t = useTranslations('whatsapp');
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 hidden md:block">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-3 bg-white text-[#0A0E27] text-sm font-medium px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
          >
            {t('tooltip')}
            <div className="absolute -bottom-1 right-5 w-2 h-2 bg-white rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <MessageCircle className="w-6 h-6 text-white relative z-10" fill="white" />

      </a>
    </div>
  );
}
