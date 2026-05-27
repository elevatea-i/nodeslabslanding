import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Settings, Rocket } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const ProcessStep: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  color: string;
  glowColor: string;
  isLast: boolean;
  reducedMotion: boolean;
}> = ({ icon, title, description, index, color, glowColor, isLast, reducedMotion }) => {
  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: {
          duration: 0.5,
          delay: index * 0.15,
          ease: [0.21, 0.45, 0.32, 0.9] as const,
        },
        viewport: { once: true },
      };

  const iconMotionProps = reducedMotion
    ? {}
    : { whileHover: { scale: 1.1, y: -4, transition: { duration: 0.2 } } };

  const lineMotionProps = reducedMotion
    ? {}
    : {
        initial: { scaleX: 0, opacity: 0 },
        whileInView: { scaleX: 1, opacity: 1 },
        transition: { duration: 0.5, delay: index * 0.15 + 0.2 },
        viewport: { once: true },
      };

  const mobileLineMotionProps = reducedMotion
    ? {}
    : {
        initial: { scaleY: 0, opacity: 0 },
        whileInView: { scaleY: 1, opacity: 1 },
        transition: { duration: 0.3, delay: index * 0.15 + 0.2 },
        viewport: { once: true },
      };

  return (
    <div className="relative flex-1">
      <motion.div
        className="group flex flex-col items-center text-center space-y-4"
        {...motionProps}
      >
        <motion.div
          className={`relative z-10 w-16 h-16 rounded-xl flex items-center justify-center ${color}`}
          style={{ boxShadow: `0 0 20px ${glowColor}` }}
          {...iconMotionProps}
          aria-hidden="true"
        >
          {icon}
        </motion.div>

        <div
          className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#ADC9FF] to-transparent opacity-20 transition-all duration-300 group-hover:w-20 group-hover:opacity-40 mx-auto"
          aria-hidden="true"
        />

        <div className="max-w-[280px] text-center space-y-2">
          <h3 className="text-lg text-gray-300 leading-tight font-inter font-semibold">
            {title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed font-inter">
            {description}
          </p>
        </div>
      </motion.div>

      {/* Decorative connecting lines — hidden from assistive tech */}
      {!isLast && (
        <span aria-hidden="true">
          {/* Desktop line */}
          <motion.div
            className="hidden md:block absolute top-[32px] w-[calc(100%-3rem)] h-[2px]"
            style={{
              left: 'calc(50% + 2.5rem)',
              background: `linear-gradient(to right,
                ${index === 0 ? 'rgba(173, 201, 255, 0.3)' : 'rgba(153, 50, 204, 0.3)'},
                ${index === 0 ? 'rgba(153, 50, 204, 0.3)' : 'rgba(173, 201, 255, 0.3)'}
              )`,
              transformOrigin: 'left'
            }}
            {...lineMotionProps}
          />

          {/* Mobile line */}
          <motion.div
            className="md:hidden absolute top-[calc(100%+0.5rem)] left-1/2 h-8 w-[2px]"
            style={{
              background: `linear-gradient(to bottom,
                ${index === 0 ? 'rgba(173, 201, 255, 0.3)' : 'rgba(153, 50, 204, 0.3)'},
                ${index === 0 ? 'rgba(153, 50, 204, 0.3)' : 'rgba(173, 201, 255, 0.3)'}
              )`,
              transformOrigin: 'top',
              left: 'calc(50% - 1px)'
            }}
            {...mobileLineMotionProps}
          />
        </span>
      )}
    </div>
  );
};

const ProcessSection: React.FC = () => {
  const { language } = useLanguage();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const headingMotionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: -20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        viewport: { once: true },
      };

  const subheadingMotionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: -10 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.1 },
        viewport: { once: true },
      };

  const steps = [
    {
      icon: <Calendar size={28} style={{ color: '#ADC9FF' }} aria-hidden="true" />,
      title: language === 'es' ? '01 - Diagnóstico.' : '01 - Diagnosis.',
      description: language === 'es'
        ? 'Analizamos tu negocio en 60 minutos y te mostramos exactamente dónde vas a ganar más tiempo y dinero.'
        : 'We analyze your business in 60 minutes and show you exactly where you will save more time and money.',
      color: 'bg-[#ADC9FF]/10',
      glowColor: 'rgba(173, 201, 255, 0.15)'
    },
    {
      icon: <Settings size={28} style={{ color: 'var(--color-primary-purple)' }} aria-hidden="true" />,
      title: language === 'es'
        ? '02 - Desarrollo e Implementación.'
        : '02 - Development & Implementation.',
      description: language === 'es'
        ? 'Construimos en días, no semanas. Diseñado específicamente para tu industria y objetivos.'
        : 'We build in days, not weeks. Designed specifically for your industry and objectives.',
      color: 'bg-purple-500/10',
      glowColor: 'rgba(153, 50, 204, 0.15)'
    },
    {
      icon: <Rocket size={28} style={{ color: '#ADC9FF' }} aria-hidden="true" />,
      title: language === 'es'
        ? '03 - Lanzamiento & Mantenimiento.'
        : '03 - Launch & Maintenance.',
      description: language === 'es'
        ? 'Funciona desde el día 1. Monitoreamos, ajustamos y mejoramos continuamente.'
        : 'It works from day 1. We monitor, adjust and continuously improve.',
      color: 'bg-[#ADC9FF]/10',
      glowColor: 'rgba(173, 201, 255, 0.15)'
    },
  ];

  return (
    <section
      id="proceso"
      className="relative section-spacing"
      aria-label={language === 'es' ? 'Nuestro proceso' : 'Our process'}
      style={{ background: '#000' }}
    >
      <div className="relative z-20 top-tier-container h-full flex flex-col justify-center">
        <div className={`mb-15 ${isDesktop ? 'text-left pl-12' : 'text-center'}`}>
          <motion.h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-sora font-medium mb-8 ${isDesktop ? 'text-left' : 'text-center'}`}
            {...headingMotionProps}
            style={{ color: '#FFFFFF', lineHeight: '1.3' }}
          >
            {language === 'es'
              ? 'Nuestro proceso que multiplica ingresos sin aumentar costos.'
              : 'Our process that multiplies revenues without increasing costs.'}
          </motion.h2>

          <motion.p
            className={`text-lg lg:text-xl font-inter max-w-2xl ${isDesktop ? 'text-left mx-0' : 'text-center mx-auto'}`}
            style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}
            {...subheadingMotionProps}
          >
            {language === 'es'
              ? 'Mientras tu competencia planifica por meses, tú ya estás automatizando y vendiendo.'
              : 'While your competitors are planning for months, you are already automating and selling.'}
          </motion.p>
        </div>

        <ol
          className="flex flex-col md:flex-row justify-center items-center md:items-start element-spacing"
          aria-label={language === 'es' ? 'Pasos del proceso' : 'Process steps'}
        >
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              icon={step.icon}
              description={step.description}
              title={step.title}
              index={index}
              color={step.color}
              glowColor={step.glowColor}
              isLast={index === steps.length - 1}
              reducedMotion={reducedMotion}
            />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessSection;
