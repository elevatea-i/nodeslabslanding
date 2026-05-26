import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  benefits: string[];
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ isOpen, onClose, title, benefits }) => {
  const { t } = useLanguage();

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
          <motion.div
            {...overlayAnimation}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6">
            <motion.div
              variants={modalAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl bg-gray-900/95 backdrop-blur-xl border border-gray-800/50"
              style={{
                boxShadow: `
                  0 0 0 1px rgba(0, 192, 255, 0.1),
                  0 0 30px 0 rgba(0, 192, 255, 0.2),
                  0 0 50px 0 rgba(153, 50, 204, 0.15)
                `,
                willChange: 'transform, opacity'
              }}
            >
              <div className="sticky top-0 flex items-center justify-between p-5 sm:p-6 border-b border-gray-800/50 bg-gray-900/95 backdrop-blur-xl rounded-t-xl z-10">
                <h2
                  className="text-xl sm:text-2xl font-bold animate__animated animate__lightSpeedInLeft"
                  style={{ color: '#8A829A' }}
                >
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  aria-label="Close modal"
                >
                  <X size={24} />
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
                      className="flex items-start gap-3 text-lg text-neutral-300"
                    >
                      <CheckCircle size={20} className="flex-shrink-0 text-[#8A829A] mt-1" />
                      <span>{benefit}</span>
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