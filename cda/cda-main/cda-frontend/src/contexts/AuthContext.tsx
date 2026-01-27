import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { api } from '../services/Api';

// 1. Defina a interface do Usuário (ajuste conforme seu banco no Supabase)
interface User {
  id: string;
  email: string;
  nome: string;
  perfil: 'ADMIN' | 'GESTOR' | 'COLABORADOR';
}

// 2. Defina o que o Contexto vai exportar
interface AuthContextData {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

// 3. Crie o Contexto (Isso resolve o erro "Não é possível encontrar o nome AuthContext")
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// 4. Tipagem para o children (Isso resolve o erro ts(7031))
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const token = await firebaseUser.getIdToken();
          // Configura o token para todas as requisições futuras à API [cite: 2026-01-25]
          api.defaults.headers.common.Authorization = `Bearer ${token}`;
          
          const { data } = await api.get<User>('/usuarios/me'); 
          setUser(data);
        } else {
          setUser(null);
          delete api.defaults.headers.common.Authorization;
        }
      } catch (error) {
        console.error("Erro na sync com backend:", error);
        setUser(null);
      } finally {
        setLoading(false); // ✅ Libera a tela branca [cite: 2026-01-25]
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para facilitar o uso
export const useAuth = () => useContext(AuthContext);