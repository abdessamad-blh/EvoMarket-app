'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, ArrowLeft, RotateCcw } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onNewRequest: () => void;
}

export default function SuccessModal({ isOpen, onNewRequest }: SuccessModalProps) {
  const t = useTranslations('devis.success');
  const locale = useLocale();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0E27]/80 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-[#0D1230] border border-white/10 rounded-3xl p-8 sm:p-12 max-w-md w-full text-center shadow-2xl"
          >
            {/* Success icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-[#F4B223]/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-[#F4B223]" />
            </motion.div>

            {/* Confetti-like dots */}
            <div className="absolute top-6 left-8 w-2 h-2 bg-[#F4B223] rounded-full animate-float" />
            <div className="absolute top-12 right-10 w-1.5 h-1.5 bg-[#F4B223]/60 rounded-full animate-float-delayed" />
            <div className="absolute bottom-10 left-12 w-1 h-1 bg-[#F4B223]/40 rounded-full animate-glow" />

            <h2
              className="text-3xl sm:text-4xl text-white mb-3"
              style={{ fontFamily: 'var(--font-bebas)' }}
            >
              {t('title')}
            </h2>

            <p className="text-white/50 text-sm leading-relaxed mb-8">
              {t('message')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/${locale}`}
                className="inline-flex items-center justify-center gap-2 bg-[#F4B223] hover:bg-[#E09800] text-[#0A0E27] font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('backHome')}
              </Link>
              <button
                onClick={onNewRequest}
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-[#F4B223]/40 text-white hover:text-[#F4B223] font-medium py-3 px-6 rounded-full transition-all duration-300 text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                {t('newRequest')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
