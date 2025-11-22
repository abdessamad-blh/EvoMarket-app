// src/components/Navbar.tsx
'use client';

import { useState } from 'react';
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Update navigation items to match your structure
    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/#services' },
        { name: 'About', path: '/#about' },
        { name: 'Projects', path: '/projects' },
        { name: 'Contact', path: '/#contact' }
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo - Left aligned */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <img
                                    src="/images/evologo.png"
                                    alt="EvoMarket Logo"
                                    className="h-14 w-auto"
                                />
                            </Link>
                        </div>

                        {/* Centered Navigation - Desktop */}
                        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
                            <div className="flex items-center space-x-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        className="text-gray-700 hover:text-[#f1a100] transition-colors duration-200 font-medium text-lg relative group"
                                    >
                                        {item.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f1a100] transition-all duration-200 group-hover:w-full"></span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* CTA Button - Right aligned */}
                        <div className="hidden md:flex items-center">
                            <Link
                                href="/#contact"
                                className="bg-[#142143] hover:bg-[#1a5d94] text-white font-medium py-2.5 px-6 rounded-full transition-all duration-200 text-sm shadow-sm hover:shadow-md"
                            >
                                Get Quote
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden text-gray-700 p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
                        <div className="px-4 py-4 space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className="block text-gray-700 hover:text-[#f1a100] py-2 transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-4">
                                <Link
                                    href="/#contact"
                                    className="bg-[#142143] hover:bg-[#1a5d94] text-white font-medium py-2.5 px-6 rounded-full transition-all duration-200 text-sm inline-block"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Get Quote
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Spacer to prevent content from going under fixed navbar */}
            <div className="h-20"></div>
        </>
    );
}