'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { faqItems } from '@/data/faq';

export default function FAQSection() {
  const { language } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(null);
  const isEs = language === 'es';

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative section-spacing"
      style={{ background: '#0B0D14' }}
    >
      <div className="relative z-20 top-tier-container">
        <div className="grid gap-10 md:grid-cols-5 md:gap-14">
          <div className="md:col-span-2">
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.08em',
                color: '#878EAE',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              {isEs ? 'Preguntas frecuentes' : 'Frequently asked questions'}
            </p>
            <h2
              id="faq-title"
              style={{
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                maxWidth: '480px',
              }}
            >
              {isEs ? 'Lo que conviene saber antes de empezar.' : 'What to know before you start.'}
            </h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)', marginTop: '24px' }}>
              {isEs ? '¿Tu pregunta no está aquí?' : "Don't see your question?"}{' '}
              <Link href="/contact" className="hover:underline" style={{ color: '#ADC9E0' }}>
                {isEs ? 'Cuéntanos tu caso →' : 'Tell us about your case →'}
              </Link>
            </p>
          </div>

          <div className="md:col-span-3">
            <div style={{ borderTop: '1px solid rgba(45,68,96,0.6)' }}>
              {faqItems.map((item) => {
                const open = openId === item.id;
                return (
                  <div key={item.id} style={{ borderBottom: '1px solid rgba(45,68,96,0.6)' }}>
                    <h3 className="m-0">
                      <button
                        type="button"
                        id={`faq-btn-${item.id}`}
                        aria-expanded={open}
                        aria-controls={`faq-panel-${item.id}`}
                        onClick={() => setOpenId(open ? null : item.id)}
                        className="flex w-full min-h-[44px] items-center justify-between gap-6 py-5 text-left text-base md:text-lg font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ADC9E0]/60"
                        style={{ color: '#E4EDF4' }}
                      >
                        <span>{item.q[language]}</span>
                        <ChevronDown
                          size={20}
                          aria-hidden="true"
                          className={`shrink-0 transition-transform duration-300 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
                          style={{ color: open ? '#ADC9E0' : '#587091' }}
                        />
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${item.id}`}
                      className="grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none"
                      style={{ gridTemplateRows: open ? '1fr' : '0fr', visibility: open ? 'visible' : 'hidden' }}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p
                          className={`pb-5 pr-8 text-base leading-relaxed transition-[opacity,filter,transform] duration-500 ease-out motion-reduce:transition-none ${
                            open ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-[6px] translate-y-1'
                          }`}
                          style={{ color: 'rgba(255,255,255,0.6)' }}
                        >
                          {item.a[language]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
