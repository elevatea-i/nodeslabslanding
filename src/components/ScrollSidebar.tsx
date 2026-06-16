'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { usePathname } from 'next/navigation';
import { smoothScrollTo } from '@/lib/utils';

interface Section {
  id: string;
  labelEs: string;
  labelEn: string;
}

const SECTIONS: Section[] = [
  { id: 'inicio',         labelEs: 'Inicio',         labelEn: 'Home' },
  { id: 'automatizacion', labelEs: 'Automatización', labelEn: 'Automation' },
  { id: 'pas',            labelEs: 'Estrategia',     labelEn: 'Strategy' },
  { id: 'servicios',      labelEs: 'Servicios',      labelEn: 'Services' },
  { id: 'metricas',       labelEs: 'Resultados',     labelEn: 'Results' },
  { id: 'herramientas',   labelEs: 'Herramientas',   labelEn: 'Tools' },
  { id: 'contacto',       labelEs: 'Contacto',       labelEn: 'Contact' },
];

const ScrollSidebar: React.FC = () => {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>('inicio');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRatios = useRef<Map<string, number>>(new Map());

  const isHomePage = pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionRatios.current.set(entry.target.id, entry.intersectionRatio);
        });

        let maxRatio = 0;
        let mostVisible = activeId;
        sectionRatios.current.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisible = id;
          }
        });
        setActiveId(mostVisible);
      },
      {
        root: null,
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
        rootMargin: '-5% 0px -5% 0px',
      }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  const scrollToSection = (id: string) => {
    smoothScrollTo(id);
  };

  if (!isHomePage) return null;

  return (
    <div className="hidden xl:block w-0 flex-shrink-0 relative z-50">
      <div
        className="sticky top-0 h-screen"
        style={{ width: 0, overflow: 'visible' }}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ right: '-48px' }}
        >
          <motion.div
            className="flex flex-col items-center gap-[10px] py-4 px-[10px] rounded-2xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.6 }}
            style={{
              background: 'rgba(0, 0, 0, 0.55)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              boxShadow:
                '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}
          >
            {SECTIONS.map(({ id, labelEs, labelEn }) => {
              const isActive = activeId === id;
              const isHovered = hoveredId === id;
              const label = language === 'es' ? labelEs : labelEn;

              return (
                <div
                  key={id}
                  className="relative flex items-center justify-center cursor-pointer"
                  style={{ width: '8px' }}
                  onMouseEnter={() => setHoveredId(id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => scrollToSection(id)}
                >
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        key="label"
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute pointer-events-none select-none"
                        style={{ right: '18px' }}
                      >
                        <span
                          className="whitespace-nowrap text-[11px] font-medium block"
                          style={{
                            color: isActive
                              ? 'rgba(255,255,255,0.95)'
                              : 'rgba(255,255,255,0.55)',
                            fontFamily: '"Plus Jakarta Sans", sans-serif',
                            letterSpacing: '0.03em',
                            textShadow: '0 1px 6px rgba(0,0,0,0.9)',
                          }}
                        >
                          {label}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{
                      height: isActive ? 22 : isHovered ? 10 : 7,
                      width: isActive ? 3 : isHovered ? 4 : 3,
                      borderRadius: isActive ? 4 : 999,
                      backgroundColor: isActive
                        ? 'rgba(255,255,255,0.95)'
                        : isHovered
                        ? 'rgba(255,255,255,0.5)'
                        : 'rgba(255,255,255,0.22)',
                      boxShadow: isActive
                        ? '0 0 8px rgba(255,255,255,0.5), 0 0 16px rgba(255,255,255,0.15)'
                        : 'none',
                    }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ScrollSidebar;
