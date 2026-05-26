import type { Metadata } from 'next';
import Script from 'next/script';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Providers from './providers';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import ScrollSidebar from '@/components/ScrollSidebar';
import ErrorBoundary from '@/components/ErrorBoundary';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NodesLabs: Automatización IA, Chatbots, Contenido y Web en México',
  description:
    'NodesLabs: Agentes IA y chatbots para tu negocio en México. Automatiza atención, captura leads, gestiona citas, crea contenido y sitios web.',
  keywords:
    'automatización, agentes IA, chatbots, lead capture, gestión de citas, atención al cliente 24/7, inteligencia artificial, NodesLabs, automatización de procesos',
  authors: [{ name: 'NodesLabs' }],
  metadataBase: new URL('https://nodeslabs.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NodesLabs.com - Automatiza tu Negocio con IA | Agentes IA, Lead Capture y Gestión de Citas',
    description:
      'Automatiza tu atención al cliente, captura leads y gestiona citas con agentes de IA 24/7. NodesLabs transforma tu negocio con tecnología de automatización inteligente.',
    type: 'website',
    url: 'https://nodeslabs.com',
    siteName: 'NodesLabs',
    locale: 'es_MX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NodesLabs.com - Automatiza tu Negocio con IA',
    description:
      'Automatiza tu atención al cliente, captura leads y gestiona citas con agentes de IA 24/7.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YWTMCCQ54H"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YWTMCCQ54H');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'NodesLabs',
              url: 'https://nodeslabs.com',
              sameAs: [
                'https://www.facebook.com/share/12HsCX6rKCK/?mibextid=wwXIfr',
                'https://www.instagram.com/nodeslabs?igsh=Ym8yMWxvcHc2dzlh&utm_source=qr',
                'https://www.linkedin.com/in/nodeslabs-ab6266256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
              ],
              description: 'Automatización de procesos empresariales con inteligencia artificial',
              services: [
                'Agentes de IA',
                'Lead Capture',
                'Gestión de Citas',
                'Atención al Cliente 24/7',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'contact@nodeslabs.mx',
                contactType: 'customer service',
              },
            }),
          }}
        />
      </head>
      <body className={`${plusJakarta.variable} bg-black safari-fix`}>
        <Providers>
          <Navbar />
          <Breadcrumbs />
          <div className="min-h-screen bg-black text-white relative main-content flex">
            <div className="flex-1 min-w-0">
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </div>
            <ScrollSidebar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
