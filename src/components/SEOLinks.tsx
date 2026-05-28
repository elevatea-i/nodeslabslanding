import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export const FooterSEOLinks: React.FC = () => {
  const { language } = useLanguage();

  const linkSections = [
    {
      title: language === 'es' ? 'Servicios' : 'Services',
      links: [
        { to: '/soluciones', text: language === 'es' ? 'AI Agents.' : 'AI Agents.' },
        { to: '/soluciones', text: language === 'es' ? 'Productos Digitales.' : 'Digital Products.' },
        { to: '/soluciones', text: language === 'es' ? 'Content & Media.' : 'Content & Media.' }
      ]
    },
    {
      title: language === 'es' ? 'Compañía.' : 'Company.',
      links: [
        { to: '/nosotros', text: language === 'es' ? 'Nosotros.' : 'About Us.' },
        { to: '/contacto', text: language === 'es' ? 'Contacto.' : 'Contact.' },
        { to: '/aviso-privacidad', text: language === 'es' ? 'Aviso de Privacidad.' : 'Privacy Policy.' }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
      {linkSections.map((section, index) => (
        <div key={index}>
          <h4
            className="font-semibold mb-4 text-base"
            style={{ color: '#E4EDF4' }}
          >
            {section.title}
          </h4>
          <ul className="space-y-2 list-none pl-0">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <Link
                  href={link.to}
                  className="text-sm transition-colors duration-200 no-underline hover:text-white/90"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
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
