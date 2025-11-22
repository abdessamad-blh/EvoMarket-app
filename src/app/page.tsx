// src/app/page.tsx
import Footer from '../components/Footer';
import React, { JSX } from 'react';
import Navbar from '../components/NavBar'
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import FeaturedWork from '../components/FeaturedWork';
import IndustryStandards from '../components/IndustryStandards';
import AboutUs from '@/components/AboutUs';


export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <FeaturedWork />
      <IndustryStandards />
      <ServicesSection />
      <AboutUs />
      <Footer />
    </main>
  );
}