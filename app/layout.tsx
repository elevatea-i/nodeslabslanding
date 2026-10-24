import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans, DM_Mono } from 'next/font/google';
import Providers from './providers';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import ScrollSidebar from '@/components/ScrollSidebar';
import ErrorBoundary from '@/components/ErrorBoundary';
import AnalyticsGate from '@/components/AnalyticsGate';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Agentes de IA para WhatsApp y voz en México | NodesLabs',
  description: 'Chatbots y agentes de IA para WhatsApp y llamadas: atienden, califican y agendan por ti. Automatización y sitios web para empresas en México.',
  keywords: [
    'laboratorio de inteligencia artificial',
    'agentes de voz',
    'automatización empresarial',
    'AI agents México',
    'agentes IA LATAM',
    'productos digitales',
    'automatización de procesos',
    'NodesLabs',
    'agentes de atención al cliente',
    'reserva de citas automática',
  ],
  authors: [{ name: 'NodesLabs' }],
  creator: 'NodesLabs',
  publisher: 'NodesLabs',
  metadataBase: new URL('https://nodeslabs.com'),
  openGraph: {
    title: 'Agentes de IA para WhatsApp y voz en México | NodesLabs',
    description: 'Chatbots y agentes de IA para WhatsApp y llamadas: atienden, califican y agendan por ti. Automatización y sitios web para empresas en México.',
    url: 'https://nodeslabs.com',
    siteName: 'NodesLabs',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NodesLabs — Agentes de IA para WhatsApp y voz',
    description: 'Chatbots y agentes de IA para WhatsApp y llamadas: atienden, califican y agendan por ti. Automatización y sitios web para empresas en México.',
    creator: '@nodeslabs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://nodeslabs.com',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" style={{ backgroundColor: '#0B0D14' }}>
      <head>
        <AnalyticsGate />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://nodeslabs.com/#organization',
                  name: 'NodesLabs',
                  url: 'https://nodeslabs.com',
                  description: 'Laboratorio de IA que diseña agentes, automatizaciones y productos digitales para empresas en México, LATAM y USA.',
                  email: 'axel@nodeslabs.com',
                  areaServed: ['México', 'LATAM', 'USA'],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://nodeslabs.com/#website',
                  url: 'https://nodeslabs.com',
                  name: 'NodesLabs',
                  inLanguage: 'es-MX',
                  publisher: { '@id': 'https://nodeslabs.com/#organization' },
                },
                {
                  '@type': 'Service',
                  '@id': 'https://nodeslabs.com/#service-agentes-ia',
                  name: 'Agentes de IA',
                  serviceType: 'Agentes de IA',
                  description: 'Agentes de voz y chat para WhatsApp y llamadas que atienden, califican y agendan por ti.',
                  provider: { '@id': 'https://nodeslabs.com/#organization' },
                  areaServed: ['México', 'LATAM', 'USA'],
                },
                {
                  '@type': 'Service',
                  '@id': 'https://nodeslabs.com/#service-productos-digitales',
                  name: 'Productos Digitales',
                  serviceType: 'Productos Digitales',
                  description: 'Sitios web, plataformas y MVPs a la medida, conectados a tu WhatsApp, CRM y pagos.',
                  provider: { '@id': 'https://nodeslabs.com/#organization' },
                  areaServed: ['México', 'LATAM', 'USA'],
                },
                {
                  '@type': 'Service',
                  '@id': 'https://nodeslabs.com/#service-contenido-visual',
                  name: 'Contenido Visual',
                  serviceType: 'Contenido Visual',
                  description: 'Imagen, video y presentaciones para que tu marca se vea premium.',
                  provider: { '@id': 'https://nodeslabs.com/#organization' },
                  areaServed: ['México', 'LATAM', 'USA'],
                },
              ],
            }).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className={`${plusJakarta.variable} ${dmSans.variable} ${dmMono.variable} safari-fix`} style={{ backgroundColor: '#0B0D14', minHeight: '100vh' }}>
        <Providers>
          <Navbar />
          <Breadcrumbs />
          <div className="min-h-screen text-white relative main-content flex" style={{ backgroundColor: '#0B0D14' }}>
            <main className="flex-1 min-w-0">
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </main>
            <ScrollSidebar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
