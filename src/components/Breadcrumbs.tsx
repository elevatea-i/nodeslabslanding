'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { niches } from '@/data/niches';

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

    const niche = Object.values(niches).find((n) => n.path === pathname);
    if (niche) breadcrumbs.push({ label: niche.navLabel[language], path: niche.path, isActive: true });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  const hiddenRoutes = ['/', '/contact', '/contacto', '/thank-you', '/aviso-privacidad'];
  if (hiddenRoutes.includes(pathname)) return null;

  return (
    <nav
      aria-label="Breadcrumb navigation"
      style={{ backgroundColor: '#0B0D14', borderBottom: '1px solid rgba(45,68,96,0.35)' }}
    >
      <div className="mx-auto max-w-6xl px-6 py-3 sm:px-8">
        <ol className="flex min-h-[44px] items-center gap-2 text-sm">
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
                  className="flex items-center font-medium"
                  aria-current="page"
                  style={{ color: '#ADC9E0', textDecoration: 'none' }}
                >
                  {index === 0 && <Home size={15} strokeWidth={1.8} className="mr-2" aria-hidden="true" />}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="flex min-h-[44px] items-center rounded-full border px-4 no-underline transition-colors duration-200 hover:bg-[#1A2540] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ADC9E0]/60"
                  aria-label={`Navigate to ${item.label}`}
                  style={{
                    color: '#878EAE',
                    borderColor: 'rgba(135,142,174,0.28)',
                    textDecoration: 'none',
                  }}
                >
                  {index === 0 && <Home size={15} strokeWidth={1.8} className="mr-2" aria-hidden="true" />}
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