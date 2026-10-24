import type { MetadataRoute } from 'next';
import { niches } from '@/data/niches';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://nodeslabs.com';
  return [
    { url: `${base}/` },
    { url: `${base}/nosotros` },
    { url: `${base}/contact` },
    ...Object.values(niches).map((n) => ({ url: `${base}${n.path}` })),
    { url: `${base}/aviso-privacidad` },
  ];
}
