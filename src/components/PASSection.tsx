import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { GlareCard } from '@/components/ui/glare-card';

const PASSection: React.FC = () => {
  const { language, t } = useLanguage();

  const fadeUpAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="pas" className="relative flex items-center section-spacing" style={{
      background: '#0B0D14'
    }}>
      <div className="relative z-20 w-full top-tier-container">
        <div className="flex flex-col items-center justify-center h-full">
          {/* Content - Responsive Layout with Left Alignment for Desktop */}
          <div className="w-full">
            {/* GlareCard Layout - 3 cards with new compelling content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 grid-spacing items-stretch">
              {/* Card 1 - Lost Sale Scenario */}
              <motion.div
                variants={fadeUpAnimation}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <GlareCard className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left p-6 h-full">
                  <div className="text-lg sm:text-xl xl:text-2xl font-medium text-white whitespace-pre-line" style={{ lineHeight: '1.6' }}>
                    {t('pas.card1')}
                  </div>
                </GlareCard>
              </motion.div>

              {/* Card 2 - Competition Growth */}
              <motion.div
                variants={fadeUpAnimation}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <GlareCard className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left p-6 h-full">
                  <div className="text-lg sm:text-xl xl:text-2xl font-medium text-white whitespace-pre-line" style={{ lineHeight: '1.6' }}>
                    {t('pas.card2')}
                  </div>
                </GlareCard>
              </motion.div>

              {/* Card 3 - AI Solution */}
              <motion.div
                variants={fadeUpAnimation}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <GlareCard className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left p-6 h-full">
                  <div className="text-lg sm:text-xl xl:text-2xl font-medium text-white whitespace-pre-line" style={{ lineHeight: '1.6' }}>
                    {t('pas.card3')}
                  </div>
                </GlareCard>
              </motion.div>
            </div>

            <motion.p
              className="text-base text-center font-medium mt-16 tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.02em' }}
            >
              {language === 'es'
                ? "El sistema correcto no trabaja para ti. Trabaja en lugar de ti."
                : "The right system doesn't work for you. It works instead of you."}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PASSection;