'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const COUNTDOWN_SECONDS = 5;

const ThankYou: React.FC = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center">
      <div className="relative z-10 w-full">
        <button
          onClick={() => router.push('/')}
          className="absolute top-8 left-4 flex items-center gap-2 transition-all duration-200"
          style={{
            color: 'rgba(255,255,255,0.7)',
            padding: '8px 16px',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '8px',
            background: 'transparent',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
            (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)';
          }}
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">{t('thanks.back')}</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-8 sm:px-16 lg:px-32 max-w-6xl mx-auto py-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            style={{ color: '#ADC9E0' }}
            className="inline-block mb-12"
          >
            <CheckCircle className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40" />
          </motion.div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text"
            style={{
              background: 'linear-gradient(90deg, #ADC9E0 0%, #444B8E 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            {t('thanks.title')}
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-16">
            {t('thanks.message')}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-gray-400 text-sm sm:text-base">
              {t('thanks.redirect')} <span className="text-white font-semibold tabular-nums">{secondsLeft}</span> {t('thanks.redirect.seconds')}
            </p>

            <div
              className="w-64 sm:w-80"
              style={{
                height: '3px',
                borderRadius: '9999px',
                background: 'rgba(255,255,255,0.1)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  borderRadius: '9999px',
                  background: 'linear-gradient(90deg, #ADC9E0 0%, #444B8E 100%)',
                  width: `${(secondsLeft / COUNTDOWN_SECONDS) * 100}%`,
                  transition: 'width 1s linear',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYou;
