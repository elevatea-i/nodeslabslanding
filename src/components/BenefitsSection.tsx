import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Filter, Calendar, Laptop, Brain } from 'lucide-react';
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
      icon: Filter, // Lead capture
      title: language === 'es' ? 'Lead Capture.' : 'Lead Capture.',
      description: language === 'es'
        ? 'Captura leads calificados con conversaciones inteligentes que pre-califican prospectos automáticamente. Nunca más pierdas un cliente potencial mientras ahorras +10 horas.'
        : 'Capture qualified leads with intelligent conversations that automatically pre-qualify prospects. Never lose a lead again while saving +10 hours.',
      benefits: language === 'es' ? [
        '+40% más leads sin aumentar tráfico.',
        'Leads calificados directo a tu CRM en segundos.',
        'Nunca más "se me escapó un prospecto".',
        'Mejora la conversión sin un equipo grande.'
      ] : [
        '+40% more leads without increasing traffic.',
        'Qualified leads straight to your CRM in seconds.',
        'Never again "I missed a prospect".',
        'Improve conversion without a big team.'
      ],
      background: null,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3", // Top-left, tall
    },
    {
      icon: MessageSquare, // AI for excellent customer service. - MIDDLE CARD
      title: language === 'es' ? 'Atención al cliente.' : 'Customer service.',
      description: language === 'es'
        ? 'Tu asistente IA maneja consultas de clientes al instante, 24/7 sin descanso. Desbloquea máxima satisfacción del cliente y la eficiencia en un tiempo récord.'
        : 'Your AI assistant handles customer inquiries instantly, 24/7 without a break. Unlock maximum customer satisfaction and efficiency in record time.',
      benefits: language === 'es' ? [
        'Responde +200 mensajes por día en segundos.',
        'Ahorra 4 horas diarias respondiendo lo mismo.',
        'Cero clientes esperando respuesta.',
        'Se adapta al tono y estilo de tu marca.'
      ] : [
        'Answer +200 messages per day in seconds.',
        'Save 4 hours a day by answering the same questions.',
        'Zero customers waiting for a response.',
        'Adapts to your brand\'s tone and style.'
      ],
      background: null,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3", // Middle, tall
    },
    {
      icon: Calendar, // Appointment Management
      title: language === 'es' ? 'Gestión de citas.' : 'Appointment Management.',
      description: language === 'es'
        ? 'Citas confirmadas automáticamente. Sistema inteligente que se integra con tus calendarios.'
        : 'Appointments confirmed automatically. Intelligent system that integrates with your calendars.',
      benefits: language === 'es' ? [
        '-80% de citas canceladas de último momento.',
        'Evita citas dobles o errores humanos.',
        'Agenda 24/7, no importa la hora ni el día.',
        'Tus clientes eligen, tú solo te presentas.'
      ] : [
        '-80% of appointments cancelled at the last minute.',
        'Prevents double bookings and human errors.',
        'Schedule 24/7,no matter the time or day.',
        'Your clients choose, you just show up.'
      ],
      background: null,
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2", // Top-right, short
    },
    {
      icon: Brain, // Innovation (bottom-left)
      title: language === 'es' ? 'Contenido premium sin equipo de diseño.' : 'Premium content without design team.',
      description: language === 'es'
        ? 'Imágenes, videos y carruseles que venden. Tu marca se ve premium sin invertir miles.'
        : 'Images, videos and carousels that sell. Your brand looks premium without investing thousands.',
      benefits: language === 'es' ? [
        'Contenido profesional en minutos, no semanas.',
        'Ahorra +$2,000 USD mensuales en diseñador.',
        'Carruseles y videos que generan 3x más engagement.',
        'Tu marca compite visualmente con las grandes corporaciones.'
      ] : [
        'Professional content in minutes, not weeks.',
        'Save +$2,000 USD per month on a designer.',
        'Carousels and videos that generate 3x more engagement.',
        'Your brand competes visually with the big corporations.'
      ],
      background: null,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4", // Bottom-left, short
    },
    {
      icon: Laptop, // Website Creation (bottom-right)
      title: language === 'es' ? 'Páginas web que convierten visitas en ventas.' : 'Websites that convert visits into sales.',
      description: language === 'es'
        ? 'Páginas rápidas, profesionales, atractivas y optimizadas como te la imagines.'
        : 'Fast, professional, attractive and optimized pages as you imagine them.',
      benefits: language === 'es' ? [
        'Diseño moderno y responsivo.',
        'SEO que te posiciona en página 1 de Google.',
        'Tiempo de carga ultra rápido = clientes que no se van.',
        '+60% más conversiones vs sitios tradicionales.'
      ] : [
        'Modern and responsive design.',
        'SEO that ranks you on page 1 of Google.',
        'Ultra-fast loading time = customers who won´t leave.',
        '+60% more conversions vs. traditional sites.'
      ],
      background: null,
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4", // Bottom-right, tall
    },
  ];

  const handleCtaClick = (service: { title: string; benefits: string[] }) => {
    trackServiceModalOpen(service.title);
    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <section id="servicios" className="relative section-spacing" style={{
      background: '#000'
    }}>
      <div className="relative z-20 top-tier-container h-full flex flex-col justify-start">

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <BentoGrid className="lg:grid-rows-3">
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