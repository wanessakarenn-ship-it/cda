import React from 'react';

export const LogoIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    {/* Fundo arredondado conforme RNF 2.1 */}
    <rect width="40" height="40" rx="12" fill="#0F172A"/> 
    {/* Letra 'h' estilizada da imagem de referência */}
    <path 
      d="M14 12V28M14 20C14 20 16 17 20 17C24 17 26 20 26 24V28" 
      stroke="white" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);