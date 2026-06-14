"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const EASE = [0.21, 0.45, 0.32, 0.9] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: EASE, delay },
});

const eyebrowStyle: React.CSSProperties = {
  fontSize: '11px',
  letterSpacing: '0.08em',
  color: 'rgba(255,255,255,0.35)',
  textTransform: 'uppercase',
  fontWeight: 500,
  marginBottom: '24px',
};

export default function NosotrosPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const services = [
    { title: 'AI Agents', desc: t('nosotros.service1.desc') },
    { title: 'Productos Digitales', desc: t('nosotros.service2.desc') },
    { title: 'Content & Media', desc: t('nosotros.service3.desc') },
  ];

  return (
    <div style={{ backgroundColor: '#0B0D14', minHeight: '100vh' }}>
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          paddingLeft: 'clamp(24px, 4vw, 48px)',
          paddingRight: 'clamp(24px, 4vw, 48px)',
        }}
      >
        {/* Section 1 — Opening */}
        <section style={{ paddingTop: '96px', paddingBottom: '96px' }}>
          <motion.p style={eyebrowStyle} {...fadeUp(0)}>
            {t('nosotros.eyebrow1')}
          </motion.p>
          <motion.h1
            {...fadeUp(0.1)}
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
            {t('nosotros.headline')}
          </motion.h1>
        </section>

        {/* Section 2 — Qué Creemos */}
        <section style={{ paddingTop: '96px', paddingBottom: '96px' }}>
          <motion.p style={eyebrowStyle} {...fadeUp(0)}>
            {t('nosotros.eyebrow2')}
          </motion.p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '640px' }}>
            {[
              t('nosotros.p1'),
              t('nosotros.p2'),
              t('nosotros.p3'),
            ].map((text, i) => (
              <motion.p
                key={i}
                {...fadeUp(i * 0.15)}
                style={{
                  fontSize: '18px',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </section>

        {/* Section 3 — Cómo Trabajamos */}
        <section style={{ paddingTop: '96px', paddingBottom: '96px' }}>
          <motion.p style={eyebrowStyle} {...fadeUp(0)}>
            {t('nosotros.eyebrow3')}
          </motion.p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '48px',
            }}
          >
            {services.map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.15)}>
                <div
                  style={{
                    width: '32px',
                    height: '2px',
                    backgroundColor: '#ADC9E0',
                    marginBottom: '12px',
                  }}
                />
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#E4EDF4',
                    margin: '0 0 12px 0',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 4 — CTA */}
        <section
          style={{
            paddingTop: '96px',
            paddingBottom: '96px',
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
            {t('nosotros.cta.headline')}
          </motion.h2>
          <motion.button
            {...fadeUp(0.1)}
            onClick={() => router.push('/contact')}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#0B0D14',
              borderRadius: '9999px',
              padding: '12px 28px',
              fontSize: '15px',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 200ms ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E4EDF4';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FFFFFF';
            }}
          >
            {t('nosotros.cta.button')}
          </motion.button>
        </section>
      </div>
    </div>
  );
}
