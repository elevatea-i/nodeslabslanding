'use client';

import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { throttle } from '@/lib/performance';
import { trackCTAClick, trackLanguageSwitch } from '@/lib/analytics';

const WhyChooseUsModal = lazy(() => import('@/components/WhyChooseUsModal'));

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  // Only show navbar on the main page (home route) AND when modal is not open
  const shouldShowNavbar = pathname === '/' && !isModalOpen;

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
    // Prefetch contact form on hover for instant navigation
    import('@/components/ContactForm').catch(() => {});
  }, []);

  const handleMenuToggle = useRef(
    throttle(() => setIsMenuOpen(prev => !prev), 100)
  ).current;

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsModalOpen(false);
      }
    };

    if (isMenuOpen || isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMenuOpen, isModalOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setIsMenuOpen(false);
    }
  }, [isModalOpen]);

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: [0.21, 0.45, 0.32, 0.9] as const
      }
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.2,
        ease: [0.21, 0.45, 0.32, 0.9] as const,
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  const menuItemVariants = {
    hidden: { 
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: [0.21, 0.45, 0.32, 0.9] as const
      }
    }
  };

  return (
    <>
      {/* PREMIUM FLOATING LIQUID GLASS NAVBAR CONTAINER - ONLY SHOW WHEN SHOULD BE VISIBLE */}
      <AnimatePresence>
        {shouldShowNavbar && (
          <motion.nav 
            className="fixed-navbar"
            initial={{ opacity: 1, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              // FLOATING CENTERED POSITIONING - ALWAYS ACTIVE
              left: '50%',
              x: '-50%',
              width: '90%',
              marginTop: '16px',
              // Performance optimizations
              willChange: 'transform, backdrop-filter',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              // Apply fixed scale transformation
              scale: 1,
              transformOrigin: 'top center'
            }}
          >
            {/* PREMIUM FLOATING ROUNDED RECTANGLE WITH ULTRA ENHANCED LIQUID GLASS EFFECT */}
            <motion.div 
              className="relative w-full transition-all duration-500 ease-out overflow-hidden"
              style={{
                borderRadius: '20px',
                // ULTRA ENHANCED LIQUID GLASS BACKGROUND WITH MAXIMUM OPACITY TO COMPLETELY HIDE TEXT BEHIND
                background: `rgba(0, 0, 0, 0.99)`,
                // ULTRA ENHANCED LIQUID GLASS EFFECT WITH EXTREME BLUR - MAXIMUM SETTINGS FOR COMPLETE BLUR
                backdropFilter: 'blur(40px) saturate(180%) brightness(115%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(115%)',
                // ENHANCED BORDER WITH STRONGER GLASS EFFECT - ALWAYS ACTIVE
                border: '1px solid rgba(255, 255, 255, 0.5)',
                // SOPHISTICATED MULTI-LAYER SHADOW SYSTEM WITH ENHANCED DEPTH - ALWAYS ACTIVE
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
              {/* Content with fixed padding */}
              <div className="relative max-w-6xl mx-auto px-6 lg:px-8 z-10">
                <motion.div 
                  className="flex justify-between items-center"
                  style={{
                    paddingTop: '12px',
                    paddingBottom: '12px'
                  }}
                >
                  {/* LOGO WITH HERO SECTION SUBTITLE STYLING - EXACT MATCH */}
                  <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center gap-1">
                      <motion.span 
                        className="font-bold font-sora transition-all duration-500"
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 600,
                          letterSpacing: '-0.02em',
                          // ULTRA ENHANCED TEXT SHADOW FOR MAXIMUM VISIBILITY ON ULTRA BLURRED BACKGROUND
                          color: 'rgba(255, 255, 255, 0.9)',
                          textShadow: '0 0 40px rgba(255, 255, 255, 0.4), 0 5px 10px rgba(0, 0, 0, 1)',
                        }}
                        whileHover={{
                          textShadow: '0 0 50px rgba(255, 255, 255, 0.6), 0 5px 10px rgba(0, 0, 0, 1)',
                          transition: { duration: 0.3 }
                        }}
                      >
                        NodesLabs
                      </motion.span>
                    </div>
                  </div>
                  
                  {/* PREMIUM Desktop menu with ENHANCED LIQUID GLASS EFFECTS */}
                  <div className="hidden md:flex items-center space-x-6">
                    {[
                      { href: "/Inicio/home", text: "Inicio" },
                      { href: "/servicios", text: "Soluciones" },
                      { href: "/nosotros", text: "Nosotros" },
                      { href: "/contacto", text: "Contacto" }
                    ].map((item, index) => (
                      <motion.a
                        key={index}
                        href={item.href}
                        className="group relative px-5 py-3 rounded-xl font-medium transition-all duration-300 font-inter"
                        style={{
                          color: 'rgba(255, 255, 255, 1)',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          textDecoration: 'none'
                        }}
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">{item.text}</span>
                      </motion.a>
                    ))}

                    {/* CONTACT BUTTON - ENHANCED LIQUID GLASS */}
                    <motion.button
                      onClick={handleContactClick}
                      onMouseEnter={handleContactHover}
                      className="group relative px-5 py-3 rounded-xl font-medium transition-all duration-300 font-inter"
                      style={{
                        color: 'rgba(255, 255, 255, 1)',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        textDecoration: 'none'
                      }}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">Empecemos →</span>
                    </motion.button>

                    {/* LANGUAGE TOGGLE - PREMIUM LIQUID GLASS */}
                    <motion.button
                      onClick={toggleLanguage}
                      className="group relative p-3 rounded-xl transition-all duration-300 flex items-center gap-2 font-inter liquid-glass-primary"
                      style={{
                        color: 'rgba(255, 255, 255, 1)',
                        textDecoration: 'none'
                      }}
                      aria-label="Toggle language"
                      whileHover={{
                        y: -2,
                        scale: 1.05
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Globe size={16} className="relative z-10" />
                      <motion.span
                        className="font-medium relative z-10"
                        style={{
                          fontSize: '0.675rem'
                        }}
                      >
                        {language === 'es' ? 'EN' : 'ES'}
                      </motion.span>
                    </motion.button>
                  </div>
                  
                  {/* PREMIUM Mobile menu button */}
                  <div className="md:hidden flex items-center">
                    <motion.button
                      onClick={handleMenuToggle}
                      className="relative p-3 rounded-xl transition-all duration-300 liquid-glass-secondary"
                      style={{
                        color: 'rgba(255, 255, 255, 1)',
                        textDecoration: 'none'
                      }}
                      aria-label="Toggle menu"
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative z-10">
                        {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* PREMIUM Mobile menu with ULTRA ENHANCED LIQUID GLASS effect */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  className="md:hidden relative w-full overflow-hidden mt-3"
                  variants={mobileMenuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  style={{
                    borderRadius: '20px',
                    // ULTRA ENHANCED MOBILE MENU BACKGROUND WITH MAXIMUM OPACITY TO COMPLETELY HIDE TEXT BEHIND
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
                  <div className="relative px-5 pt-5 pb-5 space-y-3">
                    {[
                      { href: "/Inicio/home", text: "Inicio" },
                      { href: "/servicios", text: "Soluciones" },
                      { href: "/nosotros", text: "Nosotros" },
                      { href: "/contacto", text: "Contacto" }
                    ].map((item, index) => (
                      <motion.a
                        key={index}
                        href={item.href}
                        className="group relative block px-5 py-4 rounded-xl text-sm font-medium font-inter transition-all duration-300"
                        style={{
                          color: 'rgba(255, 255, 255, 1)',
                          textDecoration: 'none'
                        }}
                        onClick={() => setIsMenuOpen(false)}
                        variants={menuItemVariants}
                      >
                        <span className="relative z-10">{item.text}</span>
                      </motion.a>
                    ))}

                    <motion.button
                      onClick={handleContactClick}
                      onMouseEnter={handleContactHover}
                      className="group relative block px-5 py-4 rounded-xl text-sm font-medium w-full text-left font-inter transition-all duration-300"
                      style={{
                        color: 'rgba(255, 255, 255, 1)',
                        textDecoration: 'none'
                      }}
                      variants={menuItemVariants}
                    >
                      <span className="relative z-10">Empecemos →</span>
                    </motion.button>

                    <motion.button
                      onClick={toggleLanguage}
                      className="group relative flex items-center px-5 py-4 rounded-xl text-sm font-medium w-full font-inter transition-all duration-300"
                      style={{
                        color: 'rgba(255, 255, 255, 1)',
                        textDecoration: 'none'
                      }}
                      variants={menuItemVariants}
                    >
                      <Globe size={18} className="mr-3 relative z-10" />
                      <span className="relative z-10">{t('nav.switchLang')}</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>

      <Suspense fallback={null}>
        <WhyChooseUsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Suspense>
    </>
  );
};

export default React.memo(Navbar);