import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-[300px] flex items-center justify-center safari-fix" style={{ backgroundColor: '#0B0D14' }}>
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-12 h-12 rounded-full border-2 border-[#ADC9FF]/20 border-t-[#ADC9FF] animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LoadingSpinner);