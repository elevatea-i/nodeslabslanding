'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import { FooterSEOLinks } from '@/components/SEOLinks';
import { useLanguage } from '@/context/LanguageContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();

  return (
    <footer style={{ background: '#0B0D14', borderTop: '1px solid #2D4460' }}>
      <div className="top-tier-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Column 1 — Logo + tagline + email */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>
              NodesLabs
            </h2>

            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {language === 'es'
                ? 'El laboratorio de IA para tu negocio.'
                : 'The AI lab for your business.'}
            </p>

            <a
              href="mailto:axel@nodeslabs.com"
              className="flex items-center gap-2 transition-colors duration-200 group no-underline"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              aria-label="Enviar correo a axel@nodeslabs.com"
            >
              <Mail size={16} className="group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm">axel@nodeslabs.com</span>
            </a>
          </div>

          {/* Columns 2 & 3 — Servicios + Compañía */}
          <div className="md:col-span-2">
            <FooterSEOLinks />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 mt-8"
          style={{ borderTop: '1px solid rgba(45,68,96,0.4)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © {currentYear} NodesLabs.{' '}
            {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
