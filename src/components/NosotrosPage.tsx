"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

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

const services = [
  {
    title: 'AI Agents',
    desc: 'El agente que atiende, califica y da seguimiento con la voz de tu marca. Sin descanso.',
  },
  {
    title: 'Productos Digitales',
    desc: 'La presencia digital que convierte. Sitios y sistemas que trabajan mientras tú creces.',
  },
  {
    title: 'Content & Media',
    desc: 'El contenido que posiciona tu marca. Visual que compite sin el presupuesto de las grandes.',
  },
];

export default function NosotrosPage() {
  const router = useRouter();

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
            Sobre Nosotros
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
            Vimos cómo negocios dejaban ir oportunidades que nunca deberían perder. Por eso construimos NodesLabs.
          </motion.h1>
        </section>

        {/* Section 2 — Qué Creemos */}
        <section style={{ paddingTop: '96px', paddingBottom: '96px' }}>
          <motion.p style={eyebrowStyle} {...fadeUp(0)}>
            ¿Qué creemos?
          </motion.p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '640px' }}>
            {[
              'Leads que llegaban de noche y nadie contestaba, equipos repitiendo las mismas respuestas todos los días, negocios con buen producto que nadie encontraba al buscarlo en Google, o que necesitaban un CRM, MVP o una solución específica a la medida de lo que su operación requería, lo vimos repetirse una y otra vez.',
              'Creemos que para crecer no necesitas más personas, necesitas mejores sistemas. Un agente puede atender, calificar y dar seguimiento con el mismo trato que tú le darías a tus clientes, a cualquier hora.',
              'Por eso somos un laboratorio, cada solución la construimos para lo que tu negocio necesita específicamente. No hay un paquete que le damos a todos, no hay intermediarios. Solo trabajo directo con resultados que se miden.',
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
            ¿Cómo trabajamos?
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
            ¿Trabajamos juntos?
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
            Empecemos a construir →
          </motion.button>
        </section>
      </div>
    </div>
  );
}
