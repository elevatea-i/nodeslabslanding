'use client';

import React, { Suspense, lazy } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

const PrivacyNotice = lazy(() => import('@/components/PrivacyNotice'));

export default function PrivacyPageClient() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PrivacyNotice />
    </Suspense>
  );
}
