import React from 'react';

interface CompetenciaRowProps {
  label: string;
  weight: string;
  score: number;
  target: number;
  level: number;
}

export const CompetenciaRow: React.FC<CompetenciaRowProps> = ({ label, weight, score, target, level }) => {
  const barColor = score >= target ? 'bg-emerald-400' : score >= 50 ? 'bg-indigo-400' : 'bg-rose-400';

  return (
    <div className="group flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
      <div className="flex items-center gap-4 w-1/3">
        <span className="text-[10px] font-black text-slate-300 tracking-tighter w-8 uppercase">⚖️ {weight}</span>
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <button type="button" aria-label="Ver detalhes" className="text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity">ⓘ</button>
      </div>

      <div className="flex items-center gap-8 flex-1">
        <span className="text-xs font-bold text-slate-500 w-10 text-right">{score}%</span>
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full relative">
          {/* Preenchimento da Barra */}
          <div 
            className={`h-full ${barColor} rounded-full transition-all duration-1000 progress-bar-fill`} 
            style={{ '--progress-width': `${score}%` } as React.CSSProperties} 
          />
          {/* Marcador de Meta */}
          <div 
            className="absolute top-[-4px] h-3.5 w-[2px] bg-slate-900 rounded-full target-marker" 
            style={{ '--target-position': `${target}%` } as React.CSSProperties} 
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-8">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-black text-xs">
          {level}
        </div>
        <button type="button" aria-label="Comentários" title="Comentários" className="text-slate-300 hover:text-slate-600">💬</button>
        <button type="button" aria-label="Expandir detalhes" title="Expandir" className="text-slate-300 hover:text-slate-600">⌄</button>
      </div>
    </div>
  );
};