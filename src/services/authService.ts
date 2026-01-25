import { api } from './Api';

export interface UsuarioAuth {
  id: number;
  nome: string;
  perfil: 'ADMIN' | 'GESTOR' | 'COLABORADOR';
  email?: string;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  usuario: UsuarioAuth;
}

export const authService = {
  /**
   * 🔐 Login
   * Além de salvar o token, salvamos o objeto usuário para acesso imediato.
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', credentials);

    // 🔒 Persistência local
    localStorage.setItem('@CDA:token', data.token);
    localStorage.setItem('@CDA:user', JSON.stringify(data.usuario));

    return data;
  },

  /**
   * 👤 Sincronização de Perfil (GET /usuarios/me)
   * Útil para validar se o token ainda é válido e pegar dados atualizados do banco.
   */
  async me(): Promise<UsuarioAuth> {
    const { data } = await api.get<UsuarioAuth>('/usuarios/me');
    
    // Atualiza o cache local com os dados mais recentes do servidor
    localStorage.setItem('@CDA:user', JSON.stringify(data));
    
    return data;
  },

  /**
   * 🚪 Logout
   */
  logout() {
    localStorage.removeItem('@CDA:token');
    localStorage.removeItem('@CDA:user');
  },

  /**
   * 🛠️ Helpers de Recuperação (Facilita o AuthContext)
   */
  getStoredUser(): UsuarioAuth | null {
    const user = localStorage.getItem('@CDA:user');
    return user ? JSON.parse(user) : null;
  },

  getToken(): string | null {
    return localStorage.getItem('@CDA:token');
  }
};