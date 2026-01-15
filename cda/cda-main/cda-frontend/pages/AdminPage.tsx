import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';

export const AdminPage: React.FC = () => {
  return (
    <DashboardLayout activeTab="Administração">
      <div className="max-w-[1200px] mx-auto space-y-8">
        <header>
          <h1 className="text-2xl font-black text-slate-800 tracking-tighter">Painel de Administração</h1>
          <p className="text-sm text-slate-400 font-medium">Gestão de permissões, ciclos e conformidade LGPD.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuração de Ciclo */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Ciclos de Avaliação Ativos</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-slate-800">1T 2024 - Desempenho Global</p>
                    <p className="text-[10px] text-slate-400 uppercase font-black">Status: Em andamento</p>
                  </div>
                  <button className="text-xs font-bold text-indigo-600 px-4 py-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50">Configurar</button>
                </div>
              </div>
            </div>

            {/* Auditoria de Acessos */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Logs de Auditoria Recentes</h3>
              <div className="divide-y divide-slate-50">
                {[
                  { user: 'RH_Admin', action: 'Exportou Relatório de Sucessão', time: 'Há 10 min' },
                  { user: 'Gestor_Madrid', action: 'Alterou comentário contextualizado', time: 'Há 45 min' }
                ].map((log, i) => (
                  <div key={i} className="py-3 flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">{log.user}</span>
                    <span className="text-slate-500">{log.action}</span>
                    <span className="text-slate-400 italic">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gestão de Personas e Segurança */}
          <aside className="space-y-6">
            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Segurança do Sistema</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-xs font-medium">Criptografia AES-256</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Ativo</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-xs font-medium">Protocolo TLS 1.2</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Protegido</span>
                </div>
              </div>
            </div>
            
            <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-lg hover:bg-indigo-700 transition-all">
              GERAR RELATÓRIO LGPD
            </button>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
};