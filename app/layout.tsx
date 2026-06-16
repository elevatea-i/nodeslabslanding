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
  title: 'NodesLabs — Laboratorio de IA para tu negocio',
  description: 'Construimos agentes de voz, productos digitales y contenido con IA para empresas en México y LATAM. Automatiza tu operación y escala sin contratar más personal.',
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
    title: 'NodesLabs — Laboratorio de IA para tu negocio',
    description: 'Agentes de voz, productos digitales y contenido con IA. Un laboratorio construido para escalar tu negocio sin escalar tu equipo.',
    url: 'https://nodeslabs.com',
    siteName: 'NodesLabs',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NodesLabs — Laboratorio de IA',
    description: 'Agentes de voz, productos digitales y contenido con IA para empresas en México y LATAM.',
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
        <Script id="voiceflow-widget" strategy="afterInteractive">
          {`
            (function(d, t) {
              var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
              v.onload = function() {
                window.voiceflow.chat.load({
                  verify: { projectID: '6a1d0bb5495496cb314ca7fb' },
                  url: 'https://general-runtime.voiceflow.com',
                  voice: { url: 'https://runtime-api.voiceflow.com' },
                  events: {
                    open: function() { window.dispatchEvent(new CustomEvent('vf:open')); },
                    close: function() { window.dispatchEvent(new CustomEvent('vf:close')); },
                  },
                });
              };
              v.src = 'https://cdn.voiceflow.com/widget-next/bundle.mjs';
              v.type = 'text/javascript';
              s.parentNode.insertBefore(v, s);
            })(document, 'script');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'NodesLabs',
              description: 'Laboratorio de IA que construye agentes de voz, productos digitales y contenido generativo para empresas en México y LATAM.',
              url: 'https://nodeslabs.com',
              areaServed: ['México', 'LATAM', 'USA'],
              serviceType: [
                'AI Agents',
                'Automatización empresarial',
                'Productos digitales',
                'Content & Media',
              ],
              email: 'axel@nodeslabs.com',
            }),
          }}
        />
      </head>
      <body className={`${plusJakarta.variable} safari-fix`} style={{ backgroundColor: '#0B0D14', minHeight: '100vh' }}>
        <Providers>
          <Navbar />
          <Breadcrumbs />
          <div className="min-h-screen text-white relative main-content flex" style={{ backgroundColor: '#0B0D14' }}>
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
