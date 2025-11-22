// src/components/HeroSection.tsx
'use client';

import { useState, useEffect } from 'react';
import React from 'react';

export default function HeroSection() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const texts = [
    'Brand Identity',
    'Creative Solutions',
    'Digital Marketing',
    'Modern Websites'
  ];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % texts.length;
      const fullText = texts[i];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, texts, typingSpeed]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#142143] via-[#1a5d94] to-[#112258] px-4 sm:px-6 lg:px-8">
      <div className="text-center text-white max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          We Create{' '}
          <span className="text-[#f1a100]">
            {text}
            <span className="animate-pulse">|</span>
          </span>
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
          EvoMarket is a digital agency in Rabat, Morocco, transforming ideas into digital success stories.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <button className="bg-[#f1a100] hover:bg-[#e69500] text-[#142143] font-semibold py-4 px-8 rounded-full transition-all duration-200 transform hover:scale-105 text-lg shadow-lg hover:shadow-xl">
            Start Your Project
          </button>

          <button onClick={() => window.location.href = '/academy'} className="border-2 border-white hover:border-[#f1a100] text-white hover:text-[#f1a100] font-semibold py-4 px-8 rounded-full transition-all duration-200 transform hover:scale-105 text-lg">
            View Our Academy
          </button>
        </div>
      </div>
    </section>
  );
}