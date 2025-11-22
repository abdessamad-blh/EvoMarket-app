// src/components/FeaturedWork.tsx
'use client';

import { useState, useEffect } from 'react';
import React, { JSX } from 'react';

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    // metrics: {
    //     label: string;
    //     value: string;
    // }[];
    technologies: string[];
    category: string;
}

export default function FeaturedWork(): JSX.Element {
    const [currentProject, setCurrentProject] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const projects: Project[] = [
        {
            id: 1,
            title: "Orthosmart Platform",
            description: "Revolutionizing orthoptic rehabilitation through innovative technologies. A comprehensive digital platform with advanced features and seamless user experience.",
            image: "/images/projects/1.png",
            // metrics: [
            //     { label: "Conversion", value: "+38%" },
            //     { label: "Performance", value: "95/100" },
            //     { label: "Satisfaction", value: "4.9/5" }
            // ],
            technologies: ["React.js", "Next.js", "SCSS", "Figma", "Node.js", "MongoDB"],
            category: "Web Development & Digital Marketing"
        },
        {
            id: 2,
            title: "E-commerce Solution",
            description: "A complete e-commerce ecosystem with advanced analytics, AI-powered recommendations, and seamless payment integrations for maximum conversion.",
            image: "/images/projects/2.png",
            // metrics: [
            //     { label: "Revenue", value: "+45%" },
            //     { label: "Load Time", value: "1.2s" },
            //     { label: "User Growth", value: "+62%" }
            // ],
            technologies: ["Next.js", "TypeScript", "Paypal", "PostgreSQL", "Tailwind CSS"],
            category: "E-commerce Development"
        },
        {
            id: 3,
            title: "Mobile Health App",
            description: "A cross-platform health application with real-time monitoring, AI diagnostics, and seamless integration with healthcare providers.",
            image: "/images/projects/3.png",
            // metrics: [
            //     { label: "Downloads", value: "50K+" },
            //     { label: "Rating", value: "4.8/5" },
            //     { label: "Retention", value: "78%" }
            // ],
            technologies: ["React.ts", "Next.ts", "MySQL", "Node.js", "AWS"],
            category: "Mobile Development & AI"
        }
    ];

    const animateTransition = (direction: 'next' | 'prev') => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentProject((prev) =>
                direction === 'next'
                    ? (prev + 1) % projects.length
                    : (prev - 1 + projects.length) % projects.length
            );
            setTimeout(() => setIsAnimating(false), 300);
        }, 300);
    };

    const nextProject = () => animateTransition('next');
    const prevProject = () => animateTransition('prev');

    // Auto-rotate every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAnimating) {
                animateTransition('next');
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [isAnimating]);

    return (
        <section id="featured-work" className="min-h-[70vh] flex items-center justify-center bg-white py-12">
            <div className="w-[92%] max-w-[1800px] mx-auto h-full">
                {/* Section Header */}
                <div className="text-center mb-6">
                    <h2 className="text-5xl md:text-6xl font-bold text-[#142143] mb-4">
                        Featured Work
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Cutting-edge digital solutions that drive results and transform businesses
                    </p>
                </div>

                {/* Enhanced Projects Carousel */}
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden h-[60vh] min-h-[700px] border border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                        {/* Left Column - Project Info with Animation */}
                        <div className={`p-12 lg:p-16 flex flex-col justify-center transition-all duration-500 ${isAnimating ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'
                            }`}>
                            <div className="space-y-8">
                                {/* Category */}
                                <span className="inline-block bg-[#f1a100] text-[#142143] text-sm font-semibold px-6 py-3 rounded-full shadow-lg">
                                    {projects[currentProject].category}
                                </span>

                                {/* Title */}
                                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#142143] leading-tight">
                                    {projects[currentProject].title}
                                </h3>

                                {/* Description */}
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    {projects[currentProject].description}
                                </p>

                                {/* Metrics */}
                                {/* <div className="grid grid-cols-3 gap-8 py-8">
                                    {projects[currentProject].metrics.map((metric, index) => (
                                        <div key={index} className="text-center transform hover:scale-110 transition-transform duration-300">
                                            <div className="text-3xl lg:text-4xl font-bold text-[#142143] bg-gradient-to-r from-[#f1a100] to-[#ff6b00] bg-clip-text text-transparent">
                                                {metric.value}
                                            </div>
                                            <div className="text-md text-gray-500 mt-2 font-semibold">
                                                {metric.label}
                                            </div>
                                        </div>
                                    ))}
                                </div> */}

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-3 pt-6">
                                    {projects[currentProject].technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* View Details Button */}
                                <div className="pt-10">
                                    <button className="group bg-[#142143] hover:bg-[#1a5d94] text-white font-semibold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 text-lg shadow-xl hover:shadow-2xl flex items-center space-x-3">
                                        <span>View Case Study</span>
                                        <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Full Background Image with Animation */}
                        <div className="relative h-full w-full overflow-hidden">
                            <div
                                className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ${isAnimating ? 'scale-110 opacity-50' : 'scale-100 opacity-100'
                                    }`}
                                style={{ backgroundImage: `url('${projects[currentProject].image}')` }}
                            />

                            {/* Enhanced Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />

                            {/* Project counter */}
                            {/* <div className="absolute bottom-8 left-8 bg-black/70 text-white px-6 py-3 rounded-full text-lg font-semibold backdrop-blur-sm">
                                {currentProject + 1} / {projects.length}
                            </div> */}
                        </div>
                    </div>

                    {/* Enhanced Navigation Buttons */}
                    <button
                        onClick={prevProject}
                        disabled={isAnimating}
                        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#142143] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl z-10 backdrop-blur-sm border border-gray-200"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextProject}
                        disabled={isAnimating}
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#142143] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl z-10 backdrop-blur-sm border border-gray-200"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Enhanced Project Indicators */}
                <div className="flex justify-center mt-12 space-x-4">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => !isAnimating && setCurrentProject(index)}
                            className={`w-4 h-4 rounded-full transition-all duration-500 ${index === currentProject
                                ? 'bg-[#f1a100] scale-125 shadow-lg'
                                : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                                } ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}