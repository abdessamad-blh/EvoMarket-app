// src/components/ServicesSection.tsx
'use client';
import React, { JSX } from 'react';

export default function ServicesSection(): JSX.Element {
  const services = [
    {
      title: "Web Development",
      description: "Build fast, responsive, and scalable websites and web applications using the latest technologies.",
      icon: "🌐", // Replace with your own icon or image
      whyUs: "Custom solutions built with Next.js for top performance."
    },
    {
      title: "Digital Marketing",
      description: "Increase your online visibility and drive targeted traffic with comprehensive SEO and marketing strategies.",
      icon: "📈",
      whyUs: "Data-driven strategies tailored for the Moroccan market."
    },
    {
      title: "Brand Identity",
      description: "Create a distinctive brand identity that resonates with your audience and sets you apart.",
      icon: "✨",
      whyUs: "We craft memorable, authentic brand stories."
    }
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#142143] mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We deliver results-driven digital solutions to elevate Moroccan businesses.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#1a5d94]/10"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-[#142143] mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="mt-4 pt-4 border-t border-[#f1a100]/30">
                <p className="text-sm font-semibold text-[#1a5d94]">Why EvoMarket?</p>
                <p className="text-sm text-gray-600">{service.whyUs}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}