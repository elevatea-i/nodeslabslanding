'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface Tool {
  name: string;
  logo: string;
  category: string;
}

const AIToolsCarousel: React.FC = () => {
  const { language } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // AI Tools data with placeholder logo URLs (replace with actual logos)
  const tools: Tool[] = [
    { name: 'OpenAI', logo: '/images/logos/openai-logo.webp', category: 'AI Models' },
    { name: 'Claude', logo: '/images/logos/claude-logo.webp', category: 'AI Models' },
    { name: 'Gemini', logo: '/images/logos/gemini-logo.webp', category: 'AI Models' },
    { name: 'Grok', logo: '/images/logos/grok-logo.webp', category: 'AI Models' },
    { name: 'DeepSeek', logo: '/images/logos/deepseek-logo.webp', category: 'AI Models' },
    { name: 'WhatsApp', logo: '/images/logos/whatsapp-logo.webp', category: 'Communication' },
    { name: 'Telegram', logo: '/images/logos/telegram-logo.webp', category: 'Communication' },
    { name: 'Stripe', logo: '/images/logos/stripe-logo.webp', category: 'Payments' },
    { name: 'Google Calendar', logo: '/images/logos/google-calendar-logo.webp', category: 'Productivity' },
    { name: 'Cal.com', logo: '/images/logos/cal-com-logo.webp', category: 'Scheduling' },
    { name: 'Airtable', logo: '/images/logos/airtable-logo.webp', category: 'Database' },
    { name: 'META', logo: '/images/logos/meta-logo.webp', category: 'Social Media' },
    { name: 'Google Mail', logo: '/images/logos/google-mail-logo.webp', category: 'Communication' },
    { name: 'Cursor', logo: '/images/logos/cursor-logo.webp', category: 'Development' },
    { name: 'Make.com', logo: '/images/logos/make-com-logo.webp', category: 'Automation' },
    { name: 'Firebase', logo: '/images/logos/firebase-logo.webp', category: 'Backend' },
    { name: 'Supabase', logo: '/images/logos/supabase-logo.webp', category: 'Backend' },
    { name: 'ElevenLabs', logo: '/images/logos/elevenlabs-logo.webp', category: 'Voice AI' },
    { name: 'VAPI', logo: '/images/logos/vapi-logo.webp', category: 'Voice AI' },
    { name: 'JavaScript', logo: '/images/logos/javascript-logo.webp', category: 'Development' },
    { name: 'Tailwind CSS', logo: '/images/logos/tailwind-css-logo.webp', category: 'Styling' },
    { name: 'N8N', logo: '/images/logos/n8n-logo.webp', category: 'Automation' }
  ];

  // Duplicate tools for seamless infinite scroll
  const duplicatedTools = [...tools, ...tools];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // CSS animation for continuous scroll
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scroll-left {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      
      .carousel-track {
        animation: scroll-left 60s linear infinite;
      }
      
      .carousel-track:hover {
        animation-play-state: paused;
      }
      
      @media (max-width: 768px) {
        .carousel-track {
          animation-duration: 40s;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section id="herramientas" className="relative section-spacing" style={{ background: '#000' }}>
      <div className="relative z-20 top-tier-container">
        {/* Section Title */}
        <motion.div
          className="text-center mb-15"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sora font-medium text-white mb-4" style={{ lineHeight: '1.6' }}>
          </h2>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-sora font-medium mb-4" style={{ lineHeight: '1.6', color: '#8A829A' }}>
            {language === 'es' 
              ? 'Utilizamos el stack tecnológico enterprise más avanzado.'
              : 'We use the most advanced enterprise technology stack.'}
          </h2>
          <p className="text-lg max-w-3xl mx-auto font-inter" style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
            {language === 'es'
              ? 'La combinación exacta para ahorrar más tiempo y escalar más rápido.'
              : 'Just the right combination to save more time and scale faster.'}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Gradient Overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          {/* Carousel Track */}
          <div
            ref={carouselRef}
            className="carousel-track flex items-center gap-6"
            style={{
              width: 'fit-content',
              willChange: 'transform'
            }}
          >
            {duplicatedTools.map((tool, index) => (
              <div
                key={`${tool.name}-${index}`}
                className="group flex flex-col items-center flex-shrink-0"
              >
                {/* Tool Logo Container */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border transition-all duration-300 group-hover:shadow-lg" style={{ borderColor: 'var(--border-subtle)', '--tw-shadow-color': '#2C4C9C' } as React.CSSProperties}>
                  {/* Logo Image */}
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    onError={(e) => {
                      // Fallback for broken images
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/80x80/1a1a1a/2C4C9C?text=${tool.name.charAt(0)}`;
                    }}
                  />
                  
                  {/* Pulse Animation Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{ backgroundColor: 'rgba(44, 76, 156, 0.1)' }} />
                </div>

                {/* Tool Name - Always Visible */}
                <div className="mt-2">
                  <div className="bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-lg border whitespace-nowrap" style={{ borderColor: 'var(--border-subtle)' }}>
                    <span className="text-xs sm:text-sm font-medium text-white font-inter">
                      {tool.name}
                    </span>
                    <div className="text-xs text-center mt-0.5" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {tool.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Text */}
        <motion.p
          className="text-center text-sm font-inter mt-8"
          style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {language === 'es'
            ? 'Y muchas más herramientas que se adaptan a las necesidades específicas de tu negocio.'
            : 'And many more tools that adapt to your business specific needs.'}
        </motion.p>
      </div>
    </section>
  );
};

export default AIToolsCarousel;