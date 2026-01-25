import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser
} from 'firebase/auth';

import { auth } from '../lib/firebase';
import { api } from '../services/Api';

/**
 * Interface que espelha exatamente o retorno do seu 
 * endpoint backend /usuarios/me
 */
export interface UsuarioAuth {
  id: number;
  firebase_uid: string;
  nome: string;
  perfil: 'ADMIN' | 'GESTOR' | 'COLABORADOR';
}

export interface AuthContextData {
  user: UsuarioAuth | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn(credentials: { email: string; senha: string }): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UsuarioAuth | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 🕵️ Escuta mudanças no estado de login do Firebase
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      try {
        if (!firebaseUser) {
          setUser(null);
          delete api.defaults.headers.common.Authorization;
          return;
        }

        // 1. Obtém o Token JWT do Firebase
        const token = await firebaseUser.getIdToken();
        
        // 2. Injeta o token em todas as requisições futuras da API
        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        // 3. Busca o perfil complementar no seu Backend (/usuarios/me)
        // O backend buscará no Postgres usando o UID do token
        const { data } = await api.get<UsuarioAuth>('/usuarios/me');
        
        setUser(data);
      } catch (error) {
        console.error('Falha na sincronização com backend:', error);
        setUser(null);
        delete api.defaults.headers.common.Authorization;
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  async function signIn({ email, senha }: { email: string; senha: string }) {
    setLoading(true);
    // O onAuthStateChanged acima reagirá a este login automaticamente
    await signInWithEmailAndPassword(auth, email, senha);
  }

  async function signOut() {
    await firebaseSignOut(auth);
    setUser(null);
    delete api.defaults.headers.common.Authorization;
    navigate('/login', { replace: true });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);