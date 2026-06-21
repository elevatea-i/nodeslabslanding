import React from 'react';
import HeroSection from '@/components/HeroSection';
import AutomationSection from '@/components/AutomationSection';
import PASSection from '@/components/PASSection';
import HomeBelowFold from '@/components/HomeBelowFold';

export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#0B0D14' }}>
      <HeroSection />
      <AutomationSection />
      <PASSection />
      <HomeBelowFold />
    </div>
  );
}
