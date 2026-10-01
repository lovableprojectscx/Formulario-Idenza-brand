import React from 'react';

interface IdenzaLogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export const IdenzaLogo: React.FC<IdenzaLogoProps> = ({ 
  size = 'md'
}) => {
  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl sm:text-4xl',
  };

  const squareStyles = {
    sm: 'top-[4px] left-[1px] w-[4.5px] h-[4.5px]',
    md: 'top-[5px] left-[1.5px] w-[5.5px] h-[5.5px]',
    lg: 'top-[7px] left-[2px] w-[7px] h-[7px]',
  };

  return (
    <div className="inline-flex items-center">
      <div className={`font-display font-semibold ${textSizes[size]} tracking-tight text-tinta select-none flex items-center leading-none`}>
        <span className="relative inline-block">
          <span className="text-tinta">i</span>
          <span className={`absolute ${squareStyles[size]} bg-ambar rounded-[0.5px] pointer-events-none`} />
        </span>
        <span>denza</span>
      </div>
    </div>
  );
};
