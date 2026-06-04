'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const { t, language } = useLanguage();

  // Define breadcrumb mappings for all routes
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: t('nav.home'),
        path: '/',
        isActive: pathname === '/'
      }
    ];

    // Route-specific breadcrumbs
    if (pathname === '/contact') {
      breadcrumbs.push({
        label: t('nav.contact'),
        path: '/contact',
        isActive: true
      });
    } else if (pathname === '/thank-you') {
      breadcrumbs.push(
        {
          label: t('nav.contact'),
          path: '/contact',
          isActive: false
        },
        {
          label: t('thanks.title'),
          path: '/thank-you',
          isActive: true
        }
      );
    } else if (pathname === '/aviso-privacidad') {
      breadcrumbs.push({
        label: language === 'es' ? 'Aviso de Privacidad' : 'Privacy Notice',
        path: '/aviso-privacidad',
        isActive: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  const hiddenRoutes = ['/', '/contact', '/contacto', '/thank-you', '/aviso-privacidad'];
  if (hiddenRoutes.includes(pathname)) return null;

  return (
    <nav 
      aria-label="Breadcrumb navigation"
      className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight 
                  size={16} 
                  className="text-gray-500 mx-2" 
                  aria-hidden="true"
                />
              )}
              
              {item.isActive ? (
                <span 
                  className="text-[#ADC9FF] font-medium"
                  aria-current="page"
                >
                  {index === 0 && <Home size={16} className="inline mr-1" aria-hidden="true" />}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {index === 0 && <Home size={16} className="inline mr-1" aria-hidden="true" />}
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;