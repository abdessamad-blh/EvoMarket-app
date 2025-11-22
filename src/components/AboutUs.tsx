// src/components/AboutUs.tsx - Enhanced Version
'use client';

import React, { JSX } from 'react';

export default function AboutUs(): JSX.Element {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#142143] mb-4">
            Who We Are
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            EvoMarket - Your premier digital marketing agency based in Rabat, Morocco
          </p>
        </div>

        {/* Canva Presentation */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Embed Header */}
          <div className="bg-[#142143] text-white p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">EvoMarket Presentation</h3>
            <span className="text-sm bg-[#f1a100] text-[#142143] px-3 py-1 rounded-full">
              58 Pages
            </span>
          </div>
          
          {/* Canva Embed */}
          <div className="aspect-video w-full">
            <iframe 
              src="https://www.canva.com/design/DAGezBDQtCc/qwz8SVLMjU7uoR5_ghpZqQ/view?embed" 
              width="100%" 
              height="100%"
              className="border-0"
              allowFullScreen
              allow="autoplay; fullscreen"
              title="EvoMarket Digital Agency Presentation"
            />
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-gray-50 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://www.canva.com/design/DAGezBDQtCc/qwz8SVLMjU7uoR5_ghpZqQ/watch?utm_content=DAGezBDQtCc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hfe7ccc2f2f"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#f1a100] hover:bg-[#e69500] text-[#142143] font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex-1 justify-center max-w-xs"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Presentation
            </a>
            
            <a 
              href="https://www.canva.com/design/DAGezBDQtCc/qwz8SVLMjU7uoR5_ghpZqQ/view?utm_content=DAGezBDQtCc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hfe7ccc2f2f"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#1a5d94] hover:bg-[#164d7a] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex-1 justify-center max-w-xs"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in Canva
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-[#142143] mb-4">Why Choose EvoMarket?</h3>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#f1a100] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-[#142143] font-bold">✓</span>
              </div>
              <h4 className="font-semibold text-[#142143] mb-2">Expert Team</h4>
              <p className="text-gray-600">Professional digital marketers based in Rabat</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#f1a100] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-[#142143] font-bold">★</span>
              </div>
              <h4 className="font-semibold text-[#142143] mb-2">Quality Service</h4>
              <p className="text-gray-600">Premium digital solutions for Moroccan businesses</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#f1a100] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-[#142143] font-bold">⚡</span>
              </div>
              <h4 className="font-semibold text-[#142143] mb-2">Fast Results</h4>
              <p className="text-gray-600">Quick implementation and measurable outcomes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}