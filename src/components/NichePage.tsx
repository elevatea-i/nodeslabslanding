'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';
import { niches, type Niche } from '@/data/niches';

const EASE = [0.21, 0.45, 0.32, 0.9] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: EASE, delay },
});

const containerStyle: React.CSSProperties = {
  maxWidth: '72rem',
  margin: '0 auto',
  paddingLeft: 'clamp(24px, 4vw, 48px)',
  paddingRight: 'clamp(24px, 4vw, 48px)',
};

const sectionStyle: React.CSSProperties = { paddingTop: '96px', paddingBottom: '96px' };

const eyebrowStyle: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '0.08em',
  color: '#878EAE',
  textTransform: 'uppercase',
  fontWeight: 500,
  margin: '0 0 24px 0',
};

const h2Style: React.CSSProperties = {
  fontSize: 'clamp(28px, 4vw, 48px)',
  fontWeight: 600,
  color: '#FFFFFF',
  letterSpacing: '-0.02em',
  lineHeight: 1.15,
  maxWidth: '640px',
  margin: 0,
};

const primaryButtonClass =
  'inline-flex items-center min-h-[44px] rounded-full bg-white hover:bg-[#E4EDF4] transition-colors duration-200 no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ADC9E0]/60';

const primaryButtonStyle: React.CSSProperties = {
  color: '#0B0D14',
  padding: '12px 28px',
  fontSize: '15px',
  fontWeight: 500,
};

export default function NichePage({ niche }: { niche: Niche }) {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const otherNiches = Object.values(niches).filter((n) => n.slug !== niche.slug);
  const ctaLabel = isEs ? 'Cuéntanos tu caso →' : 'Tell us about your case →';

  const steps = [
    {
      title: isEs ? 'Llamada de descubrimiento' : 'Discovery call',
      desc: isEs
        ? 'Entendemos tu operación: Cómo agendas hoy, dónde pierdes citas y qué preguntas se repiten.'
        : 'We understand your operation: How you book today, where you lose appointments and which questions repeat.',
    },
    {
      title: isEs ? 'Propuesta' : 'Proposal',
      desc: isEs
        ? 'Te enviamos una propuesta clara y la evaluamos juntos, sin compromiso.'
        : 'We send you a clear proposal and review it together, no commitment.',
    },
    {
      title: isEs ? 'Implementación' : 'Implementation',
      desc: isEs
        ? 'Una vez aprobada, desarrollamos e implementamos tu agente en menos de 15 días.'
        : 'Once approved, we build and deploy your agent in under 15 days.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#0B0D14', minHeight: '100vh' }}>
      <div style={containerStyle}>
        <section style={sectionStyle}>
          <p style={eyebrowStyle}>{niche.eyebrow[language]}</p>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 600,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              maxWidth: '800px',
              margin: 0,
            }}
          >
            {niche.h1[language]}
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.7,
              maxWidth: '640px',
              margin: '24px 0 0 0',
            }}
          >
            {niche.subtitle[language]}
          </p>
          <div className="flex flex-wrap items-center" style={{ gap: '16px', marginTop: '40px' }}>
            <Link href="/contact" className={primaryButtonClass} style={primaryButtonStyle}>
              {ctaLabel}
            </Link>
            <a
              href="#como-funciona"
              className="inline-flex items-center min-h-[44px] hover:underline"
              style={{ color: '#ADC9E0', fontSize: '15px' }}
            >
              {isEs ? 'Ver cómo funciona' : 'See how it works'}
            </a>
          </div>
        </section>

        <section style={{ paddingBottom: '96px' }} aria-labelledby="problema-title">
          <h2 id="problema-title" className="sr-only">
            {isEs ? 'El problema' : 'The problem'}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {niche.problems.map((problem, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                style={{
                  border: '1px solid rgba(45,68,96,0.6)',
                  backgroundColor: 'rgba(26,37,64,0.4)',
                  borderRadius: '16px',
                  padding: '28px',
                }}
              >
                <p style={{ fontSize: '18px', fontWeight: 500, color: '#E4EDF4', lineHeight: 1.5, margin: 0 }}>
                  {problem[language]}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <motion.p style={eyebrowStyle} {...fadeUp(0)}>
            {isEs ? '¿Qué hace el agente?' : 'What the agent does''}
          </motion.p>
          <motion.h2 style={h2Style} {...fadeUp(0.1)}>
            {niche.capabilitiesTitle[language]}
          </motion.h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '40px',
              marginTop: '56px',
            }}
          >
            {niche.capabilities.map((capability, i) => (
              <motion.div key={i} {...fadeUp((i % 3) * 0.1)}>
                <div style={{ width: '32px', height: '2px', backgroundColor: '#ADC9E0', marginBottom: '16px' }} />
                <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, margin: 0 }}>
                  {capability[language]}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="como-funciona" style={{ ...sectionStyle, scrollMarginTop: '96px' }}>
          <motion.p style={eyebrowStyle} {...fadeUp(0)}>
            {isEs ? '¿Cómo trabajamos?' : 'How we work?'}
          </motion.p>
          <motion.h2 style={h2Style} {...fadeUp(0.1)}>
            {isEs ? 'Así empezamos.' : 'How we start.'}
          </motion.h2>
          <ol
            className="list-none pl-0"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '48px',
              marginTop: '56px',
              marginBottom: 0,
            }}
          >
            {steps.map((step, i) => (
              <motion.li key={i} {...fadeUp(i * 0.15)}>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-dm-mono), monospace',
                    fontSize: '13px',
                    color: '#ADC9E0',
                    marginBottom: '16px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#E4EDF4', margin: '0 0 12px 0' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0 }}>
                  {step.desc}
                </p>
              </motion.li>
            ))}
          </ol>
        </section>
      </div>

      <FAQSection items={niche.faq} />

      <div style={containerStyle}>
        <section
          style={{
            ...sectionStyle,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '32px',
          }}
        >
          <motion.h2
            {...fadeUp(0)}
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 600,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            {niche.ctaTitle[language]}
          </motion.h2>
          <motion.div {...fadeUp(0.1)}>
            <Link href="/contact" className={primaryButtonClass} style={primaryButtonStyle}>
              {ctaLabel}
            </Link>
          </motion.div>
          {otherNiches.length > 0 && (
            <p className="flex flex-wrap items-center" style={{ fontSize: '14px', color: '#878EAE', gap: '8px 16px', margin: 0 }}>
              <span>{isEs ? 'También trabajamos con:' : 'We also work with:'}</span>
              {otherNiches.map((n) => (
                <Link
                  key={n.slug}
                  href={n.path}
                  className="inline-flex items-center min-h-[44px] hover:underline"
                  style={{ color: '#ADC9E0' }}
                >
                  {n.navLabel[language]}
                </Link>
              ))}
            </p>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
