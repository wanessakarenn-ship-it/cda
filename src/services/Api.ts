import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 🔐 INTERCEPTOR DE REQUISIÇÃO
 * Injeta o token JWT em todas as chamadas automaticamente.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@CDA:token');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * 🛡️ INTERCEPTOR DE RESPOSTA
 * Monitora erros globais (como token expirado).
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se o backend retornar 401 (Não autorizado), limpamos o acesso
    if (error.response?.status === 401) {
      localStorage.removeItem('@CDA:token');
      localStorage.removeItem('@CDA:user');
      
      // Redireciona para o login apenas se não estivermos no login
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);