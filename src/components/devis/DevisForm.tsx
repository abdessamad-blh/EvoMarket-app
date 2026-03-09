'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import StepIndicator from './StepIndicator';
import FormStep0, { Step0Data } from './FormStep0';
import FormStep1, { Step1Data } from './FormStep1';
import FormStep2, { Step2Data } from './FormStep2';
import FormStep3, { Step3Data } from './FormStep3';
import SuccessModal from './SuccessModal';

const serviceParamMap: Record<string, string> = {
  web: 'website',
  mobile: 'mobile',
  seo: 'seo',
  social: 'socialMedia',
  content: 'content',
  ads: 'ads',
};

export default function DevisForm() {
  const t = useTranslations('devis');
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [step0Data, setStep0Data] = useState<Step0Data>({ sectors: [] });
  const [step0Errors, setStep0Errors] = useState<Partial<Record<keyof Step0Data, string>>>({});

  const [step1Data, setStep1Data] = useState<Step1Data>({
    fullName: '',
    email: '',
    company: '',
    phoneCode: '+212',
    phone: '',
    employees: '',
  });

  const [step2Data, setStep2Data] = useState<Step2Data>({
    services: [],
    budget: '',
  });

  const [step3Data, setStep3Data] = useState<Step3Data>({
    subject: '',
    description: '',
    privacyAccepted: false,
  });

  const [step1Errors, setStep1Errors] = useState<Partial<Record<keyof Step1Data, string>>>({});
  const [step2Errors, setStep2Errors] = useState<Partial<Record<keyof Step2Data, string>>>({});
  const [step3Errors, setStep3Errors] = useState<Partial<Record<keyof Step3Data, string>>>({});

  // Pre-select service from URL param
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam && serviceParamMap[serviceParam]) {
      setStep2Data((prev) => ({
        ...prev,
        services: prev.services.includes(serviceParamMap[serviceParam])
          ? prev.services
          : [...prev.services, serviceParamMap[serviceParam]],
      }));
    }
  }, [searchParams]);

  const validateStep0 = (): boolean => {
    const errors: Partial<Record<keyof Step0Data, string>> = {};
    if (step0Data.sectors.length === 0) errors.sectors = t('validation.selectSector');
    setStep0Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep1 = (): boolean => {
    const errors: Partial<Record<keyof Step1Data, string>> = {};
    const vt = (key: string) => t(`validation.${key}`);

    if (!step1Data.fullName.trim()) errors.fullName = vt('required');
    if (!step1Data.email.trim()) {
      errors.email = vt('required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step1Data.email)) {
      errors.email = vt('invalidEmail');
    }
    if (!step1Data.phone.trim()) errors.phone = vt('required');

    setStep1Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: Partial<Record<keyof Step2Data, string>> = {};
    const vt = (key: string) => t(`validation.${key}`);

    if (step2Data.services.length === 0) errors.services = vt('selectService');
    if (!step2Data.budget) errors.budget = vt('required');

    setStep2Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const errors: Partial<Record<keyof Step3Data, string>> = {};
    const vt = (key: string) => t(`validation.${key}`);

    if (!step3Data.subject.trim()) errors.subject = vt('required');
    if (!step3Data.description.trim()) errors.description = vt('required');
    if (!step3Data.privacyAccepted) errors.privacyAccepted = vt('acceptPrivacy');

    setStep3Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep0()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep1()) {
      setCurrentStep(3);
    } else if (currentStep === 3 && validateStep2()) {
      setCurrentStep(4);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setIsSubmitting(true);

    const formData = {
      sectors: step0Data.sectors,
      ...step1Data,
      phoneNumber: `${step1Data.phoneCode}${step1Data.phone}`,
      ...step2Data,
      ...step3Data,
      submittedAt: new Date().toISOString(),
    };

    // Log to console (no backend yet)
    console.log('=== DEVIS FORM SUBMISSION ===');
    console.log(JSON.stringify(formData, null, 2));
    console.log('============================');

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const handleNewRequest = () => {
    setShowSuccess(false);
    setCurrentStep(1);
    setStep0Data({ sectors: [] });
    setStep1Data({ fullName: '', email: '', company: '', phoneCode: '+212', phone: '', employees: '' });
    setStep2Data({ services: [], budget: '' });
    setStep3Data({ subject: '', description: '', privacyAccepted: false });
    setStep0Errors({});
    setStep1Errors({});
    setStep2Errors({});
    setStep3Errors({});
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 100 : -100, opacity: 0 }),
  };

  const direction = currentStep;

  return (
    <>
      <div className="w-full max-w-2xl mx-auto">
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={4} />

        {/* Form Card */}
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-10">
          {/* Animated step content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {currentStep === 1 && (
                <FormStep0 data={step0Data} onChange={setStep0Data} errors={step0Errors} />
              )}
              {currentStep === 2 && (
                <FormStep1 data={step1Data} onChange={setStep1Data} errors={step1Errors} />
              )}
              {currentStep === 3 && (
                <FormStep2 data={step2Data} onChange={setStep2Data} errors={step2Errors} />
              )}
              {currentStep === 4 && (
                <FormStep3 data={step3Data} onChange={setStep3Data} errors={step3Errors} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevious}
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-medium py-3 px-6 rounded-full transition-all duration-200 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('buttons.previous')}
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-[#F4B223] hover:bg-[#E09800] text-[#0A0E27] font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 text-sm shadow-lg shadow-[#F4B223]/20"
              >
                {t('buttons.next')}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-[#F4B223] hover:bg-[#E09800] text-[#0A0E27] font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 text-sm shadow-lg shadow-[#F4B223]/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0A0E27]/30 border-t-[#0A0E27] rounded-full animate-spin" />
                    {t('buttons.submitting')}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t('buttons.submit')}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <SuccessModal isOpen={showSuccess} onNewRequest={handleNewRequest} />
    </>
  );
}
