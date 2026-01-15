import React from 'react';
import { LogoIcon } from '../assets/branding/LogoIcon';
import { HomeIcon, ChartIcon } from '../assets/icons/NavIcons';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-16 bg-[#0F172A] flex flex-col items-center py-6 gap-8 z-50">
      <LogoIcon className="w-8 h-8" />
      
      <nav className="flex flex-col gap-6 text-slate-400">
        <button className="hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800">
          <HomeIcon />
        </button>
        <button className="text-white bg-slate-800 p-2 rounded-lg">
          <ChartIcon />
        </button>
        {/* Outros ícones de navegação conforme RF 5.1 */}
      </nav>
    </aside>
  );
};