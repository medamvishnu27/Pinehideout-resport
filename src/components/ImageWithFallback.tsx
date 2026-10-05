/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Trees } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  aspectRatioClass?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Pine Hideout visual reference',
  fallbackTitle = 'Highland Pine Sanctuary',
  fallbackSubtitle = 'Concept visualization',
  aspectRatioClass = 'aspect-[16/9]',
  className = '',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full ${aspectRatioClass} bg-[#162c22] text-[#e8dfcf] flex flex-col items-center justify-center p-6 text-center border border-[#234636]/40 rounded-sm relative overflow-hidden`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
        <Trees className="w-10 h-10 text-[#c67d4e]/70 mb-3 relative z-10" />
        <p className="font-serif text-lg tracking-wide text-[#f5f0e6] relative z-10 max-w-xs">
          {fallbackTitle}
        </p>
        <p className="text-xs text-[#c2baad] tracking-wider uppercase mt-1 relative z-10 font-mono">
          {fallbackSubtitle}
        </p>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${aspectRatioClass} bg-[#162c22] overflow-hidden rounded-sm group`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#162c22] animate-pulse flex items-center justify-center">
          <Trees className="w-6 h-6 text-[#234636]" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...rest}
      />
    </div>
  );
};
