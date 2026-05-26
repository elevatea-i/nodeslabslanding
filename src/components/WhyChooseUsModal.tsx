import React, { lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useDeviceType } from '@/hooks/useDeviceType';
import { useLanguage } from '@/context/LanguageContext';

// Lazy load modal content for better initial load
const ModalContent = lazy(() => import('@/components/ModalContent'));

interface WhyChooseUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhyChooseUsModal: React.FC<WhyChooseUsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const deviceType = useDeviceType();

  // Enhanced animations for smoother transitions
  const overlayAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: 'easeInOut' as const }
  };

  const modalAnimation = {
    initial: { 
      opacity: 0, 
      scale: deviceType === 'mobile' ? 1 : 0.95,
      y: deviceType === 'mobile' ? 20 : 0
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] as const, // Custom spring-like easing
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      scale: deviceType === 'mobile' ? 1 : 0.95,
      y: deviceType === 'mobile' ? 20 : 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut' as const
      }
    }
  };

  const headerAnimation = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
        delay: 0.1
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <motion.div
            {...overlayAnimation}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6">
            <motion.div
              variants={modalAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-xl bg-gray-900/95 backdrop-blur-xl"
              style={{
                boxShadow: deviceType === 'desktop' ? `
                  0 0 0 1px rgba(0, 192, 255, 0.1),
                  0 0 30px 0 rgba(0, 192, 255, 0.2),
                  0 0 50px 0 rgba(153, 50, 204, 0.15)
                ` : 'none',
                willChange: 'transform, opacity'
              }}
            >
              {/* Header with smoother gradient title */}
              <motion.div 
                variants={headerAnimation}
                className="sticky top-0 flex items-center justify-between p-5 sm:p-6 border-b border-gray-800/50 bg-gray-900/95 backdrop-blur-xl rounded-t-xl z-10"
              >
                <motion.h2 
                  className="text-xl sm:text-2xl font-bold"
                  style={{ color: '#8A829A' }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                >
                  {t('whyChooseUs.title')}
                </motion.h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </motion.div>

              {/* Content with loading spinner */}
              <Suspense 
                fallback={
                  <div className="flex items-center justify-center p-8">
                    <div className="w-8 h-8 border-2 border-[#ADC9FF] border-t-transparent rounded-full animate-spin" />
                  </div>
                }
              >
                <ModalContent />
              </Suspense>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WhyChooseUsModal;