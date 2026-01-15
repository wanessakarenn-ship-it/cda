import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogoIcon } from '../assets/branding/LogoIcon';

export const LoginPage: React.FC = () => {
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Integração com a Porta 4000 via AuthContext
    await signIn({ email, password });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div className="flex flex-col items-center">
          {/* Identidade Visual: Logo e Branding */}
          <LogoIcon className="w-16 h-16 mb-4" />
          <h2 className="text-2xl font-black text-slate-800 tracking-tighter text-center">
            Acesse o CDA<span className="text-indigo-600">2026</span>
          </h2>
          <p className="text-sm text-slate-400 font-medium text-center mt-2">
            Plataforma de Gestão do Ciclo de Desempenho
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                E-mail corporativo
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="ana.garcia@empresa.com"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                Senha
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* O bloco de Lembrar-me e Esqueceu a Senha foi removido daqui */}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-100 text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 uppercase tracking-widest"
          >
            {loading ? 'Autenticando...' : 'ENTRAR NO SISTEMA'}
          </button>
        </form>

        <div className="text-center pt-4">
          <p className="text-[10px] text-slate-400 font-medium italic">
            Protegido por criptografia TLS 1.2 conforme LGPD
          </p>
        </div>
      </div>
    </div>
  );
};