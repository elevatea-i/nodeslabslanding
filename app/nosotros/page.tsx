import type { Metadata } from 'next';
import NosotrosPage from '@/components/NosotrosPage';

export const metadata: Metadata = {
  title: 'Nosotros — Laboratorio de IA en México | NodesLabs',
  description: 'Somos un laboratorio de IA: diseñamos, conectamos y probamos agentes, automatizaciones y productos digitales para empresas en México, LATAM y USA.',
  alternates: { canonical: '/nosotros' },
  openGraph: {
    title: 'Nosotros — Laboratorio de IA en México | NodesLabs',
    description: 'Somos un laboratorio de IA: diseñamos, conectamos y probamos agentes, automatizaciones y productos digitales para empresas en México, LATAM y USA.',
    url: 'https://nodeslabs.com/nosotros',
    siteName: 'NodesLabs',
    locale: 'es_MX',
    type: 'website',
  },
};

export default function Page() {
  return <NosotrosPage />;
}
