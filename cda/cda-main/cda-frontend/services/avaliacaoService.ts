import { api } from './Api';

export interface Competencia {
  id: string;
  nome: string;
  peso: string;
  score: number;
  target: number;
  nivel: number;
}

export const avaliacaoService = {
  /**
   * Obtém os dados detalhados da avaliação de um colaborador
   */
  getPorColaborador: async (id: string) => {
    const response = await api.get(`/avaliacoes/${id}`);
    return response.data; // Retorna dados como o score de 68,9%
  },

  /**
   * Envia comentários contextuais para uma competência específica
   */
  salvarComentario: async (competenciaId: string, comentario: string) => {
    return await api.post(`/competencias/${competenciaId}/comentarios`, { comentario });
  }
};