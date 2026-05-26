'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface InternalLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'inline' | 'button';
  external?: boolean;
  showIcon?: boolean;
  rel?: string;
  'aria-label'?: string;
}

export const InternalLink: React.FC<InternalLinkProps> = ({
  to,
  children,
  className = '',
  variant = 'inline',
  external = false,
  showIcon = false,
  rel,
  'aria-label': ariaLabel,
  ...props
}) => {
  const baseClasses = 'transition-all duration-200 focus:outline-none';
  
  const variantClasses = {
    primary: 'text-[#ADC9FF] hover:text-[#9BB8FF] font-medium no-underline',
    secondary: 'text-gray-300 hover:text-white no-underline',
    inline: 'text-[#ADC9FF] hover:text-[#9BB8FF] no-underline',
    button: 'bg-gradient-to-r from-[#ADC9FF] to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105'
  };

  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel={rel || "noopener noreferrer"}
        className={combinedClassName}
        aria-label={ariaLabel}
        {...props}
      >
        <span className="flex items-center gap-1">
          {children}
          {showIcon && <ExternalLink size={16} aria-hidden="true" />}
        </span>
      </a>
    );
  }

  return (
    <Link
      href={to}
      className={combinedClassName}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
      {showIcon && <ArrowRight size={16} aria-hidden="true" />}
    </Link>
  );
};

// Related Links Component for cross-promotion
interface RelatedLinksProps {
  currentPage: string;
  className?: string;
}

export const RelatedLinks: React.FC<RelatedLinksProps> = ({ currentPage, className = '' }) => {
  const { t, language } = useLanguage();

  const getRelatedLinks = () => {
    switch (currentPage) {
      case 'contact':
        return [
          {
            to: '/#servicios',
            label: language === 'es' ? 'Ver nuestros servicios' : 'View our services',
            description: language === 'es' ? 'Descubre cómo podemos automatizar tu negocio' : 'Discover how we can automate your business'
          },
          {
            to: '/#proceso',
            label: language === 'es' ? 'Conoce nuestro proceso' : 'Learn about our process',
            description: language === 'es' ? 'Cómo escalamos tu negocio paso a paso' : 'How we scale your business step by step'
          }
        ];
      case 'thank-you':
        return [
          {
            to: '/#servicios',
            label: language === 'es' ? 'Explora nuestros servicios' : 'Explore our services',
            description: language === 'es' ? 'Mientras esperas, conoce más sobre nuestras soluciones' : 'While you wait, learn more about our solutions'
          },
          {
            to: '/',
            label: language === 'es' ? 'Volver al inicio' : 'Back to home',
            description: language === 'es' ? 'Regresa a la página principal' : 'Return to the main page'
          }
        ];
      case 'privacy':
        return [
          {
            to: '/contact',
            label: language === 'es' ? 'Contáctanos' : 'Contact us',
            description: language === 'es' ? 'Tienes preguntas sobre privacidad? Escríbenos' : 'Have privacy questions? Write to us'
          },
          {
            to: '/',
            label: language === 'es' ? 'Inicio' : 'Home',
            description: language === 'es' ? 'Conoce más sobre NodesLabs' : 'Learn more about NodesLabs'
          }
        ];
      default:
        return [];
    }
  };

  const relatedLinks = getRelatedLinks();

  if (relatedLinks.length === 0) return null;

  return (
    <div className={`bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800/50 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">
        {language === 'es' ? 'También te puede interesar' : 'You might also be interested in'}
      </h3>
      <div className="space-y-3">
        {relatedLinks.map((link, index) => (
          <motion.div
            key={link.to}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <InternalLink
              to={link.to}
              variant="primary"
              showIcon
              className="block group"
              aria-label={link.description}
            >
              <div>
                <div className="font-medium group-hover:text-[#9BB8FF]">{link.label}</div>
                <div className="text-sm text-gray-400 mt-1">{link.description}</div>
              </div>
            </InternalLink>
          </motion.div>
        ))}
      </div>
    </div>
  );
};