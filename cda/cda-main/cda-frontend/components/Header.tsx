import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Search, Settings, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  activeTab?: string;
}

export const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
      <nav className="flex items-center gap-8 h-full">
        <h2 className="text-lg font-bold text-slate-800 mr-4">Avaliações</h2>
        <div className="flex gap-6 h-full">
          {['Minhas avaliações', 'Minha equipe', 'Relatórios', 'Administração'].map((tab) => (
            <button 
              key={tab}
              type="button" // ✅ Correção: Define o comportamento do botão
              onClick={() => navigate(`/${tab.toLowerCase().replace(' ', '-')}`)}
              className={`text-[11px] font-bold uppercase tracking-wider h-full border-b-2 transition-all ${
                activeTab === tab 
                  ? 'border-indigo-600 text-slate-900' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-5 text-slate-400">
          
          {/* ✅ Correção: Adicionado type, title e aria-label para acessibilidade */}
          <button 
            type="button" 
            title="Buscar" 
            aria-label="Realizar busca"
            className="hover:text-indigo-600 transition-colors"
          >
            <Search size={18} />
          </button>
          
          <button 
            type="button" 
            title="Configurações" 
            aria-label="Abrir configurações"
            className="hover:text-indigo-600 transition-colors"
          >
            <Settings size={18} />
          </button>
          
          <button 
            type="button" 
            title="Mensagens" 
            aria-label="Ver notificações"
            className="hover:text-indigo-600 transition-colors relative"
          >
            <MessageSquare size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
        
        {/* Perfil */}
        <button 
          type="button"
          title="Ver perfil do usuário"
          className="flex items-center gap-3 pl-6 border-l border-slate-100 hover:opacity-80 transition-opacity"
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-800 leading-none">{user?.nome || 'Usuário'}</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">Colaborador</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-black border border-indigo-100 shadow-sm">
            {user?.nome ? getInitials(user.nome) : '??'}
          </div>
        </button>
      </div>
    </header>
  );
};