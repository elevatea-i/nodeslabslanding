import type { Metadata } from 'next';
import { niches } from '@/data/niches';
import NichePage from '@/components/NichePage';

const niche = niches.medicos;

export const metadata: Metadata = {
  title: niche.meta.title,
  description: niche.meta.description,
  alternates: { canonical: niche.path },
  openGraph: {
    title: niche.meta.title,
    description: niche.meta.description,
    url: `https://nodeslabs.com${niche.path}`,
    siteName: 'NodesLabs',
    locale: 'es_MX',
    type: 'website',
  },
};

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `https://nodeslabs.com${niche.path}#service`,
      name: niche.service.name,
      serviceType: 'Agentes de IA',
      description: niche.service.description,
      url: `https://nodeslabs.com${niche.path}`,
      provider: { '@id': 'https://nodeslabs.com/#organization' },
      areaServed: ['México'],
      audience: { '@type': 'Audience', audienceType: niche.service.audience },
    },
    {
      '@type': 'FAQPage',
      inLanguage: 'es-MX',
      mainEntity: niche.faq.map((i) => ({
        '@type': 'Question',
        name: i.q.es,
        acceptedAnswer: { '@type': 'Answer', text: i.a.es },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://nodeslabs.com/' },
        { '@type': 'ListItem', position: 2, name: niche.navLabel.es, item: `https://nodeslabs.com${niche.path}` },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
      />
      <NichePage niche={niche} />
    </>
  );
}
