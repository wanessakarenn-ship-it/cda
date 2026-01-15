import React from 'react';
import { CheckIcon, PendingIcon } from '../assets/icons/StatusIcons';

interface EvaluatorCardProps {
  name: string;
  avatar: string;
  percentage: string;
  status: 'Realizada' | 'Pendente' | 'Realizado';
  isMain?: boolean;
}

export const EvaluatorCard: React.FC<EvaluatorCardProps> = ({ name, avatar, percentage, status, isMain }) => {
  return (
    <div className="flex flex-col gap-3 min-w-[200px]">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        {isMain ? 'Avaliador principal' : 'Avaliadores de apoio'}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={avatar} alt={name} className="w-8 h-8 rounded-full border border-slate-100" />
          <span className="text-sm font-bold text-slate-700">{name}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-slate-400">⚖️ {percentage}</span>
          <div className="flex items-center gap-1.5">
            {status.toLowerCase().includes('pendente') ? <PendingIcon /> : <CheckIcon />}
            <span className={`text-[11px] font-bold ${status.toLowerCase().includes('pendente') ? 'text-slate-400' : 'text-emerald-500'}`}>
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};