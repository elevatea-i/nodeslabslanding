'use client';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const safeGtag = (...args: unknown[]) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
};

export const trackCTAClick = (location: 'hero' | 'mid_page' | 'final' | 'navbar') => {
  safeGtag('event', 'cta_click', {
    event_category: 'engagement',
    event_label: location,
    cta_location: location
  });
};

export const trackFormStart = () => {
  safeGtag('event', 'form_start', {
    event_category: 'lead',
    form_name: 'contact'
  });
};

export const trackFormSubmit = () => {
  safeGtag('event', 'form_submit', {
    event_category: 'lead',
    form_name: 'contact'
  });
};

export const trackServiceModalOpen = (serviceName: string) => {
  safeGtag('event', 'service_modal_open', {
    event_category: 'engagement',
    service_name: serviceName
  });
};

export const trackLanguageSwitch = (language: string) => {
  safeGtag('event', 'language_switch', {
    event_category: 'engagement',
    language
  });
};
