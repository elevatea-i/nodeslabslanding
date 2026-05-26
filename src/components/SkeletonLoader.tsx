import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'circle' | 'button' | 'image';
  width?: string;
  height?: string;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'card',
  width = '100%',
  height = '100%',
  className = ''
}) => {
  const baseClasses = "animate-pulse rounded";

  const variantStyles = {
    card: {
      background: 'linear-gradient(90deg, rgba(30, 30, 30, 0.95) 25%, rgba(50, 50, 50, 0.95) 50%, rgba(30, 30, 30, 0.95) 75%)',
      borderRadius: '16px',
      minHeight: '200px'
    },
    text: {
      background: 'linear-gradient(90deg, rgba(138, 130, 154, 0.1) 25%, rgba(138, 130, 154, 0.2) 50%, rgba(138, 130, 154, 0.1) 75%)',
      borderRadius: '4px',
      height: '20px'
    },
    circle: {
      background: 'linear-gradient(90deg, rgba(138, 130, 154, 0.1) 25%, rgba(138, 130, 154, 0.2) 50%, rgba(138, 130, 154, 0.1) 75%)',
      borderRadius: '50%',
      width: '48px',
      height: '48px'
    },
    button: {
      background: 'linear-gradient(90deg, rgba(138, 130, 154, 0.2) 25%, rgba(138, 130, 154, 0.3) 50%, rgba(138, 130, 154, 0.2) 75%)',
      borderRadius: '12px',
      height: '48px'
    },
    image: {
      background: 'linear-gradient(90deg, rgba(30, 30, 30, 0.95) 25%, rgba(50, 50, 50, 0.95) 50%, rgba(30, 30, 30, 0.95) 75%)',
      borderRadius: '8px',
      aspectRatio: '16/9'
    }
  };

  return (
    <motion.div
      className={`${baseClasses} ${className}`}
      style={{
        ...variantStyles[variant],
        width,
        height,
        backgroundSize: '200% 100%'
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      }}
      transition={{
        duration: 1.5,
        ease: 'linear',
        repeat: Infinity
      }}
    />
  );
};

export default SkeletonLoader;

// Pre-built skeleton components for common use cases
export const CardSkeleton: React.FC = () => (
  <div className="space-y-4 p-6">
    <SkeletonLoader variant="circle" width="48px" height="48px" />
    <SkeletonLoader variant="text" width="80%" />
    <SkeletonLoader variant="text" width="100%" />
    <SkeletonLoader variant="text" width="60%" />
    <SkeletonLoader variant="button" width="120px" className="mt-4" />
  </div>
);

export const BentoCardSkeleton: React.FC = () => (
  <div className="w-full h-full min-h-[300px] rounded-xl p-6 space-y-4"
       style={{ background: 'rgba(30, 30, 30, 0.95)', border: '1px solid rgba(138, 130, 154, 0.1)' }}>
    <SkeletonLoader variant="circle" width="40px" height="40px" />
    <SkeletonLoader variant="text" width="70%" height="24px" />
    <SkeletonLoader variant="text" width="100%" height="16px" />
    <SkeletonLoader variant="text" width="90%" height="16px" />
    <SkeletonLoader variant="text" width="60%" height="16px" />
  </div>
);

export const ProcessStepSkeleton: React.FC = () => (
  <div className="flex flex-col items-center text-center space-y-4">
    <SkeletonLoader variant="circle" width="64px" height="64px" />
    <SkeletonLoader variant="text" width="180px" height="20px" />
    <SkeletonLoader variant="text" width="220px" height="16px" />
    <SkeletonLoader variant="text" width="200px" height="16px" />
  </div>
);
