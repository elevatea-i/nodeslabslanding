'use client';

import React, { Suspense, lazy } from 'react';
import HeroSection from '@/components/HeroSection';
import AutomationSection from '@/components/AutomationSection';
import PASSection from '@/components/PASSection';
import { BentoCardSkeleton, ProcessStepSkeleton, CardSkeleton } from '@/components/SkeletonLoader';

const BenefitsSection = lazy(() => import('@/components/BenefitsSection'));
const ProcessSection = lazy(() => import('@/components/ProcessSection'));
const TechnologyBenefitsSection = lazy(() => import('@/components/TechnologyBenefitsSection'));
const AIToolsCarousel = lazy(() => import('@/components/AIToolsCarousel'));
const CTASection = lazy(() => import('@/components/CTASection'));
const Footer = lazy(() => import('@/components/Footer'));

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AutomationSection />
      <PASSection />
      <Suspense
        fallback={
          <div className="space-y-20 py-20">
            <div className="top-tier-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <BentoCardSkeleton />
                <BentoCardSkeleton />
                <BentoCardSkeleton />
                <BentoCardSkeleton />
                <BentoCardSkeleton />
              </div>
            </div>
            <div className="top-tier-container">
              <div className="flex flex-col md:flex-row justify-center items-center gap-16">
                <ProcessStepSkeleton />
                <ProcessStepSkeleton />
                <ProcessStepSkeleton />
              </div>
            </div>
            <div className="top-tier-container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CardSkeleton />
                <CardSkeleton />
              </div>
            </div>
          </div>
        }
      >
        <BenefitsSection />
        <ProcessSection />
        <TechnologyBenefitsSection />
        <AIToolsCarousel />
        <CTASection />
        <Footer />
      </Suspense>
    </>
  );
}
