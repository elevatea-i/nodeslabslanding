'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { throttle } from '@/lib/performance';
import { trackCTAClick, trackLanguageSwitch } from '@/lib/analytics';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const shouldShowNavbar = pathname === '/';

  const toggleLanguage = useCallback(() => {
    const newLang = language === 'es' ? 'en' : 'es';
    trackLanguageSwitch(newLang);
    setLanguage(newLang);
  }, [language, setLanguage]);

  const handleContactClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    trackCTAClick('navbar');
    router.push('/contact');
    setIsMenuOpen(false);
  }, [router]);

  const handleContactHover = useCallback(() => {
    import('@/components/ContactForm').catch(() => {});
  }, []);

  const handleMenuToggle = useRef(
    throttle(() => setIsMenuOpen(prev => !prev), 100)
  ).current;

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    // Return focus to the toggle button so keyboard users don't lose their place
    menuButtonRef.current?.focus();
  }, []);

  // Close on Escape and restore focus
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const motionDuration = prefersReducedMotion ? 0 : 0.2;

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: motionDuration, ease: [0.21, 0.45, 0.32, 0.9] as const }
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: motionDuration,
        ease: [0.21, 0.45, 0.32, 0.9] as const,
        staggerChildren: prefersReducedMotion ? 0 : 0.05,
        delayChildren: prefersReducedMotion ? 0 : 0.05
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: motionDuration, ease: [0.21, 0.45, 0.32, 0.9] as const }
    }
  };

  const navItems = [
    { href: "/Inicio/home", text: language === 'es' ? 'Inicio' : 'Home' },
    { href: "/servicios", text: language === 'es' ? 'Soluciones' : 'Solutions' },
    { href: "/nosotros", text: language === 'es' ? 'Nosotros' : 'About' },
    { href: "/contacto", text: language === 'es' ? 'Contacto' : 'Contact' }
  ];

  const langLabel = language === 'es'
    ? 'Cambiar idioma a inglés'
    : 'Switch language to Spanish';

  return (
    <>
      <AnimatePresence>
        {shouldShowNavbar && (
          <motion.nav
            className="fixed-navbar"
            aria-label="Navegación principal"
            initial={{ opacity: 1, y: prefersReducedMotion ? 0 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }}
            style={{
              left: '50%',
              x: '-50%',
              width: '90%',
              marginTop: '0px',
              willChange: 'transform, backdrop-filter',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              scale: 1,
              transformOrigin: 'top center'
            }}
          >
            <motion.div
              className="relative w-full transition-all duration-500 ease-out overflow-hidden"
              style={{
                borderRadius: '20px',
                background: `rgba(0, 0, 0, 0.99)`,
                backdropFilter: 'blur(40px) saturate(180%) brightness(115%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(115%)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: `
                  0 20px 80px rgba(0, 0, 0, 0.8),
                  0 0 0 1px rgba(255, 255, 255, 0.35),
                  inset 0 6px 0 rgba(255, 255, 255, 0.5),
                  inset 0 -3px 0 rgba(255, 255, 255, 0.35),
                  0 0 100px rgba(126, 182, 255, 0.4),
                  0 0 200px rgba(156, 111, 255, 0.3),
                  0 0 300px rgba(0, 0, 0, 0.7),
                  inset 0 0 50px rgba(255, 255, 255, 0.1)
                `
              }}
            >
              <div className="relative max-w-6xl mx-auto px-6 lg:px-8 z-10">
                <motion.div
                  className="flex justify-between items-center"
                  style={{ paddingTop: '12px', paddingBottom: '12px' }}
                >
                  {/* Logo */}
                  <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center gap-1">
                      <motion.span
                        className="font-bold transition-all duration-500"
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          letterSpacing: '-0.02em',
                          color: 'rgba(255, 255, 255, 0.9)',
                          textShadow: '0 0 40px rgba(255, 255, 255, 0.4), 0 5px 10px rgba(0, 0, 0, 1)',
                        }}
                        whileHover={prefersReducedMotion ? {} : {
                          textShadow: '0 0 50px rgba(255, 255, 255, 0.6), 0 5px 10px rgba(0, 0, 0, 1)',
                          transition: { duration: 0.3 }
                        }}
                      >
                        NodesLabs
                      </motion.span>
                    </div>
                  </div>

                  {/* Desktop menu */}
                  <div className="hidden md:flex items-center space-x-6" role="list">
                    {navItems.map((item, index) => {
                      const isCurrent = pathname === item.href;
                      return (
                        <motion.a
                          key={index}
                          href={item.href}
                          role="listitem"
                          aria-current={isCurrent ? 'page' : undefined}
                          className="group relative px-5 py-3 rounded-xl font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                          style={{
                            color: 'rgba(255, 255, 255, 1)',
                            fontSize: '0.75rem',
                            fontWeight: isCurrent ? 700 : 500,
                            textDecoration: 'none'
                          }}
                          whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="relative z-10">{item.text}</span>
                        </motion.a>
                      );
                    })}

                    <motion.button
                      onClick={handleContactClick}
                      onMouseEnter={handleContactHover}
                      className="group relative px-5 py-3 rounded-xl font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                      style={{
                        color: 'rgba(255, 255, 255, 1)',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        textDecoration: 'none'
                      }}
                      whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">{language === 'es' ? 'Empecemos →' : "Let's start →"}</span>
                    </motion.button>

                    <motion.button
                      onClick={toggleLanguage}
                      className="group relative p-3 rounded-xl transition-all duration-300 flex items-center gap-2 liquid-glass-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                      style={{ color: 'rgba(255, 255, 255, 1)', textDecoration: 'none' }}
                      aria-label={langLabel}
                      whileHover={prefersReducedMotion ? {} : { y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Globe size={16} className="relative z-10" aria-hidden="true" />
                      <span className="font-medium relative z-10" style={{ fontSize: '0.675rem' }}>
                        {language === 'es' ? 'EN' : 'ES'}
                      </span>
                    </motion.button>
                  </div>

                  {/* Mobile menu button */}
                  <div className="md:hidden flex items-center">
                    <motion.button
                      ref={menuButtonRef}
                      onClick={handleMenuToggle}
                      className="relative p-3 rounded-xl transition-all duration-300 liquid-glass-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                      style={{ color: 'rgba(255, 255, 255, 1)', textDecoration: 'none' }}
                      aria-label={isMenuOpen
                        ? (language === 'es' ? 'Cerrar menú' : 'Close menu')
                        : (language === 'es' ? 'Abrir menú' : 'Open menu')}
                      aria-expanded={isMenuOpen}
                      aria-controls="mobile-menu"
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative z-10" aria-hidden="true">
                        {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Mobile menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  id="mobile-menu"
                  className="md:hidden relative w-full overflow-hidden mt-3"
                  variants={mobileMenuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  style={{
                    borderRadius: '20px',
                    background: `rgba(0, 0, 0, 0.99)`,
                    backdropFilter: 'blur(150px) saturate(450%) brightness(220%) contrast(180%) hue-rotate(5deg)',
                    WebkitBackdropFilter: 'blur(150px) saturate(450%) brightness(220%) contrast(180%) hue-rotate(5deg)',
                    border: '1px solid rgba(255, 255, 255, 0.45)',
                    boxShadow: `
                      0 16px 64px rgba(0, 0, 0, 0.7),
                      0 0 0 1px rgba(255, 255, 255, 0.3),
                      inset 0 4px 0 rgba(255, 255, 255, 0.4),
                      0 0 80px rgba(126, 182, 255, 0.3),
                      inset 0 0 40px rgba(255, 255, 255, 0.1)
                    `
                  }}
                >
                  <nav
                    aria-label={language === 'es' ? 'Menú móvil' : 'Mobile menu'}
                    className="relative px-5 pt-5 pb-5 space-y-3"
                  >
                    {navItems.map((item, index) => {
                      const isCurrent = pathname === item.href;
                      return (
                        <motion.a
                          key={index}
                          href={item.href}
                          aria-current={isCurrent ? 'page' : undefined}
                          className="group relative block px-5 py-4 rounded-xl text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                          style={{
                            color: 'rgba(255, 255, 255, 1)',
                            fontWeight: isCurrent ? 700 : 500,
                            textDecoration: 'none'
                          }}
                          onClick={() => setIsMenuOpen(false)}
                          variants={menuItemVariants}
                        >
                          <span className="relative z-10">{item.text}</span>
                        </motion.a>
                      );
                    })}

                    <motion.button
                      onClick={handleContactClick}
                      onMouseEnter={handleContactHover}
                      className="group relative block px-5 py-4 rounded-xl text-sm font-medium w-full text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                      style={{ color: 'rgba(255, 255, 255, 1)', textDecoration: 'none' }}
                      variants={menuItemVariants}
                    >
                      <span className="relative z-10">{language === 'es' ? 'Empecemos →' : "Let's start →"}</span>
                    </motion.button>

                    <motion.button
                      onClick={toggleLanguage}
                      className="group relative flex items-center px-5 py-4 rounded-xl text-sm font-medium w-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                      style={{ color: 'rgba(255, 255, 255, 1)', textDecoration: 'none' }}
                      aria-label={langLabel}
                      variants={menuItemVariants}
                    >
                      <Globe size={18} className="mr-3 relative z-10" aria-hidden="true" />
                      <span className="relative z-10">{t('nav.switchLang')}</span>
                    </motion.button>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(Navbar);
