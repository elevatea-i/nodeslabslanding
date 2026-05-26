'use client';

import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'desktop';

export const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      setDeviceType(isMobile ? 'mobile' : 'desktop');
    };

    // Initial check
    checkDevice();

    // Add resize listener
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return deviceType;
};