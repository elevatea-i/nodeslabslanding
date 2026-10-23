import type { Metadata } from 'next';
import PrivacyPageClient from '@/components/PrivacyPageClient';

export const metadata: Metadata = {
  title: 'Aviso de privacidad — NodesLabs',
  description: 'Conoce cómo NodesLabs recopila, usa y protege los datos personales que compartes en este sitio.',
  alternates: { canonical: '/aviso-privacidad' },
  openGraph: {
    title: 'Aviso de privacidad — NodesLabs',
    description: 'Conoce cómo NodesLabs recopila, usa y protege los datos personales que compartes en este sitio.',
    url: 'https://nodeslabs.com/aviso-privacidad',
    siteName: 'NodesLabs',
    locale: 'es_MX',
    type: 'website',
  },
};

export default function AvisoPrivacidadPage() {
  return <PrivacyPageClient />;
}
