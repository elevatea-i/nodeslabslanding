'use client';
import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function AnalyticsGate() {
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    const host = window.location.hostname;
    setIsProduction(host === 'nodeslabs.com' || host === 'www.nodeslabs.com');
  }, []);

  if (!isProduction) return null;

  return (
    <>
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
    </>
  );
}
