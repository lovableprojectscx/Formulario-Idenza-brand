import React from 'react';

interface IdenzaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const IdenzaLogo: React.FC<IdenzaLogoProps> = ({ 
  size = 'md',
  showTagline = false 
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl sm:text-4xl',
  };

  const squareSizes = {
    sm: 'w-[4px] h-[4px] mb-[2px]',
    md: 'w-[5.5px] h-[5.5px] mb-[2px]',
    lg: 'w-[7px] h-[7px] mb-[3px]',
  };

  return (
    <div className="inline-flex items-baseline gap-2.5">
      <div className={`font-display font-medium ${sizeClasses[size]} tracking-normal text-blanco select-none flex items-baseline`}>
        {/* The "i" with perfect amber square */}
        <span className="inline-flex flex-col items-center justify-end leading-none">
          <span className={`${squareSizes[size]} bg-ambar shrink-0`} />
          <span className="leading-none">ı</span>
        </span>
        <span className="leading-none">denza</span>
      </div>

      {showTagline && (
        <span className="text-[11px] text-blanco-muted font-sans font-normal tracking-wide hidden sm:inline border-l border-tinta-border pl-2.5 my-auto">
          Demanda real antes que diseño
        </span>
      )}
    </div>
  );
};
