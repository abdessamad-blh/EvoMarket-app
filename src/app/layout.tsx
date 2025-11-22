// src/app/layout.tsx
import './globals.css';
import React, { JSX } from 'react';

export const metadata = {
  title: 'EvoMarket - Digital Agency in Rabat, Morocco',
  description: 'EvoMarket is a leading digital marketing agency based in Rabat, Morocco.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}