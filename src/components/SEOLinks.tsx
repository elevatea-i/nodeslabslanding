import React from 'react';
import { InternalLink } from '@/components/InternalLinks';
import { useLanguage } from '@/context/LanguageContext';

// Footer links for SEO and navigation
export const FooterSEOLinks: React.FC = () => {
  const { language } = useLanguage();

  const linkSections = [
    {
      title: language === 'es' ? 'Servicios' : 'Services',
      links: [
        {
          to: '/contact',
          text: language === 'es' ? 'Agentes IA.' : 'AI Agents.'
        },
        {
          to: '/contact',
          text: language === 'es' ? 'Creación de Contenido.' : 'Content Creation.'
        },
        {
          to: '/contact',
          text: language === 'es' ? 'Sitios Web | MVPs' : 'Websites | MVPs'
        }
      ]
    },
    {
      title: language === 'es' ? 'Empresa.' : 'Company.',
      links: [
        {
          to: '#proceso',
          text: language === 'es' ? 'Nuestro Proceso.' : 'Our Process.'
        },
        {
          to: '#contacto',
          text: language === 'es' ? 'Contacto.' : 'Contact.'
        }
      ]
    },
    {
      title: language === 'es' ? 'Recursos.' : 'Resources.',
      links: [
        {
          to: '/#servicios',
          text: language === 'es' ? 'Automatización.' : 'Automation.'
        },
        {
          to: '/#proceso',
          text: language === 'es' ? 'Diagnóstico' : 'Diagnosis'
        }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
      {linkSections.map((section, index) => (
        <div key={index}>
          <h4 className="text-white font-semibold mb-4 text-base font-sora">
            {section.title}
          </h4>
          <ul className="space-y-2 list-none pl-0">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <InternalLink
                  to={link.to}
                  external={(link as any).external}
                  variant="secondary"
                  className="text-gray-400 hover:text-white transition-colors duration-200 font-inter text-sm"
                >
                  {link.text}
                </InternalLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};