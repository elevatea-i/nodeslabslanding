'use client';

import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Bot, Code2, Clapperboard } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { trackServiceModalOpen } from '@/lib/analytics';

const ServiceDetailModal = lazy(() => import('@/components/ServiceDetailModal'));

const BenefitsSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{ title: string; benefits: string[] } | null>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const servicesData = [
    {
      icon: Bot,
      title: language === 'es' ? 'AI Agents.' : 'AI Agents.',
      description: language === 'es'
        ? 'Voz y chat que atienden, califican y convierten. Solos.'
        : 'Voice and chat that attend, qualify and convert. On their own.',
      benefits: language === 'es' ? [
        'Responde antes de que el cliente pierda el interés.',
        'Tu agenda llena sola, sin una llamada de por medio.',
        'Leads calificados esperando a tu equipo, no al revés.',
        'Escala tu operación sin escalar tu nómina.',
        'Cada conversación suena igual de bien.'
      ] : [
        'Respond before the customer loses interest.',
        'Your calendar fills itself, no calls needed.',
        'Qualified leads waiting for your team, not the other way around.',
        'Scale your operation without scaling your payroll.',
        'Every conversation sounds just as good.'
      ],
      background: null,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
    },
    {
      icon: Code2,
      title: language === 'es' ? 'Productos Digitales.' : 'Digital Products.',
      description: language === 'es'
        ? 'Tu presencia digital, construida para convertir desde el día uno.'
        : 'Your digital presence, built to convert from day one.',
      benefits: language === 'es' ? [
        'Carga en segundos. Convierte desde el primer clic.',
        'Construido para escalar contigo desde el día uno.',
        'Tu operación entera en un solo lugar.',
        'Pagos que llegan sin pasos extra.',
        'En Google antes de que tus clientes te busquen.'
      ] : [
        'Loads in seconds. Converts from the first click.',
        'Built to scale with you from day one.',
        'Your entire operation in one place.',
        'Payments that arrive without extra steps.',
        'On Google before your customers start searching.'
      ],
      background: null,
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      icon: Clapperboard,
      title: language === 'es' ? 'Content & Media.' : 'Content & Media.',
      description: language === 'es'
        ? 'Imagen, video y presentaciones. Tu marca premium sin un equipo tan grande.'
        : 'Image, video and presentations. Your premium brand without a big team.',
      benefits: language === 'es' ? [
        'Contenido de marca listo en días, no semanas.',
        'Tu presencia, activa y consistente sin esfuerzo.',
        'Visual que vende sin que diseñes nada.',
        'Presentaciones que cierran negocios.',
        'Una identidad que se reconoce al primer scroll.'
      ] : [
        'Brand content ready in days, not weeks.',
        'Your presence, active and consistent without effort.',
        'Visuals that sell without you designing anything.',
        'Presentations that close deals.',
        'An identity recognized at first scroll.'
      ],
      background: null,
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
    },
  ];

  const handleCtaClick = (service: { title: string; benefits: string[] }) => {
    trackServiceModalOpen(service.title);
    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <section id="servicios" className="relative section-spacing" style={{
      background: '#0B0D14'
    }}>
      <div className="relative z-20 top-tier-container h-full flex flex-col justify-start">

        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            {language === 'es' ? 'Nuestros Servicios' : 'Our Services'}
          </p>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 600,
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: '1.15',
            maxWidth: '480px'
          }}>
            {language === 'es' ? <>Tres capacidades.<br />Un solo laboratorio.</> : <>Three capabilities.<br />One lab.</>}
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <BentoGrid className="lg:grid-rows-1">
            {servicesData.map((service, i) => (
              <BentoCard
                key={i}
                name={service.title}
                className={service.className}
                background={service.background}
                Icon={service.icon}
                description={service.description}
                cta={language === 'es' ? 'Saber más' : 'Learn more'}
                onCtaClick={() => handleCtaClick(service)}
              />
            ))}
          </BentoGrid>
        </motion.div>
      </div>

      {selectedService && (
        <Suspense fallback={null}>
          <ServiceDetailModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title={selectedService.title}
            benefits={selectedService.benefits}
          />
        </Suspense>
      )}
    </section>
  );
};

export default BenefitsSection;
