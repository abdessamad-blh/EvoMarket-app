'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LogoIntro() {
  // Start visible so there is zero flash before the overlay appears
  const [show, setShow] = useState(true);
  // Only animate the exit on a genuine first-visit intro
  const isIntro = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem('evo_intro')) {
      // Returning visitor — collapse instantly, no animation
      setShow(false);
    } else {
      // First visit — play intro then fade out
      sessionStorage.setItem('evo_intro', '1');
      isIntro.current = true;
      const t = setTimeout(() => setShow(false), 1000);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="logo-intro"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: '#0A0E27' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isIntro.current ? 0.3 : 0, ease: 'easeInOut' }}
        >

          {/* Same grid background as hero section */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(#F4B223 1px, transparent 1px), linear-gradient(90deg, #F4B223 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }} />
          </div>
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          {/* Logo */}
          <div className="relative z-10 w-[220px] h-[220px] sm:w-[300px] sm:h-[300px]">

            {/* Base logo — clipPath wipe left to right */}
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.1, ease: 'circOut' }}
            >
              <Image src="/images/4.png" alt="EvoMarket" fill className="object-contain" priority />
            </motion.div>

            {/* Icon overlay — fades in with glow */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              style={{ filter: 'drop-shadow(0 0 20px rgba(244, 178, 35, 0.4))' }}
            >
              <Image src="/images/5.png" alt="EvoMarket Logo" fill className="object-contain" priority />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
