// src/components/IndustryStandards.tsx
'use client';

import React, { JSX } from 'react';
import { 
//   Figma, 
//   React, 
//   TypeScript, 
//   NextJs, 
//   Vue, 
//   Node, 
  GitBranch, 
  Database,
  Cloud,
  Shield,
  Zap,
  Code2,
  Palette
} from 'lucide-react';

export default function IndustryStandards(): JSX.Element {
  const technologies = [
    // { icon: Figma, name: 'Figma', color: 'text-[#F24E1E]' },
    // { icon: React, name: 'React', color: 'text-[#61DAFB]' },
    // { icon: TypeScript, name: 'TypeScript', color: 'text-[#3178C6]' },
    // { icon: NextJs, name: 'Next.js', color: 'text-black' },
    // { icon: Vue, name: 'Vue.js', color: 'text-[#4FC08D]' },
    // { icon: Node, name: 'Node.js', color: 'text-[#339933]' },
    { icon: GitBranch, name: 'Git', color: 'text-[#F05032]' },
    { icon: Database, name: 'Database', color: 'text-[#336791]' },
    { icon: Cloud, name: 'Cloud', color: 'text-[#0080FF]' },
    { icon: Shield, name: 'Security', color: 'text-[#4CAF50]' },
    { icon: Zap, name: 'Performance', color: 'text-[#FFD700]' },
    { icon: Code2, name: 'Clean Code', color: 'text-[#667EEA]' },
    { icon: Palette, name: 'UI/UX', color: 'text-[#FF6B6B]' },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-[#142143] to-[#1a5d94] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Built with Industry Standards
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            We leverage cutting-edge technologies and best practices to deliver exceptional digital experiences
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#142143] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#1a5d94] to-transparent z-10" />
          
          {/* Marquee Wrapper */}
          <div className="flex space-x-12 animate-marquee whitespace-nowrap">
            {[...technologies, ...technologies].map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 transform hover:scale-105 transition-all duration-300 hover:bg-white/20"
                >
                  <IconComponent className={`w-8 h-8 ${tech.color}`} />
                  <span className="text-white font-semibold text-lg">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}