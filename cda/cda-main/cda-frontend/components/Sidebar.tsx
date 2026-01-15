import React from 'react';
import { 
  LayoutDashboard, 
  UserCircle, 
  BarChart3, 
  ShieldCheck, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeTab?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'Minhas avaliações', icon: LayoutDashboard, path: '/' },
    { id: 'Minha equipe', icon: UserCircle, path: '/equipe' },
    { id: 'Relatórios', icon: BarChart3, path: '/relatorios' },
    { id: 'Administração', icon: ShieldCheck, path: '/admin' },
  ];

  return (
    <aside className="w-64 bg-slate-900 flex flex-col h-full border-r border-slate-800">
      {/* Logo / Nome do Projeto */}
      <div className="p-8">
        <h1 className="text-white font-black text-2xl tracking-tighter">
          CDA <span className="text-indigo-500">2026</span>
        </h1>
      </div>

      {/* Links de Navegação */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === item.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <item.icon size={20} strokeWidth={2.5} />
            {item.id}
          </button>
        ))}
      </nav>

      {/* Botão de Sair */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 transition-all"
        >
          <LogOut size={20} strokeWidth={2.5} />
          Sair do Sistema
        </button>
      </div>
    </aside>
  );
};