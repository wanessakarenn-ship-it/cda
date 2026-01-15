import React from 'react';

interface SummaryCardProps {
  value: string;
  label: string;
  subtitle?: string;
  icon?: string;
  isPositive?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ value, label, subtitle, icon, isPositive }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 group hover:border-indigo-200 transition-all">
      <div className="flex justify-between items-start">
        <span className={`text-2xl font-black tracking-tighter ${isPositive ? 'text-emerald-500' : 'text-slate-900'}`}>
          {isPositive && '+'} {value}
        </span>
        <span className="text-indigo-400 text-xl group-hover:scale-110 transition-transform">{icon}</span>
      </div>
      <p className="text-[10px] font-bold text-slate-800 uppercase tracking-tighter leading-tight">
        {label}
      </p>
      {subtitle && (
        <p className="text-[10px] text-slate-400 font-medium italic">
          {subtitle}
        </p>
      )}
    </div>
  );
};