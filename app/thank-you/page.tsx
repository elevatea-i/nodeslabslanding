import type { Metadata } from 'next';
import ThankYouPageClient from '@/components/ThankYouPageClient';

export const metadata: Metadata = {
  title: 'Gracias — NodesLabs',
  description: 'Recibimos tu mensaje. Gracias por escribir a NodesLabs.',
  alternates: { canonical: '/thank-you' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Gracias — NodesLabs',
    description: 'Recibimos tu mensaje. Gracias por escribir a NodesLabs.',
    url: 'https://nodeslabs.com/thank-you',
    siteName: 'NodesLabs',
    locale: 'es_MX',
    type: 'website',
  },
};

export default function ThankYouPage() {
  return <ThankYouPageClient />;
}
