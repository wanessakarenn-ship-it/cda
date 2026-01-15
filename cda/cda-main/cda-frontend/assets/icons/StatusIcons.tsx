import React from 'react';

// Ícone de check para status "Realizado" (Verde Pastel)
export const CheckIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#ECFDF5" stroke="#10B981" strokeWidth="2"/>
    <path d="M8 12L11 15L16 9" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Ícone de círculo vazio para status "Pendente" (Cinza/Neutro)
export const PendingIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2"/>
  </svg>
);