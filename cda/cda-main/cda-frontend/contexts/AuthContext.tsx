import React, { createContext, useContext, useState, useEffect } from 'react';

// Definição do usuário conforme os requisitos de papel (ADMIN, GESTOR, COLABORADOR)
interface User {
  id: string;
  nome: string;
  papel: 'ADMIN' | 'GESTOR' | 'COLABORADOR';
}

// Interface que define o que o contexto exporta
interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean; // Essencial para resolver o erro no AppRoutes
  signIn: (credentials: any) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Controla o estado inicial de validação

  useEffect(() => {
    /**
     * Recupera dados do localStorage para manter a sessão ativa
     * Este processo deve ser instantâneo para cumprir o RNF 1.1
     */
    async function loadStorageData() {
      const storagedUser = localStorage.getItem('@CDA:user');
      const storagedToken = localStorage.getItem('@CDA:token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
      }
      
      setLoading(false); // Finaliza o carregamento
    }

    loadStorageData();
  }, []);

  const signIn = async (credentials: any) => {
    // Aqui conectaremos com o serviço de API na porta 4000 futuramente
    // Simulação de login para teste:
    const mockUser: User = { id: '1', nome: 'Ana García', papel: 'COLABORADOR' };
    setUser(mockUser);
    localStorage.setItem('@CDA:user', JSON.stringify(mockUser));
    localStorage.setItem('@CDA:token', 'dummy-token');
  };

  const signOut = () => {
    localStorage.removeItem('@CDA:user');
    localStorage.removeItem('@CDA:token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para facilitar o acesso aos dados de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};