'use client';

import React, { Suspense, lazy } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

const PrivacyNotice = lazy(() => import('@/components/PrivacyNotice'));

export default function AvisoPrivacidadPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PrivacyNotice />
    </Suspense>
  );
}
