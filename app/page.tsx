import React from 'react';
import HeroSection from '@/components/HeroSection';
import AutomationSection from '@/components/AutomationSection';
import PASSection from '@/components/PASSection';
import HomeBelowFold from '@/components/HomeBelowFold';
import { faqItems } from '@/data/faq';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'es-MX',
  mainEntity: faqItems.map((i) => ({
    '@type': 'Question',
    name: i.q.es,
    acceptedAnswer: { '@type': 'Answer', text: i.a.es },
  })),
};

export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#0B0D14' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />
      <HeroSection />
      <AutomationSection />
      <PASSection />
      <HomeBelowFold />
    </div>
  );
}
