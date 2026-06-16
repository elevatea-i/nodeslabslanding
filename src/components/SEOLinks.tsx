'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { smoothScrollTo } from '@/lib/utils';

export const FooterSEOLinks: React.FC = () => {
  const { language } = useLanguage();
  const pathname = usePathname();

  const linkSections = [
    {
      title: language === 'es' ? 'Servicios' : 'Services',
      links: [
        { to: '/#servicios', text: language === 'es' ? 'AI Agents.' : 'AI Agents.' },
        { to: '/#servicios', text: language === 'es' ? 'Productos Digitales.' : 'Digital Products.' },
        { to: '/#servicios', text: language === 'es' ? 'Content & Media.' : 'Content & Media.' },
      ],
    },
    {
      title: language === 'es' ? 'Compañía' : 'Company',
      links: [
        { to: '/nosotros', text: language === 'es' ? 'Nosotros.' : 'About Us.' },
        { to: '/contact', text: language === 'es' ? 'Contacto.' : 'Contact.' },
        { to: '/aviso-privacidad', text: language === 'es' ? 'Aviso de Privacidad.' : 'Privacy Policy.' },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
      {linkSections.map((section, index) => (
        <div key={index}>
          <h4 className="font-semibold mb-4 text-base" style={{ color: '#E4EDF4' }}>
            {section.title}
          </h4>
          <ul className="space-y-2 list-none pl-0">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <Link
                  href={link.to}
                  onClick={link.to.startsWith('/#') && pathname === '/' ? (e) => {
                    e.preventDefault();
                    smoothScrollTo(link.to.slice(2));
                  } : undefined}
                  className="text-sm transition-colors duration-200 text-left hover:text-white/90 p-0 cursor-pointer"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
