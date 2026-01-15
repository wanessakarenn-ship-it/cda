import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { EvaluatorCard } from '../components/EvaluatorCard';
import { CompetenciaRow } from '../components/CompetenciaRow';
import { SummaryCard } from '../components/SummaryCard';
import { ProfileCard } from '../components/ProfileCard';

export const AvaliacaoPage: React.FC = () => {
  return (
    <DashboardLayout activeTab="Minhas avaliações">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* COLUNA ESQUERDA: DASHBOARD DE DESEMPENHO */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              Avaliação do desempenho 1T 2024
            </h1>
            <span className="bg-rose-50 text-rose-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-100 uppercase">
              ● Finalizado
            </span>
          </div>

          {/* Cards de Avaliadores */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-wrap gap-12 shadow-sm">
            <EvaluatorCard 
              isMain 
              name="Paula Dámaso Azcutia" 
              avatar="https://ui-avatars.com/api/?name=Paula+Damaso&background=random" 
              percentage="60%"
              status="Realizada"
            />
            <div className="border-l border-slate-100 h-12 self-center hidden md:block"></div>
            <EvaluatorCard 
              name="Equipe de Apoio" 
              avatar="https://ui-avatars.com/api/?name=Equipe&background=slate" 
              percentage="30%"
              status="Realizado"
            />
          </div>

          {/* Seção de Competências */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-2">
              <h2 className="font-bold text-slate-800 text-sm">Competências gerais</h2>
              <span className="bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded text-[10px] font-black">2.2</span>
            </div>
            
            <div className="divide-y divide-slate-50">
              <CompetenciaRow label="Trabalho em equipe" weight="30%" score={68} target={55} level={4} />
              <CompetenciaRow label="Comunicação assertiva" weight="30%" score={37} target={55} level={2} />
              <CompetenciaRow label="Adaptação à mudanças" weight="20%" score={97} target={55} level={5} />
              <CompetenciaRow label="Auto-motivação" weight="20%" score={73} target={55} level={4} />
            </div>

            <div className="p-6 border-t border-b border-slate-100 bg-slate-50/30 flex items-center gap-2">
              <h2 className="font-bold text-slate-800 text-sm">Competências específicas</h2>
              <span className="bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded text-[10px] font-black">3.8</span>
            </div>
            <CompetenciaRow label="Análise de problemas" weight="20%" score={96} target={80} level={5} />
          </div>
        </div>

        {/* COLUNA DIREITA: PERFIL E RESUMO */}
        <aside className="w-full lg:w-[380px] space-y-6">
          <ProfileCard 
            name="Ana García Fernández"
            role="Vendas Espanha - Vendas - Madrid"
            location="Madrid"
            avatar="https://ui-avatars.com/api/?name=Ana+Garcia&background=6366f1&color=fff"
            orgInfo="Vendas - Madrid (12-03-2022 - Sem data de fim)"
          />

          <div className="space-y-4">
            <SummaryCard value="68,9%" label="Resultado final" icon="🛡️" />
            <SummaryCard value="22,9%" label="Resultado das competências" icon="🏆" />
            <SummaryCard 
              value="+ 78%" 
              label="Pontuação em relação ao exigido" 
              subtitle="A diferença é de -25%."
              isPositive 
              icon="📈"
            />
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
};