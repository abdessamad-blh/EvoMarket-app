// src/components/Footer.tsx
import React, { JSX } from 'react';

export default function Footer(): JSX.Element {
  const footerSections = {
    company: ['About Us', 'Our Team', 'Careers', 'News'],
    services: ['Web Development', 'Digital Marketing', 'SEO', 'Branding'],
    contact: ['Rabat, Morocco', 'contact@evomarket.ma', '+212 XXX-XXXXXX']
  };

  return (
    <footer className="bg-[#142143] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-[#f1a100] rounded-full flex items-center justify-center mr-3">
                <span className="text-[#142143] font-bold text-lg">E</span>
              </div>
              <span className="text-white text-xl font-bold">EvoMarket</span>
            </div>
            <p className="text-gray-300 mb-4">
              Leading digital agency in Rabat, Morocco. Transforming ideas into digital success stories.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <div
                  key={social}
                  className="w-8 h-8 bg-[#1a5d94] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#f1a100] transition-colors"
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Menus */}
          {Object.entries(footerSections).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-[#f1a100] font-bold mb-4 capitalize">
                {section}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1a5d94] mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 EvoMarket. All rights reserved. Rabat, Morocco</p>
        </div>
      </div>
    </footer>
  );
}