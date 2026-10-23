import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://nodeslabs.com';
  return [
    { url: `${base}/` },
    { url: `${base}/nosotros` },
    { url: `${base}/contact` },
    { url: `${base}/aviso-privacidad` },
  ];
}
