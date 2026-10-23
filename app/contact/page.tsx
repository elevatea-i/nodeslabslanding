import type { Metadata } from 'next';
import ContactPageClient from '@/components/ContactPageClient';

export const metadata: Metadata = {
  title: 'Contacto — NodesLabs',
  description: 'Cuéntanos qué necesita tu negocio y diseñamos juntos un agente de IA, una automatización o un producto digital.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contacto — NodesLabs',
    description: 'Cuéntanos qué necesita tu negocio y diseñamos juntos un agente de IA, una automatización o un producto digital.',
    url: 'https://nodeslabs.com/contact',
    siteName: 'NodesLabs',
    locale: 'es_MX',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
