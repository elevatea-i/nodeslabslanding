import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Rocket, Wrench, Zap, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ModalContent: React.FC = () => {
  const { t } = useLanguage();

  // Enhanced stagger animation for content
  const containerAnimation = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Smooth fade up animation for text
  const textAnimation = {
    initial: { 
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  // Cascading animation for benefits
  const benefitAnimation = {
    initial: { 
      opacity: 0,
      x: -20
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  // Map each benefit to its corresponding icon
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-[#8A829A]" />;
      case 1:
        return <Rocket className="w-6 h-6 sm:w-7 sm:h-7 text-[#8A829A]" />;
      case 2:
        return <Wrench className="w-6 h-6 sm:w-7 sm:h-7 text-[#8A829A]" />;
      case 3:
        return <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-[#8A829A]" />;
      case 4:
        return <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-[#8A829A]" />;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      variants={containerAnimation}
      initial="initial"
      animate="animate"
      className="p-5 sm:p-8"
    >
      <motion.p
        variants={textAnimation}
        className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-8"
      >
        {t('whyChooseUs.intro')}
      </motion.p>

      <motion.div 
        className="space-y-6"
        variants={containerAnimation}
      >
        {t('whyChooseUs.benefits').map((benefit: {title: string; desc: string}, index: number) => (
          <motion.div
            key={index}
            variants={benefitAnimation}
            className="flex gap-4 sm:gap-6 items-start group"
          >
            <motion.div 
              className="flex-shrink-0 pt-1 transition-transform duration-300 group-hover:scale-110"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {getIcon(index)}
            </motion.div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#8A829A] mb-2 group-hover:text-[#9BB8FF] transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-neutral-300">
                {benefit.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ModalContent;