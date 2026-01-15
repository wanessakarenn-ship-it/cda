interface ProgressBarProps {
  label: string;
  score: number;
  target: number;
}

export const ProgressBar = ({ label, score, target }: ProgressBarProps) => {
  // Código de cores: Verde (superação), Amarelo (atenção), Vermelho (lacuna)
  const color = score >= target ? 'bg-emerald-500' : score >= (target * 0.7) ? 'bg-amber-400' : 'bg-rose-500';

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-bold text-slate-700">{label}</span>
        <span className="text-sm font-black">{score}%</span>
      </div>
      <div className="h-3 bg-slate-200 rounded-full relative">
        <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${score}%` }} />
        {/* Marcador de Meta Exigida */}
        <div className="absolute top-0 h-full w-1 bg-slate-900" style={{ left: `${target}%` }} title="Meta" />
      </div>
    </div>
  );
};