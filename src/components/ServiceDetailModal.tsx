import React, { useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  benefits: string[];
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ isOpen, onClose, title, benefits }) => {
  const { t } = useLanguage();
  const titleId = useId();
  const focusRef = useFocusTrap(isOpen);

  const overlayAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: 'easeInOut' as const }
  };

  const modalAnimation = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2, ease: 'easeOut' as const } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — click to close, but not a keyboard target */}
          <motion.div
            {...overlayAnimation}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Centering wrapper — intercepts overlay clicks without itself being interactive */}
          <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6"
            role="presentation"
          >
            <motion.div
              ref={focusRef as React.RefObject<HTMLDivElement>}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              variants={modalAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl backdrop-blur-xl"
              style={{
                backgroundColor: '#1A2540',
                border: '1px solid #2D4460',
                boxShadow: '0 0 0 1px rgba(45,68,96,0.6), 0 0 40px 0 rgba(173,201,224,0.08), 0 0 80px 0 rgba(68,75,142,0.1)',
                willChange: 'transform, opacity'
              }}
            >
              <div className="sticky top-0 flex items-center justify-between p-5 sm:p-6 border-b backdrop-blur-xl rounded-t-xl z-10" style={{ backgroundColor: '#1A2540', borderColor: '#2D4460' }}>
                <h2
                  id={titleId}
                  className="text-xl sm:text-2xl font-bold"
                  style={{ color: '#E4EDF4' }}
                >
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-[#2D4460]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label={t('modal.close') || 'Close modal'}
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>

              <div className="p-5 sm:p-8">
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <ArrowRight
                        size={16}
                        className="flex-shrink-0 mt-1.5"
                        style={{ color: '#ADC9E0' }}
                        aria-hidden="true"
                      />
                      <span style={{ color: 'rgba(255,255,255,0.65)' }}>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ServiceDetailModal;
