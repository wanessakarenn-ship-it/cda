import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { SummaryCard } from '../components/SummaryCard';
import { usePerformance } from '../hooks/usePerformance';
import { useCarreira } from '../hooks/useCarreira';

export const ColaboradorPage: React.FC = () => {
  // Dados fictícios baseados no exemplo da Ana García Fernández
  const { scoreFinal, aderencia } = usePerformance([]);
  const { isElegivel, mensagem } = useCarreira(68.9);

  return (
    <DashboardLayout activeTab="Minhas avaliações">
      <div className="max-w-[1200px] mx-auto space-y-8">
        {/* Cabeçalho de Boas-vindas */}
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tighter">Meu Desenvolvimento</h1>
            <p className="text-sm text-slate-400 font-medium">Acompanhe sua evolução e trilhas de carreira.</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Próximo Ciclo</span>
            <span className="text-sm font-bold text-indigo-600">2T 2024 - 15 Abr</span>
          </div>
        </header>

        {/* Resumo de Carreira */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard value="68,9%" label="Última Nota de Mérito" icon="📈" />
          <SummaryCard value="+78%" label="Aderência ao Cargo Atual" icon="🎯" isPositive />
          <div className={`p-6 rounded-2xl border ${isElegivel ? 'border-emerald-200 bg-emerald-50/30' : 'border-amber-200 bg-amber-50/30'} flex flex-col justify-center`}>
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Status de Elegibilidade</p>
            <p className={`text-sm font-black ${isElegivel ? 'text-emerald-600' : 'text-amber-600'}`}>{mensagem}</p>
          </div>
        </div>

        {/* Histórico e Trilhas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gráfico de Evolução (RNF 2.1) */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">Evolução Histórica</h3>
            <div className="h-48 flex items-end justify-between gap-4 px-4">
              {[50, 62, 45, 68.9].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-slate-50 rounded-t-lg relative overflow-hidden h-full">
                    <div className="absolute bottom-0 w-full bg-indigo-500/20 transition-all duration-1000" style={{ height: `${val}%` }}></div>
                    <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t-sm" style={{ height: '4px' }}></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">1T 202{i+1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recomendações de PDI (Item 4.2) */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Plano de Desenvolvimento Sugerido</h3>
            <ul className="space-y-4">
              <li className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">📚</div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Comunicação Assertiva</p>
                  <p className="text-[10px] text-slate-400 font-medium">Baseado no gap identificado de -18%.</p>
                </div>
              </li>
              <li className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">🤝</div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Mentoria: Gestão de Projetos</p>
                  <p className="text-[10px] text-slate-400 font-medium">Preparação para elegibilidade B3.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};