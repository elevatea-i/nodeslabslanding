'use client';

import React, { Suspense, lazy } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

const ThankYou = lazy(() => import('@/components/ThankYou'));

export default function ThankYouPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ThankYou />
    </Suspense>
  );
}
