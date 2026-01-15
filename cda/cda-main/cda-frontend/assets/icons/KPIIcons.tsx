import React from 'react';

// Escudo para Resultado Final (🛡️)
export const ShieldIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Troféu para Resultado de Competências (🏆)
export const TrophyIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9H4.5C3.67157 9 3 8.32843 3 7.5C3 6.67157 3.67157 6 4.5 6H6" stroke="currentColor" strokeWidth="2"/>
    <path d="M18 9H19.5C20.3284 9 21 8.32843 21 7.5C21 6.67157 20.3284 6 19.5 6H18" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 21H16M12 17V21M7 4H17V12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12V4Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);