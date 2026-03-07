'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const stepKeys = ['info', 'service', 'details'] as const;

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const t = useTranslations('devis.steps');

  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-lg mx-auto mb-10">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <React.Fragment key={step}>
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#F4B223] text-[#0A0E27]'
                    : isActive
                      ? 'bg-[#F4B223] text-[#0A0E27] ring-4 ring-[#F4B223]/20'
                      : 'bg-white/10 text-white/40 border border-white/10'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap transition-colors duration-300 ${
                  isActive || isCompleted ? 'text-[#F4B223]' : 'text-white/30'
                }`}
              >
                {t(stepKeys[i])}
              </span>
            </div>

            {/* Connector line */}
            {i < totalSteps - 1 && (
              <div className="flex-1 h-px mx-3 mb-6">
                <div
                  className={`h-full transition-colors duration-300 ${
                    step < currentStep ? 'bg-[#F4B223]' : 'bg-white/10'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
