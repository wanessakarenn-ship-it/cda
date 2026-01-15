import axios from 'axios';

/**
 * Instância base para comunicação com o backend (Porta 4000)
 */
export const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  timeout: 3000, // RNF 1.1: Timeout de 3 segundos para garantir performance
});

// Interceptor para adicionar o token TLS 1.2 em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@CDA:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});