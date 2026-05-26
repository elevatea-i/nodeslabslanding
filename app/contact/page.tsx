'use client';

import React, { Suspense, lazy } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

const ContactForm = lazy(() => import('@/components/ContactForm'));

export default function ContactPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ContactForm />
    </Suspense>
  );
}
