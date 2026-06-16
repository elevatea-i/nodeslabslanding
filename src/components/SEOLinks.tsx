'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { smoothScrollTo } from '@/lib/utils';

export const FooterSEOLinks: React.FC = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const handleNav = (to: string) => {
    if (to.startsWith('/#')) {
      const id = to.slice(2);
      if (pathname === '/') {
        smoothScrollTo(id);
      } else {
        router.push(to);
      }
    } else {
      router.push(to);
    }
  };

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
                <button
                  onClick={() => handleNav(link.to)}
                  className="text-sm transition-colors duration-200 text-left hover:text-white/90 bg-transparent border-0 p-0 cursor-pointer"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  {link.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
