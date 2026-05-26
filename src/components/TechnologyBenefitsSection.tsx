import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface BenefitBlockProps {
  title: string;
  description: string;
  index: number;
  emoji: string;
}

const BenefitBlock: React.FC<BenefitBlockProps> = ({ title, description, index, emoji }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <motion.div
      className="group relative overflow-hidden hover:animate-pulse"
      initial={isDesktop ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
      whileInView={isDesktop ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: index * 0.1
      }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{
        scale: 1.05,
        y: -4,
        transition: { duration: 0.2 }
      }}
      style={{
        background: 'rgba(30, 30, 30, 0.95)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        willChange: 'transform, box-shadow',
      }}
    >
      {/* Glowing border effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
           style={{
             background: 'linear-gradient(90deg, #B0C4DE 10%, #FFFFFF 50%, #8A2BE2 90%)',
             padding: '2px',
             borderRadius: '16px'
           }}>
        <div className="w-full h-full rounded-2xl"
             style={{
               background: 'rgba(30, 30, 30, 0.95)',
               borderRadius: '14px'
             }} />
      </div>

      {/* Content container with left alignment for desktop */}
      <div className={`relative z-10 p-8 md:p-10 ${isDesktop ? 'pl-12' : ''}`}>
        {/* Content */}
        <div className="space-y-6">
          <div className={`flex items-center gap-3 ${isDesktop ? 'justify-start' : 'justify-center md:justify-start'}`}>
            {emoji && (
              <motion.span
                className="text-2xl"
                whileHover={{
                  scale: 1.2,
                  rotate: 10,
                  transition: { duration: 0.2 }
                }}
              >
                {emoji}
              </motion.span>
            )}
            <h3 className={`text-lg md:text-xl font-semibold tracking-tight transition-colors duration-200 font-sora ${isDesktop ? 'text-left' : 'text-center md:text-left'}`}
                style={{ color: '#FFFFFF' }}>
              {title}
            </h3>
          </div>
          <p className={`text-lg text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-200 font-inter ${isDesktop ? 'text-left' : 'text-center md:text-left'}`}>
            {description}
          </p>
        </div>
      </div>

      {/* Bottom gradient line */}
      <motion.div 
        className="h-px"
        style={{
          background: 'linear-gradient(90deg, rgba(173, 201, 255, 0.2) 0%, rgba(173, 201, 255, 0.05) 50%, transparent 100%)'
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
      />

      {/* Mobile connecting line */}
      {!isDesktop && index < 3 && (
        <div className="absolute left-1/2 bottom-0 w-px h-12 bg-gradient-to-b from-[#ADC9FF]/30 to-transparent transform translate-y-full" />
      )}
    </motion.div>
  );
};

const TechnologyBenefitsSection: React.FC = () => {
  const { language } = useLanguage();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const benefits = [
    {
      emoji: '',
      title: language === 'es' ? '3x más leads sin aumentar tráfico web.' : '3x more leads without increasing web traffic.',
      description: language === 'es' 
        ? 'Una agencia de marketing automatizó la captura de prospectos desde su sitio y pasó de convertir 5% de visitantes a 15%, triplicando leads y enviandolos directo a su CRM.'
        : 'A marketing agency automated lead capture from their site and went from converting 5% of visitors to 15%, tripling leads without spending more and sending them directly to their CRM.'
    },
    {
      emoji: '',
      title: language === 'es' ? 'Ahorra en equipo de soporte.' : 'Save on support equipment.',
      description: language === 'es'
        ? 'Un prestamista privado automatizó su soporte y respuestas frecuentes, eliminando la necesidad de contratar 2 agentes adicionales mientras ofrece atención inmediata a cualquier hora.'
        : 'A private lender automated its support and frequent responses, eliminating the need to hire 2 additional agents while offering immediate attention around the clock.'
    },
    {
      emoji: '',
      title: language === 'es' ? 'Citas que se confirman sin intervención.' : 'Appointments that are confirmed without intervention.',
      description: language === 'es'
        ? 'Una clínica médica integró nuestro sistema de agendamiento y pasó de 40% ocupación a 95% con citas que se coordinan completamente solas las 24 horas.'
        : 'A medical clinic integrated our scheduling system and went from 40% occupancy to 95% with appointments that are fully self-coordinated 24 hours a day.'
    },
    {
      emoji: '',
      title: language === 'es' ? 'Presencia digital premium.' : 'Premium digital presence.',
      description: language === 'es'
        ? 'Una boutique genera posts y videos profesionales, que reflejan su marca premium, aumentando ventas online 40% sin invertir en fotógrafo ni diseñador.'
        : 'A boutique generates professional posts and videos that reflect its premium brand, increasing online sales by 40% without investing in a photographer or designer.'
    }
  ];

  return (
    <section id="tecnologia" className="relative section-spacing" style={{
      background: '#000'
    }}>
      <div className="relative z-20 top-tier-container h-full flex flex-col justify-center">
        {/* Title Section - Centered for mobile, left-aligned for desktop */}
        <div className={`max-w-4xl mx-auto mb-15 ${isDesktop ? 'text-left ml-0 pl-12' : 'text-center'}`}>
          <motion.h2
            className={`text-2xl md:text-3xl lg:text-4xl font-sora font-medium mb-8 tracking-tight ${isDesktop ? 'text-left' : 'text-center'}`}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{
              lineHeight: '1.3',
              color: '#8A829A'
            }}
          >
            {language === 'es' 
              ? '¿Qué puede hacer esta tecnología por tu negocio?'
              : 'What can this technology do for your business?'}
          </motion.h2>

          <motion.p
            className={`text-lg md:text-xl font-inter ${isDesktop ? 'text-left' : 'text-center'}`}
            style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {language === 'es'
              ? 'Así ayudamos a negocios a crecer sin contratar más personal.'
              : 'This is how we help businesses grow without hiring more staff.'}
          </motion.p>
        </div>
        
        {/* Premium Responsive Grid - 4 columns desktop, 2 tablet, 1 mobile with 20px gaps */}
        <div className={`grid grid-spacing ${isDesktop ? 'grid-cols-4' : 'grid-cols-1 md:grid-cols-2'}`}>
          {benefits.map((benefit, index) => (
            <BenefitBlock
              key={index}
              title={benefit.title}
              description={benefit.description}
              index={index}
              emoji={benefit.emoji}
            />
          ))}
        </div>

        <motion.p
          className={`text-lg font-sora font-light italic mt-30 ${isDesktop ? 'text-left pl-12' : 'text-center'}`}
          style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {language === 'es' ? (
            <>
              No necesitas más manos.<br />
              Solo una solución inteligente que trabaje por ti.
            </>
          ) : (
            <>
              You don't need more hands.<br />
              Just an intelligent solution that works for you.
            </>
          )}
        </motion.p>
      </div>
    </section>
  );
};

export default TechnologyBenefitsSection;