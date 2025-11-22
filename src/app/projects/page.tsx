// src/app/projects/page.tsx
import Navbar from '../../components/NavBar';
import Footer from '../../components/Footer';
import React, { JSX } from 'react';

export default function ProjectsPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {/* Projects Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#142143] mb-4">
              Our Projects
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our successful digital projects and creative solutions for clients across Morocco
            </p>
          </div>

          {/* Canva Projects Presentation */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Presentation Header */}
            <div className="bg-[#142143] text-white p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">EvoMarket Projects Portfolio</h2>
              <span className="text-sm bg-[#f1a100] text-[#142143] px-3 py-1 rounded-full">
                Project Showcase
              </span>
            </div>
            
            {/* Canva Embed */}
            <div className="aspect-video w-full">
              <iframe 
                src="https://www.canva.com/design/DAGhherWJek/LgU91L_TF57lM37zTWIrOg/view?embed" 
                width="100%" 
                height="100%"
                className="border-0"
                allowFullScreen
                allow="autoplay; fullscreen"
                title="EvoMarket Projects Portfolio"
              />
            </div>

            {/* Action Buttons */}
            <div className="p-6 bg-gray-50 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://www.canva.com/design/DAGhherWJek/LgU91L_TF57lM37zTWIrOg/watch?utm_content=DAGhherWJek&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he8353399c3"
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
                href="https://www.canva.com/design/DAGhherWJek/LgU91L_TF57lM37zTWIrOg/view?utm_content=DAGhherWJek&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he8353399c3"
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

          {/* Additional Project Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#142143] mb-3">Our Expertise</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#f1a100] rounded-full mr-3"></span>
                  Web Development & Design
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#f1a100] rounded-full mr-3"></span>
                  Digital Marketing Campaigns
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#f1a100] rounded-full mr-3"></span>
                  E-commerce Solutions
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#f1a100] rounded-full mr-3"></span>
                  Brand Identity Design
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#142143] mb-3">Get Started</h3>
              <p className="text-gray-600 mb-4">
                Ready to start your next project? Contact us for a free consultation.
              </p>
              <a 
                href="#contact"
                className="inline-flex items-center bg-[#142143] hover:bg-[#0f1a33] text-white font-semibold py-2 px-6 rounded transition-colors duration-200"
              >
                Start Your Project
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}