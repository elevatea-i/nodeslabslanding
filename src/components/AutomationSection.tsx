import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { BorderBeam } from '@/components/ui/border-beam';
import { useLanguage } from '@/context/LanguageContext';

const serviceIds = [
  'customerSupport',
  'receptionist',
  'leadGeneration',
  'callCenter',
  'rentalService',
  'appointmentBooking',
  'prospectQualification',
  'productRecommendation',
] as const;

type ServiceId = typeof serviceIds[number];

const buttonKeys: Record<ServiceId, string> = {
  customerSupport:       'automation.buttons.customerSupport',
  receptionist:          'automation.buttons.receptionist',
  leadGeneration:        'automation.buttons.leadGeneration',
  callCenter:            'automation.buttons.outboundSales',
  rentalService:         'automation.buttons.rentalService',
  appointmentBooking:    'automation.buttons.appointmentBooking',
  prospectQualification: 'automation.buttons.inboundQualification',
  productRecommendation: 'automation.buttons.productRecommendation',
};

const messageKeys: Record<ServiceId, string> = {
  customerSupport:       'automation.messages.customerSupport',
  receptionist:          'automation.messages.receptionist',
  leadGeneration:        'automation.messages.leadGeneration',
  callCenter:            'automation.messages.outboundSales',
  rentalService:         'automation.messages.rentalService',
  appointmentBooking:    'automation.messages.appointmentBooking',
  prospectQualification: 'automation.messages.inboundQualification',
  productRecommendation: 'automation.messages.productRecommendation',
};

const phraseKeys = [
  'automation.phrase1',
  'automation.phrase2',
  'automation.phrase3',
  'automation.phrase4',
  'automation.phrase5',
];

const AutomationSection: React.FC = () => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [activeService, setActiveService] = useState<ServiceId>('customerSupport');
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phraseKeys.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = useCallback((id: ServiceId) => setActiveService(id), []);

  const phraseVariants = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 14 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
    exit:    { opacity: 0, y: prefersReducedMotion ? 0 : -10, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  return (
    <section id="automatizacion" className="relative w-full bg-black section-spacing">
      <div className="flex flex-col justify-start items-center pt-16">

        {/* Header block above card */}
        <motion.div
          className="w-full top-tier-container mb-8 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: 'var(--mist)', letterSpacing: '0.18em' }}
          >
            AI Agents
          </p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-3 mx-auto"
            style={{ lineHeight: '1.25', letterSpacing: '0.01em' }}
          >
            {t('automation.sectionTitle')}
          </h2>
          <p
            className="text-base sm:text-lg mx-auto"
            style={{ color: 'rgba(255,255,255,0.45)', lineHeight: '1.6' }}
          >
            {t('automation.sectionSubtitle')}
          </p>
        </motion.div>

        {/* Animated headline card */}
        <motion.div
          className="relative group w-full max-w-6xl mx-auto overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          style={{
            background: 'rgba(30, 30, 30, 0.95)',
            backdropFilter: 'blur(15px)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <div className="relative z-10 w-full px-10 pt-10 pb-12 md:px-14 md:pt-12 md:pb-14">
            <h3
              className="flex flex-wrap items-baseline gap-x-3 text-3xl md:text-4xl lg:text-5xl font-semibold"
              style={{ letterSpacing: '-0.02em', lineHeight: '1.3' }}
              aria-live="polite"
            >
              <span className="text-white whitespace-nowrap">{t('automation.heading')}</span>
              <span className="overflow-hidden" style={{ height: '1.3em', display: 'inline-flex', alignItems: 'center', position: 'relative' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentPhraseIndex}
                    variants={phraseVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="whitespace-nowrap"
                    style={{ color: 'var(--glass)', position: 'absolute' }}
                  >
                    {t(phraseKeys[currentPhraseIndex])}
                  </motion.span>
                </AnimatePresence>
                {/* invisible spacer sized to the longest phrase in the active language */}
                <span aria-hidden className="invisible whitespace-nowrap">
                  {t('automation.phrase5')}
                </span>
              </span>
            </h3>
          </div>

          {/* Bottom gradient line */}
          <motion.div
            className="h-px"
            style={{
              background: 'linear-gradient(90deg, rgba(173,201,255,0.2) 0%, rgba(173,201,255,0.05) 50%, transparent 100%)',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
          <BorderBeam size={300} duration={12} delay={0} />
        </motion.div>

        {/* Service buttons */}
        <motion.div
          className="w-full top-tier-container mt-10 md:mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Mobile hint */}
          <p
            className="md:hidden text-center mb-4"
            style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}
          >
            {t('automation.mobileHint')}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mx-auto">
            {serviceIds.map((id, index) => (
              <motion.button
                key={id}
                onClick={() => setActiveService(id)}
                onMouseEnter={() => handleMouseEnter(id)}
                className={`
                  group relative px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-medium transition-all duration-300
                  border text-sm text-center
                  ${activeService === id
                    ? 'border-[#ADC9FF]/60 bg-gray-800/80 text-white'
                    : 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-[#ADC9FF]/40 hover:bg-gray-800/60 hover:text-white'}
                `}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.21, 0.45, 0.32, 0.9] as const }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.04, y: -2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97 }}
              >
                {t(buttonKeys[id])}
                {activeService === id && (
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ background: 'rgba(173,201,255,0.07)', boxShadow: '0 0 20px rgba(173,201,255,0.15)' }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Description */}
          <div className="mt-8 min-h-[64px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={`${activeService}-desc`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center text-base sm:text-lg"
                style={{ color: 'rgba(255,255,255,0.45)', lineHeight: '1.65' }}
              >
                {t(messageKeys[activeService])}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default React.memo(AutomationSection);
