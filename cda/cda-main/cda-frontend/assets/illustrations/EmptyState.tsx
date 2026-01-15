import React from 'react';

export const EmptyStateIllustration = () => (
  <svg width="240" height="180" viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto opacity-60">
    {/* Base da ilustração com tons pastéis */}
    <rect x="40" y="40" width="160" height="100" rx="12" fill="#F1F5F9" />
    <rect x="60" y="70" width="120" height="8" rx="4" fill="#E2E8F0" />
    <rect x="60" y="90" width="80" height="8" rx="4" fill="#E2E8F0" />
    {/* Elemento de foco indigo */}
    <circle cx="170" cy="110" r="25" fill="#EEF2FF" />
    <path d="M165 110L170 115L175 105" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);