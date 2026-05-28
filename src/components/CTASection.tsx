'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { trackCTAClick } from '@/lib/analytics';
import { BorderBeam } from '@/components/ui/border-beam';

const CTASection: React.FC = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const prefetchFiredRef = useRef(false);

  // Prefetch contact form component and route when hovering over CTA button
  useEffect(() => {
    const prefetchContactForm = async () => {
      try {
        // Prefetch the contact form component
        await import('@/components/ContactForm');
      } catch (error) {
        console.error('Error prefetching ContactForm:', error);
      }
    };

    // Start prefetching after a short delay when CTA section is visible
    const timer = setTimeout(() => {
      prefetchContactForm();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleContactClick = () => {
    trackCTAClick('final');
    router.push('/contact');
  };

  const handleMouseEnter = () => {
    if (prefetchFiredRef.current) return;
    prefetchFiredRef.current = true;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = '/contact';
    document.head.appendChild(link);
  };

  return (
    <section id="contacto" className="relative section-spacing" style={{ background: '#000' }}>
      <div className="relative z-20 top-tier-container">
        {/* Premium CTA Container */}
        <motion.div
          className="relative overflow-hidden rounded-3xl p-12 md:p-16 lg:p-20 text-center"
          style={{
            background: `
              radial-gradient(ellipse at top,
                rgba(173, 201, 224, 0.15) 0%,
                rgba(173, 201, 224, 0.08) 25%,
                rgba(68, 75, 142, 0.06) 50%,
                rgba(0, 0, 0, 0.95) 80%,
                #000000 100%
              )
            `,
            border: '1px solid rgba(45, 68, 96, 0.4)',
            boxShadow: `
              0 0 0 1px rgba(45, 68, 96, 0.3),
              0 4px 32px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          <BorderBeam size={300} duration={12} delay={0} colorFrom="#2D4460" colorTo="#ADC9E0" />

          {/* Background Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(circle at 20% 80%, rgba(173, 201, 224, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(173, 201, 224, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(68, 75, 142, 0.06) 0%, transparent 50%)
              `
            }}
          />

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Small tag */}
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full mb-6 border"
              style={{
                background: 'rgba(45, 68, 96, 0.3)',
                borderColor: 'rgba(45, 68, 96, 0.5)',
                color: '#ADC9E0'
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-medium">
                {language === 'es' ? 'Hablemos.' : 'Let´s talk.'}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6"
              style={{
                color: '#FFFFFF',
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {language === 'es'
                ? 'Construyamos algo que trabaje por ti.'
                : 'Let\'s build something that works for you.'}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-lg lg:text-xl max-w-3xl mx-auto mb-10"
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: '1.6'
              }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {language === 'es'
                ? 'Cuéntanos dónde estás.\nNosotros diseñamos el sistema.'
                : 'Tell us where you are.\nWe design the system.'}
            </motion.p>

            {/* CTA Button */}
            <motion.button
              onClick={handleContactClick}
              onMouseEnter={handleMouseEnter}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #8A829A 0%, #FFFFFF 50%, #8A829A 100%)',
                color: '#000000',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: `
                  0 4px 16px rgba(173, 201, 224, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: `
                  0 8px 32px rgba(173, 201, 224, 0.3),
                  inset 0 1px 0 rgba(255, 255, 255, 0.4)
                `,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>
                {language === 'es' ? 'Comenzar.' : 'Get Started.'}
              </span>
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.button>

            {/* Small disclaimer text */}
            <motion.p
              className="text-sm mt-6"
              style={{
                color: 'rgba(255, 255, 255, 0.5)',
                lineHeight: '1.5'
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {language === 'es'
                ? 'Sin compromisos.'
                : 'No commitments.'}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
