import React from 'react';
import { useAuth } from '../contexts/AuthContext';
// Importação dos ícones profissionais
import { Search, Settings, MessageSquare } from 'lucide-react';

export const Header: React.FC = () => {
  const { user } = useAuth();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
      <nav className="flex items-center gap-8">
        <h2 className="text-lg font-bold text-slate-800 mr-4">Avaliações</h2>
        <div className="flex gap-6">
          {['Minhas avaliações', 'Minha equipe', 'Relatórios', 'Administração'].map((tab) => (
            <button 
              key={tab}
              className={`text-xs font-bold uppercase tracking-wider pb-5 mt-5 border-b-2 transition-all ${
                tab === 'Minhas avaliações' ? 'border-indigo-600 text-slate-800' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-5 text-slate-400">
          {/* Ícones com tamanho controlado e efeito hover suave */}
          <button className="hover:text-brand-indigo transition-colors">
            <Search size={18} strokeWidth={2.5} />
          </button>
          
          <button className="hover:text-brand-indigo transition-colors">
            <Settings size={18} strokeWidth={2.5} />
          </button>
          
          <button className="hover:text-brand-indigo transition-colors relative">
            <MessageSquare size={18} strokeWidth={2.5} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
        
        <div className="w-8 h-8 rounded-full bg-brand-indigo/10 text-brand-indigo flex items-center justify-center text-xs font-bold border border-brand-indigo/20 shadow-sm">
          {user?.nome ? getInitials(user.nome) : '??'}
        </div>
      </div>
    </header>
  );
};