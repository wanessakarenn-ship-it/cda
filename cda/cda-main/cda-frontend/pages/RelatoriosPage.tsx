import React from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';

export const RelatoriosPage: React.FC = () => {
  return (
    <DashboardLayout activeTab="Relatórios">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-800">Relatórios Estratégicos</h1>
          <div className="flex gap-3">
            {/* Filtros Avançados */}
            <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Filtrar por Competência</option>
            </select>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:bg-indigo-700 transition-colors">
              Exportar PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gráfico de Tendência (Placeholder) */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-64 flex flex-col justify-between">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Evolução de Desempenho</p>
            <div className="flex items-end justify-between h-32 gap-2">
              {[40, 65, 55, 85, 68].map((h, i) => (
                <div key={i} className="bg-indigo-100 w-full rounded-t-lg relative group">
                  <div className="bg-indigo-500 w-full rounded-t-lg transition-all" style={{ height: `${h}%` }}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400">
              <span>2020</span><span>2021</span><span>2022</span><span>2023</span><span>2024</span>
            </div>
          </div>
          
          {/* Relatório de Sucessão */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Mapa de Sucessão Estratégica</p>
             <table className="w-full text-left">
               <thead>
                 <tr className="text-[10px] font-black text-slate-400 uppercase border-b border-slate-100">
                   <li className="py-3">Colaborador</li>
                   <th>Posição Chave</th>
                   <th>Prontidão</th>
                   <th>Gap</th>
                 </tr>
               </thead>
               <tbody className="text-sm font-medium text-slate-700">
                 <tr className="border-b border-slate-50">
                   <td className="py-4">Ana García Fernández</td>
                   <td>Gerente de Vendas</td>
                   <td><span className="text-emerald-500">Alta</span></td>
                   <td>Liderança Situacional</td>
                 </tr>
               </tbody>
             </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};