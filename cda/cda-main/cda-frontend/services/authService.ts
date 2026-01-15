import { api } from './Api';

export const authService = {
  /**
   * Realiza a autenticação e retorna o perfil do usuário (ADMIN, GESTOR, etc)
   */
  login: async (credentials: any) => {
    const response = await api.post('/login', credentials);
    return response.data; 
  }
};