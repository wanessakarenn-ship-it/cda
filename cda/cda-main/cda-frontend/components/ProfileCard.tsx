import React from 'react';

// Definindo a interface para aceitar os dados passados pela AvaliacaoPage
interface ProfileCardProps {
  name: string;
  role: string;
  location: string;
  avatar: string;
  orgInfo: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ 
  name, 
  role, 
  location, 
  avatar, 
  orgInfo 
}) => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Foto de Perfil com borda decorativa */}
        <div className="relative">
          <img 
            src={avatar} 
            alt={name} 
            className="w-24 h-24 rounded-3xl object-cover border-4 border-slate-50 shadow-md"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">{name}</h2>
          <p className="text-xs font-bold text-brand-indigo uppercase tracking-wider mt-1">{role}</p>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-50">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Localização</span>
          <span className="text-sm font-bold text-slate-700">{location}</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Informação Organizacional</span>
          <span className="text-xs font-medium text-slate-500 leading-relaxed">{orgInfo}</span>
        </div>
      </div>
    </div>
  );
};