'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { BentoCardSkeleton, ProcessStepSkeleton, CardSkeleton } from '@/components/SkeletonLoader';

const BenefitsSection = dynamic(() => import('@/components/BenefitsSection'));
const MetricsSection = dynamic(() => import('@/components/MetricsSection'));
const AIToolsCarousel = dynamic(() => import('@/components/AIToolsCarousel'));
const CTASection = dynamic(() => import('@/components/CTASection'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function HomeBelowFold() {
  return (
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
      <div id="servicios">
        <BenefitsSection />
      </div>
      <MetricsSection />
      <AIToolsCarousel />
      <CTASection />
      <Footer />
    </Suspense>
  );
}
