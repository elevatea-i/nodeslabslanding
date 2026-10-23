import type { Metadata } from 'next';
import NosotrosPage from '@/components/NosotrosPage';

export const metadata: Metadata = {
  title: 'Nosotros — NodesLabs',
  description: 'Conoce la filosofía detrás del laboratorio. Construimos sistemas de IA, productos digitales y contenido para empresas en México, LATAM y USA.',
  alternates: { canonical: '/nosotros' },
  openGraph: {
    title: 'Nosotros — NodesLabs',
    description: 'Conoce la filosofía detrás del laboratorio. Construimos sistemas de IA, productos digitales y contenido para empresas en México, LATAM y USA.',
    url: 'https://nodeslabs.com/nosotros',
    siteName: 'NodesLabs',
    locale: 'es_MX',
    type: 'website',
  },
};

export default function Page() {
  return <NosotrosPage />;
}
